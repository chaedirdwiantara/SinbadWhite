import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import ModalBottomType1 from '../modal_bottom/ModalBottomType1';
import GlobalStyle from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';
import { StatusBarBlack } from '../StatusBarGlobal';

const { height, width } = Dimensions.get('window');

class ModalBottomErrorPinMap extends Component {
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            disabled={false}
            loading={false}
            onPress={this.props.ok}
            title={'Ok'}
            borderRadius={4}
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            white
            disabled={false}
            loading={false}
            onPress={this.props.manualInput}
            title={'Manual Input'}
            borderRadius={4}
          />
        </View>
      </View>
    );
  }
  /**
   * RENDER CONTENT
   */
  renderContent() {
    return (
      <View>
        <StatusBarBlack />
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
        {this.renderButton()}
      </View>
    );
  }
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        content={this.renderContent()}
        title={''}
      />
    );
  }
}

const styles = StyleSheet.create({
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ModalBottomErrorPinMap;
