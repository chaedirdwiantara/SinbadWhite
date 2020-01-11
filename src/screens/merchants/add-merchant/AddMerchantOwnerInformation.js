import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
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

class AddMerchantOwnerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.merchant.dataAddMerchantVolatile.user.fullName,
      phone: this.props.merchant.dataAddMerchantVolatile.user.phone
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    /** IF ADD MERCHANT SUCCESS */
    if (
      prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant
    ) {
      if (this.props.merchant.dataAddMerchant !== null) {
        NavigationService.navigate('Home');
        // setTimeout(() => {
        //   this.props.journeyPlanGetRefresh();
        //   this.props.journeyPlanGetProcess({ page: 0, loading: true });
        // }, 100);
      }
    }
  }
  /** SEND DATA ADD MERCHANT */
  finalStep() {
    this.props.saveVolatileDataAddMerchant({
      user: {
        fullName: this.state.fullName,
        idNo: '',
        taxNo: '',
        phone: this.state.phone,
        email: '',
        password: 'sinbad',
        status: 'inactive',
        roles: [1]
      }
    });
    setTimeout(() => {
      this.props.merchantAddProcess(
        this.props.merchant.dataAddMerchantVolatile
      );
    }, 100);
  }
  /** CHECK IF BUTTON DISABLE */
  buttonDisable() {
    return this.state.fullName !== '';
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <ProgressBarType1
        totalStep={5}
        currentStep={5}
        title={'Langkah melengkapi profil'}
      />
    );
  }
  renderName() {
    return (
      <InputType1
        title={'Nama Lengkap Pemilik'}
        value={this.state.fullName}
        placeholder={'Nama Lengkap Pemilik'}
        keyboardType={'default'}
        text={text => this.setState({ fullName: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return <View style={{ flex: 1, marginTop: 20 }}>{this.renderName()}</View>;
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          !this.buttonDisable() || this.props.merchant.loadingAddMerchant
        }
        title={'Lanjutkan'}
        borderRadius={4}
        loading={this.props.merchant.loadingAddMerchant}
        onPress={() => this.finalStep()}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderProgressHeader()}
        {this.renderContent()}
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

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMerchantOwnerInformation);
