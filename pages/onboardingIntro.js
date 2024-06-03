import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getTranslation from '../utils/getTranslation';

// https://www.codedaily.io/tutorials/Create-a-Looping-Background-Video-with-React-Native-Video

export default function OnboardingIntro({ navigation }) {
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black
    },
    videoContainer: {
      flex: 7,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray'
    },
    contentContainer: {
      flex: 4,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg + insets.bottom,
      justifyContent: 'flex-start',
      gap: spacing.sm
    },
    eyebrow: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      color: colors.white
    },
    headline: {
      fontFamily: fontFamilies.headline,
      fontSize: textSizes.header1,
      color: colors.white
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
      <View style={ styles.videoContainer }>
      </View>
      <View style={ styles.contentContainer }>
        <Text style={ styles.eyebrow }>{ getTranslation('welcome') }</Text>
        <Text style={ styles.headline }>
          { getTranslation('onboarding_intro') }
        </Text>
      </View>
      <View style={ styles.buttonContainer }>
        <Button
          as='primary_alt'
          text={ getTranslation('next') }
          onPress={ () => {
            navigation.navigate('OnboardingRecs');
          }}
          arrow
        />
      </View>
      <StatusBar style='light' />
    </View>
  );
}
