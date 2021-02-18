import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import SfaView from '../../screens/sfa/SfaView';
import SfaDetailView from '../../screens/sfa/SfaDetailView';

const SfaNavigator = {
  SfaView: {
    screen: SfaView,
    navigationOptions: {
      headerTitle: 'Penagihan',
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
  SfaDetailView: {
    screen: SfaDetailView,
    navigationOptions: {
      headerTitle: 'Detil Tagihan',
      headerTitleStyle: [
        GlobalFont.textHeaderPage,
        {
          textAlign: 'left',
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
  },
  
};

export default SfaNavigator;
