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
  connect,
  MaterialIcon,
  moment,
  OcticonsIcon
} from '../../library/thirdPartyPackage'
import {
  SkeletonType3,
  LoadingLoadMore,
  Address,
  EmptyData
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';

const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';

class JourneyListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  onHandleRefresh = () => {
    this.props.journeyPlanGetRefreshV2();
    this.props.journeyPlanGetProcessV2({
      page: 1,
      date: today,
      search: this.state.search,
      loading: true
    });
  };

  onHandleLoadMore = () => {
    if (this.props.journey.dataGetJourneyPlanV2) {
      if (
        this.props.journey.dataGetJourneyPlanV2.length <
        this.props.journey.totalDataGetJourneyPlanV2
      ) {
        const page = this.props.journey.pageGetJourneyPlanV2 + 1;
        this.props.journeyPlanGetLoadMoreV2(page);
        this.props.journeyPlanGetProcessV2({
          page,
          date: today,
          search: this.state.search,
          loading: true
        });
      }
    }
  };
  /** go to detail merchant */
  goToDetailMerchant(id) {
    NavigationService.navigate('MerchantDetailView', {
      id
    });
  }
  /** go to merchant dashboard */
  goToMerchantDashboard(storeName, data) {
    /** FOR RESET OMS DATA (CART ETC)
     * if agent change store
     */
    if (this.props.merchant.selectedMerchant !== null) {
      if (this.props.merchant.selectedMerchant.storeId !== data.storeId) {
        this.props.merchantChanged(true);
      }
    }
    /** GO TO SELECTED STORE */
    data.name = data.storeName;
    data.storeId = data.storeId.toString();
    this.props.merchantSelected(data);
    setTimeout(() => {
      NavigationService.navigate('MerchantHomeView', {
        storeName
      });
    }, 100);
  }
  /** go to chat */
  goToChat() {
    NavigationService.navigate('ChatView');
  }
  /** CHECK CHECK LIST ACTIVITY */
  checkCheckListActivity(logs) {
    let total = 0;
    if (logs.orderStatus) {
      total = total + 1;
    }
    if (!logs.orderStatus && logs.noOrderReasonId > 0) {
      total = total + 1;
    }
    if ((logs.longitudeCheckOut && logs.latitudeCheckOut) !== 0) {
      total = total + 1;
    }
    return total;
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
    return <SkeletonType3 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.journey.loadingLoadMoreGetJourneyPlan ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }

  /** === RENDER ITEM === */
  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.boxItem}>
        <View style={{ justifyContent: 'center' }}>
          {item.journeyBookStores.visitStatus ? (
            <MaterialIcon
              name="check-circle"
              color={
                this.checkCheckListActivity(item.journeyBookStores) > 1
                  ? masterColor.fontGreen50
                  : masterColor.fontYellow50
              }
              size={24}
            />
          ) : (
            <MaterialIcon
              name="radio-button-unchecked"
              color={masterColor.fontBlack40}
              size={24}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.goToMerchantDashboard(item.storeName, item)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View>
            <Text
              style={
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type16
                  : Fonts.type29
              }
            >
              {item.externalId ? item.externalId : '-'}
            </Text>
            <Text
              style={
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type16
                  : Fonts.type29
              }
            >
              {item.storeName}
            </Text>
          </View>
          <View>
            <Address
              substring
              font={
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type17
                  : Fonts.type22
              }
              address={item.address}
              urban={item.urbans}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            paddingVertical: 13
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 17
            }}
          >
            <MaterialIcon
              name="motorcycle"
              color={
                (item.journeyBookStores.longitudeCheckOut &&
                  item.journeyBookStores.latitudeCheckOut) !== 0
                  ? masterColor.fontGreen50
                  : masterColor.fontBlack40
              }
              size={24}
            />
            <View style={{ marginLeft: 10 }} />
            <OcticonsIcon
              name="package"
              color={
                item.journeyBookStores.orderStatus
                  ? masterColor.fontGreen50
                  : masterColor.fontBlack40
              }
              size={24}
            />
          </View>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={styles.boxButtonChat}
              onPress={() => this.goToChat()}
            >
              <Text style={Fonts.type28}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxButtonDetail}
              onPress={() => this.goToDetailMerchant(item.id)}
            >
              <Text style={Fonts.type18}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 50 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.journey.dataGetJourneyPlanV2.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.journey.dataGetJourneyPlanV2}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.journey.refreshGetJourneyPlan}
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
        title={'Journey Plan Kosong'}
        description={
          'Tambahkan Journey Plan agar aktivitas Anda tercatat di Sinbad'
        }
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.journey.loadingGetJourneyPlan
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
    paddingTop: 10,
    paddingBottom: 60
  },
  boxItem: {
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  boxButtonDetail: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.mainColor
  },
  boxButtonChat: {
    marginLeft: 8,
    borderWidth: 1.5,
    borderColor: masterColor.mainColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ user, journey, merchant }) => {
  return { user, journey, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyListDataView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 24022021
 * updatedFunction:
 * -> Update the props of journey plan list.
 * -> Update the props of log activity.
 * updatedBy: dyah
 * updatedDate: 26022021
 * updatedFunction:
 * -> Update the validation with visitStatus.
 * -> Change storeId to string.
 * updatedDate: 08032021
 * updatedFunction:
 * -> Update parameter when loadmore.
 * updatedBy: dyah
 * updatedDate: 12032021
 * updatedFunction:
 * -> Add parameter search when get journey plan.
 *
 */
