import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import PdpView from '../../screens/pdp/PdpView';
import PdpSearchView from '../../screens/search/PdpSearchView';

const PdpNavigator = {
  PdpView: {
    screen: PdpView,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  },
  PdpSearchView: {
    screen: PdpSearchView,
    navigationOptions: {
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        backgroundColor: masterColor.mainColor
      },
      gesturesEnabled: false
    }
  }
};

export default PdpNavigator;
