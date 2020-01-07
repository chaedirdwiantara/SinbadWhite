import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard
} from 'react-native';
import Text from 'react-native-text';
import NavigationService from '../../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import ButtonSingle from '../../../components/button/ButtonSingle';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import masterColor from '../../../config/masterColor';
import ProgressBarType1 from '../../../components/progress_bar/ProgressBarType1';
import OtpInput from '../../../components/otp/OtpInput';
import Fonts from '../../../helpers/GlobalFont';
import GlobalStyles from '../../../helpers/GlobalStyle';

class AddMerchantOTP extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      phoneNumber: navigation.state.params.phoneNumber,
      otp: navigation.state.params.otp,
      errorOTP: false,
      otpInput: []
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
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
    if (this.state.otp !== this.state.otpInput.join('')) {
      this.setState({ errorOTP: true });
    } else {
      NavigationService.navigate('AddMerchant3');
      this.props.saveVolatileDataAddMerchant({
        user: {
          phone: this.state.phoneNumber,
          fullName: '',
          idNo: '',
          taxNo: '',
          email: '',
          password: 'sinbad',
          status: 'inactive',
          roles: [1]
        }
      });
    }
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** OTP INPUT */
  renderOtpInput() {
    return (
      <View
        style={[GlobalStyles.cardContainerRadius12, { marginVertical: 11 }]}
      >
        <View style={styles.boxOtp}>
          <OtpInput
            onRef={ref => (this.fromOTPInput = ref)}
            fromOTPInput={this.otpInput.bind(this)}
            error={this.state.errorOTP}
          />
          {this.renderErrorOTP()}
        </View>
      </View>
    );
  }
  /** HEADER IMAGE */
  renderHeaderImage() {
    return (
      <View style={styles.boxHeaderImage}>
        <Image
          source={require('../../../assets/images/header/otp.png')}
          style={GlobalStyles.image74}
        />
      </View>
    );
  }
  /** HEADER TEXT */
  renderHeaderText() {
    return (
      <View style={styles.boxHeaderText}>
        <Text style={[Fonts.type7, { marginBottom: 13 }]}>
          Masukan kode Verifikasi
        </Text>
        <Text style={Fonts.type8}>
          Kode verifikasi telah dikirimkan melalui
        </Text>
        <Text style={Fonts.type8}>SMS ke {this.state.phoneNumber}</Text>
      </View>
    );
  }
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <ProgressBarType1
        totalStep={5}
        currentStep={2}
        title={'Langkah melengkapi profil'}
      />
    );
  }
  /** ERROR OTP */
  renderErrorOTP() {
    return this.state.errorOTP ? (
      <View style={{ alignItems: 'center', marginTop: 7 }}>
        <Text style={Fonts.type14}>
          Pastikan kode verifikasi yang anda masukan benar
        </Text>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderHeaderImage()}
        {this.renderHeaderText()}
        {this.renderOtpInput()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={this.state.otpInput.filter(x => x !== '').length < 5}
        title={'Verifikasi'}
        borderRadius={4}
        onPress={() => this.checkOtp()}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  boxHeaderText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxHeaderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  boxOtp: {
    paddingVertical: 40
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantOTP);
