/**
 * THIS MODAL FOR SWIPE TO BOTTOM
 */
import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text
} from '../../library/reactPackage'
import {
  GestureRecognizer
} from '../../library/thirdPartyPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

const { height } = Dimensions.get('window');

class ModalBottomType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** DID MOUNT */
  componentDidMount() {
    this.keyboardListener();
  }
  /** WILL UNMOUNT */
  componentWillUnmount() {
    this.keyboardRemove();
  }
  /**
   * ========================
   * FOR KEYBOARD
   * ========================
   */
  /** KEYBOARD LISTENER */
  keyboardListener() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }
  /** KEYBOARD SHOW */
  keyboardDidShow = () => {
    this.setState({ showList: false });
  };
  /** KEYBOARD HIDE */
  keyboardDidHide = () => {
    this.setState({ showList: true });
  };
  /** KEYBOARD REMOVE */
  keyboardRemove() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.setState({ showList: false })}
        onSwipeUp={() => this.setState({ showList: true })}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10
            }}
          >
            {this.props.noTitle ? (
              this.props.noTitle
            ) : (
              <Text style={Fonts.type8}>{this.props.title}</Text>
            )}
          </View>
          <View style={GlobalStyle.lines} />
        </View>
      </GestureRecognizer>
    );
  }
  /** RENDER CONTENT LIST */
  renderContentList() {
    return this.state.showList ? (
      <View
        style={{
          flex: 1,
          height: this.props.height ? this.props.height : null
        }}
      >
        {this.props.body}
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>{this.renderContentList()}</View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <View
        style={[
          styles.contentContainer,
          GlobalStyle.shadow,
          {
            maxHeight: this.props.maxHeight
              ? this.props.maxHeight
              : 0.45 * height
          }
        ]}
      >
        {this.renderContentTitle()}
        {this.renderContentBody()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2000
  },
  boxContentBody: {
    flex: 1
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

export default ModalBottomType2;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 22072021
 * updatedFunction:
 * -> update modal bottom & add props (noTitle & maxHeight).
 *
 */
