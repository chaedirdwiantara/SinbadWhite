import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class EmptyMerchant extends Component {
  /** === EMPTY STATE === */
  renderEmptyState() {
    return (
      <View style={styles.boxEmpty}>
        <Image
          source={require('../../assets/images/sinbad_image/cry_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <View style={{ marginBottom: 10 }}>
          <Text style={Fonts.type7}>List Toko Kosong</Text>
        </View>
        <View>
          <Text style={Fonts.type17}>
            Maaf , Anda tidak mempunyai list toko
          </Text>
        </View>
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

export default EmptyMerchant;
