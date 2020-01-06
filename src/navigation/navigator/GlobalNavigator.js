import TakeProfilePicture from '../../screens/global/TakeProfilePicture';
import ListAndSearchType1 from '../../screens/global/ListAndSearchType1';
import masterColor from '../../config/masterColor.json';

const LogNavigator = {
  TakeProfilePicture: {
    screen: TakeProfilePicture,
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
  }
};

export default LogNavigator;
