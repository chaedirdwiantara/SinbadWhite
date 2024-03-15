import {
  React,
  Component,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Image,
  ImageBackground
} from '../../library/reactPackage';
import {
  MaterialIcon,
  bindActionCreators,
  connect,
  moment,
  Geolocation,
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage';
import {
  ButtonFloatType1,
  StatusBarWhite,
  ToastType1,
  ModalBottomSwipeCloseNotScroll,
  BackHandlerBackSpecific,
  ModalBottomType3,
  StatusBarRedOP50,
  ModalBottomErrorRespons,
  ButtonSingle,
  ModalBottomType1
} from '../../library/component';
import { MoneyFormat, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import ModalContentMenuAddMerchant from './ModalContentMenuAddMerchant';
import ModalBottomMerchantList from '../merchants/ModalBottomMerchantList';
import JourneyListDataView from './JourneyListDataView';
import { JOURNEY_PLAN_PAUSE_STATUS_PAUSED } from '../../constants';
import { storeType } from '../../constants/journeyPlanParams';

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
      showModalError: false,
      filterValue: 0,
      modalInfoPausedVisit: false,
      /** used for flag whether need to show modalInfoPausedVisit, if true, we need to show modalInfoPausedVisit */
      checkPausedVisit: true
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  /**
   * === Render Header ===
   * @returns {ReactElement} render menu back, title, map
   */
  static navigationOptions = ({ navigation }) => {
    const getCurrentLocation = navigation.getParam('getCurrentLocation');
    return {
      //go to home
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
      ),
      //go to map
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerMapButton}
          onPress={() =>
            getCurrentLocation ? getCurrentLocation(navigation) : null
          }
        >
          <Image
            style={{ marginRight: 8, width: 14 }}
            source={require('../../assets/icons/maps/map_journey.png')}
          />
          <Text style={Fonts.type16}>Peta</Text>
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
    /**SET NAVIGATION FUNCTION */
    this.props.navigation.setParams({
      getCurrentLocation: this.getCurrentLocation,
      successMaps: this.successMaps,
      errorMaps: this.errorMaps
    });
    /** WE NEED TO CHECK IS THERE ANY PAUSED JOURNEY PLAN AGAIN, WHEN USER BACK TO THIS SCREEN */
    this.props.navigation.addListener('didBlur', () => {
      this.setState({ checkPausedVisit: true });
    });
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
        this.setState({
          openModalMerchantList: false,
          openModalAddMerchant: false
        });
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
    if (
      prevProps.journey.dataGetJourneyPlanV2 !==
      this.props.journey.dataGetJourneyPlanV2
    ) {
      /** CHECKING IF THERE ARE PAUSED JOURNEY PLAN, NEED TO SHOW MODAL WARNING */
      if (
        this.props.journey.dataGetJourneyPlanV2 &&
        this.state.checkPausedVisit
      ) {
        this.checkPausedVisit(this.props.journey.dataGetJourneyPlanV2);
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
  /**
   * === FROM CHILD FUNCTION ===
   * @returns {ReactElement} trigger modal add merchant
   */
  parentFunction(data) {
    if (data.type === 'search') {
      this.setState({ search: data.data }, () => this.getJourneyPlan());
    }
    if (data.type === 'status') {
      this.setState({ filterValue: data.data }, () => this.getJourneyPlan());
    }
  }
  /**
   * === FOR ERROR FUNCTION (FROM DID UPDATE) ===
   * @returns {ReactElement} trigger modal add merchant
   */
  doError() {
    /** Close all modal and open modal error respons */
    this.setState({
      openModalErrorGlobal: true,
      openModalAddMerchant: false,
      openModalMerchantList: false,
      showToast: false,
      showModalError: false
    });
  }
  /**
   * === GET JOURNEY PLAN ===
   * fetch api , get journey plan data from be
   */
  getJourneyPlan() {
    this.props.selectedStoreReset(); /** reset selectedStore from collection list to prevent wrong storeId with selectedMerchant*/
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    this.props.journeyPlanGetResetV2();
    this.props.journeyPlanGetProcessV2({
      page: 1,
      date: today,
      search: this.state.search,
      storetype: storeType[this.state.filterValue],
      loading: true
    });
  }
  /**
   * === ADD MERCHANT TO JOURNEY ===
   * @returns {ReactElement} trigger modal add merchant
   */
  addMerchant() {
    this.setState({ openModalAddMerchant: true });
  }
  /** go to page */
  goTo(type) {
    switch (type) {
      case 'existing_merchant':
        this.setState({
          openModalMerchantList: true
        });
        break;
      case 'new_merchant':
        // VALIDATE SALES REP CAN ADD STORE OR NOT
        this.setState({ openModalAddMerchant: false });
        const portfolio = this.props.merchant.dataGetPortfolioV2;
        const canCreateStore =
          this.props.privileges.data?.createStore?.status || false;
        if (portfolio !== null && portfolio.length > 0 && canCreateStore) {
          this.props.savePageAddMerchantFrom('JourneyView');
          setTimeout(() => {
            NavigationService.navigate('AddMerchantStep1');
          }, 100);
        } else {
          this.setState({ showModalError: true });
        }
        break;
      default:
        break;
    }
  }
  /**
   *  === SUCCESS GET CURRENT LOCATION ===
   * @param {object} object contain coords (longitude,latitude )
   * @returns {callback} navigate to journeyMapView with some data
   */
  successMaps = success => {
    const longitude = success.coords.longitude;
    const latitude = success.coords.latitude;
    // navigate to journey map
    NavigationService.navigate('JourneyMapView', {
      longitude,
      latitude
    });
  };
  /**
   *  === ERROR GET CURRENT LOCATION ===
   * @returns {PermissionsAndroid||callback||warn}
   */
  errorMaps = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /**
   *  === GET CURRENT LOCATION ===
   * @returns {callback} get current value
   */
  getCurrentLocation(navigation) {
    if (navigation) {
      return Geolocation.getCurrentPosition(
        navigation.getParam('successMaps'),
        navigation.getParam('errorMaps')
      );
    }
    return Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }
  /**
   * === FILTER DATA IF FOUND JBS WITH PAUSE STATUS === 1, MEANS PAUSED NEED TO SHOW MODAL TO INFORM USER THERE IS PAUSED VISIT
   * @param {Array<this.props.journey.dataGetJourneyPlanV2>} data
   */
  checkPausedVisit(data) {
    data &&
      data.filter(item => {
        if (
          item.journeyBookStores.pauseStatus ===
          JOURNEY_PLAN_PAUSE_STATUS_PAUSED
        ) {
          this.setState({
            modalInfoPausedVisit: true,
            checkPausedVisit: false
          });
        }
      });
  }
  /**
   * =================
   * RENDER VIEW
   * =================
   */
  /**
   * === RENDER WRAPPER JOURNEY PLAN LIST ===
   * @returns {ReactElement} render container that contain list of journeyplan
   */
  renderJourneyListData() {
    return (
      <JourneyListDataView
        searchText={this.state.search}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        storeType={this.state.filterValue}
        setCheckPausedVisit={checkPausedVisit =>
          this.setState({ checkPausedVisit })
        }
      />
    );
  }
  /**
   *  === RENDER HEADER ===
   * @returns {ReactElement} render header journey plan
   */
  renderHeader() {
    return !this.props.journey.loadingGetJourneyPlanReport &&
      this.props.journey.dataGetJourneyPlanReportV2 !== null ? (
      <View>
        {/* <View style={styles.mainContainer}> */}
        <ImageBackground
          source={require('../../assets/images/background/bg_jp_white.png')}
          style={[styles.headerContainer, { zIndex: 0 }]}
        >
          <View style={[styles.boxHeader, { zIndex: 1 }]}>
            <Text style={[Fonts.textHeaderPageJourney, { marginBottom: 5 }]}>
              {this.props.journey.dataGetJourneyPlanReportV2.total}/
              {this.props.journey.dataGetJourneyPlanReportV2.target}
            </Text>
            <Text style={styles.headerTextSubTitle}>Kunjungan Toko</Text>
          </View>
          <View style={styles.boxHeader}>
            <Text style={[Fonts.textHeaderPageJourney, { marginBottom: 5 }]}>
              {MoneyFormat(
                this.props.journey.dataGetJourneyPlanReportV2.totalOrder
              )}
            </Text>
            <Text style={styles.headerTextSubTitle}>Total Order Toko</Text>
          </View>
        </ImageBackground>
        {/* </View> */}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={{ height: 70 }} />
      </SkeletonPlaceholder>
    );
  }
  /**
   * === BUTTON ADD JOURNEY ===
   * @returns {ReactElement} render float button 'tambah toko'
   */
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
  /**
   *  === RENDER TOAST ===
   * @returns {ReactElement} render toast If state showToast true
   */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /**
   * === MODAL MENU ADD MERCHANT ===
   * @returns {ReactElement} render modal add merchant/store
   */
  renderModalAddMerchant() {
    //open modal add merchant after trigger addMerchant
    return this.state.openModalAddMerchant ? (
      <View>
        <ModalBottomSwipeCloseNotScroll
          open={this.state.openModalAddMerchant}
          closeButton
          title={'Tambah Toko'}
          close={() => this.setState({ openModalAddMerchant: false })}
          //modal contain add 'new store' or 'existing store'
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
  /**
   *  === RENDER MODAL MERCHANT LIST ===
   * @returns {ReactElement} render mercant list If state openModalMerchantList true
   * openModalMerchantList true If user choose existing store
   */
  renderModalMerchantList() {
    return this.state.openModalMerchantList ? (
      <ModalBottomMerchantList
        open={this.state.openModalMerchantList}
        close={() =>
          this.setState({
            openModalMerchantList: false,
            openModalAddMerchant: false
          })
        }
      />
    ) : (
      <View />
    );
  }
  /**
   *  === RENDER MODAL ERROR  ===
   * @returns {ReactElement} render modal error If state showModalError true
   */
  renderModalError() {
    return (
      <ModalBottomType3
        title={''}
        open={this.state.showModalError}
        close={() =>
          this.setState({
            showModalError: false,
            errorTitle: '',
            errorMessage: ''
          })
        }
        content={this.modalErrorContent()}
        typeClose={'cancel'}
      />
    );
  }
  /**
   *  === RENDER MODAL ERROR CONTENT  ===
   * @returns {ReactElement} render modal error If state showModalError true
   * @memberof renderModalError
   */

  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatusBarRedOP50 />
        <Image
          source={require('../../assets/images/sinbad_image/sinbad_no_access.png')}
          style={{ width: 208, height: 156 }}
        />
        <View style={{ padding: 24 }}>
          <Text style={[Fonts.type7, { padding: 8, textAlign: 'center' }]}>
            Maaf, Anda tidak memiliki akses ke halaman ini
          </Text>
          <Text style={[Fonts.type17, { textAlign: 'center', lineHeight: 18 }]}>
            Silakan hubungi admin untuk proses lebih lanjut
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          <ButtonSingle
            borderRadius={4}
            title={'Oke, Saya Mengerti'}
            onPress={() => {
              this.setState({ showModalError: false });
            }}
          />
        </View>
      </View>
    );
  }
  /**
   *  === RENDER MODAL ERROR RESPONSE  ===
   * @returns {ReactElement} render modal if error from be
   * @memberof renderModalError
   */
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
  /** === RENDER MODAL DELAYED VISIT === */
  renderModalInfoPausedVisit() {
    return (
      <ModalBottomType1
        open={this.state.modalInfoPausedVisit}
        title="Masih Ada Kunjungan Tertunda"
        content={
          <View>
            <Text
              style={[
                Fonts.type3,
                { marginHorizontal: 24, textAlign: 'center', marginBottom: 32 }
              ]}
            >
              Pastikan untuk menyelesaikan semua kunjungan di journey plan.
            </Text>
            <View style={{ marginBottom: 16 }}>
              <ButtonSingle
                disabled={false}
                title={'Mengerti'}
                borderRadius={4}
                onPress={() => this.setState({ modalInfoPausedVisit: false })}
              />
            </View>
          </View>
        }
      />
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
        {/* button add store on bottom */}
        {this.renderButtonAddJourney()}
        {/* journey plan list */}
        {this.renderJourneyListData()}
        {/* modal */}
        {this.renderModalAddMerchant()}
        {this.renderModalMerchantList()}
        {this.renderToast()}
        {this.state.showModalError && this.renderModalError()}
        {this.renderModalErrorResponse()}
        {this.renderModalInfoPausedVisit()}
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
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'row',
    paddingVertical: 13
  },
  headerMapButton: {
    backgroundColor: masterColor.fontBlack05,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    paddingHorizontal: 12
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
  },
  //extra font
  headerTextSubTitle: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10,
    lineHeight: 12,
    color: masterColor.fontBlack80
  }
});

const mapStateToProps = ({ journey, user, merchant, privileges }) => {
  return { journey, user, merchant, privileges };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Raka
 * updatedDate: 26012022
 * updatedFunction:
 * -> integrate filter journey plan by storetype
 */
