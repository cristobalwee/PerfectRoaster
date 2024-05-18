import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookData } from '../data/cookData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground,
    padding: spacing.lg
  }
});

const getValues = (val) => {
  return Array.isArray(val) ? val[0] : val;
}

export default function TimerPage({ route, navigation }) {
  const { cut, weight, cook } = route.params;
  let finalCookTime = getValues(cookData[cut][weight].cooks);
  if (cook) {
    finalCookTime = getValues(cook);
  }

  return (
    <ScrollView style={styles.container}>
      <Text>{ finalCookTime } </Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
