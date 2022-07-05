import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameScreen from './src/screens/GameScreen/GameScreen';
import ScoreScreen from './src/screens/ScoreScreen/ScoreScreen';
import {useAppDispatch} from './src/store/hooks';
import {config} from './src/config/config';
import {setRecords} from './src/store/slices/bestScoresSlice';

const stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const currentStorage = await AsyncStorage.getItem(config.bestScoresKey);
      if (currentStorage !== null) {
        const bestScores = JSON.parse(currentStorage);
        dispatch(setRecords(bestScores));
      }
    };
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="main">
        <stack.Screen
          name="main"
          component={GameScreen}
          options={{title: 'Home'}}
        />
        <stack.Screen
          name="topTen"
          component={ScoreScreen}
          options={{title: 'Best scores'}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
