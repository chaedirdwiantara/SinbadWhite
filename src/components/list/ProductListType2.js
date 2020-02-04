/**
 * this product list for history order
 */
import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'react-native-text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { MoneyFormat } from '../../helpers/NumberFormater';

class ProductListType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultShowProduct: 2,
      showMore: false,
      totalSku: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    let totalSku = 0;
    this.props.data.forEach(item => {
      item.orderBrandCatalogues.forEach(itemProduct => {
        totalSku++;
      });
    });
    this.setState({ totalSku });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** ITEM LIST PRODUCT */
  renderListProductItem(item) {
    return (
      <View style={[GlobalStyle.shadowForBox5, styles.boxListProductItem]}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            flexDirection: 'row'
          }}
        >
          <View>
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: item.catalogue.catalogueImages[0].imageUrl
              }}
              style={[GlobalStyle.image60, { borderRadius: 5 }]}
            />
          </View>
          <View
            style={{ justifyContent: 'space-between', flex: 1, paddingLeft: 8 }}
          >
            <Text style={[Fonts.type10, { textTransform: 'capitalize' }]}>
              {item.catalogue.name}
            </Text>
            <Text style={Fonts.type10}>
              {MoneyFormat(item.grossPrice / item.qty)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              width: '20%',
              alignItems: 'flex-end'
            }}
          >
            <Text style={Fonts.type10}>{item.qty} Pcs</Text>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View style={{ paddingHorizontal: 10, paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            Total Harga: {MoneyFormat(item.grossPrice)}
          </Text>
        </View>
      </View>
    );
  }
  /** ITEM LIST PRODUCT FULL */
  renderListProductContentFull(item, index) {
    return <View key={index}>{this.renderListProductItem(item)}</View>;
  }
  /** ITEM LIST PRODUCT LIMIT */
  renderListProductContentLimit(item, index, indexCounter) {
    return indexCounter <= this.state.defaultShowProduct ? (
      <View key={index}>{this.renderListProductItem(item)}</View>
    ) : (
      <View key={index} />
    );
  }
  /** CONTENT LIST PRODUCT */
  renderListProductContent(itemProduct, indexCounter) {
    return itemProduct.map((item, index) => {
      return this.state.showMore
        ? this.renderListProductContentFull(item, index)
        : this.renderListProductContentLimit(item, index, indexCounter++);
    });
  }
  /** LIST ALL PRODUCT */
  renderListProduct(itemBrand, indexCounter) {
    return itemBrand.map((item, index) => {
      indexCounter++;
      return (
        <View key={index}>
          {this.renderListProductContent(
            item.orderBrandCatalogues,
            indexCounter
          )}
        </View>
      );
    });
  }
  /** RENDER SEE MOTE */
  renderButtonSeeMore() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ showMore: !this.state.showMore })}
      >
        {this.state.showMore ? (
          <View style={styles.boxSeeMore}>
            <MaterialIcons name="keyboard-arrow-up" size={24} />
            <Text style={Fonts.type10}>Lihat Ringkas</Text>
          </View>
        ) : (
          <View style={styles.boxSeeMore}>
            <MaterialIcons name="keyboard-arrow-down" size={24} />
            <Text style={Fonts.type10}>Lihat Lebih</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
  /** MAIN */
  render() {
    return (
      <View style={styles.boxListProduct}>
        {this.renderListProduct(this.props.data, 0)}
        {this.state.totalSku > 2 ? this.renderButtonSeeMore() : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxListProduct: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  boxSeeMore: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxListProductItem: {
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 4
  }
});

export default ProductListType2;
