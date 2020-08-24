import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import {
  SkeletonType7,
  LoadingLoadMore,
  EmptyData
} from '../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';

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
            <Text style={Fonts.type24}>{this.checkPrice(item)}</Text>
          </View>
          <View>{this.renderButton(item)}</View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpLineDataView);

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
