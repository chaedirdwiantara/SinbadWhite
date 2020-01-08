import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
  Modal,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ModalBottom from 'react-native-modal';
import { Fonts } from '../../utils/Fonts';
import Recomendation from '../home/Recomendation';
import { Loading } from '../../components/Loading';
import VoucherModal from '../voucher/VoucherModal';
import ListThumbailCart from './ListThumbailCart';
import ListCart from './ListCart';
import css from '../../config/css.json';
import {
  fetchVoucher,
  handleResetFetchVoucher,
  fetchProductByCart,
  moveToSignIn,
  pageBeforeSignInPage,
  updateItemCartToProduct,
  updateItemCartInCart
} from '../../redux/actions';
import { RowButtonActive, RowButtonInactive } from '../../components';
import { moveToTotalCart } from '../../helpers/Navigation';

const { width, height } = Dimensions.get('window');

const shadowStyle = {
  shadowColor: '#777777',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3
};

class ContentCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalConfirmation: false,
      modalStoctConfirmation: false,
      modalNextConfirmation: false,
      modalStoctLessConfirmation: false,
      iconGridList: true,
      iconList: false,
      cardData: null,
      itemCartOutOfStock: null,
      publicComponentCartData: null,
      itemCartLessOfStock: null,
      load: false
    };
  }

  componentDidMount() {
    this.props.handleResetFetchVoucher();
    this.props.fetchVoucher(true);
  }

  // componentWillUnmount() {
  //   this.props.updateItemCartToProduct(this.state.publicComponentCartData);
  // }

  toTotalCart() {
    this.setState({ modalNextConfirmation: false, load: true });
    setTimeout(() => {
      this.props.updateItemCartToProduct(this.state.publicComponentCartData);
    }, 100);
    setTimeout(() => {
      this.setState({ load: false });
      moveToTotalCart(this.props.componentId);
    }, 1000);
  }

  toTotalCartFormBottomModal() {
    this.setState({ modalStoctLessConfirmation: false });
    setTimeout(() => {
      this.setState({ load: true });
      if (this.state.itemCartLessOfStock.length > 0) {
        this.state.itemCartLessOfStock.map(item => {
          const checkItemInCart = this.state.publicComponentCartData.findIndex(
            x => x.id === item.id
          );
          if (checkItemInCart > -1) {
            this.state.publicComponentCartData[checkItemInCart].qty_purchase =
              item.available_stock;
            this.props.updateItemCartInCart(this.state.publicComponentCartData);
            this.setState({
              publicComponentCartData: this.state.publicComponentCartData
            });
          }
        });
      }
    }, 100);
    setTimeout(() => {
      this.setState({ load: false });
      moveToTotalCart(this.props.componentId);
    }, 1000);
  }

  openModal() {
    this.setState({ modalConfirmation: true });
  }

  openModalNextConfirmation() {
    if (this.props.user.userData !== null) {
      // check if there is any item in cart out of stock
      const itemCartOutOfStock = this.state.publicComponentCartData.find(x => {
        // check if item cart check stock
        if (x.display_stock) {
          // check, if stock less than purchase, order cannot allow
          if (x.available_stock < x.min_qty) {
            return x;
          }
        }
      });
      if (itemCartOutOfStock !== undefined) {
        this.setState({ itemCartOutOfStock, modalStoctConfirmation: true });
      } else {
        // check if cart has less stock
        const itemCartLessOfStock = [];
        this.state.publicComponentCartData.forEach(item => {
          if (item.display_stock) {
            if (item.available_stock < item.qty_purchase) {
              const newObj = {
                id: item.id,
                name: item.name,
                available_stock: item.available_stock
              };
              itemCartLessOfStock.push(newObj);
            }
          }
        });
        if (itemCartLessOfStock.length > 0) {
          this.setState({
            itemCartLessOfStock,
            modalStoctLessConfirmation: true
          });
        } else {
          this.setState({ modalNextConfirmation: true });
        }
      }
    } else {
      this.props.pageBeforeSignInPage('cart');
      this.props.moveToSignIn(this.props.componentId);
    }
  }

  closeModal() {
    this.setState({ modalConfirmation: false });
  }

  closeModalConfirmationStock() {
    this.setState({ modalStoctConfirmation: false });
  }

  closeModalNextConfirmation() {
    this.setState({ modalNextConfirmation: false });
  }

  closeModalStockLessConfirmation() {
    this.setState({ modalStoctLessConfirmation: false });
  }

  iconPush(type) {
    if (type === 'thumbails' && !this.state.iconGridList) {
      this.setState({ iconGridList: true, iconList: false });
    }
    if (type === 'list' && !this.state.iconList) {
      this.setState({ iconGridList: false, iconList: true });
    }
  }

  parentMethod(data) {
    this.setState({ publicComponentCartData: data });
    this.props.parentReferenceForRootCart(data);
  }

  modalStockLessConfirmation() {
    return (
      <ModalBottom
        isVisible={this.state.modalStoctLessConfirmation}
        animationIn="slideInUp"
        // animationOut="slideOutDown"
        avoidKeyboard
        coverScreen
        animationInTiming={500}
        // animationOutTiming={10}
        backdropColor="black"
        backdropOpacity={0.4}
        style={{ marginBottom: 0, marginLeft: 0, marginRight: 0 }}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View style={styles.modalContainerModalBottom}>
          <View style={{ height: '100%' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={styles.titleModalBottom}>Konfirmasi Stock</Text>
              {this.state.itemCartLessOfStock !== null ? (
                this.state.itemCartLessOfStock.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        paddingRight: '7%',
                        paddingLeft: '7%'
                      }}
                    >
                      <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={styles.contentModalBottom}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.contentModalBottom}>
                          Tersedia {item.available_stock} pcs
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View />
              )}
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.buttonBoxLeft}>
                <Button
                  onPress={() => this.closeModalStockLessConfirmation()}
                  title="Kembali"
                  titleStyle={styles.titleButtonBorder}
                  buttonStyle={styles.buttonBorder}
                />
              </View>
              <View style={styles.buttonBoxRight}>
                <Button
                  onPress={() => this.toTotalCartFormBottomModal()}
                  title="Lanjutkan"
                  titleStyle={styles.titleButtonModalBottom}
                  buttonStyle={styles.buttonModalBottom}
                />
              </View>
            </View>
          </View>
        </View>
      </ModalBottom>
    );
  }

  modalConfirmationStock() {
    return (
      <Modal
        visible={this.state.modalStoctConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar
          backgroundColor="rgba(94, 28, 30, 1)"
          barStyle="light-content"
        />
        <View style={styles.modalMainContainer}>
          <View
            style={[
              styles.modalStockContainer,
              { paddingBottom: 0, height: 0.3 * height }
            ]}
          >
            <View style={[styles.cardStockModal, { height: '20%' }]}>
              <Text style={styles.titleStockModal}>Konfirmasi</Text>
            </View>
            <View style={[styles.cardStockModal, { flex: 1 }]}>
              <Text style={{ textAlign: 'center' }}>
                <Text style={styles.informationStockModal}>Maaf, produk </Text>
                <Text style={styles.modalConfirmStockProductName}>
                  {this.state.itemCartOutOfStock
                    ? this.state.itemCartOutOfStock.name
                    : ''}
                </Text>
                <Text style={styles.informationStockModal}>
                  {' '}
                  telah habis, silahkan hapus produk terkait
                </Text>
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '2%',
                height: '20%'
              }}
            >
              <Button
                onPress={() => this.closeModalConfirmationStock()}
                title="OK"
                titleStyle={styles.titleButtonConfirmationStock}
                buttonStyle={styles.buttonConfirmationStock}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  modalNextConfirmation() {
    return (
      <Modal
        visible={this.state.modalNextConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar
          backgroundColor="rgba(94, 28, 30, 1)"
          barStyle="light-content"
        />
        <View style={styles.modalMainContainer}>
          <View
            style={[
              styles.modalStockContainer,
              { paddingBottom: 10, height: 0.25 * height }
            ]}
          >
            <View style={[styles.cardStockModal, { flex: 1 }]}>
              <Text style={styles.titleStockModal}>Konfirmasi</Text>
            </View>
            <View style={[styles.cardStockModal, { flex: 1 }]}>
              <Text style={styles.informationStockModal}>
                Yakin lanjut ke Cek harga total ?
              </Text>
            </View>
            <View
              style={[
                styles.cardStockModal,
                { flex: 1, paddingLeft: 0, paddingRight: 0 }
              ]}
            >
              <View style={styles.cardButtonStockModal}>
                <RowButtonActive onPress={() => this.toTotalCart()}>
                  Ya
                </RowButtonActive>
                <RowButtonInactive
                  onPress={() => this.closeModalNextConfirmation()}
                >
                  Tidak
                </RowButtonInactive>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // if has voucher
  modalVoucherContent() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleModal}>
          <View style={styles.closeBoxModal}>
            <TouchableOpacity onPress={() => this.closeModal()}>
              <Icons color="#4f4f4f" name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/voucher_bg_list.png')}
            style={styles.imageVoucher}
          />
          <Text style={styles.titleTextModal}>
            Voucher dapat digunakan setelah cek harga
          </Text>
        </View>
        <View style={{ flex: 1, paddingBottom: '2%', paddingTop: '2%' }}>
          <VoucherModal />
        </View>
      </View>
    );
  }

  // if voucher is empty
  modalVoucherEmpty() {
    return !this.props.voucher.loadingVoucher ? (
      <View style={{ flex: 1 }}>
        <View style={styles.closeBoxModal}>
          <TouchableOpacity onPress={() => this.closeModal()}>
            <Icons color="#4f4f4f" name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Image
            source={require('../../assets/images/voucher_empty.png')}
            style={styles.imageEmptyVoucher}
          />
          <Text style={styles.voucherEmptyText}>Voucher Kosong</Text>
          <Text style={styles.voucherEmptyContentText}>
            Saat ini anda tidak memiliki Voucher
          </Text>
        </View>
      </View>
    ) : (
      <View />
    );
  }

  modalVoucherList() {
    return (
      <Modal
        visible={this.state.modalConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar
          backgroundColor="rgba(94, 28, 30, 1)"
          barStyle="light-content"
        />
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

  renderVoucherTag() {
    return this.props.voucher.loadingVoucher ? (
      <SkeletonPlaceholder>
        <View style={{ height: 0.05 * height, width: '100%' }} />
      </SkeletonPlaceholder>
    ) : (
      <View>
        <ImageBackground
          source={require('../../assets/images/voucher_bg.png')}
          style={styles.image}
        >
          <View style={styles.voucherBox}>
            <Text style={styles.voucherText}>
              Anda memiliki {this.props.voucher.totalVoucher} voucher
            </Text>
            <TouchableOpacity onPress={() => this.openModal()}>
              <View style={styles.buttonVoucher}>
                <Text style={styles.titleButtonVoucher}>Lihat Semua</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerVoucher}>{this.renderVoucherTag()}</View>
          <View style={styles.containerOption}>
            <TouchableOpacity onPress={() => this.iconPush('thumbails')}>
              <Image
                source={
                  this.state.iconGridList
                    ? require('../../assets/icons/viewlist_red.png')
                    : require('../../assets/icons/viewlist.png')
                }
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.iconPush('list')}>
              <Image
                source={
                  this.state.iconList
                    ? require('../../assets/icons/viewlist_2_red.png')
                    : require('../../assets/icons/viewlist_2.png')
                }
                style={styles.icons}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerProducts}>
            {this.state.iconGridList ? (
              <ListThumbailCart
                onRef={ref => (this.parentReference = ref)}
                parentReference={this.parentMethod.bind(this)}
              />
            ) : (
              <ListCart
                onRef={ref => (this.parentReference = ref)}
                parentReference={this.parentMethod.bind(this)}
              />
            )}
          </View>
          <View style={styles.containerRecomendation}>
            <Recomendation
              style={shadowStyle}
              componentId={this.props.componentId}
            />
          </View>
        </ScrollView>
        {this.state.load ? (
          <View />
        ) : (
          <View style={styles.containerButton}>
            <Button
              disabled={
                this.props.user.roles.length === 0
                  ? false
                  : this.props.user.roles.indexOf('1') === -1 &&
                    this.props.user.roles.indexOf('3') === -1
              }
              onPress={() => this.openModalNextConfirmation()}
              title="Cek Harga Total"
              titleStyle={styles.titleButton}
              disabledTitleStyle={([styles.titleButton], { color: '#ffffff' })}
              disabledStyle={styles.buttonDisabled}
              buttonStyle={styles.button}
            />
          </View>
        )}

        {this.modalVoucherList()}
        {this.modalConfirmationStock()}
        {this.modalNextConfirmation()}
        {this.modalStockLessConfirmation()}
        {this.state.load ? <Loading style={{ height: '100%' }} /> : <View />}
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
  containerProducts: {
    flex: 1,
    marginTop: -0.005 * height
    // marginBottom: -0.02 * height
  },
  containerRecomendation: {
    marginBottom: 0.11 * height
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
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 10,
    marginVertical: 7,
    width: 282,
    height: 41,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0
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
    height: 24,
    marginRight: 5
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
  modalStockContainer: {
    padding: '5%',
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
    // height: 0.2 * height,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  cardStockModal: {
    position: 'relative',
    alignItems: 'center',
    // height: '40%',
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleStockModal: {
    color: '#333333',
    fontSize: RFPercentage(2.4),
    fontFamily: Fonts.MontserratExtraBold,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  informationStockModal: {
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.MontserratMedium
  },
  cardButtonStockModal: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 15
  },
  titleButtonConfirmationStock: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  buttonConfirmationStock: {
    backgroundColor: css.mainColor,
    borderRadius: 20,
    width: 0.45 * width,
    height: 0.05 * height
  },
  modalConfirmStockProductName: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  buttonBox: {
    height: 0.1 * height,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonBoxLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '2%'
  },
  buttonBoxRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '2%'
  },
  buttonModalBottom: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    marginTop: -0.01 * height,
    width: 0.35 * width,
    height: 0.05 * height,
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  buttonBorder: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#f0444c',
    borderWidth: 1,
    marginTop: -0.01 * height,
    width: 0.35 * width,
    height: 0.05 * height
  },
  titleButtonModalBottom: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  titleButtonBorder: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#f0444c'
  },
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
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(2),
    color: '#333333'
  },
  contentModalBottom: {
    marginBottom: 0.01 * height,
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  }
});

const mapStateToProps = ({ cart, voucher, user }) => {
  return { cart, voucher, user };
};

export default connect(mapStateToProps, {
  // moveToTotalCart,
  fetchVoucher,
  handleResetFetchVoucher,
  fetchProductByCart,
  moveToSignIn,
  pageBeforeSignInPage,
  updateItemCartToProduct,
  updateItemCartInCart
})(ContentCart);
