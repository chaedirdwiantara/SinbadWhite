import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GlobalFont from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
/**
 * ==================================
 * IMPORT ALL NAVIGATOR PAGE FOR TAB
 * =================================
 */
/** === HOME === */
import HomeNavigator from './HomeNavigator';
/** === PROFILE === */
import ProfileNavigator from './ProfileNavigator';
/** === LOG === */
import LogNavigator from './LogNavigator';
/** === CHAT === */
import ChatNavigator from './ChatNavigator';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(HomeNavigator),
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="home" color={tintColor} size={24} />
        )
      }
    },
    Log: {
      screen: createStackNavigator(LogNavigator),
      navigationOptions: {
        tabBarLabel: 'Log',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="swap-horiz" color={tintColor} size={24} />
        )
      }
    },
    Chat: {
      screen: createStackNavigator(ChatNavigator),
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="chat" color={tintColor} size={24} />
        )
      }
    },
    Profil: {
      screen: createStackNavigator(ProfileNavigator),
      navigationOptions: {
        tabBarLabel: 'Profil',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="account-circle" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    order: ['Home', 'Log', 'Chat', 'Profil'],
    initialRouteName: 'Home',
    tabBarOptions: {
      labelStyle: GlobalFont.bottomNav,
      activeTintColor: masterColor.mainColor,
      inactiveTintColor: masterColor.fontBlack60,
      showIcon: true,
      showLabel: true
    }
  }
);

const BottomNavigator = {
  BottomNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: {
      headerShown: false
    }
  }
};

export default BottomNavigator;
