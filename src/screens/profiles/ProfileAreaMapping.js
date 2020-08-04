import {
  React,
  Component,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { StatusBarWhite, CardType1 } from '../../library/component';
import { Color } from '../../config';
import { Fonts } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';

class ProfileAreaMapping extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => NavigationService.navigate('ProfileView')}
        >
          <MaterialIcon
            color={Color.fontBlack50}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  renderCard() {
    return (
      <CardType1>
        <View>
          <Text>
            Hello
          </Text>
        </View>
      </CardType1>
    )      
  }
  
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderCard()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

export default ProfileAreaMapping;
