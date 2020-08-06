import {
  React,
  Component,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View
} from '../../library/reactPackage';
import { MaterialIcon, connect, bindActionCreators } from '../../library/thirdPartyPackage';
import { StatusBarWhite, CardType1, BackHandlerBackSpecific } from '../../library/component';
import { Color } from '../../config';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions'

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
      ],
      // navigateBack: this.props.global.pageAddMerchantFrom
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => NavigationService.navigate(this.props.global.pageAddMerchantFrom)}
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

  componentDidMount(){
    this.props.profileGetWarehouseProcess()
  }
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
      <BackHandlerBackSpecific 
        navigation={this.props.navigation}
        page={this.props.global.pageAddMerchantFrom}
      />
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

const mapStateToProps = ({ global, profile }) => {
  return { global, profile };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ProfileAreaMapping);
