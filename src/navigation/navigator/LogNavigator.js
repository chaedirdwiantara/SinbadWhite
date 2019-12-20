import LogView from '../../screens/logs/LogView';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';

const LogNavigator = {
  LogView: {
    screen: LogView,
    navigationOptions: {
      headerTitle: 'Log',
      headerTitleStyle: GlobalFont.type5,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
};

export default LogNavigator;
