import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import { Provider } from 'react-redux';
import HomeScreen from './pages/home';
import RecipesScreen from './pages/recipes';
import { fontFamilies, spacing, textSizes } from './constants/styles';
import RecipeScreen from './pages/recipePage';
import WeightSelectionPage from './pages/weightSelectionPage';
import CookSelectionPage from './pages/cookSelectionPage';
import TimerPage from './pages/timer';

// https://www.reactnative.university/blog/live-activities-unleashed

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Intro': require('./assets/fonts/Intro.otf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  const getBackButton = (back) => (
    <Pressable onPress={ back }>
      <Image style={{ width: 24, height: 24 }} source={ require('./assets/images/icons/chevron-left.png') } />
    </Pressable>
  )

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={ store }>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
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
                title: 'Tamaño',
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
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
