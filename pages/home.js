import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Button, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardButton from '../components/cardButton';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Recipe from '../components/recipe';
import React, { Fragment, useState } from 'react';
import BottomSheet from '../components/bottomSheet';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [sheet, setSheet] = useState(null);
  const onCardPress = () => setSheet(!sheet);

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
    subHeading: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader,
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.lg
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Hero
          background={ require('../assets/images/hero_home.jpg') }
          title='Qué vas a rostizar hoy?'
          eyebrow='Viernes, feb. 17'
        />
        <View style={ styles.section }>
          <View style={ styles.row }>
            <CardButton text='Pollo' icon={ require('../assets/images/icons/pollo.png') } onPress={ onCardPress } />
            <CardButton text='Res' icon={ require('../assets/images/icons/res.png') } onPress={ onCardPress } />
            <CardButton text='Cerdo' icon={ require('../assets/images/icons/cerdo.png') } onPress={ onCardPress } />
          </View>
          <View style={ styles.row }>
            <CardButton text='Cordero' icon={ require('../assets/images/icons/cordero.png') } onPress={ onCardPress } />
            <CardButton text='Pato' icon={ require('../assets/images/icons/pato.png') } onPress={ onCardPress } />
            <CardButton text='Otro' icon={ require('../assets/images/icons/cuy.png') } onPress={ onCardPress } />
          </View>
        </View>
        <Text style={ styles.subHeading }>Recetas</Text>
        <ScrollView horizontal>
          <Recipe title='Panceta' img={ require('../assets/images/hero_home.jpg') } onPress={ () => navigation.navigate('Recipes') } offset />
          <Recipe title='Panceta' img={ require('../assets/images/hero_home.jpg') } onPress={ () => navigation.navigate('Recipes') } />
          <Recipe title='Panceta' img={ require('../assets/images/hero_home.jpg') } onPress={ () => navigation.navigate('Recipes') } />
        </ScrollView>
        <StatusBar style='light' />
      </ScrollView>
      <BottomSheet backdropOnPress={ onCardPress } isOpen={ sheet } offsetBottom={ insets.bottom }>
        <Recipe title='Panceta' img={ require('../assets/images/hero_home.jpg') } onPress={ () => navigation.navigate('Recipes') } />
      </BottomSheet>
    </Fragment>
  );
}
