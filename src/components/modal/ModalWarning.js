import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  ModalPopUp,
  Image,
  Text
} from '../../library/reactPackage'
import {
  StatusBarRedOP50
} from '../../library/component'
import { Fonts } from '../../helpers'
import { Color } from '../../config'

const { width } = Dimensions.get('window');

class ModalWarning extends Component {
  render() {
    return (
      <ModalPopUp
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerImage}>
                <Image
                  source={require('../../assets/icons/global/error.png')}
                  style={{ height: 28, width: 28 }}
                />
              </View>
              <View style={styles.contentContainer}>
                <Text style={[Fonts.type59, { textAlign: 'center' }]}>
                  {this.props.content}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ModalPopUp>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.fontBlack100OP40,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 20,
    width: 0.62 * width
  },
  boxCard: {
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: '5%'
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  }
});

export default ModalWarning;

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

