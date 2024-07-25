import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, FlatList, View } from 'react-native';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useSelector } from 'react-redux';
import { selectLocale } from '../storageSlice';
import getTranslation from '../utils/getTranslation';
import { useEffect } from 'react';
import { notifTapListener } from '../utils/notifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground
  },
  content: {
    padding: spacing.lg
  },
  sectionTitle: {
    fontFamily: fontFamilies.subhead,
    fontSize: textSizes.body,
    marginBottom: spacing.md
  },
  subSection: {
    flex: 1,
    gap: spacing.xs,
    marginBottom: spacing.lg
  },
  item: {
    fontFamily: fontFamilies.body,
    fontSize: textSizes.body
  }
});

export default function RecipeScreen({ route, navigation }) {
  const { recipe: { title, img, time, ingredients, procedure } } = route.params;
  const locale = useSelector(selectLocale);

  return (
    <ScrollView style={styles.container}>
      <Hero
        background={ img }
        title={ title }
        eyebrow={ `${time}min` }
        back={ () => navigation.goBack() }
        size='sm'
      />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{ getTranslation('ingredients', locale) }</Text>
        <View style={styles.subSection}>
          <Text style={styles.item}>{ getTranslation('meat', locale) }</Text>
          <Text style={[styles.item, { paddingLeft: spacing.xs }]}>{`\u2022 ${ingredients.meat}`}</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.item}>Rub</Text>
          { ingredients.rub.map(item => (
            <Text key={item} style={[styles.item, { paddingLeft: spacing.xs }]}>{`\u2022 ${item}`}</Text>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { marginBottom: spacing.sm }]}>{ getTranslation('procedure', locale) }</Text>
        <View style={styles.subSection}>
          { procedure.map((item, i) => (
            <Text key={i} style={[styles.item, { paddingLeft: spacing.xs }]}>{`${i + 1}. ${item}`}</Text>
          ))}
        </View>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
}
