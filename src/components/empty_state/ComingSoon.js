import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class ComingSoon extends Component {
  /** === EMPTY STATE === */
  renderEmptyState() {
    return (
      <View style={styles.boxEmpty}>
        <Image
          source={require('../../assets/images/sinbad_image/smile_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <Text style={Fonts.type7}>Segera Hadir</Text>
      </View>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderEmptyState()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ComingSoon;
