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
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';
import * as ActionCreators from '../../state/actions';

const { height } = Dimensions.get('window');

class ModalBottomStockConfirmation extends Component {
  renderPerubahanStockContent() {
    return this.props.cart.errorCheckout.data.map((item, index) => {
      return item.errorCode === 'ERR-STOCK' ? (
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
              style={styles.productImage}
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
              <Text style={styles.productNameText}>{item.catalogue.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.stockChangeText}>
                {item.requestStock} pcs
              </Text>
              <Image
                source={require('../../assets/icons/global/arrow_right.png')}
                style={{ height: 18, width: 18, marginHorizontal: 5 }}
              />
              <Text style={styles.stockChangeText}>
                {item.suggestedStock} pcs
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderProductErrorBarangHabis() {
    return this.props.cart.errorCheckout.data.map((item, index) => {
      return item.errorCode === 'ERR-RUN-OUT' ? (
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
              <Text
                style={[
                  styles.productNameText,
                  { color: 'rgba(51, 51, 51, 0.5)' }
                ]}
              >
                {item.catalogue.name}
              </Text>
            </View>
            <View>
              <Text style={styles.stockError}>Stock Habis</Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderProductErrorTidakTersedia() {
    return this.props.cart.errorCheckout.data.map((item, index) => {
      return item.errorCode === 'ERR-STATUS' ? (
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
              <Text
                style={[
                  styles.productNameText,
                  { color: 'rgba(51, 51, 51, 0.5)' }
                ]}
              >
                {item.catalogue.name}
              </Text>
            </View>
            <View>
              <Text style={styles.stockError}>Produk Tidak Tersedia</Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderPerubahanStock() {
    return this.props.cart.errorCheckout.data.find(
      item => item.errorCode === 'ERR-STOCK'
    ) !== undefined ? (
      <View style={styles.boxHeaderContent}>
        <View style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Text style={styles.subTitle}>Perubahan Stock</Text>
        </View>
        <View style={styles.lines} />
        <View style={{ paddingHorizontal: 10 }}>
          {this.renderPerubahanStockContent()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderBarangHabis() {
    return this.props.cart.errorCheckout.data.find(
      item => item.errorCode === 'ERR-RUN-OUT'
    ) !== undefined ? (
      <View style={styles.boxHeaderContent}>
        <View style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Text style={styles.subTitle}>Barang Habis</Text>
        </View>
        <View style={styles.lines} />
        <View style={{ paddingHorizontal: 10 }}>
          {this.renderProductErrorBarangHabis()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderProductTidakTersedia() {
    return this.props.cart.errorCheckout.data.find(
      item => item.errorCode === 'ERR-STATUS'
    ) !== undefined ? (
      <View style={styles.boxHeaderContent}>
        <View style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Text style={styles.subTitle}>Product Tidak Tersedia</Text>
        </View>
        <View style={styles.lines} />
        <View style={{ paddingHorizontal: 10 }}>
          {this.renderProductErrorTidakTersedia()}
        </View>
      </View>
    ) : (
      <View />
    );
  }

  renderButton() {
    return (
      <Button
        onPress={this.props.close}
        title="Tinjau Keranjang"
        titleStyle={styles.titleButton}
        buttonStyle={styles.button}
      />
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard
        coverScreen
        animationInTiming={500}
        animationOutTiming={100}
        backdropTransitionOutTiming={10}
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
              Beberapa informasi produk pada pesanan Anda telah diperbaharui
              mohon tinjau ulang keranjang dan coba lagi
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>
              {this.renderPerubahanStock()}
              {this.renderBarangHabis()}
              {this.renderProductTidakTersedia()}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>{this.renderButton()}</View>
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
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 13,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 282,
    height: 41
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomStockConfirmation);
