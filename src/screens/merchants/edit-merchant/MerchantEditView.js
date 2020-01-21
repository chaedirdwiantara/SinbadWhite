import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import ComingSoon from '../../../components/empty_state/ComingSoon';

class MerchantEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={Fonts.type5}>{state.params.title}</Text>
        </View>
      ),
      headerRight: () => <View />
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ComingSoon />
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditView);
