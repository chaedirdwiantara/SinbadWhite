import { React, Component } from './src/library/reactPackage';
import { Provider, PersistGate } from './src/library/thirdPartyPackage';
import Navigator from './src/navigation';
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
