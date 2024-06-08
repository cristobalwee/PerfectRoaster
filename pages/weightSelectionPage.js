import { Fragment, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';
import { useSelector } from 'react-redux';
import { selectTempUnits, selectWeightUnits } from '../storageSlice';

export default function WeightSelectionPage({ route, navigation }) {
  const { cut } = route.params;
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedCook, setSelectedCook] = useState(0);

  const tempUnits = useSelector(selectTempUnits);
  const weightUnits = useSelector(selectWeightUnits);
  const weightUnitVals = { 'weight_gr' : 'g', 'weight_lbs': 'lbs' };
  const weightMultiplier = weightUnits === 'weight_lbs' ? 0.0022 : 1;
  const insets = useSafeAreaInsets();
  const weightNames = { sm: 'Pequeño', md: 'Mediano', lg: 'Grande' };
  const cookNames = { med_rare: 'A punto', med: 'Término medio', med_well: 'Medio cocido', well: 'Bien cocido' };

  const cutData = cookData[cut];
  const weightVals = Object.keys(cutData);
  const weight = weightVals[selectedWeight];
  
  const cutCooks = cookData[cut][weight].cooks
  const cookVals = Object.keys(cutCooks);
  const cookId = cookVals[selectedCook];
  const cook = cookData[cut][weight].cooks[cookId];
  const showCooks = typeof cutCooks === 'object' && !Array.isArray(cutCooks) && cutCooks !== null;

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
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Text style={ styles.subHeading }>Tamaño</Text>
        <RadioGroup 
          data={ weightVals.map(val => ({ title: `${Math.round(cutData[val].weight * weightMultiplier * 10) / 10}${weightUnitVals[weightUnits]}`, subtitle: weightNames[val] })) }
          selected={ selectedWeight }
          onSelect={ setSelectedWeight }
        />
        { showCooks && (
          <>
            <Text style={ styles.subHeading }>Cocción</Text>
            <RadioGroup 
              data={ cookVals.map(val => ({ title: cookNames[val], subtitle: 'Temperatura' })) }
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
          text='Siguiente'
          onPress={ () => navigation.navigate('Timer', { cut, weight, cook }) }
          arrow
        />
      </View>
    </Fragment>
  );
}
