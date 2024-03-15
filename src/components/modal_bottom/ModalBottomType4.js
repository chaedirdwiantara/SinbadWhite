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
  MaterialIcon,
  Modal
} from '../../library/thirdPartyPackage'
import {
  ButtonSingle
} from '../../library/component'
import { Color } from '../../config'
import { Fonts } from '../../helpers'

const { width, height } = Dimensions.get('window');

class ModalBottomType4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER BUTTON === */
  renderButton() {
    return this.props.buttonTitle ? (
      <ButtonSingle
        disabled={this.props.buttonDisabled}
        title={this.props.buttonTitle}
        borderRadius={4}
        onPress={this.props.onPress}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 14 }} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'btnCloseModal'}
            style={styles.boxClose}
            onPress={this.props.close}
          >
            {this.props.typeClose === 'cancel' ? (
              <MaterialIcon
                name="close"
                color={Color.fontBlack50}
                size={24}
              />
            ) : (
              <MaterialIcon
                name="keyboard-arrow-left"
                color={Color.fontBlack50}
                size={32}
              />
            )}
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
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
          {this.renderButton()}
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

export default ModalBottomType4;

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

