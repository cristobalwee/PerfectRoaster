import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocaleEN = async (locale) => {
  await AsyncStorage.setItem('LOCALE', locale);
};