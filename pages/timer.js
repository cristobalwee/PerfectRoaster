import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import Button from '../components/button';
import { cookTimes } from '../data/cookTimes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground,
    padding: spacing.lg
  }
});

const getValue = (cut, weight, cook) => {
  if (weight) {
    if (cook) return cookTimes[cut][weight][cook];

    return cookTimes[cut][weight];
  }

  if (cook) return cookTimes[cut][cook];

  return cookTimes[cut]
}

export default function TimerPage({ route, navigation }) {
  const { cut, weight = null, cook = null } = route.params;
  const val = getValue(cut, weight, cook);
  if (typeof val === 'number') {
    toShow = val;
  } else if (Array.isArray(val)) {
    toShow = val[0];
  }
  return (
    <ScrollView style={styles.container}>
      <Text>{ toShow }</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
