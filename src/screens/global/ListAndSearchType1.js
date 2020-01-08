/**
 * =====================================
 * THIS COMPONENT FOR LIST OF LOCATION
 * =====================================
 * PROPS PARAMS
 * - type
 */
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Text from 'react-native-text';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';
import GlobalStyles from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';
import { LoadingPage, LoadingLoadMore } from '../../components/Loading';

class ListAndSearchType1 extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.locationGetReset();
    this.getLocation(0, true);
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (prevProps.global.search !== this.props.global.search) {
      this.props.locationGetReset();
      this.getLocation(0, true);
    }
  }
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.locationGetRefresh();
    this.getLocation(0, true);
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.global.dataGetLocation) {
      if (
        this.props.global.dataGetLocation.length <
        this.props.global.totalDataGetLocation
      ) {
        const page = this.props.global.pageGetLocation + 20;
        this.props.locationGetLoadMore(page);
        this.getLocation(page, false);
      }
    }
  };
  /** === GET LOCATION === */
  getLocation(page, loading) {
    this.props.locationGetProcess({
      loading,
      page,
      type: this.props.navigation.state.params.type,
      provinceId: this.props.global.dataLocationVolatile.provinceId,
      cityName: this.props.global.dataLocationVolatile.cityName,
      districName: this.props.global.dataLocationVolatile.districName,
      search: this.props.global.search,
      userId: this.props.user.id
    });
  }
  /** === SAVE DATA === */
  saveData(item) {
    switch (this.props.navigation.state.params.type) {
      /** === FOR LOCATION === */
      case 'province':
        this.props.saveLocationDataVolatile({
          provinceName: item.name,
          provinceId: parseInt(item.id, 10),
          cityName: '',
          districName: '',
          urbanName: '',
          zipCode: '',
          address: ''
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'city':
        this.props.saveLocationDataVolatile({
          cityName: item.city,
          districName: '',
          urbanName: '',
          zipCode: '',
          address: ''
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'distric':
        this.props.saveLocationDataVolatile({
          districName: item.district,
          urbanName: '',
          zipCode: '',
          address: ''
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'urban':
        this.props.saveLocationDataVolatile({
          urbanName: item.urban,
          urbanId: parseInt(item.id, 10),
          zipCode: item.zipCode,
          address: ''
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      /** === FOR MERCHANT === */
      case 'typeMerchant':
        this.props.saveVolatileDataAddMerchant({
          storeTypeId: parseInt(item.id, 10),
          storeTypeName: item.name
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'groupMerchant':
        this.props.saveVolatileDataAddMerchant({
          storeGroupId: parseInt(item.id, 10),
          storeGroupName: item.name
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'clusterMerchant':
        this.props.saveVolatileDataAddMerchant({
          cluster: {
            clusterId: parseInt(item.id, 10),
            clusterName: item.name
          }
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'segmentMerchant':
        this.props.saveVolatileDataAddMerchant({
          storeSegmentId: parseInt(item.id, 10),
          storeSegmentName: item.name
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'suplierMerchant':
        this.props.saveVolatileDataAddMerchant({
          supplier: {
            supplierId: parseInt(item.id, 10),
            supplierName: item.name
          }
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      default:
        break;
    }
  }
  /** === MODIFY ITEM === */
  modifyItem(item) {
    switch (this.props.navigation.state.params.type) {
      /** === THIS FOR LOCATION === */
      case 'province':
        return item.name;
      case 'city':
        return item.city;
      case 'distric':
        return item.district;
      case 'urban':
        return item.urban;
      /** === THIS FOR MERCHANT === */
      case 'typeMerchant':
      case 'groupMerchant':
      case 'clusterMerchant':
      case 'suplierMerchant':
      case 'segmentMerchant':
      case 'hierarchyMerchant':
        return item.name;
      default:
        break;
    }
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
    const { params } = navigation.state;
    return {
      headerTitle: () => (
        <View style={{ width: '100%', paddingRight: 16 }}>
          <SearchBarType3 placeholder={params ? params.placeholder : ''} />
        </View>
      )
    };
  };
  /** === RENDER CONTENT ITEM === */
  renderItem({ item, index }) {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.boxContent}
          onPress={() => this.saveData(item)}
        >
          <Text style={Fonts.type8}>{this.modifyItem(item)}</Text>
        </TouchableOpacity>
        <View style={GlobalStyles.lines} />
      </View>
    );
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.global.dataGetLocation}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.global.refreshGetLocation}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
        />
      </View>
    );
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.global.loadingLoadMoreGetLocation ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <LoadingPage />;
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.props.global.loadingGetLocation
          ? this.renderSkeleton()
          : this.renderContent()}
        {this.renderLoadMore()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 26
  },
  boxContent: {
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});

const mapStateToProps = ({ global, user }) => {
  return { global, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListAndSearchType1);
