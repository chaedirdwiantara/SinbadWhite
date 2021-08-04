import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Text
} from '../../library/reactPackage'
import {
  Modal
} from '../../library/thirdPartyPackage'
import {
  ButtonSingle
} from '../../library/component'
import { Fonts } from '../../helpers'
import { Color } from '../../config'

const { width, height } = Dimensions.get('window');

class ModalBottomType1 extends Component {
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
      <View style={styles.boxContentTitle}>
        <View>
          <Text style={Fonts.type7}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return <View style={styles.boxContentBody}>{this.props.content}</View>;
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return this.props.buttonTitle ? (
      <ButtonSingle
        accessible={true}
        accessibilityLabel={
          this.props.accessibilityLabel ? this.props.accessibilityLabel : null
        }
        disabled={false}
        title={this.props.buttonTitle}
        borderRadius={4}
        onPress={this.props.onPress}
      />
    ) : (
      <View />
    );
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
    maxHeight: 0.9 * height,
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
    marginTop: 30,
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

export default ModalBottomType1;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

