import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CardButton from '../components/cardButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function RecipeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Poppins-Regular' }}>Poppins regular</Text>
      <Text style={{ fontFamily: 'Poppins-SemiBold', marginBottom: '1rem' }}>Poppins SemiBold</Text>
      <Text style={{ fontFamily: 'Intro', fontSize: 30 }}>Poppins Black</Text>
      <CardButton></CardButton>
      <StatusBar style="auto" />
    </View>
  );
}
