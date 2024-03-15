import {
  React,
  Component,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler
} from '../../library/reactPackage';
import { MaterialIcon, connect, bindActionCreators } from '../../library/thirdPartyPackage';
import { StatusBarWhite, CardType1, BackHandlerBackSpecific, LoadingPage } from '../../library/component';
import { Color } from '../../config';
import NavigationService from '../../navigation/NavigationService'; 
import * as ActionCreators from '../../state/actions'

class ProfileAreaMapping extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => state.params.handleBackPressFromRN()}
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
    this.navigationFunction()
  }
  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  renderCard({item, index}) {
    return (
        <CardType1 
        warehouse={item.name}
        number={index+1}
      />     
    )      
  }
    /**
   * =======================
   * NAVIGATION FUNCTION
   * ======================
   */
  navigationFunction() {
    this.props.navigation.setParams({
      handleBackPressFromRN: () => this.handleBackPress()
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  /** === BACK BUTTON RN PRESS HANDLING === */
  handleBackPress = () => {
    NavigationService.navigate(this.props.global.pageAddMerchantFrom);
  };
  /** === BACK BUTTON HARDWARE PRESS HANDLING === */
  handleHardwareBackPress = () => {
    NavigationService.navigate(this.props.global.pageAddMerchantFrom);
    return true;
  };

  renderData(){
    return(
        <FlatList
          contentContainerStyle={{marginBottom: 50}}
          data={this.props.profile.dataGetWarehouse.data}
          renderItem={this.renderCard.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
    )
  }

  renderContent(){
      return (
        <SafeAreaView style={styles.mainContainer}>
        <BackHandlerBackSpecific 
          navigation={this.props.navigation}
          page={this.props.global.pageAddMerchantFrom}
        />
          <StatusBarWhite />
          {this.renderData()}
        </SafeAreaView>
      );
    }
  

  renderSkeleton(){
    return <LoadingPage />
  }
  
  render() {
    return this.props.profile.loadingGetWarehouse
    ? this.renderSkeleton()
    : this.renderContent()
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
