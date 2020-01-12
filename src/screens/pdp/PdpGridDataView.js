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

class PdpGridDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /** === FUNCTIONAL === */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  onHandleRefresh = () => {
    this.props.pdpGetRefresh();
    this.props.pdpGetProcess({
      page: 0,
      loading: true,
      searchText: this.props.global.search,
      supplierId: this.props.user.userSuppliers[0].supplierId
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
          searchText: this.props.global.search,
          supplierId: this.props.user.userSuppliers[0].supplierId
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
    return <SkeletonType4 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.pdp.loadingLoadMoreGetPdp ? (
      <View>
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
        onPress={() => this.toParentFunction({ type: 'order', data: item })}
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
    const productImage = (
      <Image
        defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
        source={{
          uri: item.catalogueImages[0].imageUrl
        }}
        style={styles.productImage}
      />
    );

    return (
      <View style={styles.mainContent} key={index}>
        <View style={styles.boxMainContent}>
          <View style={[GlobalStyles.shadow5, styles.cardMainContent]}>
            <View>{productImage}</View>
            <View style={{ paddingHorizontal: 11, paddingVertical: 10 }}>
              <View>
                <Text style={Fonts.type37}>{item.name}</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={Fonts.type36}>
                  {MoneyFormat(
                    item.discountedRetailBuyingPrice !== null
                      ? item.discountedRetailBuyingPrice
                      : item.retailBuyingPrice
                  )}
                </Text>
              </View>
              {item.displayStock && item.stock >= item.minQty ? (
                <View style={{ marginTop: 5 }}>
                  <Text style={Fonts.type38}>{`${item.stock} Tersisa`} </Text>
                </View>
              ) : (
                <View />
              )}
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                {this.renderButton(item)}
              </View>
            </View>
          </View>
        </View>
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
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={this.props.pdp.dataGetPdp}
        renderItem={this.renderItem.bind(this)}
        numColumns={2}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.props.pdp.refreshGetPdp}
        onRefresh={this.onHandleRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={this.onHandleLoadMore.bind(this)}
        showsVerticalScrollIndicator
      />
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
  flatListContainer: {
    paddingTop: 16,
    paddingHorizontal: 11,
    paddingBottom: 30
  },
  mainContent: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMainContent: {
    paddingBottom: 10,
    paddingHorizontal: 5,
    width: '100%'
  },
  cardMainContent: {
    borderRadius: 5,
    backgroundColor: masterColor.backgroundWhite
  },
  boxFlatlist: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 5
  },
  productImage: {
    // resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  /** button */
  pesanButton: {
    height: 27,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
});

const mapStateToProps = ({ user, pdp, global }) => {
  return { user, pdp, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpGridDataView);
