import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import SignInWithIdView from '../../screens/auth/SignInWithIdView';
import SignInWithPhoneView from '../../screens/auth/SignInWithPhoneView';
import OtpView from '../../screens/auth/OtpView';
import masterColor from '../../config/masterColor.json';

const StackNavigators = createStackNavigator(
  {
    SignInWithPhone: {
      screen: SignInWithPhoneView,
      navigationOptions: {
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
        headerStyle: {
          elevation: 0,
          backgroundColor: masterColor.mainColor
        },
        headerTintColor: masterColor.backButtonWhite,
        gesturesEnabled: false
      }
    },
    SignInWithId: {
      screen: SignInWithIdView,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          backgroundColor: masterColor.mainColor
        },
        gesturesEnabled: false
      }
    }
  },
  {
    transitionConfig: () => fromRight()
  }
);

export default StackNavigators;
