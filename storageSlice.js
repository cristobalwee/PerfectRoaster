import { createSlice } from '@reduxjs/toolkit';

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    locale: 'es_PE',
    onboarded: false
  },
  reducers: {
    setLocale: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.locale = payload;
    },
    setOnboarded: (state) => {
      state.onboarded = true;
    }
  },
  selectors: {
    selectLocale: (sliceState) => sliceState.locale,
    selectOnboarded: (sliceState) => sliceState.onboarded
  }
});

export const { setLocale, setOnboarded } = storageSlice.actions;
export const { selectLocale, selectOnboarded } = storageSlice.selectors;

export default storageSlice.reducer;