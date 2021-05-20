import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import SfaView from '../../screens/sfa/SfaView';
import SfaDetailView, { HeaderRightOption } from '../../screens/sfa/SfaDetailView';
import SfaAddTagihanView from '../../screens/sfa/SfaAddTagihanView';
import SfaCollectionLog from '../../screens/sfa/SfaCollectionLog';
import SfaCollectionDetailView, {DetailHeaderOption} from '../../screens/sfa/SfaCollectionDetailView';
const SfaNavigator = {
  SfaView: {
    screen: SfaView,
    navigationOptions: {
      headerTitle: 'Penagihan',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
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
      headerRight: <HeaderRightOption />,
      gesturesEnabled: false
    }
  },
  SfaAddTagihanView: {
    screen: SfaAddTagihanView,
    navigationOptions: {
      headerTitle: 'Bayar Tagihan',
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
  SfaCollectionLog: {
    screen: SfaCollectionLog,
    navigationOptions: {
      headerTitle: 'Riwayat Transaksi',
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
  SfaCollectionDetailView: {
    screen: SfaCollectionDetailView,
    navigationOptions: {
      headerTitle: 'Detail Transaksi',
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
      headerRight: <DetailHeaderOption />,
      gesturesEnabled: false
    }
  },
  
};

export default SfaNavigator;
