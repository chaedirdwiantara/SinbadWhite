import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  AppState
} from '../library/reactPackage';
import masterColor from '../config/masterColor.json';
import Fonts from '../helpers/GlobalFont';
class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiredTime: Math.abs(this.props.expiredTimer),
      appState: AppState.currentState
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.setExpiredTime();
    this.countDownSetInterval();
    this.listenAppState();
  }

  componentWillUnmount() {
    this.removeAppState();
  }

  setExpiredTime() {
    const newDate = new Date();
    const convertDate = new Date(this.props.originalTime);
    const currentDiffTime = (newDate.getTime() - convertDate.getTime()) / 1000;
    this.setState({ expiredTime: Math.abs(currentDiffTime) });
  }

  countDownSetInterval() {
    this.countDownTimer = setInterval(() => {
      this.setState({
        expiredTime: this.state.expiredTime - 1
      });
      if (this.state.expiredTime === 0) {
        clearInterval(this.countDownTimer);
      }
    }, 1000);
  }

  listenAppState() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  removeAppState() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      clearInterval(this.countDownTimer);

      this.setExpiredTime();
      this.countDownSetInterval();
    }
    this.setState({ appState: nextAppState });
  };
  /** === SEND DATA TO PARENT (PdpView) */
  toParentFunction() {
    this.props.parentFunction({
      type: 'countdown',
      status: 'false'
    });
  }

  timeConverter(time) {
    // Time from state will convert to become HH:MM:SS
    const h = Math.abs(
        Math.floor(time / 3600)
          .toString()
          .padStart(2, '0')
      ),
      m = Math.abs(
        Math.floor((time % 3600) / 60)
          .toString()
          .padStart(2, '0')
      ),
      s = Math.abs(
        Math.floor(time % 60)
          .toString()
          .padStart(2, '0')
      );

    return { h, m, s };
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */

  renderCountDown() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {this.props.type === 'big'
          ? this.renderTimeCountDownBig()
          : this.renderTimeCountDownSmallRed()}
      </View>
    );
  }

  renderTimeCountDownSmallRed() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    if (h + m + s === 0) {
      this.toParentFunction();
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{ ...styles.countDownText, ...styles.countDownTextContainer }}
        >
          {h > 9 ? h : `0${h}`}
        </Text>
        <Text style={{ ...styles.countDownText, color: masterColor.fontRed50 }}>
          {' : '}
        </Text>
        <Text
          style={{ ...styles.countDownText, ...styles.countDownTextContainer }}
        >
          {m > 9 ? m : `0${m}`}
        </Text>
        <Text style={{ ...styles.countDownText, color: masterColor.fontRed50 }}>
          {' : '}
        </Text>
        <Text
          style={{ ...styles.countDownText, ...styles.countDownTextContainer }}
        >
          {s > 9 ? s : `0${s}`}
        </Text>
      </View>
    );
  }

  renderTimeCountDownBig() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    return (
      <View style={styles.countDownContainer}>
        <Text style={styles.countDownTextBold}>{h} </Text>
        <Text style={styles.countDownTextRegular}>{'Jam '}</Text>
        <Text style={styles.countDownTextBold}>{m} </Text>
        <Text style={styles.countDownTextRegular}>{'Menit '}</Text>
        <Text style={styles.countDownTextBold}>{s} </Text>
        <Text style={styles.countDownTextRegular}>{'Detik'}</Text>
      </View>
    );
  }

  render() {
    return this.renderCountDown();
  }
}

const styles = StyleSheet.create({
  countDownText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.fontWhite
  },
  countDownTextContainer: {
    backgroundColor: masterColor.fontRed50,
    borderRadius: 2,
    minWidth: 20,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10
  },
  countDownTextBold: {
    color: masterColor.fontBlack50,
    fontFamily: Fonts.MontserratBold,
    fontSize: 18
  },
  countDownTextRegular: {
    color: masterColor.fontBlack50,
    fontFamily: Fonts.MontserratMedium,
    fontSize: 14
  },
  headerCountdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default CountDown;
