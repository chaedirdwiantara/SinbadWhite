import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';
import CartGlobal from '../../components/CartGlobal';
import PdpListDataView from './PdpListDataView';
import PdpOrderView from './PdpOrderView';
import ModalBottomType3 from '../../components/modal_bottom/ModalBottomType3';
import ToastType1 from '../../components/toast/ToastType1';

class PdpSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openOrder: false,
      addProductNotif: false,
      addProductNotifText: '',
      selectedProduct: null,
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
      case 'order':
        this.setState({ openOrder: true, selectedProduct: data.data });
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
   * ====================
   * MODAL
   * ====================
   */
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
  /** ==== MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderPdpData()}
        {/* order bottom */}
        {this.renderModalOrder()}
        {this.renderToast()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth, pdp, global, user }) => {
  return { auth, pdp, global, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpSearchView);
