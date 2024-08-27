import { StyleSheet, Text, View } from 'react-native';
import { fontFamilies, spacing, textSizes } from '../constants/styles';

const styles = StyleSheet.create({
  body: {
    fontFamily: fontFamilies.paragraph,
    fontSize: textSizes.body
  },
  doneModalButtonContainer: {
    gap: spacing.sm,
    marginTop: spacing.lg
  }
});

export default function DoneModal({ body, children }) {  
  return (
    <View>
      <Text style={ styles.body }>{ body }</Text>
      <View style={ styles.doneModalButtonContainer }>
        { children }
      </View>
    </View>
  );
}
