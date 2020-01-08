import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  Modal,
  ScrollView,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Card } from 'react-native-elements';
import css from '../../config/css.json';
import { Fonts } from '../../utils/Fonts';
import { storePaymentType, storePaymentMethod, openModalPaymentMethod } from '../../redux/actions';

const { width, height } = Dimensions.get('window');

let backButton = null;
if (Platform.OS === 'ios') {
  backButton = require('../../assets/icons/Icon-ios-back.png');
} else {
  backButton = require('../../assets/icons/Icon-android-back.png');
}

class Payment extends Component {
  constructor(props) {
    //   typePayment
    // 1 -> tunai, 2 -> kredit
    super(props);
    this.state = {
      userData: null,
      loadingState: true,
      activeSections: [0],
      typePayment: 3,
      paymentMethod: 'cod',
      openModalPaymentMethod: false
    };
  }

  componentDidMount() {
    this.props.storePaymentType(this.state.typePayment);
    this.props.storePaymentMethod(this.state.paymentMethod);
  }

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  changeType(type) {
    this.setState({ typePayment: type });
    setTimeout(() => {
      this.props.storePaymentType(type);
    }, 50);
  }

  changeMethod(methode) {
    this.setState({ paymentMethod: methode });
  }

  useThisPaymentMethod() {
    this.props.storePaymentType(this.state.typePayment);
    this.props.storePaymentMethod(this.state.paymentMethod);
    this.setState({ openModalPaymentMethod: false });
  }

  toPaymentMethod() {
    this.setState({ openModalPaymentMethod: true });
  }

  closeModalPaymentMethod() {
    this.props.storePaymentType(this.state.typePayment);
    this.props.storePaymentMethod(this.state.paymentMethod);
    this.setState({ openModalPaymentMethod: false });
  }

