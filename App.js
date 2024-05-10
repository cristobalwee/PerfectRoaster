import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './pages/home';
import RecipesScreen from './pages/recipes';
import { fontFamilies, textSizes } from './constants/styles';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Intro': require('./assets/fonts/Intro.otf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  });

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
            options={{
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: fontFamilies.subhead,
                fontSize: textSizes.navHeader
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
