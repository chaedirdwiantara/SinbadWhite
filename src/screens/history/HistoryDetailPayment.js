import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  LayoutAnimation,
  Image,
  Clipboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Dimensions
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  moment,
  MaterialIcon,
  Tooltip,
  HTMLView,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import {
  GlobalStyle,
  GlobalStyleHtml,
  Fonts,
  MoneyFormat
} from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { ButtonSingle, ToastType1 } from '../../library/component';
import CountDown from '../../components/CountDown';
import { timeDiff, toLocalTime } from '../../helpers/TimeHelper';
import HistoryDetailPaymentInformation from './HistoryDetailPaymentInformation';
import { Color } from '../../config';

const { width, height } = Dimensions.get('window');
class HistoryDetailPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idleTime: 0,
      expiredTime: null,
      showToast: false,
      accordionOpen: -1,
      toastText: '',
      questionMarkShow: true,
      section: this.props.section
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    const localTime = toLocalTime(this.props.data.billing.expiredPaymentTime);
    const timeNow = new Date();
    const expiredTime = new Date(localTime);
    const timeDiffInSecond = timeDiff(timeNow, expiredTime);
    this.setState({ expiredTime: timeDiffInSecond });
    this.clockCall = setInterval(() => {
      this.incrementIdleTime();
      if (this.state.idleTime >= 600) {
        clearInterval(this.clockCall);
        this.props.historyGetDetailProcess(this.props.data.id);
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.history.dataDetailHistory !==
      this.props.history.dataDetailHistory
    ) {
      if (
        prevProps.history.dataHistoryActivateVA !==
        this.props.history.dataHistoryActivateVA
      ) {
        const expired = this.props.history.dataDetailHistory.billing
          .expiredPaymentTime;
        const localTime = toLocalTime(expired);
        const timeNow = new Date();
        const expiredTime = new Date(localTime);
        const timeDiffInSecond = timeDiff(timeNow, expiredTime);
        this.setState({ expiredTime: timeDiffInSecond });
        this.clockCall = setInterval(() => {
          this.incrementIdleTime();
          if (this.state.idleTime >= 600) {
            clearInterval(this.clockCall);
            // NavigationService.navigate('Home');
            this.props.historyGetDetailProcess(this.props.data.id);
          }
        }, 1000);
      }
    }
    if (this.props.history.dataViewInvoice) {
      if (
        prevProps.history.dataViewInvoice !== this.props.history.dataViewInvoice
      ) {
        NavigationService.navigate('HistoryPaymentInvoiceView');
      }
    }
  }

  decrementClock = () => {
    this.setState(prevstate => ({ expiredTime: prevstate.expiredTime - 1 }));
  };

  incrementIdleTime = () => {
    this.setState(prevstate => ({ idleTime: prevstate.idleTime + 1 }));
  };

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }
  /** === Open Accordion === */
  openAccordion(index) {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        375,
        LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity
      )
    );

    if (this.state.accordionOpen === index) {
      this.setState({ accordionOpen: null });
    } else {
      this.setState({ accordionOpen: index });
    }
  }
  /**TIME CONVERTER */
  timeConverter() {
    const timeNow = new Date();
    const expiredTime = new Date(this.props.data.billing.expiredPaymentTime);

    const timeDiffInSecond = (timeNow.getTime() - expiredTime.getTime()) / 1000;
    const diffMs = timeNow - expiredTime;
    const h = Math.abs(
        Math.floor((timeDiffInSecond % 86400000) / 3600000)
          .toString()
          .padStart(2, '0')
      ),
      m = Math.abs(
        Math.floor(((this.state.expiredTime % 86400000) % 3600000) / 60000)
          .toString()
          .padStart(2, '0')
      ),
      s = Math.abs(
        Math.floor(this.state.expiredTime % 60)
          .toString()
          .padStart(2, '0')
      );

    return { h, m, s };
  }
  /**RENDER TIME COUNTDOWN */
  renderTimeCountDown() {
    if (this.state.expiredTime !== null) {
      return (
        <CountDown
          type={'big'}
          expiredTimer={Math.trunc(this.state.expiredTime)}
        />
      );
    }
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

  /**RENDER FAKTUR */
  renderInvoice() {
    return (
      <>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={Fonts.type48}>Informasi Faktur</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {this.props.history.loadingViewInvoice === true ? (
                <View>
                  <Image
                    source={require('../../assets/gif/loading/load_more.gif')}
                    style={{ height: 16, width: 50 }}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={() => this.goToInvoice()}>
                  <Text style={Fonts.type107}>Lihat Faktur</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 8,
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={Fonts.type17}>Nomor Pesanan</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={Fonts.type17}>
                {this.props.history.dataDetailHistory.orderCode
                  ? this.props.history.dataDetailHistory.orderCode
                  : '-'}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={Fonts.type17}>Nomor Referensi</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={Fonts.type17}>
                {this.props.history.dataDetailHistory.orderRef
                  ? this.props.history.dataDetailHistory.orderRef
                  : '-'}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
  /** GO TO INVOICE */
  goToInvoice() {
    const orderParcelId = this.props.history.dataDetailHistory.billing
      .orderParcelId;
    this.props.historyViewInvoiceProcess(orderParcelId);
    // this.props.historyViewInvoiceProcess(1222);
  }

  /**RENDER SENDDATATOCLIPBOARD */
  sendDataToClipBoard(price) {
    Clipboard.setString(price.toString());
    this.setState({
      toastText: 'Copied To Clipboard',
      showToast: true
    });
    setTimeout(() => {
      this.setState({
        showToast: false
      });
    }, 3000);
  }
  renderToast() {
    return this.state.showToast === true ? (
      <ToastType1 margin={10} content={this.state.toastText} />
    ) : (
      <View />
    );
  }
  /**RENDER VIRTUAL ACCOUNT */
  renderVirtualAccountNumber() {
    const paymentTypeId = this.props.history.dataDetailHistory.paymentType.id;
    const orderStatus = this.props.history.dataDetailHistory.orderStatus;
    const paymentChannelTypeId = this.props.history.dataDetailHistory
      .paymentChannel.paymentChannelTypeId;
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View
          style={[
            GlobalStyle.shadowForBox,
            { paddingVertical: 10, paddingHorizontal: 10 }
          ]}
        >
          <View style={GlobalStyle.cardContainerRadius12}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                paddingTop: 16
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={Fonts.type50}>
                  {paymentChannelTypeId === 2
                    ? 'Transfer ke no. Virtual Account'
                    : 'Kode Pembayaran'}
                </Text>
                {paymentChannelTypeId !== 1 && orderStatus !== 'delivered'
                  ? this.renderTooltip()
                  : false}
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image
                source={{
                  uri: this.props.data.paymentChannel.iconUrl
                }}
                style={{ height: 20, width: 60, marginRight: 10 }}
              />
              <View>
                <Text style={Fonts.type48}>
                  {this.props.data.billing.accountVaNo}
                </Text>
                <Text style={Fonts.type38}>a/n Sinbad Karya Perdagangan</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
              <TouchableOpacity
                onPress={() =>
                  this.sendDataToClipBoard(this.props.data.billing.accountVaNo)
                }
              >
                <Text
                  style={[Fonts.type13, { textDecorationLine: 'underline' }]}
                >
                  Salin No. Rek
                </Text>
              </TouchableOpacity>
              {this.state.showToast === true ? this.renderToast() : null}
            </View>
          </View>
          <View style={GlobalStyle.boxPadding} />
        </View>
      </View>
    );
  }

  renderActivateVA() {
    const params = {
      billingID: this.props.data.billing.id
    };
    this.props.historyActivateVAProcess(params);
  }

  //**RENDER BUTTON AKTIFKAN VA */
  renderButtonAktifkanVA() {
    const loading = this.props.history.loadingHistoryActivateVA;
    const paymentTypeId = this.props.history.dataDetailHistory.paymentType.id;
    const paymentChannelId = this.props.history.dataDetailHistory.paymentChannel
      .paymentChannelTypeId;
    const orderStatus = this.props.history.dataDetailHistory.status;
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View
          style={[
            GlobalStyle.shadowForBox,
            { paddingVertical: 10, paddingHorizontal: 10 }
          ]}
        >
          <View style={GlobalStyle.cardContainerRadius12}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={Fonts.type50}>
                  {paymentChannelId === 2
                    ? 'Transfer ke no. Virtual Account'
                    : 'Kode Pembayaran'}
                </Text>
                {paymentTypeId === 2 && orderStatus !== 'delivered'
                  ? this.renderTooltip()
                  : false}
              </View>
            </View>
            <ButtonSingle
              loading={loading}
              dissabled={loading}
              disabledGreyWhite
              disabled={
                paymentTypeId === 2 && orderStatus !== 'delivered'
                  ? true
                  : false
              }
              title={
                paymentChannelId === 2
                  ? 'AKTIFKAN VIRTUAL ACCOUNT'
                  : 'AKTIFKAN KODE PEMBAYARAN'
              }
              borderRadius={0}
              onPress={() => this.renderActivateVA()}
            />
          </View>
        </View>
        <View style={GlobalStyle.boxPadding} />
      </View>
    );
  }
  /**RENDER PANDUAN PEMBAYARAN ACCORDION */
  renderAccordion(item, index) {
    const isVisible = this.state.accordionOpen === index;
    const rawHtml = isVisible ? (
      <HTMLView value={item.instruction} stylesheet={GlobalStyleHtml} />
    ) : null;

    return (
      <View key={index} style={{ paddingTop: 10, paddingBottom: 10 }}>
        <TouchableWithoutFeedback
          style={styles.boxSubTotal}
          onPress={() => this.openAccordion(index)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'space-between'
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type8}>{item.name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {this.state.accordionOpen === index ? (
                <MaterialIcon
                  name="keyboard-arrow-up"
                  color={masterColor.fontBlack40}
                  size={24}
                />
              ) : (
                <MaterialIcon
                  name="keyboard-arrow-down"
                  color={masterColor.fontBlack40}
                  size={24}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ height: isVisible ? 'auto' : 0 }}>
          <View style={styles.grayContainer}>{rawHtml}</View>
        </View>
        <View style={{ ...GlobalStyle.lines, marginTop: 10 }} />
      </View>
    );
  }
  renderPanduanPembayaranRegular() {
    return (
      <View>
        <HTMLView
          value={this.props.data.paymentChannel.description[0].instruction}
          stylesheet={GlobalStyleHtml}
        />
      </View>
    );
  }
  /** RENDER PANDUAN PEMBAYARAN VA*/
  renderPanduanPembayaranList() {
    const instruction = this.props.data.paymentChannel.description;
    return instruction.map((e, i) => this.renderAccordion(e, i));
  }
  /** RENDER PANDUAN PEMBAYARAN */
  renderPanduanPembayaran() {
    const billingStatus = this.props.history.dataDetailHistory.billing
      .billingStatus;
    const paymentChannelId = this.props.data.paymentChannel.paymentChannelTypeId;
    return (
      <View>
        {billingStatus !== 'paid' &&
        billingStatus !== 'expired' &&
        billingStatus !== 'cancel' ? (
          <View>
            <View style={GlobalStyle.boxPadding} />
            <View style={GlobalStyle.shadowForBox}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingTop: 16,
                  paddingBottom: 8
                }}
              >
                <Text style={Fonts.type48}>Panduan Pembayaran</Text>
              </View>
              <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  paddingTop: 16
                }}
              >
                {paymentChannelId !== 2 ? (
                  <View>{this.renderPanduanPembayaranRegular()}</View>
                ) : (
                  <View>{this.renderPanduanPembayaranList()}</View>
                )}
              </View>
            </View>
            <View style={GlobalStyle.boxPadding} />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }

  /** RENDER WAKTU PEMBAYARAN */
  renderWaktuPembayaran() {
    const expired = this.props.data.billing.expiredPaymentTime;
    const localTime = toLocalTime(expired);
    const expiredTime = moment(localTime);
    const a = this.props.history.dataDetailHistory;
    const paymentTypeId = a.paymentType.id;
    const paymentChannelId = a.paymentChannel.id;
    const expiredPaymentTime = a.billing.expiredPaymentTime;
    const billingStatus = a.billing.billingStatus;
    const accountVaNo = a.billing.accountVaNo;
    // const localTime = moment(expired);
    if (
      this.props.data.statusPayment === 'waiting_for_payment' &&
      moment.utc(new Date()).local() >
        moment.utc(this.props.data.billing.expiredPaymentTime).local()
    ) {
      null;
    } else if (this.props.data.statusPayment !== 'payment_failed') {
      return (
        <View>
          {(paymentTypeId !== 3 ||
            (paymentTypeId === 2 &&
              paymentChannelId === 2 &&
              expiredPaymentTime !== null)) &&
          accountVaNo !== null &&
          billingStatus !== 'paid' &&
          (a.statusPayment === 'waiting_for_payment' ||
            (a.statusPayment === 'overdue' &&
              expiredPaymentTime !== null)) &&
          billingStatus !== 'cancel' ? (
            <View>
              <View style={GlobalStyle.boxPadding} />
              <View style={GlobalStyle.shadowForBox}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 8
                  }}
                >
                  <Text
                    style={[
                      Fonts.type5,
                      { textAlign: 'center', paddingBottom: 8 }
                    ]}
                  >
                    SEGERA LAKUKAN PEMBAYARAN DALAM WAKTU
                  </Text>
                  <View style={styles.headerContainer}>
                    {this.state.expiredTime
                      ? this.renderTimeCountDown()
                      : null}

                    <Text style={styles.unFocusedFont}>
                      {`(Sebelum ${expiredTime.format('LLLL')} WIB)`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={GlobalStyle.boxPadding} />
            </View>
          ) : (
            <View />
          )}
        </View>
      );
    }
  }

  /** RENDER VIRTUAL ACCOUNT */
  renderVirtualAccount() {
    const a = this.props.history.dataDetailHistory;
    const paymentTypeId = a.paymentType.id;
    const paymentChannelId = a.paymentChannel.paymentChannelTypeId;
    const expiredPaymentTime = a.billing.expiredPaymentTime;
    const billingStatus = a.billing.billingStatus;
    const statusPayment = a.statusPayment;
    const accountVaNo = a.billing.accountVaNo;
    const paymentChannelTypeId = a.paymentChannel.paymentChannelTypeId;

    if (
      statusPayment === 'waiting_for_payment' &&
      moment.utc(new Date()).local() >
        moment.utc(this.props.data.billing.expiredPaymentTime).local()
    ) {
      null;
    } else {
      return (
        <View>
          {((paymentTypeId === 1 &&
            paymentChannelTypeId !== 1 &&
            accountVaNo !== null) ||
            (paymentTypeId === 2 &&
              paymentChannelTypeId !== 1 &&
              expiredPaymentTime !== null)) &&
          billingStatus !== 'paid' &&
          // this.props.history.dataDetailHistory.billing.billingStatus !== 'expired' &&
          (statusPayment === 'waiting_for_payment' ||
            statusPayment === 'overdue') &&
          billingStatus !== 'cancel' ? (
            this.renderVirtualAccountNumber()
          ) : // a.paymentType.id === 2 &&
          // accountVaNo === null &&
          paymentChannelTypeId !== 1 &&
            expiredPaymentTime === null &&
            billingStatus !== 'paid' &&
            (statusPayment === 'waiting_for_payment' ||
              statusPayment === 'overdue') &&
            billingStatus !== 'cancel' ? (
            this.renderButtonAktifkanVA()
          ) : (
            <View />
          )}
        </View>
      );
    }
  }

  /** === RENDER TOOLTIP === */
  renderTooltip() {
    const paymentChannelId = this.props.history.dataDetailHistory.paymentChannel
      .paymentChannelTypeId;
    // const paymentChannelId = 3;
    return (
      <Tooltip
        backgroundColor={Color.fontBlack50OP80}
        height={55}
        withOverlay={false}
        withPointer={false}
        onOpen={() => this.setState({ questionMarkShow: false })}
        onClose={() => this.setState({ questionMarkShow: true })}
        containerStyle={{
          padding: 8,
          width: 0.4 * width
        }}
        popover={
          <Text style={Fonts.type87}>
            {paymentChannelId === 2 ? 'Virtual Account ' : 'Kode pembayaran '}
            hanya dapat diaktifkan setelah pesanan diterima
          </Text>
        }
      >
        {this.state.questionMarkShow ? (
          <MaterialIcon name="help" size={17} color={Color.fontBlack40} />
        ) : (
          <View />
        )}
      </Tooltip>
    );
  }

  /** RENDER DETAIL INFORMASI PEMBAYARAN */
  renderPaymentInformationDetail() {
    if (this.props.history.dataDetailHistory !== null) {
      return (
        <HistoryDetailPaymentInformation
          data={this.props.history.dataDetailHistory}
          section={this.props.section}
        />
      );
    }
  }

  /** RENDER CONTENT DETAIL */
  renderContentDetail() {
    if (this.state.section === 'payment') {
      return (
        <View>
          {this.renderPaymentInformationDetail()}
          {this.renderVirtualAccount()}
          {this.renderPanduanPembayaran()}
        </View>
      );
    }
  }

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.section === 'payment' ? this.renderWaktuPembayaran() : null}
        {this.renderInvoice()}
        {/* {this.renderPaymentInformationDetail()} */}
        {this.renderContentDetail()}
        {this.renderToast()}
      </View>
    );
  }
  /**
   * ====================
   * RENDER MODAL
   * ====================
   */

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

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailPayment);
