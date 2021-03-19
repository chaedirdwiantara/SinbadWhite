import {
  React,
  View,
  Component,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Keyboard,
  StatusBar
} from '../../library/reactPackage';
import {
  MaterialIcon,
  Modal,
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  OtpInput,
  StatusBarBlackOP40
} from '../../library/component';
import masterColor from '../../config/masterColor.json';
import { Fonts, GlobalStyle } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ModalUserDifferentNumber from './ModalUserDifferentNumber';
import ModalOmsErrorOtpKur from './ModalOmsErrorOtpKur';
import ModalBottomFailPayment from '../../components/error/ModalBottomFailPayment';

const { width, height } = Dimensions.get('window');
class OmsOtpKurView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorOTP: false,
      verifyPush: false,
      otpInput: [],
      otpErrorText: '',
      loading: false,
      resend: false,
      getOtp: 0,
      timer: '90',
      counter: null,
      openModalUserDifferentNumber: false,
      openModalErrorOtp: false,
      openModalErrorGlobal: false,
      maxOtp: false,
      type: null
    };
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (this.props.oms.dataOmsGetKurOtp) {
      if (prevProps.oms.dataOmsGetKurOtp !== this.props.oms.dataOmsGetKurOtp) {
          this.resend()
      }
    }
    if (this.props.oms.errorOmsGetKurOtp !== undefined) {
      if (
        prevProps.oms.errorOmsGetKurOtp !== this.props.oms.errorOmsGetKurOtp
      ) {
        if (
          this.props.oms.errorOmsGetKurOtp &&
          this.props.oms.errorOmsGetKurOtp.data.retry === false
        ){
          this.setState({
            openModalErrorOtp: true,
            resend: false
          });}
          if(this.props.oms.errorOmsGetKurOtp && this.props.oms.errorOmsGetKurOtp.data.delayInSec){
            this.setState({
              openModalErrorGlobal: true,
              type:'delay',
              timer: this.props.oms.errorOmsGetKurOtp.data.delayInSec
            })
            this.resend()
          }
      }
    }
    if (
        prevProps.oms.errorOmsConfirmOrder !== this.props.oms.errorOmsConfirmOrder
      ) {
        if (this.props.oms.errorOmsConfirmOrder !== null) {
          if (
            this.props.oms.errorOmsConfirmOrder.data &&  this.props.oms.errorOmsConfirmOrder.code === 400
          ) {
            this.handleErrorConfirmOrder();
          } 
        }
      }
      if (
        prevProps.oms.dataOmsConfirmOrder !== this.props.oms.dataOmsConfirmOrder
      ) {
        if (this.props.oms.dataOmsConfirmOrder !== null) {
         this.setState({
           verifyPush: true
         })
        }
      }
      
  }
  /** DID MOUNT */
  componentDidMount() {
    this.getOtp();
  }

  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */

  /** === GET OTP  */
  getOtp() {
    console.log(this.props.merchant.selectedMerchant.storeCode, 'store code');
    const storeCode = 'SNB-STORE-202';
    this.props.OmsGetKurOtpProcess(storeCode);
  }
  /** === SAVE OTP FROM OTP INPUT TO STATE */
  otpInput(data) {
    const otpInput = this.state.otpInput;
    otpInput[data.digit] = data.data;
    this.setState({ otpInput, errorOTP: false, verifyPush: false });
  }

  /** === CONFIRM ORDER === */
  confirmOrder() {
    const { params } = this.props.navigation.state;
    const storeId = params.storeId;
    const orderId = params.orderId;
    const parcels = params.parcels;
    const otp = this.state.otpInput.join('');
    this.props.omsConfirmOrderProcess({
      orderId,
      storeId,
      parcels,
      otp
    });
  }
  //RESEND
  resend() {
    this.setState({ resend: true, openModalErrorOtp: false });
    const countdown = this.props.oms.errorOmsGetKurOtp
    let countNumber = countdown ? countdown.data.delayInSec : this.state.timer;
    const counter = setInterval(() => {
      countNumber--;
      this.setState({ timer: countNumber.toString() });
      if (countNumber === 0) {
        this.setState({ resend: false, timer: '90' });
        clearInterval(this.state.counter);
      }
    }, 1000);
    this.setState({ counter });
  }
  /** === HANDLE ERROR CONFIRM ORDER === */
  handleErrorConfirmOrder() {
    switch (this.props.oms.errorOmsConfirmOrder.data.errorCode) {
      case 'ERR_APP_KUR_ACC_OTP_ERROR':
        this.setState({
          errorOTP: true,
          otpErrorText:
            'Pastikan nomor atau kode verifikasi yang anda masukan benar',
            verifyPush: true
        });
        break;
      case 'ERR_APP_KUR_ACC_OTP_EXPIRED':
        this.setState({
          openModalErrorGlobal: true,
        })
      default:
        this.setState({
          openModalErrorGlobal: true,
        })
        break;
    }
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */

  renderContent() {
    return (
      <View style={{ flex: 1, backgroundColor: masterColor.backgroundWhite }}>
        {this.renderTitle()}
        {this.renderBoxOTP()}
        {this.renderButton()}
        {this.renderResend()}
      </View>
    );
  }

  /** TITLE */
  renderTitle() {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16 }}>
        <Image
          source={require('../../assets/images/sinbad_image/otp.png')}
          style={GlobalStyle.image77}
        />
        <View style={{ paddingTop: 20 }}>
          <Text style={[Fonts.type78, { textAlign: 'center' }]}>
            Masukan kode Verifikasi
          </Text>
          <Text style={[Fonts.type8, { textAlign: 'center', marginTop: 10 }]}>
            Kode verifikasi telah dikirimkan melalui
          </Text>
          <Text style={[Fonts.type8, { textAlign: 'center' }]}>SMS ke 0813-913-483xx</Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({ openModalUserDifferentNumber: true })
            }
          >
            <Text
              style={[
                Fonts.type108p,
                { textAlign: 'center', marginVertical: 8, marginBottom: 8 }
              ]}
            >
              Bukan Nomor Anda?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /** RENDER BOX OTP */
  renderBoxOTP() {
    return (
      <View>
        <View style={[styles.mainBoxOTP, GlobalStyle.shadowForBox]}>
          {this.state.verifyPush ? this.renderIconNotification() : <View />}
          {this.renderOtpInput()}
        </View>
        <View style={{ flex: 1 }}>{this.renderErrorOTP()}</View>
      </View>
    );
  }

  /** OTP INPUT */
  renderOtpInput() {
    return (
      <OtpInput
        onRef={ref => (this.fromOTPInput = ref)}
        fromOTPInput={this.otpInput.bind(this)}
      />
    );
  }

  /** ERROR OTP */
  renderErrorOTP() {
    return this.state.errorOTP ? (
      <View>
        <Text style={[Fonts.type22, { marginHorizontal: 16 }]}>
          {this.state.otpErrorText}
        </Text>
      </View>
    ) : (
      <View />
    );
  }

  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.otpInput.filter(x => x !== '').length < 5 ||
          this.state.loading
        }
        title={'Verifikasi'}
        borderRadius={4}
        onPress={() => this.confirmOrder()}
      />
    );
  }

  //RENDER RESEND OTP
  renderResend() {
    return (
      <View style={{ marginHorizontal: 16 }}>
        {this.state.resend === false ? (
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={[Fonts.type8, { textAlign: 'center' }]}>
              Tidak menerima Kode ?{' '}
            </Text>
            <TouchableOpacity onPress={() => this.getOtp()}>
              <Text style={Fonts.type108p}>Kirim Ulang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text
              style={[
                Fonts.type8,
                { textAlign: 'center', marginHorizontal: 50 }
              ]}
            >
              Mohon tunggu dalam{' '}
              <Text style={Fonts.type16}>{this.state.timer} detik</Text> untuk
              kirim ulang
            </Text>
          </View>
        )}
      </View>
    );
  }

  /** RENDER ICON NOTIFICATION */
  renderIconNotification() {
    return (
      <View style={{ position: 'absolute', top: -18 }}>
        {this.state.errorOTP ? (
          <MaterialIcon
            name="cancel"
            size={34}
            color={masterColor.mainColor}
            style={{
              marginBottom: 8,
              marginLeft: 8,
              alignContent: 'flex-start'
            }}
          />
        ) : (
          <MaterialIcon
            name="check-circle"
            size={34}
            color={masterColor.fontGreen50}
            style={{
              marginBottom: 8,
              marginLeft: 8,
              alignContent: 'flex-start'
            }}
          />
        )}
      </View>
    );
  }

  /** RENDER ICON NOTIFICATION */
  renderIconNotification() {
    return (
      <View style={{ position: 'absolute', top: -18 }}>
        {this.state.errorOTP ? (
          <MaterialIcon
            name="cancel"
            size={34}
            color={masterColor.mainColor}
            style={{
              marginBottom: 8,
              marginLeft: 8,
              alignContent: 'flex-start'
            }}
          />
        ) : (
          <MaterialIcon
            name="check-circle"
            size={34}
            color={masterColor.fontGreen50}
            style={{
              marginBottom: 8,
              marginLeft: 8,
              alignContent: 'flex-start'
            }}
          />
        )}
      </View>
    );
          }

  /**
   * ==============================
   * MODAL
   * ==============================
   */

  /** === RENDER MODAL USER DIFFERENT NUMBER === */
  renderModalUserDifferentNumber() {
    return this.state.openModalUserDifferentNumber ? (
      <ModalUserDifferentNumber
        open={this.state.openModalUserDifferentNumber}
        close={() =>
          this.setState({
            openModalUserDifferentNumber: false
          })
        }
      />
    ) : (
      <View />
    );
  }

  //MODAL BOTTOM NOT MY NUMBER
  renderModalBottomErrorOtpKur() {
    return (
      <View>
        {this.state.openModalErrorOtp ? (
          <ModalOmsErrorOtpKur
            open={this.state.openModalErrorOtp}
            close={() => this.setState({ openModalErrorOtp: false })}
            onPress={
              (() =>
                this.setState({
                  openModalErrorOtp: false
                }),
              NavigationService.goBack(this.props.navigation.state.key))
            }
          />
        ) : null}
      </View>
    );
  }

   /** MODAL ERROR PAYMENT GLOBAL */
   renderModalErrorGlobal() {
    return this.state.openModalErrorGlobal ? (
      <View>
        <ModalBottomFailPayment
          open={this.state.openModalErrorGlobal}
          onPress={() => this.setState({ openModalErrorGlobal: false })}
          text={this.state.type === 'delay'? this.props.oms.errorOmsGetKurOtp.data.message : this.props.oms.errorOmsConfirmOrder.message}
        />
      </View>
    ) : (
      <View />
    );
  }


  /** === MAIN === */
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBarWhite />
        <ScrollView
          style={{ flex: 1, backgroundColor: masterColor.backgroundWhite }}
        >
          {this.renderContent()}
        </ScrollView>
        {this.renderModalUserDifferentNumber()}
        {this.renderModalBottomErrorOtpKur()}
        {this.renderModalErrorGlobal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.8 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 20
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  },
  headerContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  mainBoxOTP: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
});

const mapStateToProps = ({ oms, merchant, user, permanent }) => {
  return { oms, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OmsOtpKurView);
