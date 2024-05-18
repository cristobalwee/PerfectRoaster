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
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      marginBottom: spacing.xl,
      width: '100%',
      borderRadius: 16,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    radio: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      borderColor: colors.black,
      borderWidth: 2,
      marginRight: 36,
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    innerRadio: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: colors.black,
    },
    title: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.header2
    },
    subtitle: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      marginBottom: 8
    }
  });

  return (
    <View style={styles.container}>
      { data.map((item, i) => (
        <Pressable key={ i } style={ [styles.item, getSelectedStyle(i)] } onPress={ () => onSelect(i) }>
          <View style={ styles.radio }>
            { selected === i && <View style={ styles.innerRadio }/> }
          </View>
          <View style={ styles.content }>
            <Text style={ styles.subtitle }>{ item.subtitle }</Text>
            <Text style={ styles.title }>{ item.title }</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
