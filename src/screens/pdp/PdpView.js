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

class PdpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'grid',
      openOrder: false,
      addProductNotif: false,
      addProductNotifText: '',
      selectedProduct: null
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
      supplierId: this.props.user.userSuppliers[0].supplierId
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
          searchText: this.props.global.search,
          supplierId: this.props.user.userSuppliers[0].supplierId
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
        console.log('filter');
        break;
      case 'filter':
        console.log('filter');
        break;
      case 'category':
        console.log('filter');
        break;
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
  /** === EMPTY PDP === */
  renderPdpData() {
    switch (this.state.layout) {
      case 'grid':
        return (
          <PdpGridDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        );
      case 'list':
        return (
          <PdpListDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        );
      case 'line':
        return (
          <PdpLineDataView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
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

  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        <View style={styles.contentContainer}>{this.renderPdpData()}</View>
        {this.renderFilterSection()}
        {/* order bottom */}
        {this.renderModalOrder()}
        {this.renderToast()}
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

const mapStateToProps = ({ pdp, user, global }) => {
  return { pdp, user, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(PdpView);
