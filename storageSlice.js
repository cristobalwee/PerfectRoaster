import { createSlice } from '@reduxjs/toolkit';

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    locale: 'es_PE'
  },
  reducers: {
    setLocale: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.locale = payload;
    }
  },
  selectors: {
    selectLocale: (sliceState) => sliceState.locale
  }
});

export const { setLocale } = storageSlice.actions;
export const { selectLocale } = storageSlice.selectors;

export default storageSlice.reducer;