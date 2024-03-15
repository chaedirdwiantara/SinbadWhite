import { React, Component } from './src/library/reactPackage';
import { Provider, PersistGate } from './src/library/thirdPartyPackage';
import Navigator from './src/navigation';
import { Store, Persistor } from './src/state/Store';
import SentryCore from './src/services/report/sentry/SentryCore';
import RealTimeActionFirebase from './src/screens/global/RealTimeActionFirebase';
import MoengageCore from './src/services/report/moengage/MoengageCore';

class Main extends Component {
  render() {
    return (
      <SentryCore>
        <Provider store={Store}>
          <PersistGate persistor={Persistor} loading={null}>
            <MoengageCore />
            <RealTimeActionFirebase />
            <Navigator />
          </PersistGate>
        </Provider>
      </SentryCore>
    );
  }
}

export default Main;
