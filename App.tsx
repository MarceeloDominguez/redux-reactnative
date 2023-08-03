import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import HomeScreen from './src/screen/HomeScreen';

function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
