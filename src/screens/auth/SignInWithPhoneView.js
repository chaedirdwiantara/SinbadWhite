import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Keyboard,
  Text,
  Linking,
  BackHandler
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons,
  DeviceInfo
} from '../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarRed,
  BackHandlerCloseApp,
  InputType4,
  ModalConfirmationType2
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
      correctFormatPhoneNumber: false,
      openModalForceUpdateApp: false
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  componentDidMount() {
    this.props.appVersion(0);
    /** THIS FOR MAINTENANCE PAGE */
    if (this.props.permanent.appMaintenance) {
      NavigationService.navigate('MaintenanceView');
    }
  }
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
    if (
      prevProps.permanent.appVersionCode !== this.props.permanent.appVersionCode
    ) {
      if (this.props.permanent.appVersionCode > DeviceInfo.getBuildNumber()) {
        this.setState({ openModalForceUpdateApp: true });
      } else if (
        this.props.permanent.appVersionCode <= DeviceInfo.getBuildNumber()
      ) {
        this.setState({ openModalForceUpdateApp: false });
      }
    }
  }
  /** === CHECK PHONE NUMBER EXIST OR NOT */
  checkPhoneExist() {
    Keyboard.dismiss();
    this.setState({ errorPhoneNumber: false });
    this.props.otpGetProcess(this.state.phoneNumber);
  }
  /** === PHONE NUMBER CHECK === */
  checkPhoneFormat(phoneNumber) {
    const reg = /^08[0-9]{8,12}$/;
    const checkFormat = reg.test(phoneNumber);
    this.setState({
      phoneNumber,
      correctFormatPhoneNumber: checkFormat,
      errorPhoneNumber: false
    });
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER BACKGROUND === */
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
  /** === RENDER TITLE === */
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
  /** === RENDER PHONE NUMBER INPUT === */
  renderContentPhoneNumberInput() {
    return (
      <InputType4
        accessible={true}
        accessibilityLabel={'txtInputNomorHp'}
        title={'Nomor Handphone'}
        error={this.state.errorPhoneNumber}
        errorText={'No. HP yang anda masukan salah'}
        value={this.state.phoneNumber}
        onChangeText={phoneNumber => {
          const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
          this.checkPhoneFormat(cleanNumber);
        }}
        placeholder={'Masukan nomor handphone anda'}
        keyboardType={'numeric'}
        maxLength={13}
        suffix
        suffixForPush
        suffixPush={() =>
          this.setState({
            phoneNumber: '',
            errorPhoneNumber: false,
            correctFormatPhoneNumber: false
          })
        }
        suffixContent={
          this.state.phoneNumber !== '' ? (
            <MaterialCommunityIcons
              color={Color.fontBlack60}
              name={'close-circle'}
              size={18}
            />
          ) : (
            <View />
          )
        }
        marginBottom={30}
      />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        accessible={true}
        accessibilityLabel={'btnLoginLanjutkan'}
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
  renderContent() {
    return (
      <View style={GlobalStyle.cardContainerRadius12}>
        <View style={styles.boxContent}>
          {this.renderContentPhoneNumberInput()}
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /**
   * =====================
   * MODAL
   * =====================
   */
  /** RENDER MODAL FORCE UPDATE */
  renderModalForceUpdate() {
    return this.state.openModalForceUpdateApp ? (
      <ModalConfirmationType2
        title={'Update Aplikasi'}
        okText={'Update'}
        open={this.state.openModalForceUpdateApp}
        content={
          'Update aplikasi sekarang dan nikmati performa yang lebih stabil.'
        }
        type={'okeRed'}
        ok={() => {
          BackHandler.exitApp();
          Linking.openURL('market://details?id=com.sinbad.agent');
        }}
      />
    ) : (
      <View />
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
        {/* modal */}
        {this.renderModalForceUpdate()}
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
  }
});

const mapStateToProps = ({ auth, permanent }) => {
  return { auth, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInWithPhoneView);
