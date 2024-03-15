import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  SearchBarType3,
  CartGlobal,
  ModalBottomType3,
  ToastType1,
  ModalConfirmation,
  ModalBottomSkuNotAvailable
} from '../../library/component';
import { Color } from '../../config';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import PdpListDataView from './PdpListDataView';
import PdpOrderView from './PdpOrderView';

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
      /** sort */
      sort: 'asc',
      sortBy: 'mss_types'
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
    this.props.pdpGetReset();
    this.getPdp({ page: 0, loading: true });
  }
  /** === DID UPDATE */
  componentDidUpdate(prevState) {
    if (prevState.global.search !== this.props.global.search) {
      this.props.pdpGetReset();
      this.getPdp({ page: 0, loading: true });
    }
  }
  /** === FETCH DATA (THIS FOR ALL FITLER) === */
  getPdp(data) {
    this.props.pdpGetProcess({
      page: data.page,
      loading: data.loading,
      sort: data.sort !== undefined ? data.sort : this.state.sort,
      sortBy: data.sortBy !== undefined ? data.sortBy : this.state.sortBy,
      search: this.props.global.search
    });
  }
  /**  === CALLED FROM CHILD === */
  parentFunction(data) {
    switch (data.type) {
      /** => 'pesan' buttom press (from child) if bundle */
      case 'goToBundlePage':
        NavigationService.navigate('PdpBundleView');
        break;
      /** => 'pesan' buttom press (from child) */
      case 'openModalOrder':
        if (
          this.props.merchant.merchantChanged &&
          this.props.oms.dataCart.length > 0
        ) {
          this.setState({
            openModalConfirmRemoveCart: true,
            selectedProduct: data.data
          });
        } else {
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
      <PdpListDataView
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
      <ModalBottomType3
        open={this.state.openModalOrder}
        title={'Masukan Jumlah'}
        content={
          <PdpOrderView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
        close={() => this.setState({ openModalOrder: false })}
        typeClose={'cancel'}
      />
    ) : (
      <View />
    );
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

const mapStateToProps = ({ pdp, global, user, merchant, oms }) => {
  return { pdp, global, user, merchant, oms };
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
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
