import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as ActionCreators from '../../state/actions';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import masterColor from '../../config/masterColor.json';
import GlobalStyle from '../../helpers/GlobalStyle';
import GlobalFont from '../../helpers/GlobalFont';
import NavigationService from '../../navigation/NavigationService';
import ModalBottomSwipeCloseNotScroll from '../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';
import ModalContentMenuAddMerchant from '../journey/ModalContentMenuAddMerchant';
import CallCS from '../../screens/global/CallCS';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCS: false,
      menu: [
        {
          name: 'Data Diri',
          goTo: 'data_diri'
        },
        {
          name: 'Hubungi Customer Services',
          goTo: 'call_cs'
        }
      ]
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === SIGN OUT === */
  signOut() {
    this.props.navigation.navigate('Auth');
    setTimeout(() => {
      this.props.deleteAllData();
    }, 50);
  }
  /** === GO TO PAGE === */
  goTo(page) {
    switch (page) {
      case 'data_diri':
        NavigationService.navigate('ProfileDataView');
        break;
      case 'call_cs':
        this.setState({ openModalCS: true });
        break;
      default:
        break;
    }
  }
  /**
   * ================
   * RENDER VIEW
   * ================
   */
  /** === RENDER HEADER === */
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeaderImage}>
          {this.props.user.imageUrl !== null ? (
            <Image
              source={{ uri: this.props.user.imageUrl }}
              style={[GlobalStyle.image46, { borderRadius: 46 }]}
            />
          ) : (
            <Image
              source={require('../../assets/images/profile/avatar.png')}
              style={[GlobalStyle.image46, { borderRadius: 46 }]}
            />
          )}
        </View>
        <View style={styles.boxHeaderNamePhone}>
          <Text style={GlobalFont.type19}>{this.props.user.fullName}</Text>
          <Text style={GlobalFont.type20}>{this.props.user.mobilePhoneNo}</Text>
        </View>
        <View />
      </View>
    );
  }
  /** === RENDER MENU ==== */
  renderMenu() {
    return this.state.menu.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => this.goTo(item.goTo)}
          >
            <Text style={GlobalFont.type8}>{item.name}</Text>
            <View style={{ position: 'absolute', right: 16 }}>
              <MaterialIcon
                name="chevron-right"
                color={masterColor.fontBlack40}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      );
    });
  }

  renderVersion() {
    return (
      <View style={{ paddingLeft: 16, paddingVertical: 16 }}>
        <Text style={GlobalFont.type9}>Versi 1.0</Text>
      </View>
    );
  }
  /** === RENDER SIGNOUT === */
  renderSignOut() {
    return (
      <TouchableOpacity
        style={styles.signOutContainer}
        onPress={() => this.signOut()}
      >
        <Text style={GlobalFont.type21}>LOGOUT</Text>
      </TouchableOpacity>
    );
  }
  /** MENU CALL */
  /** MODAL MENU ADD MERCHANT */
  renderModalCallCS() {
    return this.state.openModalCS ? (
      <View>
        <ModalBottomSwipeCloseNotScroll
          open={this.state.openModalCS}
          closeButton
          title={'Hubungi CS'}
          close={() => this.setState({ openModalCS: false })}
          content={<CallCS />}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderMenu()}
        {this.renderVersion()}
        {this.renderSignOut()}
        {this.renderModalCallCS()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  headerContainer: {
    backgroundColor: masterColor.mainColor,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 16
  },
  signOutContainer: {
    paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  },
  boxMenu: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxHeaderNamePhone: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  boxHeaderImage: {
    paddingRight: 5
  }
});

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
