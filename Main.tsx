import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './src/screens/GameScreen/GameScreen';
import ScoreScreen from './src/screens/ScoreScreen/ScoreScreen';

const stack = createNativeStackNavigator();

const Main = () => {
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
