import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import JourneyView from '../../screens/journey/JourneyView';
import JourneyMapView from '../../screens/journey/JourneyMapView';
import JourneyMapSearchView from '../../screens/journey/JourneyMapSearchView';

const JourneyNavigator = {
  JourneyView: {
    screen: JourneyView,
    navigationOptions: {
      headerTitle: 'Journey Plan',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  },
  JourneyMapView: {
    screen: JourneyMapView,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  },
  JourneyMapSearchView: {
    screen: JourneyMapSearchView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite,
        elevation: 0,
        shadowOpacity: 0
      },
      gesturesEnabled: false
    }
  }
};

export default JourneyNavigator;
