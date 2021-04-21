import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text
} from '../../library/reactPackage'
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import {
  ModalBottomType4,
  StatusBarRedOP50
} from '../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomParcelDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      openTotal: false,
      dataPayment: this.props.dataPayment
    };
  }

  renderOpenTotal() {
    return (
      <View style={styles.boxOpenTotal}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={Fonts.type17}>Total Produk</Text>
          </View>
          <View>
            <Text style={Fonts.type17}>
              {MoneyFormat(this.state.data.parcelGrossPrice)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={Fonts.type51}>Total Potongan Harga</Text>
          </View>
          <View>
            <Text style={Fonts.type51}>
              - {MoneyFormat(this.state.data.parcelPromo)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}
        >
          <View>
            <Text style={Fonts.type17}>PPN 10%</Text>
          </View>
          <View>
            <Text style={Fonts.type17}>
              {MoneyFormat(this.state.data.parcelTaxes)}
            </Text>
          </View>
        </View>
        { 
          this.state.dataPayment.paymentMethodDetail !== null ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <View>
                <Text style={Fonts.type17}>Biaya Layanan</Text>
              </View>
              <View>
                <Text style={Fonts.type17}>
                  {MoneyFormat(this.state.dataPayment.paymentMethodDetail.totalFee)}
                </Text>
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }

  renderTotal() {
    return (
      <TouchableOpacity
        style={styles.boxTotal}
        onPress={() => this.setState({ openTotal: !this.state.openTotal })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.state.openTotal ? (
            <MaterialIcon name="keyboard-arrow-up" size={24} />
          ) : (
            <MaterialIcon name="keyboard-arrow-down" size={24} />
          )}

          <Text style={[Fonts.type7, { marginLeft: 5 }]}>Total</Text>
        </View>
        <View>
          <Text style={Fonts.type7}>
            {MoneyFormat(this.state.data.parcelFinalPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderProductListContent(brand) {
    return brand.orderBrandCatalogues.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 16
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={Fonts.type17}>
              {item.catalogue.name} ({item.qty}pcs)
            </Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Text style={Fonts.type17}>
              {MoneyFormat(item.catalogueGrossPrice)}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderProductList() {
    return this.state.data.orderBrands.map((item, index) => {
      return <View key={index}>{this.renderProductListContent(item)}</View>;
    });
  }

  renderPromoList() {
    return this.state.data.promoList.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 16
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={Fonts.type51}>
              {item.promoValue !== null
                ? item.promoName
                : `${item.catalogueName} (${item.promoQty} Pcs)`}
            </Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Text style={Fonts.type51}>
              {item.promoValue !== null
                ? `- ${MoneyFormat(item.promoValue)}`
                : 'FREE'}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderProduct() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={Fonts.type7}>Produk</Text>
        </View>
        <View
          style={[GlobalStyle.lines, { marginLeft: 16, marginVertical: 10 }]}
        />
        <View>{this.renderProductList()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <View>
            <Text style={Fonts.type75}>Total Order</Text>
          </View>
          <View>
            <Text style={Fonts.type75}>
              {MoneyFormat(this.state.data.parcelGrossPrice)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderPromo() {
    return this.state.data.promoList.length > 0 ? (
      <View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={Fonts.type7}>Potongan Harga</Text>
        </View>
        <View
          style={[GlobalStyle.lines, { marginLeft: 16, marginVertical: 10 }]}
        />
        <View>{this.renderPromoList()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <View>
            <Text style={Fonts.type75}>Total Potongan</Text>
          </View>
          <View>
            <Text style={Fonts.type75}>
              - {MoneyFormat(this.state.data.parcelPromo)}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View>
        {this.renderProduct()}
        {this.renderPromo()}
        {this.state.openTotal ? this.renderOpenTotal() : <View />}
        {this.renderTotal()}
      </View>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderData()}</ScrollView>
          </View>
        </View>
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        title={'Detail Pesanan'}
        open={this.props.open}
        close={this.props.close}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.9 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  boxTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: masterColor.fontBlue100OP10
  },
  boxOpenTotal: {
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 5,
    backgroundColor: masterColor.fontBlue100OP10
  },
  contentContainer: {
    flex: 1
  }
});

export default ModalBottomParcelDetail;

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
