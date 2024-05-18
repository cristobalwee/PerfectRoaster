import { Fragment, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';

export default function WeightSelectionPage({ route, navigation }) {
  const { cut } = route.params;
  const [selected, setSelected] = useState(0);
  const insets = useSafeAreaInsets();
  const weightNames = { sm: 'Pequeño', md: 'Mediano', lg: 'Grande' };

  const cutData = cookData[cut];
  const weightVals = Object.keys(cutData);
  const weight = weightVals[selected];
  const cook = cookData[cut][weight].cooks;
  const nextRoute = (typeof cook === 'object' && !Array.isArray(cook)) ? 'CookSelection' : 'Timer';

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
          data={ weightVals.map(val => ({ title: cutData[val].weight, subtitle: weightNames[val] })) }
          selected={ selected }
          onSelect={ setSelected }
        />
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          as='primary'
          text='Siguiente'
          onPress={ () => navigation.navigate(nextRoute, { cut, weight, cook }) }
          icon={ <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/chevron-right-light.png') } /> }
        />
      </View>
    </Fragment>
  );
}
