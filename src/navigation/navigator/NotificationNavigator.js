import { createStackNavigator } from 'react-navigation-stack';
import NotificationView from '../../screens/notifications/NotificationView';

const StackNavigators = createStackNavigator({
  Notification: {
    screen: NotificationView,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
});

export default StackNavigators;
