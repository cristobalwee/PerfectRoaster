import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes, borderRadius } from '../constants/styles';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import BottomSheet from '../components/bottomSheet';
import getDay from '../utils/getDay';
import { cuts } from '../data/cuts';
import recipeList from '../data/recipes';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, selectActiveCookTime, selectActiveCut, selectMultiStepRest, selectNextTimer, selectNextType, selectStarted, selectTimerType, startTimer, stopTimer } from '../timerSlice';
import BottomBar from '../components/bottomBar';
import { selectLocale } from '../storageSlice';
import { storage } from '../utils/storage';
import getTranslation from '../utils/getTranslation';
import { onDisplayNotification } from '../utils/notifications';
import CardSection from '../components/cardSection';
import RecipeScrollView from '../components/recipeScrollView';
import SettingsList from '../components/settingsList';
import CutList from '../components/cutList';
import DoneModal from '../components/doneModal';

export default function HomeScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const [sheet, setSheet] = useState(null);
  const [animOffset, setAnimOffset] = useState(1);
  const onCardPress = (newSheet) => setSheet(newSheet);
  const onSheetClose = () => {
    if (sheet === 'listo') {
      dispatch(stopTimer());
      dispatch(resetTimer());
    }
    setSheet(null);
  };
  const locale = useSelector(selectLocale);
  const currentDate = useMemo(() => getDay(locale));
  const useTranslate = (string) => getTranslation(string, locale);

  const dispatch = useDispatch();
  const startedAt = useSelector(selectStarted);
  const activeCut = useSelector(selectActiveCut);
  const activeCookTime = useSelector(selectActiveCookTime);
  const isStarted = startedAt && activeCut;
  const timerType = useSelector(selectTimerType);
  const nextTimer = useSelector(selectNextTimer);
  const nextTimerType = useSelector(selectNextType);
  const multiStepRest = useSelector(selectMultiStepRest);
  const cutHasSteps = activeCut === 'cerdo_costillas' || activeCut === 'cerdo_panceta';
  const hasNextStep = timerType ? timerType === 'cook' && nextTimerType !== 'rest' : cutHasSteps;

  const styles = StyleSheet.create({
    section: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md
    },
    subHeadingContainer: {
      paddingHorizontal: spacing.md,
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%'
    },
    subHeading: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader
    },
    pivotImage: {
      width: 80,
      height: 80,
      borderRadius: borderRadius
    },
    unitPivot: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    unitPivotTitle: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.body
    }
  });

  const clearAll = () => {
    storage.clearAll();
    console.log('Done.');
  }

  useEffect(() => {
    if (cuts[sheet]) {
      setAnimOffset(cuts[sheet].length);
    } else if (sheet === 'ajustes') {
      setAnimOffset(2.5);
    }
  }, [sheet]);

  useEffect(() => {
    if (activeCut) setSheet(null);
  }, [activeCut]);

  const onNextPress = (nextTimerToSet, type, nextTypeToSet, multi) => {
    dispatch(startTimer({ 
      cut: activeCut,
      finalCookTime: nextTimer,
      nextTimer: nextTimerToSet,
      type,
      nextTimerType: nextTypeToSet,
      multiStepRest: multi && multiStepRest 
    }));
    navigation.navigate('Timer', { cut: activeCut, cookTime: nextTimer, shouldStart: true });
    onDisplayNotification(nextTimer, 0, locale);
    setSheet(null);
  }

  const onCancelPress = () => {
    dispatch(stopTimer());
    dispatch(resetTimer());
    setSheet(null);
  }

  const doneContent = (
    <DoneModal
      body={ nextTimer ? `${useTranslate('timer_ready')} ${nextTimer / 60}min` : useTranslate('timer_ready_done') }
    >
      { nextTimer ? (
        <Button
          as='primary'
          text={ useTranslate('start_rest') }
          onPress={ () => {
            onNextPress(0, 'rest', null, false);
          }}
        />
      ) : null }
      <Button
        as='secondary_alt'
        text={ useTranslate('got_it') }
        onPress={ () => {
          onCancelPress();
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
          onNextPress(multiStepRest, 'cook', 'rest', true);
        }}
      />
      <Button
        as='secondary_alt'
        text={ useTranslate('cancelar') }
        onPress={ () => {
          dispatch(stopTimer());
          dispatch(resetTimer());
          setSheet(null);
        }}
      />
    </DoneModal>
  );

  const getSheetContent = () => {
    switch (sheet) {
      case 'ajustes':
        return <SettingsList />;
      case 'listo':
        return doneContent;
      case 'siguiente_paso':
        return nextContent;
      default:
        return <CutList sheet={ sheet } onPress={ (link) => link(navigation) } />
    };
  };

  return (
    <Fragment>
      <Hero
        background={ require('../assets/images/hero_home.jpg') }
        title={ useTranslate('home_hero') }
        eyebrow={ currentDate }
        rightAction={ () => setSheet('ajustes') }
        bottomOffset={ isStarted ? 100 : null }
      >
        <View style={{ backgroundColor: colors.boxBackground }}>
          <View style={ styles.section }>
            <CardSection onPress={ onCardPress } />
          </View>
          <View style={ styles.subHeadingContainer }>
            <Text style={ styles.subHeading }>{ useTranslate('recipes') }</Text>
            {/* <Button as='link' text={ useTranslate('view_more') } onPress={ () => navigation.navigate('Recipes') } /> */}
          </View>
          <RecipeScrollView onPress={ (locale, recipe) => navigation.navigate('Recipe', { recipe: recipeList[locale][recipe] }) } />
        </View>
        {/* <Button as='link' text='Clear' onPress={ clearAll } /> */}
        <View style={{ height: 36 + insets.bottom }}></View>
        <StatusBar style='light' />
      </Hero>
      <BottomSheet
        backdropOnPress={ onSheetClose }
        isOpen={ sheet }
        offsetBottom={ insets.bottom }
        title={ sheet }
        hasActions={ sheet === 'listo' || sheet === 'siguiente_paso' }
        animOffset={ animOffset }
      >
        { getSheetContent() }
      </BottomSheet>
      { isStarted && (
        <BottomBar
          offsetBottom={ insets.bottom }
          onLink={ () => navigation.navigate('Timer', { cut: activeCut, cookTime: activeCookTime, shouldStart: true }) }
          onDone={ () => {
            if (hasNextStep) return setSheet('siguiente_paso');

            setSheet('listo');
          } }
          onBlur={ setFirstLoad => {
            navigation.addListener('blur', () => {
              setFirstLoad(true);
            });
          }}
        />
      ) }
    </Fragment>
  );
}
