import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  CartGlobal,
  ModalBottomType3,
  ToastType1,
  SelectedMerchantName,
  ModalConfirmation,
  ModalBottomErrorRespons,
  ModalBottomSkuNotAvailable,
  ModalBottomType7
} from '../../library/component';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import PdpGridDataView from './PdpGridDataView';
import PdpListDataView from './PdpListDataView';
import PdpLineDataView from './PdpLineDataView';
import PdpFilterView from './PdpFilterView';
import PdpOrderView from './PdpOrderView';
import PdpFilterSortView from './PdpFitlerSortView';

class PdpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** for modal */
      openModalOrder: false,
      openModalSkuNotAvailable: false,
      openModalSort: false,
      openModalConfirmRemoveCart: false,
      openModalErrorGlobal: false,
      openWarningCredit: false,
      /** data */
      layout: 'grid',
      addProductNotif: false,
      addProductNotifText: '',
      selectedProduct: null,
      skuBundle: true,
      invoiceGroupId: 0,
      modalChangeMerchantText:
        'Menambahkan produk ini ke keranjang akan menghapus SKU sebelumnya. Apakah Anda Setuju ?',
      /** sort */
      sort: 'asc',
      sortBy: 'mss_types',
      /** sort by mss priority by default */ 
      sortIndex: 0
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>Cari Produk</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('PdpSearchView')}
          >
            <MaterialIcon color={Color.fontWhite} name={'search'} size={24} />
          </TouchableOpacity>
          <View style={{ marginRight: 16, marginLeft: 12 }}>
            <CartGlobal
              accessible={true}
              accessibilityLabel={'btnProdukCart'}
            />
          </View>
        </View>
      )
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.pdpGetReset();
    this.getPdp({ page: 0, loading: true });
    if (this.props.profile.errorGetSalesTeam !== null) {
      this.doError();
    }
  }
  /** === DID UPDATE */
  componentDidUpdate(prevState) {
    if (prevState.global.search !== this.props.global.search) {
      if (this.props.global.search === '') {
        this.props.pdpGetReset();
        this.getPdp({
          page: 0,
          loading: true,
          sort: 'asc',
          sortBy: 'mss_types' 
        });
      }
    }

    if (
      prevState.merchant.modalChangeMerchant !==
      this.props.merchant.modalChangeMerchant
    ) {
      if (this.props.merchant.modalChangeMerchant) {
        this.checkModalChangeMerchant();
      }
    }
  }

  checkModalChangeMerchant() {
    if (this.props.oms.dataCart.length > 0) {
      this.setState({
        modalChangeMerchantText:
          'Apakah anda setuju untuk menghapus keranjang sebelumnya?',
        openModalConfirmRemoveCart: true
      });
    } else {
      NavigationService.navigate('OmsCartView');
    }
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'layout':
        this.setState({ layout: data.data });
        break;
      case 'sort':
        this.setState({ openModalSort: true });
        break;
      case 'filter':
        console.log('filter');
        break;
      case 'category':
        console.log('filter');
        break;
      case 'sortSelected':
        this.setState({
          openModalSort: false,
          sortIndex: data.data.sortIndex,
          sort: data.data.sort,
          sortBy: data.data.sortBy
        });
        this.props.pdpGetReset();
        this.getPdp({
          page: 0,
          loading: true,
          sort: data.data.sort,
          sortBy: data.data.sortBy
        });
        break;
      /** => 'pesan' buttom press (from child) if bundle */
      case 'goToBundlePage':
        this.props.pdpGetDetailProcess(data.data);
        NavigationService.navigate('PdpBundleView');
        break;
      /** => 'pesan' buttom press (from child) */
      case 'openModalOrder':
        if (
          this.props.merchant.merchantChanged &&
          this.props.oms.dataCart.length > 0
        ) {
          this.setState({
            modalChangeMerchantText:
              'Menambahkan produk ini ke keranjang akan menghapus SKU sebelumnya. Apakah Anda Setuju ?',
            openModalConfirmRemoveCart: true,
            selectedProduct: data.data,
            invoiceGroupId: data.invoice[0].invoiceGroupId
          });
        } else {
          const invoiceGroupId = data?.invoice[0]?.invoiceGroupId;
          const storeId = this.props.merchant?.selectedMerchant?.storeId;
          this.props.OMSCheckCreditProcess({
            invoiceGroupId: parseInt(invoiceGroupId, 10),
            storeId: parseInt(storeId, 10)
          });
          this.props.pdpGetDetailProcess(data.data);
          this.setState({ openModalOrder: true });
        }
        break;
      /** => sku not available (from child pdpOrderView) */
      case 'skuNotAvailable':
        this.setState({
          openModalOrder: false,
          openModalSkuNotAvailable: true
        });
        break;
      /** => 'tambah keranjang' button press */
      case 'addSkuToCart':
        /** >>> save sku to permanent cart */
        this.props.omsAddToCart({
          method: 'add',
          catalogueId: data.data.catalogueId,
          qty: data.data.qty,
          detail: data.data?.detail ?? null
        });
        this.setState({
          openModalOrder: false,
          addProductNotif: true,
          addProductNotifText: 'Produk berhasil ditambahkan ke keranjang'
        });
        setTimeout(() => {
          this.setState({ addProductNotif: false });
        }, 3000);
        break;
      /** => refresh page (from child) */
      case 'refresh':
        this.props.pdpGetRefresh();
        this.getPdp({ page: 0, loading: true });
        break;
      /** => load more (from child) */
      case 'loadMore':
        if (this.props.pdp.dataGetPdp) {
          if (
            this.props.pdp.dataGetPdp.length < this.props.pdp.totalDataGetPdp
          ) {
            const page = this.props.pdp.pageGetPdp + 10;
            this.props.pdpGetLoadMore(page);
            this.getPdp({ page, loading: false });
          }
        }
        break;
      /** => over credit limit */
      case 'overCreditLimit':
        this.setState({ openWarningCredit: true });
        break;
      /** => hide warning credit limit */
      case 'hideWarningCredit':
        this.setState({ openWarningCredit: false });
        break;
      default:
        break;
    }
  }
  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    /** Close all modal and open modal error respons */
    if (!this.state.openModalErrorGlobal) {
      this.setState({
        openModalErrorGlobal: true,
        openModalOrder: false,
        openModalSkuNotAvailable: false,
        openModalSort: false,
        openModalConfirmRemoveCart: false
      });
    }
  }
  /** === FETCH DATA (THIS FOR ALL FITLER) === */
  getPdp(data) {
    const { dataSalesTeam } = this.props.profile;
    this.props.pdpGetProcess({
      page: data.page,
      loading: data.loading,
      sort: data.sort !== undefined ? data.sort : this.state.sort,
      sortBy: data.sortBy !== undefined ? data.sortBy : this.state.sortBy,
      invoiceGroupIds: dataSalesTeam
        ? dataSalesTeam[0].salesTeamInvoice.map(item => item.invoiceId)
        : [],
      search: this.props.global.search
    });
  }

  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER HEADER NAME OF MERCHANT === */
  renderMerchantName() {
    return <SelectedMerchantName lines />;
  }
  /** === RENDER PDP LAYOUT === */
  renderPdpData() {
    switch (this.state.layout) {
      case 'grid':
        return (
          <PdpGridDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
            sort={this.state.sort}
            sortBy={this.state.sortBy}
          />
        );
      case 'list':
        return (
          <PdpListDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
            sort={this.state.sort}
            sortBy={this.state.sortBy}
          />
        );
      case 'line':
        return (
          <PdpLineDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
            sort={this.state.sort}
            sortBy={this.state.sortBy}
          />
        );
      default:
        break;
    }
  }
  /** === RENDER FILTER BOTTOM SECTION === */
  renderFilterSection() {
    return (
      <PdpFilterView
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        sort={this.state.sortIndex}
      />
    );
  }
  /**
   * ===================
   * TOAST
   * ====================
   */
  renderToast() {
    return this.state.addProductNotif ? (
      <ToastType1 margin={10} content={this.state.addProductNotifText} />
    ) : (
      <View />
    );
  }
  /**
   * =====================
   * MODAL
   * =====================
   */
  /** === RENDER MODAL CONFIRM DELETE CART === */
  renderModalConfirmDelete() {
    return this.state.openModalConfirmRemoveCart ? (
      <ModalConfirmation
        title={'Anda telah berpindah toko'}
        okText={'Ya'}
        cancelText={'Tidak'}
        open={this.state.openModalConfirmRemoveCart}
        content={this.state.modalChangeMerchantText}
        type={'okeRed'}
        ok={() => {
          if (!this.props.merchant.modalChangeMerchant) {
            this.setState({
              openModalConfirmRemoveCart: false,
              openModalOrder: true
            });
            this.props.omsResetData();
            this.props.merchantChanged(false);
            this.props.modalChangeMerchant(false);
            const invoiceGroupId = this.state.invoiceGroupId;
            const storeId = this.props.merchant?.selectedMerchant?.storeId;
            this.props.OMSCheckCreditProcess({
              invoiceGroupId: parseInt(invoiceGroupId, 10),
              storeId: parseInt(storeId, 10)
            });
            this.props.pdpGetDetailProcess(this.state.selectedProduct);
            this.setState({ openModalOrder: true });
          } else {
            this.props.omsResetData();
            this.props.merchantChanged(false);
            this.props.modalChangeMerchant(false);
            this.setState({
              openModalConfirmRemoveCart: false
            });
          }
        }}
        cancel={() => {
          this.props.modalChangeMerchant(false);
          this.setState({ openModalConfirmRemoveCart: false });
        }}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL ORDER === */
  renderModalOrder() {
    return this.state.openModalOrder ? (
      <ModalBottomType7
        open={this.state.openModalOrder}
        title={'Masukan Jumlah'}
        content={
          <PdpOrderView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
        close={() =>
          this.setState({ openModalOrder: false, openWarningCredit: false })
        }
        typeClose={'cancel'}
        warningContent={
          this.state.openWarningCredit ? this.renderWarningContent() : null
        }
      />
    ) : (
      <View />
    );
  }
  renderWarningContent() {
    const allowCreditLimit = this.props.oms?.dataOMSCheckCredit
      ?.allowCreditLimit;
    const freezeStatus = this.props.oms?.dataOMSCheckCredit?.freezeStatus;
    return allowCreditLimit && !freezeStatus ? (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        testID={'view-warning-credit'}
      >
        <MaterialIcon name={'info'} size={24} color={'white'} />
        <View style={{ marginLeft: 12 }}>
          <Text style={Fonts.type35}>Toko Ini Telah Melewati Limit Kredit</Text>
          <Text style={Fonts.type94}>
            Selesaikan pembayaran sebelumnya terlebih dahulu
          </Text>
        </View>
      </View>
    ) : null;
  }
  /** === RENDER MODAL SKU NOT AVAILABLE === */
  renderModalSkuNotAvailable() {
    return this.state.openModalSkuNotAvailable ? (
      <ModalBottomSkuNotAvailable
        open={this.state.openModalSkuNotAvailable}
        onPress={() => this.setState({ openModalSkuNotAvailable: false })}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL FITLER SORT === */
  renderModalSort() {
    return this.state.openModalSort ? (
      <ModalBottomType3
        open={this.state.openModalSort}
        title={'Urutkan'}
        typeClose={'cancel'}
        content={
          <PdpFilterSortView
            sortIndex={this.state.sortIndex}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
        close={() => this.setState({ openModalSort: false })}
      />
    ) : (
      <View />
    );
  }
  /** MODAL ERROR RESPONS */
  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
          this.props.getSalesTeamProcess();
          NavigationService.navigate('MerchantHomeView');
        }}
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderMerchantName()}
        <View style={styles.contentContainer}>{this.renderPdpData()}</View>
        {this.renderFilterSection()}
        {/* order bottom */}
        {this.renderModalOrder()}
        {this.renderModalConfirmDelete()}
        {this.renderToast()}
        {/* filter */}
        {this.renderModalSort()}
        {/* modal */}
        {this.renderModalSkuNotAvailable()}
        {this.renderModalErrorRespons()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    flex: 1
  }
});

const mapStateToProps = ({ pdp, user, global, merchant, oms, profile }) => {
  return { pdp, user, global, merchant, oms, profile };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 11062021
 * updatedFunction:
 * -> add parameter invoiceGroupIds (pdpGetProcess)
 * -> add handle error when failed get sales team.
 *
 */
