import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Card } from 'react-native-elements';
import { Fonts } from '../../utils/Fonts';
import css from '../../config/css.json';
import { storePaymentMethod, moveToCheckout, openModalPaymentMethod } from '../../redux/actions';
import NavigationMethod from '../../components/NavigationMethod';

const { width, height } = Dimensions.get('window');

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      methodePayment: null
    };
  }

  componentDidMount() {
    this.props.storePaymentMethod(this.state.methodePayment);
  }

  changeMethod(methode) {
    this.setState({ methodePayment: methode });
    this.props.storePaymentMethod(methode);
  }

  useThisPaymentMethod() {
    this.props.storePaymentMethod(this.state.methodePayment);
    this.props.openModalPaymentMethod(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationMethod componentId={this.props.componentId} step={'additional'} />
        <ScrollView>
          <View>
            <View style={styles.containerCard}>
              <Card containerStyle={styles.card}>
                <TouchableOpacity style={styles.cardBox} onPress={() => this.changeMethod('cod')}>
                  <View style={styles.checkBox}>
                    {this.state.methodePayment === 'cod' ? (
                      <Image
                        source={require('../../assets/images/check_payment.png')}
                        style={styles.imageCheck}
                      />
                    ) : (
                      <View style={styles.circle} />
                    )}
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.cardTitleText}>Cash on Delivery</Text>
                    <Text style={styles.cardTitleContent}>Pembayaran langsung ditempat</Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
            <View style={styles.containerButton}>
              <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 5 }}>
                {this.props.cart.paymentMethod === null ? (
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: 0.9 * height
  },
  titleText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#4f4f4f'
  },
  card: {
    width: 0.9 * width,
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
  containerButton: {
    backgroundColor: '#fff',
    height: 0.1 * height,
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center'
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
  { storePaymentMethod, moveToCheckout, openModalPaymentMethod }
)(PaymentMethod);
