import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
import storageReducer from './storageSlice';

// https://medium.com/@faisalqayyum.se/understanding-redux-and-implementing-it-with-redux-toolkit-in-react-native-adad4a14a881

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    storage: storageReducer
  },
});