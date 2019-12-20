import DashboardView from '../../screens/dashboard/DashboardView';
import masterColor from '../../config/masterColor.json';

const DashboardNavigator = {
  DashboardView: {
    screen: DashboardView,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.backgroundWhite
      },
      headerTintColor: masterColor.fontBlack50,
      gesturesEnabled: false
    }
  }
};

export default DashboardNavigator;
