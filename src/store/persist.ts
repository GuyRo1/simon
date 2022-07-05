import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from './../config/config';

export const persistConfig = {
  key: config.persistKey,
  storage: AsyncStorage,
};
