import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect,
  MapView,
  Marker,
  Geolocation
} from '../../library/thirdPartyPackage'
import {
  TagListType1,
  SearchBarType2,
  EmptyData,
  LoadingPage,
  ModalBottomType2
} from '../../library/component'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';
import MerchantListDataView from './MerchantListDataView';

const { height } = Dimensions.get('window');

class MerchantMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.25511,
      longitude: 106.808,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      noGPS: false
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
      latitude: success.coords.latitude
    });
  };
  errorMaps = () => {
    this.setState({ noGPS: true });
  };
  getCurrentLocation() {
    this.setState({ reRender: true });
    setTimeout(() => {
      this.setState({ reRender: false });
    }, 100);
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }

  parentFunction(data) {
    if (data.type === 'portfolio') {
      this.props.parentFunction(data);
    } else if (data.type === 'search') {
      this.props.parentFunction(data);
    }
  }
  /**
   * ======================
   * MODAL
   * =======================
   */
  /** RENDER MODAL BOTTOM */
  renderBottomList() {
    return !this.props.merchant.loadingGetMerchant ? (
      <ModalBottomType2
        title={`${this.props.merchant.totalDataGetMerchantV2} List Store`}
        height={0.35 * height}
        body={
          <MerchantListDataView
            type={this.props.type}
            search={this.props.searchText}
            portfolioIndex={this.props.portfolio}
          />
        }
      />
    ) : (
      <View />
    );
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /**
   * ==========================
   * SEARCH BAR
   * =========================
   */
  /** === RENDER FOR SEARCH BAR === */
  renderSearchBar() {
    return this.props.merchant.dataGetPortfolioV2 !== null
      ? this.renderCheckSearchBar()
      : this.renderSearchBarContent();
  }
  /** RENDER CHECK SEARCH BAR === */
  renderCheckSearchBar() {
    return this.props.merchant.dataGetPortfolioV2.length > 0 ? (
      this.renderSearchBarContent()
    ) : (
      <View />
    );
  }
  /** === RENDER SEARCH BAR === */
  renderSearchBarContent() {
    return (
      <View>
        <SearchBarType2
          maxLength={30}
          searchText={this.props.searchText}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return this.props.merchant.dataGetPortfolioV2.length > 0 ? (
      <TagListType1
        shadow
        selected={this.props.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        data={this.props.merchant.dataGetPortfolioV2}
      />
    ) : (
      <View />
    );
  }
  /** === MAPS === */
  renderMaps() {
    return this.props.merchant.dataGetPortfolioV2.length > 0
      ? this.renderMapsContent()
      : this.renderMapsContentEmpty();
  }

  renderMapsContentEmpty() {
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
        {!this.state.noGPS ? (
          <Marker
            image={require('../../assets/icons/maps/my_location.png')}
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

  renderMapsContent() {
    return (
      <MapView
        ref={ref => (this.mapRef = ref)}
        maxZoomLevel={18}
        style={{ flex: 1, width: '100%' }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        onLayout={() =>
          setTimeout(() => {
            if (this.props.merchant.dataGetMerchantV2.length > 0) {
              this.mapRef.fitToCoordinates(
                this.props.merchant.dataGetMerchantV2,
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
          <Marker
            image={require('../../assets/icons/maps/my_location.png')}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={'Anda'}
          />
        ) : (
          <View />
        )}

        {this.props.merchant.dataGetMerchantV2.map((marker, index) => (
          <Marker
            key={index}
            image={require('../../assets/icons/maps/drop_pin.png')}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.name}
            description={marker.address}
          />
        ))}
      </MapView>
    );
  }
  /** === RENDER SKELETON TAGS === */
  renderSkeletonTags() {
    return <View />;
  }
  /** === RENDER PAGE === */
  renderLoading() {
    return <LoadingPage />;
  }
  /** === RENDER TAGS === */
  renderTags() {
    return !this.props.merchant.loadingGetPortfolio &&
      this.props.merchant.dataGetPortfolioV2 !== null
      ? this.renderTagsContent()
      : this.renderSkeletonTags();
  }
  /** === RENDER MERCHANT EMPTY === */
  renderMerchantEmpty() {
    return (
      <EmptyData
        title={'List Toko Kosong'}
        description={'Maaf , Anda tidak mempunyai list toko'}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
          {this.renderSearchBar()}
          {this.renderTags()}
        </View>
        {this.props.merchant.loadingGetMerchant
          ? this.renderLoading()
          : this.renderMaps()}
        {/* {this.renderModal()} */}
        {this.renderBottomList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxTabs: {
    height: 44
  },
  boxTabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxBottomList: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantMapView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 24082021
 * updatedFunction:
 * -> maximise the character of search (30 characters)
 */
