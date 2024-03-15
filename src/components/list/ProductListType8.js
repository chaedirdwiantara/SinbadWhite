/**
 * - this product list for last order at MerchantHomeView
 */
import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { ImageKit } from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';

class ProductListType8 extends Component {
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
      totalBrand = totalBrand + item.order_brand_catalogues.length;
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
          <ImageKit
            defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
            uri={item.image_url}
            style={GlobalStyle.image54Contain}
          />
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** LIST ALL PRODUCT */
  renderListProductImage(itemBrand, indexCounter) {
    return (
      <View key={indexCounter} style={{ flexDirection: 'row' }}>
        {this.renderListProductImageContent(
          itemBrand[indexCounter]?.order_brand_catalogues?.Catalogues
            ?.catalogue_images,
          indexCounter
        )}
      </View>
    );
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
    backgroundColor: Color.fontBlack05,
    justifyContent: 'space-between'
  }
});

export default ProductListType8;
