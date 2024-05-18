import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const onSheetClose = () => setSheet(null);
  const currentDate = getDay();
  const cardRows = [
    ['Pollo', 'Res', 'Cerdo'],
    ['Cordero', 'Pato', 'Cuy']
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.boxBackground,
      paddingBottom: insets.bottom * 2,
      paddingLeft: insets.left,
      paddingRight: insets.right,
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
      fontSize: textSizes.navHeader,
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    },
    pivotImage: {
      width: 80,
      height: 80,
      borderRadius: borderRadius
    }
  });

  useEffect(() => {
    if (route.params && route.params.resetState) setSheet(null);
  }, [route]);

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
        const formattedMeat = meat.toLowerCase();
        return (
          <CardButton
            key={ meat }
            text={ meat }
            icon={ meatIcons[formattedMeat] }
            onPress={ () => onCardPress(formattedMeat) }
          />
        );
      })}
    </View>
  ));

  const cutPivots = cuts[sheet] 
    ? cuts[sheet].map(cut => (
      <Pivot
        { ...cut }
        onPress={ () => cut.link(navigation) }
        key={ cut.id }
      />
    ))
    : null;

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Hero
          background={ require('../assets/images/hero_home.jpg') }
          title='Qué vas a rostizar hoy?'
          eyebrow={ currentDate }
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
        <View style={{ height: 36 + insets.bottom }}></View>
        <StatusBar style='light' />
      </ScrollView>
      <BottomSheet backdropOnPress={ onSheetClose } isOpen={ sheet } offsetBottom={ insets.bottom } title={ sheet }>
        { cutPivots }
      </BottomSheet>
    </Fragment>
  );
}
