import SignInWithPhoneView from '../../screens/auth/SignInWithPhoneView';
import OtpView from '../../screens/auth/OtpView';
import masterColor from '../../config/masterColor.json';

const AuthNavigator = {
  SignInWithPhone: {
    screen: SignInWithPhoneView,
    navigationOptions: {
      tabBarVisible: false,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  OtpView: {
    screen: OtpView,
    navigationOptions: {
      tabBarVisible: false,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      headerTintColor: masterColor.backButtonWhite,
      gesturesEnabled: false
    }
  }
};

export default AuthNavigator;
