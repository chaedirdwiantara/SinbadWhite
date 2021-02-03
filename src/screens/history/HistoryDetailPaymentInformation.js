import {
  React,
  Component,
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from '../../library/reactPackage';
import { MoneyFormat } from '../../helpers/NumberFormater';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
class HistoryDetailPaymentInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  /** RENDER CONTENT LIST GLOBAL */
  renderContentListGlobal(key, value, green) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={green ? Fonts.type51 : Fonts.type17}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={green ? Fonts.type51 : Fonts.type17}>{value}</Text>
        </View>
      </View>
    );
  }
  /** RENDER DETAIL INFORMASI PEMBAYARAN */
  renderPaymentInformationDetail() {
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Informasi Pembayaran</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            {this.renderContentListGlobal(
              'Tipe Pembayaran',
              this.props.history.dataDetailHistory.paymentType.name
            )}
            {this.props.history.dataDetailHistory.paylaterType
              ? this.renderContentListGlobal(
                  'Tipe Bayar Nanti',
                  this.props.history.dataDetailHistory.paylaterType.name
                )
              : null}
            {this.renderContentListGlobal(
              'Metode Pembayaran',
              this.props.history.dataDetailHistory.paymentChannel.name
            )}
            {this.renderContentListGlobal(
              `Total Barang (${
                this.props.history.dataDetailHistory.parcelQty
              })`,
              MoneyFormat(this.props.data.parcelGrossPrice)
            )}
            {this.renderPromoList(
              this.props.history.dataDetailHistory.promoList
            )}
            {this.renderVoucherList(
              this.props.history.dataDetailHistory.voucherList
            )}
            {/* {this.renderContentListGlobal(
              'Potongan Harga',
              `- ${MoneyFormat(
                this.props.history.dataDetailHistory.parcelTotalRebate
              )}`,
              true
            )} */}
            {this.renderContentListGlobal('Ongkos Kirim', MoneyFormat(0))}
            {this.renderContentListGlobal(
              'PPN 10%',
              MoneyFormat(this.props.history.dataDetailHistory.parcelTaxes)
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16
              }}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={Fonts.type50}>Sub Total</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={Fonts.type21}>
                  {MoneyFormat(
                    this.props.history.dataDetailHistory.parcelFinalPrice
                  )}
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
              : `${item.catalogueName} (${item.promoQty} Pcs)`,
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
          {/* <View><Text>Informasi</Text></View> */}
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
