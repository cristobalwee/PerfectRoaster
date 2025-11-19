import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import { useEffect, useState } from 'react';
import { storage } from './utils/storage';
import './utils/setupDefaultProps';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892
// https://github.com/mrousavy/react-native-mmkv#readme
// https://ignitecookbook.com/docs/recipes/AccessibilityFontSizes/
// https://medium.com/@runawaytrike/font-scaling-in-react-native-apps-8d38a48fdf26

export default function App() {

  const [isOnboarded, setOnboarded] = useState(false);
  const [locale, setLocale] = useState('es_PE');
  const [tempUnits, setTemp] = useState('temp_celsius')
  const [weightUnits, setWeight] = useState('weight_gr');

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
