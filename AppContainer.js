import { Pressable, Text, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/home';
import RecipesScreen from './pages/recipes';
import { fontFamilies, textSizes } from './constants/styles';
import RecipeScreen from './pages/recipePage';
import WeightSelectionPage from './pages/weightSelectionPage';
import CookSelectionPage from './pages/cookSelectionPage';
import TimerPage from './pages/timer';
import OnboardingLocales from './pages/onboardingLocale';
import OnboardingIntro from './pages/onboardingIntro';
import OnboardingRecs from './pages/onboardingRecs';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, setTempUnits, setWeightUnits, selectLocale } from './storageSlice';
import { selectActiveCut } from './timerSlice';
import getTranslation from './utils/getTranslation';
import MultiStepNoticePage from './pages/multiStepNotice';
import notifee, { EventType } from '@notifee/react-native';

// https://www.reactnative.university/blog/live-activities-unleashed
// https://medium.com/@rafiulansari/building-a-react-native-app-part-iv-onboarding-screens-6ef48caefd6c 
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892

const Stack = createNativeStackNavigator();

export default function AppContainer({ onboarded, locale, tempUnits, weightUnits, navigation }) {
  const dispatch = useDispatch();
  const activeCut = useSelector(selectActiveCut);
  const currLocale = useSelector(selectLocale);

  const [fontsLoaded, fontError] = useFonts({
    Intro: require('./assets/fonts/Intro.otf'),
    Poppins_Regular: require('./assets/fonts/Poppins-Regular.otf'),
    Poppins_SemiBold: require('./assets/fonts/Poppins-SemiBold.otf')
  });

  useEffect(() => {
    dispatch(setLocale(locale));
    dispatch(setTempUnits(tempUnits));
    dispatch(setWeightUnits(weightUnits));

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed:', detail.notification);
      }
    });

    return () => unsubscribe();
  }, [onboarded, locale, tempUnits, weightUnits]);

  if (!fontsLoaded && !fontError) {
    console.log('loading');
    return <Text>Loading</Text>;
  };

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
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen 
        name='Recipes' 
        component={RecipesScreen} 
        options={({ navigation }) => ({
          title: getTranslation('recipes', currLocale),
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
          title: getTranslation('config', currLocale),
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
          title: getTranslation('config', currLocale),
          headerLeft: () => getBackButton(() => navigation.goBack()),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamilies.subhead,
            fontSize: textSizes.navHeader
          }
        })}
      />
      <Stack.Screen 
        name='MultiStep' 
        component={MultiStepNoticePage} 
        options={({ navigation }) => ({
          title: getTranslation('instructions', currLocale),
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
          title: getTranslation('timer', currLocale),
          headerLeft: () => {
            const backFn = activeCut ? () => navigation.navigate('Home', { resetState: true }) : () => navigation.goBack();
            return getBackButton(backFn);
          },
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
