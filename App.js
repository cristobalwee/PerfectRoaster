import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892

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
    <Provider store={ store }>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
