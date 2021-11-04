import {
  React,
  Component,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { MoneyFormat } from '../../helpers/NumberFormater';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import { CANCEL, DELIVERED, DONE } from '../../constants/orderConstants';
import {
  OVERDUE,
  PAID,
  PAY_LATER,
  PAY_NOW,
  PAY_ON_DELIVERY,
  WAITING_FOR_PAYMENT,
  HISTORY
} from '../../constants/paymentConstants';
import NavigationService from '../../navigation/NavigationService';

class HistoryDetailPaymentInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  totalPembayaranPesanan(data) {
    let total = 0;
    if (data.paymentType.id === PAY_NOW) {
      total = data.billing.totalPayment;
    } else {
      if (data.status === DELIVERED || data.status === DONE) {
        total = data.billing.deliveredTotalPayment;
      } else {
        total = data.billing.totalPayment;
      }
    }
    return total;
  }

  totalPesanan(data) {
    let total = 0;
    if (data.paymentType.id === PAY_NOW) {
      total = data.parcelFinalPrice;
    } else {
      if (data.status === DELIVERED || data.status === DONE) {
        total = data.deliveredParcelFinalPrice;
      } else {
        total = data.parcelFinalPrice;
      }
    }
    return total;
  }

  totalPPN(data) {
    let total = 0;
    if (data.paymentType.id === PAY_NOW) {
      total = data.parcelTaxes;
    } else {
      if (data.status === DELIVERED || data.status === DONE) {
        total = data.deliveredParcelTaxes;
      } else {
        total = data.parcelTaxes;
      }
    }
    return total;
  }

  totalParcelQty(data) {
    let total = 0;
    if (data.paymentType.id === PAY_NOW) {
      total = data.parcelQty;
    } else {
      if (data.status === DELIVERED || data.status === DONE) {
        total = data.deliveredParcelQty;
      } else {
        total = data.parcelQty;
      }
    }
    return total;
  }

  subTotalPesanan(data) {
    let total = 0;
    if (data.paymentType.id === PAY_NOW) {
      total = data.parcelGrossPrice;
    } else {
      if (data.status === DELIVERED || data.status === DONE) {
        total = data.deliveredParcelGrossPrice;
      } else {
        total = data.parcelGrossPrice;
      }
    }
    return total;
  }

  /** Promo & Voucher Information */
  promoVoucherInformation(type, data) {
    const detailHistory = this.props.history.dataDetailHistory;
    switch (type) {
      case 'voucher':
        break;
      case 'promo':
        if (
          detailHistory.status === DONE ||
          detailHistory.status === DELIVERED
        ) {
          return {
            qty: data.deliveredPromoQty
          };
        } else if (detailHistory.invoicedParcelModified) {
          return {
            qty: data.invoicedPromoQty
          };
        } else {
          return {
            qty: data.promoQty
          };
        }
      default:
        break;
    }
  }

  /**
   * =======================
   * VIEW
   * =======================
   */
  /** RENDER CONTENT LIST GLOBAL */
  renderContentListGlobal(key, value, green, minus) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={green ? Fonts.type107 : Fonts.type9}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            accessible={true}
            accessibilityLabel={'txtDetailValueGlobal'}
            style={[
              green ? Fonts.type107 : Fonts.type9,
              { textAlign: 'right' }
            ]}
          >
            {minus ? '-' : ''}
            {value}
          </Text>
        </View>
      </View>
    );
  }
  /** RENDER DETAIL INFORMASI PEMBAYARAN */
  renderPaymentInformationDetail() {
    const paymentPromo = this.props.history.dataDetailHistory
      .parcelPromoPaymentAmount;
    const detailHistory = this.props.history.dataDetailHistory;
    const isPayLater = detailHistory.billing.paymentTypeId === PAY_LATER;
    const isDeliveredOrDone =
      detailHistory.status === DONE || detailHistory.status === DELIVERED;
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              flexDirection: 'row'
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={Fonts.type48}>Informasi Pembayaran</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {isPayLater && isDeliveredOrDone ? (
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('HistoryCollectionLog', {
                      type: HISTORY
                    })
                  }
                >
                  <Text style={Fonts.type29}>Riwayat Penagihan</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            {this.renderContentListGlobal(
              'Tipe Pembayaran',
              detailHistory.paymentType.name
            )}
            {detailHistory.paylaterType
              ? this.renderContentListGlobal(
                  'Penyedia Layanan',
                  detailHistory.paylaterType.name
                )
              : null}
            {this.renderContentListGlobal(
              'Metode Pembayaran',
              detailHistory.paymentChannel.name
            )}
            <View style={[GlobalStyle.lines, { marginTop: 8 }]} />

            {this.renderContentListGlobal(
              `Sub-total pesanan (${this.totalParcelQty(detailHistory)})`,
              MoneyFormat(this.subTotalPesanan(detailHistory))
            )}
            {this.renderPromoList(detailHistory.promoList)}
            {this.renderVoucherList(detailHistory.voucherList)}
            {this.renderContentListGlobal('Ongkos Kirim', MoneyFormat(0))}
            {this.renderContentListGlobal(
              'PPN 10%',
              MoneyFormat(this.totalPPN(detailHistory))
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8
              }}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={Fonts.type48}>Total Pesanan</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={Fonts.type48}>
                  {MoneyFormat(this.totalPesanan(detailHistory))}
                </Text>
              </View>
            </View>
            <View style={[GlobalStyle.lines, { marginTop: 8 }]} />

            {paymentPromo
              ? this.renderContentListGlobal(
                  'Promo Pembayaran',
                  MoneyFormat(paymentPromo),
                  false,
                  true
                )
              : null}
            {detailHistory.billing.totalFeeDeduct
              ? this.renderContentListGlobal(
                  'Layanan Pembayaran',
                  MoneyFormat(detailHistory.billing.totalFeeDeduct)
                )
              : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16
              }}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={Fonts.type48}>Total Pembayaran Pesanan</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text
                  accessible={true}
                  accessibilityLabel={'txtDetailTotalPembayaranPesanan'}
                  style={Fonts.type48}
                >
                  {MoneyFormat(this.totalPembayaranPesanan(detailHistory))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /** === RENDER VOUCHER LIST ==== */
  renderVoucherList(data) {
    return data.map((item, index) => {
      return (
        <View key={index}>
          {this.renderContentListGlobal(
            item.voucherValue !== null
              ? item.voucherName
              : `${item.catalogueName} (${item.voucherQty} Pcs)`,
            item.voucherValue !== null
              ? `- ${MoneyFormat(item.voucherValue)}`
              : 'FREE',
            true
          )}
        </View>
      );
    });
  }
  /** === RENDER PROMO LIST ==== */
  renderPromoList(data) {
    return data.map((item, index) => {
      return (
        <View key={index}>
          {this.renderContentListGlobal(
            item.promoValue !== null
              ? item.promoName
              : `${item.catalogueName} (${
                  this.promoVoucherInformation('promo', item).qty
                } Pcs)`,
            item.promoValue !== null
              ? `- ${MoneyFormat(item.promoValue)}`
              : 'FREE',
            true
          )}
        </View>
      );
    });
  }

  /** RENDER CONTENT */
  renderContent() {
    return this.renderPaymentInformationDetail();
  }

  /** MAIN */
  render() {
    if (this.state.data !== null) {
      return (
        <SafeAreaView style={styles.mainContainer}>
          {this.renderContent()}
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  backgroundRed: {
    width: '100%',
    backgroundColor: masterColor.mainColor,
    position: 'absolute',
    zIndex: 0,
    height: 50
  },
  boxBottomAction: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    borderTopColor: masterColor.fontBlack10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64
  },
  boxPaymentNotification: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  /** BUTTON */
  buttonRed: {
    backgroundColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8
  },
  buttonWhite: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  unFocusedFont: {
    fontSize: 10,
    color: masterColor.fontBlack80,
    fontFamily: Fonts.MontserratItalic,
    marginBottom: 20
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10
  },
  countDownTextBold: {
    color: masterColor.fontBlack50,
    fontFamily: Fonts.MontserratBold,
    fontSize: 18
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: masterColor.backButtonWhite,
    paddingLeft: 15,
    paddingRight: 15
  },
  boxSubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ history, user, merchant }) => {
  return { history, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailPaymentInformation);
