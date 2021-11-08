import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MapView,
  Marker,
  moment,
  MaterialIcon,
  Geolocation
} from '../../library/thirdPartyPackage';
import {
  ButtonSingleSmall,
  LoadingPage,
  ModalBottomErrorRespons,
  Address
} from '../../library/component';
import { Color } from '../../config';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ModalBottomFilterList from './ModalBottomFilterList';
import ModalJourneyPlanEmpty from './ModalJourneyPlanEmpty';

const { width, height } = Dimensions.get('window');

class JourneyMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.25511,
      longitude: 106.808,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03 * (width / height),
      merchant: null,
      modalEmpty: false,
      modalFilter: false,
      openModalErrorGlobal: false,
      filter: 'Semua Toko',
      noGPS: false
    };
    this.mapMerchantRef = React.createRef(null);
  }
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.getJourneyPlan();
    if (this.props.navigation.state.params?.latitude) {
      const { latitude, longitude } = this.props.navigation.state.params;
      this.setState({ latitude, longitude });
    } else {
      this.getCurrentLocation();
    }
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (this.props.journey.dataGetJourneyPlanMapData) {
      if (
        prevProps.journey.dataGetJourneyPlanMapData !==
        this.props.journey.dataGetJourneyPlanMapData
      ) {
        if (this.props.journey.dataGetJourneyPlanMapData.length === 0) {
          if (this.state.filter === 'Semua Toko') {
            this.setState({ modalEmpty: true });
          }
        }
        // check the current condition of store (visit/not)
        let updatedMerchant;
        // check selected merchant
        if (this.state.merchant) {
          updatedMerchant = this.props.journey.dataGetJourneyPlanMapData.find(
            item => item.externalId === this.state.merchant.externalId
          );
        }
        // if there's changes, update selected merchant
        if (updatedMerchant && updatedMerchant !== this.state.merchant) {
          this.setState({ merchant: updatedMerchant, filter: 'Semua Toko' });
        }
      }
    }
    // check params & update the merchant's state
    if (
      this.props.navigation.state.params?.merchant &&
      !this.props.journey.loadingGetJourneyPlanMapData
    ) {
      // check oldest params
      if (!prevProps.navigation.state.params) {
        this.setState(
          {
            merchant: this.props.navigation.state.params.merchant
          },
          // set the layout of the map
          () => {
            this.setZoomMap(
              this.state.merchant.latitude,
              this.state.merchant.longitude
            );
          }
        );
      } else {
        // check differences between oldest & newest params
        if (
          prevProps.navigation.state.params.merchant !==
          this.props.navigation.state.params.merchant
        ) {
          this.setState(
            {
              merchant: this.props.navigation.state.params.merchant
            },
            // set the layout of the map
            () => {
              this.setZoomMap(
                this.state.merchant.latitude,
                this.state.merchant.longitude
              );
            }
          );
        }
      }
    }
    // check params filter & update the filter's state
    if (this.props.navigation.state.params?.filter) {
      // check oldest params
      if (prevProps.navigation.state.params?.filter) {
        // check differences between oldest state & params
        if (this.state.filter !== this.props.navigation.state.params.filter) {
          this.setState({ filter: 'Semua Toko' });
        }
      }
    }
    /** error get journey plan map data */
    if (
      prevProps.journey.errorGetJourneyPlanMapData !==
      this.props.journey.errorGetJourneyPlanMapData
    ) {
      if (this.props.journey.errorGetJourneyPlanMapData !== null) {
        this.doError();
      }
    }
  }
  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    this.props.navigation.setParams({
      merchant: null
    });
  }
  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    this.setState({
      openModalErrorGlobal: true,
      modalEmpty: false,
      modalFilter: false
    });
  }
  /** FOR FILTER VALUE */
  returnFilter() {
    switch (this.state.filter) {
      case 'Semua Toko':
        return 'all';
      case 'Toko PJP':
        return 'pjp';
      case 'Toko Non-PJP':
        return 'nonpjp';
      case 'Sudah Dikunjungi':
        return 'visited';
      case 'Belum Dikunjungi':
        return 'notvisited';
      default:
        return 'all';
    }
  }
  /** === GET JOURNEY PLAN === */
  getJourneyPlan() {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    const storetype = this.returnFilter();
    this.props.journeyPlanGetMapDataReset();
    this.props.journeyPlanGetMapDataProcess({
      page: 1,
      length: 1000,
      date: today,
      search: '',
      storetype,
      loading: true
    });
  }
  /** === GO TO JOURNEY MAP SEARCH VIEW === */
  goToMapSearch() {
    this.getJourneyPlan();
    NavigationService.navigate('JourneyMapSearchView', {
      mapMerchantRef: this.mapMerchantRef
    });
  }
  /** === CONTROL ZOOM & RADIUS 1KM === */
  setZoomMap(latitude, longitude) {
    this.mapMerchantRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    });
  }
  /** === SUCCESS GET CURRENT LOCATION === */
  successMaps = success => {
    this.setState(
      {
        longitude: success.coords.longitude,
        latitude: success.coords.latitude
      },
      () => {
        if (
          this.props.journey.dataGetJourneyPlanMapData?.length > 0 &&
          this.mapMerchantRef
        ) {
          // set current location & zoom radius 1km
          this.setZoomMap(this.state.latitude, this.state.longitude);
        }
      }
    );
  };
  /** === ERROR GET CURRENT LOCATION === */
  errorMaps = () => {
    this.setState({ noGPS: true });
  };
  /** === GET CURRENT LOCATION === */
  getCurrentLocation() {
    this.setState({ reRender: true });
    setTimeout(() => {
      this.setState({ reRender: false });
    }, 100);
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }
  /** === GO TO MERCHANT DASHBOARD (TASKLIST) === */
  goToMerchantDashboard(storeName, data) {
    /** FOR RESET OMS DATA (CART ETC)
     * if agent change store
     */
    if (this.props.merchant.selectedMerchant !== null) {
      if (
        parseInt(this.props.merchant.selectedMerchant.storeId, 10) !==
        data.storeId
      ) {
        this.props.merchantChanged(true);
      }
    }
    /** GO TO SELECTED STORE */
    data.name = data.storeName;
    data.storeId = data.storeId.toString();
    this.props.merchantSelected(data);
    setTimeout(() => {
      NavigationService.navigate('MerchantHomeView', {
        storeName
      });
    }, 100);
  }
  /** === SET MERCHANT's ICON === */
  setIconMerchant = item => {
    if (
      item.journeyBookStores.permanentJourneyPlanId === null ||
      item.journeyBookStores.permanentJourneyPlanId === 0
    ) {
      return require('../../assets/icons/maps/store_non_pjp.png');
    }
    return require('../../assets/icons/maps/store_pjp.png');
  };
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER SEARCH BAR === */
  renderSearchBar() {
    return (
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          onPress={() => this.goToMapSearch()}
          style={[styles.boxSearchBar, GlobalStyle.shadow]}
        >
          <View style={{ paddingHorizontal: 11 }}>
            <MaterialIcon
              color={Color.fontBlack100}
              name={'search'}
              size={24}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={[styles.inputBox]}>
              <Text style={Fonts.type85}>Cari Nama / ID Toko disini</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER CURRENT LOCATION === */
  renderCurrentLocation() {
    return (
      <View style={styles.containerCurrentLocation}>
        <TouchableOpacity
          style={[styles.circleButton, GlobalStyle.shadow]}
          onPress={() => this.getCurrentLocation()}
        >
          <MaterialIcon name="gps-fixed" color={Color.fontBlack60} size={24} />
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER BACK BUTTON === */
  renderBack() {
    return (
      <View style={styles.containerBackButton}>
        <TouchableOpacity
          style={[styles.circleButton, GlobalStyle.shadow]}
          onPress={() =>
            NavigationService.goBack(this.props.navigation.state.key)
          }
        >
          <MaterialIcon name="arrow-back" color={Color.fontBlack80} size={24} />
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER CONTAINER BACK BUTTON & CURRENT LOCATION === */
  renderButtonBackAndLocation() {
    return (
      <View style={styles.containerBackCurrent}>
        {this.renderBack()}
        {this.renderCurrentLocation()}
      </View>
    );
  }
  /** === RENDER MAPS === */
  renderMaps() {
    return this.props.journey.dataGetJourneyPlanMapData?.length > 0
      ? this.renderMapsContent()
      : this.renderMapsContentEmpty();
  }
  /** === RENDER MAPS NO JOURNEY PLAN === */
  renderMapsContentEmpty() {
    return (
      <MapView
        ref={ref => (this.mapRef = ref)}
        style={{ flex: 1, width: '100%' }}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onLayout={() =>
          setTimeout(() => {
            this.mapRef.fitToCoordinates(
              [
                {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                },
                {
                  latitudeDelta: this.state.latitudeDelta,
                  longitudeDelta: this.state.longitudeDelta
                }
              ],
              {
                edgePadding: {
                  top: 16,
                  right: 16,
                  bottom: 16,
                  left: 16
                },
                animated: true
              }
            );
          }, 500)
        }
      >
        {!this.state.noGPS ? (
          <Marker
            image={require('../../assets/icons/maps/pin_my_location.png')}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={'Anda'}
          />
        ) : (
          <View />
        )}
      </MapView>
    );
  }
  /** === RENDER MAPS WITH JOURNEY PLAN === */
  renderMapsContent() {
    return (
      <MapView
        ref={this.mapMerchantRef}
        style={{ flex: 1, width: '100%' }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onLayout={() =>
          setTimeout(() => {
            if (this.props.journey.dataGetJourneyPlanMapData?.length > 0) {
              this.mapMerchantRef.current.fitToCoordinates(
                [
                  {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  },
                  {
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta
                  }
                ],
                {
                  edgePadding: {
                    top: 16,
                    right: 16,
                    bottom: 0.45 * height,
                    left: 16
                  },
                  animated: true
                }
              );
            }
          }, 500)
        }
      >
        {!this.state.noGPS ? (
          <React.Fragment>
            <Marker
              style={{ width: 10, height: 10 }}
              image={require('../../assets/icons/maps/pin_my_location.png')}
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }}
              title={'Anda'}
            />
          </React.Fragment>
        ) : (
          <View />
        )}

        {this.props.journey.dataGetJourneyPlanMapData?.map((marker, index) => (
          <Marker
            key={index}
            image={
              this.state.merchant &&
              this.state.merchant.externalId === marker.externalId
                ? require('../../assets/icons/maps/select_merchant.png')
                : this.setIconMerchant(marker)
            }
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            onPress={() => this.setState({ merchant: marker })}
          />
        ))}
      </MapView>
    );
  }
  /** === RENDER LOADING PAGE === */
  renderLoading() {
    return <LoadingPage />;
  }
  /**
   * ======================
   * MODAL
   * =======================
   */
  /** === RENDER BUTTON DETAIL & KUNJUNGI BOTTOM === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ paddingRight: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            title={'Detail'}
            white
            borderRadius={4}
            onPress={() => {
              this.props.merchantSelected(this.state.merchant);
              NavigationService.navigate('MerchantDetailView', {
                id: this.state.merchant.id
              });
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ButtonSingleSmall
            flex
            title={'Kunjungi'}
            borderRadius={4}
            icon={
              this.state.merchant.journeyBookStores.visitStatus ? (
                <MaterialIcon
                  name="check-circle"
                  color={Color.fontWhite}
                  size={15}
                />
              ) : null
            }
            onPress={() =>
              this.goToMerchantDashboard(
                this.state.merchant.storeName,
                this.state.merchant
              )
            }
          />
        </View>
      </View>
    );
  }
  /** RENDER FILTER BOTTOM */
  renderFilter() {
    return (
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => this.setState({ modalFilter: true })}
      >
        <Text style={Fonts.type8}>{this.state.filter}</Text>
        <MaterialIcon
          name={'keyboard-arrow-down'}
          color={Color.fontBlack60}
          size={24}
        />
      </TouchableOpacity>
    );
  }
  /** RENDER MODAL BOTTOM */
  renderBottom() {
    const { merchant } = this.state;
    let pjp = true;
    if (merchant) {
      if (
        merchant.journeyBookStores.permanentJourneyPlanId === null ||
        merchant.journeyBookStores.permanentJourneyPlanId === 0
      ) {
        pjp = false;
      }
    }

    return !this.props.journey.loadingGetJourneyPlanMapData ? (
      <View style={styles.containerBottom}>
        {this.renderButtonBackAndLocation()}
        <View style={styles.modalBottom}>
          <View style={styles.topModalBottom}>
            {this.renderFilter()}
            <View />
            <Text style={Fonts.type8}>
              Terdapat {this.props.journey.dataGetJourneyPlanMapData?.length}{' '}
              Toko
            </Text>
          </View>
          {merchant ? (
            <View style={{ padding: 16 }}>
              <View style={styles.containerLabelExternalId}>
                <View
                  style={[
                    styles.labelPJP,
                    {
                      backgroundColor: pjp
                        ? Color.fontBlue10
                        : Color.fontBlack10
                    }
                  ]}
                >
                  <Text
                    style={[
                      Fonts.type9,
                      {
                        color: pjp ? Color.fontBlue60 : Color.fontBlack60
                      }
                    ]}
                  >
                    {pjp ? 'PJP' : 'NON PJP'}
                  </Text>
                </View>
                <Text
                  style={
                    merchant.journeyBookStores.typeOfStore === 'exist_store'
                      ? Fonts.type9
                      : Fonts.type29
                  }
                >
                  {merchant.externalId}
                </Text>
              </View>
              <View style={{ paddingBottom: 8 }}>
                <Text
                  style={
                    merchant.journeyBookStores.typeOfStore === 'exist_store'
                      ? Fonts.type3
                      : Fonts.type29
                  }
                >
                  {merchant.storeName}
                </Text>
              </View>
              <Address
                maxLength={100}
                substring
                font={
                  merchant.journeyBookStores.typeOfStore === 'exist_store'
                    ? Fonts.type9
                    : Fonts.type22
                }
                address={merchant.address}
                urban={merchant.urbans}
              />
              {this.renderButton()}
            </View>
          ) : null}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL MERCHANT EMPTY === */
  renderModalJourneyPlanEmpty() {
    return (
      <ModalJourneyPlanEmpty
        open={this.state.modalEmpty}
        ok={() =>
          this.setState({ modalEmpty: false }, () =>
            NavigationService.navigate('JourneyView')
          )
        }
      />
    );
  }
  /** === RENDER MODAL FILTER JOURNEY PLAN === */
  renderModalFilter() {
    return (
      <ModalBottomFilterList
        open={this.state.modalFilter}
        filter={this.state.filter}
        close={() => this.setState({ modalFilter: false })}
        save={filter =>
          this.setState({ modalFilter: false, merchant: null, filter }, () =>
            this.getJourneyPlan()
          )
        }
      />
    );
  }
  /** === RENDER MODAL ERROR RESPONSE === */
  renderModalErrorResponse() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalErrorGlobal}
        onPress={() =>
          this.setState({ openModalErrorGlobal: false }, () =>
            NavigationService.goBack()
          )
        }
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
          {this.renderSearchBar()}
        </View>
        {this.props.journey.loadingGetJourneyPlanMapData ||
        this.props.journey.loadingGetJourneyPlan
          ? this.renderLoading()
          : this.renderMaps()}
        {/* MODAL */}
        {this.renderBottom()}
        {this.renderModalJourneyPlanEmpty()}
        {this.renderModalFilter()}
        {this.renderModalErrorResponse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  searchBarContainer: {
    paddingTop: 16,
    paddingHorizontal: 16
  },
  boxSearchBar: {
    height: 41,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'row'
  },
  inputBox: {
    paddingVertical: 0
  },
  containerBackButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 55
  },
  containerCurrentLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 55
  },
  circleButton: {
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: '100%'
  },
  containerLabelExternalId: {
    flexDirection: 'row',
    paddingBottom: 8,
    alignItems: 'center'
  },
  labelPJP: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 8,
    borderRadius: 4
  },
  buttonContainer: {
    paddingTop: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerBottom: {
    backgroundColor: 'transparent',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  modalBottom: {
    backgroundColor: Color.fontWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  topModalBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  filterButton: {
    backgroundColor: Color.fontBlack05,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: Color.fontBlack10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerBackCurrent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    alignItems: 'flex-end'
  }
});

const mapStateToProps = ({ user, merchant, journey }) => {
  return { user, merchant, journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyMapView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 28072021
 * updatedBy: dyah
 * updatedDate: 27102021
 * updatedFunction:
 * -> fix bug recenter button should be zooming to the user current location.
 */
