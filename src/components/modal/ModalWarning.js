import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import { StatusBarRedOP50 } from '../StatusBarGlobal';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

const { width } = Dimensions.get('window');

class ModalWarning extends Component {
  render() {
    return (
      <Modal
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerImage}>
                <Image
                  source={require('../../assets/icons/global/error.png')}
                  style={{ height: 28, width: 28 }}
                />
              </View>
              <View style={styles.contentContainer}>
                <Text style={[Fonts.type59, { textAlign: 'center' }]}>
                  {this.props.content}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: masterColor.fontBlack100OP40,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: masterColor.backgroundWhite,
    borderRadius: 20,
    width: 0.62 * width
  },
  boxCard: {
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: '5%'
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  }
});

export default ModalWarning;
