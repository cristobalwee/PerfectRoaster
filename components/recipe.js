import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import Tag from './tag';

export default function Recipe({ img, title, subtitle, size = 'sm', offset, onPress, duration }) {
  const getOffset = () => offset ? { marginLeft: spacing.lg } : null;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: subtitle ? 'auto' :  190,
      justifyContent: 'flex-start',
      marginRight: subtitle ? 0 : spacing.sm,
      marginBottom: subtitle ? spacing.xl : 0
    },
    title: {
      fontFamily: subtitle ? fontFamilies.subhead : fontFamilies.paragraph,
      fontSize: textSizes.body,
      marginBottom: subtitle ? spacing.xs : 0
    },
    subtitle: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.bodySmall
    },
    image: {
      width: '100%',
      height: subtitle ? 170 : 160,
      borderRadius: borderRadius,
      marginBottom: spacing.xs,
      resizeMode: 'cover'
    }
  });
  
  return (
    <View style={[styles.container, getOffset()] }>
      <Pressable style={{ height: '100%', width: '100%', position: 'relative' }} onPress={ onPress }>
        <Image style={ styles.image } source={ img } />
        <Text style={ styles.title }>{ title }</Text>
        { subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text> }
        <Tag text={ duration } />
      </Pressable>
    </View>
  );
}
