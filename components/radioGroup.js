import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';

export default function RadioGroup({ data, selected = 0, onSelect }) {
  const getSelectedStyle = (i) => selected === i ? { backgroundColor: colors.white } : null;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      padding: spacing.md,
      width: '100%',
      borderRadius: 16
    }
  });

  return (
    <View style={styles.container}>
      { data.map((item, i) => (
        <Pressable key={ i } style={ [styles.item, getSelectedStyle(i)] } onPress={ () => onSelect(i) }>
          <Text>{ item.title }</Text>
          <Text>{ item.subtitle }</Text>
        </Pressable>
      ))}
    </View>
  );
}
