import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { fontFamilies, colors, textSizes, spacing, borderRadius, circleRadius } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    gap: spacing.xs,
    paddingVertical: spacing.lg
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: circleRadius,
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    fontFamily: fontFamilies.paragraph,
    fontSize: textSizes.body,
    textAlign: 'center'
  }
});

export default function CardButton({ text, icon, onPress }) {
  return (
    <Pressable style={ styles.container } onPress={ onPress }>
      <View style={ styles.iconContainer }>
        <Image style={ styles.icon } source={ icon } />
      </View>
      <Text style={ styles.text }>{ text }</Text>
    </Pressable>
  );
}
