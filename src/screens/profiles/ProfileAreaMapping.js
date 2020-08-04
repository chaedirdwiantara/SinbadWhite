import {
  React,
  Component,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import { StatusBarWhite } from '../../library/component';
import { Color } from '../../config';
import { Fonts } from '../../helpers'
import NavigationService from '../../navigation/NavigationService'

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
    }
  }

  renderTitle() {
    return (
      <View>
        <Text style={[Fonts.type9, {marginBottom: 5}]}>Sales Area Mapping</Text>
      </View>
    );
  }
  renderWarehouse(){
    return(
      <View>
        <Text style={[Fonts.type24]}>DC Serang</Text>
      </View>
    )
  }
  renderContent() {
    return (
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, marginTop: 22 }}>
        {this.renderTitle()}
        {this.renderWarehouse()}

      </View>      
      )
  }
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderContent()}
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
