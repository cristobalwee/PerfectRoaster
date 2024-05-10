import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CardButton from '../components/cardButton';
import { colors } from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground,
  },
});

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Intro', fontSize: 30 }}>Recipes</Text>
      <StatusBar style="auto" />
    </View>
  );
}
