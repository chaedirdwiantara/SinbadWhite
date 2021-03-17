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
  connect
} from '../../library/thirdPartyPackage'
import {
  SkeletonType1,
  LoadingLoadMore,
  Address,
  EmptyData
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

class MerchantListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.merchantGetRefreshV2();
    this.props.merchantGetProcessV2({
      loading: true,
      page: 1,
      portfolioId: this.props.merchant.dataGetPortfolioV2[
        this.props.portfolioIndex
      ].id,
      search: this.props.search
    });
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.merchant.dataGetMerchantV2) {
      if (
        this.props.merchant.dataGetMerchantV2.length <
        this.props.merchant.totalDataGetMerchantV2
      ) {
        const page = this.props.merchant.pageGetMerchantV2 + 1;
        this.props.merchantGetLoadMoreV2(page);
        this.props.merchantGetProcessV2({
          loading: true,
          page,
          portfolioId: this.props.merchant.dataGetPortfolioV2[0].id,
          search: this.props.search
        });
      }
    }
  };
  /** GO TO MERCHANT DETAIL */
  goToDetailMerchant(id) {
    NavigationService.navigate('MerchantDetailView', {
      id
    });
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
      <View key={index} style={styles.boxItem}>
        <TouchableOpacity onPress={() => this.goToDetailMerchant(item.id)}>
          {item.imageUrl !== null ? (
            <Image source={{ uri: item.imageUrl }} style={styles.boxImage} />
          ) : (
            <Image
              source={require('../../assets/images/merchant/store.png')}
              style={styles.boxImage}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.goToDetailMerchant(item.id)}
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
        </TouchableOpacity>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={styles.boxButtonDetail}
            onPress={() => this.goToDetailMerchant(item.id)}
          >
            <Text style={Fonts.type18}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
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
  },
  boxButtonDetail: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 4,
    backgroundColor: Color.mainColor
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
)(MerchantListDataView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 * -> update the props of portfolio.
 * updatedBy: dyah
 * updatedDate: 25022021
 * updatedFunction:
 * -> update the props of merchant list.
 *
 */
