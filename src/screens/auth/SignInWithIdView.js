import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ActionCreators from '../../state/actions';
import Fonts from '../../helpers/GlobalFont';
import masterColor from '../../config/masterColor.json';
import ButtonSingle from '../../components/button/ButtonSingle';
import GlobalStyle from '../../helpers/GlobalStyle';
import { SafeAreaView } from 'react-navigation';

const { width, height } = Dimensions.get('window');

class SignInWithIdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      correctFormatPhoneNumber: false
    };
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  componentDidMount() {
    console.log('Home');
  }

  test() {
    console.log('lala');
  }
  /** === PHONE NUMBER MODIFY === */
  phoneModify(phoneNumber) {
    let phone = phoneNumber.split('');
    if (phone[0] === '0') {
      phone.splice(0, 1);
    }
    const reg = /^8[0-9]{8,12}$/;
    const checkFormat = reg.test(phone.join(''));
    this.setState({
      phoneNumber: phone.join(''),
      correctFormatPhoneNumber: checkFormat
    });
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === STATUS BAR === */
  renderStatusBar() {
    return (
      <StatusBar
        backgroundColor={masterColor.statusBarDefault}
        barStyle={'light-content'}
      />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={!this.state.correctFormatPhoneNumber}
        title={'Lanjutkan'}
        borderRadius={50}
        onPress={() => this.test()}
      />
    );
  }
  /** === RENDER CONTENT === */
  /** TITLE */
  renderTitle() {
    return (
      <View>
        <View>
          <Text style={Fonts.type1}>LOGIN</Text>
        </View>
        <View
          style={{ paddingRight: '30%', paddingBottom: 20, paddingTop: 10 }}
        >
          <Text style={Fonts.type2}>
            Silahkan masuk dengan nomor HP-mu yang terdaftar
          </Text>
        </View>
      </View>
    );
  }
  /** CONTENT */
  renderContentPhoneNumberInput() {
    return (
      <View style={styles.boxPhoneInput}>
        <View style={styles.boxPhoneNumberAreaCode}>
          <Text style={Fonts.type3}>+62</Text>
        </View>
        <View style={styles.boxPhoneNumber}>
          <TextInput
            selectionColor={masterColor.mainColor}
            placeholder="Masukan No.Handphone"
            value={this.state.phoneNumber}
            maxLength={13}
            textContentType="telephoneNumber"
            keyboardType="numeric"
            onChangeText={phoneNumber => this.phoneModify(phoneNumber)}
            style={[styles.textInput, Fonts.type3]}
          />
          <View style={{ justifyContent: 'center', height: '100%' }}>
            {this.state.correctFormatPhoneNumber ? (
              <Icons
                color={masterColor.fontGreen50}
                name={'check-circle'}
                size={24}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  }
  renderContent() {
    return (
      <View style={GlobalStyle.cardContainerRadius12}>
        <View style={styles.boxContent}>
          {this.renderContentPhoneNumberInput()}
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return (
      <View>
        <View style={styles.backgroundLogin} />
        <Image
          source={require('../../assets/images/background/login_backgroud.png')}
          style={styles.imageBackground}
        />
        <View style={{ height: 100 }} />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView>
        <View>
          {this.renderStatusBar()}
          {this.renderBackground()}
          <View style={styles.mainContainer}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 16,
    position: 'absolute',
    zIndex: 1000
  },
  backgroundLogin: {
    backgroundColor: masterColor.mainColor,
    height: 210
  },
  imageBackground: {
    resizeMode: 'stretch',
    height: 40,
    width: '100%'
  },
  boxContent: {
    paddingTop: 42,
    paddingBottom: 26
  },
  boxPhoneInput: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 46,
    marginBottom: 15
  },
  boxPhoneNumberAreaCode: {
    width: 52,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: masterColor.fontBlack10
  },
  boxPhoneNumber: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    marginLeft: 12,
    borderRadius: 8,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: masterColor.fontBlack10
  },
  /** for textInput */
  textInput: {
    flex: 1
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SignInWithIdView);
