import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardButton from '../components/cardButton';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes, borderRadius } from '../constants/styles';
import Recipe from '../components/recipe';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import BottomSheet from '../components/bottomSheet';
import getDay from '../utils/getDay';
import Pivot from '../components/pivot';
import { cuts } from '../data/cuts';
import recipeList from '../data/recipes';
import Button from '../components/button';
import Toggle from '../components/toggle';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, selectActiveCookTime, selectActiveCut, selectMultiStepRest, selectNextTimer, selectNextType, selectStarted, selectTimerType, startTimer, stopTimer } from '../timerSlice';
import BottomBar from '../components/bottomBar';
import { selectLocale, selectTempUnits, selectWeightUnits, setLocale, setTempUnits, setWeightUnits } from '../storageSlice';
import { storage } from '../utils/storage';
import getTranslation from '../utils/getTranslation';
import { onDisplayNotification } from '../utils/notifications';

const meatIcons = {
  'pollo': require('../assets/images/icons/pollo.png'),
  'res': require('../assets/images/icons/res.png'),
  'cordero': require('../assets/images/icons/cordero.png'),
  'pato': require('../assets/images/icons/pato.png'),
  'cerdo': require('../assets/images/icons/cerdo.png'),
  'cuy': require('../assets/images/icons/cuy.png')
}

