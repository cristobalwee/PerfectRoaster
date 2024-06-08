import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontFamilies, colors, textSizes, spacing, circleRadius } from '../constants/styles';

// https://medium.com/timeless/building-the-animated-sticky-spotify-collapsible-header-with-react-native-and-reanimated-part-i-e47222dfcb85

const windowDimensions = Dimensions.get('window');

export default function Hero({ eyebrow, title, back, background, size = 'lg', rightAction }) {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowDimensions.height * (size === 'sm' ? 0.32 : 0.36)
    },
    image: {
      position: 'relative',
      flex: 1,
      justifyContent: 'flex-end',
      padding: spacing.lg
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      ...StyleSheet.absoluteFill
    },
    heading: {
      fontFamily: fontFamilies.headline,
      fontSize: textSizes.header1,
      color: colors.white
    },
    body: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      color: colors.white,
      marginBottom: spacing.md
    },
    back: {
      ...StyleSheet.absoluteFill,
      width: 36,
      height: 36,
      backgroundColor: colors.white,
      borderRadius: circleRadius,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      left: spacing.lg,
      top: insets.top
    },
    backIcon: {
      width: 18,
      height: 18
    },
    rightAction: {
      position: 'absolute',
      width: 52,
      height: 52,
      backgroundColor: colors.white,
      borderRadius: circleRadius,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      right: spacing.lg,
      top: insets.top + spacing.xs
    },
    rightActionIcon: {
      width: 24,
      height: 24
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.image}>
        <View style={styles.overlay}></View>
        <Text style={styles.body}>{ eyebrow }</Text>
        <Text style={styles.heading}>{ title }</Text>
        { back && (
          <Pressable style={ styles.back } onPress={ back }>
            <Image style={ styles.backIcon } source={ require('../assets/images/icons/chevron-left.png') } />
          </Pressable>
        )}
        { rightAction && (
          <Pressable style={ styles.rightAction } onPress={ rightAction }>
            <Image style={ styles.rightActionIcon } source={ require('../assets/images/icons/settings.png') } />
          </Pressable>
        )}
      </ImageBackground>
    </View>
  );
}
