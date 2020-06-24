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
  /** === SEND DATA TO PARENT === */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }
  /** === REFRESH PAGE === */
  onHandleRefresh = () => {
    this.toParentFunction({ type: 'refresh' });
  };
  /** === LOAD MORE DATA === */
  onHandleLoadMore = () => {
    this.toParentFunction({
      type: 'loadMore'
    });
  };
  /** === CHECK PRICE ==== */
  checkPrice(item) {
    if (item.maxPriceRange === null && item.minPriceRange === null) {
      return MoneyFormat(item.retailBuyingPrice);
    } else if (item.maxPriceRange !== null && item.minPriceRange !== null) {
      if (item.maxPriceRange === item.minPriceRange) {
        return MoneyFormat(item.maxPriceRange);
      }
      return `${MoneyFormat(item.minPriceRange)} - ${MoneyFormat(
        item.maxPriceRange
      )}`;
    } else if (item.maxPriceRange !== null && item.minPriceRange === null) {
      return MoneyFormat(item.maxPriceRange);
    } else if (item.maxPriceRange === null && item.minPriceRange !== null) {
      return MoneyFormat(item.minPriceRange);
    }
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER BUTTON PESAN === */
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
  /** === RENDER ITEM === */
  renderItem({ item, index }) {
    const productImage = (
      <Image
        defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
        source={{
          uri: item.catalogueImages[0].imageUrl
        }}
        style={GlobalStyles.image65Contain}
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
                <Text style={Fonts.type24}>{this.checkPrice(item)}</Text>
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
    return this.props.pdp.dataGetSearchPdp.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.boxFlatlist}
          data={this.props.pdp.dataGetSearchPdp}
          renderItem={this.renderItem.bind(this)}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.pdp.refreshGetSearchPdp}
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
    return this.props.pdp.loadingLoadMoreGetSearchPdp ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.pdp.loadingGetSearchPdp
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
    height: 65,
    alignItems: 'center',
    width: 65
  },
  boxContentDesc: {
    paddingLeft: 10,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpListDataView);