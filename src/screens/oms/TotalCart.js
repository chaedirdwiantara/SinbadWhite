import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import css from '../../config/css.json';
import { Fonts } from '../../utils/Fonts';
import TotalCartList from './TotalCartList';
import VoucherModalTotal from '../voucher/VoucherModalTotal';
import {
  useVoucher,
  fetchCreateOrder,
  // moveToCheckout,
  fetchProfileInformation,
  // backNavigation,
  setTimetOutCreateOrder
} from '../../redux/actions';
import { MoneyFormat } from '../../helpers';
import { Loading } from '../../components/Loading';
import { PushToDashboard } from '../../navigations/Navigation';
import { backNavigation, moveToCheckout, backNavigationRoot } from '../../helpers/Navigation';

const { width, height } = Dimensions.get('window');

class TotalCart extends Component {
  constructor(props) {
    super(props);

    this.useVoucherDiskon = this.useVoucherDiskon.bind(this);

    this.state = {
      load: true,
      modalVoucherList: false,
      modalInformation: false,
      modalOrderSplit: false,
      modalTimeOver: false,
      modalOrderMinimum: false
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    // POST all item in Cart and get Order ID
    this.props.fetchCreateOrder(this.props.cart.productCartData);
    // start counting timer for order expired in 5 minute (300k ms)
    this.props.setTimetOutCreateOrder('set');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.timeOut) {
      this.setState({ modalTimeOver: true });
    }
  }

