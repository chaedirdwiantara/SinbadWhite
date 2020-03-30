import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Text from 'react-native-text';
import ModalBottomType1 from '../modal_bottom/ModalBottomType1';
import GlobalStyle from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRedOP50 } from '../StatusBarGlobal';

class ModalBottomSkuNotAvailable extends Component {
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <StatusBarRedOP50 />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/images/sinbad_image/box_sinbad.png')}
            style={GlobalStyle.fullImage}
          />
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
            >
              SKU Tidak Tersedia
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              SKU tidak tersedia di lokasi Anda
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              Silahkan pilih SKU lain yang tersedia
            </Text>
          </View>
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        content={this.renderContent()}
        onPress={this.props.onPress}
        title={''}
        buttonTitle={'Kembali'}
      />
    );
  }
}

export default ModalBottomSkuNotAvailable;
