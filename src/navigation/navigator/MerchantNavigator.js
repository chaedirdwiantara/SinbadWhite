import { React, View } from '../../library/reactPackage';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import MerchantView from '../../screens/merchants/MerchantView';
import MerchantDetailView from '../../screens/merchants/MerchantDetailView';
import MerchantDetailMapView from '../../screens/merchants/MerchantDetailMapView';
/** add merchant */
import AddMerchantStep1 from '../../screens/merchants/add-merchant/AddMerchantStep1';
import AddMerchantStep2 from '../../screens/merchants/add-merchant/AddMerchantStep2';
import AddMerchantStep3 from '../../screens/merchants/add-merchant/AddMerchantStep3';
import AddMerchantStep4 from '../../screens/merchants/add-merchant/AddMerchantStep4';
/** merchant dashboard */
import MerchantHomeView from '../../screens/merchants/dashboard-merchant/MerchantHomeView';
import MerchantCheckinView from '../../screens/merchants/dashboard-merchant/MerchantCheckinView';
import MerchantNoOrderReason from '../../screens/merchants/dashboard-merchant/MerchantNoOrderReason';
import MerchantNoOrderReasonDetail from '../../screens/merchants/dashboard-merchant/MerchantNoOrderReasonDetail';
import MerchantNoVisitReasonView from '../../screens/merchants/dashboard-merchant/MerchantNoVisitReasonView';
import MerchantNoVisitPicture from '../../screens/merchants/dashboard-merchant/MerchantNoVisitPicture';
import MerchantNoVisitReasonDetailView from '../../screens/merchants/dashboard-merchant/MerchantNoVisitReasonDetailView';
import MerchantNoCollectionReason from '../../screens/merchants/dashboard-merchant/MerchantNoCollectionReason';
import MerchantNoCollectionDetailView from '../../screens/merchants/dashboard-merchant/MerchantNoCollectionDetailView';
import { HeaderLeftReasonOption } from '../../screens/merchants/dashboard-merchant/MerchantNoCollectionReason';
import { HeaderLeftDetailReasonOption } from '../../screens/merchants/dashboard-merchant/MerchantNoCollectionDetailView';
/** merchant detail */
import MerchantDetailProfileView from '../../screens/merchants/details-merchant/MerchantDetailProfileView';
import MerchantDetailAccountView from '../../screens/merchants/details-merchant/MerchantDetailAccountView';
import MerchantDetailInformationView from '../../screens/merchants/details-merchant/MerchantDetailInformationView';
// import MerchantDetailPaymentView from '../../screens/merchants/details-merchant/MerchantDetailPaymentView';
import MerchantDetailAddressView from '../../screens/merchants/details-merchant/MerchantDetailAddressView';
import MerchantDetailClassificationView from '../../screens/merchants/details-merchant/MerchantDetailClassificationView';
import MerchantDetailCreditLimitView from '../../screens/merchants/details-merchant/MerchantDetailCreditLimitView';
/** merchant edit */
import MerchantEditView from '../../screens/merchants/edit-merchant/MerchantEditView';
/** merchant survey */
import MerchantSurveyView from '../../screens/merchants/survey-merchant/MerchantSurveyView';
import MerchantSurveyDisplayPhotoView from '../../screens/merchants/survey-merchant/MerchantSurveyDisplayPhotoView';
/** merchant stock */
import MerchantStockView from '../../screens/merchants/stock-merchant/MerchantStockView';
import MerchantEditStockView from '../../screens/merchants/stock-merchant/MerchantEditStockView';
import MerchantQuestionnaireView from '../../screens/merchants/survey-merchant/MerchantQuestionnaireView';
import MerchantSurveyResultView from '../../screens/merchants/survey-merchant/MerchantSurveyResultView';
/** merchant promise pay */
import MerchantPromisePayView from '../../screens/merchants/promise-pay-merchant/MerchantPromisePayView';

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
  AddMerchantStep3: {
    screen: AddMerchantStep3,
    navigationOptions: {
      headerTitle: 'Alamat Toko',
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
  AddMerchantStep4: {
    screen: AddMerchantStep4,
    navigationOptions: {
      headerTitle: 'Klasifikasi Toko',
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
      headerTitle: 'Informasi Profil',
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
  MerchantDetailAccountView: {
    screen: MerchantDetailAccountView,
    navigationOptions: {
      headerTitle: 'Akun Toko',
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
      headerTitle: 'Informasi Toko',
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
  MerchantDetailClassificationView: {
    screen: MerchantDetailClassificationView,
    navigationOptions: {
      headerTitle: 'Klasifikasi Toko',
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
  MerchantDetailCreditLimitView: {
    screen: MerchantDetailCreditLimitView,
    navigationOptions: {
      headerTitle: 'Batas Kredit',
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
  /** === EDIT MERCHANT ==== */
  MerchantEditView: {
    screen: MerchantEditView,
    navigationOptions: {
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantNoOrderReason: {
    screen: MerchantNoOrderReason,
    navigationOptions: {
      headerTitle: 'Alasan Tidak Ada Order',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  MerchantNoOrderReasonDetail: {
    screen: MerchantNoOrderReasonDetail,
    navigationOptions: {
      headerTitle: 'Detail Alasan',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantNoVisitReasonView: {
    screen: MerchantNoVisitReasonView,
    navigationOptions: {
      headerTitle: 'Alasan Tidak Ada Kunjungan',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantNoVisitPicture: {
    screen: MerchantNoVisitPicture,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  MerchantNoVisitReasonDetailView: {
    screen: MerchantNoVisitReasonDetailView,
    navigationOptions: {
      headerTitle: 'Detail Alasan',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  /** === SURVEY MERCHANT ==== */
  MerchantSurveyView: {
    screen: MerchantSurveyView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantSurveyDisplayPhotoView: {
    screen: MerchantSurveyDisplayPhotoView,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  /** === STOCK MERCHANT */
  MerchantStockView: {
    screen: MerchantStockView,
    navigationOptions: {
      headerTitle: 'Catatan Stok',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      gesturesEnabled: false
    }
  },
  MerchantEditStockView: {
    screen: MerchantEditStockView,
    navigationOptions: {
      headerTitleStyle: [GlobalFont.textHeaderPage],
      gesturesEnabled: false
    }
  },
  MerchantNoCollectionReason: {
    screen: MerchantNoCollectionReason,
    navigationOptions: {
      headerTitle: 'Alasan Tidak Ada Penagihan',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerLeft: <HeaderLeftReasonOption />,
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  MerchantQuestionnaireView: {
    screen: MerchantQuestionnaireView,
    navigationOptions: {
      headerTitle: 'Input Survey',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  MerchantSurveyResultView: {
    screen: MerchantSurveyResultView,
    navigationOptions: {
      title: 'Hasil Survey',
      headerTitleStyle: [GlobalFont.textHeaderPage, { marginLeft: '5%' }],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite,
        paddingLeft: 20
      },
      headerLeft: null
    }
  },
  MerchantNoCollectionDetailView: {
    screen: MerchantNoCollectionDetailView,
    navigationOptions: {
      headerTitle: 'Lihat Alasan',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false,
      headerLeft: <HeaderLeftDetailReasonOption />
    }
  },
  MerchantPromisePayView: {
    screen: MerchantPromisePayView,
    navigationOptions: {
      headerTitle: 'Janji Bayar',
      headerTitleStyle: [GlobalFont.textHeaderPage],
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  }
};

export default MerchantNavigator;
