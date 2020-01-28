import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor';
import { MoneyFormat } from '../../helpers/NumberFormater';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType1 from '../../components/skeleton/SkeletonType1';
import { LoadingLoadMore } from '../../components/Loading';
import Fonts from '../../helpers/GlobalFont';
import EmptyData from '../../components/empty_state/EmptyData';

class PdpListDataView extends Component {
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
    return <SkeletonType1 />;
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
    return (item.stock > 0 && item.stock >= item.minQty) ||
      item.unlimitedStock ? (
      <TouchableOpacity
        onPress={() => this.toParentFunction({ type: 'order', data: item })}
        style={[styles.pesanButton, { backgroundColor: masterColor.mainColor }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    ) : (
      <View
        style={[
          styles.pesanButton,
          { backgroundColor: masterColor.fontBlack40 }
        ]}
      >
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
        style={GlobalStyles.image65}
      />
    );

    return (
      <View style={styles.boxContentList} key={index}>
        <View style={styles.boxContentListItem}>
          <View style={styles.boxContentImage}>
            <View>{productImage}</View>
          </View>
          <View style={styles.boxContentDesc}>
            <View style={styles.boxTitleAndSku}>
              <View style={styles.boxName}>
                <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.boxSku}>
                <Text style={[Fonts.type8, { textAlign: 'right' }]}>
                  SKU: {item.externalId}
                </Text>
              </View>
            </View>
            <View style={styles.boxOrderedAndButton}>
              <View style={styles.boxPrice}>
                <Text style={Fonts.type24}>
                  {MoneyFormat(
                    item.discountedRetailBuyingPrice !== null
                      ? item.discountedRetailBuyingPrice
                      : item.retailBuyingPrice
                  )}
                </Text>
              </View>
              <View style={styles.boxButton}>{this.renderButton(item)}</View>
            </View>
          </View>
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
          showsVerticalScrollIndicator
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
    width: '100%'
  },
  boxFlatlist: {
    paddingBottom: 30
  },
  boxContentListItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 13
  },
  boxContentImage: {
    justifyContent: 'center',
    marginRight: 10,
    height: 65,
    alignItems: 'center',
    width: 65
  },
  boxContentDesc: {
    flex: 1
  },
  boxTitleAndSku: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxName: {
    flex: 1,
    alignItems: 'flex-start'
  },
  boxSku: {
    width: '40%'
  },
  boxPrice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  boxOrderedAndButton: {
    paddingTop: 5,
    flexDirection: 'row'
  },
  boxStock: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  boxButton: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  boxOrdered: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  /** button */
  pesanButton: {
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 20
  }
});

const mapStateToProps = ({ user, pdp, global }) => {
  return { user, pdp, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpListDataView);
