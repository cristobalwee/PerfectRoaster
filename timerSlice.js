import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  startedAt: undefined,
  stoppedAt: undefined,
  activeCut: null,
  activeCookTime: 0,
  nextTimer: 0
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action) => {
      const now = new Date().getTime();
      const { payload: { cut, finalCookTime, nextTimer } } = action;
      const { startedAt, stoppedAt } = state;
      
      state.startedAt = stoppedAt ? now - (stoppedAt - startedAt): now;
      state.stoppedAt = undefined;
      state.activeCut = cut;
      state.activeCookTime = finalCookTime;
      state.nextTimer = nextTimer;
    },
    stopTimer: (state) => {
      const now = new Date().getTime();
      state.stoppedAt = now;
    },
    resetTimer: (state) => {
      const { startedAt, stoppedAt } = state;
      const now = new Date().getTime();
      state.startedAt = startedAt ? now : undefined;
      state.stoppedAt = stoppedAt ? now : undefined;
      state.activeCut = null;
      state.activeCookTime = 0;
    }
  },
  selectors: {
    selectStarted: (sliceState) => sliceState.startedAt,
    selectStopped: (sliceState) => sliceState.stoppedAt,
    selectActiveCut: (sliceState) => sliceState.activeCut,
    selectActiveCookTime: (sliceState) => sliceState.activeCookTime,
    selectLocalTime: (sliceState) => sliceState.localTime,
    selectNextTimer: (sliceState) => sliceState.nextTimer
  }
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;
export const { selectStarted, selectStopped, selectActiveCut, selectActiveCookTime, selectLocalTime, selectNextTimer } = timerSlice.selectors;

export default timerSlice.reducer;