  componentWillUnmount() {
    // don't delete, this for clear voucher if back to list cart
    // this.props.useVoucher(null);
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'ButtonBack') {
      // this.props.backNavigation(this.props.componentId);
      backNavigation(this.props.componentId);
      this.props.setTimetOutCreateOrder('clear');
    }
  }

  toCheckout() {
    this.setState({ modalOrderSplit: false });
    // this.props.fetchProfileInformation(true);
    // this.props.moveToCheckout(this.props.componentId);
    moveToCheckout(this.props.componentId);
  }

  openModalVoucherList() {
    this.setState({ modalVoucherList: true });
  }

  closeModalVoucherList() {
    this.setState({ modalVoucherList: false });
  }

  openModalInformation() {
    this.setState({ modalInformation: true });
  }

  openModalOrderMinimum() {
    this.setState({ modalOrderMinimum: true });
  }

  closeModalInformation() {
    this.setState({ modalInformation: false });
  }

  closeModalTimeOver() {
    this.setState({ modalTimeOver: false });
    // if time over back to dashboard and make props time over false
    this.props.setTimetOutCreateOrder('clear');
    // back to dashboard
    // PushToDashboard();
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex: 0
      }
    });
    backNavigationRoot(this.props.componentId);
  }

  closeModalOrderMinimum() {
    this.setState({ modalOrderMinimum: false });
    // this.props.backNavigation(this.props.componentId);
    backNavigation(this.props.componentId);
  }

  closeModalSplitOrder() {
    this.setState({ modalOrderSplit: false });
  }

  useVoucherDiskon() {
    this.closeModalVoucherList();
    this.openModalInformation();
  }

  voucher() {
    if (this.props.voucher.voucherUsed !== null) {
      return this.props.voucher.voucherUsed.amount;
    }
    return 0;
  }

  // modal pembagian order
  modalOrderSplit() {
    return (
      <Modal
        visible={this.state.modalOrderSplit}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainerOrderSplit}>
            <View>
              <Text style={styles.titleVoucherSuccess}>Pembagian Order</Text>
            </View>
            <View style={{ height: '65%', justifyContent: 'center' }}>
              <Text style={styles.contentVoucherSuccess}>
                Order anda akan terbagi berdasarkan sales Tim sesuai dengan produk yang dibeli
              </Text>
              <Text
                style={[
                  styles.contentVoucherSuccess,
                  { marginTop: '5%', fontFamily: Fonts.MontserratSemiBold }
                ]}
              >
                Pembagian order tidak mempengaruhi total harga dan jumlah barang
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Button
                onPress={() => this.toCheckout()}
                title="OK"
                titleStyle={styles.titleButton}
                buttonStyle={styles.buttonVoucherSuccess}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // modal time over
  modalTimeOver() {
    return (
      <Modal
        visible={this.state.modalTimeOver}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={[styles.modalContainerOrderSplit, { height: 0.3 * height }]}>
            <View>
              <Text style={[styles.titleVoucherSuccess, { textAlign: 'center' }]}>
                Upss, Anda telah melewati batas waktu
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.contentVoucherSuccess}>
                Silahkan tinjau kembali keranjang Anda sebelum melanjutkan order Anda
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
              <Button
                onPress={() => this.closeModalTimeOver()}
                title="Kembali ke Beranda"
                titleStyle={styles.titleButton}
                buttonStyle={styles.buttonVoucherSuccess}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // modal order minimum
  modalOrderMinimum() {
    return (
      <Modal
        visible={this.state.modalOrderMinimum}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={[styles.modalContainerOrderSplit, { height: 0.3 * height }]}>
            <View>
              <Text style={[styles.titleVoucherSuccess, { textAlign: 'center' }]}>
                Order anda dibawah minimum
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.contentVoucherSuccess}>
                Nilai order dibawah Rp. 100.000, Order tidak dapat dibuat
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
              <Button
                onPress={() => this.closeModalOrderMinimum()}
                title="Kembali ke Keranjang"
                titleStyle={styles.titleButton}
                buttonStyle={styles.buttonVoucherSuccess}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  orderConfirmation() {
    if (this.props.cart.createOrderData.untaxed_amount < 100000) {
      this.setState({ modalOrderMinimum: true });
    } else {
      this.setState({ modalOrderSplit: true });
    }
  }

  // if has voucher
  modalVoucherContent() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleModal}>
          <View style={styles.closeBoxModal}>
            <TouchableOpacity onPress={() => this.closeModalVoucherList()}>
              <Icons color="#4f4f4f" name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/voucher_bg_list.png')}
            style={styles.imageVoucher}
          />
          <Text style={styles.titleTextModal}>Voucher dapat digunakan setelah cek harga</Text>
        </View>
        <View style={{ flex: 1, paddingBottom: '2%', paddingTop: '2%' }}>
          <VoucherModalTotal callCloseModal={this.useVoucherDiskon} />
        </View>
      </View>
    );
  }

  // if voucher is empty
  modalVoucherEmpty() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.closeBoxModal}>
          <TouchableOpacity onPress={() => this.closeModalVoucherList()}>
            <Icons color="#4f4f4f" name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Image
            source={require('../../assets/images/voucher_empty.png')}
            style={styles.imageEmptyVoucher}
          />
          <Text style={styles.voucherEmptyText}>Voucher Kosong</Text>
          <Text style={styles.voucherEmptyContentText}>Saat ini anda tidak memiliki Voucher</Text>
        </View>
      </View>
    );
  }

  modalVoucherList() {
    return (
      <Modal
        visible={this.state.modalVoucherList}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainer}>
            {this.props.voucher.totalVoucher > 0
              ? this.modalVoucherContent()
              : this.modalVoucherEmpty()}
          </View>
        </View>
      </Modal>
    );
  }

  modalInformation() {
    return (
      <Modal
        visible={this.state.modalInformation}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar backgroundColor="rgba(94, 28, 30, 1)" barStyle="light-content" />
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainerInformation}>
            <View>
              <Text style={styles.titleVoucherSuccess}>Voucher Sukses !</Text>
            </View>
            <View style={{ height: '60%', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/images/success_voucher.png')}
                style={styles.imageSuccess}
              />
            </View>
            <View>
              <Text style={styles.contentVoucherSuccess}>Anda berhasil menambahkan Voucher</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Button
                onPress={() => this.closeModalInformation()}
                title="OK"
                titleStyle={styles.titleButton}
                buttonStyle={styles.buttonVoucherSuccess}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderVoucherTag() {
    return (
      <View>
        <ImageBackground
          source={require('../../assets/images/voucher_bg.png')}
          style={styles.image}
        >
          {this.props.voucher.voucherUsed === null ? (
            <View style={styles.voucherBox}>
              <Text style={styles.voucherText}>
                Anda memiliki{' '}
                {this.props.cart.createOrderData
                  ? this.props.cart.createOrderData.voucher_availability.length
                  : '0'}{' '}
                voucher
              </Text>
              <TouchableOpacity onPress={() => this.openModalVoucherList()}>
                <View style={styles.buttonVoucher}>
                  <Text style={styles.titleButtonVoucher}>Lihat Semua</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.voucherBox}>
              <Text style={styles.voucherText}>
                Voucher Diskon {this.props.voucher.voucherUsed.name}
              </Text>
              <TouchableOpacity onPress={() => this.openModalVoucherList()}>
                <View style={styles.buttonVoucher}>
                  <Text style={styles.titleButtonVoucher}>Ganti Voucher</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }

  renderTotal() {
    return (
      <View>
        {this.props.cart.createOrderData.voucher_availability.findIndex(x => x.available === true) > - 1 ?
        <Text style={styles.totalAmountCart}>
                  {this.props.cart.createOrderData
                    ? MoneyFormat(
                        0.1 * (this.props.cart.createOrderData.untaxed_amount - this.voucher()) +
                          (this.props.cart.createOrderData.untaxed_amount - this.voucher())
                      )
                    : MoneyFormat(0)}
                </Text> :
      <Text style={styles.totalAmountCart}>
      {this.props.cart.createOrderData
        ? MoneyFormat(this.props.cart.createOrderData.net)
        : MoneyFormat(0)}
    </Text>
        }
        
      </View>
    );
  }

  renderItem() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerVoucher}>{this.renderVoucherTag()}</View>
          <View style={styles.containerOption}>
            <Text style={styles.titleProductCart}>
              {this.props.cart.productCartData ? this.props.cart.productCartData.length : 0} Produk
              dalam keranjang anda
            </Text>
          </View>
          <View style={styles.containerTotalCartList}>
            {this.props.cart.createOrderData ? <TotalCartList /> : <View />}
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <View style={{ justifyContent: 'flex-start', width: '100%' }}>
            <View style={styles.totalCartBox}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.totalAmountCart}>Total Harga</Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                {this.props.cart.createOrderData ?
                this.props.cart.createOrderData.voucher_availability.length === 0 ?
                  <Text style={styles.totalAmountCart}>
                  {this.props.cart.createOrderData
                    ? MoneyFormat(this.props.cart.createOrderData.net)
                    : MoneyFormat(0)}
                </Text>
                    : 
                    this.renderTotal()
                    // <Text style={styles.totalAmountCart}>
                    //   {this.props.cart.createOrderData
                    //     ? MoneyFormat(
                    //         0.1 * (this.props.cart.createOrderData.untaxed_amount - this.voucher()) +
                    //           (this.props.cart.createOrderData.untaxed_amount - this.voucher())
                    //       )
                    //     : MoneyFormat(0)}
                    // </Text>
                     : <View />
                }
              
                
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Button
              onPress={() => this.orderConfirmation()}
              // onPress={() => this.openModalOrderMinimum()}
              title="Konfirmasi Order"
              titleStyle={styles.titleButton}
              buttonStyle={styles.button}
            />
          </View>
        </View>
        {this.modalVoucherList()}
        {this.modalInformation()}
        {this.modalOrderSplit()}
        {this.modalTimeOver()}
        {this.modalOrderMinimum()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.cart.loadingCreateOrder || this.props.cart.loadingCreateOrder === null ? (
          <Loading style={{ height: '100%' }} />
        ) : (
          this.renderItem()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerVoucher: {
    height: 0.09 * height,
    paddingRight: 15,
    paddingLeft: 15,
    justifyContent: 'center'
  },
  containerOption: {
    paddingRight: 15,
    paddingLeft: 15,
    height: 0.02 * height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerTotalCartList: {
    marginTop: -0.005 * height
  },
  containerRecomendation: {
    marginBottom: 0.11 * height
  },
  containerButton: {
    backgroundColor: '#fff',
    height: 0.14 * height,
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleButton: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  titleButtonVoucher: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.4),
    color: '#ffffff'
  },
  button: {
    backgroundColor: css.mainColor,
    borderRadius: 10,
    marginTop: -0.01 * height,
    width: 282,
    height: 41,
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  buttonVoucherSuccess: {
    backgroundColor: css.mainColor,
    borderRadius: 20,
    width: 0.45 * width,
    height: 0.05 * height
  },
  buttonVoucher: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#219653'
  },
  image: {
    height: undefined,
    width: '100%',
    aspectRatio: 233 / 28
  },
  voucherBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '6%',
    paddingRight: '6%',
    justifyContent: 'space-between'
  },
  voucherText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.6),
    color: '#fff'
  },
  icons: {
    width: 24,
    height: 24
  },
  modalMainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    // height: 1 * height,
    height: '100%',
    justifyContent: 'center'
  },
  modalContainer: {
    marginLeft: '6%',
    marginRight: '6%',
    borderRadius: 10,
    height: 0.75 * height,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  modalContainerInformation: {
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
    height: 0.45 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '7%',
    paddingBottom: 0
  },
  modalContainerOrderSplit: {
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
    height: 0.35 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '7%',
    paddingBottom: 0
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
    height: '20%',
    paddingTop: '7%',
    alignItems: 'center'
  },
  cardButtonModal: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15
  },
  imageVoucher: {
    height: undefined,
    width: '45%',
    aspectRatio: 37 / 10
  },
  closeBoxModal: {
    position: 'absolute',
    alignItems: 'flex-end',
    padding: '2%',
    width: '100%'
  },
  titleTextModal: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.4),
    color: '#4f4f4f',
    marginTop: '3%'
  },
  imageEmptyVoucher: {
    resizeMode: 'contain',
    position: 'relative',
    height: '23%',
    width: '50%'
  },
  imageSuccess: {
    height: undefined,
    width: '45%',
    aspectRatio: 10 / 10,
    marginBottom: '15%',
    marginTop: '15%'
  },
  voucherEmptyText: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#333333',
    fontSize: RFPercentage(2.2),
    marginTop: '10%'
  },
  voucherEmptyContentText: {
    fontFamily: Fonts.MontserratMedium,
    color: '#4f4f4f',
    fontSize: RFPercentage(1.7),
    marginTop: '3%'
  },
  totalCartBox: {
    height: 0.045 * height,
    backgroundColor: '#f2994a',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  titleProductCart: {
    fontFamily: Fonts.MontserratBold,
    marginLeft: 5,
    color: '#333333',
    fontSize: RFPercentage(1.8)
  },
  totalAmountCart: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#ffffff',
    fontSize: RFPercentage(1.8)
  },
  titleVoucherSuccess: {
    fontFamily: Fonts.MontserratExtraBold,
    color: '#333333',
    fontSize: RFPercentage(2.3)
  },
  contentVoucherSuccess: {
    fontFamily: Fonts.MontserratMedium,
    color: '#333333',
    fontSize: RFPercentage(1.5),
    textAlign: 'center'
  }
});

TotalCart.propTypes = {
  useVoucherDiskon: PropTypes.func
};

const mapStateToProps = ({ cart, voucher }) => {
  return { cart, voucher };
};

export default connect(
  mapStateToProps,
  {
    useVoucher,
    fetchCreateOrder,
    // moveToCheckout,
    fetchProfileInformation,
    // backNavigation,
    setTimetOutCreateOrder
  }
)(TotalCart);
