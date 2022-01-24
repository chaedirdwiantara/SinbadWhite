import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  SkeletonType3,
  LoadingLoadMore,
  Address,
  SearchBarType1,
  EmptyDataType2,
  EmptyData,
  TabsCustom,
  ModalBottomType1,
  ButtonSingle
} from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import { Color } from '../../config';

const tabDashboard = [
  {
    title: 'Semua',
    value: 'all'
  },
  {
    title: 'Belum Dikunjungi',
    value: 'notVisited'
  },
  {
    title: 'Tertunda',
    value: 'paused'
  },
  {
    title: 'Sudah Dikunjungi',
    value: 'visited'
  }
];

class JourneyListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      tabValue: tabDashboard[0].value,
      modalPausedVisit: false
    };
  }
  parentFunction(data) {
    if (data.type === 'search') {
      this.props.parentFunction(data);
    }
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.journey.dataGetJourneyPlanV2 !==
      this.props.journey.dataGetJourneyPlanV2
    ) {
      /** CHECKING IF THERE ARE PAUSED JOURNEY PLAN, NEED TO SHOW MODAL WARNING */
      this.checkPausedVisit(this.props.journey.dataGetJourneyPlanV2)
    }
  } 
  onHandleRefresh = () => {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    this.props.journeyPlanGetRefreshV2();
    this.props.journeyPlanGetProcessV2({
      page: 1,
      date: today,
      search: this.props.searchText,
      storetype: 'all',
      loading: true
    });
    this.props.getJourneyPlanReportProcessV2();
  };

  onHandleLoadMore = () => {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    if (
      !this.props.journey.errorGetJourneyPlan &&
      !this.props.journey.loadingLoadMoreGetJourneyPlan
    ) {
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
            search: this.props.searchText,
            storetype: 'all',
            loading: false
          });
        }
      }
    }
  };
  /** go to detail merchant */
  goToDetailMerchant(item) {
    this.props.merchantSelected(item);
    NavigationService.navigate('MerchantDetailView', {
      id: item.id
    });
  }
  /** go to merchant dashboard */
  goToMerchantDashboard(storeName, data) {
    /** FOR RESET OMS DATA (CART ETC)
     * if agent change store
     */
    if (this.props.merchant.selectedMerchant !== null) {
      if (
        parseInt(this.props.merchant.selectedMerchant.storeId, 10) !==
        data.storeId
      ) {
        this.props.merchantChanged(true);
      }
    }
    /** GO TO SELECTED STORE */
    //map collection ids to selected merchant information
    const collections = data?.journeyBookStores.collections || null;
    const collectionIds = [];
    if (collections) {
      collections.map(item => {
        collectionIds.push(item.collectionTransactionDetailId);
      });
    }

    data.name = data.storeName;
    data.storeId = data.storeId.toString();
    data.collectionIds = collectionIds;
    this.props.merchantSelected(data);
    this.props.sfaPostTransactionCheckoutReset();
    setTimeout(() => {
      this.props.getSurveyResult(data.storeName);
      NavigationService.navigate('MerchantHomeView', {
        storeName: data.storeName
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
  /** CHECK VISIT ACTIVITY */
  checkVisitActivity(logs) {
    // check already check out or not
    if ((logs.longitudeCheckOut && logs.latitudeCheckOut) !== 0) {
      return require('../../assets/icons/journey/visit_green.png');
    }
    // not checkin yet.
    if ((logs.longitudeCheckOut && logs.latitudeCheckOut) === 0) {
      // not visit
      if (!logs.visitStatus && logs.noVisitReasonId) {
        return require('../../assets/icons/journey/no_visit_black.png');
      }
      return require('../../assets/icons/journey/visit_gray.png');
    }
  }
  /** === ON CHANGE TAB === */
  onChangeTab(value) {
    this.setState({ tabValue: value });
  }
  checkPausedVisit(data) {
    data.map((item) => {
      // TODO CHECKING PAUSED JOURNEY PLAN

    })
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER FOR SEARCH BAR === */
  renderSearchBar() {
    return this.props.journey.dataGetJourneyPlanReportV2 !== null
      ? this.renderCheckSearchBar()
      : this.renderSearchBarContent();
  }
  /** RENDER CHECK SEARCH BAR === */
  renderCheckSearchBar() {
    return this.props.journey.dataGetJourneyPlanReportV2.target > 0 ? (
      this.renderSearchBarContent()
    ) : (
      <View />
    );
  }
  /** === RENDER SEARCH BAR === */
  renderSearchBarContent() {
    return (
      <View style={styles.searchBar}>
        <SearchBarType1
          maxLength={30}
          searchText={this.props.searchText}
          placeholder={'Cari nama / id toko disini'}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

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
    let pjp = true;
    if (
      item.journeyBookStores.permanentJourneyPlanId === null ||
      item.journeyBookStores.permanentJourneyPlanId === 0
    ) {
      pjp = false;
    }

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
          accessible={true}
          accessibilityLabel={'btnJourneyStore'}
          onPress={() => this.goToMerchantDashboard(item.storeName, item)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View style={{ marginBottom: 4 }}>
            <View style={styles.containerExternalStoreId}>
              <Text
                style={
                  /*
                  exist_store ditambahkan dari toko existing, selain itu adalah toko baru
                 */
                  item.journeyBookStores.typeOfStore === 'exist_store'
                    ? Fonts.type67
                    : Fonts.type29
                }
              >
                {item.externalId ? item.externalId : '-'}
              </Text>
              <View
                style={[
                  styles.labelPJP,
                  {
                    backgroundColor: pjp
                      ? masterColor.fontBlue10
                      : masterColor.fontBlack10
                  }
                ]}
              >
                <Text
                  style={[
                    Fonts.type67,
                    {
                      color: pjp
                        ? masterColor.fontBlue60
                        : masterColor.fontBlack60
                    }
                  ]}
                >
                  {pjp ? 'PJP' : 'NON PJP'}
                </Text>
              </View>
            </View>
            <Text
              style={
                /*
                  exist_store ditambahkan dari toko existing, selain itu adalah toko baru
                */
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type8
                  : Fonts.type29
              }
            >
              {item.storeName}
            </Text>
          </View>
          <View>
            <Address
              maxLength={30}
              substring
              font={
                /*
                  exist_store ditambahkan dari toko existing, selain itu adalah toko baru
                 */
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type67
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
          {
            false 
            ? // TODO: for isPaused journeyBookStore later
              <View
                style={{
                  backgroundColor: Color.fontYellow10,
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  marginBottom: 8
                }}
              >
                <Text style={[Fonts.type22, { color: Color.fontYellow60 }]}>Sedang ditunda</Text>
              </View>
            :
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginBottom: 17
                }}
              >
                <Image
                  source={this.checkVisitActivity(item.journeyBookStores)}
                  style={styles.iconVisitOrder}
                />
                <View style={{ marginLeft: 10 }} />
                <Image
                  source={
                    item.journeyBookStores.orderStatus
                      ? require('../../assets/icons/journey/order_green.png')
                      : require('../../assets/icons/journey/order_gray.png')
                  }
                  style={styles.iconVisitOrder}
                />
              </View>
          }
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={styles.boxButtonChat}
              onPress={() => this.goToChat()}
            >
              <MaterialIcon
                color={masterColor.fontBlack100}
                name={'chat'}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxButtonDetail}
              onPress={() => this.goToDetailMerchant(item)}
            >
              <Text style={Fonts.type49}>Detail</Text>
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
    return this.props.searchText.length > 0 ? (
      <EmptyDataType2
        top
        title={'Pencarian Tidak Ditemukan'}
        description={'Cek kembali nama toko atau ID toko yang kamu masukkan'}
      />
    ) : (
      <EmptyData
        title={'Journey Plan Kosong'}
        description={
          'Tambahkan Journey Plan agar aktivitas Anda tercatat di Sinbad'
        }
      />
    );
  }
  /** === RENDER TABS */
  renderTabs() {
    return (
      <View style={{ height: 70, paddingHorizontal: 8 }}>
        <TabsCustom
          listMenu={tabDashboard}
          onChange={value => this.onChangeTab(value)}
          value={this.state.tabValue}
        />
      </View>
    )
  }
   /**
   * ====================
   * MODAL
   * =====================
   */
  /** === RENDER MODAL DELAYED VISIT === */
  renderModalPausedVisit() {
    return (
      <ModalBottomType1
        open={this.state.modalPausedVisit}
        title="Masih Ada Kunjungan Tertunda"
        content={
          <View>
            <Text style={[Fonts.type3, { marginHorizontal: 24, textAlign: 'center', marginBottom: 32 }]}>
              Pastikan untuk menyelesaikan semua kunjungan di journey plan.
            </Text>
            <View style={{ marginBottom: 16 }}>
              <ButtonSingle
                disabled={false}
                title={'Mengerti'}
                borderRadius={4}
              />
            </View>
          </View>
        }
      />
    )
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderSearchBar()}
        {this.renderTabs()}
        {this.props.journey.loadingGetJourneyPlan
          ? this.renderSkeleton()
          : this.renderData()}
        {/* for loadmore */}
        {this.renderLoadMore()}
        {/* modal */}
        {this.renderModalPausedVisit()}
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
    paddingBottom: 60
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  containerExternalStoreId: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  labelPJP: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 8,
    borderRadius: 4
  },
  iconVisitOrder: {
    width: 15,
    height: 15
  },
  boxButtonDetail: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    backgroundColor: masterColor.fontBlack05
  },
  boxButtonChat: {
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRadius: 20,
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    backgroundColor: masterColor.fontBlack05
  },
  searchBar: {
    paddingTop: 4
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
 * updatedBy: raka
 * updatedDate: 20012022
 * updatedFunction:
 * -> use tabs component for filter jbs.
 *
 */
