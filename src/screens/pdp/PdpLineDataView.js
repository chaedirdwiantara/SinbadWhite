import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import { MoneyFormat } from '../../helpers/NumberFormater';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType7 from '../../components/skeleton/SkeletonType7';
import { LoadingLoadMore } from '../../components/Loading';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import EmptyData from '../../components/empty_state/EmptyData';
const { width, height } = Dimensions.get('window');

class PdpLineDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  onHandleRefresh = () => {
    this.props.pdpGetRefresh();
    this.props.pdpGetProcess({
      page: 0,
      loading: true,
      sort: this.props.sort,
      sortBy: this.props.sortBy,
      search: this.props.global.search,
      supplierId: this.props.user.userSuppliers.map(item => item.supplierId)
    });
  };

  onHandleLoadMore = () => {
    if (this.props.pdp.dataGetPdp) {
      if (this.props.pdp.dataGetPdp.length < this.props.pdp.totalDataGetPdp) {
        const page = this.props.pdp.pageGetPdp + 10;
        this.props.pdpGetLoadMore(page);
        this.props.pdpGetProcess({
          page,
          loading: false,
          sort: this.props.sort,
          sortBy: this.props.sortBy,
          search: this.props.global.search,
          supplierId: this.props.user.userSuppliers.map(item => item.supplierId)
        });
      }
    }
  };

  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /**
   * =====================
   * LOADING
   * =====================
   */
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <SkeletonType7 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.pdp.loadingLoadMoreGetPdp ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }

  /** === RENDER ITEM === */
  renderButton(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.toParentFunction({ type: 'openModalOrder', data: item.id })
        }
        style={[styles.pesanButton, { backgroundColor: masterColor.mainColor }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    );
  }

  renderItem({ item, index }) {
    return (
      <View key={index}>
        <View style={styles.boxContentList}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <Text style={Fonts.type16}>SKU : {item.externalId}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
            <Text style={Fonts.type24}>
              {MoneyFormat(
                item.discountedRetailBuyingPrice !== null
                  ? item.discountedRetailBuyingPrice
                  : item.retailBuyingPrice
              )}
            </Text>
          </View>
          <View>{this.renderButton(item)}</View>
        </View>
        <View style={[GlobalStyles.lines, { marginLeft: 10 }]} />
      </View>
    );
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.pdp.dataGetPdp.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.pdp.dataGetPdp}
          renderItem={this.renderItem.bind(this)}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.pdp.refreshGetPdp}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
        />
      </View>
    );
  }
  /** === RENDER EMPTY === */
  renderEmpty() {
    return (
      <EmptyData title={'Product Kosong'} description={'Maaf Product kosong'} />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.pdp.loadingGetPdp
          ? this.renderSkeleton()
          : this.renderData()}
        {/* for loadmore */}
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
  boxContentList: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  flatListContainer: {
    paddingBottom: 30
  },
  /** button */
  pesanButton: {
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginVertical: 10
  }
});

const mapStateToProps = ({ user, pdp, global }) => {
  return { user, pdp, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpLineDataView);
