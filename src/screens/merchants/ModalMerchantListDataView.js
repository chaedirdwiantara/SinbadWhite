import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  MaterialIcon,
  moment,
  connect
} from '../../library/thirdPartyPackage'
import {
  SkeletonType1,
  LoadingLoadMore,
  Address,
  EmptyData
} from '../../library/component'
import { Color } from '../../config'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
const date = moment().format('YYYY-MM-DD');

class ModalMerchantListDataView extends Component {
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
    this.props.merchantExistingGetReset();
    this.props.merchantExistingGetProcess({
      date,
      loading: true,
      page: 1,
      portfolioId: this.props.merchant.dataGetPortfolioV2[
        this.props.portfolioIndex
      ].id,
      search: this.props.search
    });
  };

  onHandleLoadMore = () => {
    if (this.props.merchant.dataGetMerchantV2) {
      if (
        this.props.merchant.dataGetMerchantV2.length <
        this.props.merchant.totalDataGetMerchantV2
      ) {
        const page = this.props.merchant.pageGetMerchantV2 + 10;
        this.props.merchantExistingGetLoadMore(page);
        this.props.merchantExistingGetProcess({
          date,
          loading: true,
          page,
          portfolioId: this.props.merchant.dataGetPortfolioV2[0].id,
          search: this.props.search
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
    return this.props.merchant.loadingLoadMoreGetMerchant ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }

  /** === RENDER ITEM === */
  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.boxItem}
        onPress={() =>
          this.props.parentFunction({ type: 'merchant', data: item.storeId })
        }
      >
        <View>
          {item.imageUrl !== null ? (
            <Image source={{ uri: item.imageUrl }} style={styles.boxImage} />
          ) : (
            <Image
              source={require('../../assets/images/merchant/store.png')}
              style={styles.boxImage}
            />
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View>
            <Text style={Fonts.type16}>
              {item.externalId
                ? item.externalId
                : item.storeCode
                ? item.storeCode
                : '-'}
            </Text>
            <Text style={Fonts.type16}>{item.name}</Text>
          </View>
          <View>
            <Address
              substring
              font={Fonts.type17}
              address={item.address}
              urban={item.urban}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <MaterialIcon
            name="check-circle"
            color={
              this.props.selectedMerchant.indexOf(item.storeId) > -1
                ? Color.fontGreen50
                : Color.fontBlack40
            }
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 9 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.merchant.dataGetMerchantV2.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style={Fonts.type8}>
            {this.props.merchant.totalDataGetMerchantV2} List Store
          </Text>
        </View>
        <View style={GlobalStyle.lines} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.merchant.dataGetMerchantV2}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.merchant.refreshGetMerchant}
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
      <EmptyData
        title={'List Toko Kosong'}
        description={'Maaf , Anda tidak mempunyai list toko'}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.merchant.loadingGetMerchant
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
  flatListContainer: {
    paddingBottom: 26
  },
  boxItem: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxImage: {
    height: 65,
    width: 65,
    borderRadius: 10
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalMerchantListDataView);

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
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 * -> update the props of portfolio.
 * updatedBy: dyah
 * updatedDate: 08032021
 * updatedFunction:
 * -> update the props of merchant list.
 */
