import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

class ComingSoon extends Component {
  /** === EMPTY STATE === */
  renderEmptyState() {
    return (
      <View style={styles.boxEmpty}>
        <Image
          source={require('../../assets/images/sinbad_image/smile_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <Text style={Fonts.type7}>Segera Hadir</Text>
      </View>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderEmptyState()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ComingSoon;

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

