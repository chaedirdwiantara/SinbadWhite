import React from 'react';
import { View } from 'react-native';
import NotificationView from '../../screens/notifications/NotificationView';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const NotificationNavigator = {
  NotificationView: {
    screen: NotificationView,
    navigationOptions: {
      headerTitle: 'Notifikasi',
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

export default NotificationNavigator;
