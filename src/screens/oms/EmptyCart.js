import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../utils/Fonts';
import Recomendation from '../home/Recomendation';
import css from '../../config/css.json';
import { moveToProductCategory } from '../../helpers/Navigation';

const { width, height } = Dimensions.get('window');

const shadowStyle = {
  shadowColor: '#777777',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3
};

class EmptyCart extends Component {
  goToProductCategory() {
    moveToProductCategory(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerEmptyCart}>
          <View style={styles.imageBox}>
            <Image source={require('../../assets/images/shoping_cart.png')} style={styles.image} />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.textTitle}>Keranjang Kosong</Text>
            <Text style={styles.textSubTitle}>
              Silahkan tambahkan produk yang ingin dibeli di keranjang
            </Text>
          </View>
          <View style={styles.buttonBox}>
            <Button
              onPress={() => this.goToProductCategory()}
              title="Tambah Produk"
              titleStyle={styles.titleButton}
              buttonStyle={styles.button}
            />
          </View>
        </View>
        <View style={styles.containerProductList}>
          <Recomendation style={shadowStyle} componentId={this.props.componentId} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerEmptyCart: {
    height: 0.55 * height,
    justifyContent: 'center'
  },
  containerProductList: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },
  textBox: {
    alignItems: 'center',
    paddingRight: '20%',
    paddingLeft: '20%'
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%'
  },
  image: {
    resizeMode: 'contain',
    position: 'relative',
    height: '70%',
    width: '65%'
  },
  textTitle: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(2.2),
    color: '#333333'
  },
  textSubTitle: {
    marginTop: '7%',
    textAlign: 'center',
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.7),
    color: '#4f4f4f'
  },
  titleButton: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  button: {
    backgroundColor: css.mainColor,
    borderRadius: 10,
    width: 0.7 * width,
    height: 0.05 * height,
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  }
});

const mapStateToProps = ({ cart }) => {
  return cart;
};

export default connect(
  mapStateToProps,
  { moveToProductCategory }
)(EmptyCart);
