import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from '../../../library/reactPackage';
import { AntDesignIcon } from '../../../library/thirdPartyPackage';
import { ImageKit } from '../../../library/component';
import { Color } from '../../../config';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';

class CollapsibleProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMore: true,
      totalProducts: this.props.brands.reduce(
        (total, currentBrand) =>
          total + currentBrand.orderBrandCatalogues.length,
        0
      )
    };
  }

  toggleSeeMore = () => {
    this.setState(prevState => ({ seeMore: !prevState.seeMore }));
  };

  render() {
    const { seeMore, totalProducts } = this.state;
    const { brands } = this.props;
    const products = brands.reduce(
      (accumulatedProducts, currentBrand) => [
        ...accumulatedProducts,
        ...currentBrand.orderBrandCatalogues
      ],
      []
    );
    const displayedProducts = seeMore ? products.slice(0, 1) : products;

    return (
      <View style={styles.container}>
        {displayedProducts.map((product, productIndex) => (
          <View
            key={productIndex}
            style={{
              ...styles.productItem,
              marginBottom: productIndex < displayedProducts.length - 1 ? 24 : 0
            }}
          >
            <ImageKit
              defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
              uri={product.catalogue.catalogueImages[0].imageUrl}
              style={GlobalStyle.image54Contain}
            />
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ marginBottom: 8, ...Fonts.type57 }}>
                {product.catalogue.name}
              </Text>
              <Text style={{ marginBottom: 8, ...Fonts.type57 }}>{`${
                product.qty
              } ${
                product.catalogue.catalogueUnit
                  ? product.catalogue.catalogueUnit.uom
                    ? product.catalogue.catalogueUnit.uom
                    : 'pcs'
                  : 'pcs'
              }`}</Text>
              <Text style={Fonts.type37}>
                {MoneyFormat(
                  typeof product.deliveredCatalogueFinalPrice === 'number'
                    ? product.deliveredCatalogueFinalPrice
                    : 0
                )}
              </Text>
            </View>
          </View>
        ))}
        {totalProducts > 1 && (
          <View>
            <TouchableWithoutFeedback onPress={this.toggleSeeMore}>
              <View style={styles.seeMoreButton}>
                <AntDesignIcon
                  name={seeMore ? 'down' : 'up'}
                  size={18}
                  color={Color.fontBlue50}
                  style={{ marginRight: 16 }}
                />
                <Text style={{ ...Fonts.type25, color: Color.fontBlue50 }}>
                  {seeMore
                    ? `${totalProducts - 1} Produk Lainnya`
                    : 'Sembunyikan Produk'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.endLine} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
  },
  seeMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  endLine: {
    borderColor: Color.fontBlack10,
    borderTopWidth: 1,
    flex: 1,
    marginTop: 16
  }
});

export default CollapsibleProductList;
