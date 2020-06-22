import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarRed,
  BackHandlerCloseApp,
  InputType4
} from '../../library/component';
import { Fonts, GlobalStyle } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

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
        }, 1000);
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
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            styles.boxPhoneNumberAreaCode,
            {
              borderColor: this.state.errorPhoneNumber
                ? Color.fontRed50
                : Color.fontBlack40
            }
          ]}
        >
          <Text style={Fonts.type3}>+62</Text>
        </View>
        <View style={{ flex: 1 }}>
          <InputType4
            error={this.state.errorPhoneNumber}
            errorText={'No. HP yang anda masukan salah'}
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => {
              const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
              this.phoneModify(cleanNumber);
            }}
            placeholder={'Masukan No.Handphone'}
            keyboardType={'numeric'}
            maxLength={13}
            suffix
            suffixContent={
              this.state.errorPhoneNumber ? (
                <MaterialCommunityIcons
                  color={Color.fontRed50}
                  name={'close-circle'}
                  size={18}
                />
              ) : (
                this.renderCheckInputIcon()
              )
            }
            marginBottom={0}
          />
        </View>

        {/* <View
          style={[
            styles.boxPhoneNumberAreaCode,
            {
              borderColor: this.state.errorPhoneNumber
                ? Color.fontRed50
                : Color.fontBlack10
            }
          ]}
        >
          <Text style={Fonts.type3}>+62</Text>
        </View> */}
      </View>

      // <View style={styles.boxPhoneInput}>
      //   <View
      //     style={[
      //       styles.boxPhoneNumberAreaCode,
      //       {
      //         borderColor: this.state.errorPhoneNumber
      //           ? Color.fontRed50
      //           : Color.fontBlack10
      //       }
      //     ]}
      //   >
      //     <Text style={Fonts.type3}>+62</Text>
      //   </View>
      //   <View
      //     style={[
      //       styles.boxPhoneNumber,
      //       {
      //         borderColor: this.state.errorPhoneNumber
      //           ? Color.fontRed50
      //           : Color.fontBlack10
      //       }
      //     ]}
      //   >
      //     <TextInput
      //       selectionColor={Color.mainColor}
      //       placeholder="Masukan No.Handphone"
      //       value={this.state.phoneNumber}
      //       maxLength={13}
      //       keyboardType="numeric"
      //       onChangeText={phoneNumber => this.phoneModify(phoneNumber)}
      //       style={[styles.textInput, Fonts.type3]}
      //     />
      //     <View style={{ justifyContent: 'center', height: '100%' }}>
      //       {this.state.errorPhoneNumber ? (
      //         <MaterialCommunityIcons
      //           color={Color.fontRed50}
      //           name={'close-circle'}
      //           size={24}
      //         />
      //       ) : (
      //         this.renderCheckInputIcon()
      //       )}
      //     </View>
      //   </View>
      // </View>
    );
  }
  /** CHECK ICON INPUT */
  renderCheckInputIcon() {
    return this.state.correctFormatPhoneNumber ? (
      <MaterialCommunityIcons
        color={Color.fontGreen50}
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
    backgroundColor: Color.mainColor,
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
  boxPhoneNumberAreaCode: {
    width: 52,
    marginLeft: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInWithPhoneView);
