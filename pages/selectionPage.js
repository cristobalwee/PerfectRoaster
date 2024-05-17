import { Fragment, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookTimes } from '../data/cookTimes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioGroup from '../components/radioGroup';

export default function SelectionPage({ route, navigation }) {
  const { cut, hasCook } = route.params;
  const [selected, setSelected] = useState(0);
  const insets = useSafeAreaInsets();

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
          data={ [
            { title: '2300-2500g', subtitle: 'Grande' },
            { title: '2100-2300g', subtitle: 'Mediano' },
            { title: '1800-2100g', subtitle: 'Pequeño' }
          ] }
          selected={ selected }
          onSelect={ setSelected }
        />
        <StatusBar style="auto" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button as='primary' text='Siguiente' onPress={ () => navigation.push('CookSelection', { cut }) } />
      </View>
    </Fragment>
  );
}
