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
    connect,
  } from '../../library/thirdPartyPackage';
  import { ButtonSingle, StatusBarWhite, OtpInput, StatusBarBlackOP40 } from '../../library/component';
import masterColor from '../../config/masterColor.json';
import { Fonts, GlobalStyle} from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ModalUserDifferentNumber from './ModalUserDifferentNumber';
// import ModalBottomErrorOtpKur from './ModalBottomErrorOtpKur'

const { width, height } = Dimensions.get('window');
class ModalOmsOTPKur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorOTP: false,
      verifyPush: false,
      otpInput: [],
      otpErrorText: '',
      loading: false,
      resend: false,
      timer: '90',
      counter: null,
      openModalUserDifferentNumber: false,
      openModalErrorOtp: false,
      maxOtp: false
    }
  }

  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  /** === SAVE OTP FROM OTP INPUT TO STATE */
  otpInput(data) {
    const otpInput = this.state.otpInput;
    otpInput[data.digit] = data.data;
    this.setState({ otpInput, errorOTP: false, verifyPush: false });
  }

  /** === CHECK OTP === */
  checkOtp() {
    this.setState({ loading: true });
    Keyboard.dismiss();
    this.setState({ errorOTP: false, verifyPush: true });
    if ('11111' !== this.state.otpInput.join('')) {
      this.setState({
        errorOTP: true,
        otpErrorText: 'Pastikan nomor atau kode verifikasi yang anda masukan benar'
      });
    } else {
      this.goTo();
    }
  }
  /** === GO TO === */
  goTo() {
    alert("success")
  }

  //RESEND
  resend() {
    this.setState({ resend: true, openModalErrorOtp: true });
    let countNumber = 90;
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

  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */

  renderHeader() {
    return(
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody]}>
            <TouchableOpacity onPress={() => this.props.close()}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', flex: 1, alignSelf:"center", marginLeft: -50 }}>
            <Text style={Fonts.type55}>Verifikasi KUR KlikAcc</Text>
          </View>
        </View>
      </View>
    )
  }

  renderContent() {
    return (
      <View style={{flex: 1, backgroundColor: masterColor.backgroundWhite}}>
        {this.renderTitle()} 
        {this.renderBoxOTP()}
        {this.renderButton()}
        {this.renderResend()}
      </View>
    )
  }

  /** TITLE */
  renderTitle() {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
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
          <Text style={[Fonts.type8, { textAlign: 'center' }]}>
            SMS ke{' '}
            
            xxx
          </Text>
          <TouchableOpacity onPress={() => this.setState({openModalUserDifferentNumber: true})}>
            <Text style={[Fonts.type108p, {textAlign: "center", marginVertical: 8, marginBottom: 8}]}>
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
      <View style={{flex: 1}}>
        {this.renderErrorOTP()}
      </View>
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
        <Text style={[Fonts.type22, {marginHorizontal: 16}]}>{this.state.otpErrorText}</Text>
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
          // this.props.auth.loadingSignInWithPhone ||
          this.state.loading
        }
        title={'Verifikasi'}
        borderRadius={4}
        onPress={() => this.checkOtp()}
        // loading={this.props.auth.loadingSignInWithPhone || this.state.loading}
      />
    );
  }

  //RENDER RESEND OTP
  renderResend() {
    return (
      <View style={{marginHorizontal: 16}}>
        {
          this.state.resend === false ? (
            <View style={{flexDirection:"row", alignSelf:"center"}}>
              <Text style={[Fonts.type8, {textAlign:"center"}]}>Tidak menerima Kode ? </Text>
              <TouchableOpacity onPress={() => this.resend()}>
                <Text style={Fonts.type108p}>Kirim Ulang</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection:"row", alignSelf:"center"}}>
              <Text style={[Fonts.type8, {textAlign:"center", marginHorizontal: 50}]}>
                Mohon tunggu dalam <Text style={Fonts.type16}>{this.state.timer} detik</Text> untuk kirim ulang
              </Text>
            </View>
          )
        }
        
      </View>
    )
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
    return(
    <View>
      {this.state.openModalErrorOtp ? (
          <ModalBottomErrorOtpKur
          open={this.state.openModalErrorOtp}
          close={()=> this.setState({openModalErrorOtp: false})}
          navigate={this.props.close}
        />)
        : null
        }
    </View>
    )
  }


/** === MAIN === */
  render() {  
    return(
      <View style={{flex:1}}>
        <StatusBarWhite />
        <Modal
          style={{flex: 1}}
          isVisible={this.props.open}
          coverScreen={true}
          useNativeDriver={true}
          style={styles.mainContainer}
          onPress={this.props.close}
          onRequestClose={() => this.renderBack()}
        >
          {this.renderHeader()}
          <ScrollView style={{flex: 1, backgroundColor: masterColor.backgroundWhite}}>
            {this.renderContent()}
          </ScrollView>
        </Modal>
        {this.renderModalUserDifferentNumber()}
        {/* {this.renderModalBottomErrorOtpKur()} */}
      </View>
    )
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
  },
});

const mapStateToProps = ({ oms, merchant, user, permanent }) => {
  return { oms, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOmsOTPKur);