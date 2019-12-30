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

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          name: 'Data Diri',
          goTo: 'data_diri'
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
              style={GlobalStyle.image46}
            />
          ) : (
            <Image
              source={require('../../assets/images/profile/avatar.png')}
              style={GlobalStyle.image46}
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
        <View key={index} style={styles.menuContainer}>
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
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderMenu()}
        {this.renderSignOut()}
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
  menuContainer: {
    marginBottom: 16
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
