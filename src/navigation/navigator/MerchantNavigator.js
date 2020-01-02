import React from 'react';
import { View } from 'react-native';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import MerchantView from '../../screens/merchants/MerchantView';
import MerchantDetailView from '../../screens/merchants/MerchantDetailView';
/** add merchant */
import AddMerchantPhoneNumber from '../../screens/merchants/add-merchant/AddMerchantPhoneNumber';
import AddMerchantOTP from '../../screens/merchants/add-merchant/AddMerchantOTP';
import AddMerchantAddress from '../../screens/merchants/add-merchant/AddMerchantAddress';
import AddMerchantIDPhoto from '../../screens/merchants/add-merchant/AddMerchantIDPhoto';
import AddMerchantInformation from '../../screens/merchants/add-merchant/AddMerchantInformation';
import AddMerchantOwnerInformation from '../../screens/merchants/add-merchant/AddMerchantOwnerInformation';
import AddMerchantSelfiePhoto from '../../screens/merchants/add-merchant/AddMerchantSelfiePhoto';

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
  /** === ADD MERCHANT === */
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
  }
};

export default MerchantNavigator;
