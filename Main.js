import { React, Component } from './src/library/reactPackage';
import { Provider, PersistGate } from './src/library/thirdPartyPackage';
import Navigator from './src/navigation';
import { Store, Persistor } from './src/state/Store';
import SentryCore from './src/screens/global/SentryCore';

class Main extends Component {
  render() {
    return (
      <SentryCore>
        <Provider store={Store}>
          <PersistGate persistor={Persistor} loading={null}>
            <Navigator />
          </PersistGate>
        </Provider>
      </SentryCore>
    );
  }
}

export default Main;
/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 23072020
 * updatedFunction:
 * -> Add ErrorBoundary for logging
 *
 */
