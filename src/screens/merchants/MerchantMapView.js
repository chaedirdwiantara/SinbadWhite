import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
import EmptyMerchant from '../../components/empty_state/EmptyMerchant';

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
  /**
   * ======================
   * MODAL
   * =======================
   */
  /** RENDER MODAL BOTTOM */
  renderModal() {
    return <TestModal open />;
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
        style={{ flex: 1, width: '100%' }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
      >
        {this.props.merchant.dataGetMerchant.map((marker, index) => (
          <Marker
            key={index}
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
  /** === RENDER TAGS === */
  renderTags() {
    return !this.props.merchant.loadingGetPortfolio &&
      this.props.merchant.dataGetPortfolio !== null
      ? this.renderTagsContent()
      : this.renderSkeletonTags();
  }
  /** === RENDER MERCHANT EMPTY === */
  renderMerchantEmpty() {
    return <EmptyMerchant />;
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ position: 'absolute', zIndex: 1000 }}>
          {this.renderSearchBar()}
          {this.renderTags()}
        </View>
        {this.renderMaps()}
        {this.renderModal()}
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
