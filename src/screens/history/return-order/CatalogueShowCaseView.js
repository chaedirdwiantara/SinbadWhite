import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  Text
} from '../../../library/reactPackage';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';

class CatalogueShowCaseView extends Component {
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
    let totalBrand = itemBrand.imageUrl.length;
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
            defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
            source={{
              uri: item
            }}
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
        {this.renderListProductImageContent(itemBrand.imageUrl, indexCounter)}
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

export default CatalogueShowCaseView;

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
