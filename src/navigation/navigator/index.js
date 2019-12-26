import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
/** === PAGE === */
/** for first screen */
import IntroNavigator from './IntroNavigator';
/** ================= */
import BottomNavigator from './BottomNavigator';
import AuthNavigator from './AuthNavigator';
import NotificationNavigator from './NotificationNavigator';
import DashboardNavigator from './DashboardNavigator';
import JourneyNavigator from './JourneyNavigator';
import MerchantNavigator from './MerchantNavigator';
import LogNavigator from './LogNavigator';
/** === STATE DATA === */
import { Store } from '../../state/Store';
const stateData = Store.getState();

const MergeAllNavigator = {
  ...NotificationNavigator,
  ...DashboardNavigator,
  ...BottomNavigator,
  ...JourneyNavigator,
  ...MerchantNavigator,
  ...LogNavigator
};

const config = {
  transitionConfig: () => fromRight()
};

const IntroAppNavigator = createStackNavigator(IntroNavigator);

const StackAppNavigator = createStackNavigator(MergeAllNavigator, {
  ...config,
  initialRouteName: 'BottomNavigator'
});
const StackAuthNavigator = createStackNavigator(AuthNavigator, config);

const SwitchNavigator = createSwitchNavigator(
  {
    Intro: IntroAppNavigator,
    App: StackAppNavigator,
    Auth: StackAuthNavigator
  },
  {
    initialRouteName: 'Intro'
  }
);

export default createAppContainer(SwitchNavigator);
