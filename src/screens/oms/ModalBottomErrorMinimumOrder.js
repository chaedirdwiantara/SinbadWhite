import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers';

const { height, width } = Dimensions.get('window');

class ModalBottomErrorMinimumOrder extends Component {
  renderImageContent(itemParcel) {
    return this.props.orderProduct.filter(
      item => item.parcelId === itemParcel.id
    );
  }

  renderPlusProduct(itemParcel) {
    return this.props.orderProduct.filter(
      item => item.parcelId === itemParcel.id
    ).length > 3 ? (
      <View>
        <Text style={styles.textPlusProduct}>
          (+
          {this.props.orderProduct.filter(
            item => item.parcelId === itemParcel.id
          ).length - 3}{' '}
          Produk Lain)
        </Text>
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

  renderData() {
    return this.props.cart.dataCheckout.orderParcels.map((item, index) => {
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.parcelName}>{item.invoiceGroup.name}</Text>
            </View>
            <View>
              {this.props.cart.errorConfirmOrder.data.errorData.find(
                itemErrorConfirmOrder =>
                  itemErrorConfirmOrder.parcelId === item.id
              ) === undefined ? (
                <Image
                  source={require('../../assets/icons/cart/sukses.png')}
                  style={{ height: 24, width: 24 }}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/cart/fail.png')}
                  style={{ height: 24, width: 24 }}
                />
              )}
            </View>
          </View>
          <View style={styles.lines} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                paddingBottom: 10
              }}
            >
              {this.renderListProductImage(item)}
            </View>
            <View style={{ justifyContent: 'center' }}>
              {this.renderPlusProduct(item)}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10
            }}
          >
            <View>
              <Text style={styles.totalPembelian}>
                Total Pembelian :{' '}
                {MoneyFormat(item.parcelDetails.totalNettPrice)}
              </Text>
            </View>
            <View>
              <Text style={styles.totalPembelian}>
                Min. Transaksi : {MoneyFormat(item.invoiceGroup.minimumOrder)}
              </Text>
            </View>
          </View>
          <View style={styles.lines} />
        </View>
      );
    });
  }

  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={this.props.backToCart}
          title="Tinjau Keranjang"
          titleStyle={styles.titleButtonRed}
          buttonStyle={styles.buttonWhite}
        />
        <Button
          disabled={!this.props.cart.errorConfirmOrder.data.confirmOrder}
          onPress={this.props.confirmation}
          title="Konfirmasi"
          titleStyle={styles.titleButton}
          buttonStyle={styles.button}
          disabledStyle={styles.buttonDisabled}
          disabledTitleStyle={styles.titleButton}
        />
      </View>
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard
        coverScreen
        animationInTiming={500}
        animationOutTiming={100}
        backdropTransitionOutTiming={10}
        backdropColor="black"
        deviceHeight={height}
        backdropOpacity={0.4}
        style={styles.modalPosition}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: 50 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Konfirmasi Min Pembelian</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 30, paddingBottom: 30 }}>
            <Text style={styles.titleDescription}>
              Maaf, order Anda dibawah minimum pembelian. Silahkan tinjau
              keranjang kembali, atau tap buat pesanan untuk melanjutkan pesanan
              Anda
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderData()}</ScrollView>
          </View>
          <View>{this.renderButton()}</View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.9 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  parcelName: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  totalPembelian: {
    fontFamily: Fonts.MontserratRegular,
    fontSize: RFPercentage(1.3),
    color: '#333333'
  },
  titleDescription: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    lineHeight: 15,
    textAlign: 'center'
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  contentContainer: {
    flex: 1
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    marginVertical: 10,
    borderColor: '#f2f2f2'
  },
  productImage: {
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  /**for content */
  boxPerContent: {
    flexDirection: 'row',
    height: 0.11 * height
  },
  boxHeaderContent: {
    flex: 1
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 141,
    height: 41
  },
  titleButtonRed: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#f0444c'
  },
  buttonWhite: {
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f0444c',
    width: 141,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 10,
    width: 141,
    height: 41
  }
});

const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(mapStateToProps, {})(ModalBottomErrorMinimumOrder);
