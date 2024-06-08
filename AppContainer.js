import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/home';
import RecipesScreen from './pages/recipes';
import { fontFamilies, spacing, textSizes } from './constants/styles';
import RecipeScreen from './pages/recipePage';
import WeightSelectionPage from './pages/weightSelectionPage';
import CookSelectionPage from './pages/cookSelectionPage';
import TimerPage from './pages/timer';
import OnboardingLocales from './pages/onboardingLocale';
import OnboardingIntro from './pages/onboardingIntro';
import OnboardingRecs from './pages/onboardingRecs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocale, setTempUnits, setWeightUnits } from './storageSlice';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892

const Stack = createNativeStackNavigator();

export default function AppContainer({ onboarded, locale, tempUnits, weightUnits }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const formatLocale = locale ? 'en_US' : 'es_PE';
    const formatTemp = tempUnits ? 'temp_fahrenheit' : 'temp_celsius';
    const formatWeight = weightUnits ? 'weight_lbs' : 'weight_gr';

    dispatch(setLocale(formatLocale));
    dispatch(setTempUnits(formatTemp));
    dispatch(setWeightUnits(formatWeight));
  });

  const getBackButton = (back) => (
    <Pressable onPress={ back }>
      <Image style={{ width: 24, height: 24 }} source={ require('./assets/images/icons/chevron-left.png') } />
    </Pressable>
  );

  return (
    <Stack.Navigator initialRouteName={ onboarded ? 'Home' : 'OnboardingLocale' }>
      <Stack.Screen 
        name='OnboardingLocale' 
        component={OnboardingLocales}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='OnboardingIntro' 
        component={OnboardingIntro}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='OnboardingRecs' 
        component={OnboardingRecs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='Recipes' 
        component={RecipesScreen} 
        options={({ navigation }) => ({
          title: 'Recetas',
          headerLeft: () => getBackButton(() => navigation.goBack()),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamilies.subhead,
            fontSize: textSizes.navHeader
          }
        })}
      />
      <Stack.Screen 
        name='Recipe' 
        component={RecipeScreen} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='WeightSelection' 
        component={WeightSelectionPage} 
        options={({ navigation }) => ({
          title: 'Configuración',
          headerLeft: () => getBackButton(() => navigation.goBack()),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamilies.subhead,
            fontSize: textSizes.navHeader
          }
        })}
      />
      <Stack.Screen 
        name='CookSelection' 
        component={CookSelectionPage} 
        options={({ navigation }) => ({
          title: 'Cocción',
          headerLeft: () => getBackButton(() => navigation.goBack()),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamilies.subhead,
            fontSize: textSizes.navHeader
          }
        })}
      />
      <Stack.Screen 
        name='Timer' 
        component={TimerPage} 
        options={({ navigation }) => ({
          title: 'Temporizador',
          headerLeft: () => getBackButton(() => navigation.navigate('Home', { resetState: true })),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamilies.subhead,
            fontSize: textSizes.navHeader
          }
        })}
      />
    </Stack.Navigator>
  );
}
