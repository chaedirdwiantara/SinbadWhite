import {
  React,
  Component,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import {
  SkeletonType4,
  LoadingLoadMore,
  EmptyData
} from '../../library/component'
import { Color } from '../../config'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import * as ActionCreators from '../../state/actions';

class PdpGridDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * CORE SCROLL DOWN
   * =======================
   */
  scrollEndReach = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return (
      Math.round(layoutMeasurement.height + contentOffset.y) ===
      Math.round(contentSize.height)
    );
  };
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
        style={[styles.pesanButton, { backgroundColor: Color.mainColor }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    );
  }
  /** === RENDER ITEM === */
  renderItem(item, index) {
    const productImage = (
      <Image
        defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
        source={{
          uri: item.catalogueImages[0].imageUrl
        }}
        style={GlobalStyle.fullWidthRatioContainRadius5Image}
      />
    );
    return (
      <View style={styles.mainContent} key={index}>
        <View style={styles.boxMainContent}>
          <View style={[GlobalStyle.shadow5, styles.cardMainContent]}>
            <View>{productImage}</View>
            <View style={{ paddingHorizontal: 11, paddingVertical: 10 }}>
              <View>
                <Text style={[Fonts.type37, { textTransform: 'capitalize' }]}>
                  {item.name}
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={Fonts.type36}>{this.checkPrice(item)}</Text>
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
    backgroundColor: Color.backgroundWhite
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
    backgroundColor: Color.backgroundWhite
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

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
