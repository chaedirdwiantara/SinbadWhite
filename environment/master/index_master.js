/**
 * @format
 */
import { React, Component, AppRegistry } from './src/library/reactPackage';
import Main from './Main';
import { name as appName } from './app.json';
// eslint-disable-next-line import/default
import codePush from 'react-native-code-push';

class CoreApp extends Component {
  render() {
    return <Main />;
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};

// eslint-disable-next-line no-class-assign
CoreApp = codePush(codePushOptions)(CoreApp);
export default CoreApp;

AppRegistry.registerComponent(appName, () => CoreApp);
