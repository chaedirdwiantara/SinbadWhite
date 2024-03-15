import {
  React,
  Component,
  View,
  BackHandler,
  ToastAndroid
} from '../library/reactPackage'

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

