import { configureStore } from '@reduxjs/toolkit'
import { playerReducer, filterReducer } from '../reducer';

export const store = configureStore({
  reducer: {
    players: playerReducer,
    filters: filterReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
