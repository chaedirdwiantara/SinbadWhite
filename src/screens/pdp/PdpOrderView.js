import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
// import { RFPercentage } from 'react-native-responsive-fontsize';
import ModalBottom from 'react-native-modal';
import * as ActionCreators from '../../state/actions';
import OrderButton from '../../components/OrderButton';
import { MoneyFormat } from '../../helpers/NumberFormater';

const { width, height } = Dimensions.get('window');

class PdpOrderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonAddDisabled: false,
      qtyFromChild: 0
    };
  }

  componentDidUpdate(prevProps) {
    //SEMENTARA
    if (
      prevProps.pdp.pdpOrderData !== this.props.pdp.pdpOrderData &&
      this.props.pdp.pdpOrderData != null
    ) {
      this.setState({
        qtyFromChild: this.props.pdp.pdpOrderData.addToCart
          ? this.props.pdp.pdpOrderData.qtyToCart
          : this.props.pdp.pdpOrderData.minQty
      });
    }
  }

  /**
   * ========================================
   * beberapa penjelasan fungsi
   * ========================================
   * - parentFunctionFromOrderButton
   * fungsi ini dipanggil dari child component (OrderButton)
   * - parentFunctionToCloseProductOrderView
   * fungsi memanggil fungsi di RootProduct untuk menutup ProductOrderView
   */

  parentFunctionFromOrderButton(data) {
    this.setState({ qtyFromChild: data.qty });
  }

  forCartData(method) {
    const data = {
      method,
      catalogueId: parseInt(this.props.pdp.pdpOrderData.id, 10),
      qty: this.state.qtyFromChild
    };
    this.props.omsAddToCart(data);
    this.props.pdpModifyProductListData(data);
  }

  render() {
    return this.props.pdp.pdpOrderData !== null &&
      this.props.pdp.pdpOrderData !== undefined ? (
      <ModalBottom
        isVisible={this.props.pdp.pdpOpenModalOrder}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard
        coverScreen
        animationInTiming={100}
        animationOutTiming={100}
        backdropTransitionOutTiming={10}
        backdropColor="black"
        deviceHeight={height}
        backdropOpacity={0.4}
        style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View
          style={[
            styles.modalContainerModalBottom,
            { paddingBottom: 0, height: 0.34 * height }
          ]}
        >
          <View style={{ height: 60 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.pdpCloseOrder()}
                style={styles.closeBox}
              >
                <Image
                  source={require('../../assets/icons/close.png')}
                  style={styles.icons}
                />
              </TouchableOpacity>
              <Text style={styles.titleModalBottom}>Masukan Jumlah</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ height: '50%', flexDirection: 'row' }}>
              <View style={styles.boxImage}>
                <Image
                  defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
                  source={{
                    uri: this.props.pdp.pdpOrderData.catalogueImages[0].imageUrl
                  }}
                  style={styles.imageProduct}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: '40%' }}>
                    <Text style={styles.productKeyText}>Harga</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productPriceText}>
                      {MoneyFormat(
                        this.props.pdp.pdpOrderData.retailBuyingPrice
                      )}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: '40%' }}>
                    <Text style={styles.productKeyText}>Total Harga</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productPriceText}>
                      {MoneyFormat(
                        this.state.qtyFromChild *
                          this.props.pdp.pdpOrderData.retailBuyingPrice
                      )}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ width: '40%' }}>
                    <Text style={styles.productKeyText}>Jumlah/pcs</Text>
                  </View>
                  <View style={{ flex: 1, marginRight: '10%' }}>
                    <View style={styles.boxPesan}>
                      <OrderButton
                        item={this.props.pdp.pdpOrderData}
                        onRef={ref =>
                          (this.parentFunctionFromOrderButton = ref)
                        }
                        parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
                          this
                        )}
                        onFocus={() =>
                          this.setState({ buttonAddDisabled: true })
                        }
                        onBlur={() =>
                          this.setState({ buttonAddDisabled: false })
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={styles.notes}>
                *Tekan -/+ beberapa saat untuk menambah / mengurangi 1 Dus
              </Text>
            </View>
            {this.props.pdp.pdpOrderData.addToCart ? (
              <View style={styles.boxButton}>
                <View
                  style={{ flex: 1, paddingLeft: '7%', paddingRight: '2%' }}
                >
                  <Button
                    onPress={() => this.forCartData('delete')}
                    title="Batal Beli"
                    titleStyle={styles.titleButtonCancel}
                    buttonStyle={styles.buttonCancel}
                  />
                </View>
                <View
                  style={{ flex: 1, paddingLeft: '2%', paddingRight: '7%' }}
                >
                  <Button
                    disabled={this.state.buttonAddDisabled}
                    onPress={() => this.forCartData('update')}
                    title="Update Keranjang"
                    titleStyle={styles.titleButtonBoxTwo}
                    buttonStyle={styles.button}
                    disabledStyle={styles.buttonDisabled}
                    disabledTitleStyle={styles.titleButtonBoxTwo}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.boxButton}>
                <View
                  style={{ flex: 1, paddingLeft: '15%', paddingRight: '15%' }}
                >
                  <Button
                    disabled={this.state.buttonAddDisabled}
                    onPress={() => this.forCartData('add')}
                    title="Tambah ke Keranjang"
                    titleStyle={styles.titleButton}
                    buttonStyle={styles.button}
                    disabledStyle={styles.buttonDisabled}
                    disabledTitleStyle={styles.titleButton}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ModalBottom>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  modalContainerModalBottom: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // height: 0.5 * height,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    // fontFamily: Fonts.MontserratBold,
    // fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '15%',
    height: '100%'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 20,
    width: '100%',
    height: '80%'
  },
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 20,
    width: '100%',
    height: '80%'
  },
  buttonCancel: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0444c',
    borderRadius: 20,
    width: '100%',
    height: '80%'
  },
  buttonReason: {
    backgroundColor: '#f0444c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 0.7 * width,
    marginBottom: 0.01 * height,
    height: '65%'
  },
  titleButton: {
    // fontFamily: Fonts.MontserratExtraBold,
    // fontSize: RFPercentage(1.7),
    fontSize: 15,
    color: '#ffffff'
  },
  titleButtonBoxTwo: {
    // fontFamily: Fonts.MontserratExtraBold,
    // fontSize: RFPercentage(1.3),
    fontSize: 13,
    color: '#ffffff'
  },
  titleButtonCancel: {
    // fontFamily: Fonts.MontserratExtraBold,
    // fontSize: RFPercentage(1.3),
    fontSize: 13,
    color: '#f0444c'
  },
  boxButton: {
    flexDirection: 'row',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxPesan: {
    flexDirection: 'row',
    width: '100%'
    // height: '50%'
  },
  imageProduct: {
    width: undefined,
    height: '90%',
    aspectRatio: 1 / 1
  },
  boxImage: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productNameText: {
    // fontFamily: Fonts.MontserratSemiBold,
    // fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  jumlahBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  productNameBox: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  buttonBagde: {
    backgroundColor: 'rgba(242,242,242, 0.8)',
    width: '30%',
    marginLeft: '1%',
    marginBottom: '3%',
    marginRight: '1.5%',
    paddingTop: '1.5%',
    paddingBottom: '1.5%',
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    borderRadius: 15,
    alignItems: 'center'
  },
  productKeyText: {
    // fontFamily: Fonts.MontserratSemiBold,
    // fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  productPriceText: {
    // fontFamily: Fonts.MontserratBold,
    // fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  notes: {
    // fontFamily: Fonts.MontserratItalic,
    // fontSize: RFPercentage(1.2),
    fontSize: 12,
    color: '#828282'
  },
  icons: {
    width: 24,
    height: 24
  }
});

const mapStateToProps = ({ pdp, oms }) => {
  return { pdp, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpOrderView);
