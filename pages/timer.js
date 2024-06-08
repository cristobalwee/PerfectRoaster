import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Dimensions, Image, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, resetTimer, selectStarted, selectStopped, selectActiveCut, selectActiveCookTime } from '../timerSlice';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useEffect, useState } from 'react';
import { Svg, Circle } from 'react-native-svg'
import { getElapsedTime } from '../utils/getElapsed';
import BottomSheet from '../components/bottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getTranslation from '../utils/getTranslation';

// https://dev.to/shivampawar/efficiently-managing-timers-in-a-react-native-app-overcoming-background-foreground-timer-state-issues-map
// https://github.com/react-native-push-notification/ios
// https://notifee.app/react-native/docs/overview 
// https://www.notjust.dev/blog/2023-02-02-react-native-local-push-notifications
// https://dev.to/medaimane/background-processing-in-react-native-exploring-techniques-for-efficient-task-handling-2cbf#:~:text=React%20Native%20Background%20Fetch,in%20the%20background%20or%20terminated.

const windowDimensions = Dimensions.get('window');
const getValues = (val) => {
  return Array.isArray(val) ? val[0] : val;
};
const formatTime = time => {
  const sliceIdx = time / 60 > 60 ? 11 : 14;
  return new Date(time * 1000).toISOString().substring(sliceIdx, 19);
}

