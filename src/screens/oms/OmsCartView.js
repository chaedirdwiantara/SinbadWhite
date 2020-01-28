import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import masterColor from '../../config/masterColor.json';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';
import ModalConfirmation from '../../components/modal/ModalConfirmation';
import { LoadingPage } from '../../components/Loading';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import GlobalStyles from '../../helpers/GlobalStyle';
import { MoneyFormat } from '../../helpers/NumberFormater';
import OrderButton from '../../components/OrderButton';
import EmptyData from '../../components/empty_state/EmptyData';
import ModalBottomErrorRespons from '../../components/error/ModalBottomErrorRespons';
import ErrorPage from '../../components/error/ErrorPage';
import ModalBottomStockConfirmation from './ModalBottomStockConfirmation';
import SelectedMerchantName from '../../components/SelectedMerchantName';

const { width, height } = Dimensions.get('window');

class OmsCartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** modal */
      openModalToCheckoutConfirmation: false,
      openModalStockConfirmation: false,
      openModalErrorGlobal: false,
      openModalDeleteConfirmation: false,
      /** data */
      buttonCheckoutDisabled: false,
      productWantToDelete: null,
      productCartArray: [],
      /** error */
      errorOmsGetCartItem: false
    };
  }
  /**
   * =============================
   * FUNCTIONAL
   * =============================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    if (this.props.oms.dataCart.length > 0) {
      this.props.omsGetCartItemProcess({
        storeId: this.props.merchant.selectedMerchant.storeId,
        catalogues: this.props.oms.dataCart
      });
    }
  }
  /** === DID UPDATE */
  componentDidUpdate(prevProps) {
    /**
     * ========================
     * SUCCESS RESPONS
     * =======================
     */
    /**
     * ===== SUCCESS POST CART ====
     * after success get list of product by dataCart
     */
    if (
      prevProps.oms.dataOmsGetCartItem !== this.props.oms.dataOmsGetCartItem
    ) {
      if (this.props.oms.dataOmsGetCartItem !== null) {
        this.convertListProductToLocalState();
      }
    }
    /**
     * ===== SUCCESS POST CHECKOUT ITEM ====
     * after success get item checkout go to checkout page
     */
    if (
      prevProps.oms.dataOmsGetCheckoutItem !==
      this.props.oms.dataOmsGetCheckoutItem
    ) {
      if (this.props.oms.dataOmsGetCheckoutItem !== null) {
        NavigationService.navigate('OmsCheckoutView');
      }
    }
    /**
     * ==============================
     * ERROR RESPONS
     * ==============================
     */
    /** ERROR GET CHECKOUT LIST */
    if (
      prevProps.oms.errorOmsGetCheckoutItem !==
      this.props.oms.errorOmsGetCheckoutItem
    ) {
      if (this.props.oms.errorOmsGetCheckoutItem !== null) {
        if (this.props.oms.errorOmsGetCheckoutItem.code === 400) {
          this.setState({ openModalStockConfirmation: true });
          this.modifyProductCartArrayWhenError();
        } else {
          this.setState({ openModalErrorGlobal: true });
        }
      }
    }
  }
  /**
   * ==========================================
   * ALL FUNCTION IN COMPONENT DID UPDATE START
   * ==========================================
   * note:
   * statusInCart:
   *  - 'available' = no error for product
   *  - 'outStock' = stok habis
   *  - 'unavailable' = tidak tersedia
   */

  convertListProductToLocalState() {
    const productCartArray = [];
    this.props.oms.dataOmsGetCartItem.cartParcels.forEach(item => {
      item.cartBrands.forEach(itemBrand => {
        for (let i = 0; i < itemBrand.cartBrandCatalogues.length; i++) {
          const productItem = itemBrand.cartBrandCatalogues[i];
          productItem.checkBox = true;
          if (
            !productItem.catalogue.unlimitedStock &&
            productItem.catalogue.stock < productItem.catalogue.minQty
          ) {
            productItem.statusInCart = 'outStock';
          } else if (productItem.catalogue.status === 'inactive') {
            productItem.statusInCart = 'unavailable';
          } else {
            productItem.statusInCart = 'available';
          }
          if (this.props.oms.dataCheckBoxlistCart.length > 0) {
            const indexDataCheckBoxlistCart = this.props.oms.dataCheckBoxlistCart.findIndex(
              itemDataCheckBoxlistCart =>
                itemDataCheckBoxlistCart.catalogue.id ===
                itemBrand.cartBrandCatalogues[i].catalogue.id
            );
            if (indexDataCheckBoxlistCart > -1) {
              productItem.checkBox = this.props.oms.dataCheckBoxlistCart[
                indexDataCheckBoxlistCart
              ].checkBox;
              productItem.statusInCart =
                !productItem.catalogue.unlimitedStock &&
                productItem.catalogue.stock < productItem.catalogue.minQty
                  ? 'outStock'
                  : this.props.oms.dataCheckBoxlistCart[
                      indexDataCheckBoxlistCart
                    ].statusInCart;
            }
          }
          productCartArray.push(productItem);
        }
      });
    });
    this.setState({ productCartArray });
  }

  modifyProductCartArrayWhenError() {
    /** function for edit productCartArray */
    const productCartArray = this.state.productCartArray;
    /** modification for checklist */
    this.props.oms.errorOmsGetCheckoutItem.data.forEach(item => {
      const indexProductCartArray = productCartArray.findIndex(
        itemProductCartArray =>
          itemProductCartArray.catalogueId === item.catalogue.id
      );
      if (indexProductCartArray > -1) {
        switch (item.errorCode) {
          case 'ERR-STOCK':
            productCartArray[indexProductCartArray].qty = item.suggestedStock;
            productCartArray[indexProductCartArray].catalogue.stock =
              item.catalogueStock;
            break;
          case 'ERR-STATUS':
            productCartArray[indexProductCartArray].statusInCart =
              'unavailable';
            productCartArray[indexProductCartArray].checkBox = true;
            break;
          case 'ERR-RUN-OUT':
            productCartArray[indexProductCartArray].statusInCart = 'outStock';
            productCartArray[indexProductCartArray].checkBox = true;
            break;
          default:
            break;
        }
        this.setState({ productCartArray });
      }
    });
  }

  /**
   * ==========================================
   * ALL FUNCTION IN COMPONENT DID UPDATE END
   * ==========================================
   */
  wantToGoCheckout() {
    this.setState({ openModalToCheckoutConfirmation: true });
  }

  wantDelete(item) {
    this.setState({
      openModalDeleteConfirmation: true,
      productWantToDelete: item
    });
  }

  forCartData(method, catalogueId, qty) {
    this.props.omsAddToCart({
      method,
      catalogueId,
      qty
    });
  }

  parentFunctionFromOrderButton(data) {
    const productCartArray = this.state.productCartArray;
    const indexProductCartArray = productCartArray.findIndex(
      item => item.catalogueId === data.catalogueId
    );
    productCartArray[indexProductCartArray].qty = data.qty;
    this.setState({ productCartArray });
    /**
     * jangan hapus code dibawah
     * code untuk update qty
     * akan tetapi lelet, jadi dipindah ke willunmount
     * code :
     * this.forCartData('update', data.catalogueId, data.qty);
     */
  }

  /** check box */

  checkBoxProduct(productId) {
    const productCartArray = this.state.productCartArray;
    const indexProductCartArray = productCartArray.findIndex(
      item => item.catalogueId === productId
    );
    if (indexProductCartArray > -1) {
      if (productCartArray[indexProductCartArray].checkBox) {
        productCartArray[indexProductCartArray].checkBox = false;
        this.setState({ productCartArray });
      } else {
        productCartArray[indexProductCartArray].checkBox = true;
        this.setState({ productCartArray });
      }
    }
  }

  checkBoxBrand(brandId) {
    const productCartArray = this.state.productCartArray;
    const productCartArrayAllboxCheck = productCartArray.find(
      itemProductCartArray =>
        itemProductCartArray.brandId === brandId &&
        !itemProductCartArray.checkBox
    );
    if (productCartArrayAllboxCheck === undefined) {
      productCartArray.forEach((item, index) => {
        if (item.brandId === brandId) {
          productCartArray[index].checkBox = false;
        }
      });
      this.setState({ productCartArray });
    } else {
      productCartArray.forEach((item, index) => {
        if (item.brandId === brandId) {
          productCartArray[index].checkBox = true;
        }
      });
      this.setState({ productCartArray });
    }
  }

  checkBoxAll() {
    const productCartArray = this.state.productCartArray;
    const productCartArrayAllboxCheck = productCartArray.find(
      itemProductCartArray => !itemProductCartArray.checkBox
    );
    if (productCartArrayAllboxCheck === undefined) {
      productCartArray.forEach((item, index) => {
        productCartArray[index].checkBox = false;
      });
      this.setState({ productCartArray });
    } else {
      productCartArray.forEach((item, index) => {
        productCartArray[index].checkBox = true;
      });
      this.setState({ productCartArray });
    }
  }

  /** for total price all product in cart */
  totalPriceValue() {
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(
      item =>
        (item.catalogue.discountedRetailBuyingPrice !== null
          ? item.catalogue.discountedRetailBuyingPrice
          : item.catalogue.retailBuyingPrice) * item.qty
    );
    return mapProduct.reduce((a, b) => a + b, 0);
  }

  /** check cart before go to checkout */
  checkCart() {
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(item => {
      return {
        catalogueId: parseInt(item.catalogueId, 10),
        qty: item.qty
      };
    });
    this.props.omsCheckoutItem(mapProduct);
    setTimeout(() => {
      this.props.omsGetCheckoutItemProcess({
        storeId: this.props.merchant.selectedMerchant.storeId,
        cartId: this.props.oms.dataOmsGetCartItem.id,
        catalogues: mapProduct
      });
    }, 100);
  }

  deleteProductInCart() {
    if (this.state.productWantToDelete !== null) {
      const productCartArray = this.state.productCartArray;
      /** delete item for check list */
      const indexProductCartArray = productCartArray.findIndex(
        item => item.catalogueId === this.state.productWantToDelete.catalogueId
      );
      if (indexProductCartArray > -1) {
        productCartArray.splice(indexProductCartArray, 1);
        this.setState({ productCartArray });
      }
      /** close modal delete */
      this.setState({
        openModalDeleteConfirmation: false
      });
      /** delete item for global cart data, product list, product details */
      setTimeout(() => {
        this.forCartData(
          'delete',
          this.state.productWantToDelete.catalogueId,
          this.state.productWantToDelete.qty
        );
      }, 1000);
    }
  }
  /**
   * ==========================================
   * ALL FUNCTION IN COMPONENT DID UPDATE START
   * ==========================================
   * note:
   * statusInCart:
   *  - 'available' = no error for product
   *  - 'outStock' = stok habis
   *  - 'unavailable' = tidak tersedia
   */
  /**
   * === GO TO CHECKOUT ===
   * - check cart first
   */
  /**
   * =============================
   * RENDER VIEW
   * ============================
   */
  /**
   * ==========================
   * MAIN CONTENT
   * ==========================
   */
  /** === RENDER ADDRESS === */
  /** RENDER SKELETON */
  renderSkeleton() {
    return <LoadingPage />;
  }
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
              <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
                {store.name}
              </Text>
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
  renderPriceProduct(item, opacity) {
    return (
      <View>
        {item.catalogue.discountedRetailBuyingPrice !== null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Text
                style={[
                  Fonts.type31,
                  { textDecorationLine: 'line-through', opacity }
                ]}
              >
                {MoneyFormat(item.catalogue.retailBuyingPrice)}
              </Text>
            </View>
            <View>
              <Text style={[Fonts.type36, { opacity }]}>
                {MoneyFormat(item.catalogue.discountedRetailBuyingPrice)}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={[Fonts.type36, { opacity }]}>
              {MoneyFormat(item.catalogue.retailBuyingPrice)}
            </Text>
          </View>
        )}
      </View>
    );
  }
  renderListCartItem(productItem) {
    return this.state.productCartArray.map((item, index) => {
      const itemForOrderButton = item.catalogue;
      itemForOrderButton.addToCart = true;
      itemForOrderButton.qtyToCart = item.qty;
      return item.brandId === productItem.brandId &&
        item.statusInCart === 'available' ? (
        <View style={styles.boxListItem} key={index}>
          <TouchableOpacity
            style={{ width: 30, justifyContent: 'center' }}
            onPress={() => this.checkBoxProduct(item.catalogue.id)}
          >
            {this.state.productCartArray.findIndex(
              itemProductCartArray =>
                itemProductCartArray.catalogueId === item.catalogue.id &&
                item.checkBox
            ) > -1 ? (
              <Icons
                color={masterColor.mainColor}
                name="checkbox-marked"
                size={24}
              />
            ) : (
              <Icons
                color={masterColor.fontBlack40}
                name="checkbox-blank-outline"
                size={24}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
                  source={{
                    uri: item.catalogue.catalogueImages[0].imageUrl
                  }}
                  style={styles.productImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
                    {item.catalogue.name}
                  </Text>
                </View>
                {/* <View style={{ marginVertical: 5 }}>
                  <Text style={styles.variationProductText}>variasi</Text>
                </View> */}
                <View style={{ marginVertical: 10 }}>
                  {this.renderPriceProduct(item, 1)}
                </View>
                <View>
                  <OrderButton
                    item={itemForOrderButton}
                    onRef={ref => (this.parentFunctionFromOrderButton = ref)}
                    parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
                      this
                    )}
                    onFocus={() => this.setState({ buttonAddDisabled: true })}
                    onBlur={() => this.setState({ buttonAddDisabled: false })}
                  />
                </View>
              </View>
              <View style={{ width: '30%', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{ alignItems: 'flex-end' }}
                  onPress={() => this.wantDelete(item)}
                >
                  <Image
                    source={require('../../assets/icons/oms/delete.png')}
                    style={{ height: 24, width: 24 }}
                  />
                </TouchableOpacity>
                <View style={{ alignItems: 'flex-end' }}>
                  {item.catalogue.displayStock ? (
                    <Text style={Fonts.type22}>
                      Tersisa {item.catalogue.stock} Pcs
                    </Text>
                  ) : (
                    <Text>{''}</Text>
                  )}
                </View>
              </View>
            </View>
            {/* <View>
              <Text style={styles.discountText}>
                *Beli 2 untuk dapatkan diskon Rp 5000
              </Text>
            </View> */}
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  /** Error Product Tidak Tersedia */

  renderProductTidakTersedia() {
    return this.state.productCartArray.filter(
      item => item.statusInCart === 'unavailable'
    ).length > 0 ? (
      <View>
        <View style={styles.boxMargin} />
        <View style={styles.boxErrorProduct}>
          <View style={styles.boxTitle}>
            <Text style={Fonts.type48}>Produk Tidak Tersedia</Text>
          </View>
          <View style={styles.lines} />
          {this.renderProductContentErrorTidakTersedia()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  /** list error product (tidak tersedia and out of stock) */
  renderForErrorProduct() {
    return this.state.productCartArray.filter(
      item =>
        item.statusInCart === 'unavailable' || item.statusInCart === 'outStock'
    ).length > 0 ? (
      <View>
        {this.renderProductTidakTersedia()}
        {this.renderProductHabis()}
      </View>
    ) : (
      <View />
    );
  }

  /** Error Product Habis */

  renderProductHabis() {
    return this.state.productCartArray.filter(
      item => item.statusInCart === 'outStock'
    ).length > 0 ? (
      <View>
        <View style={styles.boxMargin} />
        <View style={styles.boxErrorProduct}>
          <View style={styles.boxTitle}>
            <Text style={Fonts.type48}>Produk Habis</Text>
          </View>
          <View style={styles.lines} />
          {this.renderProductContentErrorProductHabis()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderProductContentErrorProductHabis() {
    return this.state.productCartArray.map((item, index) => {
      return item.statusInCart === 'outStock' ? (
        <View style={styles.boxContent} key={index}>
          <View style={[styles.boxContentItem, { width: '30%' }]}>
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: item.catalogue.catalogueImages[0].imageUrl
              }}
              style={[styles.productImage, { opacity: 0.5 }]}
            />
          </View>
          <View style={styles.boxContentProductHabis}>
            <View>
              <Text style={[Fonts.type16, { opacity: 0.5 }]}>
                {item.catalogue.name}
              </Text>
            </View>
            {/* <View>
              <Text
                style={[
                  styles.variationProductText,
                  { color: 'rgba(130, 130, 130, 0.5)' }
                ]}
              >
                variasi
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              {this.renderPriceProduct(item, 0.5)}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.wantDelete(item)}
            style={[styles.boxContentItem, { width: '20%' }]}
          >
            <Image
              source={require('../../assets/icons/oms/delete.png')}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderProductContentErrorTidakTersedia() {
    return this.state.productCartArray.map((item, index) => {
      return item.statusInCart === 'unavailable' ? (
        <View style={styles.boxContent} key={index}>
          <View style={[styles.boxContentItem, { width: '30%' }]}>
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: item.catalogue.catalogueImages[0].imageUrl
              }}
              style={[styles.productImage, { opacity: 0.5 }]}
            />
          </View>
          <View style={styles.boxContentProductHabis}>
            <View>
              <Text
                style={[
                  Fonts.type16,
                  { opacity: 0.5, textTransform: 'capitalize' }
                ]}
              >
                {item.catalogue.name}
              </Text>
            </View>
            {/* <View>
              <Text
                style={[
                  styles.variationProductText,
                  { color: 'rgba(130, 130, 130, 0.5)' }
                ]}
              >
                variasi
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              {this.renderPriceProduct(item, 0.5)}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.wantDelete(item)}
            style={[styles.boxContentItem, { width: '20%' }]}
          >
            <Image
              source={require('../../assets/icons/oms/delete.png')}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderListBrand(itemBrand) {
    return itemBrand.cartBrands.map((item, index) => {
      return (
        <View key={index}>
          {this.state.productCartArray.filter(
            itemProductCartArray =>
              itemProductCartArray.brandId === item.brandId &&
              itemProductCartArray.statusInCart === 'available'
          ).length > 0 ? (
            <View>
              <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
              <View
                style={[
                  styles.boxListItemProductInCart,
                  { paddingVertical: 8, paddingHorizontal: 16 }
                ]}
              >
                <TouchableOpacity
                  style={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                  onPress={() => this.checkBoxBrand(item.brandId)}
                >
                  {this.state.productCartArray.filter(
                    itemProductCartArray =>
                      itemProductCartArray.brandId === item.brandId &&
                      !itemProductCartArray.checkBox &&
                      itemProductCartArray.statusInCart === 'available'
                  ).length === 0 ? (
                    <Icons
                      color={masterColor.mainColor}
                      name="checkbox-marked"
                      size={24}
                    />
                  ) : (
                    <Icons
                      color={masterColor.fontBlack40}
                      name="checkbox-blank-outline"
                      size={24}
                    />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={Fonts.type16}>{item.brand.name}</Text>
                </View>
              </View>
              <View style={[GlobalStyles.lines, { marginLeft: 16 }]} />
            </View>
          ) : (
            <View />
          )}

          {this.renderListCartItem(item)}
        </View>
      );
    });
  }
  renderListCart() {
    return this.props.oms.dataOmsGetCartItem.cartParcels.map((item, index) => {
      return (
        <View key={index}>
          {this.state.productCartArray.find(
            itemProductCartArray =>
              itemProductCartArray.parcelId === item.id &&
              itemProductCartArray.statusInCart === 'available'
          ) !== undefined ? (
            <View>
              <View style={GlobalStyles.boxPadding} />
              <View style={styles.boxListProductInCart}>
                <View style={{ paddingBottom: 8, paddingHorizontal: 16 }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={Fonts.type48}>{item.invoiceGroup.name}</Text>
                  </View>
                </View>
                {this.renderListBrand(item)}
                {/* {this.renderEstimasiSection(item)} */}
                {/* {this.renderPotonganSection()} */}
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      );
    });
  }
  /** RENDER MAIN CONTENT */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderMerchantName()}
          {this.renderAddress()}
          {this.renderListCart()}
          {this.renderForErrorProduct()}

          <View style={{ paddingBottom: 50 }} />
        </ScrollView>

        {this.renderTotalBottom()}
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
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 10
          }}
        >
          <View>
            <Text>
              <Text style={Fonts.type9}>Total: </Text>
              <Text style={Fonts.type53}>
                {MoneyFormat(this.totalPriceValue())}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={Fonts.type74}>Belum termasuk PPN 10%</Text>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER TOTAL BOTTOM CHECK LIST === */
  renderBottomCheckList() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            width: 30,
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
          onPress={() => this.checkBoxAll()}
        >
          {this.state.productCartArray.filter(
            item => item.checkBox && item.statusInCart === 'available'
          ).length ===
            this.state.productCartArray.filter(
              item => item.statusInCart === 'available'
            ).length &&
          this.state.productCartArray.filter(
            item => item.statusInCart === 'available'
          ).length > 0 ? (
            <Icons
              color={masterColor.mainColor}
              name="checkbox-marked"
              size={24}
            />
          ) : (
            <Icons
              color={masterColor.fontBlack40}
              name="checkbox-blank-outline"
              size={24}
            />
          )}
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Text style={Fonts.type9}>Pilih Semua</Text>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON CHECKOUT === */
  renderCheckoutButton() {
    return (
      <ButtonSingleSmall
        disabled={
          this.props.oms.loadingOmsGetCheckoutItem ||
          this.state.productCartArray.find(
            item => item.checkBox && item.statusInCart === 'available'
          ) === undefined
        }
        loading={this.props.oms.loadingOmsGetCheckoutItem}
        loadingPadding={20}
        onPress={() => this.wantToGoCheckout()}
        title={'Checkout'}
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
   * ==================
   * MODAL
   * ===================
   */
  renderModalConfirmationCheckout() {
    return this.state.openModalToCheckoutConfirmation ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalToCheckoutConfirmation}
        content={'Konfirmasi order dan lanjut ke Checkout ?'}
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalToCheckoutConfirmation: false });
          this.checkCart();
        }}
        cancel={() => this.setState({ openModalToCheckoutConfirmation: false })}
      />
    ) : (
      <View />
    );
  }

  renderModalDeleteProductConfirmation() {
    return (
      <View>
        {this.state.openModalDeleteConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalDeleteConfirmation}
            content={'Apakah Anda yakin untuk menghapus barang ?'}
            type={'okeNotRed'}
            ok={() => {
              this.setState({ openModalDeleteConfirmation: false });
              this.deleteProductInCart();
            }}
            cancel={() => this.setState({ openModalDeleteConfirmation: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  renderMainContent() {
    return (
      <View style={styles.mainContainer}>
        {!this.props.oms.loadingOmsGetCartItem &&
        this.props.oms.dataOmsGetCartItem !== null
          ? this.renderContent()
          : this.renderCheckIfErrorGetCartList()}
      </View>
    );
  }

  renderCheckIfErrorGetCartList() {
    return this.props.oms.errorOmsGetCartItem !== null
      ? this.renderErrorGetCartList()
      : this.renderSkeleton();
  }

  renderModalStockConfirmation() {
    return (
      <View>
        {this.state.openModalStockConfirmation ? (
          <ModalBottomStockConfirmation
            open={this.state.openModalStockConfirmation}
            close={() => this.setState({ openModalStockConfirmation: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
          this.checkCart();
        }}
      />
    ) : (
      <View />
    );
  }

  renderEmpty() {
    return <EmptyData title={'Keranjang Kosong'} />;
  }
  /**
   * ===================
   * ERROR
   * ===================
   */
  renderErrorGetCartList() {
    return (
      <ErrorPage
        title={'Terjadi Kesalahan'}
        description={'Silahkan mencoba kembali'}
      />
    );
  }
  /** RENDER HEADER NAME OF MERCHANT */
  renderMerchantName() {
    return <SelectedMerchantName shadow />;
  }
  /**
   * ====================
   * MAIN
   * ====================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.oms.dataCart.length > 0
          ? this.renderMainContent()
          : this.renderEmpty()}
        {/* modal */}
        {this.renderModalConfirmationCheckout()}
        {this.renderModalDeleteProductConfirmation()}
        {this.renderModalStockConfirmation()}
        {this.renderModalErrorRespons()}
        {/* errr */}
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
  },
  boxListItemProductInCart: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  boxSpaceBottom: {
    height: 0.07 * height
  },
  boxMargin: {
    height: 10,
    backgroundColor: '#f2f2f2'
  },
  boxErrorProduct: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  boxContentProductHabis: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  boxListItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 11
  },
  boxContentItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row'
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    borderColor: '#f2f2f2'
  },
  productImage: {
    resizeMode: 'contain',
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  }
});

const mapStateToProps = ({ merchant, oms }) => {
  return { merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OmsCartView);
