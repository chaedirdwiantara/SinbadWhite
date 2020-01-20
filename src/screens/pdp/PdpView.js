import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import NavigationService from '../../navigation/NavigationService';
import PdpGridDataView from './PdpGridDataView';
import PdpListDataView from './PdpListDataView';
import PdpLineDataView from './PdpLineDataView';
import PdpFilterView from './PdpFilterView';
import PdpOrderView from './PdpOrderView';
import CartGlobal from '../../components/CartGlobal';
import ModalBottomType3 from '../../components/modal_bottom/ModalBottomType3';
import ToastType1 from '../../components/toast/ToastType1';
import PdpFilterSortView from './PdpFitlerSortView';
import SelectedMerchantName from '../../components/SelectedMerchantName';
import ModalConfirmation from '../../components/modal/ModalConfirmation';

class PdpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** for modal */
      openOrder: false,
      openModalSort: false,
      openModalConfirmRemoveCart: false,
      /** data */
      layout: 'grid',
      addProductNotif: false,
      addProductNotifText: '',
      selectedProduct: null,
      /** sort */
      sort: 'asc',
      sortBy: 'name',
      sortIndex: null
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.pdpGetReset();
    this.props.pdpGetProcess({
      page: 0,
      loading: true,
      sort: this.state.sort,
      sortBy: this.state.sortBy,
      search: this.props.global.search,
      supplierId: this.props.user.userSuppliers.map(item => item.supplierId)
    });
  }
  /** === DID UPDATE */
  componentDidUpdate(prevState) {
    if (prevState.global.search !== this.props.global.search) {
      if (this.props.global.search === '') {
        this.props.pdpGetReset();
        this.props.pdpGetProcess({
          page: 0,
          loading: true,
          sort: 'asc',
          sortBy: 'name',
          search: this.props.global.search,
          supplierId: this.props.user.userSuppliers.map(item => item.supplierId)
        });
      }
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
      case 'order':
        if (
          this.props.merchant.merchantChanged &&
          this.props.oms.dataCart.length > 0
        ) {
          this.setState({
            openModalConfirmRemoveCart: true,
            selectedProduct: data.data
          });
        } else {
          this.setState({ openOrder: true, selectedProduct: data.data });
        }
        break;
      case 'addProduct':
        this.setState({
          openOrder: false,
          addProductNotif: true,
          addProductNotifText: 'Produk berhasil ditambahkan ke keranjang'
        });
        setTimeout(() => {
          this.setState({ addProductNotif: false });
        }, 3000);
        break;
      case 'sortSelected':
        this.setState({
          openModalSort: false,
          sortIndex: data.data.sortIndex,
          sort: data.data.sort,
          sortBy: data.data.sortBy
        });
        this.props.pdpGetReset();
        this.props.pdpGetProcess({
          page: 0,
          loading: true,
          sort: data.data.sort,
          sortBy: data.data.sortBy,
          search: this.props.global.search,
          supplierId: this.props.user.userSuppliers.map(item => item.supplierId)
        });
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
  /** === EMPTY PDP === */
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
            <MaterialIcon
              color={masterColor.fontWhite}
              name={'search'}
              size={24}
            />
          </TouchableOpacity>
          <View style={{ marginRight: 16, marginLeft: 12 }}>
            <CartGlobal />
          </View>
        </View>
      )
    };
  };

  renderModalOrder() {
    return this.state.openOrder ? (
      <ModalBottomType3
        open={this.state.openOrder}
        title={'Masukan Jumlah'}
        content={
          <PdpOrderView
            data={this.state.selectedProduct}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
        close={() => this.setState({ openOrder: false })}
        typeClose={'cancel'}
      />
    ) : (
      <View />
    );
  }

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
  /** RENDER MODAL CONFIRM DELETE CART */
  renderModalConfirmDelete() {
    return this.state.openModalConfirmRemoveCart ? (
      <ModalConfirmation
        title={'Lanjutkan membuat keranjang baru?'}
        open={this.state.openModalConfirmRemoveCart}
        content={
          'Menambahkan produk ini akan menghapus keranjang Anda sebelumnya. Apakah Anda Setuju ?'
        }
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalConfirmRemoveCart: false, openOrder: true });
          this.props.omsResetData();
          this.props.merchantChanged(false);
        }}
        cancel={() => this.setState({ openModalConfirmRemoveCart: false })}
      />
    ) : (
      <View />
    );
  }

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
  /** RENDER HEADER NAME OF MERCHANT */
  renderMerchantName() {
    return <SelectedMerchantName lines />;
  }

  /** MAIN */
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    flex: 1
  }
});

const mapStateToProps = ({ pdp, user, global, merchant, oms }) => {
  return { pdp, user, global, merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpView);
