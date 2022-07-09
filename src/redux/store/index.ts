import { configureStore } from '@reduxjs/toolkit';
import { coinsDataSlice } from '../features/coinsData-slice';

export const store = configureStore({
  reducer: {
    coinsData: coinsDataSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch