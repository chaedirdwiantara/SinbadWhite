import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import OmsCartView from '../../screens/oms/OmsCartView';
import OmsCheckoutView from '../../screens/oms/OmsCheckoutView';
import OmsVerificationView from '../../screens/oms/OmsVerificationView';
import OmsOtpKurView from '../../screens/oms/OMSOtpKurView';

const OmsNavigator = {
  OmsCartView: {
    screen: OmsCartView,
    navigationOptions: {
      headerTitle: 'Keranjang',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  OmsCheckoutView: {
    screen: OmsCheckoutView,
    navigationOptions: {
      headerTitle: 'Checkout',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  OmsVerificationView: {
    screen: OmsVerificationView,
    navigationOptions: {
      headerTitle: 'Verifikasi Order',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  OmsOtpKurView: {
    screen: OmsOtpKurView,
    navigationOptions: {
      headerTitle: 'Verifikasi Kur Klik Acc',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.fontBlack50,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  }
};

export default OmsNavigator;
