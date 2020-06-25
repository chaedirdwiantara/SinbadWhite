import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  InputType4,
  ProgressBarType1
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';

class AddMerchantStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorPhoneNumber: false,
      errorText: '',
      correctFormatPhoneNumber: true
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** COMPONENT DID UPDATE */
  componentDidUpdate(prevPros) {
    /** IF SUCCESS */
    if (
      prevPros.auth.dataCheckPhoneAvailble !==
      this.props.auth.dataCheckPhoneAvailble
    ) {
      if (this.props.auth.dataCheckPhoneAvailble !== null) {
        NavigationService.navigate('AddMerchantStep2');
        this.props.saveVolatileDataAddMerchant({
          phone: this.state.phoneNumber
        });
      }
    }
    /** IF ERROR */
    if (
      prevPros.auth.errorCheckPhoneAvailble !==
      this.props.auth.errorCheckPhoneAvailble
    ) {
      if (this.props.auth.errorCheckPhoneAvailble !== null) {
        this.setState({
          errorPhoneNumber: true,
          correctFormatPhoneNumber: true,
          errorText: this.checkErrorMessage(
            this.props.auth.errorCheckPhoneAvailble
          )
        });
      }
    }
  }
  /** === DID UPDATE FUNCTION === */
  /** === CHECK ERROR MESSAGE === */
  checkErrorMessage(error) {
    if (error.code === 404) {
      return 'No. HP yang anda masukan sudah terdaftar';
    }
    return 'Terjadi kesalahan server, silahkan coba lagi';
  }
  /** === PHONE NUMBER MODIFY === */
  checkPhone() {
    Keyboard.dismiss();
    const reg = /^08[0-9]{8,12}$/;
    const regPhone = /^0[0-9]{7,10}$/;
    let checkFormat = reg.test(this.state.phoneNumber);
    if (!checkFormat) {
      checkFormat = regPhone.test(this.state.phoneNumber);
      if (!checkFormat) {
        this.setState({
          errorPhoneNumber: true,
          errorText: 'Format No. HP yang anda masukkan salah'
        });
      }
    }
    this.setState({
      correctFormatPhoneNumber: checkFormat
    });
    if (checkFormat) {
      this.props.checkPhoneNumberAvailableProcess(this.state.phoneNumber);
    }
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER INPUT PHONE NUMBER === */
  renderInputPhoneNumber() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <InputType4
          title={'Nomor Handphone'}
          error={this.state.errorPhoneNumber}
          errorText={this.state.errorText}
          value={this.state.phoneNumber}
          onChangeText={phoneNumber => {
            const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
            if (cleanNumber === '') {
              this.setState({ errorPhoneNumber: false });
            }
            this.setState({ phoneNumber: cleanNumber });
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
                size={20}
              />
            ) : (
              <View />
            )
          }
          marginBottom={30}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.phoneNumber === '' ||
          this.props.auth.loadingCheckPhoneAvailble
        }
        loading={this.props.auth.loadingCheckPhoneAvailble}
        title={'Lanjutkan'}
        borderRadius={4}
        onPress={() => this.checkPhone()}
      />
    );
  }
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ProgressBarType1
          totalStep={2}
          currentStep={1}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderInputPhoneNumber()}
        </ScrollView>

        {this.renderButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep1);
