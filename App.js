import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './AppContainer';
import { useEffect, useState } from 'react';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892

const Stack = createNativeStackNavigator();

export default function App() {
  const [onboarded, setOnboarded] = useState();
  const [locale, setLocale] = useState();
  const [tempUnits, setTemp] = useState();
  const [weightUnits, setWeight] = useState();
  const [fontsLoaded, fontError] = useFonts({
    'Intro': require('./assets/fonts/Intro.otf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    return null;
  };

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const isOnboarded = await AsyncStorage.getItem('ONBOARDED');
    const locale = await AsyncStorage.getItem('LOCALE');
    const temp = await AsyncStorage.getItem('TEMP');
    const weight = await AsyncStorage.getItem('WEIGHT');

    setOnboarded(JSON.parse(isOnboarded));
    setLocale(JSON.parse(locale));
    setTemp(JSON.parse(temp));
    setWeight(JSON.parse(weight));
  };

  return (
    <Provider store={ store }>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContainer onboarded={ onboarded } locale={ locale } tempUnits={ tempUnits } weightUnits={ weightUnits } />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