export default function TimerPage({ route, navigation }) {
  const dispatch = useDispatch();
  const startedAt = useSelector(selectStarted);
  const stoppedAt = useSelector(selectStopped);
  const activeCut = useSelector(selectActiveCut);
  const activeCookTime = useSelector(selectActiveCookTime);
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
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.boxBackground,
      padding: spacing.lg,
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
      fontSize: 54,
      fontFamily: fontFamilies.subhead
    },
    subtitle: {
      fontSize: textSizes.navHeader,
      fontFamily: fontFamilies.paragraph
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingHorizontal: spacing.xs,
      gap: spacing.sm
    },
    notice: {
      position: 'absolute',
      bottom: spacing.sm + insets.bottom,
      left: spacing.lg,
      right: spacing.lg,
      borderRadius: 16,
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.02,
      shadowRadius: 8,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    },
    doneModalButtonContainer: {
      gap: spacing.sm,
      marginTop: spacing.lg
    }
  });

  const size = 340;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;

  const { cut, weight, cook, cookTime } = route.params;
  const { rest } = 2000;
  const isStarted = startedAt && !stoppedAt && activeCut === cut;
  let finalCookTime;
  
  if (cookTime) {
    finalCookTime = cookTime;
  } else {
    finalCookTime = cook ? getValues(cook) : getValues(cookData[cut][weight].cooks);
  }

  const timeOffset = 100/finalCookTime;
  const trueElapsed = activeCut === cut ? elapsed : 0;
  const [time, setTime] = useState(finalCookTime - trueElapsed/1000);
  const [firstLoad, setFirstLoad] = useState(true);
  const [done, setDone] = useState(false);
  const [displayTime, setDisplay] = useState(finalCookTime  - (trueElapsed * timeOffset)/1000);

  useEffect(() => {
    console.log(sheet);
    if (time < 0.25 && !done) {
      setDone(true);
      setTimeout(() => {
        setSheet('listo');
      }, 250);
    }

    const interval = setInterval(() => {
      if (time > 0.25 && isStarted && isFocused) {
        setTime(finalCookTime - trueElapsed / 1000);
        setDisplay(finalCookTime  - (trueElapsed * timeOffset)/1000);
      }
    }, 250);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (isFocused && firstLoad) {
      setTime(finalCookTime - trueElapsed / 1000);
      setFirstLoad(false);
    }

    const unsubscribe = navigation.addListener('blur', () => {
      setFirstLoad(true);
    });

    return unsubscribe;
  });

  const doneContent = [
    <View style={ styles.doneModal }>
      <Text style={ styles.body }>Tu comida esta lista! Te recomendamos reposar tu carne por {rest / 60}min</Text>
      <View style={ styles.doneModalButtonContainer }>
        <Button
          as='primary'
          text='Comenzar reposo'
          onPress={ () => {
            setDone(false);
            setTime(rest);
            setDisplay(rest);
            dispatch(startTimer({ cut, finalCookTime: rest, nextTimer: 0 }));
            setSheet(null);
          }}
        />
        <Button
          as='secondary_alt'
          text='Entendido'
          onPress={ () => {
            resetTime();
            setSheet(null);
          }}
        />
      </View>
    </View>
  ];

  const cancelContent = [
    <View style={ styles.doneModal }>
      <Text style={ styles.body }>Estás seguro? Todavía te quedan { formatTime(time) } para terminar tu { getTranslation(cut) }</Text>
      <View style={ styles.doneModalButtonContainer }>
        <Button
          as='primary'
          text='Si, cancelar'
          onPress={ () => {
            setDone(false);
            setTime(finalCookTime);
            setDisplay(finalCookTime);
            dispatch(stopTimer());
            dispatch(resetTimer());
            setSheet(null);
          }}
        />
        <Button
          as='secondary_alt'
          text='No, regresar'
          onPress={ () => setSheet(null) }
        />
      </View>
    </View>
  ];

  const resetContent = [
    <View style={ styles.doneModal }>
      <Text style={ styles.body }>Estás seguro? Tu {activeCut} va estar listo en {formatTime(activeCookTime - elapsed/1000)}</Text>
      <View style={ styles.doneModalButtonContainer }>
        <Button
          as='primary'
          text='Si, cancelar'
          onPress={ () => {
            setDone(false);
            setTime(finalCookTime);
            setDisplay(finalCookTime);
            dispatch(startTimer({ cut, finalCookTime, nextTimer: rest }));
            setSheet(null);
          }}
        />
        <Button
          as='secondary_alt'
          text='No, regresar'
          onPress={ () => setSheet(null) }
        />
      </View>
    </View>
  ];

  const getSheetContent = () => {
    switch (sheet) {
      case 'cancelar':
        return cancelContent;
      case 'listo':
        return doneContent;
      case 'cancelar presente':
        return resetContent;
      default:
        return null;
    };
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={ styles.svgContainer }>
          <View style={ styles.timeContainer }>
            <Text style={ styles.subtitle }>Tiempo de cocción</Text>
            <Text style={ styles.time }>{ formatTime(time) }</Text>
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
              strokeDashoffset={radius * Math.PI * 2 * ((finalCookTime - displayTime)/100)}
              strokeLinecap="round"
              transform={`rotate(-90, ${size/2}, ${size/2})`}
              {...{strokeWidth}}
            />
          </Svg>
        </View>
        <View style={ styles.buttonContainer }>
          <Button
            as='secondary'
            text='Cancelar'
            onPress={ () => {
              if (elapsed > 0) {
                setSheet('cancelar')
              } else {
                navigation.navigate('Home', { resetState: true });
              }
            } }
            icon={ <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/close.png') } /> }
          />
          <Button
            as='primary'
            text={ isStarted ? 'Pausar' : 'Comenzar' }
            onPress={ () => {
              if (elapsed > 0 && cut !== activeCut) {
                return setSheet('cancelar presente');
              };
              
              if (isStarted) {
                dispatch(stopTimer());
              } else {
                dispatch(startTimer({ cut, finalCookTime, nextTimer: rest }));
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
      <View style={ styles.notice }>
        <Image style={{ width: 24, height: 24 }} source={ require('../assets/images/icons/info.png') } />
        <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.bodySmall }}>Al terminar, repose por 8min</Text>
      </View>
      <BottomSheet backdropOnPress={ onSheetClose } isOpen={ sheet } offsetBottom={ insets.bottom } title={ sheet } hasActions>
        { getSheetContent() }
      </BottomSheet>
    </>
  );
}
