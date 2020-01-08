import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../utils/Fonts';
import { LoadingTransparentRed } from '../../components/Loading';
import css from '../../config/css.json';
import {
  confirmOrder,
  successOrderFlag,
  saveItemCataloguesCheckout,
  deleteOrder,
  saveChecklistCart
} from '../../redux/actions';
import ModalConfirmation from '../../components/ModalConfirmation';
import ModalBottomListProduct from './ModalBottomListProduct';
import ModalBottomListPaymentType from './ModalBottomListPaymentType';
import ModalTAndR from './ModalTAndR';
import ModalBottomListPaymentMethod from './ModalBottomListPaymentMethod';
import ModalBottomPaymentMethodDetail from './ModalBottomPaymentMethodDetail';
import ModalBottomParcelDetail from './ModalBottomParcelDetail';
import ModalBottomStockConfirmationConfirmOrder from './ModalBottomStockConfirmationConfirmOrder';
import ModalBottomErrorMinimumOrder from './ModalBottomErrorMinimumOrder';
import ModalWarning from '../../components/ModalWarning';
import { backNavigationRoot, backNavigation } from '../../helpers/Navigation';
import { MoneyFormat } from '../../helpers';

const { width, height } = Dimensions.get('window');

class CheckoutListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonCheckoutDisabled: false,
      modalDeleteConfirmation: false,
      modalToCheckoutConfirmation: false,
      modalPaymentTypeList: false,
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
      orderPerParcel: null,
      openSubTotal: null,
      orderProduct: [],
      parcels: [],
      dataCheckout: this.props.cart.dataCheckout,
      makeConfirmOrder: false,
      selectedParcelIdForPayment: null,
      selectedParcel: null,
      selectedParcelDetail: null,
      selectedPaymentType: null,
      paymentMethodDetail: null,
      loading: false
    };
  }

  componentDidMount() {
    if (this.state.dataCheckout !== null) {
      this.modifyDataForList();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart.dataConfirmOrder !== this.props.cart.dataConfirmOrder) {
      if (this.props.cart.dataConfirmOrder !== null) {
        this.setState({ loading: false });
        this.props.successOrderFlag(true);
        backNavigationRoot(this.props.componentId);
      }
    }
    if (
      prevProps.cart.errorConfirmOrder !== this.props.cart.errorConfirmOrder
    ) {
      if (this.props.cart.errorConfirmOrder !== null) {
        this.setState({ loading: false });
        if (
          this.props.cart.errorConfirmOrder.code === 400 &&
          this.props.cart.errorConfirmOrder.data
        ) {
          if (
            this.props.cart.errorConfirmOrder.data.errorCode === 'ERR-STATUS'
          ) {
            this.setState({ modalStockConfirmationConfirmOrder: true });
            this.modifyDataCheckBoxlistCart();
          }
          if (
            this.props.cart.errorConfirmOrder.data.errorCode === 'ERR-MIN-ORDER'
          ) {
            this.setState({ modalErrorMinimumOrder: true });
            this.modifyItemCataloguesCheckout();
          }
          if (
            this.props.cart.errorConfirmOrder.data.errorCode === 'ERR-BALANCE'
          ) {
            this.modifyParcelData();
            this.setState({ modalErrorBalance: true });
            setTimeout(() => {
              this.setState({ modalErrorBalance: false });
            }, 2000);
          }
          if (
            this.props.cart.errorConfirmOrder.data.errorCode ===
            'ERR-PAYMENT-STATUS'
          ) {
            this.modifyParcelData();
            this.setState({ modalErrorPayment: true });
            setTimeout(() => {
              this.setState({ modalErrorPayment: false });
            }, 2000);
          }
        }
      }
    }
  }

  /**
   * ===========================================
   * ALL FUNCTION IN COMPONENT DID UPDATE START
   * ===========================================
   */

  /**
   * global function for componentDidMount and componentDidUpdate
   * modifikasi data untuk render data parcel dan image
   */
  modifyDataForList() {
    const orderProduct = [];
    const parcels = [];
    this.state.dataCheckout.orderParcels.forEach(item => {
      let paymentTypeSupplierMethodId = null;
      let paymentMethodDetail = null;
      let error = false;
      if (this.state.parcels.length > 0) {
        const itemParcelFind = this.state.parcels.find(
          itemParcel => itemParcel.orderParcelId === item.id
        );
        if (itemParcelFind !== undefined) {
          paymentTypeSupplierMethodId =
            itemParcelFind.paymentTypeSupplierMethodId;
          paymentMethodDetail = itemParcelFind.paymentMethodDetail;
          error = itemParcelFind.error;
        }
      }
      const data = {
        orderParcelId: item.id,
        paymentTypeSupplierMethodId,
        paymentMethodDetail,
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
   * fungsi ini berfungsi untuk modif data itemCataloguesCheckout
   * data tersebut harus sesuai dengan data catalogue yang berhasil di order
   * agar data tersebut dapat dibandingkan dengan data global.cartData
   * sisa dari order yang masih tersisa di keranjang
   */
  modifyItemCataloguesCheckout() {
    const itemCataloguesCheckout = [];
    if (this.props.cart.errorConfirmOrder.data.orderData !== null) {
      this.props.cart.errorConfirmOrder.data.orderData.orderParcels.forEach(
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
      this.props.saveItemCataloguesCheckout(itemCataloguesCheckout);
    }
  }

  /**
   * jika terjadi error status (product habis saat confirm order)
   * product tersebut harus di modif pada reducer dataCheckBoxlistCart
   * agar saat kembali ke cart, data tersebut berada pada list error product
   */
  modifyDataCheckBoxlistCart() {
    const dataCheckBoxlistCart = this.props.cart.dataCheckBoxlistCart;
    if (this.props.cart.errorConfirmOrder.data.orderData !== null) {
      this.props.cart.errorConfirmOrder.data.errorData.map(
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
      this.props.saveChecklistCart(dataCheckBoxlistCart);
    } else {
      dataCheckBoxlistCart.map(item => {
        item.statusInCart = 'unavailable';
        item.checkBox = true;
      });
      this.props.saveChecklistCart(dataCheckBoxlistCart);
    }
  }

  modifyParcelData() {
    const parcels = this.state.parcels;
    this.props.cart.errorConfirmOrder.data.errorData.map(item => {
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
   * ===========================================
   * ALL FUNCTION IN COMPONENT DID UPDATE START
   * ===========================================
   */

  openSeeMore(item) {
    this.setState({
      selectedParcelDetail: item,
      modalParcelDetail: true
    });
  }

  backToCartList() {
    this.setState({
      modalErrorMinimumOrder: false
    });
    /**
     * post delete order data
     */
    if (this.props.cart.errorConfirmOrder.data.orderData !== null) {
      this.props.deleteOrder();
    }
    setTimeout(() => {
      backNavigation(this.props.componentId);
    }, 100);
  }

  selectedPayment(item) {
    const parcels = this.state.parcels;
    if (this.state.parcels.length > 0 && this.state.selectedParcel !== null) {
      const indexParcel = parcels.findIndex(
        itemParcels => itemParcels.orderParcelId === this.state.selectedParcel
      );
      if (indexParcel > -1) {
        parcels[indexParcel].paymentTypeSupplierMethodId = item.id;
        parcels[indexParcel].paymentTypeDetail = this.state.selectedPaymentType;
        parcels[indexParcel].paymentMethodDetail = item;
        parcels[indexParcel].error = false;
      }
      this.setState({ parcels, modalPaymentMethodDetail: false });
    }
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

  openPaymentType(item) {
    this.setState({
      modalPaymentTypeList: true,
      selectedParcel: item.id,
      selectedParcelIdForPayment: item.id
    });
  }
  openSubTotal(item, index) {
    if (this.state.openSubTotal === index) {
      this.setState({ openSubTotal: null });
    } else {
      this.setState({ openSubTotal: index });
    }
  }

  cofirmOrder() {
    this.setState({ makeConfirmOrder: true });
    if (
      this.state.parcels.find(
        item => item.paymentTypeSupplierMethodId === null
      ) === undefined
    ) {
      this.setState({ modalConfirmOrder: true });
    } else {
      this.setState({ modalWarningNotSelectPayment: true });
      setTimeout(() => {
        this.setState({ modalWarningNotSelectPayment: false });
      }, 1250);
    }
  }

  confirm() {
    this.setState({ modalConfirmOrder: false, loading: true });
    setTimeout(() => {
      this.props.confirmOrder(this.state.dataCheckout.id, this.state.parcels);
    }, 10);
  }

  urbanMerge() {
    return `, ${this.props.profile.profileInformationData.userStores[0].store.urban.district}, ${this.props.profile.profileInformationData.userStores[0].store.urban.city}, ${this.props.profile.profileInformationData.userStores[0].store.urban.province.name}`;
  }

  renderTotalPriceValue() {
    const mapParcel = this.state.dataCheckout.orderParcels.map(
      item => item.parcelDetails.totalNettPrice
    );
    return mapParcel.reduce((a, b) => a + b, 0);
  }

  renderAddressContent() {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.textName}>
              {
                this.props.profile.profileInformationData.userStores[0].store
                  .owner[0].fullName
              }
            </Text>
          </View>
          {/* <View>
            <Text style={styles.textGantiAlamat}>Ganti Alamat</Text>
          </View> */}
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.textAlamatTitle}>Alamat 1 (default)</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.textAlamat}>
            {
              this.props.profile.profileInformationData.userStores[0].store
                .address
            }
            {this.props.profile.profileInformationData.userStores[0].store
              .urban !== null
              ? this.urbanMerge()
              : ''}
          </Text>
        </View>
      </View>
    );
  }

  renderAddress() {
    return (
      <View style={styles.boxAddress}>
        <View style={styles.boxTitle}>
          <Text style={styles.titleBoxText}>Alamat Pengiriman</Text>
        </View>
        <View style={styles.lines} />
        {this.renderAddressContent()}
      </View>
    );
  }

  renderImageContent(itemParcel) {
    return this.state.orderProduct.filter(
      item => item.parcelId === itemParcel.id
    );
  }

  renderListProductImage(itemParcel) {
    return this.renderImageContent(itemParcel).map((item, index) => {
      return index < 3 ? (
        <View key={index} style={{ paddingHorizontal: 5 }}>
          <Image
            defaultSource={require('../../assets/icons/sinbadopacity.png')}
            source={{
              uri: item.catalogue.catalogueImages[0].imageUrl
            }}
            style={styles.productImage}
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
        <Text style={styles.textPlusProduct}>
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

  renderRincianPengiriman() {
    return (
      <View>
        <View style={{ paddingLeft: 10, paddingBottom: 5, paddingTop: 10 }}>
          <Text style={styles.textName}>Rincian Pengiriman</Text>
        </View>
        <View style={styles.lines} />
      </View>
    );
  }

  renderSelectedPayment(item) {
    const indexParcel = this.state.parcels.findIndex(
      itemParcel =>
        itemParcel.orderParcelId === item.id &&
        itemParcel.paymentTypeSupplierMethodId !== null
    );
    return (
      <View>
        {this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
          .name === 'Tunai' ? (
          <Text style={styles.textPilihMetode}>
            {this.state.parcels[indexParcel].paymentTypeDetail.paymentType.name}{' '}
            -{' '}
            {
              this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
                .name
            }
          </Text>
        ) : (
          <Text style={styles.textPilihMetode}>
            {this.state.parcels[indexParcel].paymentTypeDetail.paymentType.name}{' '}
            -{' '}
            {
              this.state.parcels[indexParcel].paymentMethodDetail.paymentMethod
                .name
            }
          </Text>
        )}
      </View>
    );
  }

  renderMetodePembayaran(item) {
    return (
      <View>
        <View style={{ paddingLeft: 10, paddingBottom: 5, paddingTop: 10 }}>
          <Text style={styles.textName}>Tipe Pembayaran</Text>
        </View>
        <View style={styles.lines} />
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              this.state.makeConfirmOrder &&
              this.state.parcels.findIndex(
                itemParcel =>
                  (itemParcel.orderParcelId === item.id &&
                    itemParcel.paymentTypeSupplierMethodId === null) ||
                  (itemParcel.orderParcelId === item.id && itemParcel.error)
              ) > -1
                ? 'rgba(240, 68, 76, 0.2)'
                : '#ffffff'
          }}
          onPress={() => this.openPaymentType(item)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', marginRight: 20 }}>
              <Image
                source={require('../../assets/icons/cart/money.png')}
                style={{ height: 24, width: 24 }}
              />
            </View>
            {this.state.parcels.findIndex(
              itemParcel =>
                itemParcel.orderParcelId === item.id &&
                itemParcel.paymentTypeSupplierMethodId === null
            ) > -1 ? (
              <View style={{ paddingVertical: 15 }}>
                <Text style={styles.textPilihMetode}>Pilih Tipe</Text>
              </View>
            ) : (
              <View style={{ paddingVertical: 15 }}>
                {this.renderSelectedPayment(item)}
              </View>
            )}

            {this.state.makeConfirmOrder &&
            this.state.parcels.findIndex(
              itemParcel =>
                (itemParcel.orderParcelId === item.id &&
                  itemParcel.paymentTypeSupplierMethodId === null) ||
                (itemParcel.orderParcelId === item.id && itemParcel.error)
            ) > -1 ? (
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: 5
                }}
              >
                <Icons name="error" size={15} color={'#f0444c'} />
              </View>
            ) : (
              <View />
            )}
          </View>

          <View>
            <Icons name="keyboard-arrow-right" size={24} />
          </View>
        </TouchableOpacity>
        <View style={styles.lines} />
      </View>
    );
  }

  renderSubTotal(item, index) {
    return (
      <TouchableOpacity
        style={styles.boxSubTotal}
        onPress={() => this.openSubTotal(item, index)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.state.openSubTotal === index ? (
            <Icons name="keyboard-arrow-up" size={24} />
          ) : (
            <Icons name="keyboard-arrow-down" size={24} />
          )}

          <Text style={styles.subTotalText}>Sub Total</Text>
        </View>
        <View>
          <Text style={styles.subTotalText}>
            {MoneyFormat(item.parcelDetails.totalNettPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderOpenSubTotal(item, index) {
    return this.state.openSubTotal === index ? (
      <View
        style={{
          paddingRight: 10,
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
            <Text style={styles.textSubTotal}>
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
            <Text style={styles.textSubTotal}>
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
            <Text style={styles.textSubTotal}>PPN 10%</Text>
          </View>
          <View>
            <Text style={styles.textSubTotal}>
              {MoneyFormat(item.parcelDetails.tax)}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderListOrder() {
    return this.state.dataCheckout.orderParcels.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.boxMargin} />
          <View style={styles.boxListProductInCart}>
            <View style={{ paddingBottom: 8, paddingHorizontal: 11 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row'
                }}
              >
                <View>
                  <Text style={styles.supplierTitle}>
                    {item.invoiceGroup.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => this.openSeeMore(item)}>
                  <Text style={styles.textGantiAlamat}>Lihat lebih</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
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

            {/* {this.renderRincianPengiriman()} */}
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

  /**
   * ====================================
   * SKELETON START
   * ====================================
   */
  renderSkeleton() {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  /**
   * ====================================
   * SKELETON END
   * ====================================
   */

  /**
   * ======================================
   * RENDER TOTAL PRICE START
   * ======================================
   */

  renderButton() {
    return (
      <Button
        disabled={this.state.buttonCheckoutDisabled}
        onPress={() => this.cofirmOrder()}
        title="Buat Pesanan"
        titleStyle={styles.titleButton}
        buttonStyle={styles.button}
        disabledStyle={styles.buttonDisabled}
        disabledTitleStyle={styles.titleButton}
      />
    );
  }

  renderTotalPrice() {
    return (
      <View style={styles.boxTotalPrice}>
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
              <Text style={styles.totalText}>Total: </Text>
              <Text style={styles.totalPriceText}>
                {MoneyFormat(this.renderTotalPriceValue())}
              </Text>
            </Text>
          </View>
          {/* <View>
            <Text style={styles.ongkirText}>Ongkir Rp17.000</Text>
          </View> */}
        </View>
        <View style={{ justifyContent: 'center' }}>{this.renderButton()}</View>
      </View>
    );
  }

  /**
   * ======================================
   * RENDER TOTAL PRICE END
   * ======================================
   */

  renderLoading() {
    return this.state.loading ? (
      <View>
        <LoadingTransparentRed />
      </View>
    ) : (
      <View />
    );
  }

  /**
   * ================================
   * RENDER MODAL START
   * ================================
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

  renderModalListPaymentType() {
    return (
      <View>
        {this.state.modalPaymentTypeList ? (
          <ModalBottomListPaymentType
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

  renderModalListPaymentMethod() {
    return (
      <View>
        {this.state.modalPaymentTypeMethod ? (
          <ModalBottomListPaymentMethod
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

  renderModalConfirmOrder() {
    return (
      <View>
        {this.state.modalConfirmOrder ? (
          <ModalConfirmation
            modalConfirmation={this.state.modalConfirmOrder}
            type={'okeRed'}
            close={() => this.setState({ modalConfirmOrder: false })}
            process={() => this.confirm()}
            content={'Lanjutkan untuk buat Pesanan Anda sekarang ?'}
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

  renderModalBottomStockConfirmationConfirmOrder() {
    return (
      <View>
        {this.state.modalStockConfirmationConfirmOrder ? (
          <ModalBottomStockConfirmationConfirmOrder
            open={this.state.modalStockConfirmationConfirmOrder}
            backToCart={() => this.backToCartList()}
            confirmation={() => {
              this.setState({
                modalStockConfirmationConfirmOrder: false,
                dataCheckout: this.props.cart.errorConfirmOrder.data.orderData
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
            backToCart={() => this.backToCartList()}
            confirmation={() => {
              this.setState({
                modalErrorMinimumOrder: false,
                dataCheckout: this.props.cart.errorConfirmOrder.data.orderData
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
   * ================================
   * RENDER MODAL END
   * ================================
   */

  renderItem() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {/* {this.renderVoucher()} */}
            {this.renderAddress()}
            {this.renderListOrder()}

            <View style={styles.boxSpaceBottom} />
          </ScrollView>
        </View>
        {this.renderTotalPrice()}
        {/** loading */}
        {this.renderLoading()}
        {/* this for all modal that will show */}
        {this.renderModalListProduct()}
        {this.renderModalListPaymentType()}
        {this.renderModalListPaymentMethod()}
        {this.renderModalParcelDetail()}
        {this.renderModalPaymentMethodDetail()}
        {this.renderModalTAndR()}
        {this.renderModalConfirmOrder()}
        {this.renderWarningNotSelectPayment()}
        {this.renderModalBottomStockConfirmationConfirmOrder()}
        {this.renderModalBottomErrorMinimumOrder()}
        {this.renderModalErrorBalance()}
        {this.renderModalErrorPayment()}
      </View>
    );
  }

  render() {
    return !this.props.cart.loadingPostCheckout &&
      this.state.dataCheckout !== null &&
      this.state.orderProduct.length > 0
      ? this.renderItem()
      : this.renderSkeleton();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  boxSpaceBottom: {
    height: 0.07 * height
  },
  boxListProductInCart: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderWidth: 0,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  boxMargin: {
    height: 10,
    backgroundColor: '#f2f2f2'
  },
  boxAddress: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 10
  },
  boxListItemProductInCart: {
    flexDirection: 'row'
  },
  productImage: {
    resizeMode: 'contain',
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  boxTotalPrice: {
    height: 0.09 * height,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#f2f2f2'
  },
  boxListItem: {
    flexDirection: 'row',
    paddingHorizontal: 11,
    paddingVertical: 11
  },
  boxTitle: {
    paddingLeft: 10,
    paddingVertical: 10
  },
  boxSubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    borderColor: '#f2f2f2'
  },
  /** text */
  titleBoxText: {
    color: '#333333',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratBold
  },
  textSubTotal: {
    color: '#333333',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium,
    lineHeight: 14
  },
  subTotalText: {
    marginLeft: 5,
    marginTop: -1,
    color: '#333333',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratBold
  },
  textGantiAlamat: {
    color: '#f0444c',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratSemiBold
  },
  textAlamatTitle: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratSemiBold
  },
  textAlamat: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratRegular,
    lineHeight: RFPercentage(1.7),
    textTransform: 'capitalize'
  },
  textName: {
    color: '#333333',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratSemiBold
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  textPilihMetode: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium
  },
  potonganText: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratRegular
  },
  supplierTitle: {
    color: '#333333',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratBold
  },
  brandTitle: {
    color: '#333333',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratSemiBold
  },
  discountText: {
    color: '#828282',
    fontSize: RFPercentage(1.2),
    fontFamily: Fonts.MontserratItalic
  },
  nameProductText: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium
  },
  variationProductText: {
    color: '#828282',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  priceTextRed: {
    color: '#f0444c',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratSemiBold
  },
  priceTextCross: {
    color: '#bdbdbd',
    textDecorationLine: 'line-through',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium,
    marginRight: 10
  },
  tersisaText: {
    color: '#f0444c',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium
  },
  totalText: {
    color: '#828282',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratMedium
  },
  ongkirText: {
    color: '#f57423',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium
  },
  totalPriceText: {
    color: '#f0444c',
    fontSize: RFPercentage(1.7),
    fontFamily: Fonts.MontserratBold
  },
  /** for button */
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 5,
    width: 115,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 5,
    width: 80,
    height: 41
  }
});

const mapStateToProps = ({ cart, profile, global }) => {
  return { cart, profile, global };
};

export default connect(mapStateToProps, {
  confirmOrder,
  successOrderFlag,
  saveItemCataloguesCheckout,
  deleteOrder,
  saveChecklistCart
})(CheckoutListView);
