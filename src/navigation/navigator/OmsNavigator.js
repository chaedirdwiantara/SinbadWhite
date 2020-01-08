import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import RootCart from '../../screens/oms/RootCart';

const OmsNavigator = {
  RootCart: {
    screen: RootCart,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  }
};

export default OmsNavigator;
