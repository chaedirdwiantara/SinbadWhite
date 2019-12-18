import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-navigation';
import * as ActionCreators from '../../state/actions';
import Fonts from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
import ButtonSingle from '../../components/button/ButtonSingle';
import GlobalStyle from '../../helpers/GlobalStyle';
import OtpInput from '../../components/otp/OtpInput';

const { width, height } = Dimensions.get('window');

class OtpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      correctFormatPhoneNumber: false
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  componentDidMount() {
    console.log('Home');
  }

  test() {
    console.log('lala');
  }
  /** === PHONE NUMBER MODIFY === */
  phoneModify(phoneNumber) {
    let phone = phoneNumber.split('');
    if (phone[0] === '0') {
      phone.splice(0, 1);
    }
    const reg = /^8[0-9]{8,12}$/;
    const checkFormat = reg.test(phone.join(''));
    this.setState({
      phoneNumber: phone.join(''),
      correctFormatPhoneNumber: checkFormat
    });
  }
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
        disabled={!this.state.correctFormatPhoneNumber}
        title={'Verifikasi'}
        borderRadius={50}
        onPress={() => this.test()}
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
          <Text style={Fonts.type2}>+6281322918441</Text>
        </View>
      </View>
    );
  }
  /** OTP INPUT */
  renderOtpInput() {
    return (
      <View style={styles.boxOtp}>
        <OtpInput />
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
