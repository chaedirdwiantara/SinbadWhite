import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import OpenAppSettings from 'react-native-app-settings';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';
import GlobalStyles from '../../helpers/GlobalStyle';
import ButtonSingle from '../../components/button/ButtonSingle';
import { LoadingPage } from '../../components/Loading';
import ModalBottomErrorPinMap from '../../components/error/ModalBottomErrorPinMap';
import ErrorPageNoGPS from '../../components/error/ErrorPageNoGPS';

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
      openModalNoGPS: false
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

  componentDidUpdate(prevProps) {
    /** IF SUCCESS */
    if (
      prevProps.global.dataGlobalLongLatToAddress !==
      this.props.global.dataGlobalLongLatToAddress
    ) {
      if (this.props.global.dataGlobalLongLatToAddress !== null) {
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
    /** IF ERROR */
    if (
      prevProps.global.errorGlobalLongLatToAddress !==
      this.props.global.errorGlobalLongLatToAddress
    ) {
      if (this.props.global.errorGlobalLongLatToAddress !== null) {
        this.setState({ openErrorGlobalLongLatToAddress: true });
      }
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
  errorMaps = () => {
    this.setState({ openModalNoGPS: true, reRender: false });
  };
  getCurrentLocation() {
    this.setState({ reRender: true });
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps, {
      timeout: 50000,
      maximumAge: 1000
    });
  }
  addLongLat() {
    this.props.longlatToAddressGetProcess({
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
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
        onLayout={() =>
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
        <Marker
          draggable
          onDragEnd={event => {
            this.setState({
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude
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
          style={[styles.boxButton, GlobalStyles.shadow]}
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
          style={[styles.boxButton, GlobalStyles.shadow]}
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
  renderButton() {
    return (
      <View style={styles.boxButtonBottom}>
        <ButtonSingle
          disabled={
            this.state.reRender ||
            this.props.global.loadingGlobalLongLatToAddress
          }
          loading={this.props.global.loadingGlobalLongLatToAddress}
          title={'Pilih Lokasi Ini'}
          borderRadius={4}
          onPress={() => this.addLongLat()}
        />
      </View>
    );
  }
  /** MODAL */
  renderError() {
    return this.state.openErrorGlobalLongLatToAddress ? (
      <ModalBottomErrorPinMap
        open={this.state.openErrorGlobalLongLatToAddress}
        onPress={() => {
          this.setState({ openErrorGlobalLongLatToAddress: false });
          // this.addLongLat();
        }}
      />
    ) : (
      <View />
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
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderButton()}
        {/* modal */}
        {this.renderError()}
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
    backgroundColor: masterColor.backgroundWhite
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
