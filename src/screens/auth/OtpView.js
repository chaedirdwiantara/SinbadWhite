import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity
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

class OtpView extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      phoneNumber: navigation.state.params.phoneNumber,
      correctFormatPhoneNumber: false,
      otpInput: []
    };
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
    this.setState({ otpInput });
  }
  /** === CHECK OTP === */
  /** === PHONE NUMBER MODIFY === */
  checkOtp() {
    NavigationService.navigate('Home');
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 16 }}>
          <IconsAntDesign
            color={masterColor.backButtonWhite}
            name={'questioncircleo'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === STATUS BAR === */
  renderStatusBar() {
    return (
      <StatusBar
        backgroundColor={masterColor.statusBarDefault}
        barStyle={'light-content'}
      />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={this.state.otpInput.filter(x => x !== '').length < 5}
        title={'Verifikasi'}
        borderRadius={50}
        onPress={() => this.checkOtp()}
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
          <Text style={Fonts.type2}>+62{this.state.phoneNumber}</Text>
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
  /** CONTENT */
  renderContent() {
    return (
      <View style={GlobalStyle.cardContainerRadius12}>
        <View style={styles.boxContent}>
          {this.renderOtpInput()}
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
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView>
        <View>
          {this.renderStatusBar()}
          {this.renderBackground()}
          <View style={styles.mainContainer}>
            {this.renderTitle()}
            {this.renderContent()}
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OtpView);
