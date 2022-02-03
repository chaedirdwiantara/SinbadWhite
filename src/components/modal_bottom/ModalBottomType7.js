import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { MaterialIcon, Modal } from '../../library/thirdPartyPackage';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';
import masterColor from '../../config/masterColor.json';

const { width, height } = Dimensions.get('window');

class ModalBottomType7 extends Component {
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
        <View
          style={{
            backgroundColor: masterColor.fontYellow50,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }}
        >
          {this.props.warningContent ? (
            <View testID="view-warning-credit">
              {this.props.warningContent}
            </View>
          ) : null}
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            <View style={GlobalStyle.linesSwipeModal} />
          </View>
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            {this.props.typeClose === 'cancel' ? (
              <MaterialIcon name="close" color={Color.fontBlack50} size={24} />
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
        swipeDirection={['down']}
        backdropColor={Color.fontBlack100}
        backdropOpacity={0.4}
        onSwipeMove={this.props.close}
        deviceHeight={height}
        style={styles.mainContainer}
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

export default ModalBottomType7;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Ayu
 * updatedDate: 21012022
 * updatedFunction:
 * -> Enhance Modal Bottom Type - add warning
 *
 */
