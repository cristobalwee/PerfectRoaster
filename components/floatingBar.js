import { StyleSheet, Text, Image, Pressable, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FloatingBar({ content, onPress, isRecipe }) {  
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    notice: {
      position: 'absolute',
      bottom: spacing.sm + insets.bottom,
      left: spacing.md,
      right: spacing.md,
      borderRadius: 16,
      backgroundColor: colors.white,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.02,
      shadowRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs
    },
    innerContent: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
      maxWidth: '90%'
    },
    leftIcon: {
      width: 24,
      height: 24
    },
    rightIcon: {
      width: 20,
      height: 20,
      transform: 'rotate(-90deg)'
    }
  });

  return (
    <Pressable style={ styles.notice } onPress={ onPress }>
      <View style={ styles.innerContent }>
        { isRecipe ? (
            <Image style={ styles.leftIcon } source={ require('../assets/images/icons/play.png') } />
          ) : (
            <Image style={ styles.leftIcon } source={ require('../assets/images/icons/info.png') } />
          )
        }
        <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.bodySmall, flex: 1, flexWrap: 'wrap' }}>{ content }</Text>
      </View>
      <Image style={ styles.rightIcon } source={ require('../assets/images/icons/chevron-right.png') } />
    </Pressable>
  );
}
