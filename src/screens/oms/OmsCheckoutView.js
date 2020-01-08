import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';

const { width, height } = Dimensions.get('window');

class OmsCheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** data */
      parcels: [],
      /** modal */
      openModalBackToCartItem: false,
      openModalConfirmOrder: false
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => state.params.handleBackPressFromRN()}
        >
          <MaterialIcon
            color={masterColor.fontWhite}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** DID MOUNT */
  componentDidMount() {
    this.navigationFunction();
    this.modifyParcel();
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (
      prevProps.oms.dataOmsConfirmOrder !== this.props.oms.dataOmsConfirmOrder
    ) {
      if (this.props.oms.dataOmsConfirmOrder !== null) {
        this.backToMerchantHomeView(
          this.props.merchant.selectedMerchant.store.name
        );
      }
    }
  }
  /** WILL UNMOUNT */
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  /** ====== DID MOUNT FUNCTION ========== */
  /** NAVIGATION FUNCTION */
  navigationFunction() {
    this.props.navigation.setParams({
      handleBackPressFromRN: () => this.handleBackPress()
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  /** MODIFY STATE DATA FUNCTION (PARCEL) */
  modifyParcel() {
    const parcels = this.props.oms.dataOmsGetCheckoutItem.orderParcels.map(
      item => {
        return {
          orderParcelId: parseInt(item.id, 10),
          paymentTypeSupplierMethodId: 1
        };
      }
    );
    this.setState({ parcels });
  }
  /** ======= DID UPDATE FUNCTION ==== */
  backToMerchantHomeView(storeName) {
    NavigationService.navigate('MerchantHomeView', {
      storeName
    });
  }
  /** BACK BUTTON RN PRESS HANDLING */
  handleBackPress = () => {
    this.setState({ openModalBackToCartItem: true });
  };
  /** BACK BUTTON HARDWARE PRESS HANDLING */
  handleHardwareBackPress = () => {
    this.setState({ openModalBackToCartItem: true });
    return true;
  };
  /** BACK TO CART VIEW */
  backToCartItemView() {
    NavigationService.navigate('OmsCartView');
    this.props.omsDeleteCartItemProcess({
      orderId: this.props.oms.dataOmsGetCheckoutItem.id
    });
  }
  /** CHECKOUT BUTTON PRESS */
  wantToConfirmOrder() {
    this.setState({ openModalConfirmOrder: true });
  }
  /** CONFIRM ORDER */
  confirmOrder() {
    this.props.omsConfirmOrderProcess({
      orderId: this.props.oms.dataOmsGetCheckoutItem.id,
      parcels: this.state.parcels
    });
  }
  /**
   * ==========================
   * RENDER VIEW
   * ==========================
   */
  /**
   * ==========================
   * MAIN CONTENT
   * ==========================
   */
  /** === RENDER ADDRESS === */
  renderAddress() {
    return (
      <View>
        <Text>this for address</Text>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderMainContent() {
    return (
      <View>
        <Text>this for address</Text>
      </View>
    );
  }
  /** === RENDER DATA === */
  renderData() {
    return (
      <View style={styles.contentContainer}>
        {this.renderAddress()}
        {this.renderMainContent()}
      </View>
    );
  }
  /**
   * ====================
   * TOTAL BOTTOM
   * ====================
   */
  /** === RENDER TOTAL BOTTOM VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <Text>lala</Text>
      </View>
    );
  }
  /** === RENDER TOTAL BOTTOM CHECK LIST === */
  renderBottomCheckList() {
    return (
      <View style={{ flex: 1 }}>
        <Text>lala</Text>
      </View>
    );
  }
  /** === RENDER BUTTON CHECKOUT === */
  renderCheckoutButton() {
    return (
      <ButtonSingleSmall
        disabled={false}
        onPress={() => this.wantToConfirmOrder()}
        title={'Buat Pesanan'}
        borderRadius={4}
      />
    );
  }
  /** === RENDER TOTAL BOTTOM === */
  renderTotalBottom() {
    return (
      <View style={styles.totalContainer}>
        {this.renderBottomCheckList()}
        {this.renderBottomValue()}
        {this.renderCheckoutButton()}
      </View>
    );
  }
  /**
   * ========================
   * MODAL
   * ========================
   */
  /** BACK TO CART */
  renderModalConfirmationBackToCart() {
    return this.state.openModalBackToCartItem ? (
      <ModalConfirmation
        open={this.state.openModalBackToCartItem}
        content={'Yakin ingin kembali ke keranjang dan membatalkan checkout ?'}
        type={'okeNotRed'}
        ok={() => {
          this.setState({ openModalBackToCartItem: false });
          setTimeout(() => {
            this.backToCartItemView();
          }, 100);
        }}
        cancel={() => this.setState({ openModalBackToCartItem: false })}
      />
    ) : (
      <View />
    );
  }
  /** CONFIRM ORDER */
  renderModalConfirmationConfirmOrder() {
    return this.state.openModalConfirmOrder ? (
      <ModalConfirmation
        open={this.state.openModalConfirmOrder}
        content={'Lanjutkan untuk buat Pesanan Anda sekarang ?'}
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalConfirmOrder: false });
          setTimeout(() => {
            this.confirmOrder();
          }, 100);
        }}
        cancel={() => this.setState({ openModalConfirmOrder: false })}
      />
    ) : (
      <View />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderData()}
        {this.renderTotalBottom()}
        {/* modal */}
        {this.renderModalConfirmationBackToCart()}
        {this.renderModalConfirmationConfirmOrder()}
      </View>
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
  },
  totalContainer: {
    height: 0.09 * height,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  }
});

const mapStateToProps = ({ oms, merchant }) => {
  return { oms, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OmsCheckoutView);

/**
 * =====================
 * NOTES
 * ====================
 * - parcels object
 * parcels: [
 *  {
 *    orderParcelId: number,
 *    paymentTypeSupplierMethodId: number
 *  }
 * ]
 */
