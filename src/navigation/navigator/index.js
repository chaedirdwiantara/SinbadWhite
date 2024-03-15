import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
/** === PAGE === */
/** for first screen */
import IntroNavigator from './IntroNavigator';
/** for extra screen */
import ExtraNavigator from './ExtraNavigator';
/** ================= */
import BottomNavigator from './BottomNavigator';
import AuthNavigator from './AuthNavigator';
import NotificationNavigator from './NotificationNavigator';
import DashboardNavigator from './DashboardNavigator';
import JourneyNavigator from './JourneyNavigator';
import MerchantNavigator from './MerchantNavigator';
import LogNavigator from './LogNavigator';
import ProfileNavigator from './ProfileNavigator';
import GlobalNavigator from './GlobalNavigator';
import PdpNavigator from './PdpNavigator';
import OmsNavigator from './OmsNavigator';
import HistoryNavigator from './HistoryNavigator';
import SfaNavigator from './SfaNavigator';
import CollectionNavigator from './CollectionNavigator';
import { nrInit } from '../../../NewRelicRN.js';

const MergeAllNavigator = {
  ...NotificationNavigator,
  ...DashboardNavigator,
  ...BottomNavigator,
  ...JourneyNavigator,
  ...MerchantNavigator,
  ...LogNavigator,
  ...ProfileNavigator,
  ...GlobalNavigator,
  ...PdpNavigator,
  ...OmsNavigator,
  ...HistoryNavigator,
  ...SfaNavigator,
  ...CollectionNavigator
};

const config = {
  transitionConfig: () => fromRight()
};

const IntroAppNavigator = createStackNavigator(IntroNavigator);

const ExtraAppNavigator = createStackNavigator(ExtraNavigator);

const StackAppNavigator = createStackNavigator(MergeAllNavigator, {
  ...config,
  initialRouteName: 'BottomNavigator'
});
const StackAuthNavigator = createStackNavigator(AuthNavigator, config);

const SwitchNavigator = createSwitchNavigator(
  {
    Intro: IntroAppNavigator,
    Extra: ExtraAppNavigator,
    App: StackAppNavigator,
    Auth: StackAuthNavigator
  },
  {
    initialRouteName: 'Intro'
  }
);

nrInit('Intro');

export default createAppContainer(SwitchNavigator);
