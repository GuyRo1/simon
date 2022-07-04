import {configureStore} from '@reduxjs/toolkit';

import bestScoresReducer from './slices/bestScoresSlice';

export const store = configureStore({
  reducer: {
    bestScores: bestScoresReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
