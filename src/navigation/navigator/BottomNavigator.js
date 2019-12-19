import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HomeView from '../../screens/home/HomeView';
import ProfileView from '../../screens/profiles/ProfileView';
import ChatView from '../../screens/chat/ChatView';
import LogView from '../../screens/logs/LogView';
import GlobalFont from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
import { createStackNavigator } from 'react-navigation-stack';
/** === REGISTER PAGE ROOT HOME TO STACK === */
const HomeViewStack = createStackNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
});
/** === REGISTER PAGE ROOT LOG TO STACK === */
const LogViewStack = createStackNavigator({
  LogView: {
    screen: LogView,
    navigationOptions: {
      headerTitle: 'Log',
      headerTitleStyle: GlobalFont.type5,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
});
/** === REGISTER PAGE ROOT CHAT TO STACK === */
const ChatViewStack = createStackNavigator({
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      headerTitle: 'Chat',
      headerTitleStyle: GlobalFont.type5,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
});
/** === REGISTER PAGE ROOT PROFILE TO STACK === */
const ProfileViewStack = createStackNavigator({
  ProfileView: {
    screen: ProfileView,
    navigationOptions: {
      headerTitle: 'Profil',
      headerTitleStyle: GlobalFont.type5,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
});
/** === BOTTOM TAB REGISTER === */
const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeViewStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="home" color={tintColor} size={24} />
        )
      }
    },
    Log: {
      screen: LogViewStack,
      navigationOptions: {
        tabBarLabel: 'Log',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="swap-horiz" color={tintColor} size={24} />
        )
      }
    },
    Chat: {
      screen: ChatViewStack,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="chat" color={tintColor} size={24} />
        )
      }
    },
    Profil: {
      screen: ProfileViewStack,
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

export default BottomNavigator;
