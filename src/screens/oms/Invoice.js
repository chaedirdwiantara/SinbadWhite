import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Modal,
  Image,
  Platform
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Navigation } from 'react-native-navigation';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import css from '../../config/css.json';
import { Fonts } from '../../utils/Fonts';
import {
  orderEndFlag,
  deleteInvoiceData,
  newHistory,
  selectedTabIndex
} from '../../redux/actions';
import { PushToDashboard } from '../../navigations';
import { MoneyFormat } from '../../helpers';
import { Loading } from '../../components/Loading';
import { backNavigationRoot } from '../../helpers/Navigation';

const { width, height } = Dimensions.get('window');

let backButton = null;
if (Platform.OS === 'ios') {
  backButton = require('../../assets/icons/Icon-ios-back.png');
} else {
  backButton = require('../../assets/icons/Icon-android-back.png');
}

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.navigationEventListener = Navigation.events().bindComponent(this);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.state = {
      openDetailInvoice: false,
      detailIndex: 0,
      loading: false
    };
  }

  componentWillUnmount() {
    this.props.orderEndFlag(true);
    this.props.newHistory(true);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  // when user push back button, back to home, and transaction success
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'ButtonBack') {
      this.setState({ loading: true });
      // this.props.orderEndFlag(true);
      this.props.deleteInvoiceData();
      setTimeout(() => {
        this.setState({ loading: false });
        this.props.selectedTabIndex(0);
        Navigation.mergeOptions(this.props.componentId, {
          bottomTabs: {
            currentTabIndex: 0
          }
        });
        backNavigationRoot(this.props.componentId);
      }, 3000);
    }
  }

  // when user push ok button, back to home, and transaction success
  goToHome() {
    this.setState({ loading: true });
    // this.props.orderEndFlag(true);
    this.props.deleteInvoiceData();
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.selectedTabIndex(0);
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex: 0
        }
      });
      backNavigationRoot(this.props.componentId);
    }, 3000);
  }

  openModalDetailInvoice(index) {
    this.setState({ openDetailInvoice: true, detailIndex: index });
  }

  closeModalDetailInvoice() {
    this.setState({ openDetailInvoice: false });
  }

  totalDiskonPromo() {
    if (this.props.cart.invoiceData) {
      return (
        this.props.cart.invoiceData[this.state.detailIndex].discount +
        this.props.cart.invoiceData[this.state.detailIndex].promo
      );
    }
    return 0;
  }

  bonusSection = (item, index) => {
    return (
      <View style={styles.bonusBox} key={index}>
        <View style={styles.bonusBoxYellow}>
          <Text style={styles.bonusText}>BONUS</Text>
        </View>
        <View style={styles.bonusBoxGreen}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.bonusTextProduct}>{item.product_name}</Text>
          </View>
          <View style={styles.bonusContentBox}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.bonusTextUnit}>{item.quantity} pcs</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.bonusTextAmount}>{MoneyFormat(0)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  modalDetailInvoice() {
    return this.props.cart.invoiceData ? (
      <Modal
        visible={this.state.openDetailInvoice}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.modalMainContainer}>
          <View style={styles.modalBoxHeader}>
            <Text style={styles.modalTitleText}>Detail Faktur</Text>
            <TouchableOpacity
              style={styles.backButtonModal}
              onPress={() => this.closeModalDetailInvoice()}
            >
              <Image
                source={backButton}
                style={{ marginTop: '10%', marginRight: '5%' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.containerModalTitle}>
                <Text style={styles.modalTitleContentText}>
                  {
                    this.props.cart.invoiceData[this.state.detailIndex]
                      .order_name
                  }
                </Text>
              </View>
              <Card containerStyle={styles.modalContentBox}>
                <View style={styles.modalBoxSectionOne}>
                  <View style={{ marginBottom: 0.015 * height }}>
                    <Text
                      style={[
                        styles.orderAndaTextProduct,
                        { fontSize: RFPercentage(1.7) }
                      ]}
                    >
                      Order Anda
                    </Text>
                  </View>
                  {this.props.cart.invoiceData[
                    this.state.detailIndex
                  ].order_line.map((item, index) => {
                    return !item.bonus ? (
                      <View key={index}>
                        <View
                          style={{
                            marginBottom: 0.01 * height,
                            width: '70%'
                          }}
                        >
                          <Text style={styles.orderAndaTextProduct}>
                            {item.product_name}
                          </Text>
                        </View>
                        <View style={styles.orderAndaContentBox}>
                          <View>
                            <Text style={styles.orderAndaTextUnit}>
                              {item.quantity} pcs
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.orderAndaTextAmount}>
                              {MoneyFormat(item.gross)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View key={index} />
                    );
                  })}
                  <View style={styles.subTotalBox}>
                    <Text style={styles.subTotalText}>Subtotal</Text>
                    <Text style={styles.subTotalTextAmount}>
                      {MoneyFormat(
                        this.props.cart.invoiceData[this.state.detailIndex]
                          .gross
                      )}
                    </Text>
                  </View>
                </View>
                {/* section 2 */}
                <View>
                  <View style={{ marginBottom: 0.015 * height }}>
                    <Text
                      style={[
                        styles.orderAndaTextProduct,
                        {
                          fontSize: RFPercentage(1.7),
                          marginTop: 0.03 * height,
                          paddingRight: 15,
                          paddingLeft: 15
                        }
                      ]}
                    >
                      Potongan Harga
                    </Text>
                  </View>
                  <View style={styles.rincianPotonganHarga}>
                    <Text style={styles.potonganHargaText}>Diskon</Text>
                    <Text style={styles.orderAndaTextAmountGreen}>
                      {this.props.cart.invoiceData[this.state.detailIndex]
                        .discount === 0
                        ? 0
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.rincianPotonganHarga,
                      { flexDirection: 'column' }
                    ]}
                  >
                    {this.props.cart.invoiceData[
                      this.state.detailIndex
                    ].order_line.map((item, index) => {
                      return item.discount !== 0 ? (
                        <View
                          key={index}
                          style={[
                            styles.orderAndaContentBox,
                            { justifyContent: 'space-between', flex: 1 }
                          ]}
                        >
                          <View style={{ width: '70%' }}>
                            <Text style={styles.orderAndaTextUnitGreen}>
                              {item.product_name}
                            </Text>
                          </View>
                          <Text style={styles.orderAndaTextAmountGreen}>
                            {MoneyFormat(item.discount)}
                          </Text>
                        </View>
                      ) : (
                        <View key={index} />
                      );
                    })}
                  </View>
                  <View style={styles.rincianPotonganHarga}>
                    <Text style={styles.potonganHargaText}>Promo</Text>
                    <Text style={styles.orderAndaTextAmountGreen}>
                      {this.props.cart.invoiceData[this.state.detailIndex]
                        .promo === 0
                        ? 0
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.rincianPotonganHarga,
                      { flexDirection: 'column' }
                    ]}
                  >
                    {this.props.cart.invoiceData[
                      this.state.detailIndex
                    ].order_line.map((item, index) => {
                      return item.promo !== 0 ? (
                        <View
                          key={index}
                          style={[
                            styles.orderAndaContentBox,
                            { justifyContent: 'space-between', flex: 1 }
                          ]}
                        >
                          <View>
                            <Text style={styles.orderAndaTextUnitGreen}>
                              {item.product_name}
                            </Text>
                          </View>

                          <Text style={styles.orderAndaTextAmountGreen}>
                            -{MoneyFormat(item.promo)}
                          </Text>
                        </View>
                      ) : (
                        <View key={index} />
                      );
                    })}
                  </View>
                  {this.props.cart.invoiceData[
                    this.state.detailIndex
                  ].order_line.map((item, index) => {
                    return item.bonus ? (
                      this.bonusSection(item, index)
                    ) : (
                      <View key={index} />
                    );
                  })}
                  <View style={styles.rincianPotonganHarga}>
                    <Text style={styles.subTotalText}>
                      Total Diskon & Promo
                    </Text>
                    <Text style={styles.subTotalTextAmountGreen}>
                      -{MoneyFormat(this.totalDiskonPromo())}
                    </Text>
                  </View>
                  <View style={styles.rincianPotonganHarga}>
                    <Text style={styles.potonganHargaText}>Voucher</Text>
                    {this.props.cart.invoiceData[this.state.detailIndex]
                      .voucher === 0 ? (
                      <Text style={styles.orderAndaTextAmountGreen}>0</Text>
                    ) : (
                      <View />
                    )}
                  </View>
                  <View
                    style={[
                      styles.rincianPotonganHarga,
                      { flexDirection: 'column' }
                    ]}
                  >
                    {this.props.cart.invoiceData[this.state.detailIndex]
                      .voucher !== 0 ? (
                      <View
                        style={[
                          styles.orderAndaContentBox,
                          { justifyContent: 'space-between', flex: 1 }
                        ]}
                      >
                        <View style={styles.boxVoucherList}>
                          <Text style={styles.orderAndaTextProductWhite}>
                            "
                            {
                              this.props.cart.invoiceData[
                                this.state.detailIndex
                              ].voucher_code
                            }
                            "
                          </Text>
                        </View>
                        <Text style={styles.orderAndaTextAmountGreen}>
                          -
                          {MoneyFormat(
                            this.props.cart.invoiceData[this.state.detailIndex]
                              .voucher
                          )}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                  <View
                    style={[
                      styles.subTotalBox,
                      { paddingLeft: 15, paddingRight: 15 }
                    ]}
                  >
                    <Text style={styles.subTotalText}>Subtotal</Text>
                    <Text style={styles.subTotalTextAmount}>
                      {MoneyFormat(
                        this.props.cart.invoiceData[this.state.detailIndex]
                          .untaxed_amount
                      )}
                    </Text>
                  </View>
                </View>
                {/* section 3 */}
                <View style={styles.modalBoxSectionOne}>
                  <View
                    style={{
                      marginBottom: 0.015 * height,
                      marginTop: 0.03 * height
                    }}
                  >
                    <Text
                      style={[
                        styles.orderAndaTextProduct,
                        { fontSize: RFPercentage(1.7) }
                      ]}
                    >
                      Rincian Harga
                    </Text>
                  </View>
                  <View style={styles.orderAndaContentBox}>
                    <View>
                      <Text style={styles.orderAndaTextProduct}>
                        Total Harga
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.subTotalTextAmount}>
                        {MoneyFormat(
                          this.props.cart.invoiceData[this.state.detailIndex]
                            .gross
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderAndaContentBox}>
                    <View>
                      <Text style={styles.orderAndaTextProduct}>
                        Setelah Potongan
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.subTotalTextAmount}>
                        {MoneyFormat(
                          this.props.cart.invoiceData[this.state.detailIndex]
                            .untaxed_amount
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderAndaContentBox}>
                    <View>
                      <Text style={styles.orderAndaTextProduct}>PPN 10%</Text>
                    </View>
                    <View>
                      <Text style={styles.subTotalTextAmount}>
                        +
                        {MoneyFormat(
                          this.props.cart.invoiceData[this.state.detailIndex]
                            .taxes
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.subTotalBox,
                    {
                      paddingRight: 0.03 * width,
                      paddingLeft: 0.04 * width,
                      paddingTop: 0.02 * width,
                      paddingBottom: 0.02 * width,
                      backgroundColor: '#f2994a',
                      borderBottomRightRadius: 15,
                      borderBottomLeftRadius: 15
                    }
                  ]}
                >
                  <Text style={styles.totalHarga}>Total Harga</Text>
                  <Text style={styles.totalHarga}>
                    {MoneyFormat(
                      this.props.cart.invoiceData[this.state.detailIndex].net
                    )}
                  </Text>
                </View>
              </Card>
            </ScrollView>
          </View>
        </View>
      </Modal>
    ) : (
      <View />
    );
  }

  render() {
    return this.state.loading ? (
      <Loading style={{ height: '100%' }} />
    ) : (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerTitle}>
            <Text style={styles.titleText}>Daftar Faktur</Text>
            <Text style={styles.subTitleText}>Silahkan cek faktur Anda</Text>
          </View>
          <View style={styles.containerContent}>
            {this.props.cart.invoiceData ? (
              this.props.cart.invoiceData.map((item, index) => {
                return (
                  <View
                    style={
                      index + 1 === this.props.cart.invoiceData.length
                        ? [
                            styles.contentBox,
                            {
                              borderBottomWidth: 1,
                              borderBottomColor: '#f2f2f2'
                            }
                          ]
                        : styles.contentBox
                    }
                    key={index}
                  >
                    <Text style={styles.contentText}>{item.order_name}</Text>
                    <TouchableOpacity
                      onPress={() => this.openModalDetailInvoice(index)}
                    >
                      <View>
                        <Text style={styles.lihatText}>lihat</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Button
              onPress={() => this.goToHome()}
              title="OK"
              titleStyle={styles.titleButton}
              buttonStyle={styles.button}
            />
          </View>
        </View>
        {this.modalDetailInvoice()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // this for modal start
  modalBoxSectionOne: {
    paddingRight: 15,
    paddingLeft: 15
  },
  modalMainContainer: {
    backgroundColor: '#ffffff',
    position: 'relative',
    // height: 1 * height,
    height: '100%',
    justifyContent: 'center'
  },
  containerModalTitle: {
    height: 0.1 * height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBoxHeader: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0444c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContentBox: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 0,
    paddingTop: 15,
    paddingBottom: 0,
    marginBottom: 3,
    borderRadius: 15,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    padding: 0,
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  modalContainerButton: {
    height: 0.1 * height,
    width: '100%'
  },
  modalTitleContentText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(2.3),
    color: '#333333'
  },
  modalTitleText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 17,
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
  // this for modal end
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerTitle: {
    height: 0.12 * height,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  containerContent: {
    flex: 1
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
  contentBox: {
    height: 0.07 * height,
    paddingRight: 25,
    paddingLeft: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1
  },
  titleButton: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  titleText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(2.3),
    color: '#333333'
  },
  contentText: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.7),
    color: '#4f4f4f'
  },
  lihatText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#f0444c'
  },
  subTitleText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#4f4f4f'
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
  orderAndaContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0.01 * height
  },
  orderAndaTextProduct: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  orderAndaTextUnit: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  orderAndaTextAmount: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  orderAndaTextUnitGreen: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#3cb870'
  },
  orderAndaTextAmountGreen: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#3cb870'
  },
  subTotalBox: {
    marginTop: 0.02 * height,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  subTotalText: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  subTotalTextAmount: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  subTotalTextAmountGreen: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#3cb870'
  },
  rincianPotonganHarga: {
    marginBottom: 0.01 * height,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 15
  },
  potonganHargaText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  bonusBoxYellow: {
    backgroundColor: '#ffde7a',
    width: '5%'
  },
  bonusBoxGreen: {
    backgroundColor: '#6fcf97',
    flex: 1,
    paddingLeft: '3%',
    paddingRight: '5%'
  },
  bonusBox: {
    width: '100%',
    height: 0.06 * height,
    marginBottom: 0.005 * height,
    flexDirection: 'row'
  },
  bonusText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.3),
    color: '#3cb870',
    width: 0.06 * height,
    transform: [{ rotate: '270deg' }],
    marginLeft: -0.018 * height,
    marginTop: 0.022 * height,
    textAlign: 'center'
  },
  bonusTextProduct: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#ffffff'
  },
  bonusTextUnit: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#ffffff'
  },
  bonusTextAmount: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  bonusContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  boxVoucherList: {
    backgroundColor: '#3cb870',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 0.03 * height
  },
  orderAndaTextProductWhite: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.6),
    color: '#ffffff'
  },
  totalHarga: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.8),
    color: '#ffffff'
  }
});

const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(mapStateToProps, {
  orderEndFlag,
  deleteInvoiceData,
  newHistory,
  selectedTabIndex
})(Invoice);
