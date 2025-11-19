import AsyncStorage from '@react-native-async-storage/async-storage';

export const setWeight = async (units) => {
  await AsyncStorage.setItem('WEIGHT', JSON.stringify(units));
};

export const setTemp = async (units) => {
  await AsyncStorage.setItem('TEMP', JSON.stringify(units));
};