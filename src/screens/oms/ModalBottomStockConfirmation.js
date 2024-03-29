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
  connect
} from '../../library/thirdPartyPackage'
import {
  ModalBottomType1,
  StatusBarRedOP50
} from '../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import { Color } from '../../config'

const { height } = Dimensions.get('window');

class ModalBottomStockConfirmation extends Component {
  /** === RENDER IMAGE === */
  renderImage(item) {
    return (
      <View
        style={{
          paddingRight: 16,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
          source={{
            uri: item.catalogue.catalogueImages[0].imageUrl
          }}
          style={[
            GlobalStyle.image54Contain,
            {
              opacity:
                item.errorCode === 'ERR-STOCK' || item.errorCode === 'ERR-PRICE'
                  ? 1
                  : 0.5
            }
          ]}
        />
      </View>
    );
  }
  /** === RENDER SKU NAME === */
  renderSkuName(item) {
    return (
      <View>
        <Text
          style={[
            Fonts.type16,
            {
              opacity:
                item.errorCode === 'ERR-STOCK' || item.errorCode === 'ERR-PRICE'
                  ? 1
                  : 0.5,
              textTransform: 'capitalize'
            }
          ]}
        >
          {item.catalogue.name}
        </Text>
      </View>
    );
  }
  /** === RENDER SKU INFO === */
  renderSkuInfo(info) {
    return (
      <View style={{ marginTop: 8 }}>
        <Text style={[Fonts.type8, { opacity: 0.5 }]}>{info}</Text>
      </View>
    );
  }
  /** === RENDER CHANGE STOCK === */
  renderPerubahanStockContent() {
    return this.props.oms.errorOmsGetCheckoutItem.data.map((item, index) => {
      return item.errorCode === 'ERR-STOCK' ? (
        <View style={{ flexDirection: 'row' }} key={index}>
          {this.renderImage(item)}
          <View style={styles.boxNameAndInfo}>
            {this.renderSkuName(item)}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <Text style={Fonts.type83}>
                {item.requestStock} {item.catalogue.minQtyType}
              </Text>
              <Image
                source={require('../../assets/icons/global/arrow_right.png')}
                style={{ height: 18, width: 18, marginHorizontal: 5 }}
              />
              <Text style={Fonts.type83}>
                {item.suggestedStock} {item.catalogue.minQtyType}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** === RENDER CHANGE PRICE === */
  renderPerubahanHargaContent() {
    return this.props.oms.errorOmsGetCheckoutItem.data.map((item, index) => {
      return item.errorCode === 'ERR-PRICE' ? (
        <View style={{ flexDirection: 'row' }} key={index}>
          {this.renderImage(item)}
          <View style={styles.boxNameAndInfo}>
            {this.renderSkuName(item)}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8
              }}
            >
              <Text style={Fonts.type83}>
                {MoneyFormat(item.oldCatalogueGrossPrice)}
              </Text>
              <Image
                source={require('../../assets/icons/global/arrow_right.png')}
                style={{ height: 18, width: 18, marginHorizontal: 5 }}
              />
              <Text
                style={
                  item.oldCatalogueGrossPrice < item.newCatalogueGrossPrice
                    ? Fonts.type29
                    : Fonts.type95
                }
              >
                {MoneyFormat(item.newCatalogueGrossPrice)}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** === RENDER BARANG HABIS === */
  renderProductErrorBarangHabis() {
    return this.props.oms.errorOmsGetCheckoutItem.data.map((item, index) => {
      return item.errorCode === 'ERR-RUN-OUT' ? (
        <View style={{ flexDirection: 'row' }} key={index}>
          {this.renderImage(item)}
          <View style={styles.boxNameAndInfo}>
            {this.renderSkuName(item)}
            {this.renderSkuInfo('Stock Habis')}
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** === RENDER PRODUCT TIDAK TERSEDIA === */
  renderProductErrorTidakTersedia() {
    return this.props.oms.errorOmsGetCheckoutItem.data.map((item, index) => {
      return item.errorCode === 'ERR-STATUS' ||
        item.errorCode === 'ERR-WAREHOUSE' ? (
        <View style={{ flexDirection: 'row' }} key={index}>
          {this.renderImage(item)}
          <View style={styles.boxNameAndInfo}>
            {this.renderSkuName(item)}
            {this.renderSkuInfo('Produk Tidak Tersedia')}
          </View>
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** === RENDER PRODUCT CHANGE PRICE === */
  renderPerubahanHarga() {
    return this.props.oms.errorOmsGetCheckoutItem.data.find(
      item => item.errorCode === 'ERR-PRICE'
    ) !== undefined ? (
      <View>
        <View style={{ paddingTop: 10, paddingLeft: 16 }}>
          <Text style={Fonts.type42}>Perubahan Harga</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginTop: 8, marginLeft: 16 }]} />
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderPerubahanHargaContent()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER PRODUCT CHANGE STOCK === */
  renderPerubahanStock() {
    return this.props.oms.errorOmsGetCheckoutItem.data.find(
      item => item.errorCode === 'ERR-STOCK'
    ) !== undefined ? (
      <View>
        <View style={{ paddingTop: 10, paddingLeft: 16 }}>
          <Text style={Fonts.type42}>Perubahan Stock</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginTop: 8, marginLeft: 16 }]} />
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderPerubahanStockContent()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER PRODUCT HABIS === */
  renderBarangHabis() {
    return this.props.oms.errorOmsGetCheckoutItem.data.find(
      item => item.errorCode === 'ERR-RUN-OUT'
    ) !== undefined ? (
      <View>
        <View style={{ paddingTop: 10, paddingLeft: 16 }}>
          <Text style={Fonts.type42}>Barang Habis</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginTop: 8, marginLeft: 16 }]} />
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderProductErrorBarangHabis()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER PRODUCT TIDAK TERSEDIA === */
  renderProductTidakTersedia() {
    return this.props.oms.errorOmsGetCheckoutItem.data.find(
      item =>
        item.errorCode === 'ERR-STATUS' || item.errorCode === 'ERR-WAREHOUSE'
    ) !== undefined ? (
      <View>
        <View style={{ paddingTop: 10, paddingLeft: 16 }}>
          <Text style={Fonts.type42}>Produk Tidak Tersedia</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginTop: 8, marginLeft: 16 }]} />
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderProductErrorTidakTersedia()}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <Text style={[Fonts.type59, { textAlign: 'center' }]}>
            Beberapa informasi produk pada pesanan Anda telah diperbaharui mohon
            tinjau ulang keranjang dan coba lagi
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>
            {this.renderPerubahanHarga()}
            {this.renderPerubahanStock()}
            {this.renderBarangHabis()}
            {this.renderProductTidakTersedia()}
          </ScrollView>
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        onPress={this.props.close}
        title={'Konfirmasi'}
        buttonTitle={'Tinjau Keranjang'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.6 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    flex: 1
  },
  boxNameAndInfo: {
    width: '60%',
    justifyContent: 'space-between',
    paddingVertical: 13
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ModalBottomStockConfirmation);

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
