import { Pressable, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';

export default function Button({ text, icon, as, fullWidth = false, onPress }) {
  const backgroundColors = {
    'primary': colors.black,
    'secondary': colors.white
  };
  const foregroundColors = {
    'primary': colors.white,
    'secondary': colors.dark
  };

  if (as === 'link') {
    return (
      <Pressable onPress={ onPress }>
        <Text 
          style={{ 
            fontFamily: fontFamilies.paragraph,
            fontSize: textSizes.bodySmall,
            textDecorationLine: 'underline',
            color: colors.link
          }}
        >
          { text }
        </Text>
      </Pressable>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.white,
      borderRadius: borderRadius,
      backgroundColor: backgroundColors[as]
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    text: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.body,
      color: foregroundColors[as],
      marginRight: !!icon ? spacing.xs : null
    }
  });

  return (
    <Pressable style={styles.container} onPress={ onPress }>
      <View style={styles.content}>
        <Text style={styles.text}>{ text }</Text>
        { icon }
      </View>
    </Pressable>
  );
}
