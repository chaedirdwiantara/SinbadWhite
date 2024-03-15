import { React, View } from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
import TakeProfilePicture from '../../screens/global/TakeProfilePicture';
import TakeIdPlusSelfiePicture from '../../screens/global/TakeIdPlusSelfiePicture';
import TakeIdPicture from '../../screens/global/TakeIdPicture';
import TakeMerchantPicture from '../../screens/global/TakeMerchantPicture';
import ListAndSearchType1 from '../../screens/global/ListAndSearchType1';
import MapsView from '../../screens/global/MapsView';
import InputManualLocation from '../../screens/global/InputManualLocation';
import SegmentationList from '../../screens/global/SegmentationList';
import SuccessSubmitView from '../../screens/global/SuccessSubmitView';

const GlobalNavigator = {
  /** === PAGE CAMERA FOR PROFILE PICTURE === */
  TakeProfilePicture: {
    screen: TakeProfilePicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** === PAGE CAMERA FOR ID AND FACE PICTURE === */
  TakeIdPlusSelfiePicture: {
    screen: TakeIdPlusSelfiePicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** === PAGE CAMERA FOR ID PICTURE === */
  TakeIdPicture: {
    screen: TakeIdPicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** === PAGE CAMERA FOR MERCHANT PICTURE === */
  TakeMerchantPicture: {
    screen: TakeMerchantPicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** === PAGE FOR DROPDOWN LIST === */
  ListAndSearchType1: {
    screen: ListAndSearchType1,
    navigationOptions: {
      headerTintColor: Color.backButtonWhite,
      headerStyle: {
        backgroundColor: Color.mainColor
      },
      gesturesEnabled: false
    }
  },
  /** === PAGE FOR DROPDOWN LIST === */
  SegmentationList: {
    screen: SegmentationList,
    navigationOptions: {
      headerTintColor: Color.backButtonWhite,
      headerStyle: {
        backgroundColor: Color.mainColor
      },
      gesturesEnabled: false
    }
  },
  /** === PAGE FOR MAP === */
  MapsView: {
    screen: MapsView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  /** PAGE FOR INPUT MANUAL LOCATION === */
  InputManualLocation: {
    screen: InputManualLocation,
    navigationOptions: {
      headerTitle: 'Input Lokasi Manual',
      headerTitleStyle: [
        Fonts.textHeaderPage,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: Color.backButtonWhite,
      headerStyle: {
        backgroundColor: Color.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    }
  },
  /** SUCCESS SUBMIT FORM VIEW=== */
  SuccessSubmit: {
    screen: SuccessSubmitView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  }
};

export default GlobalNavigator;
