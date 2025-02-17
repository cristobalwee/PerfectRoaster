import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Dimensions, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useSelector, useDispatch } from 'react-redux';
import { 
  startTimer,
  stopTimer,
  resetTimer,
  selectStarted,
  selectStopped,
  selectActiveCut,
  selectActiveCookTime,
  selectTimerType,
  selectNextTimer,
  selectNextType,
  selectActiveWeight
} from '../timerSlice';
import notifee from '@notifee/react-native';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useEffect, useState } from 'react';
import { Svg, Circle } from 'react-native-svg'
import { getElapsedTime } from '../utils/getElapsed';
import BottomSheet from '../components/bottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getTranslation from '../utils/getTranslation';
import { selectLocale } from '../storageSlice';
import { cancelNotif, onDisplayNotification } from '../utils/notifications';
import formatTime from '../utils/formatTime';
import FloatingBar from '../components/floatingBar';
import DoneModal from '../components/doneModal';
import getValues from '../utils/getValues';

// https://dev.to/shivampawar/efficiently-managing-timers-in-a-react-native-app-overcoming-background-foreground-timer-state-issues-map
// https://github.com/react-native-push-notification/ios
// https://notifee.app/react-native/docs/overview 
// https://www.notjust.dev/blog/2023-02-02-react-native-local-push-notifications
// https://dev.to/medaimane/background-processing-in-react-native-exploring-techniques-for-efficient-task-handling-2cbf#:~:text=React%20Native%20Background%20Fetch,in%20the%20background%20or%20terminated.
// https://github.com/rgommezz/react-native-animated-stopwatch-timer

const windowDimensions = Dimensions.get('window');

