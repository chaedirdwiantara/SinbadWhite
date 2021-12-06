import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  AppState
} from '../library/reactPackage';
import masterColor from '../config/masterColor.json';

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
      type: 'countdown'
    });
  }
  /** === TIME CONVERTION === */
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
  /** === FUNCTION STYLE === */
  smallCountDownStyle() {
    return [
      [
        this.props.fontPrimer,
        styles.smallCountDownBox,
        {
          backgroundColor: this.props.backgroundColor
        }
      ],
      [this.props.fontPrimer, { color: this.props.backgroundColor }]
    ];
  }
  smallCountDownStyleWhite() {
    return [
      [
        this.props.fontPrimer,
        styles.smallCountDownBox,
        {
          backgroundColor: masterColor.fontWhite,
          color: masterColor.fontRed50,
          borderWidth: 1,
          borderColor: masterColor.fontRed50
        }
      ],
      [this.props.fontPrimer, { color: this.props.backgroundColor }]
    ];
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER COUNTDOWN SMALL === */
  renderTimeCountDownSmall() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    if (h + m + s === 0) {
      this.toParentFunction();
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={this.smallCountDownStyle()[0]}>{h > 9 ? h : `0${h}`}</Text>
        <Text style={this.smallCountDownStyle()[1]}>{' : '}</Text>
        <Text style={this.smallCountDownStyle()[0]}>{m > 9 ? m : `0${m}`}</Text>
        <Text style={this.smallCountDownStyle()[1]}>{' : '}</Text>
        <Text style={this.smallCountDownStyle()[0]}>{s > 9 ? s : `0${s}`}</Text>
      </View>
    );
  }
  /** === RENDER COUNTDOWN BIG === */
  renderTimeCountDownBig() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={this.props.fontPrimer}>{h} </Text>
        <Text style={this.props.fontSecondary}>{'Jam '}</Text>
        <Text style={this.props.fontPrimer}>{m} </Text>
        <Text style={this.props.fontSecondary}>{'Menit '}</Text>
        <Text style={this.props.fontPrimer}>{s} </Text>
        <Text style={this.props.fontSecondary}>{'Detik'}</Text>
      </View>
    );
  }
  /** === RENDER COUNTDOWN TEXT ONLY === */
  renderTimeCountDownTextOnly() {
    const { h, m } = this.timeConverter(this.state.expiredTime);
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={this.props.fontPrimer}>{h}</Text>
        <Text style={this.props.fontPrimer}>{'Jam '}</Text>
        <Text style={this.props.fontPrimer}>{m}</Text>
        <Text style={this.props.fontPrimer}>{'menit'}</Text>
      </View>
    );
  }
  /** === RENDER COUNTDOWN NUMBER === */
  renderTimeCountDownNumver() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    if (h + m + s === 0) {
      this.toParentFunction();
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={this.props.fontPrimer}>{h > 9 ? h : `0${h}`}</Text>
        <Text style={this.props.fontPrimer}>{':'}</Text>
        <Text style={this.props.fontPrimer}>{m > 9 ? m : `0${m}`}</Text>
        <Text style={this.props.fontPrimer}>{':'}</Text>
        <Text style={this.props.fontPrimer}>{s > 9 ? s : `0${s}`}</Text>
      </View>
    );
  }
  /** RENDER COUNTDOWN SMALL WHITE */
  renderTimeCountDownSmallWhite() {
    const { h, m, s } = this.timeConverter(this.state.expiredTime);
    if (h + m + s === 0) {
      this.toParentFunction();
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={this.smallCountDownStyleWhite()[0]}>
          {h > 9 ? h : `0${h}`}
        </Text>
        <Text style={this.smallCountDownStyleWhite()[1]}>{' : '}</Text>
        <Text style={this.smallCountDownStyleWhite()[0]}>
          {m > 9 ? m : `0${m}`}
        </Text>
        <Text style={this.smallCountDownStyleWhite()[1]}>{' : '}</Text>
        <Text style={this.smallCountDownStyleWhite()[0]}>
          {s > 9 ? s : `0${s}`}
        </Text>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    switch (this.props.type) {
      case 'big':
        return this.renderTimeCountDownBig();
      case 'small':
        return this.renderTimeCountDownSmall();
      case 'textOnly':
        return this.renderTimeCountDownTextOnly();
      case 'number':
        return this.renderTimeCountDownNumver();
      case 'smallWhite':
        return this.renderTimeCountDownSmallWhite();
      default:
        break;
    }
  }
  /** === MAIN === */
  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  smallCountDownBox: {
    borderRadius: 2,
    paddingVertical: 2,
    minWidth: 22,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CountDown;
