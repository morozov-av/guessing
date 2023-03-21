import { configureStore } from '@reduxjs/toolkit';
import playerSlice from './playerSlice';
import roundSlice from './roundSlice';

const store = configureStore(
  {
    reducer: {
      player: playerSlice.reducer,
      round: roundSlice.reducer
    }
  }
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
