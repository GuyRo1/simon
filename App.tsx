import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';

import GameScreen from './src/screens/GameScreen/Game.screen';
import ScoreScreen from './src/screens/ScoreScreen/Score.screen';

import {store} from './src/store/store';

const tabs = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <tabs.Navigator
          screenOptions={{
            headerShown: false,
            tabBarIconStyle: {display: 'none'},
          }}
          initialRouteName="main">
          <tabs.Screen
            name="main"
            component={GameScreen}
            options={{title: 'Home'}}
          />
          <tabs.Screen
            name="topTen"
            component={ScoreScreen}
            options={{title: 'Best scores'}}
          />
        </tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
