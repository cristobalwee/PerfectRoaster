import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { fontFamilies, textSizes } from '../constants/styles';
import Toggle from './toggle';

const styles = StyleSheet.create({
  unitPivot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  unitPivotTitle: {
    fontFamily: fontFamilies.subhead,
    fontSize: textSizes.body
  }
});

export default function ListItem({ title, onSelect, selected, data }) {  
  return (
    <View key={ 1 } style={ styles.unitPivot }>
      <Text style={ styles.unitPivotTitle }>{ title}</Text>
      <Toggle 
        onSelect={ onSelect }
        selected={ selected }
        data={ data }
      />
    </View>
  );
}
