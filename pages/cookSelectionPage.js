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
      padding: spacing.lg,
      paddingBottom: 50
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      flex: 1,
      width: '100%',
      backgroundColor: colors.boxBackground,
      padding: spacing.lg,
      paddingBottom: spacing.lg + insets.bottom
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
          arrow
        />
      </View>
    </Fragment>
  );
}
