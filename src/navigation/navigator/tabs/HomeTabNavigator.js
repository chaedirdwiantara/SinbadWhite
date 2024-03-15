import HomeView from '../../../screens/home/HomeView';
import masterColor from '../../../config/masterColor.json';

const HomeTabNavigator = {
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: masterColor.backgroundWhite
      },
      gesturesEnabled: false
    }
  }
};

export default HomeTabNavigator;
