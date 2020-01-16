import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import GlobalStyles from '../../helpers/GlobalStyle';
import { MoneyFormat } from '../../helpers/NumberFormater';
import ModalBottomPaymentType from './ModalBottomPaymentType';
import ModalTAndR from './ModalTAndR';
import ModalBottomPaymentMethod from './ModalBottomPaymentMethod';
import ModalBottomPaymentMethodDetail from './ModalBottomPaymentMethodDetail';
import ModalBottomListProduct from './ModalBottomListProduct';
import ModalBottomParcelDetail from './ModalBottomParcelDetail';
import ModalWarning from './ModalWarning';
import ModalBottomStockConfirmationConfirmOrder from './ModalBottomStockConfirmationConfirmOrder';
import ModalBottomErrorMinimumOrder from './ModalBottomErrorMinimumOrder';

const { width, height } = Dimensions.get('window');

class OmsCheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** data */
      parcels: [],
      orderProduct: [],
      dataOmsGetCheckoutItem: this.props.oms.dataOmsGetCheckoutItem,
      selectedParcelIdForPayment: null,
      selectedParcel: null,
      openSubTotal: null,
      /** modal */
      openModalBackToCartItem: false,
      openModalConfirmOrder: false,
      modalPaymentTypeList: false,
      buttonCheckoutDisabled: false,
      modalDeleteConfirmation: false,
      modalToCheckoutConfirmation: false,
      modalPaymentTypeMethod: false,
      modalPaymentMethodDetail: false,
      modalParcelDetail: false,
      modalStockConfirmation: false,
      modalStockConfirmationConfirmOrder: false,
      modalTAndR: false,
      modalConfirmOrder: false,
      modalProductList: false,
      modalErrorMinimumOrder: false,
      modalWarningNotSelectPayment: false,
      modalErrorBalance: false,
      modalErrorPayment: false,
      modalErrorGlobal: false,
      orderPerParcel: null,
      makeConfirmOrder: false,
      selectedParcelDetail: null,
      selectedPaymentType: null,
      paymentMethodDetail: null,
      loading: false
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
    // this.modifyParcel();
    // this.orderProductList();
    if (this.state.dataOmsGetCheckoutItem !== null) {
      this.modifyDataForList();
    }
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
    /** ERROR */
    if (
      prevProps.oms.errorOmsConfirmOrder !== this.props.oms.errorOmsConfirmOrder
    ) {
      if (this.props.oms.errorOmsConfirmOrder !== null) {
        this.setState({ loading: false });
        if (
          this.props.oms.errorOmsConfirmOrder.code === 400 &&
          this.props.oms.errorOmsConfirmOrder.data
        ) {
          if (
            this.props.oms.errorOmsConfirmOrder.data.errorCode === 'ERR-STATUS'
          ) {
            this.setState({ modalStockConfirmationConfirmOrder: true });
            this.modifyDataCheckBoxlistCart();
          }
          if (
            this.props.oms.errorOmsConfirmOrder.data.errorCode ===
            'ERR-MIN-ORDER'
          ) {
            this.setState({ modalErrorMinimumOrder: true });
            this.modifyItemCataloguesCheckout();
          }
          if (
            this.props.oms.errorOmsConfirmOrder.data.errorCode === 'ERR-BALANCE'
          ) {
            this.modifyParcelData();
            this.setState({ modalErrorBalance: true });
            setTimeout(() => {
              this.setState({ modalErrorBalance: false });
            }, 3000);
          }
          if (
            this.props.oms.errorOmsConfirmOrder.data.errorCode ===
            'ERR-PAYMENT-STATUS'
          ) {
            this.modifyParcelData();
            this.setState({ modalErrorPayment: true });
            setTimeout(() => {
              this.setState({ modalErrorPayment: false });
            }, 2000);
          }
        } else {
          this.setState({ modalErrorGlobal: true });
        }
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
        let paymentTypeSupplierMethodId = null;
        let paymentMethodDetail = null;
        let paymentTypeDetail = null;
        let error = false;
        if (this.state.parcels.length > 0) {
          const itemParcelFind = this.state.parcels.find(
            itemParcel => itemParcel.orderParcelId === item.id
          );
          if (itemParcelFind !== undefined) {
            paymentTypeSupplierMethodId =
              itemParcelFind.paymentTypeSupplierMethodId;
            paymentMethodDetail = itemParcelFind.paymentMethodDetail;
            paymentTypeDetail = itemParcelFind.paymentTypeDetail;
            error = itemParcelFind.error;
          }
        }
        return {
          orderParcelId: parseInt(item.id, 10),
          paymentTypeSupplierMethodId,
          paymentMethodDetail,
          paymentTypeDetail,
          error
        };
      }
    );
    this.setState({ parcels });
  }

  modifyParcelData() {
    const parcels = this.state.parcels;
    this.props.oms.errorOmsConfirmOrder.data.errorData.map(item => {
      const indexParcels = parcels.findIndex(
        itemParcels => itemParcels.orderParcelId === item.parcelId
      );
      if (indexParcels > -1) {
        parcels[indexParcels].error = true;
      }
    });
    this.setState({ parcels });
  }

  /**
   * global function for componentDidMount and componentDidUpdate
   * modifikasi data untuk render data parcel dan image
   */
  modifyDataForList() {
    const orderProduct = [];
    const parcels = [];
    this.state.dataOmsGetCheckoutItem.orderParcels.forEach(item => {
      let paymentTypeSupplierMethodId = null;
      let paymentMethodDetail = null;
      let paymentTypeDetail = null;
      let error = false;
      if (this.state.parcels.length > 0) {
        const itemParcelFind = this.state.parcels.find(
          itemParcel => itemParcel.orderParcelId === parseInt(item.id, 10)
        );
        if (itemParcelFind !== undefined) {
          paymentTypeSupplierMethodId =
            itemParcelFind.paymentTypeSupplierMethodId;
          paymentMethodDetail = itemParcelFind.paymentMethodDetail;
          paymentTypeDetail = itemParcelFind.paymentTypeDetail;
          error = itemParcelFind.error;
        }
      }
      const data = {
        orderParcelId: parseInt(item.id, 10),
        paymentTypeSupplierMethodId,
        paymentMethodDetail,
        paymentTypeDetail,
        error
      };
      parcels.push(data);
      item.orderBrands.forEach(itemBrand => {
        for (let i = 0; i < itemBrand.orderBrandCatalogues.length; i++) {
          const productItem = itemBrand.orderBrandCatalogues[i];
          orderProduct.push(productItem);
        }
      });
    });
    this.setState({ orderProduct, parcels });
  }

  /**
   * jika terjadi error status (product habis saat confirm order)
   * product tersebut harus di modif pada reducer dataCheckBoxlistCart
   * agar saat kembali ke cart, data tersebut berada pada list error product
   */
  modifyDataCheckBoxlistCart() {
    const dataCheckBoxlistCart = this.props.oms.dataCheckBoxlistCart;
    if (this.props.oms.errorOmsConfirmOrder.data.orderData !== null) {
      this.props.oms.errorOmsConfirmOrder.data.errorData.map(
        itemOrderBrandCatalogues => {
          const indexDataCheckBoxlistCart = dataCheckBoxlistCart.findIndex(
            itemDataCheckBoxlistCart =>
              itemDataCheckBoxlistCart.catalogue.id ===
              itemOrderBrandCatalogues.catalogue.id
          );
          if (indexDataCheckBoxlistCart > -1) {
            dataCheckBoxlistCart[indexDataCheckBoxlistCart].statusInCart =
              'unavailable';
            dataCheckBoxlistCart[indexDataCheckBoxlistCart].checkBox = true;
          }
        }
      );
      // this.props.omsCheckListCart(dataCheckBoxlistCart);
    } else {
      dataCheckBoxlistCart.map(item => {
        item.statusInCart = 'unavailable';
        item.checkBox = true;
      });
      // this.props.omsCheckListCart(dataCheckBoxlistCart);
    }
  }

  /**
   * fungsi ini berfungsi untuk modif data itemCataloguesCheckout
   * data tersebut harus sesuai dengan data catalogue yang berhasil di order
   * agar data tersebut dapat dibandingkan dengan data global.cartData
   * sisa dari order yang masih tersisa di keranjang
   */
  modifyItemCataloguesCheckout() {
    const itemCataloguesCheckout = [];
    if (this.props.oms.errorOmsConfirmOrder.data.orderData !== null) {
      this.props.oms.errorOmsConfirmOrder.data.orderData.orderParcels.forEach(
        item => {
          item.orderBrands.forEach(itemOrderBrands => {
            itemOrderBrands.orderBrandCatalogues.map(
              itemOrderBrandCatalogues => {
                const data = {
                  catalogueId: parseInt(
                    itemOrderBrandCatalogues.catalogue.id,
                    10
                  ),
                  qty: parseInt(itemOrderBrandCatalogues.qty, 10)
                };
                itemCataloguesCheckout.push(data);
              }
            );
          });
        }
      );
    } else {
      this.props.omsCheckoutItem(itemCataloguesCheckout);
    }
  }

  checkTerm(selectedPaymentType) {
    if (selectedPaymentType.paymentType.terms !== null) {
      this.setState({
        modalPaymentTypeList: false,
        modalTAndR: true,
        selectedPaymentType
      });
    } else {
      this.setState({ modalPaymentTypeList: false, selectedPaymentType });
      this.openPaymentMethod(selectedPaymentType);
    }
  }

  openSeeMore(item) {
    this.setState({
      selectedParcelDetail: item,
      modalParcelDetail: true
    });
  }

  openPaymentType(item) {
    this.setState({
      modalPaymentTypeList: true,
      selectedParcel: item.id,
      selectedParcelIdForPayment: item.id
    });
  }

  openPaymentMethod(selectedPaymentType) {
    this.setState({
      modalTAndR: false,
      selectedPaymentType,
      modalPaymentTypeMethod: true
    });
  }

  openPaymentMethodDetail(paymentMethodDetail) {
    this.setState({
      paymentMethodDetail,
      modalPaymentTypeMethod: false,
      modalPaymentMethodDetail: true
    });
  }

  renderTotalPriceValue() {
    const mapParcel = this.state.dataOmsGetCheckoutItem.orderParcels.map(
      item => item.parcelDetails.totalNettPrice
    );
    return mapParcel.reduce((a, b) => a + b, 0);
  }

  selectedPayment(item) {
    const parcels = this.state.parcels;
    if (this.state.parcels.length > 0 && this.state.selectedParcel !== null) {
      const indexParcel = parcels.findIndex(
        itemParcels =>
          itemParcels.orderParcelId === parseInt(this.state.selectedParcel, 10)
      );
      if (indexParcel > -1) {
        parcels[indexParcel].paymentTypeSupplierMethodId = parseInt(
          item.id,
          10
        );
        parcels[indexParcel].paymentTypeDetail = this.state.selectedPaymentType;
        parcels[indexParcel].paymentMethodDetail = item;
        parcels[indexParcel].error = false;
      }
      this.setState({ parcels, modalPaymentMethodDetail: false });
    }
  }

  openSubTotal(item, index) {
    if (this.state.openSubTotal === index) {
      this.setState({ openSubTotal: null });
    } else {
      this.setState({ openSubTotal: index });
    }
  }
  /** MODIFY STATE DATA FUNCTION (PRODUCT LIST) */
  orderProductList() {
    const orderProduct = [];
    this.props.oms.dataOmsGetCheckoutItem.orderParcels.map(item => {
      item.orderBrands.forEach(itemBrand => {
        for (let i = 0; i < itemBrand.orderBrandCatalogues.length; i++) {
          const productItem = itemBrand.orderBrandCatalogues[i];
          orderProduct.push(productItem);
        }
      });
    });
    this.setState({ orderProduct });
  }
  /** ======= DID UPDATE FUNCTION ==== */
  backToMerchantHomeView(storeName) {
    /** UPDATE TASK ORDER */
    this.props.merchantPostActivityProcess({
      journeyPlanSaleId: this.props.merchant.selectedMerchant.id,
      activity: 'order'
    });
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
    this.setState({ makeConfirmOrder: true });
    if (
      this.state.parcels.find(
        item => item.paymentTypeSupplierMethodId === null
      ) === undefined
    ) {
      this.setState({ openModalConfirmOrder: true });
    } else {
      this.setState({ modalWarningNotSelectPayment: true });
      setTimeout(() => {
        this.setState({ modalWarningNotSelectPayment: false });
      }, 2000);
    }
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
  renderImageContent(itemParcel) {
    return this.state.orderProduct.filter(
      item => item.parcelId === itemParcel.id
    );
  }

  renderOpenSubTotal(item, index) {
    return this.state.openSubTotal === index ? (
      <View
        style={{
          paddingRight: 16,
          paddingLeft: 40
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5
          }}
        >
          <View>
            <Text style={Fonts.type17}>
              Total Barang (
              {
                this.state.orderProduct.filter(
                  itemOrderProduct => itemOrderProduct.parcelId === item.id
                ).length
              }
              )
            </Text>
          </View>
          <View>
            <Text style={Fonts.type17}>
              {MoneyFormat(item.parcelDetails.totalGrossPrice)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={Fonts.type17}>PPN 10%</Text>
          </View>
          <View>
            <Text style={Fonts.type17}>
              {MoneyFormat(item.parcelDetails.tax)}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderListProductImage(itemParcel) {
    return this.renderImageContent(itemParcel).map((item, index) => {
      return index < 3 ? (
        <View key={index} style={{ paddingHorizontal: 5 }}>
          <Image
            defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
            source={{
              uri: item.catalogue.catalogueImages[0].imageUrl
            }}
            style={GlobalStyles.image77}
          />
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderPlusProduct(itemParcel) {
    return this.state.orderProduct.filter(
      item => item.parcelId === itemParcel.id
    ).length > 3 ? (
      <View>
        <Text style={Fonts.type49}>
          (+
          {this.state.orderProduct.filter(
            item => item.parcelId === itemParcel.id
          ).length - 3}{' '}
          Produk Lain)
        </Text>
      </View>
    ) : (
      <View />
    );
  }
  /**
   * ==========================
   * MAIN CONTENT
   * ==========================
   */
  /** === RENDER ADDRESS === */
  renderAddress() {
    const store = this.props.merchant.selectedMerchant.store;
    return (
      <View style={[styles.boxAddress, GlobalStyles.shadowBottom]}>
        <View style={styles.boxTitle}>
          <Text style={Fonts.type48}>Alamat Pengiriman</Text>
        </View>
        <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
        <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={Fonts.type16}>{store.name}</Text>
            </View>
            {/* <View>
            <Text style={Fonts.type28}>Ganti Alamat</Text>
          </View> */}
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={Fonts.type47}>Alamat 1 (default)</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Address
              font={Fonts.type46}
              address={store.address}
              urban={store.urban}
            />
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderSubTotal(item, index) {
    return (
      <TouchableOpacity
        style={styles.boxSubTotal}
        onPress={() => this.openSubTotal(item, index)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.state.openSubTotal === index ? (
            <MaterialIcon name="keyboard-arrow-up" size={24} />
          ) : (
            <MaterialIcon name="keyboard-arrow-down" size={24} />
          )}

          <Text style={Fonts.type50}>Sub Total</Text>
        </View>
        <View>
          <Text style={Fonts.type50}>
            {MoneyFormat(item.parcelDetails.totalNettPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderListOrder() {
    return this.state.dataOmsGetCheckoutItem.orderParcels.map((item, index) => {
      return (
        <View key={index}>
          <View style={GlobalStyles.boxPadding} />
          <View
            style={[styles.boxListProductInCart, GlobalStyles.shadowForBox]}
          >
            <View style={{ paddingBottom: 8, paddingHorizontal: 16 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <View>
                  <Text style={Fonts.type48}>{item.invoiceGroup.name}</Text>
                </View>
                <TouchableOpacity onPress={() => this.openSeeMore(item)}>
                  <Text style={Fonts.type14}>Lihat lebih</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                justifyContent: 'space-between'
              }}
              onPress={() =>
                this.setState({ modalProductList: true, orderPerParcel: item })
              }
            >
              <View style={{ flexDirection: 'row' }}>
                {this.renderListProductImage(item)}
              </View>
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                {this.renderPlusProduct(item)}
              </View>
            </TouchableOpacity>
            {this.renderRincianPengiriman()}
            {this.renderMetodePembayaran(item)}
            {this.state.openSubTotal === index ? (
              <View style={{ paddingTop: 10 }}>
                {this.renderOpenSubTotal(item, index)}
              </View>
            ) : (
              <View />
            )}
            {this.renderSubTotal(item, index)}
          </View>
        </View>
      );
    });
  }
  /** === RINCIAN PENGIRIMAN === */
  renderRincianPengiriman() {
    return (
      <View>
        <View style={{ paddingLeft: 16, paddingBottom: 5, paddingTop: 10 }}>
          <Text style={Fonts.type50}>Rincian Pengiriman</Text>
        </View>

        <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={Fonts.type17}>(± 3 hari)</Text>
            <Text style={Fonts.type17}>Self Delivery</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={Fonts.type51}>FREE ONGKIR</Text>
          </View>
        </View>
      </View>
    );
  }
  /** SELECTED PAYMNENT */
  renderSelectedPayment(item) {
    const indexParcel = this.state.parcels.findIndex(
      itemParcel =>
        itemParcel.orderParcelId === parseInt(item.id, 10) &&
        itemParcel.paymentTypeSupplierMethodId !== null
    );
    return indexParcel > -1 ? (
      <View>
        {this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
          .name === 'Tunai' ? (
          <Text style={Fonts.type17}>
            {this.state.parcels[indexParcel].paymentTypeDetail.paymentType.name}{' '}
            -{' '}
            {
              this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
                .name
            }
          </Text>
        ) : (
          <Text style={Fonts.type17}>
            {this.state.parcels[indexParcel].paymentTypeDetail.paymentType.name}{' '}
            -{' '}
            {
              this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
                .name
            }
          </Text>
        )}
      </View>
    ) : (
      <View />
    );
  }
  /** === TIPE PEMBAYARAN === */
  renderMetodePembayaran(item) {
    return (
      <View>
        <View style={{ paddingLeft: 16, paddingBottom: 5, paddingTop: 10 }}>
          <Text style={Fonts.type50}>Tipe Pembayaran</Text>
        </View>
        <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              this.state.makeConfirmOrder &&
              this.state.parcels.findIndex(
                itemParcel =>
                  (itemParcel.orderParcelId === parseInt(item.id, 10) &&
                    itemParcel.paymentTypeSupplierMethodId === null) ||
                  (itemParcel.orderParcelId === parseInt(item.id, 10) &&
                    itemParcel.error)
              ) > -1
                ? 'rgba(240, 68, 76, 0.2)'
                : '#ffffff'
          }}
          onPress={() => this.openPaymentType(item)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 20 }}>
              <Image
                source={require('../../assets/icons/oms/money.png')}
                style={{ height: 24, width: 24 }}
              />
            </View>
            {this.state.parcels.findIndex(
              itemParcel =>
                itemParcel.orderParcelId === parseInt(item.id, 10) &&
                itemParcel.paymentTypeSupplierMethodId === null
            ) > -1 ? (
              <View style={{ paddingVertical: 15 }}>
                <Text style={Fonts.type17}>Pilih Tipe</Text>
              </View>
            ) : (
              <View style={{ paddingVertical: 15 }}>
                {this.renderSelectedPayment(item)}
              </View>
            )}
            {this.state.makeConfirmOrder &&
            this.state.parcels.findIndex(
              itemParcel =>
                (itemParcel.orderParcelId === parseInt(item.id, 10) &&
                  itemParcel.paymentTypeSupplierMethodId === null) ||
                (itemParcel.orderParcelId === parseInt(item.id, 10) &&
                  itemParcel.error)
            ) > -1 ? (
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 5
                }}
              >
                <MaterialIcon name="error" size={15} color={'#f0444c'} />
              </View>
            ) : (
              <View />
            )}
          </View>

          <View>
            <MaterialIcon name="keyboard-arrow-right" size={24} />
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
      </View>
    );
  }
  /** === RENDER DATA === */
  renderData() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderAddress()}
          {this.renderListOrder()}
        </ScrollView>
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
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingRight: 10
          }}
        >
          <View>
            <Text>
              <Text style={Fonts.type9}>Total: </Text>
              <Text style={Fonts.type53}>
                {MoneyFormat(this.renderTotalPriceValue())}
              </Text>
            </Text>
          </View>
          {/* <View>
            <Text style={styles.ongkirText}>Ongkir Rp17.000</Text>
          </View> */}
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON CHECKOUT === */
  renderCheckoutButton() {
    return (
      <ButtonSingleSmall
        disabled={this.props.oms.loadingOmsConfirmOrder}
        loading={this.props.oms.loadingOmsConfirmOrder}
        loadingPadding={33}
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
  /** PAYMENT TYPE */
  renderModalListPaymentType() {
    return (
      <View>
        {this.state.modalPaymentTypeList ? (
          <ModalBottomPaymentType
            open={this.state.modalPaymentTypeList}
            parcelId={this.state.selectedParcelIdForPayment}
            close={() => this.setState({ modalPaymentTypeList: false })}
            onRef={ref => (this.selectPaymentType = ref)}
            selectPaymentType={this.checkTerm.bind(this)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalTAndR() {
    return (
      <View>
        {this.state.modalTAndR && this.state.selectedPaymentType !== null ? (
          <ModalTAndR
            open={this.state.modalTAndR}
            data={this.state.selectedPaymentType}
            close={() => this.setState({ modalTAndR: false })}
            onRef={ref => (this.agreeTAndR = ref)}
            agreeTAndR={this.openPaymentMethod.bind(this)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalListPaymentMethod() {
    return (
      <View>
        {this.state.modalPaymentTypeMethod ? (
          <ModalBottomPaymentMethod
            open={this.state.modalPaymentTypeMethod}
            paymentType={this.state.selectedPaymentType}
            close={() =>
              this.setState({
                modalPaymentTypeMethod: false,
                modalPaymentTypeList: true
              })
            }
            onRef={ref => (this.selectPaymentMethod = ref)}
            selectPaymentMethod={this.openPaymentMethodDetail.bind(this)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalPaymentMethodDetail() {
    return (
      <View>
        {this.state.modalPaymentMethodDetail ? (
          <ModalBottomPaymentMethodDetail
            open={this.state.modalPaymentMethodDetail}
            paymentMethodDetail={this.state.paymentMethodDetail}
            close={() =>
              this.setState({
                modalPaymentMethodDetail: false,
                modalPaymentTypeMethod: true
              })
            }
            onRef={ref => (this.selectedPayment = ref)}
            selectedPayment={this.selectedPayment.bind(this)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalListProduct() {
    return (
      <View>
        {this.state.modalProductList ? (
          <ModalBottomListProduct
            open={this.state.modalProductList}
            data={this.state.orderPerParcel}
            close={() => this.setState({ modalProductList: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalParcelDetail() {
    return (
      <View>
        {this.state.modalParcelDetail ? (
          <ModalBottomParcelDetail
            open={this.state.modalParcelDetail}
            data={this.state.selectedParcelDetail}
            close={() => this.setState({ modalParcelDetail: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  renderWarningNotSelectPayment() {
    return (
      <View>
        {this.state.modalWarningNotSelectPayment ? (
          <ModalWarning
            open={this.state.modalWarningNotSelectPayment}
            content={'Anda belum memilih metode pembayaran'}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalErrorPayment() {
    return (
      <View>
        {this.state.modalErrorPayment ? (
          <ModalWarning
            open={this.state.modalErrorPayment}
            content={'Metode pembayaran yang Anda pilih tidak tersedia'}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalBottomStockConfirmationConfirmOrder() {
    return (
      <View>
        {this.state.modalStockConfirmationConfirmOrder ? (
          <ModalBottomStockConfirmationConfirmOrder
            open={this.state.modalStockConfirmationConfirmOrder}
            backToCart={() => this.backToCartItemView()}
            confirmation={() => {
              this.setState({
                modalStockConfirmationConfirmOrder: false,
                dataOmsGetCheckoutItem: this.props.oms.errorOmsConfirmOrder.data
                  .orderData
              });
              setTimeout(() => {
                this.modifyDataForList();
              }, 100);
            }}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalBottomErrorMinimumOrder() {
    return (
      <View>
        {this.state.modalErrorMinimumOrder &&
        this.state.orderProduct.length > 0 ? (
          <ModalBottomErrorMinimumOrder
            open={this.state.modalErrorMinimumOrder}
            orderProduct={this.state.orderProduct}
            backToCart={() => this.backToCartItemView()}
            confirmation={() => {
              this.setState({
                modalErrorMinimumOrder: false,
                dataOmsGetCheckoutItem: this.props.oms.errorOmsConfirmOrder.data
                  .orderData
              });
              setTimeout(() => {
                this.modifyDataForList();
              }, 100);
            }}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalErrorBalance() {
    return (
      <View>
        {this.state.modalErrorBalance ? (
          <ModalWarning
            open={this.state.modalErrorBalance}
            content={
              'Credit Limit Anda telah sampai ke batas maksimum, Silahkan pilih metode pembayaran lain'
            }
          />
        ) : (
          <View />
        )}
      </View>
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
        {this.renderModalListPaymentType()}
        {this.renderModalListPaymentMethod()}
        {this.renderModalTAndR()}
        {this.renderModalPaymentMethodDetail()}
        {this.renderModalListProduct()}
        {this.renderModalParcelDetail()}
        {this.renderModalErrorPayment()}
        {this.renderWarningNotSelectPayment()}
        {this.renderModalBottomErrorMinimumOrder()}
        {this.renderModalErrorBalance()}
        {this.renderModalBottomStockConfirmationConfirmOrder()}
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  },
  /** for list order */
  boxListProductInCart: {
    backgroundColor: masterColor.backgroundWhite,
    paddingVertical: 10
  },
  /** for sub total */
  boxSubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10
  },
  /** for address */
  boxAddress: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxTitle: {
    paddingLeft: 16,
    paddingVertical: 10
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
