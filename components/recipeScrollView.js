import { ScrollView } from 'react-native';
import { selectLocale } from '../storageSlice';
import { useSelector } from 'react-redux';
import recipeList from '../data/recipes';
import Recipe from './recipe';

export default function RecipeScrollView({ onPress }) {
  const locale = useSelector(selectLocale);
  const recipeArray = Object.keys(recipeList[locale]);

  return (
    <ScrollView horizontal>
      { recipeArray.map((recipe, i) => (
        <Recipe
          title={ recipeList[locale][recipe]?.title }
          img={ recipeList[locale][recipe]?.img }
          onPress={ () => onPress(locale, recipe) }
          offset={ i === 0 }
          key={ recipeList[locale][recipe]?.id }
          duration={ `${recipeList[locale][recipe]?.time}min` }
        />
      ))}
    </ScrollView>
  )
}
