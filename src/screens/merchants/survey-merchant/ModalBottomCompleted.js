import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  Text
} from '../../../library/reactPackage';
import { ButtonSingle, ModalBottomType3 } from '../../../library/component';
import { GlobalStyle, Fonts } from '../../../helpers';

class ModalBottomCompleted extends Component {
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../assets/images/sinbad_image/smile_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <Text style={Fonts.type7}>Task Successfully Completed</Text>
        <Text style={[Fonts.type12, styles.text]}>
          Kamu masih dapat melihat foto di detail Toko Survey
        </Text>
        <View style={{ width: '100%' }}>
          <ButtonSingle
            title="Kembali ke Task List"
            borderRadius={4}
            onPress={this.props.onReturnTaskList}
          />
        </View>
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <ModalBottomType3
        open={this.props.open}
        title={''}
        content={this.renderContent()}
        close={this.props.onClose}
        typeClose={'cancel'}
      />
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    padding: 14
  }
});

export default ModalBottomCompleted;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 20112020
 * updatedBy: dyah
 * updatedDate: 22112020
 * updatedFunction:
 * -> add modal bottom completed.
 */
