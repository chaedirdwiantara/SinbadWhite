import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
/** === PAGE === */
import BottomNavigator from './BottomNavigator';
import AuthNavigator from './AuthNavigator';
import NotificationNavigator from './NotificationNavigator';
import DashboardNavigator from './DashboardNavigator';

const MergeAllNavigator = {
  ...NotificationNavigator,
  ...DashboardNavigator,
  ...BottomNavigator
};

const config = {
  transitionConfig: () => fromRight()
};

const StackAppNavigator = createStackNavigator(MergeAllNavigator, {
  ...config,
  initialRouteName: 'BottomNavigator'
});
const StackAuthNavigator = createStackNavigator(AuthNavigator, config);

const SwitchNavigator = createSwitchNavigator(
  {
    App: StackAppNavigator,
    Auth: StackAuthNavigator
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(SwitchNavigator);
