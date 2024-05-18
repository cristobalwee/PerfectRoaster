import { Fragment, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';

export default function CookSelectionPage({ route, navigation }) {
  const { cut, weight } = route.params;
  const [selected, setSelected] = useState(0);
  const insets = useSafeAreaInsets();
  const cookNames = { med_rare: 'A punto', med: 'Término medio', med_well: 'Medio cocido', well: 'Bien cocido' };

  const cookVals = Object.keys(cookData[cut][weight].cooks);
  const cookId = cookVals[selected];
  const cook = cookData[cut][weight].cooks[cookId];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.boxBackground,
      padding: spacing.lg
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      flex: 1,
      width: '100%',
      backgroundColor: colors.boxBackground,
      padding: 36,
      paddingBottom: 36 + insets.bottom
    }
  });

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <RadioGroup 
          data={ cookVals.map(val => ({ title: cookNames[val], subtitle: 'Temperatura' })) }
          selected={ selected }
          onSelect={ setSelected }
        />
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          as='primary'
          text='Siguiente'
          onPress={ () => navigation.navigate('Timer', { cut, weight, cook }) }
          icon={ <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/chevron-right-light.png') } /> }
        />
      </View>
    </Fragment>
  );
}
