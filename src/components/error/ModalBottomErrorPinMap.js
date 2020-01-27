import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import ModalBottomType1 from '../modal_bottom/ModalBottomType1';
import GlobalStyle from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarBlackOP40 } from '../StatusBarGlobal';

const { height, width } = Dimensions.get('window');

class ModalBottomErrorPinMap extends Component {
  /**
   * RENDER CONTENT
   */
  renderContent() {
    return (
      <View>
        <StatusBarBlackOP40 />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/images/sinbad_image/no_gps.png')}
            style={GlobalStyle.fullImage}
          />
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
            >
              Area Pin-Point Terlalu Luas
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              Perbesar peta dengan
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              dua jari pada layar Anda
            </Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        content={this.renderContent()}
        onPress={this.props.onPress}
        title={''}
        buttonTitle={'Ok'}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default ModalBottomErrorPinMap;
