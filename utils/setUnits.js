import AsyncStorage from '@react-native-async-storage/async-storage';

export const setWeightLbs = async (units) => {
  await AsyncStorage.setItem('WEIGHT', units);
};

export const setTempF = async (units) => {
  await AsyncStorage.setItem('TEMP', units);
};