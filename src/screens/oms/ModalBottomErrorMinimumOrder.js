import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import Fonts from '../../helpers/GlobalFont';
import { MoneyFormat } from '../../helpers/NumberFormater';
import ProductListType1 from '../../components/list/ProductListType1';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';
import ModalBottomType1 from '../../components/modal_bottom/ModalBottomType1';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomErrorMinimumOrder extends Component {
  /**
   * ========================
   * RENDER VIEW
   * ========================
   */
  /** === ITEM PRODUCT SECTION === */
  renderProductSection(data) {
    return (
      <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
        <ProductListType1 data={data} />
      </View>
    );
  }
  /** === RENDER DATA ==== */
  renderData() {
    return this.props.oms.dataOmsGetCheckoutItem.orderParcels.map(
      (item, index) => {
        return (
          <View key={index}>
            <View style={styles.boxInvoiceName}>
              <View style={{ alignItems: 'center' }}>
                <Text style={Fonts.type42}>{item.invoiceGroup.name}</Text>
              </View>
              <View>
                {this.props.oms.errorOmsConfirmOrder.data.errorData.find(
                  itemErrorConfirmOrder =>
                    itemErrorConfirmOrder.parcelId === parseInt(item.id, 10)
                ) === undefined ? (
                  <MaterialCommunityIcons
                    color={masterColor.fontGreen50}
                    name={'check-circle'}
                    size={24}
                  />
                ) : (
                  <MaterialCommunityIcons
                    color={masterColor.mainColor}
                    name={'close-circle'}
                    size={24}
                  />
                )}
              </View>
            </View>
            <View style={styles.lines} />
            {this.renderProductSection(item.orderBrands)}
            <View style={styles.boxMinPrice}>
              <Text style={Fonts.type56}>
                Total Pembelian : {MoneyFormat(item.parcelNettPrice)}
              </Text>
              <Text style={Fonts.type56}>
                Min. Transaksi : {MoneyFormat(item.invoiceGroup.minimumOrder)}
              </Text>
            </View>
            <View style={styles.lines} />
          </View>
        );
      }
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            white
            disabled={false}
            loading={false}
            onPress={this.props.backToCart}
            title={'Tinjau Keranjang'}
            borderRadius={4}
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            disabled={!this.props.oms.errorOmsConfirmOrder.data.confirmOrder}
            loading={false}
            onPress={this.props.confirmation}
            title={'Konfirmasi'}
            borderRadius={4}
          />
        </View>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <Text style={[Fonts.type59, { textAlign: 'center' }]}>
            Maaf, order Anda dibawah minimum pembelian. Silahkan tinjau
            keranjang kembali, atau tap buat pesanan untuk melanjutkan pesanan
            Anda
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>{this.renderData()}</ScrollView>
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        title={'Konfirmasi Min Pembelian'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.6 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    flex: 1
  },
  boxInvoiceName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  boxMinPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ModalBottomErrorMinimumOrder);
