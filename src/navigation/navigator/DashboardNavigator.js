import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import DashboardView from '../../screens/dashboard/DashboardView';

const DashboardNavigator = {
  DashboardView: {
    screen: DashboardView,
    navigationOptions: {
      headerTitle: 'Dashboard',
      headerTitleStyle: [
        GlobalFont.type5,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  }
};

export default DashboardNavigator;
