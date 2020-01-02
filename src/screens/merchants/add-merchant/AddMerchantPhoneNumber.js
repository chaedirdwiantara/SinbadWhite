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

class AddMerchantPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  nextStep() {
    NavigationService.navigate('AddMerchant2');
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <Text>lalalala</Text>
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
        title={'Lanjutnya'}
        borderRadius={4}
        onPress={() => this.nextStep()}
      />
    );
  }
  /** === RENDER STEP HEADER === */
  renderStepHeader() {
    return (
      <View
        style={{ borderWidth: 1, paddingVertical: 20, paddingHorizontal: 16 }}
      >
        <Text>lala</Text>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderStepHeader()}
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMerchantPhoneNumber);
