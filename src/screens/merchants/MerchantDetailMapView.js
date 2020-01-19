import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import OpenAppSettings from 'react-native-app-settings';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ComingSoon from '../../components/empty_state/ComingSoon';
import masterColor from '../../config/masterColor.json';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';
import GlobalStyles from '../../helpers/GlobalStyle';
import ButtonSingle from '../../components/button/ButtonSingle';
import { LoadingPage } from '../../components/Loading';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import ErrorPageNoGPS from '../../components/error/ErrorPageNoGPS';

const { height } = Dimensions.get('window');

class MerchantDetailMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.25511,
      longitude: 106.808,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      reRender: false,
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
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    this.setState({
      longitude: success.coords.longitude,
      latitude: success.coords.latitude,
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
    this.props.saveLocationDataVolatile({
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });
    NavigationService.goBack(this.props.navigation.state.key);
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
        maxZoomLevel={17}
        showsUserLocation={true}
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
                },
                {
                  latitude: this.props.navigation.state.params.latitude,
                  longitude: this.props.navigation.state.params.longitude
                }
              ],
              {
                edgePadding: {
                  top: 0.1 * height,
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
          image={require('../../assets/icons/maps/drop_pin.png')}
          coordinate={{
            latitude: this.props.navigation.state.params.latitude,
            longitude: this.props.navigation.state.params.longitude
          }}
          title={this.props.navigation.state.params.name}
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
        <Text style={[Fonts.type7, { marginBottom: 5 }]}>
          {this.props.navigation.state.params.externalId
            ? this.props.navigation.state.params.externalId
            : this.props.navigation.state.params.storeCode
            ? this.props.navigation.state.params.storeCode
            : '-'}
        </Text>
        <Text style={[Fonts.type7, { marginBottom: 10 }]}>
          {this.props.navigation.state.params.name}
        </Text>
        <Address
          font={Fonts.type17}
          address={this.props.navigation.state.params.address}
          urban={this.props.navigation.state.params.urban}
        />
      </View>
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
  /** RENDER COTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderButton()}
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
    paddingHorizontal: 16,
    paddingBottom: 50,
    paddingTop: 30,
    backgroundColor: masterColor.backgroundWhite,
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailMapView);
