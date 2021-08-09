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
  moment
} from '../../library/thirdPartyPackage';
import {
  SkeletonType3,
  LoadingLoadMore,
  Address,
  EmptyDataType2
} from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';

class JourneyListSearchView extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  onHandleRefresh = () => {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    this.props.journeyPlanGetMapSearchRefresh();
    this.props.journeyPlanGetMapSearchProcess({
      page: 1,
      date: today,
      search: this.props.searchText,
      loading: true
    });
  };

  onHandleLoadMore = () => {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    if (
      !this.props.journey.errorGetJourneyPlanMapSearch &&
      !this.props.journey.loadingLoadMoreGetJourneyPlanMapSearch
    ) {
      if (this.props.journey.dataGetJourneyPlanMapSearch) {
        if (
          this.props.journey.dataGetJourneyPlanMapSearch.length <
          this.props.journey.totalDataGetJourneyPlanMapSearch
        ) {
          const page = this.props.journey.pageGetJourneyPlanMapSearch + 1;
          this.props.journeyPlanGetMapSearchLoadMore(page);
          this.props.journeyPlanGetMapSearchProcess({
            page,
            date: today,
            search: this.props.searchText,
            loading: false
          });
        }
      }
    }
  };
  /** back to map */
  backToMap(data) {
    // back to map with params
    NavigationService.navigate('JourneyMapView', {
      merchant: data,
      filter: 'Semua Toko'
    });
  }
  /**
   * =====================
   * LOADING VIEW
   * =====================
   */
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <SkeletonType3 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.journey.loadingLoadMoreGetJourneyPlanMapSearch ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
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
        <View style={{ justifyContent: 'center', width: 20 }}>
          <Image
            source={require('../../assets/icons/journey/store_gray.png')}
            style={{ height: 15 }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.backToMap(item)}
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
              maxLength={50}
              substring
              font={
                item.journeyBookStores.typeOfStore === 'exist_store'
                  ? Fonts.type67
                  : Fonts.type22
              }
              address={item.address}
              urban={item.urbans}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 50 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.journey.dataGetJourneyPlanMapSearch.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.journey.dataGetJourneyPlanMapSearch}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.journey.refreshGetJourneyPlanMapSearch}
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
      this.props.journey.dataGetJourneyPlanMapSearchType === 'success' && (
        <EmptyDataType2
          top
          title={'Pencarian Tidak Ditemukan'}
          description={'Cek kembali nama toko atau ID toko yang kamu masukkan'}
        />
      )
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.journey.loadingGetJourneyPlanMapSearch
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
)(JourneyListSearchView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06082021
 * updatedBy: dyah
 * updatedDate: 09082021
 * updatedFunction:
 * -> sent params filter to journey map view.
 */
