import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor';
import { MoneyFormat } from '../../helpers/NumberFormater';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType4 from '../../components/skeleton/SkeletonType4';
import { LoadingLoadMore } from '../../components/Loading';
import Fonts from '../../helpers/GlobalFont';
import EmptyData from '../../components/empty_state/EmptyData';

const { width, height } = Dimensions.get('window');

class PdpGridDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollEndReach = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      Math.round(layoutMeasurement.height + contentOffset.y) ===
      Math.round(contentSize.height)
    );
  };
  /** === FUNCTIONAL === */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  onHandleRefresh = () => {
    this.props.pdpGetRefresh();
    this.props.pdpGetProcess({
      page: 0,
      loading: true,
      search: this.props.global.search,
      sort: this.props.sort,
      sortBy: this.props.sortBy,
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
  /** DISCOUNT VALUE (CALCULATE DISCOUNT) */
  calculateDiscount(item) {
    return (
      ((item.retailBuyingPrice - item.discountedRetailBuyingPrice) /
        item.retailBuyingPrice) *
      100
    ).toFixed(1);
  }

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

  renderItem(item, index) {
    const productImage = (
      <Image
        defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
        source={{
          uri: item.catalogueImages[0].imageUrl
        }}
        style={GlobalStyles.fullWidthRatioContainRadius5Image}
      />
    );

    return (
      <View style={styles.mainContent} key={index}>
        <View style={styles.boxMainContent}>
          <View style={[GlobalStyles.shadow5, styles.cardMainContent]}>
            <View>{productImage}</View>
            <View style={{ paddingHorizontal: 11, paddingVertical: 10 }}>
              <View>
                <Text style={[Fonts.type37, { textTransform: 'capitalize' }]}>
                  {item.name}
                </Text>
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
      <View
        style={{
          flexDirection: 'row',
          height: '100%'
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.pdp.refreshGetPdp}
              onRefresh={this.onHandleRefresh}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.scrollEndReach(nativeEvent)) {
              this.onHandleLoadMore();
            }
          }}
          scrollEventThrottle={10}
        >
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 30,
              paddingTop: 16,
              paddingHorizontal: 11
            }}
          >
            <View style={{ flex: 1 }}>
              {this.props.pdp.dataGetPdp.map((item, index) => {
                return index % 2 === 0 ? this.renderItem(item, index) : null;
              })}
            </View>
            <View style={{ flex: 1 }}>
              {this.props.pdp.dataGetPdp.map((item, index) => {
                return index % 2 !== 0 ? this.renderItem(item, index) : null;
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      // <FlatList
      //   contentContainerStyle={styles.flatListContainer}
      //   data={this.props.pdp.dataGetPdp}
      //   renderItem={this.renderItem.bind(this)}
      //   numColumns={2}
      //   extraData={this.state}
      //   keyExtractor={(item, index) => index.toString()}
      //   refreshing={this.props.pdp.refreshGetPdp}
      //   onRefresh={this.onHandleRefresh}
      //   onEndReachedThreshold={0.2}
      //   onEndReached={this.onHandleLoadMore.bind(this)}
      //   showsVerticalScrollIndicator
      // />
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
    // width: '50%',
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

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpGridDataView);
