import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Text,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  BackHandler
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  MapView,
  Marker,
  Geolocation,
  OpenAppSettings
} from '../../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  SearchBarType3,
  ModalBottomType6,
  ModalConfirmation,
  ModalConfirmationType5,
  Address,
  ButtonSingle,
  LoadingPage,
  ModalBottomErrorRespons,
  ErrorPageNoGPS
} from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
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
      inStore: null,
      visitStore: null,
      openModalNoGPS: false,
      count: 0,
      refresh: true,
      success: false,
      openModalNotInRadius: false,
      openModalErrorGlobal: false
    };
    this.initialState = { ...this.state };
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
        if (this.props.merchant.dataPostActivityV2.activity === 'check_in') {
          /** get log all activity */
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
          NavigationService.navigate('MerchantHomeView');
        }
      }
    }
    const {
      dataGetRadiusLockGeotag,
      errorGetRadiusLockGeotag,
      errorPostActivityV2
    } = this.props.merchant;
    /** CHECK RADIUS LOCK GEOTAG (SUCCESS) */
    if (dataGetRadiusLockGeotag) {
      if (
        prevProps.merchant.dataGetRadiusLockGeotag !== dataGetRadiusLockGeotag
      ) {
        /** IF USER LOCATION IN THE RADIUS */
        if (
          dataGetRadiusLockGeotag.active &&
          dataGetRadiusLockGeotag.accepted
        ) {
          this.setState({ success: true, count: 0 });
        }
        /** IF USER LOCATION NOT IN THE RADIUS */
        if (
          dataGetRadiusLockGeotag.active &&
          !dataGetRadiusLockGeotag.accepted
        ) {
          this.setState(
            {
              succes: false,
              count: this.state.count + 1
            },
            () => {
              if (this.state.count === 3) {
                this.setState({ openModalNotInRadius: true });
              }
            }
          );
        }
      }
    }
    /** CHECK RADIUS LOCK GEOTAG (FAILED) */
    if (errorGetRadiusLockGeotag) {
      if (
        prevProps.merchant.errorGetRadiusLockGeotag !== errorGetRadiusLockGeotag
      ) {
        this.doError();
      }
    }
    /** FAILED ERROR POST CHECK IN ACTIVITY */
    if (errorPostActivityV2) {
      if (prevProps.merchant.errorPostActivityV2 !== errorPostActivityV2) {
        this.doError();
      }
    }
  }
  componentWillUnmount() {
    this.internalClearInterval();
  }
  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    /** Close all modal and open modal error respons */
    this.setState({
      openModalErrorGlobal: true,
      openModalNoGPS: false,
      modalOutStore: false,
      openModalNotInRadius: false
    });
  }
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    const longitude = success.coords.longitude;
    const latitude = success.coords.latitude;
    if (longitude !== 0 && latitude !== 0) {
      this.internalClearInterval();
      this.setState(
        {
          longitude,
          latitude,
          openModalNoGPS: false,
          reRender: false
        },
        () => {
          if (this.state.refresh) {
            this.props.getRadiusLockGeotagProcess({
              storeLong: this.props.merchant.selectedMerchant.longitude,
              storeLat: this.props.merchant.selectedMerchant.latitude,
              salesLong: this.state.longitude,
              salesLat: this.state.latitude
            });
          }
        }
      );
    } else {
      if (!this.state.interval) {
        this.setState({
          interval: setInterval(() => {
            this.getCurrentLocation();
          }, 5000)
        });
      }
    }
  };
  internalClearInterval = () => {
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
  getCurrentLocation(value) {
    let refresh = false;
    if (value) refresh = value;
    this.setState(
      {
        refresh,
        reRender: true
      },
      () =>
        Geolocation.getCurrentPosition(this.successMaps, this.errorMaps, {
          timeout: 30000,
          enableHighAccuracy: true
        })
    );
  }
  /** === CHECK IN/OUT STORE === */
  confirm() {
    const { inStore, visitStore } = this.state;
    if (!this.state.inStore) {
      NavigationService.navigate('MerchantNoVisitReasonView', {
        status: { inStore }
      });
    } else if (this.state.inStore && this.state.visitStore) {
      this.postActivityCheckIn(this.state.inStore);
    } else if (this.state.inStore && !this.state.visitStore) {
      NavigationService.navigate('MerchantNoVisitReasonView', {
        status: { inStore, visitStore }
      });
    }
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
    const { dataGetRadiusLockGeotag } = this.props.merchant;
    if (this.props.merchant.loadingPostActivity) {
      return true;
    }
    if (this.state.latitude === 0 && this.state.longitude === 0) {
      return true;
    }
    if (this.state.inStore === null) {
      return true;
    }
    if (this.state.inStore) {
      if (this.state.visitStore === null) {
        return true;
      }
    }
    //if success false && lock geo tag active
    if (!this.state.success && dataGetRadiusLockGeotag?.active) {
      return true;
    }
    return false;
  }
  /**
   * Reset to initial state
   */
  onHandleReset() {
    this.setState(this.initialState);
    this.getCurrentLocation();
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
            );
          }
        }}
      >
        <Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={'Anda'}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../../assets/icons/maps/pin_my_location_2.png')}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: this.props.merchant.selectedMerchant.latitude,
            longitude: this.props.merchant.selectedMerchant.longitude
          }}
          title={this.props.merchant.selectedMerchant.name}
        >
          <Image source={require('../../../assets/icons/maps/store_red.png')} />
        </Marker>
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
          <MaterialIcon name="arrow-back" color={Color.fontBlack80} size={24} />
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
          <MaterialIcon name="near-me" color={Color.fontBlue50} size={24} />
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
  /** === RENDER MERCHANT === */
  renderMerchant() {
    const merchant = this.props.merchant.selectedMerchant;
    return (
      <View style={styles.merchantContainer}>
        <View style={styles.merchantView}>
          <View>
            <Image
              source={require('../../../assets/images/menu/list_toko.png')}
              style={styles.imageCircle}
            />
          </View>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={Fonts.type12}>{merchant.externalId}</Text>
            <View style={{ height: 4 }} />
            <Text style={Fonts.type23}>{merchant.name}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 12 }}>
          <View style={{ width: 40 }} />
          <View style={{ paddingLeft: 12, paddingRight: 16 }}>
            <Address
              substring
              maxLength={50}
              font={Fonts.type56}
              address={merchant.address}
              urban={merchant.urbans}
            />
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER IN STORE === */
  renderInStore() {
    return (
      <View>
        <View style={styles.confirmInStoreContainer}>
          <Text style={Fonts.type23}>Anda Sedang di Toko Saat ini?</Text>
          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  borderColor:
                    this.state.inStore === null || this.state.inStore
                      ? Color.fontBlack10
                      : Color.mainColor
                }
              ]}
              disabled={this.props.merchant.loadingPostActivity}
              onPress={() => this.setState({ inStore: false })}
            >
              <Text
                style={
                  this.state.inStore === null || this.state.inStore
                    ? Fonts.type23
                    : Fonts.type62
                }
              >
                Tidak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  borderColor: this.state.inStore
                    ? Color.mainColor
                    : Color.fontBlack10
                }
              ]}
              disabled={this.props.merchant.loadingPostActivity}
              onPress={() => {
                this.setState({ inStore: true });
                this.props.getRadiusLockGeotagProcess({
                  storeLong: this.props.merchant.selectedMerchant.longitude,
                  storeLat: this.props.merchant.selectedMerchant.latitude,
                  salesLong: this.state.longitude,
                  salesLat: this.state.latitude
                });
              }}
            >
              <Text style={this.state.inStore ? Fonts.type62 : Fonts.type23}>
                Ya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER VISIT STORE === */
  renderVisitStore() {
    return (
      <View>
        <View style={styles.confirmVisitStoreContainer}>
          <Text style={Fonts.type23}>Toko dapat di Kunjungi?</Text>
          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  borderColor:
                    this.state.visitStore === null || this.state.visitStore
                      ? Color.fontBlack10
                      : Color.mainColor
                }
              ]}
              disabled={this.props.merchant.loadingPostActivity}
              onPress={() => this.setState({ visitStore: false })}
            >
              <Text
                style={
                  this.state.visitStore === null || this.state.visitStore
                    ? Fonts.type23
                    : Fonts.type62
                }
              >
                Tidak
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  borderColor: this.state.visitStore
                    ? Color.mainColor
                    : Color.fontBlack10
                }
              ]}
              disabled={this.props.merchant.loadingPostActivity}
              onPress={() => this.setState({ visitStore: true })}
            >
              <Text style={this.state.visitStore ? Fonts.type62 : Fonts.type23}>
                Ya
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  /**
   * ====================
   * MODAL
   * ====================
   */
  /**
   * === RENDER DIALOG NOT IN RADIUS ===
   * @returns {ReactElement}
   */
  renderDialogPositionNotInRadius() {
    return (
      <ModalConfirmationType5
        title={'Posisi Anda Belum Sesuai'}
        okText={'Coba Lagi'}
        cancelText={'Keluar'}
        open={this.state.openModalNotInRadius}
        content={
          'Silakan tutup dan buka kembali (force close) aplikasi dan ulangi proses masuk ke toko.'
        }
        type={'okeNotRed'}
        ok={() => {
          this.onHandleReset();
        }}
        cancel={() => {
          BackHandler.exitApp();
        }}
      />
    );
  }

  renderModalBottom() {
    const { loadingGetRadiusLockGeotag } = this.props.merchant;
    return (
      <ModalBottomType6
        noTitle={this.renderMerchant()}
        onRefresh={() => this.getCurrentLocation(true)}
        count={this.state.count}
        success={this.state.success}
        maxHeight={height}
        loadGeoTag={loadingGetRadiusLockGeotag}
        body={
          <View style={{ flex: 1, backgroundColor: Color.backgroundWhite }}>
            {this.renderInStore()}
            {this.state.inStore && this.renderVisitStore()}
            <ButtonSingle
              disabled={this.disableButton()}
              title={'Konfirmasi'}
              loading={this.props.merchant.loadingPostActivity}
              borderRadius={4}
              onPress={() => this.confirm()}
            />
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

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderModalBottom()}
        {this.renderModalOutStore()}
        {this.renderModalErrorResponse()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.state.openModalNoGPS ? this.renderNoGps() : this.renderContent()}
        {this.renderDialogPositionNotInRadius()}
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
  merchantView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageCircle: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  confirmInStoreContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flex: 1
  },
  confirmVisitStoreContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1
  },
  confirmButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 16
  },
  confirmButton: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%'
  },
  boxButton: {
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: '100%'
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
 * updatedDate: 23092021
 * updatedFunction:
 * -> add modal error response (when failed get radius lock geotag & failed post activity)
 */
