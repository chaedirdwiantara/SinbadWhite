import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromRight } from 'react-navigation-transitions';
import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomNavigator';
import NotificationNavigator from './NotificationNavigator';

const MergeAllNavigator = {
  ...AuthNavigator,
  ...NotificationNavigator
};

const config = {
  transitionConfig: () => fromRight()
};

const StackNavigator = createStackNavigator(MergeAllNavigator, config);

const DrawerNavigator = createDrawerNavigator({
  StackNavigator: { screen: StackNavigator },
  BottomNavigator: { screen: BottomNavigator }
});

export default createAppContainer(DrawerNavigator);
