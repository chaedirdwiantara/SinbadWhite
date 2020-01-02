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

class AddMerchantOTP extends Component {
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
    NavigationService.navigate('AddMerchant3');
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
        title={'Verifikasi'}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantOTP);
