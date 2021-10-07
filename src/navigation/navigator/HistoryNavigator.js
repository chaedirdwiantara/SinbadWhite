import React from 'react';
import { View } from 'react-native';
import { GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import HistoryView from '../../screens/history/HistoryView';
import HistoryDetailView from '../../screens/history/HistoryDetailView';
import HistoryDetailStatusView from '../../screens/history/HistoryDetailStatusView';
import HistoryPaymentInvoiceView from '../../screens/history/HistoryPaymentInvoiceView';
import HistoryReturnOrderView from '../../screens/history/return-order/HistoryReturnOrderView';
import HistoryReturnOrderDetailView from '../../screens/history/return-order/HistoryReturnOrderDetailView';

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
      // headerTitle: 'Detail Pesanan',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
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
        GlobalFont.textHeaderPage,
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
  HistoryPaymentInvoiceView: {
    screen: HistoryPaymentInvoiceView
  },
  HistoryReturnOrderView: {
    screen: HistoryReturnOrderView,
    navigationOptions: {
      headerTitle: 'Riwayat Retur',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          color: masterColor.fontBlack80
        }
      ],
      headerStyle: GlobalStyle.shadowForBox,
      gesturesEnabled: false
    }
  },
  HistoryReturnOrderDetailView: {
    screen: HistoryReturnOrderDetailView,
    navigationOptions: {
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: GlobalStyle.shadowForBox10,
      gesturesEnabled: false
    }
  }
};

export default HistoryNavigator;
