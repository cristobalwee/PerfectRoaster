import { Fragment, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';
import { useSelector } from 'react-redux';
import { selectLocale, selectTempUnits, selectWeightUnits } from '../storageSlice';
import getTranslation from '../utils/getTranslation';

export default function WeightSelectionPage({ route, navigation }) {
  const { cut } = route.params;
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedCook, setSelectedCook] = useState(0);

  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);
  const tempUnits = useSelector(selectTempUnits);
  const weightUnits = useSelector(selectWeightUnits);
  const weightUnitVals = { 'weight_gr' : 'g', 'weight_lbs': 'lbs' };
  const weightMultiplier = weightUnits === 'weight_lbs' ? 0.0022 : 1;
  const insets = useSafeAreaInsets();
  const unitVals = { temp_celsius: 'ºC', temp_fahrenheit: 'ºF' };

  const cutData = cookData[cut];
  const weightVals = Object.keys(cutData);
  const weight = weightVals[selectedWeight];
  
  const cutCooks = cookData[cut][weight].cooks
  const cookVals = Object.keys(cutCooks);
  const cookId = cookVals[selectedCook];
  const cook = cookData[cut][weight].cooks[cookId];
  const { temps } = cookData[cut][weight];
  const showCooks = typeof cutCooks === 'object' && !Array.isArray(cutCooks) && cutCooks !== null && temps;
  const multiStep = cut === 'cerdo_panceta';

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
    subHeading: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader,
      marginBottom: spacing.xs
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Text style={ styles.subHeading }>{ useTranslate('size') }</Text>
        <RadioGroup 
          data={ weightVals.map(val => ({ title: `${Math.round(cutData[val].weight * weightMultiplier * 10) / 10}${weightUnitVals[weightUnits]}`, subtitle: useTranslate(val) })) }
          selected={ selectedWeight }
          onSelect={ setSelectedWeight }
        />
        { showCooks && (
          <>
            <Text style={ styles.subHeading }>{ useTranslate('cook') }</Text>
            <RadioGroup 
              data={ cookVals.map(val => ({ title: useTranslate(val), subtitle: `${temps[val][tempUnits]} ${unitVals[tempUnits]}` })) }
              selected={ selectedCook }
              onSelect={ setSelectedCook }
            />
            <View style={{ marginBottom: 150 + insets.bottom }}></View>
          </>
        )}
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          as='primary'
          text={ useTranslate('next') }
          onPress={ () => {
            if (multiStep) {
              navigation.navigate('MultiStep', { cut, weight, cook: null })
            } else {
              navigation.navigate('Timer', { cut, weight, cook })
            }
          } }
          arrow
        />
      </View>
    </Fragment>
  );
}
