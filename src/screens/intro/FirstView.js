import {
  React,
  Component,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Text
} from '../../library/reactPackage'
import {
  connect,
  firebase
} from '../../library/thirdPartyPackage'
import { Fonts } from '../../helpers'
import masterColor from '../../config/masterColor.json';

class FirstView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ===============================
   * FUNCTIONAL
   * ==============================
   */
  componentDidMount() {
    firebase.crashlytics().enableCrashlyticsCollection();
    setTimeout(() => {
      this.props.navigation.navigate(
        this.props.permanent.token !== null ? 'App' : this.checkIFOTPexist()
      );
    }, 1000);
    /** OLD LOGIN DONT REMOVE */
    // setTimeout(() => {
    //   this.props.navigation.navigate(
    //     this.props.permanent.token !== null ? 'App' : 'Auth'
    //   );
    // }, 1000);
  }
  /** CHECK IF OTP ALREADY SEND */
  checkIFOTPexist() {
    if (this.props.permanent.otpAgentSignIn !== null) {
      return 'OtpView';
    }
    return 'Auth';
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
        backgroundColor={masterColor.statusBarWhite}
        barStyle={'dark-content'}
      />
    );
  }
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.boxContent}>
        <Image
          source={require('../../assets/icons/sinbad/sinbad.png')}
          style={styles.boxImage}
        />
        <Text style={[Fonts.type72, { marginTop: 16 }]}>AGENT SINBAD</Text>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderStatusBar()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxImage: {
    height: 100,
    width: 100
  }
});

const mapStateToProps = ({ permanent }) => {
  return { permanent };
};

export default connect(mapStateToProps)(FirstView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
