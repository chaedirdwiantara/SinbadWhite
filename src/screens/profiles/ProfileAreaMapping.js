import {
  React,
  Component,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { StatusBarWhite, CardType1 } from '../../library/component';
import { Color } from '../../config';
import NavigationService from '../../navigation/NavigationService';

class ProfileAreaMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          warehouse: 'DC Serang'
        },
        {
          warehouse: 'DC Balaraja'
        },
        {
          warehouse: 'DC Rangkas Bitung'
        }
      ]
    };
  }

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
  renderCard({item, index}) {
    return (
        <CardType1 
        warehouse={item.warehouse}
        number={index+1}
      />     
    )      
  }

  renderContent(){  
    return(
        <FlatList
          contentContainerStyle={{marginBottom: 50}}
          data={this.state.data}
          renderItem={this.renderCard.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
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
