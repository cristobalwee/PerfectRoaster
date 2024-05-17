import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './pages/home';
import RecipesScreen from './pages/recipes';
import { fontFamilies, spacing, textSizes } from './constants/styles';
import RecipeScreen from './pages/recipePage';
import SelectionPage from './pages/selectionPage';
import TimerPage from './pages/timer';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Intro': require('./assets/fonts/Intro.otf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  const getBackButton = (navigation) => (
    <Pressable onPress={ () => navigation.goBack() }>
      <Image style={{ width: 24, height: 24 }} source={ require('./assets/images/icons/chevron-left.png') } />
    </Pressable>
  )

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
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
              headerLeft: () => getBackButton(navigation),
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
            component={SelectionPage} 
            options={({ navigation }) => ({
              title: 'Peso',
              headerLeft: () => getBackButton(navigation),
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: fontFamilies.subhead,
                fontSize: textSizes.navHeader
              }
            })}
          />
          <Stack.Screen 
            name='CookSelection' 
            component={SelectionPage} 
            options={({ navigation }) => ({
              title: 'Cocción',
              headerLeft: () => getBackButton(navigation),
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
              headerLeft: () => getBackButton(navigation),
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
  );
}
