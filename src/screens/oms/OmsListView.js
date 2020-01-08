import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers';
import { LoadingTransparentRed } from '../../components/Loading';
import css from '../../config/css.json';
import {
  postItemCart,
  getFastOrderCart,
  fetchProfileInformation,
  itemForCart,
  modifyProductListData,
  modifyProductDetailData,
  postItemCheckout,
  updateDataCart,
  modifyProductDataBatch,
  saveChecklistCart,
  selectedCategoryId
} from '../../redux/actions';
import ModalConfirmation from '../../components/ModalConfirmation';
import ModalBottomStockConfirmation from './ModalBottomStockConfirmation';
// import Recomendation from '../home/Recomendation';
import OrderButton from '../../components/OrderButton';

const { width, height } = Dimensions.get('window');

class OmsListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonCheckoutDisabled: false,
      modalDeleteConfirmation: false,
      modalToCheckoutConfirmation: false,
      modalStockConfirmation: false,
      productWantToDelete: null,
      productCartArray: [],
      loading: false
    };
  }

  componentDidMount() {
    this.props.fetchProfileInformation(true);
    /** check if triger from fast order or not */
    if (this.props.cart.fastOrderFlag === null) {
      this.props.postItemCart();
    } else {
      this.props.getFastOrderCart();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.cart.dataCartWithDataProduct !==
      this.props.cart.dataCartWithDataProduct
    ) {
      if (this.props.cart.dataCartWithDataProduct !== null) {
        this.convertListProductToLocalState();
      }
    }
    if (prevProps.cart.dataCheckout !== this.props.cart.dataCheckout) {
      if (this.props.cart.dataCheckout !== null) {
        // this.setState({ loading: false });
        // moveToCheckout(this.props.componentId);
        // setTimeout(() => {
        //   this.props.saveChecklistCart(this.state.productCartArray);
        // }, 100);
      }
    }
    if (prevProps.cart.errorCheckout !== this.props.cart.errorCheckout) {
      if (this.props.cart.errorCheckout !== null) {
        this.setState({ loading: false });
        if (this.props.cart.errorCheckout.code === 400) {
          this.setState({ modalStockConfirmation: true });
          this.modifyProductCartArrayWhenError();
        }
      }
    }
  }

  /**
   * =======================================
   * NAVIGATION END
   * =======================================
   */

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
    this.props.cart.dataCartWithDataProduct.cartParcels.forEach(item => {
      item.cartBrands.forEach(itemBrand => {
        for (let i = 0; i < itemBrand.cartBrandCatalogues.length; i++) {
          const productItem = itemBrand.cartBrandCatalogues[i];
          productItem.checkBox = true;
          if (
            !productItem.catalogue.unlimitedStock &&
            productItem.catalogue.stock < productItem.catalogue.minQty
          ) {
            productItem.statusInCart = 'outStock';
          } else {
            productItem.statusInCart = 'available';
          }
          if (this.props.cart.dataCheckBoxlistCart.length > 0) {
            const indexDataCheckBoxlistCart = this.props.cart.dataCheckBoxlistCart.findIndex(
              itemDataCheckBoxlistCart =>
                itemDataCheckBoxlistCart.catalogue.id ===
                itemBrand.cartBrandCatalogues[i].catalogue.id
            );
            if (indexDataCheckBoxlistCart > -1) {
              productItem.checkBox = this.props.cart.dataCheckBoxlistCart[
                indexDataCheckBoxlistCart
              ].checkBox;
              productItem.statusInCart =
                !productItem.catalogue.unlimitedStock &&
                productItem.catalogue.stock < productItem.catalogue.minQty
                  ? 'outStock'
                  : this.props.cart.dataCheckBoxlistCart[
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
    this.props.cart.errorCheckout.data.forEach(item => {
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

  updateGlobalCart() {
    if (this.state.productCartArray.length > 0) {
      const newCartData = this.state.productCartArray.map(item => {
        return {
          catalogueId: parseInt(item.catalogue.id, 10),
          qty: item.qty
        };
      });
      this.props.updateDataCart(newCartData);
      this.props.modifyProductDataBatch(newCartData);
      this.props.saveChecklistCart(this.state.productCartArray);
    }
  }

  forCartData(method, catalogueId, qty) {
    const data = {
      method,
      catalogueId: parseInt(catalogueId, 10),
      qty
    };
    this.props.itemForCart(data);
    this.props.modifyProductListData(data);
    if (this.props.product.dataGetProductById !== null) {
      if (this.props.product.dataGetProductById.id === catalogueId) {
        this.props.modifyProductDetailData(data);
      }
    }
  }

  /** go to checkout function need */

  wantToGoCheckout() {
    this.setState({ modalToCheckoutConfirmation: true });
    /** update global cart with new value */
    setTimeout(() => {
      this.updateGlobalCart();
    }, 100);
  }

  /** detele */

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
        modalDeleteConfirmation: false
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

  wantDelete(item) {
    this.setState({
      modalDeleteConfirmation: true,
      productWantToDelete: item
    });
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

  /** check cart before go to checkout */
  checkCart() {
    this.setState({
      modalToCheckoutConfirmation: false,
      loading: true
    });

    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(item => {
      return {
        catalogueId: parseInt(item.catalogueId, 10),
        qty: item.qty
      };
    });
    setTimeout(() => {
      this.props.postItemCheckout(mapProduct);
    }, 100);
  }

  /** order Button */

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

  /** for total price all product in cart */
  totalPriceValue() {
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.statusInCart === 'available'
    );
    const mapProduct = productCheckBox.map(
      item => item.catalogue.suggestRetailPrice * item.qty
    );
    return mapProduct.reduce((a, b) => a + b, 0);
  }

  /**
   * **************************************************************
   * RENDER VIEW
   * **************************************************************
   */

  /**
   * =======================================
   * FOR RENDER VOUCHER START
   * =======================================
   */

  renderVoucher() {
    return (
      <View>
        <Text>this for voucher</Text>
      </View>
    );
  }

  /**
   * =======================================
   * FOR RENDER VOUCHER END
   * =======================================
   */

  /**
   * =======================================
   * FOR RENDER ADDRESS START
   * =======================================
   */

  urbanMerge() {
    return `, ${this.props.profile.profileInformationData.userStores[0].store.urban.district}, ${this.props.profile.profileInformationData.userStores[0].store.urban.city}, ${this.props.profile.profileInformationData.userStores[0].store.urban.province.name}`;
  }

  renderAddressContent() {
    return (
      <View>
        <View>
          <View style={styles.boxTitle}>
            <Text style={styles.titleBoxText}>Alamat Pengiriman</Text>
          </View>
          <View style={styles.lines} />
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
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
      </View>
    );
  }

  renderAddress() {
    return (
      <View style={styles.boxAddress}>
        {!this.props.profile.loadingProfileInformation &&
        this.props.profile.profileInformationData !== null
          ? this.renderAddressContent()
          : this.renderAddressContentSkeleton()}
      </View>
    );
  }

  /**
   * =======================================
   * FOR RENDER ADDRESS END
   * =======================================
   */

  renderPotonganSection() {
    return (
      <View>
        <View style={{ marginTop: 8 }} />
        <View style={styles.lines} />
        <View
          style={[
            styles.boxListItemProductInCart,
            { paddingTop: 10, paddingHorizontal: 11 }
          ]}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: 30
            }}
          >
            <Image
              source={require('../../assets/icons/cart/delivery.png')}
              style={{ height: 16, width: 22 }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.potonganText}>
              Potongan hingga Rp20.000 dengan min. pembelian Rp100.000
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderEstimasiSection(cartParcelsItem) {
    return (
      <View>
        <View style={styles.lines} />
        <View
          style={[
            styles.boxListItemProductInCart,
            { paddingTop: 8, paddingHorizontal: 11 }
          ]}
        >
          {this.renderEstimasiBeratSection(cartParcelsItem)}
          {this.renderEstimasiOngkirSection()}
        </View>
      </View>
    );
  }

  renderEstimasiOngkirSection() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: 30
          }}
        >
          <Image
            source={require('../../assets/icons/cart/delivcost.png')}
            style={{ height: 24, width: 24 }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.potonganText}>Estimasi Ongkir Rp5.000</Text>
        </View>
      </View>
    );
  }

  renderEstimasiBeratValue(cartParcelsItem) {
    const productCheckBox = this.state.productCartArray.filter(
      item => item.checkBox && item.parcelId === cartParcelsItem.id
    );
    const mapProduct = productCheckBox.map(item => item.catalogue.weight);
    return mapProduct.reduce((a, b) => a + b, 0) / 1000;
  }

  renderEstimasiBeratSection(cartParcelsItem) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: 30
          }}
        >
          <Image
            source={require('../../assets/icons/cart/berat.png')}
            style={{ height: 24, width: 24 }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.potonganText}>
            Estimasi berat {this.renderEstimasiBeratValue(cartParcelsItem)} kg
          </Text>
        </View>
      </View>
    );
  }

  renderPriceProduct(item) {
    return (
      <View>
        {item.catalogue.suggestRetailPrice !== item.catalogue.productPrice ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Text style={styles.priceTextCross}>
                {MoneyFormat(item.catalogue.productPrice)}
              </Text>
            </View>
            <View>
              <Text style={styles.priceTextRed}>
                {MoneyFormat(item.catalogue.suggestRetailPrice)}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.priceTextRed}>
              {MoneyFormat(item.catalogue.suggestRetailPrice)}
            </Text>
          </View>
        )}
      </View>
    );
  }

  /**
   * =======================================
   * FOR RENDER LIST PRODUCT START
   * =======================================
   */

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
              <View style={styles.lines} />
              <View
                style={[
                  styles.boxListItemProductInCart,
                  { paddingVertical: 8, paddingHorizontal: 11 }
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
                    <Icons color="#f1414c" name="checkbox-marked" size={24} />
                  ) : (
                    <Icons
                      color="rgba(1,1,1,0.54)"
                      name="checkbox-blank-outline"
                      size={24}
                    />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.brandTitle}>{item.brand.name}</Text>
                </View>
              </View>
              <View style={styles.lines} />
            </View>
          ) : (
            <View />
          )}

          {this.renderListCartItem(item)}
        </View>
      );
    });
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

  /** Product Available */

  renderListCart() {
    return this.props.cart.dataCartWithDataProduct.cartParcels.map(
      (item, index) => {
        return (
          <View key={index}>
            {this.state.productCartArray.find(
              itemProductCartArray =>
                itemProductCartArray.parcelId === item.id &&
                itemProductCartArray.statusInCart === 'available'
            ) !== undefined ? (
              <View>
                <View style={styles.boxMargin} />
                <View style={styles.boxListProductInCart}>
                  <View style={{ paddingBottom: 8, paddingHorizontal: 11 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={styles.supplierTitle}>
                        {item.invoiceGroup.name}
                      </Text>
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
      }
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
              <Icons color="#f1414c" name="checkbox-marked" size={24} />
            ) : (
              <Icons
                color="rgba(1,1,1,0.54)"
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
                  defaultSource={require('../../assets/icons/sinbadopacity.png')}
                  source={{
                    uri: item.catalogue.catalogueImages[0].imageUrl
                  }}
                  style={styles.productImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={styles.nameProductText}>
                    {item.catalogue.name}
                  </Text>
                </View>
                {/* <View style={{ marginVertical: 5 }}>
                  <Text style={styles.variationProductText}>variasi</Text>
                </View> */}
                <View style={{ marginVertical: 10 }}>
                  {this.renderPriceProduct(item)}
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
                    source={require('../../assets/icons/cart/delete.png')}
                    style={{ height: 24, width: 24 }}
                  />
                </TouchableOpacity>
                <View style={{ alignItems: 'flex-end' }}>
                  {item.catalogue.displayStock ? (
                    <Text style={styles.tersisaText}>
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
            <Text style={styles.titleBoxText}>Produk Tidak Tersedia</Text>
          </View>
          <View style={styles.lines} />
          {this.renderProductContentErrorTidakTersedia()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderProductContentErrorTidakTersedia() {
    return this.state.productCartArray.map((item, index) => {
      return item.statusInCart === 'unavailable' ? (
        <View style={styles.boxContent} key={index}>
          <View style={[styles.boxContentItem, { width: '30%' }]}>
            <Image
              defaultSource={require('../../assets/icons/sinbadopacity.png')}
              source={{
                uri: item.catalogue.catalogueImages[0].imageUrl
              }}
              style={[styles.productImage, { opacity: 0.5 }]}
            />
          </View>
          <View style={styles.boxContentProductHabis}>
            <View>
              <Text style={[styles.nameProductText, { opacity: 0.5 }]}>
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
              <Text style={[styles.priceTextCross, { opacity: 0.5 }]}>
                {MoneyFormat(item.catalogue.productPrice)}
              </Text>
              <Text style={[styles.priceTextRed, { opacity: 0.5 }]}>
                {MoneyFormat(item.catalogue.suggestRetailPrice)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.wantDelete(item)}
            style={[styles.boxContentItem, { width: '20%' }]}
          >
            <Image
              source={require('../../assets/icons/cart/delete.png')}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={index} />
      );
    });
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
            <Text style={styles.titleBoxText}>Produk Habis</Text>
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
              defaultSource={require('../../assets/icons/sinbadopacity.png')}
              source={{
                uri: item.catalogue.catalogueImages[0].imageUrl
              }}
              style={[styles.productImage, { opacity: 0.5 }]}
            />
          </View>
          <View style={styles.boxContentProductHabis}>
            <View>
              <Text style={[styles.nameProductText, { opacity: 0.5 }]}>
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
              <Text style={[styles.priceTextCross, { opacity: 0.5 }]}>
                {MoneyFormat(item.catalogue.productPrice)}
              </Text>
              <Text style={[styles.priceTextRed, { opacity: 0.5 }]}>
                {MoneyFormat(item.catalogue.suggestRetailPrice)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.wantDelete(item)}
            style={[styles.boxContentItem, { width: '20%' }]}
          >
            <Image
              source={require('../../assets/icons/cart/delete.png')}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  /**
   * =======================================
   * FOR RENDER LIST PRODUCT END
   * =======================================
   */

  renderButton() {
    return (
      <Button
        disabled={
          this.state.productCartArray.find(
            item => item.checkBox && item.statusInCart === 'available'
          ) === undefined
        }
        onPress={() => this.wantToGoCheckout()}
        title="Checkout"
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
          ).length ? (
            <Icons color="#f1414c" name="checkbox-marked" size={24} />
          ) : (
            <Icons
              color="rgba(1,1,1,0.54)"
              name="checkbox-blank-outline"
              size={24}
            />
          )}
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.pilihSemuaText}>Pilih Semua</Text>
        </View>
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
              <Text style={styles.pilihSemuaText}>Total: </Text>
              <Text style={styles.totalPriceText}>
                {MoneyFormat(this.totalPriceValue())}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.taxText}>Belum termasuk PPN 10%</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>{this.renderButton()}</View>
      </View>
    );
  }

  /**
   * =======================================
   * ALL MODAL START
   * =======================================
   */

  renderModalDeleteProductConfirmation() {
    return (
      <View>
        {this.state.modalDeleteConfirmation ? (
          <ModalConfirmation
            modalConfirmation={this.state.modalDeleteConfirmation}
            type={'okeNotRed'}
            close={() => this.setState({ modalDeleteConfirmation: false })}
            process={() => this.deleteProductInCart()}
            content={'Apakah Anda yakin untuk menghapus barang ?'}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalToCheckoutConfirmation() {
    return (
      <View>
        {this.state.modalToCheckoutConfirmation ? (
          <ModalConfirmation
            modalConfirmation={this.state.modalToCheckoutConfirmation}
            type={'okeRed'}
            close={() => this.setState({ modalToCheckoutConfirmation: false })}
            process={() => this.checkCart()}
            content={'Konfirmasi order dan lanjut ke Checkout ?'}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderModalStockConfirmation() {
    return (
      <View>
        {this.state.modalStockConfirmation ? (
          <ModalBottomStockConfirmation
            open={this.state.modalStockConfirmation}
            close={() => this.setState({ modalStockConfirmation: false })}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }

  /**
   * =======================================
   * ALL MODAL END
   * =======================================
   */

  /**
   * ======================================
   * EMPTY STATE, SKELETON, AND LOADING START
   * ======================================
   */

  renderEmptyCartContent() {
    return (
      <View>
        <View style={{ paddingVertical: 30 }}>
          <Image
            source={require('../../assets/images/shoping_cart.png')}
            style={{ height: 141, width: undefined, resizeMode: 'contain' }}
          />
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.emptyCartTitle}>Keranjang Kosong</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 0.2 * width
            }}
          >
            <Text style={styles.emptyCartDesc}>
              Yuk, Isi keranjang kamu dengan produk - produk di Sinbad{' '}
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Button
              onPress={() => {
                moveToProductCategory(this.props.componentId);
                this.props.selectedCategoryId('1');
              }}
              title="Tambah Produk"
              titleStyle={styles.titleButton}
              buttonStyle={[styles.button, { width: 282 }]}
            />
          </View>
        </View>
        <View style={styles.boxMargin} />
        <View
          style={[
            styles.boxListProductInCart,
            {
              height: 0.3 * height,
              justifyContent: 'center',
              paddingVertical: -10
            }
          ]}
        >
          <Recomendation componentId={this.props.componentId} />
        </View>
      </View>
    );
  }

  renderEmptyCart() {
    return (
      <View>
        {this.props.cart.fastOrderFlag === null
          ? this.renderEmptyCartContent()
          : this.renderData()}
      </View>
    );
  }

  renderAddressContentSkeleton() {
    return (
      <View>
        <View>
          <SkeletonPlaceholder>
            <View style={styles.boxTitle}>
              <View
                style={{
                  height: RFPercentage(1.6),
                  borderRadius: 10,
                  width: '40%'
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <View style={styles.lines} />
        </View>
        <View style={{ padding: 10 }}>
          <SkeletonPlaceholder>
            <View
              style={{
                height: RFPercentage(1.4),
                borderRadius: 10,
                width: '50%'
              }}
            />
          </SkeletonPlaceholder>
          <View style={{ marginTop: 5 }}>
            <SkeletonPlaceholder>
              <View
                style={{
                  height: RFPercentage(1.4),
                  borderRadius: 10,
                  width: '20%'
                }}
              />
            </SkeletonPlaceholder>
          </View>
          <View style={{ marginTop: 5 }}>
            <SkeletonPlaceholder>
              <View
                style={{
                  height: RFPercentage(1.3),
                  borderRadius: 10,
                  width: '70%'
                }}
              />
              <View
                style={{
                  marginTop: 5,
                  height: RFPercentage(1.3),
                  borderRadius: 10,
                  width: '60%'
                }}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    );
  }

  renderCartListSkeleton() {
    const viewSkeleton = [];
    for (let i = 0; i < 2; i++) {
      viewSkeleton.push(
        <View key={i}>
          <View style={styles.boxMargin} />
          <View style={styles.boxListProductInCart}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <SkeletonPlaceholder>
                <View
                  style={{
                    height: RFPercentage(1.6),
                    borderRadius: 10,
                    width: '30%'
                  }}
                />
              </SkeletonPlaceholder>
            </View>
            <View style={styles.lines} />
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <SkeletonPlaceholder>
                <View
                  style={{
                    height: RFPercentage(1.6),
                    borderRadius: 10,
                    width: '40%'
                  }}
                />
              </SkeletonPlaceholder>
            </View>
            <View style={styles.lines} />
            <View
              style={{
                flexDirection: 'row',
                padding: 10
              }}
            >
              <View style={{ alignItems: 'center', width: '30%' }}>
                <SkeletonPlaceholder>
                  <View style={[styles.productImage, { borderRadius: 10 }]} />
                </SkeletonPlaceholder>
              </View>

              <View style={{ flex: 1 }}>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: RFPercentage(1.4),
                      borderRadius: 10,
                      width: '90%'
                    }}
                  />
                  <View
                    style={{
                      height: RFPercentage(1.4),
                      borderRadius: 10,
                      width: '60%',
                      marginTop: 5
                    }}
                  />
                  <View
                    style={{
                      height: RFPercentage(1.6),
                      borderRadius: 10,
                      width: '50%',
                      marginTop: 10
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      borderRadius: 10,
                      width: 100,
                      marginTop: 10
                    }}
                  />
                </SkeletonPlaceholder>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'flex-end'
                }}
              >
                <SkeletonPlaceholder>
                  <View
                    style={{
                      height: RFPercentage(1.6),
                      borderRadius: 10,
                      width: '100%',
                      marginBottom: 5
                    }}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
            <View style={styles.lines} />
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <SkeletonPlaceholder>
                <View
                  style={{
                    height: RFPercentage(1.4),
                    borderRadius: 10,
                    width: '50%'
                  }}
                />
              </SkeletonPlaceholder>
            </View>
          </View>
        </View>
      );
    }
    return <View>{viewSkeleton}</View>;
  }

  renderSkeleton() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderAddressContentSkeleton()}
          {this.renderCartListSkeleton()}
        </View>
      </View>
    );
  }

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
   * ======================================
   * EMPTY STATE, SKELETON, AND LOADING END
   * ======================================
   */

  renderItem() {
    return this.props.global.dataCart.length > 0 &&
      this.state.productCartArray.length > 0 ? (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {/* {this.renderVoucher()} */}
            {this.renderAddress()}
            {this.renderListCart()}
            {this.renderForErrorProduct()}
            <View style={styles.boxSpaceBottom} />
          </ScrollView>
        </View>
        {this.renderTotalPrice()}
        {/* this for all modal that will show */}
        {this.renderModalDeleteProductConfirmation()}
        {this.renderModalToCheckoutConfirmation()}
        {this.renderModalStockConfirmation()}
        {this.renderLoading()}
      </View>
    ) : (
      this.renderEmptyCartContent()
    );
  }

  renderData() {
    return !this.props.cart.loadingPostCartList &&
      this.props.cart.dataCartWithDataProduct !== null
      ? this.renderItem()
      : this.renderSkeleton();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.global.dataCart.length > 0
          ? this.renderData()
          : this.renderEmptyCart()}
      </View>
    );
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
  boxProduct: {
    height: 0.2 * height,
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
  boxAddress: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginBottom: 10
  },
  boxListItemProductInCart: {
    flexDirection: 'row'
  },
  boxTotalPrice: {
    height: 0.09 * height,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f2f2f2'
  },
  boxContentProductHabis: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
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
  boxContentItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContent: {
    flex: 1,
    paddingHorizontal: 10,
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
  },
  /** text */
  titleBoxText: {
    color: '#333333',
    fontSize: RFPercentage(1.6),
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
    marginTop: 5,
    color: '#828282',
    fontSize: RFPercentage(1.2),
    fontFamily: Fonts.MontserratItalic
  },
  emptyCartTitle: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.8),
    lineHeight: 18,
    fontFamily: Fonts.MontserratBold,
    textAlign: 'center'
  },
  emptyCartDesc: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.4),
    lineHeight: 14,
    fontFamily: Fonts.MontserratMedium,
    textAlign: 'center'
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
  pilihSemuaText: {
    color: '#828282',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratMedium
  },
  taxText: {
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
    width: 80,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 5,
    width: 80,
    height: 41
  }
});

const mapStateToProps = ({ cart, global, user, profile, product }) => {
  return { cart, global, user, profile, product };
};

export default connect(mapStateToProps, {
  postItemCart,
  getFastOrderCart,
  fetchProfileInformation,
  itemForCart,
  modifyProductListData,
  modifyProductDetailData,
  postItemCheckout,
  updateDataCart,
  modifyProductDataBatch,
  saveChecklistCart,
  selectedCategoryId
})(OmsListView);
