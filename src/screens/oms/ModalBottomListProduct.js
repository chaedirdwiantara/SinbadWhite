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
import { Fonts } from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers';

const { height } = Dimensions.get('window');

class ModalBottomListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data.orderBrands
    };
  }

  renderPriceProduct(item) {
    return (
      <View>
        {item.catalogue.suggestRetailPrice !== item.catalogue.productPrice ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 5 }}>
              <Text style={styles.priceTextCross}>
                {MoneyFormat(item.catalogue.productPrice)}
              </Text>
            </View>
            <View>
              <Text style={styles.priceTextRed}>
                {MoneyFormat(item.catalogue.suggestRetailPrice)}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.priceTextRed}>
              {MoneyFormat(item.catalogue.suggestRetailPrice)}
            </Text>
          </View>
        )}
      </View>
    );
  }

  renderProductList(item) {
    return item.map((itemProduct, index) => {
      return (
        <View key={index}>
          <View style={styles.boxPerContent}>
            <View
              style={{
                width: '25%',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                defaultSource={require('../../assets/icons/sinbadopacity.png')}
                source={{
                  uri: itemProduct.catalogue.catalogueImages[0].imageUrl
                }}
                style={styles.productImage}
              />
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'space-between',
                paddingVertical: 10
              }}
            >
              <View>
                <Text style={styles.productNameText}>
                  {itemProduct.catalogue.name}
                </Text>
              </View>
              <View style={{ marginVertical: 5 }}>
                {this.renderPriceProduct(itemProduct)}
              </View>
              <View>
                <Text style={styles.textPcs}>x{itemProduct.qty} Pcs</Text>
              </View>
            </View>
          </View>
          <View style={styles.lines} />
        </View>
      );
    });
  }

  renderBrandList() {
    return this.state.data.map((item, index) => {
      return (
        <View key={index}>
          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Text style={styles.textBrandName}>{item.brand.name}</Text>
          </View>
          <View style={styles.lines} />
          <View>{this.renderProductList(item.orderBrandCatalogues)}</View>
        </View>
      );
    });
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
          <View style={{ height: 60 }}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={this.props.close}
                style={styles.closeBox}
              >
                <Image
                  source={require('../../assets/icons/close.png')}
                  style={styles.icons}
                />
              </TouchableOpacity>
              <Text style={styles.titleModalBottom}>Daftar Produk</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderBrandList()}</ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.75 * height,
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
  textBrandName: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  subTitle: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  productNameText: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.4),
    color: '#4f4f4f',
    lineHeight: 14
  },
  priceTextRed: {
    color: '#f0444c',
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.MontserratSemiBold
  },
  priceTextCross: {
    color: '#bdbdbd',
    textDecorationLine: 'line-through',
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.MontserratMedium,
    marginRight: 10
  },
  textPcs: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.4),
    color: '#4f4f4f'
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
    resizeMode: 'contain',
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  /**for content */
  boxPerContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
  },
  /**close */
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  closeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '15%',
    height: '100%'
  },
  icons: {
    width: 24,
    height: 24
  }
});

const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(mapStateToProps, {})(ModalBottomListProduct);
