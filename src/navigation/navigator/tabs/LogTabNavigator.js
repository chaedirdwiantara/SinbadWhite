import LogView from '../../../screens/logs/LogView';
import masterColor from '../../../config/masterColor.json';
import GlobalFont from '../../../helpers/GlobalFont';

const LogTabNavigator = {
  LogView: {
    screen: LogView,
    navigationOptions: {
      headerTitle: 'Log',
      headerTitleStyle: GlobalFont.textHeaderPage,
      headerTitleContainerStyle: {
        width: '100%',
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
};

export default LogTabNavigator;
