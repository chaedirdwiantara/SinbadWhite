import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import SearchBarType3 from '../../../components/search_bar/SearchBarType3';
import GlobalStyles from '../../../helpers/GlobalStyle';
import Fonts from '../../../helpers/GlobalFont';
import ModalBottomType2 from '../../../components/modal_bottom/ModalBottomType2';
import Address from '../../../components/Address';
import ButtonSingle from '../../../components/button/ButtonSingle';

const { height } = Dimensions.get('window');

class MerchantCheckinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.merchant.selectedMerchant.store.latitude,
      longitude: this.props.merchant.selectedMerchant.store.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      reRender: false
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
      prevProps.merchant.dataPostActivity !==
      this.props.merchant.dataPostActivity
    ) {
      if (this.props.merchant.dataPostActivity !== null) {
        /** get log all activity */
        this.props.merchantGetLogAllActivityProcess(
          this.props.merchant.selectedMerchant.id
        );
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    this.setState({
      longitude: success.coords.longitude,
      latitude: success.coords.latitude
    });
  };
  errorMaps = () => {
    this.setState({ openErrorGeolocation: true });
  };
  getCurrentLocation() {
    this.setState({ reRender: true });
    setTimeout(() => {
      this.setState({ reRender: false });
    }, 100);
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps, {
      maximumAge: 0,
      enableHighAccuracy: true
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
        ref={ref => (this.mapRef = ref)}
        style={{ flex: 1, width: '100%' }}
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
                  bottom: 0.9 * height,
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
          image={require('../../../assets/icons/maps/drop_pin.png')}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={'Anda'}
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
  /** === RENDER LOADING === */
  renderLoading() {
    return <View />;
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
    const journeyPlanSaleId = this.props.merchant.selectedMerchant.id;
    const store = this.props.merchant.selectedMerchant.store;
    return (
      <ModalBottomType2
        title={`ID ${store.storeCode} - ${store.name}`}
        body={
          <View style={{ flex: 1 }}>
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 16, flex: 1 }}
            >
              <Address
                font={Fonts.type17}
                address={store.address}
                urban={store.urban}
                province={store.province}
              />
            </View>
            <View>
              <ButtonSingle
                disabled={this.props.merchant.loadingPostActivity}
                title={'Check-in'}
                loading={this.props.merchant.loadingPostActivity}
                borderRadius={4}
                onPress={() =>
                  this.props.merchantPostActivityProcess({
                    journeyPlanSaleId,
                    activity: 'check_in'
                  })
                }
              />
            </View>
          </View>
        }
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderModalBottom()}
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
