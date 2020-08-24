import { 
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import { 
  StatusBarRedOP50,
  ModalBottomType1,
  LoadingHorizontal
 } from '../../library/component'
import { Fonts } from '../../helpers'
import masterColor from '../../config/masterColor.json';

class ModalBottomProgressChecking extends Component {
  /**
   * ========================
   * RENDER VIEW
   * ========================
   */
  /** === RENDER DATA ==== */
  renderData() {
    return (
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <View>
          <Text style={[Fonts.type5, { marginBottom: 16 }]}>
            {this.props.progress}
          </Text>
          <LoadingHorizontal />
        </View>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={styles.contentContainer}>{this.renderData()}</View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        title={''}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%',
  },
  contentContainer: {
    marginTop: -30,
    flex: 1,
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ModalBottomProgressChecking;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: 
 * createdDate: 
 * updatedBy: tatas
 * updatedDate: 23062020
 * updatedFunction:
 * -> Refactoring Module Import
 * 
 */