import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import HistoryView from '../../screens/history/HistoryView';

const HistoryNavigator = {
  HistoryView: {
    screen: HistoryView,
    navigationOptions: {
      headerTitle: 'Pesanan',
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

export default HistoryNavigator;
