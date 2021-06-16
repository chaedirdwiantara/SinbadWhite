import {
  React,
  Component,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image
} from '../../library/reactPackage'
import {
  MaterialIcon,
  bindActionCreators,
  connect,
  moment,
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage'
import {
  ButtonFloatType1,
  StatusBarWhite,
  ToastType1,
  ModalBottomSwipeCloseNotScroll,
  BackHandlerBackSpecific,
  ModalBottomType3,
  StatusBarRedOP50,
  ModalBottomErrorRespons,
  ButtonSingle
} from '../../library/component'
import { MoneyFormat, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import ModalContentMenuAddMerchant from './ModalContentMenuAddMerchant';
import ModalBottomMerchantList from '../merchants/ModalBottomMerchantList';
import JourneyListDataView from './JourneyListDataView';

const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';

class JourneyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      openModalAddMerchant: false,
      openModalMerchantList: false,
      openModalErrorGlobal: false,
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
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => NavigationService.navigate('HomeView')}
        >
          <MaterialIcon
            color={masterColor.fontBlack50}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * ================
   * FUNCTIONAL
   * =================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.getJourneyPlan();
    this.props.getJourneyPlanReportProcessV2();
    this.props.portfolioGetProcessV2();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.journey.dataSaveMerchantToJourneyPlanV2 !==
      this.props.journey.dataSaveMerchantToJourneyPlanV2
    ) {
      if (this.props.journey.dataSaveMerchantToJourneyPlanV2 !== null) {
        this.getJourneyPlan();
        this.props.getJourneyPlanReportProcessV2();
        this.setState({ openModalMerchantList: false });
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
    /** error get journey plan reports */
    if (
      prevProps.journey.errorGetJourneyPlanReportV2 !==
      this.props.journey.errorGetJourneyPlanReportV2
    ) {
      if (this.props.journey.errorGetJourneyPlanReportV2 !== null) {
        this.doError();
      }
    }
  }
  /** === FROM CHILD FUNCTION === */
  parentFunction(data) {
    if (data.type === 'search') {
      this.setState({ search: data.data }, () => this.getJourneyPlan());
    }
  }
  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    /** Close all modal and open modal error respons */
    this.setState({
      openModalErrorGlobal: true,
      openModalAddMerchant: false,
      openModalMerchantList: false,
      showToast: false,
      showModalError: false,
    });
  }
  /** === GET JOURNEY PLAN === */
  getJourneyPlan() {
    this.props.journeyPlanGetResetV2();
    this.props.journeyPlanGetProcessV2({
      page: 1,
      date: today,
      search: this.state.search,
      loading: true
    });
  }
  /** === ADD MERCHANT TO JOURNEY === */
  addMerchant() {
    this.setState({ openModalAddMerchant: true });
  }
  /** go to page */
  goTo(type) {
    switch (type) {
      case 'existing_merchant':
        this.setState({
          openModalAddMerchant: false,
          openModalMerchantList: true
        });
        break;
      case 'new_merchant':
        // VALIDATE SALES REP CAN ADD STORE OR NOT
        this.setState({ openModalAddMerchant: false });
        const portfolio = this.props.merchant.dataGetPortfolioV2
        const canCreateStore = this.props.privileges.data?.createStore?.status || false
        if(portfolio !== null && portfolio.length > 0 && canCreateStore){
          this.props.savePageAddMerchantFrom('JourneyView');
          setTimeout(() => {
            NavigationService.navigate('AddMerchantStep1');
          }, 100);
        } else {
          this.setState({showModalError: true})
        }
        break;
      default:
        break;
    }
  }
  /**
   * =================
   * RENDER VIEW
   * =================
   */
  /** === EMPTY JOURNEY === */
  renderJourneyListData() {
    return (
      <JourneyListDataView
        searchText={this.state.search}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    );
  }
  /** === RENDER HEADER === */
  renderHeader() {
    return !this.props.journey.loadingGetJourneyPlanReport &&
      this.props.journey.dataGetJourneyPlanReportV2 !== null ? (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>
            {this.props.journey.dataGetJourneyPlanReportV2.total}/
            {this.props.journey.dataGetJourneyPlanReportV2.target}
          </Text>
          <Text style={Fonts.type26}>Toko Visit</Text>
        </View>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>
            {MoneyFormat(
              this.props.journey.dataGetJourneyPlanReportV2.totalOrder
            )}
          </Text>
          <Text style={Fonts.type26}>Toko Order</Text>
        </View>
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={{ height: 70 }} />
      </SkeletonPlaceholder>
    );
  }
  /** === BUTTON ADD JOURNEY === */
  renderButtonAddJourney() {
    return !this.props.journey.loadingGetJourneyPlan ? (
      <View style={styles.containerFloatButton}>
        <ButtonFloatType1
          title={'Tambah Toko'}
          push={() => this.addMerchant()}
        />
      </View>
    ) : (
      <View />
    );
  }
  /**
   * ======================
   * MODAL
   * ======================
   */
  /** TOAST */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /** MODAL MENU ADD MERCHANT */
  renderModalAddMerchant() {
    return this.state.openModalAddMerchant ? (
      <View>
        <ModalBottomSwipeCloseNotScroll
          open={this.state.openModalAddMerchant}
          closeButton
          title={'Tambah Toko'}
          close={() => this.setState({ openModalAddMerchant: false })}
          content={
            <ModalContentMenuAddMerchant
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.goTo.bind(this)}
            />
          }
        />
      </View>
    ) : (
      <View />
    );
  }
  /** MODAL MERCHANT LIST */
  renderModalMerchantList() {
    return this.state.openModalMerchantList ? (
      <ModalBottomMerchantList
        open={this.state.openModalMerchantList}
        close={() => this.setState({ openModalMerchantList: false })}
      />
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
        close={() => this.setState({showModalError: false, errorTitle: '', errorMessage: ''})}
        content={this.modalErrorContent()}
        typeClose={'cancel'}
      />
    )
  }

  /** RENDER MODAL ERROR CONTENT */
  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatusBarRedOP50 />
        <Image
          source={require('../../assets/images/sinbad_image/sinbad_no_access.png')}
          style={{ width: 208, height: 156 }}
        />
        <View style={{padding: 24}}>
          <Text style={[Fonts.type7, { padding: 8, textAlign: 'center' }]}>
            Maaf, Anda tidak memiliki akses ke halaman ini
          </Text>
          <Text style={[Fonts.type17, {textAlign: 'center', lineHeight: 18}]}>
            Silakan hubungi admin untuk proses lebih lanjut
          </Text>
        </View>
        <View style={{ width: '100%' }}>
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
  /** RENDER MODAL ERROR RESPONSE */
  renderModalErrorResponse() {
  return this.state.openModalErrorGlobal ? (
    <ModalBottomErrorRespons
      statusBarType={'transparent'}
      open={this.state.openModalErrorGlobal}
      onPress={() => this.setState({ openModalErrorGlobal: false })}
    />
    ) : (
      <View />
    );
  }
  /** ===================== */
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <BackHandlerBackSpecific
          navigation={this.props.navigation}
          page={'HomeView'}
        />
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderButtonAddJourney()}
        {this.renderJourneyListData()}
        {/* modal */}
        {this.renderModalAddMerchant()}
        {this.renderModalMerchantList()}
        {this.renderToast()}
        {this.state.showModalError && this.renderModalError()}
        {this.renderModalErrorResponse()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  headerContainer: {
    backgroundColor: masterColor.mainColor,
    flexDirection: 'row',
    paddingVertical: 13
  },
  containerFloatButton: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  boxHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ journey, user, merchant, privileges }) => {
  return { journey, user, merchant, privileges };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(JourneyView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 * -> Update the props of journey plan list.
 * -> Update the props when saving merchant to journey plan.
 * updatedBy: dyah
 * updatedDate: 01032021
 * updatedFunction:
 * -> Update the props of journey plan report.
 * updatedBy: dyah
 * updatedDate: 12032021
 * updatedFunction:
 * -> Add parameter search when get journey plan.
 * updatedBy: dyah
 * updatedDate: 04052021
 * updatedFunction:
 * -> Add search journey plan.
 * updatedBy: dyah
 * updatedDate: 04052021
 * updatedFunction:
 * -> Add error modal when failed get journey plan reports.
 */
