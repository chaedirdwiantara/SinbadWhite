/**
 * =====================================
 * THIS COMPONENT FOR LIST OF LOCATION
 * =====================================
 * PROPS PARAMS
 * - type
 */
import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  LoadingPage,
  LoadingLoadMore,
  SearchBarType3,
  EmptyData
} from '../../library/component';
import { Fonts, GlobalStyle } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';

class ListAndSearchType1 extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: () => (
        <View style={{ width: '100%', paddingRight: 16 }}>
          <SearchBarType3
            placeholder={params ? params.placeholder : ''}
            hide={params ? params.hide : false}
          />
        </View>
      )
    };
  };
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.listAndSearchGetReset();
    this.getListAndSearch(0, true);
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (prevProps.global.search !== this.props.global.search) {
      this.props.listAndSearchGetReset();
      this.getListAndSearch(0, true);
    }
  }
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.listAndSearchGetRefresh();
    this.getListAndSearch(0, true);
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.global.dataGetListAndSearch) {
      if (
        this.props.global.dataGetListAndSearch.length <
        this.props.global.totalDataGetListAndSearch
      ) {
        const page = this.props.global.pageGetListAndSearch + 20;
        this.props.listAndSearchGetLoadMore(page);
        this.getListAndSearch(page, false);
      }
    }
  };
  /** === GET LOCATION === */
  getListAndSearch(page, loading) {
    this.props.listAndSearchGetProcess({
      loading,
      page,
      type: this.props.navigation.state.params.type,
      search: this.props.global.search,
      userId: this.props.user !== null ? this.props.user.id : ''
    });
  }
  /** === SAVE DATA === */
  saveData(item) {
    switch (this.props.navigation.state.params.type) {
      /** === FOR MERCHANT === */
      case 'vehicleMerchant':
        this.props.saveVolatileDataMerchant({
          vehicleAccessibilityId: item.id,
          vehicleAccessibilityName: item.name
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'numberOfEmployeeMerchant':
        this.props.saveVolatileDataMerchant({
          numberOfEmployee: item.amount
        });
        NavigationService.goBack(this.props.navigation.state.key);
        break;
      case 'province':
        NavigationService.goBack(this.props.navigation.state.key);
        this.props.saveDataManualInputLocation({
          provinceId: item.id,
          provinceName: item.name,
          cityName: '',
          districtName: '',
          urbanName: '',
          zipCode: ''
        });
        break;
      case 'city':
        NavigationService.goBack(this.props.navigation.state.key);
        this.props.saveDataManualInputLocation({
          cityName: item.city,
          districtName: '',
          urbanName: '',
          zipCode: ''
        });
        break;
      case 'district':
        NavigationService.goBack(this.props.navigation.state.key);
        this.props.saveDataManualInputLocation({
          districtName: item.district,
          urbanName: '',
          zipCode: ''
        });
        break;
      case 'urban':
        NavigationService.goBack(this.props.navigation.state.key);
        this.props.saveDataManualInputLocation({
          urbanName: item.urban,
          zipCode: item.zipCode
        });
        break;
      case 'warehouse':
        NavigationService.goBack(this.props.navigation.state.key)
        this.props.saveVolatileDataMerchant({
          warehouse: item.name,
          warehouseId: item.id
        })
        break;
      case 'storeType':
        NavigationService.goBack(this.props.navigation.state.key)
        this.props.saveVolatileDataMerchant({
          storeType: item.name,
          typeId: item.id
        })
        break;
      case 'storeGroup':
        NavigationService.goBack(this.props.navigation.state.key)
        this.props.saveVolatileDataMerchant({
          storeGroup: item.name,
          groupId: item.id
        })
        break
      case 'storeCluster':
        NavigationService.goBack(this.props.navigation.state.key)
        this.props.saveVolatileDataMerchant({
          storeCluster: item.name,
          clusterId: item.id
        })
        break;
      case 'storeChannel':
        NavigationService.goBack(this.props.navigation.state.key)
        this.props.saveVolatileDataMerchant({
          storeChannel: item.name,
          channelId: item.id
        })
        break
      default:
        break;
    }
  }
  /** === MODIFY ITEM === */
  modifyItem(item) {
    switch (this.props.navigation.state.params.type) {
      /** === THIS FOR MERCHANT === */
      case 'vehicleMerchant':
      case 'province':
        return item.name;
      case 'city':
        return item.city;
      case 'district':
        return item.district;
      case 'urban':
        return item.urban;
      case 'numberOfEmployeeMerchant':
        return item.amount;
      case 'storeType':
        return item.name;
      case 'storeGroup':
        return item.name;
      case 'storeCluster':
        return item.name;
      case 'storeChannel':
        return item.name;
      case 'warehouse':
        return item.name;
      default:
        break;
    }
  }
  /** === MODIFY ITEM TYPE */
  modifyItemType(item){
    switch (this.props.navigation.state.params.type) {
      /** === THIS FOR MERCHANT === */
      case 'storeType':
        return item.id;
      case 'storeGroup':
        return item.id;
      case 'storeCluster':
        return item.id;
      case 'storeChannel':
        return item.id;
      default:
        break;
    }

  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT ITEM === */
  renderItem({ item, index }) {
    const type = this.props.navigation.state.params.type
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.boxContent}
          onPress={() => this.saveData(item)}
        > 
        {type === 'storeType' 
        || type === 'storeGroup' 
        || type === 'storeCluster' 
        || type === 'storeChannel' 
        ? (
          <View style={{flex: 1, flexDirection: 'row'}}>
          <View><Text style={[Fonts.type8, {color: 'orange'}]}>{this.modifyItemType(item)}</Text></View>
          <View style={{paddingHorizontal: 10}}/>
          <View><Text style={Fonts.type8}>{this.modifyItem(item)}</Text></View>
          
          
          </View>
        ) : (
          <Text style={Fonts.type8}>{this.modifyItem(item)}</Text>
        )}
          
        </TouchableOpacity>
        <View style={GlobalStyle.lines} />
      </View>
    );
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.global.dataGetListAndSearch}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.global.refreshGetListAndSearch}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
        />
      </View>
    );
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.global.loadingLoadMoreGetListAndSearch ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <LoadingPage />;
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderContent()}
        {this.renderLoadMore()}
      </View>
    );
  }
  /** RENDER EMPTY */
  renderEmpty() {
    return (
      <View style={styles.mainContainer}>
      <StatusBarRed />
      <EmptyData
        title={'Maaf, data tidak ditemukan'}
      />
      </View>
    )
  }
  renderMainContent(){
    return this.props.global.dataGetListAndSearch.length !== 0 
    ? this.renderData()
    : this.renderEmpty()
  }
  /** === MAIN === */
  render(){
    return this.props.global.loadingGetListAndSearch
    ? this.renderSkeleton()
    : this.renderMainContent()
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 26
  },
  boxContent: {
    paddingVertical: 16,
    paddingHorizontal: 16
  }
});

const mapStateToProps = ({ global, user }) => {
  return { global, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListAndSearchType1);
