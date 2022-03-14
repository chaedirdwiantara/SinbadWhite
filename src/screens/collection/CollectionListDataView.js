import {
  React,
  Component,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { MoneyFormat, GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import { EmptyData, EmptyDataType2 } from '../../library/component';
class CollectionListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /** HANDLE ON REFRESH LIST */
  onHandleRefresh = () => {
    this.props.sfaGetStoreCollectionListReset();
    this.props.sfaGetStoreCollectionListRefresh();
    this.getStoreCollectionList(true);
  };
  /**  HANDLE ON LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.sfa.dataGetStoreCollectionList) {
      if (
        (this.props.sfa.dataGetStoreCollectionList || []).length <
          this.props.sfa.totalGetStoreCollectionList ||
        0
      ) {
        const skip = this.props.sfa.skipGetStoreCollection + 1;
        this.props.sfaGetStoreCollectionListLoadmore(skip);
        this.getStoreCollectionList(false, skip);
      }
    }
  };
  /** === GET STORE COLLECTION LIST === */
  getStoreCollectionList = (loading, skip) => {
    const data = {
      salesId: parseInt(this.props?.user?.id || 0, 10),
      supplierId: parseInt(
        this.props?.user?.userSuppliers[0]?.supplier?.id || 0,
        10
      ),
      skip: skip || 1,
      limit: 10,
      loading: true,
      searchKey: '',
      loading
    };
    this.props.sfaGetStoreCollectionListReset();
    this.props.sfaGetStoreCollectionListProcess(data);
  };
  /** CHECK COLLECTION ACTIVITY */
  checkCollectionActivity(status) {
    // check already check out or not
    if (status !== 'ASSIGNED') {
      return require('../../assets/icons/journey/visit_green.png');
    } else {
      return require('../../assets/icons/journey/visit_gray.png');
    }
  }
  /** === ONPRESS BUTTON TAGIH */
  onPressButtonTagih = item => {
    this.props.parentFunction({
      type: 'modal_collection',
      storeName: item.name || '',
      isInPjp: item.isInPjp || false
    });
    if (!item.isInPjp) {
      this.props.selectedStore(item);
      this.props.sfaModalCollectionListMenu(true);
    }
  };
  /** === RENDER SEPARATOR === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginVertical: 12 }]} />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.sfa.loadingLoadmoreGetStoreCollectionList ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }
  /** === DATA ITEM === */
  renderItem({ item, index }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: '80%' }}>
          <Text style={[Fonts.type9, { marginBottom: 10 }]}>
            {item.externalId || 0}
          </Text>
          <Text style={[Fonts.type7, { marginBottom: 4 }]}>
            {item.name || ''}
          </Text>
          <Text style={Fonts.type17}>{item.address || ''}</Text>
          <View style={styles.itemContainer}>
            <Text style={Fonts.type17}>
              {item.collectionTransactionDetailIds.length || 0} Invoice
            </Text>
            <Text style={Fonts.type17}> | </Text>
            <Text style={Fonts.type17}>
              Total Tagihan {MoneyFormat(item.totalOutstandingAmount || 0)}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={this.checkCollectionActivity(item.collectionStatus)}
            style={styles.iconCollectionDoor}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.onPressButtonTagih(item)}
          >
            <Text style={Fonts.type83}>Tagih</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === DATA VIEW === */
  renderData() {
    return this.props.data.length > 0 ? (
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <FlatList
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
          data={this.props.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.onHandleRefresh}
          refreshing={this.props.sfa.refreshGetStoreCollectionList}
          onEndReachedThreshold={0.2}
          onEndReached={() => this.onHandleLoadMore()}
        />
      </View>
    ) : (
      <View>{this.renderEmpty()}</View>
    );
  }
  /** === RENDER EMPTY DATA === */
  renderEmpty() {
    return (
      <View style={{ marginTop: '60%' }}>
        {this.props.emptyData === 'default' ? (
          <EmptyData
            heighTitle
            title={'Store Kosong'}
            description={
              'Untuk hari ini tidak ada jadwal toko yang harus dikunjungi ya '
            }
          />
        ) : (
          <EmptyDataType2
            wideTitle
            title={'Maaf pencarian anda tidak ditemukan'}
            description={'Silahkan masukan kata pencarian yang lain ya '}
          />
        )}
      </View>
    );
  }
  /** === MAIN RENDER === */
  render() {
    return <View style={styles.mainContainer}>{this.renderData()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  iconCollectionDoor: {
    width: 15,
    height: 15,
    marginBottom: 16
  },
  iconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.fontBlack60
  },
  itemContainer: { flexDirection: 'row', marginTop: 5 }
});
const mapStateToProps = ({ sfa, user }) => {
  return { sfa, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionListDataView);
