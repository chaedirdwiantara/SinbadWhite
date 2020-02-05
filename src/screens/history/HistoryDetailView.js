import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import ProductListType2 from '../../components/list/ProductListType2';
import Address from '../../components/Address';
import { MoneyFormat } from '../../helpers/NumberFormater';
import NavigationService from '../../navigation/NavigationService';

class HistoryDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.navigation.state.params.section
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** CHECK STATUS */
  checkStatus() {
    let data = null;
    if (this.state.section === 'payment') {
      if (this.props.history.dataGetPaymentStatus !== null) {
        data = this.props.history.dataGetPaymentStatus.find(
          itemPayment =>
            itemPayment.status ===
            this.props.history.dataDetailHistory.statusPayment
        );
      }
    } else {
      if (this.props.history.dataGetOrderStatus !== null) {
        data = this.props.history.dataGetOrderStatus.find(
          itemOrder =>
            itemOrder.status === this.props.history.dataDetailHistory.status
        );
      }
    }
    return {
      title: data !== null ? data.title : '-',
      desc: data !== null ? data.detail : '-'
    };
  }
  /** CALCULATE TOTAL SKU */
  totalSKU() {
    let totalProduct = 0;
    this.props.history.dataDetailHistory.orderBrands.forEach(item => {
      item.orderBrandCatalogues.map(itemProduct => {
        totalProduct = totalProduct + itemProduct.qty;
      });
    });
    return totalProduct;
  }
  /** GO TO LOG */
  goToDetailStatus() {
    NavigationService.navigate('HistoryDetailStatusView');
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT LIST GLOBAL */
  renderContentListGlobal(key, value, green) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={green ? Fonts.type51 : Fonts.type17}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={Fonts.type17}>{value}</Text>
        </View>
      </View>
    );
  }
  /** RENDER HEADER STATUS */
  renderHeaderStatus() {
    return (
      <View style={{ margin: 16 }}>
        <TouchableWithoutFeedback onPress={() => this.goToDetailStatus()}>
          <View
            style={[
              GlobalStyle.shadowForBox,
              {
                padding: 16,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            ]}
          >
            <View>
              <Text style={Fonts.type48}>
                Status: {this.checkStatus().title}
              </Text>
              <Text style={[Fonts.type59, { marginTop: 8 }]}>
                {this.checkStatus().desc}
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <MaterialIcon
                name="chevron-right"
                color={masterColor.fontBlack60}
                size={24}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  /** RENDER RINGKASAN PESANAN */
  renderRingkasanPesanan() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Ringkasan Pesanan</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {this.renderContentListGlobal(
            'Tanggal Pembelian',
            moment(
              new Date(this.props.history.dataDetailHistory.createdAt)
            ).format('DD MMM YYYY HH:mm:ss')
          )}
          {this.renderContentListGlobal(
            this.props.history.dataDetailHistory.deliveredDate !== null
              ? 'Tanggal Pengiriman'
              : 'Estimasi Tanggal Pengiriman',
            this.props.history.dataDetailHistory.deliveredDate !== null
              ? moment(
                  new Date(this.props.history.dataDetailHistory.deliveredDate)
                ).format('DD MMM YYYY HH:mm:ss')
              : moment(
                  new Date(
                    this.props.history.dataDetailHistory.estDeliveredDate
                  )
                ).format('DD MMM YYYY HH:mm:ss')
          )}
          {this.renderContentListGlobal(
            this.props.history.dataDetailHistory.dueDate !== null
              ? 'Jatuh Tempo'
              : 'Estimasi Jatuh Tempo',
            this.props.history.dataDetailHistory.dueDate !== null
              ? moment(
                  new Date(this.props.history.dataDetailHistory.dueDate)
                ).format('DD MMM YYYY HH:mm:ss')
              : moment(
                  new Date(this.props.history.dataDetailHistory.estDueDate)
                ).format('DD MMM YYYY HH:mm:ss')
          )}
        </View>
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderProductList() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Daftar Produk</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
        <ProductListType2
          data={this.props.history.dataDetailHistory.orderBrands}
        />
      </View>
    );
  }
  /** RENDER DELIVERY DETAIL */
  renderDeliveryDetail() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Detail Pengiriman</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {this.renderContentListGlobal('Kurir Pengiriman', 'Self Delivery')}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type17}>Alamat Pengiriman</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Address
                position={'right'}
                font={Fonts.type17}
                address={this.props.history.dataDetailHistory.store.address}
                urban={this.props.history.dataDetailHistory.store.urban}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderPaymentInformation() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Informasi Pembayaran</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {this.renderContentListGlobal(
            'Tipe Pembayaran',
            this.props.history.dataDetailHistory.paymentTypeSupplierMethod
              .paymentTypeSupplier.paymentType.name
          )}
          {this.renderContentListGlobal(
            'Metode Pembayaran',
            this.props.history.dataDetailHistory.paymentTypeSupplierMethod
              .paymentMethod.name
          )}
          {this.renderContentListGlobal(
            `Total Barang (${this.totalSKU()})`,
            MoneyFormat(
              this.props.history.dataDetailHistory.parcelDetails.totalGrossPrice
            )
          )}
          {this.renderContentListGlobal('Potongan Harga', MoneyFormat(0), true)}
          {this.renderContentListGlobal('Ongkos Kirim', MoneyFormat(0))}
          {this.renderContentListGlobal(
            'PPN 10%',
            MoneyFormat(this.props.history.dataDetailHistory.parcelDetails.tax)
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={Fonts.type50}>Sub Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={Fonts.type21}>
                {MoneyFormat(
                  this.props.history.dataDetailHistory.parcelDetails
                    .totalNettPrice
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView>
          {this.renderHeaderStatus()}
          {this.renderRingkasanPesanan()}
          {this.renderProductList()}
          {this.renderDeliveryDetail()}
          {this.renderPaymentInformation()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </View>
    );
  }
  /** RENDER BOTTOM ACTION */
  renderBottomAction() {
    return (
      <View style={{ backgroundColor: 'red', bottom: 0 }}>
        <Text>llalalala</Text>
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderBackground()}
        {this.renderContent()}
        {this.renderBottomAction()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    width: '100%',
    height: '100%'
    // position: 'absolute',
    // zIndex: 1000
  },
  backgroundRed: {
    backgroundColor: masterColor.mainColor,
    height: 50
  }
});

const mapStateToProps = ({ history }) => {
  return { history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailView);
