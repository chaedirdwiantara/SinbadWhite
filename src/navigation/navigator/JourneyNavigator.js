import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import JourneyView from '../../screens/journey/JourneyView';

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
  }
};

export default JourneyNavigator;
