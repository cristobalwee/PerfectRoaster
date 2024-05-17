import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, spacing } from '../constants/styles';
import { recipeList } from '../data/recipes';
import Recipe from '../components/recipe';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground,
    padding: spacing.lg,
    position: 'relative'
  },
});

export default function RecipesScreen({ navigation }) {
  const recipeArray = Object.keys(recipeList);

  return (
    <ScrollView style={styles.container}>
      { recipeArray.map((recipe, i) => (
        <Recipe
          title={ recipeList[recipe].title }
          subtitle={ recipeList[recipe].description }
          img={ recipeList[recipe].img }
          onPress={ () => navigation.navigate('Recipe', { recipe: recipeList[recipe] }) }
          key={ i }
          duration={ `${recipeList[recipe].time}min` }
        />
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