export default function HomeScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const [sheet, setSheet] = useState(null);
  const onCardPress = (newSheet) => setSheet(newSheet);
  const onSheetClose = () => {
    if (sheet === 'listo') {
      dispatch(stopTimer());
      dispatch(resetTimer());
    }
    setSheet(null);
  };
  const locale = useSelector(selectLocale);
  const tempUnits = useSelector(selectTempUnits);
  const weightUnits = useSelector(selectWeightUnits);
  const weightUnitVals = { 'weight_gr' : 'g', 'weight_lbs': 'lbs' };
  const weightMultiplier = weightUnits === 'weight_lbs' ? 0.0022 : 1;
  const currentDate = useMemo(() => getDay(locale));
  const cardRows = [
    ['pollo', 'res', 'cerdo'],
    ['cordero', 'pato', 'cuy']
  ];
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
    container: {
      flex: 1,
      backgroundColor: colors.boxBackground,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      marginBottom: isStarted ? 100 : null
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.xs
    },
    subHeadingContainer: {
      paddingHorizontal: spacing.lg,
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
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
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
    },
    doneModalButtonContainer: {
      gap: spacing.sm,
      marginTop: spacing.lg
    }
  });

  const clearAll = () => {
    storage.clearAll();
    console.log('Done.');
  }

  useEffect(() => {
    if (activeCut) setSheet(null);
  }, [activeCut]);

  const recipeArray = Object.keys(recipeList[locale]);
  const renderRecipes = recipeArray.map((recipe, i) => (
    <Recipe
      title={ recipeList[locale][recipe]?.title }
      img={ recipeList[locale][recipe]?.img }
      onPress={ () => navigation.navigate('Recipe', { recipe: recipeList[locale][recipe] }) }
      offset={ i === 0 }
      key={ recipeList[locale][recipe]?.id }
      duration={ `${recipeList[locale][recipe]?.time}min` }
    />
  ));

  const renderCards = cardRows.map((row, i) => (
    <View style={ styles.row } key={ i }>
      { row.map(meat => {
        return (
          <CardButton
            key={ meat }
            text={ useTranslate(meat) }
            icon={ meatIcons[meat] }
            onPress={ () => onCardPress(meat) }
          />
        );
      })}
    </View>
  ));

  const cutPivots = cuts[sheet]
    ? cuts[sheet].map(cut => {
      let weight = `${Math.round(cut.weights * weightMultiplier * 10) / 10}`;
      if (Array.isArray(cut.weights)) {
        weight = `${Math.round(cut.weights[0] * weightMultiplier * 10) / 10}-${Math.round(cut.weights[1] * weightMultiplier * 10) / 10}`;
      };

      const subtitle = `${weight}${weightUnitVals[weightUnits]}`;
      return (
        <Pivot
          { ...cut }
          title={ useTranslate(cut.id) }
          subtitle={ subtitle }
          onPress={ () => cut.link(navigation) }
          key={ cut.id }
        />
      )
    })
    : null;
  
  const settingsPivots = [
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ useTranslate('weight') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          storage.set('weightUnits', selected);
          dispatch(setWeightUnits(selected));
        }}
        selected={ weightUnits === 'weight_lbs' ? 1 : 0 }
        data={ 
          [{ text: useTranslate('weight_gr'), id: 'weight_gr' }, { text: useTranslate('weight_lbs'), id: 'weight_lbs' }] 
        }
      />
    </View>,
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ useTranslate('temp') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          storage.set('tempUnits', selected);
          dispatch(setTempUnits(selected));
        }}
        selected={ tempUnits === 'temp_fahrenheit' ? 1 : 0 }
        data={ 
          [{ text: 'ºC', id: 'temp_celsius' }, { text: 'ºF', id: 'temp_fahrenheit' }] 
        }
      />
    </View>,
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ useTranslate('lang') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          storage.set('locale', selected);
          dispatch(setLocale(selected));
        }}
        selected={ locale === 'en_US' ? 1 : 0 }
        data={ 
          [{ text: 'Español', id: 'es_PE' }, { text: 'English', id: 'en_US' }] 
        }
      />
    </View>
  ];

  const doneContent = [
    <View style={ styles.doneModal }>
      <Text style={ styles.body }>{ nextTimer ? `${useTranslate('timer_ready')} ${nextTimer / 60}min` : useTranslate('timer_ready_done')}</Text>
      <View style={ styles.doneModalButtonContainer }>
        { nextTimer ? (
          <Button
            as='primary'
            text={ useTranslate('start_rest') }
            onPress={ () => {
              dispatch(startTimer({ cut: activeCut, finalCookTime: nextTimer, type: 'rest', nextTimer: 0, nextTimerType: null }));
              navigation.navigate('Timer', { cut: activeCut, cookTime: nextTimer, shouldStart: true });
              onDisplayNotification(nextTimer, 0, locale);
              setSheet(null);
            }}
          />
        ) : null }
        <Button
          as='secondary_alt'
          text={ useTranslate('got_it') }
          onPress={ () => {
            dispatch(stopTimer());
            dispatch(resetTimer());
            setSheet(null);
          }}
        />
      </View>
    </View>
  ];

  const nextContent = [
    <View style={ styles.doneModal }>
      <Text style={ styles.body }>{ useTranslate('step_done')}</Text>
      <View style={ styles.doneModalButtonContainer }>
        <Button
          as='primary'
          text={ useTranslate('start_next') }
          onPress={ () => {
            dispatch(startTimer({ cut: activeCut, finalCookTime: nextTimer, nextTimer: multiStepRest, type: 'cook', nextTimerType: 'rest',  multiStepRest }));
            navigation.navigate('Timer', { cut: activeCut, cookTime: nextTimer, shouldStart: true });
            onDisplayNotification(nextTimer, 0, locale);
            setSheet(null);
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
      </View>
    </View>
  ];

  const getSheetContent = () => {
    switch (sheet) {
      case 'ajustes':
        return settingsPivots;
      case 'listo':
        return doneContent;
      case 'siguiente_paso':
        return nextContent;
      default:
        return cutPivots;
    };
  }

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Hero
          background={ require('../assets/images/hero_home.jpg') }
          title={ useTranslate('home_hero') }
          eyebrow={ currentDate }
          rightAction={ () => setSheet('ajustes') }
        />
        <View style={ styles.section }>
          { renderCards }
        </View>
        <View style={ styles.subHeadingContainer }>
          <Text style={ styles.subHeading }>{ useTranslate('recipes') }</Text>
          <Button as='link' text={ useTranslate('view_more') } onPress={ () => navigation.navigate('Recipes') } />
        </View>
        <ScrollView horizontal>
          { renderRecipes }
        </ScrollView>
        {/* <Button as='link' text='Clear' onPress={ clearAll } /> */}
        <View style={{ height: 36 + insets.bottom }}></View>
        <StatusBar style='light' />
      </ScrollView>
      <BottomSheet
        backdropOnPress={ onSheetClose }
        isOpen={ sheet }
        offsetBottom={ insets.bottom }
        title={ sheet }
        hasActions={ sheet === 'listo' || sheet === 'siguiente_paso' }
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
