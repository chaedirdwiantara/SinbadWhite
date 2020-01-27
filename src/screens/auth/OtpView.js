import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { bindActionCreators } from 'redux';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import IconsAntDesign from 'react-native-vector-icons/AntDesign';
import * as ActionCreators from '../../state/actions';
import Fonts from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
import ButtonSingle from '../../components/button/ButtonSingle';
import GlobalStyle from '../../helpers/GlobalStyle';
import OtpInput from '../../components/otp/OtpInput';
import NavigationService from '../../navigation/NavigationService';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import OtpResend from '../../components/otp/OtpResend';

class OtpView extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      // phoneNumber: navigation.state.params.phoneNumber,
      errorOTP: false,
      otpInput: [],
      otpErrorText: 'Pastikan kode verifikasi yang anda masukan benar'
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
        NavigationService.navigate('Home');
      }
    }
    /** IF ERROR OTP */
    if (prevProps.auth.errorSignIn !== this.props.auth.errorSignIn) {
      if (this.props.auth.errorSignIn !== null) {
        this.setState({
          errorOTP: true,
          otpErrorText: 'Kode verifikasi Anda telah expired'
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
    /** OLD LOGIN (DONT REMOVE */
    // if (this.props.auth.dataGetOTP !== this.state.otpInput.join('')) {
    //   this.setState({ errorOTP: true });
    // } else {
    //   this.props.signInProcess({
    //     mobilePhoneNo: '0' + this.state.phoneNumber,
    //     otpCode: this.state.otpInput.join('')
    //   });
    // }
    if (this.props.permanent.otpAgentSignIn !== this.state.otpInput.join('')) {
      this.setState({ errorOTP: true });
    } else {
      this.props.signInProcess({
        mobilePhoneNo: '0' + this.props.permanent.phoneNumberAgentSignIn,
        otpCode: this.state.otpInput.join('')
      });
    }
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerRight: () => (
  //       <TouchableOpacity style={{ marginRight: 16 }}>
  //         <IconsAntDesign
  //           color={masterColor.backButtonWhite}
  //           name={'questioncircleo'}
  //           size={24}
  //         />
  //       </TouchableOpacity>
  //     )
  //   };
  // };
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
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
          {/* <Text style={Fonts.type2}>+62{this.state.phoneNumber}</Text> */}
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
        <Text style={Fonts.type14}>
          Pastikan kode verifikasi yang anda masukan benar
        </Text>
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
      // <OtpResend phoneNumber={'0' + this.state.phoneNumber} from={'login'} />
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
    backgroundColor: masterColor.mainColor,
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
export default connect(mapStateToProps, mapDispatchToProps)(OtpView);
