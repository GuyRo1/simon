import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from './src/screens/GameScreen/GameScreen';
import ScoreScreen from './src/screens/ScoreScreen/ScoreScreen';

const stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;
