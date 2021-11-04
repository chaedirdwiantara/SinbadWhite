import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  connect,
  MaterialIcon,
  Modal
} from '../../library/thirdPartyPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

const { width, height } = Dimensions.get('window');

class ModalBottomWithClose extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'btnCloseModalCS'}
            style={styles.boxClose}
            onPress={this.props.close}
          >
            <MaterialIcon
              name="close"
              color={Color.fontBlack50}
              size={24}
            />
          </TouchableOpacity>
          <View>
            <Text style={Fonts.type7}>{this.props.title}</Text>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return <View style={styles.boxContentBody}>{this.props.content}</View>;
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        swipeDirection={['down']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        onSwipeMove={this.props.close}
        deviceHeight={height}
        style={styles.mainContainer}
        onRequestClose={this.props.onRequestClose ? this.props.onRequestClose : this.props.close}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
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
    maxHeight: 0.8 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 20
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(ModalBottomWithClose);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Raka
* updatedDate: 14092021
* updatedFunction:
* -> set default function to close modal when click back button android
* 
*/
