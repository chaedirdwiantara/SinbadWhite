import {
  React,
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform
} from '../../library/reactPackage'
import {
  StatusBarBlackOP40,
  StatusBarRedOP50
} from '../../library/component'
import { Fonts } from '../../helpers'
import masterColor from '../../config/masterColor.json';
import ModalBottomSwipeCloseNotScroll from '../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';

class CallMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parsingPhone: this.props.phoneNumber.split('')
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * ====================
   */
  /** TO PARENT FUNCTION */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  toWhatsAppWithContact() {
    this.toParentFunction({
      type: 'close'
    });
    Linking.openURL(
      `whatsapp://send?phone=+62${this.props.phoneNumber.slice(1)}`
    ).catch(err => {
      if (err) {
        Linking.openURL('market://details?id=com.whatsapp');
      }
    });
  }

  toPhoneCall() {
    this.toParentFunction({
      type: 'close'
    });
    let noPhone = '';
    if (Platform.OS === 'android') {
      noPhone = `tel:${this.props.phoneNumber}`;
    } else {
      noPhone = `telprompt:${this.props.phoneNumber}`;
    }
    Linking.openURL(noPhone);
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === CONTENT === */
  renderContentItem() {
    return (
      <View style={styles.contentContainer}>
        {this.state.parsingPhone[1] === '8' ? (
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => this.toWhatsAppWithContact()}
          >
            <Image
              source={require('../../assets/icons/profile/whatsapp.png')}
              style={styles.menuCircleImage}
            />
            <Text style={Fonts.type8}>Chat</Text>
            <Text style={Fonts.type8}>Whatsapp</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.boxMenu}>
            <Image
              source={require('../../assets/icons/profile/whatsapp.png')}
              style={[styles.menuCircleImage, { opacity: 0.3 }]}
            />
            <Text style={[Fonts.type8, { opacity: 0.5 }]}>Chat</Text>
            <Text style={[Fonts.type8, { opacity: 0.5 }]}>Whatsapp</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => this.toPhoneCall()}
        >
          <Image
            source={require('../../assets/icons/profile/telfon.png')}
            style={styles.menuCircleImage}
          />
          <Text style={Fonts.type8}>Call</Text>
          <Text style={Fonts.type8}>Cellular</Text>
        </TouchableOpacity>
      </View>
    );
  }
  /** RENDER DATA */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.props.statusBarRed ? (
          <StatusBarRedOP50 />
        ) : (
          <StatusBarBlackOP40 />
        )}

        {this.renderContentItem()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomSwipeCloseNotScroll
        closeButton
        open={this.props.open}
        close={this.props.close}
        title={'Hubungi Toko'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 40
  },
  menuCircleImage: {
    marginBottom: 6,
    marginHorizontal: 25,
    height: 50,
    width: 50
  },
  boxMenu: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CallMerchant;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

