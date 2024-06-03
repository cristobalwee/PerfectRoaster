import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { colors, spacing } from '../constants/styles';
import { recipeList } from '../data/recipes';
import Recipe from '../components/recipe';
import Button from '../components/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setLocale } from '../storageSlice';
import { useDispatch } from 'react-redux';

export default function OnboardingLocales({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.black,
      paddingHorizontal: spacing.lg,
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
      left: spacing.lg,
      right: spacing.lg,
      gap: spacing.md
    }
  });
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
            dispatch(setLocale('es_PE'));
            navigation.navigate('OnboardingIntro');
          }}
          icon={ <Image style={{ width: 24, height: 24 }} source={ require('../assets/images/icons/flag-spain.png') } /> }
        />
        <Button
          as='primary_alt'
          text='English'
          onPress={ () => {
            dispatch(setLocale('en_US'));
            navigation.navigate('OnboardingIntro');
          }}
          icon={ <Image style={{ width: 24, height: 24 }} source={ require('../assets/images/icons/flag-uk.png') } /> }
        />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
