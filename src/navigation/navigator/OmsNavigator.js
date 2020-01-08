import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import OmsCartView from '../../screens/oms/OmsCartView';
import OmsCheckoutView from '../../screens/oms/OmsCheckoutView';

const OmsNavigator = {
  OmsCartView: {
    screen: OmsCartView,
    navigationOptions: {
      headerTitle: 'Keranjang',
      headerTitleStyle: [
        GlobalFont.type35,
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
        GlobalFont.type35,
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
  }
};

export default OmsNavigator;
