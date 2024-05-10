import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { fontFamilies, colors, textSizes, spacing, borderRadius } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    paddingVertical: spacing.md
  },
  pressableContainer: {
    flex: 1,
    gap: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 56,
    height: 56,
  },
  text: {
    fontFamily: fontFamilies.paragraph,
    fontSize: textSizes.body,
    textAlign: 'center'
  }
});

export default function CardButton({ text, icon, onPress }) {
  return (
    <View style={ styles.container }>
      <Pressable style={ styles.pressableContainer } onPress={ onPress }>
        <Image style={ styles.icon } source={ icon } />
        <Text style={ styles.text }>{ text }</Text>
      </Pressable>
    </View>
  );
}
