import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import { useEffect, useState } from 'react';
import { storage } from './utils/storage';
import notifee, { EventType } from '@notifee/react-native';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892
// https://github.com/mrousavy/react-native-mmkv#readme

export default function App() {
  const [isOnboarded, setOnboarded] = useState(false);
  const [locale, setLocale] = useState('es_PE');
  const [tempUnits, setTemp] = useState('temp_celsius')
  const [weightUnits, setWeight] = useState('weight_gr');

  const [fontsLoaded, fontError] = useFonts({
    'Intro': require('./assets/fonts/Intro.otf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  if (!fontsLoaded && !fontError) {
    console.log('loading');
    return null;
  };

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('User pressed the notification.', detail.pressAction.id);
    }
  });

  useEffect(() => {
    setOnboarded(storage.getBoolean('onboarded'));
    setLocale(storage.getString('locale'));
    setTemp(storage.getString('tempUnits'));
    setWeight(storage.getString('weightUnits'));
  }, []);

  return (
    <Provider store={ store }>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContainer onboarded={ isOnboarded } locale={ locale } tempUnits={ tempUnits } weightUnits={ weightUnits } />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
