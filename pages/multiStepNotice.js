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
  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);
  const cooks = cookData[cut][weight].cooks;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.boxBackground,
      padding: spacing.md
    },
    buttonContainer: {
      position: 'absolute',
      bottom: spacing.lg + insets.bottom,
      left: spacing.md,
      right: spacing.md
    },
    pageTitle: {
      fontFamily: fontFamilies.subhead,
      fontSize: 18,
      marginBottom: spacing.sm
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body
    },
    step: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: colors.white,
      borderRadius: 16,
      flexDirection: 'column',
      marginBottom: spacing.md,
      overflow: 'hidden'
    },
    innerStep: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding: spacing.md,
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
    stepIcons: {
      flexDirection: 'row',
      gap: 4,
      marginTop: 4
    },
    midStep: {
      fontSize: 14,
      fontFamily: fontFamilies.paragraph,
      padding: spacing.md,
      color: colors.link,
      backgroundColor: colors.border,
      alignSelf: 'stretch',
      paddingVertical: spacing.sm,
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Text style={ styles.pageTitle }>{ useTranslate('multi_step') }</Text>
        <View style={ styles.step }>
          <View style={ styles.innerStep }>
            <View style={ styles.stepImg }>
              <Text style={ styles.stepTime }>{ cooks.step1[0]/60 }min</Text>
              <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
            </View>
            <View style={ styles.stepDetail }>
              <Text style={ styles.stepTitle }>{ useTranslate('multi_step_1_title') }</Text>
              <Text style={ styles.body }>{ useTranslate('multi_step_1_description')(cooks.step1[0]) }</Text>
            </View>
          </View>
          <Text style={ styles.midStep }>{ useTranslate('mid_step') }</Text>
        </View>
        
        <View style={ styles.step }>
          <View style={ styles.innerStep }>
            <View style={ styles.stepImg }>
              <Text style={ styles.stepTime }>{ cooks.step2[0]/60 }min</Text>
              <View style={ styles.stepIcons }>
                <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
                <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
                <Image style={{ height: 15, width: 10 }} source={ require('../assets/images/logo_flame.png') } />
              </View>
            </View>
            <View style={ styles.stepDetail }>
              <Text style={ styles.stepTitle }>{ useTranslate('multi_step_2_title') }</Text>
              <Text style={ styles.body }>{ useTranslate('multi_step_2_description')(cooks.step2[0]) }</Text>
            </View>
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
