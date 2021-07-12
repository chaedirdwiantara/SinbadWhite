import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Text,
  PermissionsAndroid,
  TouchableOpacity
} from '../../../library/reactPackage'
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  MapView,
  Marker,
  Geolocation,
  OpenAppSettings
} from '../../../library/thirdPartyPackage'
import {
  StatusBarWhite,
  SearchBarType3,
  ModalBottomType2,
  ModalConfirmation,
  Address,
  ButtonSingle,
  LoadingPage,
  ErrorPageNoGPS
} from '../../../library/component'
import { GlobalStyle, Fonts } from '../../../helpers'
import { Color } from '../../../config'
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

const { height } = Dimensions.get('window');

class MerchantCheckinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      modalOutStore: false,
      latitude: this.props.merchant.selectedMerchant.latitude,
      longitude: this.props.merchant.selectedMerchant.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      reRender: false,
      interval: false,
      openModalNoGPS: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.getCurrentLocation();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** IF CHECK IN SUCCESS */
    if (
      prevProps.merchant.dataPostActivityV2 !==
      this.props.merchant.dataPostActivityV2
    ) {
      if (this.props.merchant.dataPostActivityV2 !== null) {
        if (this.props.merchant.dataPostActivityV2.activity === 'check_in'){
          /** get log all activity */
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
          NavigationService.goBack(this.props.navigation.state.key);
        }
      }
    }
  }
  componentWillUnmount() {
    this.internalClearInterval();
  }
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    const longitude = success.coords.longitude;
    const latitude = success.coords.latitude;
    if (longitude !== 0 && latitude !== 0) {
      this.internalClearInterval();
      this.setState({
        longitude,
        latitude,
        openModalNoGPS: false,
        reRender: false
      });
    } else {
      if (!this.state.interval) {
        this.setState({
          interval: setInterval(() => {
            this.getCurrentLocation();
            console.log('test interval');
          }, 5000)
        });
      }
    }
  };
  internalClearInterval = () => {
    console.log('clear')
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      });
    }
  };
  errorMaps = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        setTimeout(() => this.getCurrentLocation(), 5000);
      }
      this.setState({ reRender: false });
    } catch (err) {
      console.warn(err);
    }
  };
  getCurrentLocation() {
    this.setState({ reRender: true });
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }
  /** === CHECK IN/OUT STORE === */
  checkInOutStore() {
    if (this.state.checked) {
      return this.postActivityCheckIn(true);
    }
    return this.setState({ modalOutStore: true });
  }
  /** === POST ACTIVITY CHECKIN === */
  postActivityCheckIn(inStore) {
    this.props.merchantPostActivityProcessV2({
      journeyBookStoreId: this.props.merchant.selectedMerchant.journeyBookStores
        .id,
      activityName: 'check_in',
      inStore,
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
    return this.setState({ modalOutStore: false });
  }
  /** === DISABLE BUTTON MASUK TOKO === */
  disableButton() {
    if (this.props.merchant.loadingPostActivity) {
      return true;
    }
    if (this.state.latitude === 0 && this.state.longitude === 0) {
      return true;
    }
    return false;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View style={{ width: '100%' }}>
          <SearchBarType3
            placeholder={
              navigation.state.params ? navigation.state.params.placeholder : ''
            }
          />
        </View>
      )
    };
  };
  /** === MAPS === */
  renderMapsContent() {
    return (
      <MapView
        ref={ref => (this.mapRef = ref)}
        style={{ flex: 1, width: '100%' }}
        showsUserLocation={true}
        maxZoomLevel={16}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onLayout={() => {
          if (this.mapRef) {
            this.mapRef.fitToCoordinates(
              [
                {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                },
                {
                  latitude: this.props.merchant.selectedMerchant.latitude,
                  longitude: this.props.merchant.selectedMerchant.longitude
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
            )
          }}
      }
      >
        <Marker
          image={require('../../../assets/icons/maps/drop_pin.png')}
          coordinate={{
            latitude: this.props.merchant.selectedMerchant.latitude,
            longitude: this.props.merchant.selectedMerchant.longitude
          }}
          title={this.props.merchant.selectedMerchant.name}
        />
      </MapView>
    );
  }
  /** === HEADER === */
  renderHeaderLeft() {
    return (
      <View style={styles.containerHeaderLeft}>
        <TouchableOpacity
          style={[styles.boxButton, GlobalStyle.shadow]}
          onPress={() =>
            NavigationService.goBack(this.props.navigation.state.key)
          }
        >
          <MaterialIcon
            name="arrow-back"
            color={Color.fontBlack80}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
  renderHeaderRight() {
    return (
      <View style={styles.containerHeaderRight}>
        <TouchableOpacity
          style={[styles.boxButton, GlobalStyle.shadow]}
          onPress={() => this.getCurrentLocation()}
        >
          <MaterialIcon
            name="near-me"
            color={Color.fontBlue50}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER LOADING === */
  renderLoading() {
    return <LoadingPage />;
  }
  /** === RENDER MAP === */
  renderMaps() {
    return this.state.reRender
      ? this.renderLoading()
      : this.renderMapsContent();
  }
  /**
   * ====================
   * MODAL
   * ====================
   */
  renderModalBottom() {
    const store = this.props.merchant.selectedMerchant;
    return (
      <ModalBottomType2
        title={`${
          store.externalId
            ? store.externalId
            : '-'
        } - ${store.name}`}
        body={
          <View style={{ flex: 1 }}>
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 16, flex: 1 }}
            >
              <Address
                font={Fonts.type17}
                address={store.address}
                urban={store.urban}
              />
            </View>
            <View style={styles.spaceBeforeCheckBox} />
            <View style={styles.checkInOutStore}>
              <Text style={Fonts.type23}>Saya Berada di Toko</Text>
              <TouchableOpacity
                onPress={() => this.setState({ checked: !this.state.checked })}
              >
                {this.state.checked ? (
                  <MaterialIcon
                    name="check-circle"
                    color={Color.mainColor}
                    size={24}
                  />
                ) : (
                  <MaterialIcon
                    name="radio-button-unchecked"
                    color={Color.fontBlack40}
                    size={24}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <ButtonSingle
                disabled={this.disableButton()}
                title={'Masuk Toko'}
                loading={this.props.merchant.loadingPostActivity}
                borderRadius={4}
                onPress={() => this.checkInOutStore()}
              />
            </View>
          </View>
        }
      />
    );
  }

  /** NO GPS */
  renderNoGps() {
    return this.state.openModalNoGPS ? (
      <ErrorPageNoGPS
        onPress={() => {
          OpenAppSettings.open();
          setTimeout(() => {
            NavigationService.goBack(this.props.navigation.state.key);
          }, 100);
        }}
      />
    ) : (
      <View />
    );
  }

  /** CHECK OUT STORE */
  renderModalOutStore() {
    return (
      <ModalConfirmation
        statusBarWhite
        title={'Anda sedang tidak berada di toko'}
        open={this.state.modalOutStore}
        content={'Apakah anda yakin saat ini sedang tidak berada di toko ?'}
        type={'okeNotRed'}
        okText={'Tidak di Toko'}
        cancelText={'Saya di Toko'}
        ok={() => this.postActivityCheckIn(false)}
        cancel={() => this.setState({ modalOutStore: false })}
      />
    );
  }

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderModalBottom()}
        {this.renderModalOutStore()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.state.openModalNoGPS ? this.renderNoGps() : this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  containerHeaderLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 16,
    width: 40,
    height: 55,
    zIndex: 1000
  },
  containerHeaderRight: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 16,
    width: 40,
    height: 55,
    zIndex: 1000
  },
  boxButton: {
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: '100%'
  },
  boxButtonBottom: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Color.backgroundWhite,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  spaceBeforeCheckBox: {
    borderTopColor: Color.fontBlack10,
    borderTopWidth: 1,
    marginLeft: 16
  },
  checkInOutStore: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Color.fontBlack10,
    borderBottomWidth: 1
  }
});

const mapStateToProps = ({ auth, merchant }) => {
  return { auth, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantCheckinView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 12072021
 * updatedFunction:
 * -> change behaviour when getting current location (use interval & auto refresh when failed getting location (latlong 0))
 */
