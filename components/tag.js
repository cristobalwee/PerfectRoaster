import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';

export default function Tag({ text }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      borderRadius: 6,
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs
    },
    text: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.tag,
      color: '#545454'
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ text }</Text>
    </View>
  );
}
