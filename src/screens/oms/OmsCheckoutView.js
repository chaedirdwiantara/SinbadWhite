import {
  React,
  Component,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  Image,
  Text
} from '../../library/reactPackage';
import {
  MaterialIcon,
  bindActionCreators,
  connect,
  Button
} from '../../library/thirdPartyPackage';
import {
  ModalConfirmation,
  ButtonSingleSmall,
  Address,
  ModalWarning,
  ProductListType1,
  ModalBottomErrorRespons,
  ModalBottomSkuNotAvailable
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import ModalBottomPaymentType from './ModalBottomPaymentType';
import ModalTAndR from './ModalTAndR';
import ModalBottomPaymentMethod from './ModalBottomPaymentMethod';
import ModalBottomPaymentMethodDetail from './ModalBottomPaymentMethodDetail';
import ModalBottomListProduct from './ModalBottomListProduct';
import ModalBottomParcelDetail from './ModalBottomParcelDetail';
import ModalBottomStockConfirmationConfirmOrder from './ModalBottomStockConfirmationConfirmOrder';
import ModalBottomErrorMinimumOrder from './ModalBottomErrorMinimumOrder';
import ModalBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import ModalBottomPayLaterType from './ModalBottomPayLaterType';
import ModalConfirmKUR from '../../components/modal_bottom/ModalBottomType4';
import ModalOmsKurWebView from './ModalOmsKurWebView';
import ModalOmsKurAnnouncement from './ModalOmsKurAnnouncement';
import ModalOmsOTPKur from './ModalOmsOTPKur';
import ModalBottomConfirmKur from './ModalBottomConfirmKur';
import { toLocalTime, toUtcTime } from '../../helpers/TimeHelper';
class OmsCheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** data */
      parcels: [],
      alreadyFetchLastPayment: false,
      orderProduct: [],
      dataOmsGetCheckoutItem: this.props.oms.dataOmsGetCheckoutItem,
      selectedParcelIdForPayment: null,
      selectedParcel: null,
      openSubTotal: null,
      paymentMethodDetail: null,
      paymentMethod: null,
      paymentMethodSelected: [],
      dataPaymentMethod: null,
      usingDefault: false,
      changedIndex: [],
      payLaterType: null,
      payLaterTypeId: null,
      selectedPaylaterType: null,
      dataApplicable: null,
      /** modal */
      openModalBackToCartItem: false,
      openModalConfirmOrder: false,
      openModalErrorPaymentTryAgain: false,
      modalPaymentTypeList: false,
      buttonCheckoutDisabled: false,
      modalDeleteConfirmation: false,
      modalToCheckoutConfirmation: false,
      modalPaymentTypeMethod: false,
      modalPaymentMethodDetail: false,
      modalParcelDetail: false,
      modalStockConfirmation: false,
      modalSkuStatusConfirmation: false,
      modalTAndR: false,
      modalConfirmOrder: false,
      modalProductList: false,
      modalErrorMinimumOrder: false,
      modalWarningNotSelectPayment: false,
      modalErrorBalance: false,
      modalErrorPayment: false,
      modalWarningMinimumQty: false,
      modalWarningCheckoutIsExpired: false,
      modalErrorResponse: false,
      openModalErrorGlobal: false,
      orderPerParcel: null,
      makeConfirmOrder: false,
      selectedParcelDetail: null,
      selectedPaymentType: null,
      paymentMethodDetail: null,
      tAndRDetail: null,
      tAndRLoading: false,
      alreadyFetchTAndR: false,
      modalWarningAllCondition: false,
      openModalPaymentNotAllowed: false,
      openModalSKUNotAvailable: false,
      modalPayLaterType: false,
      modalConfirmKUR: false,
      openModalKurWebView: false,
      openModalFailPaylater: false,
      openModalKurAnnouncement: false,
      openModalOmsOtpKur: false,
      modalErrorConsent: false,
      selectedParcelDetailPayment: null
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
  /** === DID MOUNT === */
  componentDidMount() {
    this.navigationFunction();
    if (this.state.dataOmsGetCheckoutItem !== null) {
      this.modifyDataForList();
      if (
        this.props.oms.dataOmsGetCartItem &&
        !this.state.alreadyFetchLastPayment
      ) {
        const orderParcelIds = this.props.oms.dataOmsGetCheckoutItem.orderParcels.map(
          e => parseInt(e.id, 10)
        );

        this.props.omsGetLastPaymentChannelProcess({ orderParcelIds });
        if (this.props.oms.loadingLastPaymentChannel) {
          this.setState({ disabled: true });
        }
        // this.setState({disabled: true});
      }
    }
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (this.props.oms.dataOmsGetTermsConditions !== undefined) {
      if (
        prevProps.oms.dataOmsGetTermsConditions !==
        this.props.oms.dataOmsGetTermsConditions
      ) {
        if (this.props.oms.dataOmsGetTermsConditions !== null) {
          this.setState({
            tAndRDetail: this.props.oms.dataOmsGetTermsConditions.data
          });
        }
      }
    }
    /**
     * === SUCCESS RESPONS ===
     * after confirm order success
     * modify data in permanent data cart (delete all sku order success)
     * back to home view and show success order modal
     */
    if (
      prevProps.oms.dataOmsConfirmOrder !== this.props.oms.dataOmsConfirmOrder
    ) {
      if (this.props.oms.dataOmsConfirmOrder !== null) {
        const isKUR = this.state.parcels
          .filter(data => data.paylaterType)
          .some(data => data.paylaterType.id === 2);
        if (isKUR) {
          setTimeout(() => {
            this.backToMerchantHomeView(
              this.props.merchant.selectedMerchant.name
            );
          }, 3000);
        } else {
          this.backToMerchantHomeView(
            this.props.merchant.selectedMerchant.name
          );
        }
      }
    }
    /**
     * === ERROR RESPONS ===
     * ==> ERROR CODE 400
     * 1. 'ERR-STATUS'
     * 2. 'ERR-BALANCE'
     * 3. 'ERR-PAYMENT-STATUS
     * 4. 'ERR-MIN-ORDER
     */
    if (
      prevProps.oms.errorOmsConfirmOrder !== this.props.oms.errorOmsConfirmOrder
    ) {
      if (this.props.oms.errorOmsConfirmOrder !== null) {
        if (
          this.props.oms.errorOmsConfirmOrder.code === 400 &&
          this.props.oms.errorOmsConfirmOrder.data
        ) {
          this.manageError();
        } else {
          this.setState({ modalErrorResponse: true });
        }
      }
    }

    if (this.props.oms.dataOmsGetPaymentChannel !== undefined) {
      if (
        prevProps.oms.dataOmsGetPaymentChannel !==
        this.props.oms.dataOmsGetPaymentChannel
      ) {
        if (this.props.oms.dataOmsGetPaymentChannel !== null) {
          this.setState({
            paymentMethod: this.props.oms.dataOmsGetPaymentChannel.data
          });
        }
      }
    }
    if (
      this.props.oms.dataLastPaymentChannel !==
        prevProps.oms.dataLastPaymentChannel &&
      this.props.oms.dataLastPaymentChannel &&
      this.props.oms.dataLastPaymentChannel.data &&
      this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels
    ) {
      const paymentMethodSelected = this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels.map(
        e => e.paymentType.id
      );
      const groupIdFromCheckoutItem = this.props.oms.dataOmsGetCheckoutItem.orderParcels.map(
        e => parseInt(e.invoiceGroupId)
      );
      const lastPayemntGroupInvoice = this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels.map(
        e => e.invoiceGroupId
      );
      const parcels = this.state.parcels.map((e, i) => {
        const invoiceGrouId = groupIdFromCheckoutItem[i];
        const lastPaymentIndex = lastPayemntGroupInvoice.indexOf(invoiceGrouId);
        const lastPayment = this.props.oms.dataLastPaymentChannel.data
          .paymentTypeChannels[lastPaymentIndex];
        return lastPaymentIndex > -1
          ? {
              ...e,
              paymentChannel: e.paymentMethodDetail
                ? { ...e.paymentMethodDetail }
                : {
                    ...lastPayment
                  },
              paymentMethodDetail: e.paymentMethodDetail
                ? { ...e.paymentMethodDetail }
                : {
                    ...lastPayment.paymentChannel
                  },
              paymentTypeDetail: e.paymentTypeDetail
                ? { ...e.paymentTypeDetail }
                : {
                    ...lastPayment.paymentType
                  },
              paymentTypeSupplierMethodId:
                lastPayment.paymentTypeSupplierMethodId,
              paylaterType: lastPayment.paylaterType
                ? lastPayment.paylaterType
                : null,
              totalFee: e.paymentMethodDetail
                ? e.paymentMethodDetail.totalFee
                : lastPayment.paymentChannel.totalFee
            }
          : { ...e };
      });
      this.setState({
        disabled: false,
        usingDefault: true,
        paymentMethodSelected,
        parcels
      });
    }

    if (this.props.oms.dataOmsGetTermsConditions !== undefined) {
      if (
        prevProps.oms.dataOmsGetTermsConditions !==
        this.props.oms.dataOmsGetTermsConditions
      ) {
        this.setState({ tAndRLoading: false, alreadyFetchTAndR: true });
        const tAndR = this.props.oms.dataOmsGetTermsConditions;
        if (tAndR !== null) {
          if (
            tAndR.data.paymentChannels == null &&
            tAndR.data.paymentTypes == null
          ) {
            const isKUR = this.state.parcels
              .filter(data => data.paylaterType)
              .some(data => data.paylaterType.id === 2);
            if (isKUR === true) {
              const storeId = parseInt(
                this.state.dataOmsGetCheckoutItem.storeId,
                10
              );
              const orderId = parseInt(
                this.props.oms.dataOmsGetCheckoutItem.id,
                10
              );
              const parcels = this.state.parcels.map((e, i) => ({
                orderParcelId: e.orderParcelId,
                paymentTypeSupplierMethodId: e.hasOwnProperty('paymentChannel')
                  ? e.paymentChannel.paymentTypeSupplierMethodId
                  : e.paymentTypeSupplierMethodId,
                paymentTypeId: e.paymentTypeDetail.hasOwnProperty(
                  'paymentTypeId'
                )
                  ? parseInt(e.paymentTypeDetail.paymentTypeId, 10)
                  : parseInt(e.paymentTypeDetail.id, 10),
                paymentChannelId: e.paymentMethodDetail.id,
                paylaterTypeId: e.paylaterType.id ? e.paylaterType.id : null
              }));
              NavigationService.navigate('OmsOtpKurView', {
                storeId,
                orderId,
                parcels
              });
            } else {
              this.confirmOrder();
            }
          } else {
            this.setState({ modalTAndR: true });
          }
        }
      }
    }

    if (this.props.oms.dataOmsGetPayLaterType !== undefined) {
      if (
        prevProps.oms.dataOmsGetPayLaterType !==
        this.props.oms.dataOmsGetPayLaterType
      ) {
        if (this.props.oms.dataOmsGetPayLaterType !== null) {
          this.setState({
            payLaterType: this.props.oms.dataOmsGetPayLaterType.data
          });
        }
      }
    }

    //for otp kur consent
    if (this.props.oms.dataOmsPostKurConsent !== undefined) {
      if (
        prevProps.oms.dataOmsPostKurConsent !==
        this.props.oms.dataOmsPostKurConsent
      ) {
        if (this.props.oms.dataOmsPostKurConsent.code === 200) {
          this.setState({
            modalPaylaterType: true,
            modalConfirmKUR: false,
            openModalKurWebView: true
          });
        }
      }
    }

    if (
      prevProps.oms.errorOmsPostKurConsent !==
      this.props.oms.errorOmsPostKurConsent
    ) {
      if (this.props.oms.errorOmsPostKurConsent !== null) {
        this.setState({ modalErrorConsent: true, modalConfirmKUR: false });
        // this.errorOtpConsent()
      }
    }

    //HANDLE ERROR ORDER PARCEL EXPIRED
    if (
      prevProps.oms.errorOmsGetPayment !== this.props.oms.errorOmsGetPayment
    ) {
      if (
        this.props.oms.errorOmsGetPayment &&
        this.props.oms.errorOmsGetPayment.code === 404
      ) {
        this.handleErrorOrderParcelExpired();
      }
    }
    if (
      prevProps.oms.errorOmsGetPaymentChannel !== this.props.oms.errorOmsGetPaymentChannel
    ) {
      if (
        this.props.oms.errorOmsGetPaymentChannel &&
        this.props.oms.errorOmsGetPaymentChannel.code === 404
      ) {
        this.handleErrorOrderParcelExpired();
      }
    }
    if (
      prevProps.oms.errorOmsGetPaylater !== this.props.oms.errorOmsGetPaylater
    ) {
      if (
        this.props.oms.errorOmsGetPaylater &&
        this.props.oms.errorOmsGetPaylater.code === 404
      ) {
        this.handleErrorOrderParcelExpired();
      }
    }
  }
  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  /**
   * =======================
   * NAVIGATION FUNCTION
   * ======================
   */
  navigationFunction() {
    this.props.navigation.setParams({
      handleBackPressFromRN: () => this.handleBackPress()
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }
  /** === BACK BUTTON RN PRESS HANDLING === */
  handleBackPress = () => {
    this.setState({ openModalBackToCartItem: true });
  };
  /** === BACK BUTTON HARDWARE PRESS HANDLING === */
  handleHardwareBackPress = () => {
    this.setState({ openModalBackToCartItem: true });
    return true;
  };
  /**
   * =======================
   * CONFIRM ORDER
   * =======================
   */
  /** === CHECKOUT BUTTON PRESS === */
  wantToConfirmOrder() {
    const checker = x =>
      x.filter(e => e.paymentTypeDetail && e.paymentMethodDetail).length ===
      x.length;
    if (checker(this.state.parcels)) {
      const parcels = this.state.parcels;
      const data = {
        storeId: parseInt(this.state.dataOmsGetCheckoutItem.storeId, 10),
        orderParcels: this.state.dataOmsGetCheckoutItem.orderParcels.map(
          (item, index) => ({
            invoiceGroupId: parseInt(item.invoiceGroupId, 10),
            paymentTypeId: parseInt(
              parcels[index].paymentTypeDetail.hasOwnProperty('paymentType')
                ? parcels[index].paymentTypeDetail.paymentType.id
                : parcels[index].paymentTypeDetail.id,
              10
            ),
            paymentChannelId: parseInt(
              parcels[index].paymentMethodDetail.id,
              10
            ),
            paylaterTypeId: parcels[index].paylaterType
              ? parseInt(parcels[index].paylaterType.id, 10)
              : 0
          })
        )
      };
      this.props.OmsGetTermsConditionsProcess(data);
    } else {
      this.setState({ modalWarningNotSelectPayment: true });
      setTimeout(() => {
        this.setState({ modalWarningNotSelectPayment: false });
      }, 2000);
    }
  }
  /** === CONFIRM ORDER === */
  confirmOrder() {
    const storeId = parseInt(this.state.dataOmsGetCheckoutItem.storeId, 10);
    const orderId = parseInt(this.props.oms.dataOmsGetCheckoutItem.id, 10);
    const parcels = this.state.parcels.map((e, i) => ({
      orderParcelId: e.orderParcelId,
      paymentTypeSupplierMethodId: e.hasOwnProperty('paymentChannel')
        ? e.paymentChannel.paymentTypeSupplierMethodId
        : e.paymentTypeSupplierMethodId,
      paymentTypeId: e.paymentTypeDetail.hasOwnProperty('paymentTypeId')
        ? parseInt(e.paymentTypeDetail.paymentTypeId, 10)
        : parseInt(e.paymentTypeDetail.id, 10),
      paymentChannelId: e.paymentMethodDetail.id,
      paylaterTypeId: this.state.selectedPaylaterType
        ? this.state.selectedPaylaterType.id
        : null
    }));
    const isKUR = this.state.parcels
      .filter(data => data.paylaterType)
      .some(data => data.paylaterType.id === 2);
    if (isKUR === true) {
      NavigationService.navigate('OmsOtpKurView', {
        storeId,
        orderId,
        parcels
      });
    } else {
      this.props.omsConfirmOrderProcess({
        orderId,
        storeId,
        parcels
      });
    }

    this.setState({ modalTAndR: false });
  }
  /** ======= DID UPDATE FUNCTION ==== */
  backToMerchantHomeView(storeName) {
    let orderId = 0;
    // validate the data of orderParcels.
    if (this.props.oms.dataOmsConfirmOrder.data.orderParcels.length > 0) {
      orderId = this.props.oms.dataOmsConfirmOrder.data.orderParcels[0].orderId;
    }
    /** UPDATE TASK ORDER */
    this.props.merchantPostActivityProcessV2({
      journeyBookStoreId: this.props.merchant.selectedMerchant.journeyBookStores
        .id,
      activityName: 'order',
      orderId
    });

    // delay 500ms make sure order activity send before change screen
    setTimeout(() => {
      NavigationService.navigate('MerchantHomeView', {
        storeName
      });
    }, 500);
  }
  /**
   * ======================
   * PRICE AND PAYMENT FUNCTION
   * =====================
   */
  /** === CALCULATE TOTAL PRICE === */
  calTotalPrice() {
    const mapParcel = this.state.dataOmsGetCheckoutItem.orderParcels.map(
      item => item.parcelFinalPrice
    );
    return mapParcel.reduce((a, b) => a + b, 0);
  }
  /** === CALCULATE TOTAL SERVICE FEE === */
  calTotalServiceFee() {
    const mapParcel = this.state.parcels.map(
      item => item.totalFee
    );
    return mapParcel.reduce((a, b) => a + b, 0);
  }
  /** === OPEN COLAPSE SUB TOTAL === */
  openSubTotal(item, index) {
    if (this.state.openSubTotal === index) {
      this.setState({ openSubTotal: null });
    } else {
      this.setState({ openSubTotal: index });
    }
  }
  /** === MODIFY DATA FOR SELECTED PAYMENT === */
  selectedPayment(item) {
    const itemIndex = this.state.dataOmsGetCheckoutItem.orderParcels
      .map(e => e.id)
      .indexOf(this.state.selectedParcel);
    const paymentMethodSelected = Array.isArray(
      this.state.paymentMethodSelected
    )
      ? [...this.state.paymentMethodSelected]
      : [];
    paymentMethodSelected[itemIndex] = parseInt(item.id, 10);
    this.setState({
      paymentMethodSelected,
      modalPaymentTypeMethod: false
    });
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
        parcels[
          indexParcel
        ].paymentChannel = this.props.oms.dataOmsGetPaymentChannel.data;
        parcels[indexParcel].error = false;
        parcels[indexParcel].paylaterType = this.state.selectedPaylaterType;
        parcels[indexParcel].totalFee = item.totalFee
      }
      this.setState({
        parcels,
        modalPaymentTypeMethod: false,
        usingDefault: false
      });
    }
  }

  /** === MODIFY DATA FOR PAYLATER KUR === */
  selectedPaylaterType(item) {
    if (item.id === 1) {
      //if paylaterType === supplier
      this.setState({
        selectedPaylaterType: item,
        modalConfirmKUR: false,
        modalPaylaterType: false,
        modalPaymentTypeMethod: true
      });
      this.openPaymentMethod(this.state.selectedPaymentType);
    } else if (item.id === 2) {
      //if paylaterType === KUR
      if (item.message === null || item.message === '') {
        if (item.isRedirect === true) {
          this.setState({
            selectedPaylaterType: item,
            modalConfirmKUR: true,
            modalPaylaterType: false,
            modalPaymentTypeMethod: false
          });
        } else {
          this.setState({
            selectedPaylaterType: item,
            modalConfirmKUR: false,
            modalPaylaterType: false,
            modalPaymentTypeMethod: true
          });
          this.openPaymentMethod(this.state.selectedPaymentType);
        }
      } else {
        this.setState({
          openModalKurAnnouncement: true
        });
      }
    }
  }

  /** === CHECK PAYMENT ALREADY SELECTED === */
  checkPaymentSelected(item) {
    if (
      this.state.makeConfirmOrder &&
      this.state.parcels.findIndex(
        itemParcel =>
          (itemParcel.orderParcelId === parseInt(item.id, 10) &&
            itemParcel.paymentTypeSupplierMethodId === null) ||
          (itemParcel.orderParcelId === parseInt(item.id, 10) &&
            itemParcel.error)
      ) > -1
    ) {
      return true;
    }
    return false;
  }

  //RENDER APPLICABLE PAYLATER
  applicablePaylater(item) {
    if (item.data.proceed === true) {
      this.setState({
        openModalKurWebView: false,
        modalPaymentTypeMethod: true,
        modalPaylaterType: false
      });
      this.openPaymentMethod(this.state.selectedPaymentType);
    } else {
      this.setState({
        openModalKurWebView: false,
        modalPaymentTypeMethod: false,
        modalPaylaterType: true,
        openModalFailPaylater: true,
        dataApplicable: item.data
      });
    }
  }
  /**
   * =====================
   * GLOBAL FUNCTION
   * =====================
   */
  /**
   * === MODIFY DATA CHECKOUT ===
   * data harus di modifikasi agar sesuai dengan layout
   * semua dari props di pindahkan ke local agar lebih ringan
   * parcels -> menyimpan data berdasarkan kelompok parcel
   * orderProduct -> meyimpan semua sku yang ada pada checkout
   * -> berfungsi untuk menghitung jumlah barang perparcel
   * -> berfungsi sebagai parameter untuk min order
   */
  modifyDataForList() {
    const orderProduct = [];
    const parcels = [];
    this.state.dataOmsGetCheckoutItem.orderParcels.forEach(item => {
      let paymentTypeSupplierMethodId = null;
      let paymentMethodDetail = null;
      let paymentTypeDetail = null;
      let paylaterType = null;
      let error = false;
      let totalFee = 0;
      if (this.state.parcels.length > 0) {
        const itemParcelFind = this.state.parcels.find(
          itemParcel => itemParcel.orderParcelId === parseInt(item.id, 10)
        );
        if (itemParcelFind !== undefined) {
          paymentTypeSupplierMethodId =
            itemParcelFind.paymentChannel.paymentTypeSupplierMethodId;
          paymentMethodDetail = itemParcelFind.paymentMethodDetail;
          paymentTypeDetail = itemParcelFind.paymentTypeDetail;
          paylaterType = itemParcelFind.paylaterType
            ? itemParcelFind.paylaterType
            : null;
          error = itemParcelFind.error;
          totalFee = itemParcelFind.paymentMethodDetail.totalFee
        }
      }
      const data = {
        orderParcelId: parseInt(item.id, 10),
        paymentTypeSupplierMethodId,
        paymentMethodDetail,
        paymentTypeDetail,
        paylaterType,
        error,
        totalFee
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
   * ===  MODIFY PARCEL DATA ===
   * saat terjadi error, maka this.state.parcels harus di modifikasi
   * tambahkan .error = true (untuk error per parcel)
   */
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
   * === MODIFY DATA CHECK LIST CART ===
   * jika terjadi error status (product habis saat confirm order)
   * product tersebut harus di modif pada reducer dataCheckBoxlistCart
   * agar saat kembali ke cart, data tersebut berada pada list error product
   */
  modifyDataCheckBoxlistCart() {
    let dataCheckBoxlistCart = [];
    Object.assign(dataCheckBoxlistCart, this.props.oms.dataCheckBoxlistCart);
    if (this.props.oms.errorOmsConfirmOrder.data.orderData !== null) {
      this.props.oms.errorOmsConfirmOrder.data.errorData.map(
        itemOrderBrandCatalogues => {
          const indexDataCheckBoxlistCart = this.props.oms.dataCheckBoxlistCart.findIndex(
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
      this.props.omsCheckListCart(dataCheckBoxlistCart);
    } else {
      dataCheckBoxlistCart.map(item => {
        item.statusInCart = 'unavailable';
        item.checkBox = true;
      });
      this.props.omsCheckListCart(dataCheckBoxlistCart);
    }
  }
  /**
   * === MODIFY DATA FOR DATA CHECKOUT ===
   * fungsi ini berfungsi untuk modif data itemCataloguesCheckout
   * data tersebut harus sesuai dengan data catalogue yang berhasil di order
   * agar data tersebut dapat dibandingkan dengan data permanent dataCart
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
      this.props.omsCheckoutItem(itemCataloguesCheckout);
    } else {
      this.props.omsCheckoutItem(itemCataloguesCheckout);
    }
  }
  /**
   * =============================
   * ERROR FUNCTION
   * ============================
   */
  manageError() {
    switch (this.props.oms.errorOmsConfirmOrder.data.errorCode) {
      case 'ERR-STATUS':
      case 'ERR-WAREHOUSE':
        this.errorStatus();
        break;
      case 'ERR-BALANCE':
        this.errorBalance();
        break;
      case 'ERR-MIN-ORDER':
        this.errorMinOrder();
        break;
      case 'ERR-PAYMENT-STATUS':
        this.errorPaymentStatus();
        break;
      case 'ERR-APP-NOT-ALLOW':
        this.errorPaymentNotAllowed();
      case 'ERR-STOCK':
        this.errorSKUNotAvailable();
        break;
      case 'ERR_APP_KUR_ACC_OTP_ERROR':
        null;
        break;
      default:
        break;
    }
  }
  /** === ERROR STATUS === */
  errorStatus() {
    this.setState({ modalSkuStatusConfirmation: true });
    this.modifyDataCheckBoxlistCart();
    this.modifyItemCataloguesCheckout();
  }
  /** === ERROR BALANCE === */
  errorBalance() {
    this.modifyParcelData();
    this.setState({ modalErrorBalance: true });
    setTimeout(() => {
      this.setState({ modalErrorBalance: false });
    }, 3000);
  }
  /** === ERROR MIN ORDER ===  */
  errorMinOrder() {
    this.setState({ modalErrorMinimumOrder: true });
    this.modifyItemCataloguesCheckout();
  }
  /** === ERROR PAYMENT STATUS === */
  errorPaymentStatus() {
    this.modifyParcelData();
    this.setState({ modalErrorPayment: true });
    setTimeout(() => {
      this.setState({ modalErrorPayment: false });
    }, 2000);
  }
  /** ERROR PAYMENT NOT ALLOWED */
  errorPaymentNotAllowed() {
    this.setState({ openModalPaymentNotAllowed: true });
  }
  /** ERROR PAYMENT GLOBAL */
  errorPaymentGlobal() {
    this.setState({ openModalPaymentNotAllowed: true });
  }
  // === ERROR SKU NOT AVAILABLE ===
  errorSKUNotAvailable() {
    this.setState({ openModalSKUNotAvailable: true });
  }

  /**ERROR PAYMENT TRY AGAIN */
  errorPaymentTryAgain() {
    this.setState({ openModalErrorPaymentTryAgain: true });
  }
  closeErrorResponse() {
    this.setState({ modalErrorResponse: false });
    NavigationService.navigate('Home');
  }
  errorOtpConsent() {
    this.setState({
      modalErrorConsent: false,
      modalConfirmKUR: false,
      modalPaylaterType: true
    });
  }
// === ERROR PAYMENT ORDER PARCEL EXPIRED ===
handleErrorOrderParcelExpired() {
  this.setState({
    modalWarningCheckoutIsExpired: true,
    modalPaymentTypeList: false,
    modalPaymentTypeMethod: false,
    modalPaymentMethodDetail: false,
    modalPaylaterType: false
  });
}

closeErrorOrderParcelExpired() {
  this.setState({
      modalWarningCheckoutIsExpired: false,
      modalPaymentTypeList: false,
      modalPaymentTypeMethod: false,
      modalPaymentMethodDetail: false,
      modalPaylaterType: false
  });
  this.backToCartItemView();
}
  /** === FOR OPEN MODAL TERM AND REFRENCE ===  */
  checkTerm(selectedPaymentType) {
    this.setState({ modalPaymentTypeList: false, selectedPaymentType });
    if (selectedPaymentType.paymentTypeId === '2') {
      this.openPaylaterType(selectedPaymentType);
    } else {
      this.openPaymentMethod(selectedPaymentType);
    }

    // }
  }

  /** === FOR BACK TO CART VIEW ==== */
  backToCartItemView() {
    /** => this is for back to cart (dont delete) */
    // NavigationService.navigate('OmsCartView');
    this.setState({ modalErrorMinimumOrder: false });
    NavigationService.navigate('OmsCartView', this.props.navigation.state.key);
    this.props.omsGetCartItemFromCheckoutProcess({
      catalogues: this.props.oms.dataCart
    });
    this.props.omsDeleteCartItemProcess({
      orderId: this.props.oms.dataOmsGetCheckoutItem.id
    });
  }
  /** === FOR SEE MORE PRODUCT LIST (OPEN MODAL PRODUCT LIST) === */
  openSeeMore(item, index) {
    this.setState({
      selectedParcelDetail: item,
      selectedParcelDetailPayment: this.state.parcels[index],
      modalParcelDetail: true
    });
  }
  /** === FOR OPEN MODAL PAYMENT TYPE === */
  openPaymentType(item) {
    if (!this.props.oms.loadingOmsGetOrderParcelList) {
      const changedIndex = [...this.state.changedIndex, item.id];
      this.setState({
        modalPaymentTypeList: true,
        selectedParcel: item.id,
        selectedParcelIdForPayment: item.id,
        selectedPaylaterType: null,
        changedIndex
      });
    }
  }
  /** === FOR OPEN MODAL PAYMENT METHOD === */
  openPaymentMethod(selectedPaymentType) {
    const params = {
      supplierId: parseInt(selectedPaymentType.supplierId, 10),
      orderParcelId: parseInt(this.state.selectedParcel, 10),
      paymentTypeId: parseInt(selectedPaymentType.paymentTypeId, 10)
    };
    this.props.OmsGetPaymentChannelProcess(params);
    this.setState({
      modalTAndR: false,
      selectedPaymentType: selectedPaymentType,
      modalPaymentTypeMethod: true
    });
  }
  /** === FOR OPEN MODAL PAYMENT METHOD DETAIL === */
  openPaymentMethodDetail(paymentMethodDetail) {
    this.setState({
      paymentMethodDetail,
      modalPaymentTypeMethod: false
      // modalPaymentMethodDetail: true
    });
  }

  /** MODAL WARNING FAILED CONFIRM ORDER */
  renderModalWarningAllCondition() {
    return (
      <View>
        {this.state.modalWarningAllCondition ? (
          <ModalWarning
            open={this.state.modalWarningAllCondition}
            content={this.props.oms.errorOmsConfirmOrder.message}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  /** === FOR OPEN MODAL PAYLATER TYPE === */
  openPaylaterType(selectedPaymentType) {
    const params = {
      paymentTypeId: parseInt(selectedPaymentType.paymentTypeId),
      orderParcelId: parseInt(this.state.selectedParcel)
    };
    this.props.omsGetPayLaterTypeProcess(params);
    this.setState({
      modalTAndR: false,
      selectedPaymentType: selectedPaymentType,
      modalPaylaterType: true
    });
  }

  /** === FOR OPEN MODAL FAIL PAYLATER === */
  renderModalFailPaylater() {
    return (
      <View>
        {this.state.openModalFailPaylater ? (
          <ModalBottomFailPayment
            open={this.state.openModalFailPaylater}
            text={this.state.dataApplicable.message}
            onPress={() =>
              this.setState({
                openModalFailPaylater: false,
                dataApplicable: null
              })
            }
          />
        ) : null}
      </View>
    );
  }

  /** RENDER CONFIRM KUR */
  renderConfirmKUR() {
    const date = new Date();
    const utcTime = toUtcTime(date, 'YYYY-MM-DD hh:mm:ss');
    const storeId = parseInt(this.state.dataOmsGetCheckoutItem.storeId, 10);
    const data = {
      storeId: storeId,
      timestamp: utcTime
    };
    this.props.OmsPostKurConsentProcess(data);
  }

  /** === RENDER MODAL KUR WEB VIEW === */
  renderModalKurWebview() {
    return this.state.openModalKurWebView ? (
      <ModalOmsKurWebView
        open={this.state.openModalKurWebView}
        close={() =>
          this.setState({
            openModalKurWebView: false
          })
        }
        url={this.state.selectedPaylaterType.redirectUrl}
        onRef={ref => (this.applicablePaylater = ref)}
        applicablePaylater={this.applicablePaylater.bind(this)}
      />
    ) : (
      <View />
    );
  }

  /** === RENDER MODAL KUR WEB VIEW === */
  renderModalKurAnncouncement() {
    return this.state.openModalKurAnnouncement ? (
      <ModalOmsKurAnnouncement
        open={this.state.openModalKurAnnouncement}
        close={() =>
          this.setState({
            openModalKurAnnouncement: false
          })
        }
        // url={this.state.selectedPaylaterType.redirectUrl}
        onRef={ref => (this.applicablePaylater = ref)}
        applicablePaylater={this.applicablePaylater.bind(this)}
      />
    ) : (
      <View />
    );
  }

  /** === RENDER MODAL OTP KUR === */
  renderModalOtpKur() {
    return this.state.openModalOmsOtpKur ? (
      <ModalOmsOTPKur
        open={this.state.openModalOmsOtpKur}
        close={() =>
          this.setState({
            openModalOmsOtpKur: false
          })
        }
        dataOtp={this.props.dataOmsGetKurOtp}
        errorOtp={this.props.errorOmsGetKurOtp}
      />
    ) : (
      <View />
    );
  }

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   * - Address (+++RENDER ADDRESS)
   * - list sku (+++RENDER SKU LIST SECTION)
   * - total price (+++RENDER BOTTOM SECTION)
   */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderAddress()}
          {this.renderListOrder()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
        {this.renderBottomSection()}
      </View>
    );
  }
  /**
   * =============================
   * +++RENDER ADDRESS
   * =============================
   */
  renderAddress() {
    const store = this.props.merchant.selectedMerchant;
    return (
      <View style={[styles.boxAddress, GlobalStyle.shadowBottom]}>
        <View style={styles.boxTitle}>
          <Text
            style={Fonts.type48}
            accessible={true}
            accessibilityLabel={'txtCheckoutAlamat'}
          >
            Alamat Pengiriman
          </Text>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
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
  /**
   * ===============================
   * +++RENDER BOTTOM SECTION
   * ===============================
   * - total value bottom (===> RENDER TOTAL BOTTOM VALUE)
   * - confirm button bottom (===> RENDER BUTTON CONFIRM)
   */
  renderBottomSection() {
    return (
      <View style={styles.bottomContainer}>
        {this.renderBottomValue()}
        {this.renderConfirmButton()}
      </View>
    );
  }
  /** ===> RENDER TOTAL BOTTOM VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.boxBottomValue}>
          <View>
            <Text>
              <Text
                accessible={true}
                accessibilityLabel={'txtCheckoutTotal'}
                style={Fonts.type9}
              >
                Total:{' '}
              </Text>
              <Text style={Fonts.type53}>
                {MoneyFormat(this.calTotalPrice() + this.calTotalServiceFee())}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
  /** ===> RENDER BUTTON CONFIRM === */
  renderConfirmButton() {
    return (
      <ButtonSingleSmall
        accessible={true}
        accessibilityLabel={'btnCheckoutBuatPesanan'}
        disabled={
          this.props.oms.loadingOmsConfirmOrder ||
          this.props.oms.loadingOmsGetTermsConditions
        }
        loading={
          this.props.oms.loadingOmsConfirmOrder ||
          this.props.oms.loadingOmsGetTermsConditions
        }
        loadingPadding={33}
        onPress={() => this.wantToConfirmOrder()}
        title={'Buat Pesanan'}
        borderRadius={4}
      />
    );
  }
  /** === RENDER SUB TOTAL DETAIL === */
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
              {MoneyFormat(item.parcelGrossPrice)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5
          }}
        >
          <View>
            <Text style={Fonts.type51}>Total Potongan Harga</Text>
          </View>
          <View>
            <Text style={Fonts.type51}>- {MoneyFormat(item.parcelPromo)}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: this.state.parcels[index].paymentMethodDetail !== null ? 5 : null
          }}
        >
          <View>
            <Text style={Fonts.type17}>PPN</Text>
          </View>
          <View>
            <Text style={Fonts.type17}>{MoneyFormat(item.parcelTaxes)}</Text>
          </View>
        </View>
        {
          this.state.parcels[index].paymentMethodDetail && this.state.parcels[index].paymentMethodDetail.totalFee ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <View>
                <Text style={Fonts.type17}>Layanan Pembayaran</Text>
              </View>
              <View>
                <Text style={Fonts.type17}>
                  {MoneyFormat(this.state.parcels[index].paymentMethodDetail.totalFee)}
                </Text>
              </View>
            </View>
          ) : null
        }
        
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
            {
               this.state.parcels[index] && this.state.parcels[index].paymentMethodDetail
                ? MoneyFormat(item.parcelFinalPrice + this.state.parcels[index].paymentMethodDetail.totalFee)
                : MoneyFormat(item.parcelFinalPrice)
            }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  /** === RENDER LIST ORDER === */
  renderListOrder() {
    return this.state.dataOmsGetCheckoutItem.orderParcels.map((item, index) => {
      return (
        <View key={index} style={GlobalStyle.shadowForBox}>
          <View style={GlobalStyle.boxPaddingOms} />
          <View style={styles.boxListProductInCart}>
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
                <TouchableOpacity onPress={() => this.openSeeMore(item, index)}>
                  <Text style={Fonts.type14}>Lihat lebih</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 16 }}
              onPress={() =>
                this.setState({ modalProductList: true, orderPerParcel: item })
              }
            >
              <ProductListType1 data={item.orderBrands} />
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

        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
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
        {this.state.parcels[indexParcel].paymentMethodDetail.name ===
        'Tunai' ? (
          <View>
            {this.state.parcels[indexParcel].paymentTypeDetail.paymentType ? (
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: this.state.parcels[indexParcel].paymentTypeDetail
                      .paymentType.iconUrl
                  }}
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                <Text
                  style={[Fonts.type8, { alignSelf: 'center', width: '88%' }]}
                  numberOfLines={1}
                >
                  {
                    this.state.parcels[indexParcel].paymentTypeDetail
                      .paymentType.name
                  }
                  {this.state.parcels[indexParcel].paylaterType
                    ? ` - ${this.state.parcels[indexParcel].paylaterType.name} `
                    : null}
                  - {this.state.parcels[indexParcel].paymentMethodDetail.name}
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Text style={[Fonts.type101, { alignSelf: 'center' }]}>
                  Pilih Tipe & Metode pembayaran
                </Text>
              </View>
            )}
          </View>
        ) : this.state.parcels[indexParcel].paymentTypeDetail.paymentType ? (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{
                uri: this.state.parcels[indexParcel].paymentTypeDetail
                  .paymentType.iconUrl
              }}
              style={{ height: 20, width: 20, marginRight: 10 }}
            />
            <Text
              style={[Fonts.type8, { alignSelf: 'center', width: '88%' }]}
              numberOfLines={1}
            >
              {
                this.state.parcels[indexParcel].paymentTypeDetail.paymentType
                  .name
              }
              {this.state.parcels[indexParcel].paylaterType !== null
                ? ` - ${this.state.parcels[indexParcel].paylaterType.name} `
                : null}
              - {this.state.parcels[indexParcel].paymentMethodDetail.name}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    ) : (
      <View />
    );
  }

  renderIsPaymentMethodDefault(item) {
    const parcelIndex = this.state.parcels.findIndex(
      itemParcel =>
        itemParcel.orderParcelId === parseInt(item.id, 10) &&
        itemParcel.paymentTypeSupplierMethodId === null
    );
    return this.props.oms.dataLastPaymentChannel &&
      this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels &&
      (this.state.usingDefault ||
        this.state.changedIndex.indexOf(item.id) === -1)
      ? this.renderPaymentMethodDefault(item)
      : this.renderAfterSelectPaymentMethod(parcelIndex, item);
  }

  renderPaymentMethodDefault(item) {
    const indexPayment = this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels
      .map(e => e.invoiceGroupId)
      .indexOf(parseInt(item.invoiceGroupId));

    const paymentMethod =
      indexPayment > -1
        ? this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels[
            indexPayment
          ]
        : null;

    return paymentMethod ? (
      <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
        <Image
          source={{
            uri: this.props.oms.dataLastPaymentChannel.data.paymentTypeChannels[
              indexPayment
            ].paymentType.iconUrl
          }}
          style={{ height: 20, width: 20, marginRight: 10 }}
        />
        <Text
          style={[Fonts.type8, { alignSelf: 'center', width: '88%' }]}
          numberOfLines={1}
        >
          {paymentMethod.paymentType.name}{' '}
          {paymentMethod.paylaterType !== null
            ? `- ${paymentMethod.paylaterType.name}`
            : null}{' '}
          - {paymentMethod.paymentChannel.name}{' '}
        </Text>
      </View>
    ) : (
      <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
        <Text style={[Fonts.type101, { alignSelf: 'center' }]}>
          Pilih Tipe & Metode pembayaran
        </Text>
      </View>
    );
  }

  renderAfterSelectPaymentMethod(index, item) {
    return index > -1 ? (
      <View>
        {this.props.oms.loadingLastPaymentChannel ? (
          <Button
            loadingProps={{ color: masterColor.fontRed50 }}
            type={'clear'}
            title=""
            titleStyle={Fonts.type14}
            buttonStyle={{ paddingVertical: 16 }}
            loading
          />
        ) : (
          <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
            <Text style={[Fonts.type101, { alignSelf: 'center' }]}>
              Pilih Tipe & Metode pembayaran
            </Text>
          </View>
        )}
      </View>
    ) : (
      <View style={{ paddingVertical: 15 }}>
        {this.renderSelectedPayment(item)}
      </View>
    );
  }

  /** === TIPE PEMBAYARAN === */
  renderMetodePembayaran(item) {
    return (
      <View>
        <View style={{ paddingLeft: 16, paddingBottom: 5, paddingTop: 10 }}>
          <Text style={Fonts.type50}>Tipe Pembayaran</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'btnCheckoutTipePembayaran'}
          disabled={this.state.disabled}
          style={[
            styles.boxPayment,
            {
              backgroundColor: this.checkPaymentSelected(item)
                ? masterColor.fontRed50OP20
                : masterColor.fontWhite
            }
          ]}
          onPress={() => this.openPaymentType(item)}
        >
          <View style={{ flexDirection: 'row' }}>
            {this.renderIsPaymentMethodDefault(item)}
            {this.checkPaymentSelected(item) ? (
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 5
                }}
              >
                <MaterialIcon
                  name="error"
                  size={15}
                  color={masterColor.mainColor}
                />
              </View>
            ) : (
              <View />
            )}
          </View>

          {this.props.oms.loadingLastPaymentChannel ? (
            <View />
          ) : (
            <View>
              <MaterialIcon name="keyboard-arrow-right" size={24} />
            </View>
          )}
        </TouchableOpacity>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </View>
    );
  }
  /**
   * ================================
   * RENDER MODAL
   * ===============================
   */
  /**
   * =================================================
   * &&backToCart RENDER MODAL BACK TO CART CONFIRMATION
   * =================================================
   */
  renderModalConfirmationBackToCart() {
    return this.state.openModalBackToCartItem ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalBackToCartItem}
        okText={'Ya'}
        cancelText={'Tidak'}
        content={'Yakin ingin kembali ke keranjang dan membatalkan checkout ?'}
        type={'okeNotRed'}
        ok={() => {
          this.setState({ openModalBackToCartItem: false });
          this.backToCartItemView();
        }}
        cancel={() => this.setState({ openModalBackToCartItem: false })}
      />
    ) : (
      <View />
    );
  }
  /**
   * =================================================
   * &&confirmOrder RENDER MODAL CONFIRM ORDER
   * =================================================
   */
  renderModalConfirmationConfirmOrder() {
    return this.state.openModalConfirmOrder ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalConfirmOrder}
        okText={'Ya'}
        cancelText={'Tidak'}
        content={'Lanjutkan untuk buat Pesanan Anda sekarang ?'}
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalConfirmOrder: false });
          this.confirmOrder();
        }}
        cancel={() => this.setState({ openModalConfirmOrder: false })}
      />
    ) : (
      <View />
    );
  }
  /**
   * ===========================================================
   * &&listProduct RENDER MODAL LIST PRODUCT (WHEN IMAGE CLICK)
   * ==========================================================
   */
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
  /**
   * ===========================================================
   * &&selectPayment RENDER MODAL PAYMENT NOT SELECTED
   * ==========================================================
   */
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

  renderWarningCheckoutIsExpired() {
    return (
      <View>
        {this.state.modalWarningCheckoutIsExpired ? (
          <ModalBottomFailPayment
          open={this.state.modalWarningCheckoutIsExpired}
          text={
              'Sesi checkout Anda sudah habis. Silakan ulangi proses checkout Anda.'
            }
          buttonTitle={'Ok'}
          onPress={() => this.closeErrorOrderParcelExpired()}
        />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderWarningMinimumQty() {
    return (
      <View>
        {this.state.modalWarningMinimumQty ? (
          <ModalWarning
            open={this.state.modalWarningMinimumQty}
            content={'Qty anda blm mencukupi standar pemesanan'}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderErrorResponse() {
    return (
      <View>
        {this.state.modalErrorResponse ? (
          <ModalBottomErrorRespons
            open={this.state.modalErrorResponse}
            onPress={() => this.closeErrorResponse()}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  renderErrorConsent() {
    return (
      <View>
        {this.state.modalErrorConsent ? (
          <ModalBottomErrorRespons
            open={this.state.modalErrorConsent}
            onPress={() => this.errorOtpConsent()}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /**
   * ===========================================================
   * &&paymentNotAvailable RENDER MODAL ERROR PAYMENT NOT AVAILABLE
   * ==========================================================
   */
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
  /**
   * ===========================================================
   * &&skuStatus RENDER MODAL SKU STATUS CONFIRMATION
   * ==========================================================
   */
  renderModalSkuStatusConfirmation() {
    return (
      <View>
        {this.state.modalSkuStatusConfirmation ? (
          <ModalBottomStockConfirmationConfirmOrder
            open={this.state.modalSkuStatusConfirmation}
            backToCart={() => this.backToCartItemView()}
            confirmation={() => {
              this.setState({
                modalSkuStatusConfirmation: false,
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
  /**
   * =================================================
   * &&minOrder RENDER MODAL ERROR MINIMUM ORDER CONFIRMATION
   * =================================================
   */
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
  /**
   * =================================================
   * &&errorBalance RENDER MODAL ERROR BALANCE
   * =================================================
   */
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
  /**
   * =================================================
   * &&parcelDetails RENDER MODAL PARCEL DETAIL
   * =================================================
   */
  renderModalParcelDetail() {
    return (
      <View>
        {this.state.modalParcelDetail ? (
          <ModalBottomParcelDetail
            open={this.state.modalParcelDetail}
            data={this.state.selectedParcelDetail}
            dataPayment={this.state.selectedParcelDetailPayment}
            close={() => this.setState({ modalParcelDetail: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /**
   * =====================================
   * RENDER ALL MODAL PAYMENT
   * =====================================
   */
  /** RENDER PAYMENT TERM AND REFRENCE (30012020) */
  renderModalTAndR() {
    return (
      <View>
        {this.state.modalTAndR && this.state.selectedPaymentType !== null ? (
          <ModalTAndR
            open={this.state.modalTAndR}
            data={[this.state.tAndRDetail]}
            close={() => this.setState({ modalTAndR: false })}
            onRef={ref => (this.agreeTAndR = ref)}
            agreeTAndR={this.openPaymentMethod.bind(this)}
            confirmOrder={this.confirmOrder.bind(this)}
            loadingConfirmOrder={this.props.oms.loadingOmsConfirmOrder}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** RENDER PAYMENT TYPE LIST (30012020) */
  renderModalListPaymentType() {
    return this.state.modalPaymentTypeList ? (
      <ModalBottomPaymentType
        parcelId={this.state.selectedParcelIdForPayment}
        onRef={ref => (this.selectPaymentType = ref)}
        selectPaymentType={this.checkTerm.bind(this)}
        open={this.state.modalPaymentTypeList}
        close={() =>
          this.setState({
            modalPaymentTypeList: false
          })
        }
      />
    ) : (
      <View />
    );
  }
  /** === RENDER PAYMENT MENTHOD LIST (30012020) === */
  renderModalListPaymentMethod() {
    return this.state.modalPaymentTypeMethod ? (
      <ModalBottomPaymentMethod
        open={this.state.modalPaymentTypeMethod}
        close={() =>
          this.setState({
            modalPaymentTypeMethod: false,
            modalPaymentTypeList: true,
            modalPaylaterType: false,
            selectedPaylaterType: null
          })
        }
        paymentMethod={this.state.paymentMethod}
        paymentType={this.state.selectedPaymentType}
        orderPrice={this.calTotalPrice()}
        onRef={ref => (this.selectPaymentMethod = ref)}
        selectPaymentMethod={this.selectedPayment.bind(this)}
        loading={this.props.oms.loadingOmsGetPaymentChannel}
        selectedPaylaterType={this.state.selectedPaylaterType}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER PAYMENT MENTHOD DETAIL (30012020) === */
  renderModalPaymentMethodDetail() {
    return this.state.modalPaymentMethodDetail ? (
      <ModalBottomPaymentMethodDetail
        open={this.state.modalPaymentMethodDetail}
        title={this.state.paymentMethodDetail.paymentMethod.paymentGroup.name}
        close={() =>
          this.setState({
            modalPaymentMethodDetail: false,
            modalPaymentTypeMethod: true,
            modalPaylaterType: false
          })
        }
        paymentMethodDetail={this.state.paymentMethodDetail}
        onRef={ref => (this.selectedPayment = ref)}
        selectedPayment={this.selectedPayment.bind(this)}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL FAIL PAYMENT */
  renderModalPaymentNotAllowed() {
    return (
      <View>
        {this.state.openModalPaymentNotAllowed ? (
          <ModalBottomFailPayment
            open={this.state.openModalPaymentNotAllowed}
            onPress={() => this.setState({ openModalPaymentNotAllowed: false })}
            text={
              this.props.oms.errorOmsConfirmOrder.message
                ? this.props.oms.errorOmsConfirmOrder.message
                : ''
            }
          />
        ) : null}
      </View>
    );
  }

  /** RENDER MODAL SKU NOT AVAILABLE */
  renderModalSKUNotAvailable() {
    return this.state.openModalSKUNotAvailable ? (
      <ModalBottomSkuNotAvailable
        open={this.state.openModalSKUNotAvailable}
        onPress={() => {
          this.setState({ openModalSKUNotAvailable: false });
          this.backToCartItemView();
        }}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL FAIL PAYMENT */
  renderModalErrorPaymentTryAgain() {
    return (
      <View>
        {this.state.openModalErrorPaymentTryAgain ? (
          <ModalBottomFailPayment
            open={this.state.openModalErrorPaymentTryAgain}
            onPress={() => this.closeopenModalErrorPaymentTryAgain()}
            text={'Silahkan Mencoba Kembali'}
          />
        ) : null}
      </View>
    );
  }
  closeopenModalErrorPaymentTryAgain() {
    this.setState({ openMopenModalErrorPaymentTryAgain: false });
    NavigationService.navigate('OmsCartView', this.props.navigation.state.key);
    this.props.omsGetCartItemFromCheckoutProcess({
      catalogues: this.props.oms.dataCart
    });
    this.props.omsDeleteCartItemProcess({
      orderId: this.props.oms.dataOmsGetCheckoutItem.id
    });
  }

  /** === RENDER MODAL PAY LATER TYPE === */
  renderModalPaylaterType() {
    return this.state.modalPaylaterType ? (
      <ModalBottomPayLaterType
        open={this.state.modalPaylaterType}
        close={() =>
          this.setState({
            modalPaylaterType: false,
            modalPaymentTypeList: true,
            modalPaymentTypeMethod: false
          })
        }
        paymentMethod={this.state.paymentMethod}
        paymentType={this.state.selectedPaymentType}
        payLaterType={this.state.payLaterType}
        orderPrice={this.calTotalPrice()}
        loading={this.props.oms.loadingOmsGetPayLaterType}
        onRef={ref => (this.selectPaylaterType = ref)}
        selectPaylaterType={this.selectedPaylaterType.bind(this)}
      />
    ) : (
      <View />
    );
  }

  /** MODAL BOTTOM CONFIRM KUR */
  renderModalConfirmKUR() {
    return (
      <View>
        {this.state.modalConfirmKUR ? (
          <ModalBottomConfirmKur
            open={this.state.modalConfirmKUR}
            close={() =>
              this.setState({ modalConfirmKUR: false, modalPaylaterType: true })
            }
            confirmKur={() => this.renderConfirmKUR()}
            title="Konfirmasi"
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  /**
   * =======================
   * RENDER MAIN
   * =======================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
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
        {this.renderModalSkuStatusConfirmation()}
        {this.renderModalWarningAllCondition()}
        {this.renderWarningCheckoutIsExpired()}
        {this.renderWarningMinimumQty()}
        {this.renderErrorResponse()}
        {this.renderModalPaymentNotAllowed()}
        {this.renderModalSKUNotAvailable()}
        {this.renderModalErrorPaymentTryAgain()}
        {this.renderModalPaylaterType()}
        {this.renderModalConfirmKUR()}
        {this.renderModalKurWebview()}
        {this.renderModalFailPaylater()}
        {this.renderModalKurAnncouncement()}
        {this.renderModalOtpKur()}
        {this.renderErrorConsent()}
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
  boxBottomValue: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 10
  },
  bottomContainer: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  },
  /** for box payment text */
  boxPayment: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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

const mapStateToProps = ({ oms, merchant, user, permanent }) => {
  return { oms, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OmsCheckoutView);

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

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 30072021
 * updatedFunction:
 * -> post order activity with order id after creates order.
 */
