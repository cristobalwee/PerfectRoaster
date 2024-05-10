import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import CardButton from '../components/cardButton';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 175,
    justifyContent: 'flex-start',
    marginRight: spacing.sm
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: borderRadius,
    marginBottom: spacing.xs
  }
});

export default function Recipe({ img, title, subtitle, size = 'sm', offset, onPress }) {
  const getOffset = () => offset ? { marginLeft: spacing.lg } : null;
  
  return (
    <View style={[styles.container, getOffset()] }>
      <Pressable style={{ height: '100%', width: '100%' }} onPress={ onPress }>
        <Image style={ styles.image } source={ img } />
        <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.body }}>{ title }</Text>
        <Text style={{ fontFamily: fontFamilies.paragraph, fontSize: textSizes.body }}>{ subtitle }</Text>
      </Pressable>
    </View>
  );
}
