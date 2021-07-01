import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  SkeletonType1,
  LoadingLoadMore,
  EmptyData
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import Price from '../../functions/Price';
import masterColor from '../../config/masterColor.json';

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
    return MoneyFormat(Price(item));
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
          this.toParentFunction({
            type: item.isBundle ? 'goToBundlePage' : 'openModalOrder',
            data: item.id
          })
        }
        style={[styles.pesanButton, { backgroundColor: Color.mainColor }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    );
  }
  /** === RENDER MSS TAG === */
  renderMSS(item) {
    return item.isMss ? (
      <View
        style={{
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: masterColor.fontBlue10,
            padding: 4,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <MaterialIcon name="stars" color={masterColor.fontBlue50} size={18} />
          <Text style={[Fonts.type108, { paddingHorizontal: 4 }]}>
            Must-Selling
          </Text>
        </View>
      </View>
    ) : (
      <View />
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
        style={GlobalStyle.image65Contain}
      />
    );
    return (
      <View style={styles.boxContentList} key={index}>
        <View style={styles.boxContentListItem}>
          <View style={styles.boxContentImage}>
            <View>{productImage}</View>
          </View>
          <View style={styles.boxContentDesc}>
            {this.renderMSS(item)}
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
        <View style={[GlobalStyle.lines, { marginLeft: 10 }]} />
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
    backgroundColor: Color.backgroundWhite
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
