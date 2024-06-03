import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';

export default function Button({ text, icon, as, fullWidth = false, onPress, arrow }) {
  const backgroundColors = {
    'primary': colors.black,
    'primary_alt': colors.beige,
    'secondary': colors.white,
    'secondary_alt': colors.boxBackground
  };
  const foregroundColors = {
    'primary': colors.white,
    'primary_alt': colors.dark,
    'secondary': colors.dark,
    'secondary_alt': colors.dark
  };
  const getArrow = () => {
    if (arrow) {
      return as === 'primary_alt' || 'secondary' || 'secondary_alt' 
        ? <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/chevron-right.png') } />
        : <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/chevron-right-light.png') } />
    }
  }

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
      flexDirection: 'row',
      gap: spacing.xs
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
        { icon }
        <Text style={styles.text}>{ text }</Text>
        { getArrow() }
      </View>
    </Pressable>
  );
}
