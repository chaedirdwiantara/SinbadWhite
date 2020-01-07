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
      <View style={styles.boxContentList} key={index}>
        <Card containerStyle={styles.cardProduct}>
          <View style={styles.boxContentListCard}>
            <TouchableOpacity
              style={styles.boxContentListCardTouch}
              onPress={() => this.toProductDetail(item)}
            >
              <View style={styles.boxImage}>{productImage}</View>
              <View style={styles.boxName}>
                <Text style={Fonts.type37}>{item.name}</Text>
              </View>
              <View style={styles.boxPrice}>
                <Text style={Fonts.type36}>{item.price}</Text>
                {item.displayStock && item.stock >= item.minQty ? (
                  <Text style={Fonts.type38}>{`${item.stock} Tersisa`} </Text>
                ) : (
                  <Text style={Fonts.type38}>{''}</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.boxContentListCardNoTouch}>
              <View style={styles.boxButton}>{this.renderButton(item)}</View>
              {/* {item.addToCart ? (
                <View style={styles.boxOrdered}>
                  <Text style={styles.productQtyOrderText}>
                    {item.qtyToCart} pcs
                  </Text>
                </View>
              ) : (
                <View />
              )} */}
            </View>
          </View>
        </Card>
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
      <View style={{ flex: 1, paddingBottom: '7%' }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.pdp.dataGetPdp}
          renderItem={this.renderItem.bind(this)}
          numColumns={2}
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
  flatListContainer: {
    paddingTop: 30,
    paddingBottom: 26
  },
  boxContentList: {
    height: 0.35 * height,
    width: '50%',
    paddingHorizontal: '1.5%',
    paddingVertical: '1.5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxFlatlist: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 5
  },
  cardProduct: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    padding: 0,
    borderWidth: 0,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    margin: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center'
  },
  boxContentListCard: {
    height: '100%',
    padding: 10,
    width: 0.45 * width
  },
  boxContentListCardTouch: {
    height: '70%'
  },
  boxContentListCardNoTouch: {
    height: '30%',
    marginTop: 15
  },
  boxImage: {
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxName: {
    height: '27%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2
  },
  boxPrice: {
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  boxStock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxOrdered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    resizeMode: 'contain',
    height: '100%',
    width: undefined,
    aspectRatio: 1 / 1
  },
  imageEmpty: {
    height: 150,
    width: 150
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

export default connect(mapStateToProps, mapDispatchToProps)(PdpGridDataView);
