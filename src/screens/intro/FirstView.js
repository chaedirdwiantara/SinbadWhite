import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class FirstView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ===============================
   * FUNCTIONAL
   * ==============================
   */
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate(
        this.props.global.token !== null ? 'App' : 'Auth'
      );
    }, 1000);
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
        backgroundColor={masterColor.statusBarWhite}
        barStyle={'dark-content'}
      />
    );
  }
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.boxContent}>
        <Text style={[Fonts.type15, { marginBottom: 10 }]}>Agent App</Text>
        <Text style={Fonts.type8}>version 1.0</Text>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderStatusBar()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

export default connect(mapStateToProps)(FirstView);
