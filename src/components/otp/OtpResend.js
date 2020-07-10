import {
  React,
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  connect,
  bindActionCreators
} from '../../library/thirdPartyPackage'
import { Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';

class OtpResend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resend: false,
      timer: '90',
      counter: null
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  resend() {
    this.setState({ resend: true });
    switch (this.props.from) {
      case 'login':
        this.props.otpGetProcess(this.props.phoneNumber);
        break;
      case 'addMerchant':
        this.props.checkPhoneNumberAvailableProcess(this.props.phoneNumber);
        break;
      default:
        break;
    }

    let countNumber = 90;
    const counter = setInterval(() => {
      countNumber--;
      this.setState({ timer: countNumber.toString() });
      if (countNumber === 0) {
        this.setState({ resend: false, timer: '90' });
        clearInterval(this.state.counter);
      }
    }, 1000);
    this.setState({ counter });
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.resend ? (
          <View style={styles.contentContainer}>
            <Text style={{ textAlign: 'center' }}>
              <Text style={Fonts.type23}>Mohon tunggu dalam </Text>
              <Text style={Fonts.type21}>{this.state.timer}</Text>
              <Text style={Fonts.type23}> detik untuk kirim ulang</Text>
            </Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View>
              <Text style={Fonts.type23}>Tidak mendapatkan kode ? </Text>
            </View>
            <TouchableOpacity onPress={() => this.resend()}>
              <Text style={Fonts.type21}>Klik disini</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flexDirection: 'row'
  }
});

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OtpResend);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
