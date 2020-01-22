import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import NavigationService from '../navigation/NavigationService';

class BackHandlerBackSpecific extends Component {
  constructor(props) {
    super(props);
    this.didFocus = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );
    this.state = {};
  }
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  componentDidMount() {
    /** === FOR H/W BACK LISTENER === */
    this.willBlur = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
  }
  /** === UNMOUNT ALL LISTENER === */
  componentWillUnmount() {
    this.didFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  /** === HARDWARE BACK BUTTON === */
  handleBackPress = () => {
    NavigationService.navigate(this.props.page);
    return true;
  };
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === MAIN === */
  render() {
    return <View />;
  }
}

export default BackHandlerBackSpecific;
