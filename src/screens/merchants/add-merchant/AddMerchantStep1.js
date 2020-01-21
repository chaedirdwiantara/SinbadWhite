import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView
} from 'react-native';
import Text from 'react-native-text';
import NavigationService from '../../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import ButtonSingle from '../../../components/button/ButtonSingle';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import masterColor from '../../../config/masterColor';
import ProgressBarType1 from '../../../components/progress_bar/ProgressBarType1';
import InputType1 from '../../../components/input/InputType1';

class AddMerchantStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorText: 'No. HP yang anda masukan salah',
      correctFormatPhoneNumber: true
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** COMPONENT DID UPDATE */
  componentDidUpdate(prevPros) {
    /** IF SUCCESS */
    if (
      prevPros.auth.dataCheckPhoneAvailble !==
      this.props.auth.dataCheckPhoneAvailble
    ) {
      if (this.props.auth.dataCheckPhoneAvailble !== null) {
        NavigationService.navigate('AddMerchantStep2');
        this.props.saveVolatileDataAddMerchant({
          phone: this.state.phoneNumber
        });
      }
    }
    /** IF ERROR */
    if (
      prevPros.auth.errorCheckPhoneAvailble !==
      this.props.auth.errorCheckPhoneAvailble
    ) {
      if (this.props.auth.errorCheckPhoneAvailble !== null) {
        this.setState({
          correctFormatPhoneNumber: false,
          errorText: 'No. HP yang anda masukan sudah terdaftar'
        });
      }
    }
  }
  /** === PHONE NUMBER MODIFY === */
  checkPhone() {
    Keyboard.dismiss();
    const reg = /^08[0-9]{8,12}$/;
    const checkFormat = reg.test(this.state.phoneNumber);
    this.setState({
      correctFormatPhoneNumber: checkFormat
    });
    if (checkFormat) {
      this.props.checkPhoneNumberAvailableProcess(this.state.phoneNumber);
    }
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <InputType1
          title={'Nomor Handphone'}
          placeholder={'Masukkan Nomor Handphone'}
          keyboardType={'numeric'}
          text={text =>
            this.setState({
              phoneNumber: text,
              correctFormatPhoneNumber: true
            })
          }
          error={!this.state.correctFormatPhoneNumber}
          errorText={this.state.errorText}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.phoneNumber === '' ||
          this.props.auth.loadingCheckPhoneAvailble
        }
        loading={this.props.auth.loadingCheckPhoneAvailble}
        title={'Lanjutnya'}
        borderRadius={4}
        onPress={() => this.checkPhone()}
      />
    );
  }
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ProgressBarType1
          totalStep={2}
          currentStep={1}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>

        {this.renderButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep1);
