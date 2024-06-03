import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getTranslation from '../utils/getTranslation';
import { useDispatch } from 'react-redux';
import { setOnboarded } from '../storageSlice';

export default function OnboardingRecs({ navigation }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg + insets.top,
      paddingBottom: spacing.lg + insets.bottom,
      gap: 48
    },
    eyebrow: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      color: colors.white
    },
    headline: {
      fontFamily: fontFamilies.headline,
      fontSize: 30,
      color: colors.white
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      gap: spacing.lg
    },
    itemText: {
      fontFamily: fontFamilies.paragraph,
      fontSize: 18,
      color: colors.white,
      flex: 1,
      flexWrap: 'wrap'
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
      <Image style={{ height: 55, width: 46 }} source={ require('../assets/images/logo_flame.png') } />
      <View style={{ gap: spacing.sm }}>
        <Text style={ styles.eyebrow }>Perfect Roaster</Text>
        <Text style={ styles.headline }>{ getTranslation('recs') }</Text>
      </View>
      <View style={ styles.item }>
        <Image style={{ height: 40, width: 40 }} source={ require('../assets/images/hornilla-gas.png') } />
        <Text style={ styles.itemText }>{ getTranslation('recs_burner') }</Text>
      </View>
      <View style={ styles.item }>
        <Image style={{ height: 40, width: 40 }} source={ require('../assets/images/temperatura.png') } />
        <Text style={ styles.itemText }>{ getTranslation('recs_temp') }</Text>
      </View>
      <View style={ styles.item }>
        <Image style={{ height: 40, width: 40 }} source={ require('../assets/images/no-congelar.png') } />
        <Text style={ styles.itemText }>{ getTranslation('recs_frozen') }</Text>
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          as='primary_alt'
          text={ getTranslation('begin') }
          onPress={ () => {
            navigation.navigate('Home');
            dispatch(setOnboarded());
          }}
          arrow
        />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
