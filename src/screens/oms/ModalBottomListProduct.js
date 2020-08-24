import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Text
} from '../../library/reactPackage'
import {
  ModalBottomType4,
  StatusBarRedOP50
} from '../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomListProduct extends Component {
  constructor(props) {
    super(props);
  }
  /** === RENDER SKU PRICE === */
  renderPriceProduct(item) {
    return (
      <View>
        <Text style={Fonts.type36}>{MoneyFormat(item.grossPrice)}</Text>
      </View>
    );
  }
  /** === RENDER CONTENT ITEM SKU LIST === */
  renderProductList(item) {
    return item.map((itemProduct, index) => {
      return (
        <View key={index}>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          <View style={styles.boxContentProductList}>
            <View
              style={{
                marginRight: 8,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{
                  uri: itemProduct.catalogue.catalogueImages[0].imageUrl
                }}
                style={GlobalStyle.image70Contain}
              />
            </View>
            <View
              style={{
                width: '70%',
                justifyContent: 'space-between'
              }}
            >
              <View>
                <Text style={[Fonts.type16, { textTransform: 'capitalize' }]}>
                  {itemProduct.catalogue.name}
                </Text>
              </View>
              <View style={{ marginVertical: 5 }}>
                {this.renderPriceProduct(itemProduct)}
              </View>
              <View>
                <Text style={Fonts.type10}>x{itemProduct.qty} Pcs</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }
  /** === RENDER CONTENT ITEM BRAND LIST === */
  renderBrandList() {
    return this.props.data.orderBrands.map((item, index) => {
      return (
        <View key={index}>
          <View style={{ paddingHorizontal: 16, marginVertical: 10 }}>
            <Text style={Fonts.type48}>{item.brand.name}</Text>
          </View>
          <View>{this.renderProductList(item.orderBrandCatalogues)}</View>
          <View style={{ paddingBottom: 0.1 * height }} />
        </View>
      );
    });
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderBrandList()}</ScrollView>
          </View>
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        title={'Daftar Produk'}
        open={this.props.open}
        close={this.props.close}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.7 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 0.01 * height
  },
  contentContainer: {
    flex: 1
  },
  /**for content */
  boxContentProductList: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  boxHeaderContent: {
    flex: 1
  }
});

export default ModalBottomListProduct;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
