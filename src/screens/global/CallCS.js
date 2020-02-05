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
import {
  StatusBarBlackOP40,
  StatusBarRedOP50
} from '../../components/StatusBarGlobal';
import ModalBottomSwipeCloseNotScroll from '../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';

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
  /** TO PARENT FUNCTION */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }

  toWhatsAppWithContact() {
    this.toParentFunction({
      type: 'close'
    });
    Linking.openURL(`whatsapp://send?phone=${this.state.phoneNumber}`).catch(
      err => {
        if (err) {
          Linking.openURL('market://details?id=com.whatsapp');
        }
      }
    );
  }

  toPhoneCall() {
    this.toParentFunction({
      type: 'close'
    });
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
  renderContentItem() {
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
        title={'Hubungi CS'}
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CallCS);
