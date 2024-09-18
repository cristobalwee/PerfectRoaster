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
  },
  pivotImageContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius,
    overflow: 'hidden'
  },
  pivotImage: {
    width: '100%',
    height: '100%'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
});

export default function Pivot({ media, title, subtitle, size = 'lg', onPress }) {  
  return (
    <Pressable style={styles.container} onPress={ onPress }>
      <View style={ styles.content }>
        <View style={ styles.pivotImageContainer }>
         <Image style={ styles.pivotImage } source={ media } />
         <View style={ styles.imageOverlay }></View>
        </View>
        <View style={ styles.innerContent }>
          <Text style={{ fontFamily: fontFamilies.subhead, fontSize: textSizes.body }}>{ title }</Text>
          <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.body }}>{ subtitle }</Text>
        </View>
      </View>
      <Image style={ styles.icon } source={ require('../assets/images/icons/chevron-right.png') } />
    </Pressable>
  );
}
