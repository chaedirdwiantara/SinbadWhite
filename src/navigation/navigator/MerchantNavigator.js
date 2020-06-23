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
import MerchantNoOrderReason from '../../screens/merchants/dashboard-merchant/MerchantNoOrderReason';
/** merchant detail */
import MerchantDetailProfileView from '../../screens/merchants/details-merchant/MerchantDetailProfileView';
import MerchantDetailInformationView from '../../screens/merchants/details-merchant/MerchantDetailInformationView';
import MerchantDetailPaymentView from '../../screens/merchants/details-merchant/MerchantDetailPaymentView';
import MerchantDetailAddressView from '../../screens/merchants/details-merchant/MerchantDetailAddressView';
/** merchant edit */
import MerchantEditView from '../../screens/merchants/edit-merchant/MerchantEditView';

const MerchantNavigator = {
  MerchantView: {
    screen: MerchantView,
    navigationOptions: {
      headerTitle: 'List Toko',
      headerTitleStyle: GlobalFont.textHeaderPage,
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
  AddMerchantStep2: {
    screen: AddMerchantStep2,
    navigationOptions: {
      headerTitle: 'Data Pokok',
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
  AddMerchant1: {
    screen: AddMerchantPhoneNumber,
    navigationOptions: {
      headerTitle: 'Nomor Handphone',
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
  AddMerchant2: {
    screen: AddMerchantOTP,
    navigationOptions: {
      headerTitle: 'OTP',
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
  AddMerchant3: {
    screen: AddMerchantAddress,
    navigationOptions: {
      headerTitle: 'Alamat Lengkap',
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
  AddMerchant4: {
    screen: AddMerchantIDPhoto,
    navigationOptions: {
      headerTitle: 'Foto KTP',
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
  AddMerchant5: {
    screen: AddMerchantSelfiePhoto,
    navigationOptions: {
      headerTitle: 'Foto Diri',
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
  AddMerchant6: {
    screen: AddMerchantInformation,
    navigationOptions: {
      headerTitle: 'Data Toko',
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
  AddMerchant7: {
    screen: AddMerchantOwnerInformation,
    navigationOptions: {
      headerTitle: 'Data Diri',
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
  MerchantDetailMapView: {
    screen: MerchantDetailMapView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** DETAIL */
  MerchantDetailProfileView: {
    screen: MerchantDetailProfileView,
    navigationOptions: {
      headerTitle: 'Information Profil',
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
  MerchantDetailInformationView: {
    screen: MerchantDetailInformationView,
    navigationOptions: {
      headerTitle: 'Information Toko',
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
  MerchantDetailAddressView: {
    screen: MerchantDetailAddressView,
    navigationOptions: {
      headerTitle: 'Alamat Toko',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  /** === EDIT MERCHANT ==== */
  MerchantEditView: {
    screen: MerchantEditView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantNoOrderReason: {
    screen: MerchantNoOrderReason,
    navigationOptions: {
      headerTitle: 'Alasan Tidak ada Order',
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
  }
};

export default MerchantNavigator;
