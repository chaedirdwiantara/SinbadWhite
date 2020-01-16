import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarBlackOP40 } from '../../components/StatusBarGlobal';

class CallCS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '+628988386606'
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * ====================
   */
  toWhatsAppWithContact() {
    Linking.openURL(`whatsapp://send?phone=${this.state.phoneNumber}`).catch(
      err => {
        if (err) {
          Linking.openURL('market://details?id=com.whatsapp');
        }
      }
    );
  }

  toPhoneCall() {
    let noPhone = '';
    if (Platform.OS === 'android') {
      noPhone = `tel:${this.state.phoneNumber}`;
    } else {
      noPhone = `telprompt:${this.state.phoneNumber}`;
    }
    Linking.openURL(noPhone);
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
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
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarBlackOP40 />
        {this.renderContent()}
      </View>
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CallCS);
