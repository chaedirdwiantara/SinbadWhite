import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import SfaView from '../../screens/sfa/SfaView';
import SfaDetailView, {
  HeaderRightOption
} from '../../screens/sfa/SfaDetailView';
import SfaAddTagihanView from '../../screens/sfa/SfaAddTagihanView';
import SfaCollectionLog from '../../screens/sfa/SfaCollectionLog';
import SfaCollectionDetailView, {
  DetailHeaderOption
} from '../../screens/sfa/SfaCollectionDetailView';
import SfaEditCollectionView from '../../screens/sfa/SfaEditCollectionView';
import SfaCollectionMethodListView from '../../screens/sfa/SfaCollectionMethodListView';
import SfaCollectionListView from '../../screens/sfa/SfaCollectionListView';
import SfaCollectionAddView from '../../screens/sfa/SfaCollectionAddView';
import SfaBillingDetailView from '../../screens/sfa/SfaBillingDetailView';
import SfaBillingAddView from '../../screens/sfa/SfaBillingAddView';

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
      headerTitle: 'Detail Tagihan',
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
      headerTitle: 'Detail Penagihan',
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
  SfaEditCollectionView: {
    screen: SfaEditCollectionView,
    navigationOptions: {
      header: null
    }
  },
  SfaCollectionMethodListView: {
    screen: SfaCollectionMethodListView,
    navigationOptions: {
      headerTitle: 'Metode Penagihan',
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
  SfaCollectionListView: {
    screen: SfaCollectionListView,
    navigationOptions: {
      headerTitle: 'Daftar Penagihan',
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
  SfaBillingDetailView: {
    screen: SfaBillingDetailView,
    navigationOptions: {
      headerTitle: 'Detail Pembayaran',
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
  SfaBillingAddView: {
    screen: SfaBillingAddView,
    navigationOptions: {
      headerTitle: 'Tambah Pembayaran',
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
  SfaCollectionAddView: {
    screen: SfaCollectionAddView,
    navigationOptions: {
      headerTitle: 'Tambah Penagihan',
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
  }
};

export default SfaNavigator;
