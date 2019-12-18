import { createStackNavigator } from 'react-navigation-stack';
import SignInWithIdView from '../../screens/auth/SignInWithIdView';
import SignInWithPhoneView from '../../screens/auth/SignInWithPhoneView';
import masterColor from '../../config/masterColor.json';

const StackNavigators = createStackNavigator({
  SignInWithId: {
    screen: SignInWithIdView,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  SignInWithPhone: {
    screen: SignInWithPhoneView,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
});

export default StackNavigators;
