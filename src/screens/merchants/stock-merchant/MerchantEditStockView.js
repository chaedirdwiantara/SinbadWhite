import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler
} from '../../../library/reactPackage';
import {
  BackHandlerBackSpecific,
  StatusBarWhite,
  SearchBarType5,
  ButtonSingle,
  LoadingPage,
  ModalConfirmationType3,
  EmptyData
} from '../../../library/component';
import {
  AntDesignIcon,
  MaterialIcon,
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import NavigationService from '../../../navigation/NavigationService';
import masterColor from '../../../config/masterColor.json';
import { Color, Fonts } from '../../../config';
import GlobalFont from '../../../helpers/GlobalFont';
import * as ActionCreators from '../../../state/actions';
import EditStockRecordListView from './EditStockRecordListView';
import ModalBottomProductList from './ModalBottomProductList';

class MerchantEditStockView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: true,
      openModalBackConfirmation: false,
      openModalSaveConfirmation: false,
      openModalProductList: false,
      selectedProduct: [],
      dataForSaveProduct: [],
      search: '',
      data: this.props.merchant.dataGetRecordStock,
      dataForDiscard: [],
      dataForBatchDelete: [],
      latitude: this.props.merchant.selectedMerchant.latitude,
      longitude: this.props.merchant.selectedMerchant.longitude
    };
  }
  /** HEADER CONFIG */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => (
        <View>
          <Text style={GlobalFont.textHeaderPage}>Catatan Stok</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => state.params.handleBackPressFromRN()}
        >
          <MaterialIcon
            color={masterColor.fontBlack50}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => state.params.handleOpenProductList()}>
          <View style={{ flexDirection: 'row', marginRight: 18 }}>
            <AntDesignIcon
              color={Color.mainColor}
              name={'pluscircle'}
              size={24}
            />
          </View>
        </TouchableOpacity>
      )
    };
  };
  /** FUNCTION */
  componentDidMount() {
    this.navigationFunction();
    this.discardDataSave();
    this.batchDeleteData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  componentDidUpdate(prevProps) {
    // To Delete Catalogue and get new stock record
    if (
      prevProps.merchant.dataDeleteRecordStock !==
      this.props.merchant.dataDeleteRecordStock
    ) {
      if (this.props.merchant.dataDeleteRecordStock.success) {
        this.props.merchantDeleteStockRecordReset();
        this.getRecordStock(this.state.search);
      }
    }
    // To get Catalouge after add new Catalogue
    if (
      prevProps.merchant.dataAddRecordStock !==
      this.props.merchant.dataAddRecordStock
    ) {
      if (this.props.merchant.dataAddRecordStock.success) {
        this.props.merchantAddStockRecordReset();
        this.getRecordStock(this.state.search);
        this.batchDeleteData();
      }
    }

    // To get catalogue after update
    if (
      prevProps.merchant.dataUpdateRecordStock !==
      this.props.merchant.dataUpdateRecordStock
    ) {
      if (this.props.merchant.dataUpdateRecordStock.success) {
        this.props.merchantUpdateStockRecordReset();
        this.getRecordStock(this.state.search);
        this.postRecordStockActivity();
        setTimeout(() => {
          NavigationService.navigate('MerchantStockView');
        }, 500);
      }
    }
    // To navigate when data are empty
    if (
      prevProps.merchant.dataGetRecordStock !==
      this.props.merchant.dataGetRecordStock
    ) {
      if (this.props.merchant.merchantStockRecordStatus === 'NEW-STOCK') {
        this.batchDeleteData();
      }
      if (this.props.merchant.dataGetRecordStock.length < 0) {
        NavigationService.navigate('MerchantStockView');
      } else {
        this.setState({ data: this.props.merchant.dataGetRecordStock });
      }
    }
    // Navigate to MerchantStockView after batch delete
    if (
      prevProps.merchant.dataBatchDeleteStock !==
      this.props.merchant.dataBatchDeleteStock
    ) {
      if (this.props.merchant.dataBatchDeleteStock.success) {
        this.props.merchantBatchDeleteStockReset();
        this.props.merchantStockRecordStatus('');
        this.getRecordStock(this.state.search);
        NavigationService.navigate('MerchantStockView');
      }
    }
  }
  /**
   * =======================
   * NAVIGATION FUNCTION
   * ======================
   */
  navigationFunction() {
    this.props.navigation.setParams({
      handleBackPressFromRN: () => this.handleBackPress(),
      handleOpenProductList: () => this.openModalProductList()
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }

  /** === BACK BUTTON RN PRESS HANDLING === */
  handleBackPress = () => {
    this.setState({ openModalBackConfirmation: true });
  };
  /** === BACK BUTTON HARDWARE PRESS HANDLING === */
  handleHardwareBackPress = () => {
    this.setState({ openModalBackConfirmation: true });
    return true;
  };
  /** === OPEN MODAL PRODUCT LIST === */
  openModalProductList = () => {
    this.setState({ openModalProductList: true });
  };
  /** === OPEN MODAL SAVE STOCK */
  openModalSaveStock() {
    this.setState({ openModalSaveConfirmation: true });
  }
  /** GET RECORD LIST */
  getRecordStock(keyword) {
    this.props.merchantGetStockRecordProcess({
      search: keyword || ''
    });
    this.setState({ data: this.props.merchant.dataGetRecordStock });
  }
  // POST RECORD STOCK ACTIVITY
  postRecordStockActivity() {
    this.props.merchantPostActivityProcessV2({
      journeyBookStoreId: this.props.merchant.selectedMerchant.journeyBookStores
        .id,
      activityName: 'record_stock',
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
  }
  /** DISCARD DATA TO EARLIER BEFORE EDIT */
  discardDataSave() {
    const dataForDiscard = [];
    this.props.merchant.dataGetRecordStock.map((data, index) => {
      const dataObject = {
        id: parseInt(data.catalogueId),
        isMustSale: data.isMustSale
      };
      dataForDiscard.push(dataObject);
    });
    this.setState({ dataForDiscard });
  }
  /** DISCARD DATA ACTION FROM BACK MODAL */
  discardData() {
    if (this.props.merchant.merchantStockRecordStatus === 'NEW-STOCK') {
      this.batchDeleteData();
      this.batchDeleteAction();
      this.props.merchantStockRecordStatus('');
      this.setState({ openModalBackConfirmation: false });
    } else {
      this.props.merchantAddStockRecordProcess({
        catalogues: this.state.dataForDiscard
      });
      this.props.merchantStockRecordStatus('');
      this.setState({ openModalBackConfirmation: false });
      NavigationService.navigate('MerchantStockView');
    }
  }
  /** BATCH DELETE STOCK RECROD  DATA */
  batchDeleteData() {
    const dataForBatchDelete = [];
    this.props.merchant.dataGetRecordStock.map((data, index) => {
      dataForBatchDelete.push(parseInt(data.id));
    });
    this.setState({ dataForBatchDelete });
  }
  /** BATCH DELETE ACTION */
  batchDeleteAction() {
    this.props.merchantBatchDeleteStockProcess({
      id: this.state.dataForBatchDelete
    });
  }

  /** PARENT FUNCTION */
  parentFunction(data) {
    switch (data.type) {
      case 'productList':
        setTimeout(() => {
          this.setState({ openModalProductList: data.data });
        }, 500);
        break;
      case 'search':
        this.setState({ search: data.data });
        this.getRecordStock(data.data);
        break;
      case 'delete':
        this.props.merchantDeleteStockRecordProcess(data.data);
        break;
      case 'edit':
        const catalogueIndex = this.state.data.findIndex(
          item => item.id === data.data.stockId
        );

        const newCatalogueArray = [...this.state.data];

        if (data.data.hasOwnProperty('shelfQty')) {
          newCatalogueArray[catalogueIndex] = {
            ...newCatalogueArray[catalogueIndex],
            showedStock: data.data.shelfQty
          };
        }
        if (data.data.hasOwnProperty('nonShelfQty')) {
          newCatalogueArray[catalogueIndex] = {
            ...newCatalogueArray[catalogueIndex],
            nonShowedStock: data.data.nonShelfQty
          };
        }
        const dataForSaveProduct = [];

        newCatalogueArray.map((item, index) => {
          const object = {
            id: parseInt(item.id),
            showedStock: parseInt(item.showedStock),
            nonShowedStock: parseInt(item.nonShowedStock)
          };
          dataForSaveProduct.push(object);
        });
        this.setState({
          data: newCatalogueArray,
          dataForSaveProduct
        });
        break;
      default:
        this.setState({ search: '' });
        this.getRecordStock(this.state.search);
        break;
    }
  }
  // SAVE STOCK RECORD
  saveStockRecord() {
    if (this.state.dataForSaveProduct.length > 0) {
      this.props.merchantStockRecordStatus('');
      this.props.merchantUpdateStockRecordProcess(
        this.state.dataForSaveProduct
      );
    } else {
      this.props.merchantStockRecordStatus('');
      this.postRecordStockActivity();
      NavigationService.navigate('MerchantStockView');
    }
  }
  // RENDER CONTENT
  renderContent() {
    const merchant = this.props.merchant;
    return merchant.loadingGetRecordStock ? <LoadingPage /> : this.renderData();
  }

  /** RENDER VIEW */
  // RENDER CARD View
  renderCardView() {
    return this.props.merchant.dataGetRecordStock.length > 0 ? (
      <View>
        <EditStockRecordListView
          data={this.state.data}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View style={styles.mainContainer}>
        <EmptyData
          title={'Tidak Ada Catatan Stok'}
          description={'Tambah produk untuk melakukan pencatatan stok'}
        />
      </View>
    );
  }
  renderEmptyCatalogue() {
    return this.props.merchant.dataGetRecordStock.length < 1 &&
      !this.props.merchant.loadingGetRecordStock ? (
      <LoadingPage />
    ) : (
      <EmptyData
        title={'Tidak Ada Catatan Stok'}
        description={'Tambah produk untuk melakukan pencatatan stok'}
      />
    );
  }
  // RENDER DATA
  renderData() {
    return (
      <View style={{ backgroundColor: masterColor.backgroundWhite, flex: 1 }}>
        {this.renderSearch()}
        {this.renderCardView()}
        {this.renderButtonSaveStock()}
      </View>
    );
  }
  // RENDER SEARCH VIEW
  renderSearch() {
    return (
      <View style={{ paddingVertical: 8 }}>
        <SearchBarType5
          searchText={this.state.search}
          placeholder={'Cari Produk disini'}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  // RENDER BUTTON SAVE STOCK
  renderButtonSaveStock() {
    const merchant = this.props.merchant;
    return (
      <View style={styles.containerEditButton}>
        <ButtonSingle
          title={'Simpan Catatan Stock'}
          borderRadius={8}
          onPress={() => this.openModalSaveStock()}
          loading={
            merchant.loadingGetRecordStock ||
            merchant.loadingUpdateRecordStock ||
            merchant.loadingPostActivity
          }
        />
      </View>
    );
  }
  /** RENDER MODAL */
  /** RENDER MODAL BACK CONFIRMATION */
  renderModalBackConfirmation() {
    return this.state.openModalBackConfirmation ? (
      <ModalConfirmationType3
        statusBarWhite
        title={'Catatan Belum Tersimpan'}
        open={this.state.openModalBackConfirmation}
        leftText={'Keluar'}
        rightText={'Kembali'}
        content={
          'Anda belum menyimpan catatan stok saat ini konfirmasi penyimpanan catatan sebelum meninggalkan halaman ini'
        }
        type={'okeNotRed'}
        leftAction={() => this.discardData()}
        rightAction={() => {
          this.setState({ openModalBackConfirmation: false });
        }}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL SAVE CONFIRMATION */
  renderModalSaveConfirmation() {
    return this.state.openModalSaveConfirmation ? (
      <ModalConfirmationType3
        statusBarWhite
        title={'Simpan Catatan Stock'}
        open={this.state.openModalSaveConfirmation}
        leftText={'Hapus dan keluar'}
        rightText={'Ya, simpan'}
        type={'okeNotRed'}
        content={'Apakah anda ingin menyimpan Catatan Stok?'}
        leftAction={() => {
          // NavigationService.navigate('MerchantStockView')
          this.batchDeleteAction();
          this.setState({ openModalSaveConfirmation: false });
        }}
        rightAction={() => {
          this.setState({ openModalSaveConfirmation: false });
          this.saveStockRecord();
        }}
      />
    ) : (
      <View />
    );
  }
  // RENDER MODAL PRODUCT LIST
  renderModalProductList() {
    return this.state.openModalProductList ? (
      <ModalBottomProductList
        open={this.state.openModalProductList}
        close={() => {
          this.setState({ openModalProductList: false });
          this.props.getMSSCataloguesReset();
        }}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    ) : (
      <View />
    );
  }
  /** MAIN RENDER */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <BackHandlerBackSpecific
          navigation={this.props.navigation}
          page={'MerchantStockView'}
        />
        <StatusBarWhite />
        {this.renderContent()}
        {/* MODAL */}
        {this.renderModalBackConfirmation()}
        {this.renderModalSaveConfirmation()}
        {this.renderModalProductList()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.fontBlack05
  },
  containerEditButton: {
    backgroundColor: masterColor.backgroundWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  }
});

const mapStateToProps = ({ pdp, merchant }) => {
  return { pdp, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantEditStockView);
