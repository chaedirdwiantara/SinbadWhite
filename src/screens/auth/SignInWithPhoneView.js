import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { bindActionCreators } from 'redux';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import IconsMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsAntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-navigation';
import * as ActionCreators from '../../state/actions';
import Fonts from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
import ButtonSingle from '../../components/button/ButtonSingle';
import GlobalStyle from '../../helpers/GlobalStyle';
import NavigationService from '../../navigation/NavigationService';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import BackHandlerCloseApp from '../../components/BackHandlerCloseApp';

const { width, height } = Dimensions.get('window');

class SignInWithPhoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorPhoneNumber: false,
      correctFormatPhoneNumber: false
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  /** COMPONENT DID UPDATE */
  componentDidUpdate(prevProps) {
    /** CHECK IF SUCCESS */
    if (prevProps.auth.dataGetOTP !== this.props.auth.dataGetOTP) {
      if (this.props.auth.dataGetOTP !== null) {
        NavigationService.navigate('OtpView', {
          phoneNumber: this.state.phoneNumber
        });
        setTimeout(() => {
          this.setState({ phoneNumber: '', correctFormatPhoneNumber: false });
        }, 100);
      }
    }
    /** CHECK IF ERROR */
    if (prevProps.auth.errorGetOTP !== this.props.auth.errorGetOTP) {
      if (this.props.auth.errorGetOTP !== null) {
        this.setState({
          errorPhoneNumber: true,
          correctFormatPhoneNumber: false
        });
      }
    }
  }
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
          !this.state.correctFormatPhoneNumber || this.props.auth.loadingGetOTP
        }
        title={'Lanjutkan'}
        borderRadius={50}
        onPress={() => this.checkPhoneExist()}
        loading={this.props.auth.loadingGetOTP}
      />
    );
  }
  /** === RENDER CONTENT === */
  /** TITLE */
  renderTitle() {
    return (
      <View>
        <View>
          <Text style={Fonts.type1}>LOGIN</Text>
        </View>
        <View
          style={{ paddingRight: '30%', paddingBottom: 20, paddingTop: 10 }}
        >
          <Text style={Fonts.type2}>
            Silahkan masuk dengan nomor HP-mu yang terdaftar
          </Text>
        </View>
      </View>
    );
  }
  /** CONTENT */
  renderContentPhoneNumberInput() {
    return (
      <View style={styles.boxPhoneInput}>
        <View
          style={[
            styles.boxPhoneNumberAreaCode,
            {
              borderColor: this.state.errorPhoneNumber
                ? masterColor.fontRed50
                : masterColor.fontBlack10
            }
          ]}
        >
          <Text style={Fonts.type3}>+62</Text>
        </View>
        <View
          style={[
            styles.boxPhoneNumber,
            {
              borderColor: this.state.errorPhoneNumber
                ? masterColor.fontRed50
                : masterColor.fontBlack10
            }
          ]}
        >
          <TextInput
            selectionColor={masterColor.mainColor}
            placeholder="Masukan No.Handphone"
            value={this.state.phoneNumber}
            maxLength={13}
            keyboardType="numeric"
            onChangeText={phoneNumber => this.phoneModify(phoneNumber)}
            style={[styles.textInput, Fonts.type3]}
          />
          <View style={{ justifyContent: 'center', height: '100%' }}>
            {this.state.errorPhoneNumber ? (
              <IconsMaterial
                color={masterColor.fontRed50}
                name={'close-circle'}
                size={24}
              />
            ) : (
              this.renderCheckInputIcon()
            )}
          </View>
        </View>
      </View>
    );
  }
  /** CHECK ICON INPUT */
  renderCheckInputIcon() {
    return this.state.correctFormatPhoneNumber ? (
      <IconsMaterial
        color={masterColor.fontGreen50}
        name={'check-circle'}
        size={24}
      />
    ) : (
      <View />
    );
  }
  /** ERROR LOGIN */
  renderErrorSignIn() {
    return this.state.errorPhoneNumber ? (
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={Fonts.type13}>No. HP yang anda masukan salah</Text>
      </View>
    ) : (
      <View />
    );
  }
  /** MAIN CONTENT */
  renderContent() {
    return (
      <View style={GlobalStyle.cardContainerRadius12}>
        <View style={styles.boxContent}>
          {this.renderContentPhoneNumberInput()}
          {this.renderErrorSignIn()}
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
        <BackHandlerCloseApp navigation={this.props.navigation} />
        <StatusBarRed />
        <View>
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
    paddingTop: 42,
    paddingBottom: 26
  },
  boxPhoneInput: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 46,
    marginBottom: 15
  },
  boxPhoneNumberAreaCode: {
    width: 52,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  boxPhoneNumber: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    marginLeft: 12,
    borderRadius: 8,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  /** for textInput */
  textInput: {
    flex: 1
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInWithPhoneView);
