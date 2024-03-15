/**
 * @format
 */
import { AppRegistry } from './src/library/reactPackage';
import Main from './Main';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Main);