export default function TimerPage({ route, navigation }) {
  const dispatch = useDispatch();
  const startedAt = useSelector(selectStarted);
  const stoppedAt = useSelector(selectStopped);
  const activeCut = useSelector(selectActiveCut);
  const activeWeight = useSelector(selectActiveWeight);
  const activeCookTime = useSelector(selectActiveCookTime);
  const timerType = useSelector(selectTimerType);
  const nextTimerType = useSelector(selectNextType);
  const nextTimer = useSelector(selectNextTimer);
  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);
  const elapsed = getElapsedTime(startedAt, stoppedAt);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const resetTime = () => {
    setDone(false);
    setTime(finalCookTime);
    setDisplay(finalCookTime);
    dispatch(stopTimer());
    dispatch(resetTimer());
  }

  const [sheet, setSheet] = useState(null);
  const onSheetClose = () => {
    if (sheet === 'listo') resetTime();
    setSheet(null);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.boxBackground,
      padding: spacing.md,
      paddingTop: windowDimensions.height * 0.1
    },
    svgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.lg,
      width: '100%'
    },
    timeContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center'
    },
    time: {
      fontSize: 60,
      fontFamily: fontFamilies.subhead
    },
    subtitle: {
      fontSize: textSizes.navHeader,
      fontFamily: fontFamilies.paragraph
    },
    steps: {
      backgroundColor: colors.beige,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: -12
    },
    stepsText: {
      fontSize: textSizes.body,
      fontFamily: fontFamilies.paragraph,
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.xs,
      gap: spacing.sm
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    },
    itemList: {
      flexDirection: 'column',
      gap: spacing.lg,
      marginBottom: spacing.lg,
      marginTop: spacing.xs
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: spacing.sm,
      gap: spacing.lg,
    },
    itemText: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      flex: 1,
      flexWrap: 'wrap'
    },
    doneModalButtonContainer: {
      gap: spacing.sm,
      marginTop: spacing.lg
    }
  });

  // Circle SVG dimensions
  const size = 340;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;

  const { cut, weight, cook, cookTime, shouldStart } = route.params;
  const isStarted = startedAt && !stoppedAt && activeCut === cut;
  const cutHasSteps = cut === 'cerdo_costillas' || cut === 'cerdo_panceta';
  const hasNextStep = timerType ? timerType === 'cook' && nextTimerType !== 'rest' : cutHasSteps;
  const stepCounter = (nextTimerType === 'rest' && activeCut === cut) ? 'step_2' : 'step_1';
  let finalCookTime, rest, step2;
  
  if (cookTime) {
    finalCookTime = cookTime;
  } else {
    finalCookTime = cook ? getValues(cook) : getValues(cookData[cut][weight].cooks);
  }

  if (hasNextStep && typeof finalCookTime === 'number') { 
    finalCookTime = getValues(cookData[activeCut || cut][activeWeight || weight || 'sm'].cooks);
  }

  if (typeof finalCookTime === 'object') {
    step2 = finalCookTime.step2[0];
    finalCookTime = finalCookTime.step1[0];
  }

  if (cut && weight) {
    rest = cookData[cut][weight].rest;
  } else {
    if (nextTimer && nextTimerType === 'rest') rest = nextTimer;
  }

  const timeOffset = 100/finalCookTime;
  const trueElapsed = activeCut === cut ? elapsed : 0;
  const [time, setTime] = useState(finalCookTime - trueElapsed/1000);
  const [firstLoad, setFirstLoad] = useState(true);
  const [localShouldStart, setShouldStart] = useState(shouldStart);
  const [done, setDone] = useState(false);
  const [displayTime, setDisplay] = useState(finalCookTime  - (trueElapsed * timeOffset)/1000);
  const nextNotice = hasNextStep ? useTranslate('next_step')(step2/60) : useTranslate('next_rest')(rest);
  const circleTime = time <= 0 ? 0.99 : (finalCookTime - displayTime)/100;

  useEffect(() => {
    if (time < 0) setTime(0);

    if (time < 0.25 && !done) {
      setDone(true);
      setTimeout(() => {
        if (hasNextStep) {
          setSheet('siguiente_paso');
        } else {
          setSheet('listo');
        }
      }, 250);
    };

    const interval = setInterval(() => {
      if (time > 0.25 && (isStarted && localShouldStart) && isFocused) {
        setTime(finalCookTime - trueElapsed / 1000);
        setDisplay(finalCookTime  - (trueElapsed * timeOffset)/1000);
      }
    }, 250);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (isFocused && firstLoad && shouldStart) {
      setTime(finalCookTime - trueElapsed / 1000);
      setDone(false);
      setFirstLoad(false);
    }

    const unsubscribe = navigation.addListener('blur', () => {
      setFirstLoad(true);
    });

    return unsubscribe;
  });

  const onNextPress = (timeToSet) => {
    setDone(false);
    setTime(timeToSet);
    setDisplay(timeToSet);
    setShouldStart(true);
    onDisplayNotification(timeToSet, 0, locale);
    setSheet(null);
  }

  const playTimer = () => {
    setDone(false);
    setShouldStart(true);

    if (elapsed === 0) setTime(finalCookTime);
    
    setDisplay(finalCookTime);
    dispatch(startTimer({ cut, finalCookTime, nextTimer: hasNextStep ? step2 : rest, type: timerType || 'cook', nextTimerType: hasNextStep ? 'cook' : 'rest', multiStepRest: hasNextStep ? rest : 0, activeWeight: (hasNextStep && weight || activeWeight) }));
    onDisplayNotification(finalCookTime, trueElapsed, locale);
  }

  const doneContent = (
    <DoneModal
      body={ nextTimer ? `${useTranslate('timer_ready')} ${rest / 60}min` : useTranslate('timer_ready_done') }
    >
      { nextTimer ? (
        <Button
          as='primary'
          text={ useTranslate('start_rest') }
          onPress={ () => {
            onNextPress(rest);
            navigation.navigate('Timer', { cut: activeCut, cookTime: rest });
            dispatch(startTimer({ cut, finalCookTime: rest, nextTimer: 0, type: 'rest', nextTimerType: null, activeWeight: weight || activeWeight }));
          }}
        />
      ) : null }
      <Button
        as='secondary_alt'
        text={ useTranslate('got_it') }
        onPress={ () => {
          resetTime();
          setSheet(null);
          navigation.navigate('Home');
        }}
      />
    </DoneModal>
  );

  const restContent = (
    <DoneModal
      body={ `${useTranslate('rest_info')} ${rest / 60}min` }
    >
      <Button
        as='primary'
        text={ useTranslate('start_rest') }
        onPress={ () => {
          resetTime();
          onNextPress(rest);
          navigation.navigate('Timer', { cut, cookTime: rest });
          dispatch(startTimer({ cut, finalCookTime: rest, nextTimer: 0, type: 'rest', nextTimerType: null, activeWeight: weight || activeWeight }));
        }}
      />
    </DoneModal>
  );

  const nextContent = (
    <DoneModal
      body={ useTranslate('step_done') }
    >
      <Button
        as='primary'
        text={ useTranslate('start_next') }
        onPress={ () => {
          onNextPress(step2);
          navigation.navigate('Timer', { cut: activeCut, cookTime: step2 });
          dispatch(startTimer({ cut, finalCookTime: step2, nextTimer: cookData[activeCut][activeWeight].rest, type: 'cook', nextTimerType: 'rest', activeWeight: weight || activeWeight, multiStepRest: rest }));
        }}
      />
      <Button
        as='secondary_alt'
        text={ useTranslate('cancelar') }
        onPress={ () => {
          resetTime();
          setSheet(null);
        }}
      />
    </DoneModal>
  );

  const nextInfoContent = (
    <DoneModal
      body={ useTranslate('next_step_info')(step2) }
    >
      <Button
        as='secondary_alt'
        text={ useTranslate('got_it') }
        onPress={ () => {
          setSheet(null);
        }}
      />
    </DoneModal>
  );

  const cancelContent = (
    <DoneModal
      body={ useTranslate('confirm_cancel_current')(formatTime(time), useTranslate(cut)) }
    >
      <Button
        as='primary'
        text={ useTranslate('confirm_cancel') }
        onPress={ () => {
          setDone(false);
          setTime(finalCookTime);
          setDisplay(finalCookTime);
          dispatch(stopTimer());
          dispatch(resetTimer());
          setSheet(null);
          navigation.navigate('Home', { resetState: true });
          notifee.getTriggerNotificationIds().then(ids => ids.forEach(id => cancelNotif(id)));
        }}
      />
      <Button
        as='secondary_alt'
        text={ useTranslate('confirm_back') }
        onPress={ () => setSheet(null) }
      />
    </DoneModal>
  );

  const resetContent = (
    <DoneModal
      body={ useTranslate('confirm_reset_current')(formatTime(activeCookTime - elapsed/1000), useTranslate(activeCut)) }
    >
      <Button
        as='primary'
        text={ useTranslate('confirm_cancel')}
        onPress={ () => {
          onNextPress(finalCookTime);
          dispatch(startTimer({ cut, finalCookTime, nextTimer: rest, type: 'cook', nextTimerType: 'rest' }));
          notifee.getTriggerNotificationIds().then(ids => ids.forEach(id => cancelNotif(id)));
        }}
      />
      <Button
        as='secondary_alt'
        text={ useTranslate('confirm_back') }
        onPress={ () => setSheet(null) }
      />
    </DoneModal>
  );

  const noticeContent = (
    <>
      <View style={ styles.itemList }>
        <View style={ styles.item }>
          <Image style={{ height: 40, width: 40 }} source={ require('../assets/images/hornilla-gas.png') } />
          <Text style={ styles.itemText }>{ useTranslate('recs_burner') }</Text>
        </View>
        <View style={ styles.item }>
          <Image style={{ height: 40, width: 40 }} source={ require('../assets/images/ringer.png') } />
          <Text style={ styles.itemText }>{ useTranslate('recs_ringer') }</Text>
        </View>
      </View>
      <Button
        as='primary'
        text={ useTranslate('got_it')}
        onPress={ () => {
          playTimer();
          setSheet(null);
        }}
      />
    </>
  );

  const getSheetContent = () => {
    switch (sheet) {
      case 'cancelar':
        return cancelContent;
      case 'listo':
        return doneContent;
      case 'siguiente_paso':
        return nextContent;
      case 'siguiente_info':
        return nextInfoContent;
      case 'cancelar_presente':
        return resetContent;
      case 'rest':
        return restContent;
      case 'sugerencia':
        return noticeContent;
      default:
        return null;
    };
  }

  const timeTitle = timerType === 'rest' ? 'rest_time' : 'cook_time';

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={ styles.svgContainer }>
          <View style={ styles.timeContainer }>
            <Text style={ styles.subtitle }>{ useTranslate(timeTitle) }</Text>
            <Text allowFontScaling={ false } style={ styles.time }>{ formatTime(time) }</Text>
            { (hasNextStep || (cutHasSteps && timerType === 'cook'))
              ? <View style={ styles.steps }><Text style={ styles.stepsText }>{ useTranslate(stepCounter) }</Text></View> 
              : null }
          </View>
          <Svg width={size} height={size}>
            <Circle 
              stroke={colors.white}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              {...{strokeWidth}}
            />
            <Circle 
              stroke={colors.black}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeDasharray={`${circum} ${circum}`}
              strokeDashoffset={radius * Math.PI * 2 * circleTime}
              strokeLinecap="round"
              transform={`rotate(-90, ${size/2}, ${size/2})`}
              {...{strokeWidth}}
            />
          </Svg>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            as='secondary'
            text={ useTranslate('cancelar') }
            onPress={ () => {
              if (elapsed > 0 && cut === activeCut) {
                setSheet('cancelar');
              } else {
                navigation.navigate('Home', { resetState: true });
              }
            } }
            icon={ <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/close.png') } /> }
          />
          <Button
            as='primary'
            text={ isStarted ? useTranslate('pause') : useTranslate('begin') }
            onPress={ () => {
              if (elapsed > 0 && cut !== activeCut) {
                return setSheet('cancelar_presente');
              };
              
              if (isStarted) {
                dispatch(stopTimer()); 
                notifee.getTriggerNotificationIds().then(ids => ids.forEach(id => cancelNotif(id)));
              } else {
                if (trueElapsed > 0) {
                  playTimer();
                } else {
                  setSheet('sugerencia');
                }
              }
            } }
            icon={ 
              isStarted 
                ? <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/pause-light.png') } /> 
                : <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/play-light.png') } />
            }
          />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
      { (rest || hasNextStep) ? (
        <FloatingBar 
          content={ nextNotice }
          onPress={ () => {
            if (cutHasSteps) return setSheet('siguiente_info');

            setSheet('rest');
          } }
        />
      ) : null }
      <BottomSheet
        backdropOnPress={ onSheetClose }
        isOpen={ sheet }
        offsetBottom={ insets.bottom }
        title={ sheet } 
        hasActions
      >
        { getSheetContent() }
      </BottomSheet>
    </>
  );
}
