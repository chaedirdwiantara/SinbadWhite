import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  StatusBar,
  Image
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';

const { height, width } = Dimensions.get('window');

class ModalWarning extends Component {
  render() {
    return (
      <Modal
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar
          backgroundColor="rgba(94, 28, 30, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerImage}>
                <Image
                  source={require('../../assets/icons/oms/error.png')}
                  style={{ height: 28, width: 28 }}
                />
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{this.props.content}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
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
  },
  contentSubContainer: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  titleText: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(2),
    color: '#333333'
  },
  contentText: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    textAlign: 'center'
  },
  subContentText: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.2),
    color: '#333333',
    textAlign: 'center'
  }
});

export default ModalWarning;
