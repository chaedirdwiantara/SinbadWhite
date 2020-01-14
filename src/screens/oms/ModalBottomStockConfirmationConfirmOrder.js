import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';

const { height, width } = Dimensions.get('window');

class ModalBottomStockConfirmationConfirmOrder extends Component {
  renderProductErrorTidakTersedia() {
    return this.props.oms.errorOmsConfirmOrder.data.errorData.map(
      (item, index) => {
        return (
          <View style={styles.boxPerContent} key={index}>
            <View
              style={{
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{
                  uri: item.catalogue.catalogueImages[0].imageUrl
                }}
                style={[styles.productImage, { opacity: 0.5 }]}
              />
            </View>
            <View
              style={{
                width: '40%',
                justifyContent: 'space-between',
                paddingVertical: 13
              }}
            >
              <View>
                <Text style={[styles.productNameText, { opacity: 0.5 }]}>
                  {item.catalogue.name}
                </Text>
              </View>
              <View>
                <Text style={styles.stockError}>Produk Tidak Tersedia</Text>
              </View>
            </View>
          </View>
        );
      }
    );
  }

  renderProductTidakTersedia() {
    return (
      <View style={styles.boxHeaderContent}>
        <View style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Text style={styles.subTitle}>Product Tidak Tersedia</Text>
        </View>
        <View style={styles.lines} />
        <View style={{ paddingHorizontal: 10 }}>
          {this.renderProductErrorTidakTersedia()}
        </View>
      </View>
    );
  }

  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={this.props.backToCart}
          title="Tinjau Keranjang"
          titleStyle={styles.titleButtonRed}
          buttonStyle={styles.buttonWhite}
        />
        <Button
          disabled={!this.props.oms.errorOmsConfirmOrder.data.confirmOrder}
          onPress={this.props.confirmation}
          title="Konfirmasi"
          titleStyle={styles.titleButton}
          buttonStyle={styles.button}
          disabledStyle={styles.buttonDisabled}
          disabledTitleStyle={styles.titleButton}
        />
      </View>
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor="black"
        deviceHeight={height}
        backdropOpacity={0.4}
        style={styles.modalPosition}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: 50 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Konfirmasi Stock</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <Text style={styles.titleDescription}>
              Produk pada pesanan Anda telah diperbaharui Silahkan konfirmasi
              pada tampilan di bawah ini.
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderProductTidakTersedia()}</ScrollView>
          </View>
          <View>{this.renderButton()}</View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.7 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  subTitle: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  productNameText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    lineHeight: 15
  },
  stockChangeText: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  stockError: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.3),
    color: 'rgba(79, 79, 79, 0.5)'
  },
  titleDescription: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    lineHeight: 15,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    marginVertical: 10,
    borderColor: '#f2f2f2'
  },
  productImage: {
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  /**for content */
  boxPerContent: {
    flexDirection: 'row',
    height: 0.11 * height
  },
  boxHeaderContent: {
    flex: 1
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 141,
    height: 41
  },
  titleButtonRed: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    color: '#f0444c'
  },
  buttonWhite: {
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f0444c',
    width: 141,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: 'rgba(240,68,76, 0.5)',
    borderRadius: 10,
    width: 141,
    height: 41
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

export default connect(
  mapStateToProps,
  {}
)(ModalBottomStockConfirmationConfirmOrder);