  paymentMethodselected() {
    return this.state.paymentMethod === 'cod' ? (
      <Card containerStyle={styles.card}>
        <TouchableOpacity style={styles.cardBox} onPress={() => this.toPaymentMethod()}>
          <View style={styles.checkBox}>
            <Image source={require('../../assets/images/cod.png')} style={styles.imageCheck} />
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={styles.cardTitleText}>Metode Pembayaran</Text>
            <Text style={styles.cardTitleContent}>Pembayaran dengan COD</Text>
          </View>
          <View style={styles.arrowBox}>
            <View>
              <Icons name="navigate-next" style={styles.iconArrow} />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    ) : (
      <Card containerStyle={styles.card}>
        <TouchableOpacity style={styles.cardBox} onPress={() => this.toPaymentMethod()}>
          <View style={styles.checkBox}>
            <Image
              source={require('../../assets/images/payment_methode_null.png')}
              style={styles.imageCheck}
            />
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={styles.cardTitleText}>Metode Pembayaran</Text>
            <Text style={styles.cardTitleContent}>Pilih metode yang sesuai denganmu</Text>
          </View>
          <View style={styles.arrowBox}>
            <View>
              <Icons name="navigate-next" style={styles.iconArrow} />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }

  modalPaymentMethod() {
    return (
      <Modal
        visible={this.state.openModalPaymentMethod}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.modalMainContainer}>
          <View style={styles.modalBoxHeader}>
            <Text style={styles.modalTitleText}>Metode Pembayaran</Text>
            <TouchableOpacity
              style={styles.backButtonModal}
              onPress={() => this.closeModalPaymentMethod()}
            >
              <Image source={backButton} style={{ marginTop: '10%', marginRight: '5%' }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.containerCardModal}>
                <Card containerStyle={styles.cardModal}>
                  <TouchableOpacity
                    style={styles.cardBoxModal}
                    onPress={() => this.changeMethod('cod')}
                  >
                    <View style={styles.checkBoxModal}>
                      {this.state.paymentMethod === 'cod' ? (
                        <Image
                          source={require('../../assets/images/check_payment.png')}
                          style={styles.imageCheckModal}
                        />
                      ) : (
                        <View style={styles.circleModal} />
                      )}
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                      <Text style={styles.cardTitleTextModal}>Cash on Delivery</Text>
                      <Text style={styles.cardTitleContentModal}>Pembayaran langsung ditempat</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </ScrollView>
          </View>
          <View style={styles.modalContainerButton}>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              {this.state.paymentMethod === null ? (
                <View style={styles.buttonManualDisable}>
                  <Text style={styles.buttonText}>Gunakan Metode Ini</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonManual}
                  onPress={() => this.useThisPaymentMethod()}
                >
                  <Text style={styles.buttonText}>Gunakan Metode Ini</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>Tipe Pembayaran</Text>
            </View>
            <View style={styles.containerCard}>
              <Card containerStyle={styles.card}>
                <TouchableOpacity style={styles.cardBox} onPress={() => this.changeType(3)}>
                  <View style={styles.checkBox}>
                    {this.state.typePayment === 3 ? (
                      <Image
                        source={require('../../assets/images/check_payment.png')}
                        style={styles.imageCheck}
                      />
                    ) : (
                      <View style={styles.circle} />
                    )}
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.cardTitleText}>Kredit</Text>
                    <Text style={styles.cardTitleContent}>
                      Anda bisa memakai pilihan kredit setelah 3 bulan mendaftar.
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
              <Card containerStyle={styles.card}>
                <TouchableOpacity style={styles.cardBox} onPress={() => this.changeType(2)}>
                  <View style={styles.checkBox}>
                    {this.state.typePayment === 2 ? (
                      <Image
                        source={require('../../assets/images/check_payment.png')}
                        style={styles.imageCheck}
                      />
                    ) : (
                      <View style={styles.circle} />
                    )}
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.cardTitleText}>Tunai</Text>
                    <Text style={styles.cardTitleContent}>
                      Pembayaran Tunai dilakukan pada saat barang sampai di tempat tujuan.
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          </View>
          {/* <View>
            <View style={styles.containerTitle}>
              <Text style={styles.titleText}>Metode Pembayaran</Text>
            </View>
            <View style={styles.containerCard}>
              {this.state.paymentMethod === null ? (
                <Card containerStyle={styles.card}>
                  <TouchableOpacity style={styles.cardBox} onPress={() => this.toPaymentMethod()}>
                    <View style={styles.checkBox}>
                      <Image
                        source={require('../../assets/images/payment_methode_null.png')}
                        style={styles.imageCheck}
                      />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                      <Text style={styles.cardTitleText}>Metode Pembayaran</Text>
                      <Text style={styles.cardTitleContent}>Pilih metode yang sesuai denganmu</Text>
                    </View>
                    <View style={styles.arrowBox}>
                      <View>
                        <Icons name="navigate-next" style={styles.iconArrow} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              ) : (
                this.paymentMethodselected()
              )}
            </View>
          </View> */}
        </ScrollView>
        {this.modalPaymentMethod()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // this for modal start
  modalMainContainer: {
    backgroundColor: '#ffffff',
    position: 'relative',
    // height: 1 * height,
    height: '100%',
    justifyContent: 'center'
  },
  modalBoxHeader: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0444c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainerButton: {
    height: 0.1 * height,
    width: '100%'
  },
  modalTitleText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(2.2),
    color: '#ffffff',
    marginTop: '1%'
  },
  backButtonModal: {
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCardModal: {
    height: 0.89 * height
  },
  cardModal: {
    borderRadius: 10,
    borderWidth: 0,
    height: 0.1 * height,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'flex-start'
  },
  cardBoxModal: {
    flexDirection: 'row',
    flex: 1,
    width: 0.86 * width
  },
  checkBoxModal: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  imageCheckModal: {
    resizeMode: 'contain',
    position: 'relative',
    height: 30,
    width: '100%'
  },
  circleModal: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: '#f2f2f2'
  },
  cardTitleTextModal: {
    fontFamily: Fonts.MontserratBold,
    color: '#333333',
    fontSize: RFPercentage(1.7),
    marginBottom: 5
  },
  cardTitleContentModal: {
    fontFamily: Fonts.MontserratMedium,
    color: '#4f4f4f',
    fontSize: RFPercentage(1.6)
  },
  // this for modal end
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerTitle: {
    height: 0.04 * height,
    paddingRight: 25,
    paddingLeft: 25,
    justifyContent: 'flex-end'
  },
  containerCard: {
    height: 0.29 * height
  },
  titleText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#4f4f4f'
  },
  card: {
    width: 0.87 * width,
    borderRadius: 10,
    borderWidth: 0,
    height: 0.12 * height,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'flex-start',
    marginLeft: 25,
    marginRight: 25
  },
  cardBox: {
    flexDirection: 'row',
    flex: 1,
    width: 0.86 * width
  },
  checkBox: {
    width: '20%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  arrowBox: {
    width: '15%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  cardTitleText: {
    fontFamily: Fonts.MontserratBold,
    color: '#333333',
    fontSize: RFPercentage(1.7),
    marginBottom: 5
  },
  cardTitleContent: {
    fontFamily: Fonts.MontserratMedium,
    color: '#4f4f4f',
    fontSize: RFPercentage(1.6)
  },
  containerCardSection: {
    marginTop: -0.03 * height,
    borderWidth: 0,
    padding: 0
  },
  bankLogo: {
    height: '70%',
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  imageCheck: {
    resizeMode: 'contain',
    position: 'relative',
    height: 30,
    width: '100%'
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: '#f2f2f2'
  },
  iconArrow: {
    color: '#4f4f4f',
    fontSize: RFPercentage(4)
  },
  buttonManualDisable: {
    marginTop: -0.01 * height,
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    width: 282,
    height: 41
  },
  buttonManual: {
    marginTop: -0.01 * height,
    backgroundColor: css.mainColor,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    width: 282,
    height: 41
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  }
});

const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(
  mapStateToProps,
  { storePaymentType, storePaymentMethod, openModalPaymentMethod }
)(Payment);
