import { React, View } from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
import TakeProfilePicture from '../../screens/global/TakeProfilePicture';
import TakeIdPlusSelfiePicture from '../../screens/global/TakeIdPlusSelfiePicture';
import TakeIdPicture from '../../screens/global/TakeIdPicture';
import ListAndSearchType1 from '../../screens/global/ListAndSearchType1';
import MapsView from '../../screens/global/MapsView';
import InputManualLocation from '../../screens/global/InputManualLocation';

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
  }
};

export default GlobalNavigator;
