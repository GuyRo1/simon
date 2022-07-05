import React from 'react';

import {Provider} from 'react-redux';

import {store, persistor} from './src/store/store';
import Main from './Main';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
);

export default App;
