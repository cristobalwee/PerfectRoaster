import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing } from '../constants/styles';
import recipeList from '../data/recipes';
import Recipe from '../components/recipe';
import { useSelector } from 'react-redux';
import { selectLocale } from '../storageSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground,
    padding: spacing.lg,
    position: 'relative'
  },
});

export default function RecipesScreen({ navigation }) {
  const locale = useSelector(selectLocale);
  const recipeArray = Object.keys(recipeList[locale]);

  return (
    <ScrollView style={styles.container}>
      { recipeArray.map((recipe, i) => (
        <Recipe
          title={ recipeList[locale][recipe].title }
          subtitle={ recipeList[locale][recipe].description }
          img={ recipeList[locale][recipe].img }
          onPress={ () => navigation.navigate('Recipe', { recipe: recipeList[locale][recipe] }) }
          key={ i }
          duration={ `${recipeList[locale][recipe].time}min` }
        />
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
