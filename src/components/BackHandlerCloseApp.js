import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, Keyboard } from 'react-native';

class BackHandlerCloseApp extends Component {
  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );
    this.state = {
      backPressCount: 0
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  componentDidMount() {
    /** === FOR H/W BACK LISTENER === */
    this.willBlur = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }
  /** === UNMOUNT ALL LISTENER === */
  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  /** === HARDWARE BACK BUTTON === */
  handleBackPress = () => {
    const count = this.state.backPressCount;
    this.setState({ backPressCount: count + 1 });
    if (count > 0) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Tekan sekali lagi untuk keluar',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        200
      );
    }
    setTimeout(() => {
      this.setState({ backPressCount: 0 });
    }, 3000);

    return true;
  };
  /** === CHECK PHONE NUMBER EXIST OR NOT */
  checkPhoneExist() {
    Keyboard.dismiss();
    this.setState({ errorPhoneNumber: false });
    this.props.otpGetProcess('0' + this.state.phoneNumber);
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
      correctFormatPhoneNumber: checkFormat,
      errorPhoneNumber: false
    });
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === MAIN === */
  render() {
    return <View />;
  }
}

export default BackHandlerCloseApp;
