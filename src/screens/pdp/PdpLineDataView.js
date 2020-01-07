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
import SkeletonType4 from '../../components/skeleton/SkeletonType4';
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
  onHandleRefresh = () => {
    this.props.pdpGetRefresh();
    this.props.pdpGetProcess({ page: 0, loading: true });
  };

  onHandleLoadMore = () => {
    if (this.props.pdp.dataGetPdp) {
      if (this.props.pdp.dataGetPdp.length < this.props.pdp.totalDataGetPdp) {
        const page = this.props.pdp.pageGetPdp + 10;
        this.props.pdpGetLoadMore(page);
        this.props.pdpGetProcess({ page, loading: false });
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
    return <SkeletonType4 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.pdp.loadingLoadMoreGetPdp ? (
      <View style={{ marginBottom: '12%' }}>
        <LoadingLoadMore />
      </View>
    ) : (
      <View />
    );
  }

  /** === RENDER ITEM === */
  renderButton(item) {
    return (item.stock > 0 && item.stock >= item.minQty) ||
      item.unlimitedStock ? (
      <TouchableOpacity
        style={[styles.pesanButton, { backgroundColor: '#f0444c' }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    ) : (
      <View style={[styles.pesanButton, { backgroundColor: '#bdbdbd' }]}>
        <Text style={Fonts.type39}>Stok habis</Text>
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <View style={styles.boxContentList} key={index}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={Fonts.type42}>SKU : {item.externalId}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={Fonts.type41}>
            {MoneyFormat(item.retailBuyingPrice)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>{this.renderButton(item)}</View>
      </View>
    );
  }

  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyles.lines, { marginLeft: 50 }]} />;
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
      <View style={{ flex: 1, paddingBottom: '7%' }}>
        <FlatList
          contentContainerStyle={styles.boxFlatlist}
          data={this.props.pdp.dataGetPdp}
          renderItem={this.renderItem.bind(this)}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.pdp.refreshGetPdp}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
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
    height: '100%',
    backgroundColor: masterColor.backgroundWhite
  },
  boxContentList: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  /** button */
  pesanButton: {
    height: 25,
    width: 118,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 5
  }
});

const mapStateToProps = ({ user, pdp }) => {
  return { user, pdp };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpLineDataView);