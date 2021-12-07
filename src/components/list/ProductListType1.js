/**
 * - this product list for history order
 * - modal minimum order
 * - oms checkout view
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
          <ImageKit
            defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
            uri={item.catalogue.catalogueImages[0].imageUrl}
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
          itemBrand[indexCounter].orderBrandCatalogues,
          indexCounter
        )}
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.boxListProduct,
          {
            borderRadius: this.props.borderRadius ? this.props.borderRadius : 0
          }
        ]}
      >
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
    justifyContent: 'space-between',
    borderRadius: 0
  }
});

export default ProductListType1;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
