import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/state/Store';
const { persistor, store } = configureStore();

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default Main;
