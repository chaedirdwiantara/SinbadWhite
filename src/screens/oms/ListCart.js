import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Loading, RowButtonActive, RowButtonInactive } from '../../components';
import { Fonts } from '../../utils/Fonts';
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
import { MoneyFormat, NumberFormat } from '../../helpers';

const { width, height } = Dimensions.get('window');

class ListCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalConfirmation: false,
      idProductWantDelete: null,
      productCartData: [],
      productDelete: null,
      minimalQuantity: null
    };
  }

  componentDidMount() {
    this.setState({ productCartData: this.props.cart.productCartData });
    this.props.parentReference(this.props.cart.productCartData);
  }

  openModal(item) {
    this.setState({ modalConfirmation: true, idProductWantDelete: item.id, productDelete: item });
  }

  modalClose() {
    this.setState({ modalConfirmation: false });
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
      <Modal
        visible={this.state.modalConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={[styles.modalContainer, { paddingBottom: 0 }]}>
            <View style={styles.cardModal}>
              <Text style={styles.titleModal}>Hapus Barang ?</Text>
            </View>
            <View style={styles.cardModal}>
              <Text style={styles.informationModal}>
                Barang ini akan dihapus dari keranjang belanja anda
              </Text>
            </View>
            <View style={styles.cardButtonModal}>
              <RowButtonActive onPress={() => this.delete()}>Ya</RowButtonActive>
              <RowButtonInactive onPress={() => this.modalClose()}>Tidak</RowButtonInactive>
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
    return (
      <View style={styles.card} key={index}>
        {item.discount.length > 0 ? this.renderDiscountTag() : <View />}
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={styles.containerNameProduct}>
            <View style={styles.boxNameProduct} />
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
            <View style={styles.boxProductList}>
              <Text style={styles.titleProduct}>{item.name}</Text>
            </View>
            <View style={styles.boxInputList}>
              <View style={styles.inputList}>
                <TextInput
                  selectionColor={'#f0444c'}
                  returnKeyType="done"
                  editable={item.available_stock >= item.min_qty || !item.display_stock}
                  placeholder={
                    item.available_stock >= item.min_qty || !item.display_stock ? '' : 'Habis'
                  }
                  value={
                    item.available_stock >= item.min_qty || !item.display_stock
                      ? item.qty_purchase.toString()
                      : ''
                  }
                  enablesReturnKeyAutomatically
                  onChangeText={text => this.changeQuantityTyping(text, index)}
                  onEndEditing={text => this.changeQuantityEntered(text.nativeEvent.text, index)}
                  style={styles.input}
                  maxLength={6}
                  keyboardType="numeric"
                  textAlign={'center'}
                />
              </View>
            </View>
            <View style={styles.boxPriceList}>
              <View style={styles.priceList}>
                <Text style={styles.textPrice}>
                  {MoneyFormat(item.list_price * item.qty_purchase)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerStockButton}>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '3%' }}>
              {item.display_stock && item.available_stock ? (
                <Text>
                  <Text style={[styles.textStock, item.stock === 0 ? { color: '#f0444c' } : '']}>
                    {item.available_stock}
                  </Text>
                  <Text style={styles.textStock}> Tersisa</Text>
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View style={styles.boxPajak}>
              {item.taxes_id[0] ? (
                item.taxes_id[0] === 3 ? (
                  <Text style={styles.textPajak}> (Harga sebelum pajak 0%)</Text>
                ) : (
                  <Text style={styles.textPajak}> (Harga sebelum pajak 10%)</Text>
                )
              ) : (
                <Text style={styles.textPajak}> (Harga sebelum pajak 10%)</Text>
              )}
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
    height: 0.14 * height,
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: 0.01 * height,
    marginBottom: 0.01 * height
  },
  containerPrice: {
    height: '40%',
    flexDirection: 'row'
  },
  containerNameProduct: {
    flexDirection: 'row',
    height: '35%'
  },
  containerStockButton: {
    flex: 1,
    flexDirection: 'row'
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
    width: '5%',
    alignItems: 'flex-end',
    paddingRight: '2%',
    paddingTop: '2%'
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
    // dont remove
    // width: 0.08 * width,
    // height: 0.08 * width,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxProductList: {
    width: '45%',
    paddingLeft: '3%',
    paddingRight: '1%',
    justifyContent: 'flex-start'
  },
  boxInputList: {
    flex: 1,
    paddingLeft: '1%',
    paddingRight: '1%',
    justifyContent: 'center'
  },
  inputList: {
    height: '70%',
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 5
  },
  boxPriceList: {
    width: '35%',
    justifyContent: 'center',
    paddingLeft: '1%',
    paddingRight: '3%'
  },
  priceList: {
    height: '70%',
    backgroundColor: '#f2f2f2',
    width: '100%',
    borderRadius: 5,
    paddingRight: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleProduct: {
    fontFamily: Fonts.MontserratBold,
    textAlign: 'left',
    color: '#333333',
    fontSize: RFPercentage(1.3)
  },
  textPrice: {
    fontFamily: Fonts.MontserratSemiBold,
    textAlign: 'left',
    color: '#333333',
    fontSize: RFPercentage(1.5)
  },
  textStock: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.5),
    textAlign: 'left',
    marginRight: '2.5%'
  },
  boxPajak: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '3%'
  },
  textPajak: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.1),
    color: '#333333'
  },
  input: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.5),
    color: '#333333',
    padding: 0,
    alignItems: 'center',
    textAlign: 'center',
    height: '100%'
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
    flexDirection: 'column',
    flex: 0.3
  },
  cardModal: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    margin: 10,
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
  }
});

const mapStateToProps = ({ cart, product }) => {
  return { cart, product };
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
)(ListCart);
