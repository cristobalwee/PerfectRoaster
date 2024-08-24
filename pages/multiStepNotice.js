import { Fragment, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';
import { useSelector } from 'react-redux';
import { selectLocale, selectTempUnits } from '../storageSlice';
import getTranslation from '../utils/getTranslation';
import formatTime from '../utils/formatTime';

export default function MultiStepNoticePage({ route, navigation }) {
  const { cut, weight } = route.params;
  const insets = useSafeAreaInsets();
  const unitVals = { temp_celsius: 'ºC', temp_fahrenheit: 'ºF' };
  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);

  const cooks = cookData[cut][weight].cooks;
  const { temps } = cookData[cut][weight];
  const tempUnits = useSelector(selectTempUnits);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.boxBackground,
      padding: spacing.lg
    },
    buttonContainer: {
      position: 'absolute',
      bottom: spacing.lg + insets.bottom,
      left: spacing.lg,
      right: spacing.lg
    },
    subHeading: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader,
      marginBottom: spacing.xs
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    },
    step: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.md,
      backgroundColor: colors.white,
      borderRadius: 16,
      flexDirection: 'row',
      gap: spacing.md
    },
    stepImg: {
      height: 100,
      width: 100,
      borderRadius: 12,
      backgroundColor: colors.boxBackground,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    stepDetail: {
      flex: 2
    },
    stepTitle: {
      fontFamily: fontFamilies.subhead,
      fontSize: 18,
      marginBottom: 8
    },
    stepTime: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader,
    },
    midStep: {
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.md,
      zIndex: -1,
      marginVertical: -10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12
    },
    stepIcons: {
      flexDirection: 'row',
      gap: 4,
      marginTop: 4
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Text style={ styles.subHeading }>Esta carne se cocina en dos pasos</Text>
        <View style={ styles.step }>
          <View style={ styles.stepImg }>
            <Text style={ styles.stepTime }>{ formatTime(cooks.step1[0]) }</Text>
            <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
          </View>
          <View style={ styles.stepDetail }>
            <Text style={ styles.stepTitle }>1. Fuego bajo</Text>
            <Text style={ styles.body }>Cocine tu carne a fuego bajo por { cooks.step1[0] / 60 }min</Text>
          </View>
        </View>
        <View style={ styles.midStep }>
          <Text style={ styles.body }>Al terminar paso 1, retire su carne y limpie el receptaculo de jugos</Text>
        </View>
        <View style={ styles.step }>
          <View style={ styles.stepImg }>
            <Text style={ styles.stepTime }>{ formatTime(cooks.step2[0]) }</Text>
            <View style={ styles.stepIcons }>
              <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
              <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
              <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
            </View>
          </View>
          <View style={ styles.stepDetail }>
            <Text style={ styles.stepTitle }>2. Fuego alto</Text>
            <Text style={ styles.body }>Cocine tu carne a fuego alto por { cooks.step2[0] / 60 }min</Text>
          </View>
        </View>
        <View style={{ marginBottom: 150 + insets.bottom }}></View>
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          as='primary'
          text={ useTranslate('next') }
          onPress={ () => navigation.navigate('Timer', { cut, weight, cook: null }) }
          arrow
        />
      </View>
    </Fragment>
  );
}
