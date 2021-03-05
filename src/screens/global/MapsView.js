import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  MapView,
  Marker,
  Geolocation,
  OpenAppSettings
} from '../../library/thirdPartyPackage';
import {
  StatusBarTransparentBlack,
  ButtonSingle,
  LoadingPage,
  ModalBottomErrorPinMap,
  ErrorPageNoGPS,
  ModalBottomErrorRespons
} from '../../library/component';
import { Fonts, GlobalStyle } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { GlobalMethod } from '../../services/methods';

class MapsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.25511,
      longitude: 106.808,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      reRender: false,
      openErrorGlobalLongLatToAddress: false,
      openModalNoGPS: false,
      openModalErrorGlobal: false,
      defaultAddress: ''
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  componentDidMount() {
    this.getCurrentLocation();
  }

  componentDidUpdate(prevProps,prevState) {
    /** === IF SUCCESS === */
    /** => if success get location from google maps */
    if (
      prevState.longitude !== this.state.longitude ||
      prevState.latitude !== this.state.latitude
    ) {
      this.getDefaultAddress({
        longitude: this.state.longitude,
        latitude: this.state.latitude
      });
    }
    if (
      prevProps.global.dataGlobalLongLatToAddress !==
      this.props.global.dataGlobalLongLatToAddress
    ) {
      if (this.props.global.dataGlobalLongLatToAddress !== null) {
        this.getUrbanId();
      }
    }
    /** => if success get data urban id (data from google maps) */
    if (prevProps.global.dataGetUrbanId !== this.props.global.dataGetUrbanId) {
      if (this.props.global.dataGetUrbanId !== null) {
        this.checkDataUrbanId();
      }
    }
    /** === IF ERROR === */
    /** => if failed get location from google maps */
    if (
      prevProps.global.errorGlobalLongLatToAddress !==
      this.props.global.errorGlobalLongLatToAddress
    ) {
      if (this.props.global.errorGlobalLongLatToAddress !== null) {
        /** => clear get data urban Id */
        this.props.clearDataGetUrbanId();
        this.setState({ openErrorGlobalLongLatToAddress: true });
      }
    }
    /** => if failed get urban id from BE */
    if (
      prevProps.global.errorGetUrbanId !== this.props.global.errorGetUrbanId
    ) {
      if (this.props.global.errorGetUrbanId !== null) {
        this.setState({ openModalErrorGlobal: true });
      }
    }
  }
  /** === GET URBAN ID FROM DB === */
  getUrbanId() {
    this.setState({ openErrorGlobalLongLatToAddress: false });
    this.props.getUrbanIdProcess(this.props.global.dataGlobalLongLatToAddress);
  }
  /** === CHECK DATA URBAN ID === */
  checkDataUrbanId() {
    if (this.props.global.dataGetUrbanId.length > 0) {
      this.props.saveVolatileDataMerchant({address: this.state.defaultAddress})
      NavigationService.goBack(this.props.navigation.state.key);
    } else {
      this.setState({ openErrorGlobalLongLatToAddress: true });
    }
  }
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    this.setState({
      longitude:
        Math.round(success.coords.longitude * 1000000000000) / 1000000000000,
      latitude:
        Math.round(success.coords.latitude * 1000000000000) / 1000000000000,
      reRender: false
    });
  };
  errorMaps = (error) => {
    if(error?.code === 3){
      this.getCurrentLocation()
    } else {
      this.setState({ openModalNoGPS: true, reRender: false });
    }
  };
  getCurrentLocation() {
    this.setState({ reRender: true });
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }
  addLongLat() {
    this.props.longlatToAddressGetProcess({
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
  }
  async getDefaultAddress(latlng) {
    try {
      const {
        data: { results }
      } = await GlobalMethod.getAddressFromLongLat(latlng) || {};
      if (results.length > 0) {
        this.setState({defaultAddress: results[0]['formatted_address']});
      }
    } catch (error) {
      console.log(error);
    }
  }
  checkLongLat(longlat) {
    if (longlat) {
      return longlat;
    }
    return 0;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === MAPS === */
  renderMapsContent() {
    return (
      <MapView
        showsUserLocation
        ref={ref => (this.mapRef = ref)}
        style={{ flex: 1, width: '100%' }}
        maxZoomLevel={18}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onLayout={() => {
          setTimeout(() => {
            this.mapRef.fitToCoordinates(
              [
                {
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }
              ],
              {
                edgePadding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                },
                animated: true
              }
            );
          }, 0);
        }}
      >
        <Marker
          draggable
          onDragEnd={event => {
            this.setState({
              latitude: this.checkLongLat(
                event.nativeEvent.coordinate.latitude
              ),
              longitude: this.checkLongLat(
                event.nativeEvent.coordinate.longitude
              )
            });
          }}
          image={require('../../assets/icons/maps/drop_pin.png')}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={'Toko'}
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
            color={masterColor.fontBlack80}
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
            color={masterColor.fontBlue50}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER PAGE === */
  renderLoading() {
    return <LoadingPage />;
  }
  renderMaps() {
    return this.state.reRender
      ? this.renderLoading()
      : this.renderMapsContent();
  }

  renderDefaultAddress() {
    if (this.state.defaultAddress) {
      const street = this.state.defaultAddress
        .split(',')
        .slice(0, 2)
        .join(', ');
      const urban = this.state.defaultAddress
        .split(',')
        .slice(2)
        .join(', ')
        .trim();
      return (
        <View style={{ margin: 16, marginBottom: 0 }}>
          <Text style={{ fontFamily: Fonts.MontserratSemiBold, marginBottom: 8 }}>{street}</Text>
          <Text style={{ fontFamily: Fonts.MontserratRegular }}>{urban}</Text>
        </View>
      );
    }
    return (
      <Text style={{ margin: 16, textAlign: 'center' }}>
        Mendapatkan lokasi. . .
      </Text>
    );
  }

  renderButton() {
    return (
      <View style={styles.boxButtonBottom}>
        {this.renderDefaultAddress()}
        <ButtonSingle
          disabled={
            this.state.reRender ||
            this.props.global.loadingGlobalLongLatToAddress ||
            this.props.global.loadingGetUrbanId
          }
          loading={
            this.props.global.loadingGlobalLongLatToAddress ||
            this.props.global.loadingGetUrbanId
          }
          title={'Pilih Lokasi Ini'}
          borderRadius={4}
          onPress={() => this.addLongLat()}
        />
      </View>
    );
  }
  /** === MODAL ==== */
  renderError() {
    return this.state.openErrorGlobalLongLatToAddress ? (
      <ModalBottomErrorPinMap
        open={this.state.openErrorGlobalLongLatToAddress}
        close={() => this.setState({ openErrorGlobalLongLatToAddress: false })}
        onPress={() => {
          this.setState({ openErrorGlobalLongLatToAddress: false });
          NavigationService.navigate('InputManualLocation');
        }}
      />
    ) : (
      <View />
    );
  }
  /** ===> RENDER MODAL ERROR RESPONS FROM BE ===  */
  renderModalErrorRespons() {
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
  /** === ERROR PAGE NO GPS === */
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
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderButton()}
        {/* modal */}
        {this.renderError()}
        {this.renderModalErrorRespons()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarTransparentBlack />
        {this.state.openModalNoGPS ? this.renderNoGps() : this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerHeaderLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 16,
    width: 40,
    height: 55,
    zIndex: 1000
  },
  containerHeaderRight: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 16,
    width: 40,
    height: 55,
    zIndex: 1000
  },
  boxButton: {
    backgroundColor: masterColor.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: '100%'
  },
  boxButtonBottom: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: masterColor.backgroundWhite,
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MapsView);
