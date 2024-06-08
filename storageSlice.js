import { createSlice } from '@reduxjs/toolkit';

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    locale: 'es_PE',
    tempUnits: 'temp_celsius',
    weightUnits: 'weight_gr',
    onboarded: false
  },
  reducers: {
    setLocale: (state, action) => {
      const { payload } = action;
      state.locale = payload;
    },
    setTempUnits: (state, action) => {
      const { payload } = action;
      state.tempUnits = payload;
    },
    setWeightUnits: (state, action) => {
      const { payload } = action;
      state.weightUnits = payload;
    },
    setOnboarded: (state) => {
      state.onboarded = true;
    }
  },
  selectors: {
    selectLocale: (sliceState) => sliceState.locale,
    selectOnboarded: (sliceState) => sliceState.onboarded,
    selectTempUnits: (sliceState) => sliceState.tempUnits,
    selectWeightUnits: (sliceState) => sliceState.weightUnits
  }
});

export const { setLocale, setTempUnits, setWeightUnits, setOnboarded } = storageSlice.actions;
export const { selectLocale, selectOnboarded, selectTempUnits, selectWeightUnits } = storageSlice.selectors;

export default storageSlice.reducer;