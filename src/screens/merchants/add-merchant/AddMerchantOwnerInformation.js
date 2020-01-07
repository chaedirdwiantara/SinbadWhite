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
      fullName: this.props.merchant.dataAddMerchantVolatile.user.fullName
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  nextStep() {
    NavigationService.navigate('MerchantView');
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
        keyboardType={'numeric'}
        text={text => this.setState({ nameMerchant: text })}
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
        disabled={false}
        title={'Lanjutkan'}
        borderRadius={4}
        onPress={() => this.nextStep()}
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
