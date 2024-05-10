import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { fontFamilies, colors, textSizes, spacing } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
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
  }
});

export default function Hero({ eyebrow, title, buttonLeft, buttonRight, background }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.image}>
        <View style={styles.overlay}></View>
        <Text style={styles.body}>{ eyebrow }</Text>
        <Text style={styles.heading}>{ title }</Text>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
