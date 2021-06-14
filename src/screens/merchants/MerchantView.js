import {
  React,
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Text
} from '../../library/reactPackage'
import {
  MaterialIcon,
  bindActionCreators,
  connect,
  AntDesignIcon
} from '../../library/thirdPartyPackage'
import {
  ToastType1,
  StatusBarWhite,
  BackHandlerBackSpecific,
  StatusBarRedOP50,
  ButtonSingle,
  ModalBottomType3
} from '../../library/component'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import MerchantTabView from './MerchantTabView';
import MerchantListView from './MerchantListView';
import MerchantMapView from './MerchantMapView';
import { Fonts } from '../../helpers';

class MerchantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'list',
      search: '',
      portfolio: 0,
      type: 'direct',
      showToast: false,
      notifToast: '',
      showModalError: false
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => NavigationService.navigate('HomeView')}
        >
          <MaterialIcon
            color={Color.fontBlack50}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => state.params?.goToAddFunction()}
        >
          <AntDesignIcon
            color={Color.mainColor}
            name={'pluscircle'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.navigationFunction();
    this.props.portfolioGetProcessV2();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataGetPortfolioV2 !==
      this.props.merchant.dataGetPortfolioV2
    ) {
      if (
        this.props.merchant.dataGetPortfolioV2 !== null &&
        this.props.merchant.dataGetPortfolioV2.length > 0
      ) {
        this.getMerchant('direct', 0, '');
      }
    }
    /** IF ADD MERCHANT SUCCESS */
    if (
      prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant
    ) {
      if (this.props.merchant.dataAddMerchant !== null) {
        this.setState({
          openModalCheckout: false,
          showToast: true,
          notifToast: 'Tambah Toko Berhasil'
        });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      }
    }
  }
  /** ====== DID MOUNT FUNCTION ========== */
  /** NAVIGATION FUNCTION */
  navigationFunction() {
    this.props.navigation.setParams({
      goToAddFunction: () => this.goToAdd()
    });
  }
  /** HANDLE ADD BUTTON FROM HEADER */
  goToAdd = () => {
    // ADD STORE VALIDATION
    const portfolio = this.props.merchant.dataGetPortfolioV2
    const canCreateStore = this.props.privileges.data?.createStore?.status || false
    if(portfolio !== null && canCreateStore){
      this.props.savePageAddMerchantFrom('MerchantView');
      setTimeout(() => {
        NavigationService.navigate('AddMerchantStep1');
      }, 100);
    } else {
      this.setState({showModalError: true})
    }
  };
  /** === FROM CHILD FUNCTION === */
  parentFunction(data) {
    if (data.type === 'section') {
      this.setState({ activeTab: data.data });
    } else if (data.type === 'search') {
      this.getMerchant(
        this.state.portfolio === 0 ? 'direct' : 'group',
        this.state.portfolio,
        data.data
      );
      this.setState({
        search: data.data,
        type: this.state.portfolio === 0 ? 'direct' : 'group'
      });
    } else if (data.type === 'portfolio') {
      this.getMerchant(
        data.data === 0 ? 'direct' : 'group',
        data.data,
        this.state.search
      );
      this.setState({
        portfolio: data.data,
        type: data.data === 0 ? 'direct' : 'group'
      });
    }
  }
  /** === CALL GET FUNCTION === */
  getMerchant(type, portfolioIndex, search) {
    this.props.merchantGetResetV2();
    this.props.merchantGetProcessV2({
      loading: true,
      page: 1,
      portfolioId: this.props.merchant.dataGetPortfolioV2[0].id,
      search
    });
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.containerContent}>
        {this.state.activeTab === 'list' ? (
          <MerchantListView
            searchText={this.state.search}
            portfolio={this.state.portfolio}
            type={this.state.type}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        ) : (
          <MerchantMapView
            searchText={this.state.search}
            type={this.state.type}
            portfolio={this.state.portfolio}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        )}
      </View>
    );
  }
  /** === HEADER TABS === */
  renderHeaderTabs() {
    return (
      <View style={styles.containerTabs}>
        <MerchantTabView
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /**
   * ====================
   * MODAL
   * ====================
   */
  /** TOAST */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL ERROR */
  renderModalError(){
    return(
      <ModalBottomType3
        title={''}
        open={this.state.showModalError}
        close={() => this.setState({showModalError: false})}
        content={this.modalErrorContent()}
        typeClose={'cancel'}
      />
    )
  }

  /** RENDER MODAL ERROR CONTENT */
  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
        <StatusBarRedOP50 />
        <Image
          source={require('../../assets/images/sinbad_image/sinbad_no_access.png')}
          style={{ width: 208, height: 156 }}
        />
        <Text style={[Fonts.type7, { paddingVertical: 8, textAlign: 'center' }]}>
          Maaf, Anda tidak memiliki akses ke halaman ini
        </Text>
        <Text style={[Fonts.type17, {textAlign: 'center', lineHeight: 18}]}>
          Silakan hubungi admin untuk proses lebih lanjut
        </Text>
        <View style={{ width: '100%', paddingTop: 40 }}>
          <ButtonSingle
            borderRadius={4}
            title={'Oke, Saya Mengerti'}
            onPress={() => {
              this.setState({showModalError: false})
            }}
          />
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <BackHandlerBackSpecific
          navigation={this.props.navigation}
          page={'HomeView'}
        />
        <StatusBarWhite />
        {this.renderHeaderTabs()}
        {this.renderContent()}
        {this.renderToast()}
        {this.state.showModalError && this.renderModalError()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  containerTabs: {
    height: 44
  },
  containerContent: {
    flex: 1
  }
});

const mapStateToProps = ({ user, merchant, privileges }) => {
  return { user, merchant, privileges };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 * updatedBy: dyah
 * updatedDate: 25022021
 * updatedFunction:
 * -> update the props of merchant list.
 *
 */
