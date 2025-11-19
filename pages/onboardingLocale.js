import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { colors, spacing } from '../constants/styles';
import Button from '../components/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setLocale, setTempUnits, setWeightUnits } from '../storageSlice';
import { useDispatch } from 'react-redux';
import { storage } from '../utils/storage';

export default function OnboardingLocales({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.black,
      paddingHorizontal: spacing.md,
      paddingTop: insets.top,
      paddingBottom: spacing.lg + insets.bottom
    },
    imgContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100
    },
    buttonContainer: {
      position: 'absolute',
      bottom: spacing.lg + insets.bottom,
      left: spacing.md,
      right: spacing.md,
      gap: spacing.md
    }
  });

  const setStorage = (locale, temp, weight) => {
    storage.set('locale', locale);
    storage.set('tempUnits', temp);
    storage.set('weightUnits', weight);

    dispatch(setLocale(locale));
    dispatch(setTempUnits(temp));
    dispatch(setWeightUnits(weight));
  }

  return (
    <View style={styles.container}>
      <View style={ styles.imgContainer }>
        <Image style={{ width: 329, height: 297 }} source={ require('../assets/images/full_logo.png') } />
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          as='primary_alt'
          text='Español'
          onPress={ () => {
            setStorage('es_PE', 'temp_celsius', 'weight_gr');
            navigation.navigate('OnboardingIntro');
          }}
          icon={ <Image style={{ width: 24, height: 24 }} source={ require('../assets/images/icons/flag-spain.png') } /> }
        />
        <Button
          as='primary_alt'
          text='English'
          onPress={ () => {
            setStorage('en_US', 'temp_fahrenheit', 'weight_lbs');
            navigation.navigate('OnboardingIntro');
          }}
          icon={ <Image style={{ width: 24, height: 24 }} source={ require('../assets/images/icons/flag-uk.png') } /> }
        />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
