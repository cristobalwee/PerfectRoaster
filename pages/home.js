import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardButton from '../components/cardButton';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes, borderRadius } from '../constants/styles';
import Recipe from '../components/recipe';
import React, { Fragment, useEffect, useState } from 'react';
import BottomSheet from '../components/bottomSheet';
import getDay from '../utils/getDay';
import Pivot from '../components/pivot';
import { cuts } from '../data/cuts';
import { recipeList } from '../data/recipes';
import Button from '../components/button';
import Toggle from '../components/toggle';
import { useDispatch, useSelector } from 'react-redux';
import { resetTimer, selectActiveCookTime, selectActiveCut, selectStarted, startTimer, stopTimer } from '../timerSlice';
import BottomBar from '../components/bottomBar';
import getTranslation from '../utils/getTranslation';
import { selectLocale, selectTempUnits, selectWeightUnits, setLocale, setTempUnits, setWeightUnits } from '../storageSlice';
import { locales } from '../locales/locales';
import { setLocaleEN } from '../utils/setLocaleEN';
import { setTempF, setWeightLbs } from '../utils/setUnits';

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
    if (sheet === 'listo') dispatch(resetTimer());
    setSheet(null);
  };
  const locale = useSelector(selectLocale);
  const tempUnits = useSelector(selectTempUnits);
  const weightUnits = useSelector(selectWeightUnits);
  const currentDate = getDay(locale);
  const cardRows = [
    ['pollo', 'res', 'cerdo'],
    ['cordero', 'pato', 'cuy']
  ];

  const dispatch = useDispatch();
  const startedAt = useSelector(selectStarted);
  const activeCut = useSelector(selectActiveCut);
  const activeCookTime = useSelector(selectActiveCookTime);
  const isStarted = startedAt && activeCut;

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
    doneModal: {

    },
    doneModalButtonContainer: {
      gap: spacing.sm,
      marginTop: spacing.lg
    }
  });

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log(e);
    }

    console.log('Done.');
  }

  useEffect(() => {
    if (activeCut) setSheet(null);
  }, [activeCut]);

  const recipeArray = Object.keys(recipeList);
  const renderRecipes = recipeArray.map((recipe, i) => (
    <Recipe
      title={ recipeList[recipe].title }
      img={ recipeList[recipe].img }
      onPress={ () => navigation.navigate('Recipe', { recipe: recipeList[recipe] }) }
      offset={ i === 0 }
      key={ recipeList[recipe].id }
      duration={ `${recipeList[recipe].time}min` }
    />
  ));

  const renderCards = cardRows.map(row => (
    <View style={ styles.row }>
      { row.map(meat => {
        return (
          <CardButton
            key={ meat }
            text={ getTranslation(meat) }
            icon={ meatIcons[meat] }
            onPress={ () => onCardPress(meat) }
          />
        );
      })}
    </View>
  ));

  const cutPivots = cuts[sheet]
    ? cuts[sheet].map(cut => (
      <Pivot
        { ...cut }
        title={ locales[locale][cut.id] }
        onPress={ () => cut.link(navigation) }
        key={ cut.id }
      />
    ))
    : null;
  
  const settingsPivots = [
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ getTranslation('weight') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          setWeightLbs(selected ? 'false' : 'true');
          dispatch(setWeightUnits(selected));
        }}
        selected={ weightUnits === 'weight_lbs' ? 1 : 0 }
        data={ 
          [{ text: getTranslation('weight_gr'), id: 'weight_gr' }, { text: getTranslation('weight_lbs'), id: 'weight_lbs' }] 
        }
      />
    </View>,
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ getTranslation('temp') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          setTempF(selected ? 'false' : 'true');
          dispatch(setTempUnits(selected));
        }}
        selected={ tempUnits === 'temp_fahrenheit' ? 1 : 0 }
        data={ 
          [{ text: 'ºC', id: 'temp_celsius' }, { text: 'ºF', id: 'temp_fahrenheit' }] 
        }
      />
    </View>,
    <View style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ getTranslation('lang') }</Text>
      <Toggle 
        onSelect={ (selected) => {
          setLocaleEN(selected ? 'false' : 'true');
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
      <Text style={ styles.body }>Tu comida esta lista! Te recomendamos reposar tu carne por 8min</Text>
      <View style={ styles.doneModalButtonContainer }>
        <Button
          as='primary'
          text='Comenzar reposo'
          onPress={ () => {
            dispatch(startTimer({ cut: 'pato_magret', finalCookTime: 1920 }));
            setSheet(null);
          }}
        />
        <Button
          as='secondary_alt'
          text='Entendido'
          onPress={ () => {
            dispatch(stopTimer());
            dispatch(resetTimer());
            setSheet(null);
          } }
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
      default:
        return cutPivots;
    };
  }

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Hero
          background={ require('../assets/images/hero_home.jpg') }
          title={ getTranslation('home_hero') }
          eyebrow={ currentDate }
          rightAction={ () => setSheet('ajustes') }
        />
        <View style={ styles.section }>
          { renderCards }
        </View>
        <View style={ styles.subHeadingContainer }>
          <Text style={ styles.subHeading }>Recetas</Text>
          <Button as='link' text='Ver más' onPress={ () => navigation.navigate('Recipes') } />
        </View>
        <ScrollView horizontal>
          { renderRecipes }
        </ScrollView>
        <Button as='link' text='Clear' onPress={ clearAll } />
        <View style={{ height: 36 + insets.bottom }}></View>
        <StatusBar style='light' />
      </ScrollView>
      <BottomSheet
        backdropOnPress={ onSheetClose }
        isOpen={ sheet }
        offsetBottom={ insets.bottom }
        title={ sheet }
        hasActions={ sheet === 'listo' }
      >
        { getSheetContent() }
      </BottomSheet>
      { isStarted && (
        <BottomBar
          offsetBottom={ insets.bottom }
          onLink={ () => navigation.navigate('Timer', { cut: activeCut, cookTime: activeCookTime }) }
          onDone={ () => setSheet('listo') }
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
