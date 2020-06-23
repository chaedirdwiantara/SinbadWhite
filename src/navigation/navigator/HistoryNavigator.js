import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import HistoryView from '../../screens/history/HistoryView';
import HistoryDetailView from '../../screens/history/HistoryDetailView';
import HistoryDetailStatusView from '../../screens/history/HistoryDetailStatusView';

const HistoryNavigator = {
  HistoryView: {
    screen: HistoryView,
    navigationOptions: {
      headerTitle: 'Pesanan',
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
  },
  HistoryDetailView: {
    screen: HistoryDetailView,
    navigationOptions: {
      headerTitle: 'Detail Pesanan',
      headerTitleStyle: [
        GlobalFont.type35,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  HistoryDetailStatusView: {
    screen: HistoryDetailStatusView,
    navigationOptions: {
      headerTitle: 'Detail Status',
      headerTitleStyle: [
        GlobalFont.type35,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  }
};

export default HistoryNavigator;
