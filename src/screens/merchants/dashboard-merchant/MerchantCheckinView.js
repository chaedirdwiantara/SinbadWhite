import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
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
      latitude: this.props.merchant.selectedMerchant.latitude,
      longitude: this.props.merchant.selectedMerchant.longitude,
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
        /** get log all activity */
        this.props.merchantGetLogAllActivityProcessV2(
          this.props.merchant.selectedMerchant.journeyBookStores.id
        );
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
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
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
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
        onLayout={() =>
          setTimeout(() => {
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
          }, 500)
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
    const journeyBookStoresId = this.props.merchant.selectedMerchant
      .journeyBookStores.id;
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
            <View>
              <ButtonSingle
                disabled={this.props.merchant.loadingPostActivity}
                title={'Masuk Toko'}
                loading={this.props.merchant.loadingPostActivity}
                borderRadius={4}
                onPress={() =>
                  this.props.merchantPostActivityProcessV2({
                    journeyBookStoreId: this.props.merchant.selectedMerchant
                      .journeyBookStores.id,
                    activityName: 'check_in',
                    longitude: this.state.longitude,
                    latitude: this.state.latitude
                  })
                }
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

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeaderLeft()}
        {this.renderHeaderRight()}
        {this.renderMaps()}
        {this.renderModalBottom()}
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
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Change Key
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 *  -> Update the props of log activity.
 * updatedBy: dyah
 * updatedDate: 26022021
 * updatedFunction:
 *  -> Update the props of post activity.
 */
