/**
 * this product list for history order
 */
import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { ImageKit } from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';

class ProductListType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultShowProduct: 1,
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

  /** COUNTER TOTAL PRODUCT */
  counterProductMinus3(itemBrand) {
    let totalBrand = 0;
    itemBrand.map(item => {
      totalBrand = totalBrand + item.orderBrandCatalogues.length;
    });
    return totalBrand > 1 ? (
      <Text style={[Fonts.type38, { marginTop: 15 }]}>
        (+ {totalBrand - 1} Produk Lain)
      </Text>
    ) : (
      <Text>{''}</Text>
    );
  }

  /** ITEM LIST PRODUCT */
  renderListProductItem(item) {
    return (
      <View
        accessible={true}
        accessibilityLabel={
          this.props.accessibilityLabel ? this.props.accessibilityLabel : null
        }
        style={{
          flexDirection: 'row'
        }}
      >
        <View>
          <ImageKit
            defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
            uri={item.catalogue.catalogueImages[0].imageUrl}
            style={[GlobalStyle.image60, { borderRadius: 5 }]}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'column',
            paddingLeft: 8,
            width: '85%'
          }}
        >
          <Text
            style={[
              Fonts.type57,
              { textTransform: 'capitalize', marginBottom: 3 }
            ]}
          >
            {item.catalogue.name}
          </Text>
          <Text style={[Fonts.type57, { marginBottom: 3 }]}>
            {item.deliveredQty ? item.deliveredQty : item.qty} pcs
          </Text>
          <Text style={Fonts.type47}>
            {MoneyFormat(item.grossPrice * item.qty ?? 0)}
          </Text>
          {/* <Text style={Fonts.type47}>{MoneyFormat(0)}</Text> */}
          <View
            style={{
              justifyContent: 'center',
              paddingRight: 10
            }}
          >
            {this.counterProductMinus3(this.props.data)}
          </View>
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

  /** MAIN */
  render() {
    return (
      <View style={styles.boxListProduct}>
        {this.renderListProduct(this.props.data, 0)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxListProduct: {
    paddingTop: 8,
    paddingHorizontal: 16
  }
});

export default ProductListType2;

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
/**
 * createdBy:
 * createdDate:
 * updatedBy: Tyo
 * updatedDate: 30062021
 * updatedFunction:
 * -> change font type10 to type 11 in wording lihat lebih & lihat ringkas
 * -> change color black to red in icon arrow up & arrow down
 * -> modify text Total Harga using flexDirection = row and change font
 *
 */
