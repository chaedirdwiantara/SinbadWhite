import { React, Component } from './src/library/reactPackage';
import { Provider, PersistGate } from './src/library/thirdPartyPackage';
import Navigator from './src/navigation';
import { Store, Persistor } from './src/state/Store';
import { ErrorBoundary } from './src/library/component';

class Main extends Component {
  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={Persistor} loading={null}>
          <ErrorBoundary>
            <Navigator />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
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
