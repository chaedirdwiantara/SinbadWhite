import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import masterColor from '../../config/masterColor.json';
import GlobalFont from '../../helpers/GlobalFont';
import GlobalStyle from '../../helpers/GlobalStyle';
import NavigationService from '../../navigation/NavigationService';

class ProfileDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          section: 'Name',
          edit: false,
          goTo: 'edit_name',
          data: this.props.user.fullName
        },
        {
          section: 'Nomor Handphone',
          edit: false,
          data: this.props.user.mobilePhoneNo
        }
      ]
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  goTo(page) {
    switch (page) {
      case 'edit_name':
        NavigationService.navigate('ProfileDataNameEdit');
        break;
      case 'take_profile_photo':
        NavigationService.navigate('TakeProfilePicture');
        break;
      default:
        break;
    }
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER HEADER IMAGE === */
  renderHeaderImage() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeader}>
          {this.props.user.imageUrl !== null ? (
            <Image
              source={{ uri: this.props.user.imageUrl }}
              style={GlobalStyle.image46}
            />
          ) : (
            <Image
              source={require('../../assets/images/profile/avatar.png')}
              style={GlobalStyle.image74}
            />
          )}
          {/* <TouchableOpacity
            style={styles.boxEditIcon}
            onPress={() => this.goTo('take_profile_photo')}
          >
            <MaterialIcon
              name="edit"
              color={masterColor.fontBlack80}
              size={18}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
  /** === RENDER PROFILE INFORMATION === */
  renderProfileInformation() {
    return (
      <View style={styles.informationContainer}>
        {this.state.data.map((item, index) => {
          return (
            <View style={styles.boxInformation} key={index}>
              <View>
                <Text style={[GlobalFont.type23, { marginBottom: 5 }]}>
                  {item.section}
                </Text>
                <Text style={GlobalFont.type24}>{item.data}</Text>
              </View>
              {item.edit ? (
                <TouchableOpacity
                  style={styles.boxUbah}
                  onPress={() => this.goTo(item.goTo)}
                >
                  <Text style={GlobalFont.type22}>Ubah</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          );
        })}
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeaderImage()}
        {this.renderProfileInformation()}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  boxHeader: {
    height: 76,
    width: 76
  },
  boxEditIcon: {
    position: 'absolute',
    right: 2,
    bottom: 2
  },
  informationContainer: {
    paddingHorizontal: 20
  },
  boxInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  boxUbah: {
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataView);
