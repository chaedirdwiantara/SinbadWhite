/**
 * this product list for history order
 */
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class ProductListType1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** COUNTER TOTAL PRODUCT */
  counterProductMinus3(itemBrand) {
    let totalBrand = 0;
    itemBrand.map(item => {
      totalBrand = totalBrand + item.orderBrandCatalogues.length;
    });
    return totalBrand > 3 ? (
      <Text style={Fonts.type38}>(+ {totalBrand - 3} Produk Lain)</Text>
    ) : (
      <Text>{''}</Text>
    );
  }
  /** ITEM LIST PRODUCT */
  renderListProductImageContent(itemProduct, indexCounter) {
    return itemProduct.map((item, index) => {
      return indexCounter++ < 3 ? (
        <View key={index} style={{ paddingHorizontal: 5 }}>
          <Image
            defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
            source={{
              uri: item.catalogue.catalogueImages[0].imageUrl
            }}
            style={GlobalStyle.image60}
          />
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** LIST ALL PRODUCT */
  renderListProductImage(itemBrand, indexCounter) {
    return itemBrand.map((item, index) => {
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          {this.renderListProductImageContent(
            item.orderBrandCatalogues,
            indexCounter
          )}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.boxListProduct}>
        <View style={{ flexDirection: 'row' }}>
          {this.renderListProductImage(this.props.data, 0)}
        </View>

        <View style={{ justifyContent: 'center', paddingRight: 10 }}>
          {this.counterProductMinus3(this.props.data)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxListProduct: {
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: masterColor.fontBlack05,
    justifyContent: 'space-between'
  }
});

export default ProductListType1;
