import {configureStore} from '@reduxjs/toolkit';
import bestScoresReducer from './slices/bestScoresSlice';
import gameDataReducer from './slices/gameSlice';
import {persistConfig} from './persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    bestScores: persistReducer(persistConfig, bestScoresReducer),
    gameData: gameDataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
