import React, { Component } from 'react';
import ReactMoE from 'react-native-moengage';

class MoengageCore extends Component {
  componentDidMount() {
    ReactMoE.initialize();
  }
  render() {
    return <></>;
  }
}

export default MoengageCore;
