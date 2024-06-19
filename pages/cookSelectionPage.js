import { Fragment, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';
import { useSelector } from 'react-redux';
import { selectTempUnits } from '../storageSlice';

export default function CookSelectionPage({ route, navigation }) {
  const { cut, weight } = route.params;
  const [selectedCook, setSelectedCook] = useState(0);
  const insets = useSafeAreaInsets();
  const cookNames = { med_rare: 'A punto', med: 'Término medio', med_well: 'Medio cocido', well: 'Bien cocido' };
  const unitVals = { temp_celsius: 'ºC', temp_fahrenheit: 'ºF' };

  const cookVals = Object.keys(cookData[cut][weight].cooks);
  const cookId = cookVals[selectedCook];
  const cook = cookData[cut][weight].cooks[cookId];
  const { temps } = cookData[cut][weight];
  const tempUnits = useSelector(selectTempUnits);
  console.log(temps, cookVals);
  
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
        <Text style={ styles.subHeading }>Cocción</Text>
        <RadioGroup 
          data={ cookVals.map(val => ({ title: cookNames[val], subtitle: `${temps[val][tempUnits]} ${unitVals[tempUnits]}` })) }
          selected={ selectedCook }
          onSelect={ setSelectedCook }
        />
        <View style={{ marginBottom: 150 + insets.bottom }}></View>
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
