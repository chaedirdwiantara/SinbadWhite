import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { RowButtonActive, RowButtonInactive, OrderInactiveButtonStyle } from '../../components';
import { Fonts } from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers';
import css from '../../config/css.json';
import {
  pressOrderButton,
  getQtyProduct,
  upQtyProduct,
  downQtyProduct,
  deleteItemCart,
  pressDeleteButtonCart,
  updateItemCart
} from '../../redux/actions';
import OrderButton from '../../components/OrderButton';

const { width, height } = Dimensions.get('window');

class ListThumbailCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalConfirmation: false,
      idProductWantDelete: null,
      productDelete: null,
      productCartData: []
    };
    this.timerUp = null;
    this.timerDown = null;
  }

  componentDidMount() {
    // move cart data props to state
    this.setState({ productCartData: this.props.cart.productCartData });
    this.props.parentReference(this.props.cart.productCartData);
  }

  onClickOrder() {
    this.props.pressOrderButton();
  }

  onPressDown(index, numberCounter) {
    let counterMultiple = numberCounter;
    if (
      this.state.productCartData[index].standard_price &&
      parseInt(this.state.productCartData[index].standard_price, 10) > 0
    ) {
      counterMultiple = parseInt(this.state.productCartData[index].standard_price, 10);
    }

    const qtyPurchaseDown = (this.state.productCartData[index].qty_purchase -= counterMultiple);
    const stateCopy = Object.assign({}, this.state.productCartData[index], {
      qty_purchase: qtyPurchaseDown,
      maxReached: false,
      minReached: this.state.productCartData[index].min_qty >= qtyPurchaseDown
    });
    this.timerDown = setTimeout(() => {
      if (numberCounter === 1) {
        stateCopy.qty_purchase = this.state.productCartData[index].qty_purchase + 1;
      }
      if (qtyPurchaseDown <= this.state.productCartData[index].min_qty) {
        this.onPressDownOut();
        stateCopy.qty_purchase = this.state.productCartData[index].min_qty;
      } else {
        this.onPressDown(index, this.state.productCartData[index].packed_qty);
      }
    }, 1000);
    if (qtyPurchaseDown <= this.state.productCartData[index].min_qty) {
      stateCopy.qty_purchase = this.state.productCartData[index].min_qty;
    }
    this.state.productCartData[index] = stateCopy;
    this.props.parentReference(this.state.productCartData);
    this.setState({ productCartData: this.state.productCartData });
  }

  onPressUp(index, numberCounter) {
    let counterMultiple = numberCounter;
    if (
      this.state.productCartData[index].standard_price &&
      parseInt(this.state.productCartData[index].standard_price, 10) > 0
    ) {
      counterMultiple = parseInt(this.state.productCartData[index].standard_price, 10);
    }

    const qtyPurchaseUp = (this.state.productCartData[index].qty_purchase += counterMultiple);
    const stateCopy = Object.assign({}, this.state.productCartData[index], {
      qty_purchase: qtyPurchaseUp,
      minReached: false,
      maxReached: this.state.productCartData[index].display_stock
        ? this.state.productCartData[index].available_stock <= qtyPurchaseUp
        : false
    });
    this.timerUp = setTimeout(() => {
      if (numberCounter === 1) {
        stateCopy.qty_purchase = this.state.productCartData[index].qty_purchase - 1;
      }
      if (this.state.productCartData[index].display_stock) {
        if (this.state.productCartData[index].available_stock <= qtyPurchaseUp) {
          this.onPressUpOut();
          stateCopy.qty_purchase = this.state.productCartData[index].available_stock;
        } else {
          this.onPressUp(index, this.state.productCartData[index].packed_qty);
        }
      } else {
        this.onPressUp(index, this.state.productCartData[index].packed_qty);
      }
    }, 1000);
    if (this.state.productCartData[index].display_stock) {
      if (this.state.productCartData[index].available_stock <= qtyPurchaseUp) {
        stateCopy.qty_purchase = this.state.productCartData[index].available_stock;
      }
    }
    this.state.productCartData[index] = stateCopy;
    this.props.parentReference(this.state.productCartData);
    this.setState({ productCartData: this.state.productCartData });
  }

  onPressUpOut() {
    for (let x = 0; x < 5; x++) {
      clearTimeout(this.timerUp + 3 * x);
    }
  }

  onPressDownOut() {
    for (let x = 0; x < 5; x++) {
      clearTimeout(this.timerDown + 3 * x);
    }
  }

  changeQuantityEntered(value, index) {
    let correctValue = value === '' ? 0 : parseInt(value, 10);
    const stateCopy = Object.assign({}, this.state.productCartData[index]);

    let counterMultiple = 1;
    if (
      this.state.productCartData[index].standard_price &&
      parseInt(this.state.productCartData[index].standard_price, 10) > 0
    ) {
      counterMultiple = parseInt(this.state.productCartData[index].standard_price, 10);
    }

    const temp = correctValue / counterMultiple;
    if (!Number.isInteger(temp)) {
      correctValue = counterMultiple * Math.round(temp);
    }

    if (correctValue >= stateCopy.available_stock && stateCopy.display_stock) {
      correctValue = stateCopy.available_stock;
      stateCopy.qty_purchase = correctValue;
      stateCopy.maxReached = true;
      stateCopy.minReached = false;
    } else {
      stateCopy.qty_purchase = correctValue;
      stateCopy.minReached = false;
    }

    if (correctValue <= stateCopy.min_qty) {
      correctValue = stateCopy.min_qty;
      stateCopy.qty_purchase = correctValue;
      stateCopy.maxReached = false;
      stateCopy.minReached = true;
    }

    if (stateCopy.display_stock) {
      if (correctValue > stateCopy.min_qty && correctValue < stateCopy.available_stock) {
        stateCopy.qty_purchase = correctValue;
        stateCopy.maxReached = false;
        stateCopy.minReached = false;
      } else {
        if (correctValue >= stateCopy.available_stock) {
          stateCopy.maxReached = true;
        }
        if (correctValue <= stateCopy.min_qty) {
          stateCopy.minReached = true;
        }
      }
    } else if (correctValue > stateCopy.min_qty) {
      stateCopy.qty_purchase = correctValue;
      stateCopy.maxReached = false;
      stateCopy.minReached = false;
    }

    this.state.productCartData[index] = stateCopy;
    this.props.parentReference(this.state.productCartData);
    this.setState({ productCartData: this.state.productCartData });
  }

  changeQuantityTyping(value, index) {
    const correctValue = value === '' ? 0 : parseInt(value, 10);
    const stateCopy = Object.assign({}, this.state.productCartData[index]);
    stateCopy.qty_purchase = correctValue;
    this.state.productCartData[index] = stateCopy;
    this.setState({ productCartData: this.state.productCartData });
  }

  openModal(item) {
    this.setState({ modalConfirmation: true, idProductWantDelete: item.id, productDelete: item });
  }

  modalClose() {
    this.setState({ modalConfirmation: false });
  }

  delete() {
    const index = this.state.productCartData.findIndex(item => {
      return item.id === this.state.idProductWantDelete;
    });
    this.state.productCartData.splice(index, 1);
    this.setState({ productCartData: this.state.productCartData, modalConfirmation: false });
    this.props.parentReference(this.state.productCartData);
    setTimeout(() => {
      this.props.deleteItemCart(this.state.idProductWantDelete);
    }, 100);
  }

  modalConfirmation() {
    return (
      <Modal visible={this.state.modalConfirmation} transparent onRequestClose={() => {}}>
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={[styles.modalContainer, { paddingBottom: 0, height: 0.25 * height }]}>
            <View style={[styles.cardModal, { flex: 1 }]}>
              <Text style={styles.titleModal}>Hapus Barang ?</Text>
            </View>
            <View style={[styles.cardModal, { flex: 1 }]}>
              <Text style={styles.informationModal}>
                Barang ini akan dihapus dari keranjang belanja anda
              </Text>
            </View>
            <View style={[styles.cardModal, { flex: 1, paddingLeft: 0, paddingRight: 0 }]}>
              <View style={styles.cardButtonModal}>
                <RowButtonActive onPress={() => this.delete()}>Ya</RowButtonActive>
                <RowButtonInactive onPress={() => this.modalClose()}>Tidak</RowButtonInactive>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderDiscountTag() {
    return (
      <View style={styles.boxDiscountTag}>
        <Image
          source={require('../../assets/images/discount_tag.png')}
          style={styles.imageDiscountTag}
        />
      </View>
    );
  }

  renderItem = (item, index) => {
    const imageIcon = (
      <Image
        defaultSource={require('../../assets/icons/sinbadopacity.png')}
        source={{ uri: item.image_url }}
        style={styles.imageProduct}
      />
    );

    return (
      <View style={styles.card} key={index}>
        {item.discount.length > 0 ? this.renderDiscountTag() : <View />}
        <View style={styles.containerImage}>{imageIcon}</View>
        <View style={{ flexDirection: 'column', flex: 2 }}>
          <View style={styles.containerNameProduct}>
            <View style={styles.boxNameProduct}>
              <Text style={styles.titleProduct}>{item.name}</Text>
            </View>
            <View style={styles.boxDeleteButton}>
              <TouchableOpacity onPress={() => this.openModal(item)}>
                <View style={styles.buttonDelete}>
                  <Image
                    source={require('../../assets/icons/delete.png')}
                    style={styles.imageDelete}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerPrice}>
            <Text>
              <Text style={styles.textPrice}>
                {MoneyFormat(item.list_price * item.qty_purchase)}
              </Text>
              {item.taxes_id[0] ?
              item.taxes_id[0] === 3 ? (
                <Text style={styles.textPajak}> (Harga sebelum pajak 0%)</Text>
              ) : (
                <Text style={styles.textPajak}> (Harga sebelum pajak 10%)</Text>
              ) : <Text style={styles.textPajak}> (Harga sebelum pajak 10%)</Text>
              }
              
            </Text>
          </View>
          <View style={styles.containerStockButton}>
            <View style={{ width: '40%', justifyContent: 'center' }}>
              {item.display_stock && item.available_stock > 0 ? (
                <Text>
                  <Text
                    style={[
                      styles.textStock,
                      item.available_stock === 0 ? { color: '#f0444c' } : ''
                    ]}
                  >
                    {item.available_stock}
                  </Text>
                  <Text style={styles.textStock}> Tersisa</Text>
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View
              style={{
                flex: 1,
                paddingRight: '3%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View style={styles.boxPesan}>
                {item.available_stock >= item.min_qty || !item.display_stock ? (
                  <OrderButton
                    orderVisible
                    onPressOrder={() => this.onClickOrder(item)}
                    defaultValue={
                      item.qty_purchase !== undefined
                        ? item.qty_purchase.toString()
                        : item.min_qty.toString()
                    }
                    enablesReturnKeyAutomatically
                    runChangeValue={text =>
                      this.changeQuantityEntered(text.nativeEvent.text, index)
                    }
                    onChangeQty={text => this.changeQuantityTyping(text, index)}
                    maxQuantityReached={item.maxReached}
                    minQuantityReached={item.minReached}
                    onPressDown={() => this.onPressDown(index, 1)}
                    onPressUp={() => this.onPressUp(index, 1)}
                    onPressUpOut={() => this.onPressUpOut()}
                    onPressDownOut={() => this.onPressDownOut()}
                    item={item}
                  />
                ) : (
                  <View style={{ height: '95%', width: '100%' }}>
                    <OrderInactiveButtonStyle>STOK HABIS</OrderInactiveButtonStyle>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.productCartData ? (
          this.state.productCartData.map((item, index) => {
            return this.renderItem(item, index);
          })
        ) : (
          <View />
        )}

        {this.modalConfirmation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    height: 0.17 * height,
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: 0.01 * height,
    marginBottom: 0.01 * height
  },
  containerImage: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerPrice: {
    flex: 1
  },
  containerNameProduct: {
    flexDirection: 'row',
    height: '40%'
  },
  containerStockButton: {
    flexDirection: 'row',
    height: '40%'
  },
  imageProduct: {
    height: undefined,
    width: '80%',
    aspectRatio: 1 / 1
  },
  imageDelete: {
    resizeMode: 'contain',
    position: 'relative',
    height: '70%',
    width: '100%'
  },
  imageDiscountTag: {
    height: '70%',
    width: '100%',
    resizeMode: 'contain',
    marginTop: -0.002 * height
  },
  boxNameProduct: {
    flex: 1,
    paddingTop: '8%',
    paddingRight: '2%'
  },
  boxDeleteButton: {
    width: 0.1 * width,
    alignItems: 'flex-end',
    paddingRight: '3%',
    paddingTop: '3%'
  },
  boxDiscountTag: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    marginLeft: '1%',
    width: '10%',
    height: 0.05 * height
  },
  buttonDelete: {
    backgroundColor: css.mainColor,
    borderRadius: 40,
    // width: 0.08 * width,
    // height: 0.08 * width,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleProduct: {
    fontFamily: Fonts.MontserratBold,
    textAlign: 'left',
    color: '#333333',
    fontSize: RFPercentage(1.6)
  },
  textPrice: {
    fontFamily: Fonts.MontserratBlack,
    textAlign: 'left',
    color: '#333333',
    fontSize: RFPercentage(2)
  },
  textStock: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.5),
    textAlign: 'left',
    marginRight: '2.5%'
  },
  textPajak: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.3),
    color: '#333333'
  },
  modalMainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    padding: '5%',
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
    height: 0.2 * height,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  cardModal: {
    position: 'relative',
    alignItems: 'center',
    // height: '40%',
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleModal: {
    color: '#333333',
    fontSize: RFPercentage(2.4),
    fontFamily: Fonts.MontserratExtraBold,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  cardButtonModal: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15
  },
  informationModal: {
    flex: 2,
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.MontserratMedium
  },
  // for input pesan
  boxPesan: {
    flexDirection: 'row',
    width: '100%',
    height: '50%'
  },
  pesanButton: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f0444c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  minusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0444c',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  plusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0444c',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  minusText: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#fff',
    fontSize: RFPercentage(2.5),
    marginBottom: 3,
    marginRight: '10%'
  },
  plusText: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#fff',
    fontSize: RFPercentage(2.5),
    marginBottom: 2,
    marginLeft: '10%'
  },
  pesanText: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#fff',
    fontSize: RFPercentage(1.6)
  },
  inputList: {
    zIndex: 1000,
    height: '100%',
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 7,
    marginLeft: '29%',
    position: 'absolute'
  },
  input: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.5),
    color: '#f0444c',
    paddingTop: 0.004 * height,
    alignItems: 'center',
    height: 0.043 * height
  }
});

const mapStateToProps = ({ cart, product, publicComponent }) => {
  return { cart, product, publicComponent };
};

export default connect(
  mapStateToProps,
  {
    pressOrderButton,
    getQtyProduct,
    upQtyProduct,
    downQtyProduct,
    deleteItemCart,
    pressDeleteButtonCart,
    updateItemCart
  }
)(ListThumbailCart);
