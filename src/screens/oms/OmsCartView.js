import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import {
  ButtonSingleSmall,
  ModalConfirmation,
  LoadingPage,
  Address,
  OrderButton,
  EmptyData,
  ErrorPage,
  SelectedMerchantName,
  ModalBottomErrorRespons,
  ImageKit,
  MultipleOrderButton
} from '../../library/component';
import { Color } from '../../config';
import { GlobalStyle, Fonts, MoneyFormat, NumberFormat } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import CallCS from '../../screens/global/CallCS';

const { width, height } = Dimensions.get('window');

class OmsCartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** modal */
      openModalToCheckoutConfirmation: false,
      openModalDeleteConfirmation: false,
      openModalCS: false,
      openModalErrorGlobal: false,
      /** data */
      buttonCheckoutDisabled: false,
      productWantToDelete: null,
      productCartArray: [],
      loading: false,
      cartId: null,
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
      this.loading(true);
      this.getCartItem(this.props.oms.dataCart);
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
     * === SUCCESS GET CART ====
     * after success get list of product by dataCart
     */
    if (
      prevProps.oms.dataOmsGetCartItem !== this.props.oms.dataOmsGetCartItem
    ) {
      if (this.props.oms.dataOmsGetCartItem !== null) {
        this.loading(false);
        this.convertListProductToLocalState();
      }
    }
    /**
     * === SUCCESS POST CHECKOUT ITEM ====
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
     * === SUCCESS POST VERIFICATION ====
     * after success get verification data go to verification page
     */
    if (prevProps.oms.dataOmsCheckPromo !== this.props.oms.dataOmsCheckPromo) {
      if (this.props.oms.dataOmsCheckPromo !== null) {
        NavigationService.navigate('OmsVerificationView', {
          cartId: this.state.cartId
        });
      }
    }
    /**
     * === SUCCESS GET CART FROM CHECKOUT ====
     * after success get list of product by dataCart
     */
    if (
      prevProps.oms.dataOmsGetCartItemFromCheckout !==
      this.props.oms.dataOmsGetCartItemFromCheckout
    ) {
      if (this.props.oms.dataOmsGetCartItemFromCheckout !== null) {
        this.setState({
          cartId: this.props.oms.dataOmsGetCartItemFromCheckout.id
        });
      }
    }
    /**
     * ==============================
     * ERROR RESPONS
     * ==============================
     */
    /** ERROR GET CART LIST */
    if (
      prevProps.oms.errorOmsGetCartItem !== this.props.oms.errorOmsGetCartItem
    ) {
      if (this.props.oms.errorOmsGetCartItem !== null) {
        this.setState({ loading: false });
      }
    }
    /** ERROR GET CHECKOUT LIST
     * => moved to OmsVerificationPage
     */
    if (
      prevProps.oms.errorOmsGetCheckoutItem !==
      this.props.oms.errorOmsGetCheckoutItem
    ) {
      if (this.props.oms.errorOmsGetCheckoutItem !== null) {
        if (this.props.oms.errorOmsGetCheckoutItem.code === 400) {
          this.modifyProductCartArrayWhenError();
        }
      }
    }
    /** ERROR CHECK PROMO */
    if (
      prevProps.oms.errorOmsCheckPromo !== this.props.oms.errorOmsCheckPromo
    ) {
      if (this.props.oms.errorOmsCheckPromo !== null) {
        if (this.props.oms.errorOmsCheckPromo.code === 400) {
          /** This for check promo error, open modal error global */
          if (
            this.props.oms.errorOmsCheckPromo.data.errorCode ===
            'ERR-CHECK-PROMO'
          ) {
            this.setState({ openModalErrorGlobal: true });
          }
        }
      }
    }
  }
  /**
   * =====================
   * CALLED FROM CHILD
   * =======================
   * - call cs
   */
  parentFunction(data) {
    switch (data.type) {
      case 'close':
        this.setState({ openModalCS: false });
        break;
      default:
        break;
    }
  }
  /**
   * =========================
   * GLOBAL FUNCTION
   * ========================
   */
  /** => get cart item */
  getCartItem(catalogues) {
    this.props.omsGetCartItemProcess({ catalogues });
  }
  /** => start loading */
  loading(loading) {
    this.setState({ loading });
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
   * => THIS FUNCTION MODIFY ALL DATA CART (CHECKLIST AND STATUS)
   * => LAST EDIT 22042020 (FIX FOR WAREHOUSE LOGIC)
   */
  convertListProductToLocalState() {
    const productCartArray = [];
    this.props.oms.dataOmsGetCartItem.cartParcels.forEach(item => {
      item.cartBrands.forEach(itemBrand => {
        for (let i = 0; i < itemBrand.cartBrandCatalogues.length; i++) {
          const productItem = itemBrand.cartBrandCatalogues[i];
          /** => makes all sku check (choose) */
          productItem.checkBox = true;
          /** => Check if SKU has maxQty */
          productItem.qty =
            productItem.isMaximum && productItem.qty > productItem.maxQty
              ? productItem.maxQty
              : productItem.qty;
          /** => grouping all sku (available, out of stock, and unavailable) */
          if (productItem.catalogue.status === 'inactive') {
            productItem.statusInCart = 'unavailable';
          } else {
            if (productItem.catalogue.warehouseCatalogues.length > 0) {
              const warehouseCatalogues =
                productItem.catalogue.warehouseCatalogues[0];
              if (
                !warehouseCatalogues.unlimitedStock &&
                warehouseCatalogues.stock < productItem.catalogue.minQty
              ) {
                productItem.statusInCart = 'outStock';
              } else {
                productItem.statusInCart = 'available';
              }
            } else {
              productItem.statusInCart = 'unavailable';
            }
          }
          /** => this for record checklist per sku */
          if (this.props.oms.dataCheckBoxlistCart.length > 0) {
            /** => find if sku already in dataCheckBoxlistCart */
            const indexDataCheckBoxlistCart = this.props.oms.dataCheckBoxlistCart.findIndex(
              itemDataCheckBoxlistCart =>
                itemDataCheckBoxlistCart.catalogue.id ===
                itemBrand.cartBrandCatalogues[i].catalogue.id
            );
            /** => if sku already in dataCheckBoxlistCart, make checkBox same with sku in dataCheckBoxlistCart */
            if (indexDataCheckBoxlistCart > -1) {
              productItem.checkBox = this.props.oms.dataCheckBoxlistCart[
                indexDataCheckBoxlistCart
              ].checkBox;
            }
          }
          /** => push to array productCartArray  */
          productCartArray.push(productItem);
        }
      });
    });
    /** => save to oms.dataCheckBoxlistCart */
    this.props.omsCheckListCart(productCartArray);
    /** => save to local state */
    this.setState({
      productCartArray,
      cartId: this.props.oms.dataOmsGetCartItem.id
    });
  }
  /**
   * => THIS FUNCTION FOR MODIFY ALL DATA IN this.state.productCartArray
   * => IF there is error from BE
   */
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
            this.setState({
              cartId: item.cartId
            });
            productCartArray[indexProductCartArray].qty = item.suggestedStock;
            productCartArray[indexProductCartArray].catalogue.stock =
              item.catalogueStock;
            break;
          case 'ERR-PRICE':
            this.setState({
              cartId: item.cartId
            });
            productCartArray[indexProductCartArray].grossPrice =
              item.newCatalogueGrossPrice;
            break;
          case 'ERR-STATUS':
          case 'ERR-WAREHOUSE':
            this.setState({
              cartId: item.cartId
            });
            productCartArray[indexProductCartArray].statusInCart =
              'unavailable';
            productCartArray[indexProductCartArray].checkBox = true;
            break;
          case 'ERR-RUN-OUT':
            this.setState({
              cartId: item.cartId
            });
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
    productCartArray[indexProductCartArray].detail = data.detail;
    this.setState({ productCartArray });
    /**
     * jangan hapus code dibawah
     * code untuk update qty
     * akan tetapi lelet, jadi dipindah ke willunmount
     * code :
     * this.forCartData('update', data.catalogueId, data.qty);
     */
  }

  parentFunctionFromMultipleOrderButton(data) {
    console.log('Multiple Order Button', data);
    const productCartArray = this.state.productCartArray;
    const indexProductCartArray = productCartArray.findIndex(
      item => item.catalogueId === data.catalogueId
    );
    const { smallUomQty, largeUomQty, packagedQty } = data.detail;
    productCartArray[indexProductCartArray].qty =
      largeUomQty * packagedQty + smallUomQty;
    productCartArray[indexProductCartArray].detail = data.detail;
    this.setState({ productCartArray });
  }
  /** === CHECK LIST SKU LEVEL */
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
  /** === CHECK LIST BRAND LEVEL */
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
  /** === CHECK LIST ALL SKU === */
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
  /** === TOTAL PRICE === */
  totalPriceValue() {
    /** => only calculate available and checklist sku */
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(item => item.grossPrice * item.qty);
    return mapProduct.reduce((a, b) => a + b, 0);
  }
  /** === CHECK SKU IN CART BEFORE GO TO CHECKOUT === */
  checkCartBeforeCheckout() {
    /** => only take available sku and checklist sku */
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(item => {
      return {
        catalogueId: parseInt(item.catalogueId, 10),
        qty: item.qty,
        detail: item.detail
      };
    });
    /** => save to oms.dataCheckout */
    this.props.omsCheckoutItem(mapProduct);
    /** => verification page */
    this.props.omsCheckPromoProcess({
      cartId: this.state.cartId,
      catalogues: mapProduct
    });
  }
  /** === DELETE SKU IN CART === */
  deleteProductInCart() {
    if (this.state.productWantToDelete !== null) {
      const productCartArray = this.state.productCartArray;
      /** => delete sku from productCartArray */
      const indexProductCartArray = productCartArray.findIndex(
        item => item.catalogueId === this.state.productWantToDelete.catalogueId
      );
      if (indexProductCartArray > -1) {
        productCartArray.splice(indexProductCartArray, 1);
        this.setState({ productCartArray });
      }
      /** => delete sku in cart */
      this.forCartData(
        'delete',
        this.state.productWantToDelete.catalogueId,
        this.state.productWantToDelete.qty
      );
    }
  }
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  /**
   * ===========================
   * RENDER GLOBAL USED
   * ==========================
   */
  /** === RENDER IMAGE GLOBAL === */
  renderImageGlobal(item) {
    return (
      <View
        style={{
          paddingHorizontal: 8,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ImageKit
          defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
          uri={item.catalogue.catalogueImages[0].imageUrl}
          style={[
            GlobalStyle.image77Contain,
            { opacity: item.statusInCart === 'available' ? 1 : 0.5 }
          ]}
        />
      </View>
    );
  }
  /** === RENDER NAME GLOBAL === */
  renderNameGlobal(item) {
    return (
      <View>
        <Text
          style={[
            Fonts.type16,
            {
              textTransform: 'capitalize',
              opacity: item.statusInCart === 'available' ? 1 : 0.5
            }
          ]}
        >
          {item.catalogue.name}
        </Text>
      </View>
    );
  }
  /** === RENDER PRICE PER SKU GLOBAL === */
  renderPriceProductGlobal(item) {
    const opacity = item.statusInCart === 'available' ? 1 : 0.5;
    return (
      <View style={{ paddingVertical: 10 }}>
        <View>
          <Text style={[Fonts.type36, { opacity }]}>
            {MoneyFormat(item.grossPrice)}
          </Text>
        </View>
      </View>
    );
  }
  /** === RENDER DELETE ICON === */
  renderDeleteIcon(item) {
    return (
      <TouchableOpacity
        style={{ alignItems: 'flex-end' }}
        onPress={() => this.wantDelete(item)}
      >
        <Image
          source={require('../../assets/icons/oms/delete.png')}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    );
  }
  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   * - Address (+++RENDER ADDRESS)
   * - list sku (+++RENDER SKU LIST SECTION)
   * - total price (+++RENDER BOTTOM SECTION)
   */
  renderContentItem() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderMerchantName()}
          {this.renderAddress()}
          {this.renderListCart()}
          {this.renderForErrorProduct()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
        {this.renderBottomSection()}
      </View>
    );
  }
  /**
   * =============================
   * +++RENDER MERCHANT NAME
   * =============================
   */
  renderMerchantName() {
    return <SelectedMerchantName shadow />;
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
            accessibilityLabel={'txtCartAlamat'}
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
  /**
   * ==================================
   * +++RENDER SKU LIST SECTION
   * ==================================
   * - list brand (===> RENDER LIST BRAND)
   * - estimation 3PL section ()
   * - discount section ()
   */
  renderListCart() {
    return this.props.oms.dataOmsGetCartItem.cartParcels.map((item, index) => {
      return (
        <View key={index}>
          {this.state.productCartArray.find(
            itemProductCartArray =>
              itemProductCartArray.parcelId === item.id &&
              itemProductCartArray.statusInCart === 'available'
          ) !== undefined ? (
            <View style={GlobalStyle.shadowForBox}>
              <View style={GlobalStyle.boxPaddingOms} />
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
  /**
   * ===> RENDER LIST BRAND =====
   * - list cart item per brand (===> RENDER LIST CART ITEM)
   * */
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
              <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
              <View
                style={[
                  styles.boxListItemProductInCart,
                  { paddingVertical: 8, paddingHorizontal: 16 }
                ]}
              >
                <TouchableOpacity
                  style={styles.boxChecklist}
                  onPress={() => this.checkBoxBrand(item.brandId)}
                >
                  {this.state.productCartArray.filter(
                    itemProductCartArray =>
                      itemProductCartArray.brandId === item.brandId &&
                      !itemProductCartArray.checkBox &&
                      itemProductCartArray.statusInCart === 'available'
                  ).length === 0 ? (
                    <MaterialCommunityIcons
                      color={Color.mainColor}
                      name="checkbox-marked"
                      size={24}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      color={Color.fontBlack40}
                      name="checkbox-blank-outline"
                      size={24}
                    />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={Fonts.type16}>{item.brand.name}</Text>
                </View>
              </View>
              <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
            </View>
          ) : (
            <View />
          )}
          {this.renderListCartItem(item)}
        </View>
      );
    });
  }

  /**
   * ===> RENDER LIST CART ITEM ===
   * - order button per item
   * - price per item product (===> RENDER PRICE PER SKU)
   * - item
   */
  renderButtonOrder(itemForOrderButton, uomDetail) {
    console.log(itemForOrderButton);
    return (
      <View style={{ marginLeft: 30 }}>
        {!itemForOrderButton.enableLargeUom ? (
          <OrderButton
            showKeyboard={this.state.showKeyboard}
            item={itemForOrderButton}
            uomDetail={uomDetail}
            onRef={ref => (this.parentFunctionFromOrderButton = ref)}
            parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
              this
            )}
          />
        ) : (
          <MultipleOrderButton
            showKeyboard={this.state.showKeyboard}
            item={itemForOrderButton}
            uomDetail={uomDetail}
            onRef={ref => (this.parentFunctionFromMultipleOrderButton = ref)}
            parentFunctionFromOrderButton={this.parentFunctionFromMultipleOrderButton.bind(
              this
            )}
          />
        )}
      </View>
    );
  }

  renderChecklist(item) {
    return (
      <TouchableOpacity
        style={{ width: 30, justifyContent: 'center' }}
        onPress={() => this.checkBoxProduct(item.catalogue.id)}
      >
        {this.state.productCartArray.findIndex(
          itemProductCartArray =>
            itemProductCartArray.catalogueId === item.catalogue.id &&
            item.checkBox
        ) > -1 ? (
          <MaterialCommunityIcons
            color={Color.mainColor}
            name="checkbox-marked"
            size={24}
          />
        ) : (
          <MaterialCommunityIcons
            color={Color.fontBlack40}
            name="checkbox-blank-outline"
            size={24}
          />
        )}
      </TouchableOpacity>
    );
  }

  renderListCartItemContent(item, itemForOrderButton) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          {this.renderChecklist(item)}
          {this.renderImageGlobal(item)}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flex: 9,
                  justifyContent: 'center',
                  marginRight: 8
                }}
              >
                {this.renderNameGlobal(item)}
              </View>
              <View style={{ flex: 1 }}>{this.renderDeleteIcon(item)}</View>
            </View>
            <View style={{ flex: 1 }}>
              {this.renderPriceProductGlobal(item)}
            </View>
          </View>
        </View>
        {this.renderButtonOrder(itemForOrderButton, item.detail)}
      </View>
    );
  }
  /**
   * ===> RENDER LIST CART ITEM ===
   * - price per item product (===> RENDER PRICE PER SKU)
   * - stock (===> RENDER STOCK PER SKU)
   */
  renderListCartItem(productItem) {
    return this.state.productCartArray.map((item, index) => {
      const itemForOrderButton = item.catalogue;
      itemForOrderButton.addToCart = true;
      itemForOrderButton.qtyToCart =
        item.isMaximum && item.qty > item.maxQty ? item.maxQty : item.qty;
      itemForOrderButton.maxQty = item.maxQty;
      itemForOrderButton.isMaximum = item.isMaximum;
      return item.brandId === productItem.brandId &&
        item.statusInCart === 'available' ? (
        <View style={styles.boxListItem} key={index}>
          {/* <TouchableOpacity
            style={{ width: 30 }}
            onPress={() => this.checkBoxProduct(item.catalogue.id)}
          >
            {this.state.productCartArray.findIndex(
              itemProductCartArray =>
                itemProductCartArray.catalogueId === item.catalogue.id &&
                item.checkBox
            ) > -1 ? (
              <MaterialCommunityIcons
                color={Color.mainColor}
                name="checkbox-marked"
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                color={Color.fontBlack40}
                name="checkbox-blank-outline"
                size={24}
              />
            )}
          </TouchableOpacity> */}
          {this.renderListCartItemContent(item, itemForOrderButton)}
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /**
   * ============================
   * RENDER SKU ERROR SECTION
   * ============================
   */
  /** === RENDER MAIN ERROR === */
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
  /** === RENDER MAIN PRODUCT TIDAK TERSEDIA === */
  renderProductTidakTersedia() {
    return this.state.productCartArray.filter(
      item => item.statusInCart === 'unavailable'
    ).length > 0 ? (
      <View>
        <View style={GlobalStyle.boxPaddingOms} />
        <View style={GlobalStyle.shadowForBox}>
          <View style={styles.boxTitle}>
            <Text style={Fonts.type48}>Produk Tidak Tersedia</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          {this.renderProductContentErrorTidakTersedia()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER MAIN PRODUCT HABIS === */
  renderProductHabis() {
    return this.state.productCartArray.filter(
      item => item.statusInCart === 'outStock'
    ).length > 0 ? (
      <View>
        <View style={GlobalStyle.boxPaddingOms} />
        <View style={GlobalStyle.shadowForBox}>
          <View style={styles.boxTitle}>
            <Text style={Fonts.type48}>Produk Habis</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          {this.renderProductContentErrorProductHabis()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER PRODUCT HABIS === */
  renderProductContentErrorProductHabis() {
    return this.state.productCartArray.map((item, index) => {
      return item.statusInCart === 'outStock' ? (
        <View style={styles.boxContent} key={index}>
          {this.renderImageGlobal(item)}
          <View style={styles.boxContentProductHabis}>
            {this.renderNameGlobal(item)}
            {this.renderPriceProductGlobal(item)}
          </View>
          {this.renderDeleteIcon(item)}
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** === RENDER PRODUCT TIDAK TERSEDIA === */
  renderProductContentErrorTidakTersedia() {
    return this.state.productCartArray.map((item, index) => {
      return item.statusInCart === 'unavailable' ? (
        <View style={styles.boxContent} key={index}>
          {this.renderImageGlobal(item)}
          <View style={styles.boxContentProductHabis}>
            {this.renderNameGlobal(item)}
            {this.renderPriceProductGlobal(item)}
          </View>
          {this.renderDeleteIcon(item)}
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /**
   * ===============================
   * +++RENDER BOTTOM SECTION
   * ===============================
   * - checklist bottom (===> RENDER TOTAL BOTTOM CHECK LIST)
   * - total value bottom (===> RENDER TOTAL BOTTOM VALUE)
   * - checkout button bottom (===> RENDER BUTTON CHECKOUT)
   */
  renderBottomSection() {
    return (
      <View style={styles.bottomContainer}>
        {this.renderBottomCheckList()}
        {this.renderBottomValue()}
        {this.renderCheckoutButton()}
      </View>
    );
  }
  /** ===> RENDER TOTAL BOTTOM CHECK LIST === */
  renderBottomCheckList() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.boxChecklist}
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
            <MaterialCommunityIcons
              color={Color.mainColor}
              name="checkbox-marked"
              size={24}
            />
          ) : (
            <MaterialCommunityIcons
              color={Color.fontBlack40}
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
  /** ===> RENDER TOTAL BOTTOM VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.boxBottomValue}>
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
  /** ===> RENDER BUTTON CHECKOUT === */
  renderCheckoutButton() {
    return (
      <ButtonSingleSmall
        accessible={true}
        accessibilityLabel={'btnKeranjangCheckout'}
        disabled={
          this.props.oms.loadingOmsCheckPromo ||
          this.props.oms.loadingOmsGetCheckoutItem ||
          this.props.oms.loadingOmsGetCartItemFromCheckout ||
          this.state.productCartArray.find(
            item => item.checkBox && item.statusInCart === 'available'
          ) === undefined
        }
        loading={
          this.props.oms.loadingOmsCheckPromo ||
          this.props.oms.loadingOmsGetCheckoutItem ||
          this.props.oms.loadingOmsGetCartItemFromCheckout
        }
        loadingPadding={20}
        onPress={() => this.wantToGoCheckout()}
        title={'Checkout'}
        borderRadius={4}
      />
    );
  }
  /**
   * =======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>S.>S>S>S>S>S>SS>>SS
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
  /**
   * ===================================
   * MODAL
   * ===================================
   * - delete sku (===> RENDER MODAL DELETE SKU CONFIRMATION)
   * - go to checkout (===> RENDER MODAL CHECKOUT CONFIRMATION)
   * - stock confirmation (===> RENDER MODAL SKU STATUS CONFIRMATION)
   * - error respons from BE (===> RENDER MODAL ERROR RESPONS FROM BE)
   */
  /** ===> RENDER MODAL CHECKOUT CONFIRMATION === */
  renderModalConfirmationCheckout() {
    return this.state.openModalToCheckoutConfirmation ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalToCheckoutConfirmation}
        okText={'Ya'}
        cancelText={'Tidak'}
        content={'Konfirmasi order dan lanjut ke Checkout ?'}
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalToCheckoutConfirmation: false });
          this.checkCartBeforeCheckout();
        }}
        cancel={() => this.setState({ openModalToCheckoutConfirmation: false })}
      />
    ) : (
      <View />
    );
  }
  /** ===> RENDER MODAL DELETE SKU CONFIRMATION === */
  renderModalDeleteSKUConfirmation() {
    return (
      <View>
        {this.state.openModalDeleteConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalDeleteConfirmation}
            okText={'Ya'}
            cancelText={'Tidak'}
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
  /** === MODAL CALL CS === */
  renderModalCallCS() {
    return this.state.openModalCS ? (
      <View>
        <CallCS
          statusBarRed
          open={this.state.openModalCS}
          close={() => this.setState({ openModalCS: false })}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** ===> RENDER MODAL ERROR RESPONS FROM BE ===  */
  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
        }}
      />
    ) : (
      <View />
    );
  }
  /**
   * ====================
   * EMPTY STATE
   * ====================
   */
  /** === RENDER EMPTY STATE === */
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
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {!this.props.oms.loadingOmsGetCartItem &&
        this.props.oms.dataOmsGetCartItem !== null
          ? this.renderContentItem()
          : this.renderCheckIfErrorGetCartList()}
      </View>
    );
  }
  /** === RENDER IF ERROR BE === */
  renderCheckIfErrorGetCartList() {
    return this.props.oms.errorOmsGetCartItem !== null
      ? this.renderErrorGetCartList()
      : this.renderSkeleton();
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
          ? this.renderContent()
          : this.renderEmpty()}
        {/* modal */}
        {this.renderModalConfirmationCheckout()}
        {this.renderModalDeleteSKUConfirmation()}
        {this.renderModalCallCS()}
        {this.renderModalErrorRespons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    flex: 1
  },
  bottomContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Color.fontBlack10
  },
  /** for list order */
  boxListProductInCart: {
    backgroundColor: Color.backgroundWhite,
    paddingVertical: 10
  },
  /** for address */
  boxAddress: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxTitle: {
    paddingLeft: 16,
    paddingVertical: 10
  },
  boxListItemProductInCart: {
    flexDirection: 'row'
  },
  /** bottom bar */
  boxBottomValue: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },
  boxChecklist: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-start'
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
  }
});

const mapStateToProps = ({ merchant, oms }) => {
  return { merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OmsCartView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Change key
 *
 */
