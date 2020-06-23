import React from 'react';
import { View } from 'react-native';
import LogDetailView from '../../screens/logs/LogDetailView';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const LogNavigator = {
  LogDetailView: {
    screen: LogDetailView,
    navigationOptions: {
      headerTitle: 'Detail Log',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
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

export default LogNavigator;
