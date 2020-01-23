import TakeProfilePicture from '../../screens/global/TakeProfilePicture';
import TakeIdPlusSelfiePicture from '../../screens/global/TakeIdPlusSelfiePicture';
import TakeIdPicture from '../../screens/global/TakeIdPicture';
import ListAndSearchType1 from '../../screens/global/ListAndSearchType1';
import MapsView from '../../screens/global/MapsView';
import masterColor from '../../config/masterColor.json';

const LogNavigator = {
  TakeProfilePicture: {
    screen: TakeProfilePicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  TakeIdPlusSelfiePicture: {
    screen: TakeIdPlusSelfiePicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  TakeIdPicture: {
    screen: TakeIdPicture,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  ListAndSearchType1: {
    screen: ListAndSearchType1,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  MapsView: {
    screen: MapsView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  }
};

export default LogNavigator;
