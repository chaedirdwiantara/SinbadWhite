import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Image } from 'react-native';
import Text from 'react-native-text';
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
    // setTimeout(() => {
    //   this.props.navigation.navigate(
    //     this.props.permanent.token !== null ? 'App' : 'Auth'
    //   );
    // }, 1000);
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
        <Image
          source={require('../../assets/icons/sinbad/sinbad.png')}
          style={styles.boxImage}
        />
        <Text style={[Fonts.type72, { marginTop: 16 }]}>AGENT SINBAD</Text>
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
  },
  boxImage: {
    height: 100,
    width: 100
  }
});

const mapStateToProps = ({ permanent }) => {
  return { permanent };
};

export default connect(mapStateToProps)(FirstView);
