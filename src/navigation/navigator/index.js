import { createAppContainer } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import NotificationNavigator from './NotificationNavigator';

export default createAppContainer(AuthNavigator, NotificationNavigator);
