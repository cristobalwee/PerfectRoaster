import { Pressable, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useState } from 'react';

export default function Toggle({ data, onSelect, selected: defaultSelected = 0 }) {
  const [selected, setSelected] = useState(defaultSelected);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
      backgroundColor: colors.boxBackground,
      borderRadius: borderRadius
    },
    item: {
      padding: 8,
      paddingHorizontal: spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      minWidth: 50
    },
    text: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.bodySmall,
      color: colors.dark
    },
    selected: {
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.06,
      shadowRadius: 10,
    }
  });

  const getSelectedStyle = i => selected === i ? styles.selected : null;

  return (
    <View style={styles.container}>
      { data.map((item, i) => (
        <Pressable key={ i } style={ [styles.item, getSelectedStyle(i)] } onPress={ () => { onSelect(item.id); setSelected(i) } }>
          <Text style={ styles.text }>{ item.text }</Text>
        </Pressable>
      ))}
    </View>
  );
}
