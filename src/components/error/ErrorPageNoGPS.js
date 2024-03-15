import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import {
  ButtonSingle
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

/**
 * Props
 * - title = '',
 * - description = ''
 */

class ErrorPageNoGPS extends Component {
  constructor(props) {
    super(props);
  }

  /** === EMPTY STATE === */
  renderEmptyState() {
    return (
      <View style={styles.boxEmpty}>
        <Image
          source={require('../../assets/images/sinbad_image/no_gps.png')}
          style={GlobalStyle.fullImage}
        />
        <View style={styles.boxTitle}>
          <Text style={[Fonts.type7, { textAlign: 'center' }]}>
            Ups, GPS Belum Menyala
          </Text>
        </View>
        <View style={styles.boxDescription}>
          <Text style={[Fonts.type17, { textAlign: 'center' }]}>
            Silahkan nyalakan GPS pada handphone Anda
          </Text>
        </View>
      </View>
    );
  }

  renderButton() {
    return (
      <ButtonSingle
        title={'Buka Pengaturan'}
        borderRadius={4}
        onPress={this.props.onPress}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderEmptyState()}
        {this.renderButton()}
      </View>
    );
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
  },
  boxTitle: {
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75
  },
  boxDescription: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75
  }
});

export default ErrorPageNoGPS;

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
