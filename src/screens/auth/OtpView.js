import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Keyboard,
  Text
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import {
  ButtonSingle,
  OtpInput,
  OtpResend,
  StatusBarRed
} from '../../library/component';
import { Fonts, GlobalStyle } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

class OtpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorOTP: false,
      otpInput: [],
      otpErrorText: ''
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  /** === COMPONENT DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** IF SUCCESS OTP */
    if (prevProps.auth.dataSignIn !== this.props.auth.dataSignIn) {
      if (this.props.auth.dataSignIn !== null) {
        NavigationService.navigate('HomeView');
      }
    }
    /** IF ERROR OTP */
    if (prevProps.auth.errorSignIn !== this.props.auth.errorSignIn) {
      if (this.props.auth.errorSignIn !== null) {
        this.setState({
          errorOTP: true,
          otpErrorText:
            'Kode verifikasi yang Anda masukkan salah atau kadaluarsa'
        });
      }
    }
  }
  /** === SAVE OTP FROM OTP INPUT TO STATE */
  otpInput(data) {
    const otpInput = this.state.otpInput;
    otpInput[data.digit] = data.data;
    this.setState({ otpInput, errorOTP: false });
  }
  /** === CHECK OTP === */
  checkOtp() {
    Keyboard.dismiss();
    this.setState({ errorOTP: false });
    this.props.signInProcess({
      mobilePhoneNo: '0' + this.props.permanent.phoneNumberAgentSignIn,
      otpCode: this.state.otpInput.join('')
    });
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        accessible={true}
        accessibilityLabel={'btnOtpVerifikasi'}
        disabled={
          this.state.otpInput.filter(x => x !== '').length < 5 ||
          this.props.auth.loadingSignIn
        }
        title={'Verifikasi'}
        borderRadius={50}
        onPress={() => this.checkOtp()}
        loading={this.props.auth.loadingSignIn}
      />
    );
  }
  /** === RENDER CONTENT === */
  /** TITLE */
  renderTitle() {
    return (
      <View>
        <View>
          <Text style={Fonts.type1}>OTP</Text>
        </View>
        <View
          style={{ paddingRight: '30%', paddingBottom: 20, paddingTop: 10 }}
        >
          <Text style={Fonts.type2}>Kami telah mengirimi Anda SMS di</Text>
          <Text style={Fonts.type2}>
            +62{this.props.permanent.phoneNumberAgentSignIn}
          </Text>
        </View>
      </View>
    );
  }
  /** OTP INPUT */
  renderOtpInput() {
    return (
      <View style={styles.boxOtp}>
        <OtpInput
          accessible={true}
          accessibilityLabel={'txtOtpInputOtp'}
          onRef={ref => (this.fromOTPInput = ref)}
          fromOTPInput={this.otpInput.bind(this)}
        />
      </View>
    );
  }
  /** ERROR OTP */
  renderErrorOTP() {
    return this.state.errorOTP ? (
      <View style={{ alignItems: 'center' }}>
        <Text style={Fonts.type14}>{this.state.otpErrorText}</Text>
      </View>
    ) : (
      <View />
    );
  }
  /** CONTENT */
  renderContent() {
    return (
      <View style={GlobalStyle.cardContainerRadius12}>
        <View style={styles.boxContent}>
          {this.renderOtpInput()}
          {this.renderErrorOTP()}
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return (
      <View>
        <View style={styles.backgroundLogin} />
        <Image
          source={require('../../assets/images/background/login_backgroud.png')}
          style={styles.imageBackground}
        />
        <View style={{ height: 100 }} />
      </View>
    );
  }
  /** RENDER RESEND */
  renderResend() {
    return (
      <OtpResend
        phoneNumber={'0' + this.props.permanent.phoneNumberAgentSignIn}
        from={'login'}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarRed />
        <View>
          {this.renderBackground()}
          <View style={styles.mainContainer}>
            {this.renderTitle()}
            {this.renderContent()}
            {this.renderResend()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 16,
    position: 'absolute',
    zIndex: 1000
  },
  boxOtp: {
    paddingBottom: 14
  },
  backgroundLogin: {
    backgroundColor: Color.mainColor,
    height: 210
  },
  imageBackground: {
    resizeMode: 'stretch',
    height: 40,
    width: '100%'
  },
  boxContent: {
    paddingTop: 30,
    paddingBottom: 5
  }
});

const mapStateToProps = ({ auth, permanent }) => {
  return { auth, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpView);
