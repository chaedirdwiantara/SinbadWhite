import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import MerchantView from '../../screens/merchants/MerchantView';
import MerchantDetailView from '../../screens/merchants/MerchantDetailView';
import MerchantDetailMapView from '../../screens/merchants/MerchantDetailMapView';
/** add merchant */
import AddMerchantStep1 from '../../screens/merchants/add-merchant/AddMerchantStep1';
import AddMerchantStep2 from '../../screens/merchants/add-merchant/AddMerchantStep2';
import AddMerchantPhoneNumber from '../../screens/merchants/add-merchant/AddMerchantPhoneNumber';
import AddMerchantOTP from '../../screens/merchants/add-merchant/AddMerchantOTP';
import AddMerchantAddress from '../../screens/merchants/add-merchant/AddMerchantAddress';
import AddMerchantIDPhoto from '../../screens/merchants/add-merchant/AddMerchantIDPhoto';
import AddMerchantInformation from '../../screens/merchants/add-merchant/AddMerchantInformation';
import AddMerchantOwnerInformation from '../../screens/merchants/add-merchant/AddMerchantOwnerInformation';
import AddMerchantSelfiePhoto from '../../screens/merchants/add-merchant/AddMerchantSelfiePhoto';
/** merchant dashboard */
import MerchantHomeView from '../../screens/merchants/dashboard-merchant/MerchantHomeView';
import MerchantCheckinView from '../../screens/merchants/dashboard-merchant/MerchantCheckinView';

const MerchantNavigator = {
  MerchantView: {
    screen: MerchantView,
    navigationOptions: {
      headerTitle: 'List Toko',
      headerTitleStyle: GlobalFont.type5,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantDetailView: {
    screen: MerchantDetailView,
    navigationOptions: {
      headerTitle: 'Profil Toko',
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
  },
  /** === MERCHANT DASHBOARD === */
  MerchantHomeView: {
    screen: MerchantHomeView,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  MerchantCheckinView: {
    screen: MerchantCheckinView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** === ADD MERCHANT === */
  AddMerchantStep1: {
    screen: AddMerchantStep1,
    navigationOptions: {
      headerTitle: 'Nomor Handphone',
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
  },
  AddMerchantStep2: {
    screen: AddMerchantStep2,
    navigationOptions: {
      headerTitle: 'Data Pokok',
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
  },
  AddMerchant1: {
    screen: AddMerchantPhoneNumber,
    navigationOptions: {
      headerTitle: 'Nomor Handphone',
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
  },
  AddMerchant2: {
    screen: AddMerchantOTP,
    navigationOptions: {
      headerTitle: 'OTP',
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
  },
  AddMerchant3: {
    screen: AddMerchantAddress,
    navigationOptions: {
      headerTitle: 'Alamat Lengkap',
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
  },
  AddMerchant4: {
    screen: AddMerchantIDPhoto,
    navigationOptions: {
      headerTitle: 'Foto KTP',
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
  },
  AddMerchant5: {
    screen: AddMerchantSelfiePhoto,
    navigationOptions: {
      headerTitle: 'Foto Diri',
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
  },
  AddMerchant6: {
    screen: AddMerchantInformation,
    navigationOptions: {
      headerTitle: 'Data Toko',
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
  },
  AddMerchant7: {
    screen: AddMerchantOwnerInformation,
    navigationOptions: {
      headerTitle: 'Data Diri',
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
  },
  MerchantDetailMapView: {
    screen: MerchantDetailMapView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  }
};

export default MerchantNavigator;
