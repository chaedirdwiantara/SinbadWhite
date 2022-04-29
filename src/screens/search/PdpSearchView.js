import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  SearchBarType3,
  CartGlobal,
  ToastType1,
  ModalConfirmation,
  ModalBottomSkuNotAvailable,
  ModalBottomType7
} from '../../library/component';
import { Color } from '../../config';
import { Fonts } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import PdpSearchListDataView from './PdpSearchListDataView';
import PdpOrderView from '../pdp/PdpOrderView';

class PdpSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** for modal */
      openModalOrder: false,
      openModalSkuNotAvailable: false,
      openModalSort: false,
      openModalConfirmRemoveCart: false,
      addProductNotif: false,
      addProductNotifText: '',
      selectedProduct: null,
      openWarningCredit: false,
      invoiceGroupId: 0,
      /** sort */
      sort: 'asc',
      sortBy: 'name'
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
        <View style={{ width: '100%' }}>
          <SearchBarType3 placeholder={'Cari sku, nomor sku'} />
        </View>
      ),
      headerRight: () => (
        <View style={{ marginRight: 16 }}>
          <CartGlobal />
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
    this.props.pdpSearchGetReset();
    this.getPdp({ page: 0, loading: true });
  }
  /** === DID UPDATE */
  componentDidUpdate(prevState) {
    if (prevState.global.search !== this.props.global.search) {
      this.props.pdpSearchGetReset();
      this.getPdp({ page: 0, loading: true });
    }
  }
  /** === FETCH DATA (THIS FOR ALL FITLER) === */
  getPdp(data) {
    const { dataSalesTeam } = this.props.profile;
    this.props.pdpSearchGetProcess({
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
  /**  === CALLED FROM CHILD === */
  parentFunction(data) {
    switch (data.type) {
      /** => 'pesan' buttom press (from child) if bundle */
      case 'goToBundlePage':
        this.props.pdpGetDetailProcess(data.data);
        NavigationService.navigate('PdpBundleView');
        break;
      /** => 'pesan' buttom press (from child) */
      case 'openModalOrder':
        if (this.props.merchant.merchantChanged) {
          if (this.props.oms.dataCart.length > 0) {
            this.setState({
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

            this.props.merchantChanged(false);
            this.props.pdpGetDetailProcess(data.data);
            this.setState({ openModalOrder: true });
          }
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
        this.props.pdpSearchGetRefresh();
        this.getPdp({ page: 0, loading: true });
        break;
      /** => load more (from child) */
      case 'loadMore':
        if (this.props.pdp.dataGetSearchPdp) {
          if (
            this.props.pdp.dataGetSearchPdp.length <
            this.props.pdp.totalDataGetPdp
          ) {
            const page = this.props.pdp.pageGetSearchPdp + 10;
            this.props.pdpSearchGetLoadMore(page);
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
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  renderPdpData() {
    return this.props.global.search !== '' ? (
      <PdpSearchListDataView
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        sort={this.state.sort}
        sortBy={this.state.sortBy}
      />
    ) : (
      <View />
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
        content={
          'Menambahkan produk ini ke keranjang akan menghapus SKU sebelumnya. Apakah Anda Setuju ?'
        }
        type={'okeRed'}
        ok={() => {
          this.setState({
            openModalConfirmRemoveCart: false,
            openModalOrder: true
          });
          this.props.omsResetData();
          this.props.merchantChanged(false);
          const invoiceGroupId = this.state.invoiceGroupId;
          const storeId = this.props.merchant?.selectedMerchant?.storeId;
          this.props.OMSCheckCreditProcess({
            invoiceGroupId: parseInt(invoiceGroupId, 10),
            storeId: parseInt(storeId, 10)
          });
          this.props.pdpGetDetailProcess(this.state.selectedProduct);
          this.setState({ openModalOrder: true });
        }}
        cancel={() => this.setState({ openModalConfirmRemoveCart: false })}
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
  /** === RENDER WARNING CREDIT LIMIT === */
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
  /** ==== MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderPdpData()}
        {/* toast */}
        {this.renderToast()}
        {/* modal */}
        {this.renderModalSkuNotAvailable()}
        {this.renderModalOrder()}
        {this.renderModalConfirmDelete()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ pdp, global, user, merchant, oms, profile }) => {
  return { pdp, global, user, merchant, oms, profile };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpSearchView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 11062021
 * updatedFunction:
 * -> add parameter invoiceGroupIds (pdpSearchGetProcess)
 *
 */
