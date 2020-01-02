import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';
import TagList from '../../components/TagList';
import SearchBarType2 from '../../components/search_bar/SearchBarType2';
import TestModal from '../../components/modal_bottom/test';
import EmptyData from '../../components/empty_state/EmptyData';
import { LoadingPage } from '../../components/Loading';
import ModalBottomMerchantMapList from './ModalBottomMerchantMapList';
import Address from '../../components/Address';

const { height } = Dimensions.get('window');

class MerchantMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.25511,
      longitude: 106.808,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      success => {
        this.setState({
          longitude: success.coords.longitude,
          latitude: success.coords.latitude
        });
      },
      () => {
        this.setState({ openErrorGeolocation: true });
      }
    );
  }

  parentFunction(data) {
    if (data.type === 'portfolio') {
      this.props.parentFunction(data);
    } else if (data.type === 'search') {
      this.props.parentFunction(data);
    }
  }

  /** === COMBINE ADDRESS === */
  combineAddress(item) {
    let address = '';
    let urban = '';
    let province = '';
    if (item.address) {
      address = item.address ? item.address : '';
    }
    if (item.urban) {
      urban =
        (item.urban.urban ? `, ${item.urban.urban}` : '') +
        (item.urban.district ? `, ${item.urban.district}` : '') +
        (item.urban.city ? `, ${item.urban.city}` : '');
    }
    if (item.urban) {
      province = item.urban.province ? `, ${item.urban.province.name}` : '';
    }
    return address;
  }
  /**
   * ======================
   * MODAL
   * =======================
   */
  /** RENDER MODAL BOTTOM */
  renderBottomList() {
    return !this.props.merchant.loadingGetMerchant ? (
      <ModalBottomMerchantMapList
        search={this.props.searchText}
        portfolioIndex={this.props.portfolio}
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
    return this.props.merchant.dataGetPortfolio !== null
      ? this.renderCheckSearchBar()
      : this.renderSearchBarContent();
  }
  /** RENDER CHECK SEARCH BAR === */
  renderCheckSearchBar() {
    return this.props.merchant.dataGetPortfolio.length > 0 ? (
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
          searchText={this.props.searchText}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === TAGS SECTION === */
  renderTagsContent() {
    return this.props.merchant.dataGetPortfolio.length > 0 ? (
      <TagList
        shadow
        selected={this.props.portfolio}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        data={this.props.merchant.dataGetPortfolio}
      />
    ) : (
      <View />
    );
  }
  /** === MAPS === */
  checkRenderMaps() {
    return this.props.merchant.dataGetPortfolio.length > 0
      ? this.renderMapsContent()
      : this.renderMerchantEmpty();
  }
  renderMaps() {
    return this.props.merchant.dataGetPortfolio !== null
      ? this.checkRenderMaps()
      : this.renderMapsContent();
  }
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
            if (this.props.merchant.dataGetMerchant.length > 0) {
              this.mapRef.fitToCoordinates(
                this.props.merchant.dataGetMerchant,
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
        <Marker
          image={require('../../assets/icons/maps/my_location.png')}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          title={'Anda'}
        />
        {this.props.merchant.dataGetMerchant.map((marker, index) => (
          <Marker
            key={index}
            image={require('../../assets/icons/maps/drop_pin.png')}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.name}
            description={this.combineAddress(marker)}
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
      this.props.merchant.dataGetPortfolio !== null
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
        <View style={{ position: 'absolute', zIndex: 1000 }}>
          {this.renderSearchBar()}
          {this.renderTags()}
        </View>
        {!this.props.merchant.loadingGetMerchant
          ? this.renderMaps()
          : this.renderLoading()}
        {/* {this.renderModal()} */}
        {this.renderBottomList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
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
    backgroundColor: masterColor.backgroundWhite
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
