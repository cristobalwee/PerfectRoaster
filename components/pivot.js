import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm
  },
  innerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: spacing.xs
  },
  icon: {
    width: 20,
    height: 20
  }
});

export default function Pivot({ media, title, subtitle, size = 'lg', onPress }) {  
  return (
    <Pressable style={styles.container} onPress={ onPress }>
      <View style={ styles.content }>
        { media }
        <View style={ styles.innerContent }>
          <Text style={{ fontFamily: fontFamilies.subhead, fontSize: textSizes.body }}>{ title }</Text>
          <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.body }}>{ subtitle }</Text>
        </View>
      </View>
      <Image style={ styles.icon } source={ require('../assets/images/icons/chevron-right.png') } />
    </Pressable>
  );
}
