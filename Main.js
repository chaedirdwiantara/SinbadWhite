import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './src/state/Store';

class Main extends Component {
  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={Persistor} loading={null}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default Main;
