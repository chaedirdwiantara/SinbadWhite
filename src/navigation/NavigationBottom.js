import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExampleHome from '../screens/examples/ExampleHome';
import ExampleView from '../screens/examples/ExampleView';

const StackNavigators = createBottomTabNavigator({
  Home: {
    screen: ExampleHome,
    navigationOptions: { header: null, gesturesEnabled: false }
  },
  Detail: {
    screen: ExampleView,
    navigationOptions: { header: null, gesturesEnabled: false }
  }
});

export default createAppContainer(StackNavigators);
