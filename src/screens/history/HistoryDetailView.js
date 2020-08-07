import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  RefreshControl
} from '../../library/reactPackage';
import {
  bindActionCreators,
  moment,
  MaterialIcon,
  connect
} from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ProductListType2,
  Address,
  ModalConfirmation,
  LoadingPage
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import ModalChangePaymentMethod from './ModalChangePaymentMethod';
import ModalWarning from '../../components/modal/ModalWarning';
import ModalTAndR from './ModalTAndC';
import HistoryDetailPaymentInformation from './HistoryDetailPaymentInformation'
import HistoryDetailPayment from './HistoryDetailPayment';
import CallCS from '../../screens/global/CallCS';

class HistoryDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCS: false,
      openModalCancelOrderConfirmation: false,
      section: this.props.navigation.state.params.section,
      storeId: this.props.navigation.state.params.storeId
    };
  }
   /* ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle:
        params.section === 'payment' ? 'Detail Tagihan' : 'Detail Pesanan',
      headerTitleStyle: [
        Fonts.type35,
        {
          textAlign: 'center',
          flex: 1
        }
      ],
      headerTintColor: masterColor.backButtonWhite,
      headerStyle: {
        elevation: 0,
        backgroundColor: masterColor.mainColor
      },
      headerRight: <View />,
      gesturesEnabled: false
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (
      prevProps.history.dataEditHistory !== this.props.history.dataEditHistory
    ) {
      if (this.props.history.dataEditHistory !== null) {
        this.props.historyGetDetailProcess(
          this.props.history.dataEditHistory.id
        );
        this.props.historyGetReset();
        this.getHistory();
      }
    }
  }
  /** REFRESH LIST HISTORY AFTER EDIT HISTORY STATUS */
  getHistory() {
    this.props.historyGetProcess({
      loading: true,
      userId: this.props.user.id,
      storeId: this.props.merchant.selectedMerchant.storeId,
      page: 0,
      statusOrder: '',
      statusPayment: '',
      dateGte: '',
      dateLte: '',
      portfolioId: [],
      search: ''
    });
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'close':
        this.setState({ openModalCS: false });
        break;
      default:
        break;
    }
  }
  /** CHECK STATUS */
  checkStatus() {
    let data = null;
    if (this.props.history.dataDetailHistory.billing.paymentChannelId === 2 && this.props.history.dataDetailHistory.statusPayment === "waiting_for_payment" && moment.utc(new Date()).local() > moment.utc(this.props.history.dataDetailHistory.billing.expiredPaymentTime).local()){
      return {
      title : 'Tidak Dibayar',
      desc: 'Pesanan Tidak Dibayar'
      }
    } else if (this.state.section === 'payment') {
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
  /** CANCEL ORDER */
  cancelOrder() {
    this.props.historyEditProcess({
      parcelId: this.props.history.dataDetailHistory.id,
      params: {
        status: 'cancel'
      }
    });
  }
  /** ORDER VIA */
  orderVia() {
    if (this.props.history.dataDetailHistory.order !== null) {
      switch (this.props.history.dataDetailHistory.order.orderVia) {
        case null:
          return '-';
        case 'sales':
          return 'Sales Rep';
        case 'store':
          return 'Toko';
        default:
          break;
      }
    }
    return '-';
  }
  /** === ON REFRESH === */
  onRefresh = () => {
    this.props.historyGetDetailProcess(this.props.history.dataDetailHistory.id);
    /** SET PAGE REFRESH */
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 10);
  };
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER VOUCHER LIST ==== */
  renderVoucherList(data) {
    return data.map((item, index) => {
      return (
        <View key={index}>
          {this.renderContentListGlobal(
            item.voucherValue !== null
              ? item.voucherName
              : `${item.catalogueName} (${item.voucherQty} Pcs)`,
            item.voucherValue !== null
              ? `- ${MoneyFormat(item.voucherValue)}`
              : 'FREE',
            true
          )}
        </View>
      );
    });
  }
  /** === RENDER PROMO LIST ==== */
  renderPromoList(data) {
    return data.map((item, index) => {
      return (
        <View key={index}>
          {this.renderContentListGlobal(
            item.promoValue !== null
              ? item.promoName
              : `${item.catalogueName} (${item.promoQty} Pcs)`,
            item.promoValue !== null
              ? `- ${MoneyFormat(item.promoValue)}`
              : 'FREE',
            true
          )}
        </View>
      );
    });
  }
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
          <Text style={green ? Fonts.type51 : Fonts.type17}>{value}</Text>
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
      <View>
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Catatan Pesanan</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            {this.renderContentListGlobal('Order Via', this.orderVia())}
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
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderProductList() {
    return (
      <View style={GlobalStyle.shadowForBox}>
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
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
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
                  address={
                    this.props.history.dataDetailHistory.order.store.address
                  }
                  urban={this.props.history.dataDetailHistory.order.store.urban}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /** RENDER PAYMENT INFORMATION */
  renderPaymentInformation(){
    if (this.props.history.dataDetailHistory !== null) {
      return (
        <HistoryDetailPaymentInformation
          data={this.props.history.dataDetailHistory}
          section={this.state.section}
        />
      );
    }
  }
    // return (
    //   <View>
    //     <View style={GlobalStyle.boxPadding} />
    //     <View style={GlobalStyle.shadowForBox}>
    //       <View
    //         style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
    //       >
    //         <Text style={Fonts.type48}>Informasi Pembayaran</Text>
    //       </View>
    //       <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
    //       <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
    //         {this.renderContentListGlobal(
    //           'Tipe Pembayaran',
    //           this.props.history.dataDetailHistory.paymentTypeSupplierMethod !==
    //             null
    //             ? this.props.history.dataDetailHistory.paymentTypeSupplierMethod
    //                 .paymentTypeSupplier.paymentType.name
    //             : '-'
    //         )}
    //         {this.renderContentListGlobal(
    //           'Metode Pembayaran',
    //           this.props.history.dataDetailHistory.paymentTypeSupplierMethod !==
    //             null
    //             ? this.props.history.dataDetailHistory.paymentTypeSupplierMethod
    //                 .paymentMethod.name
    //             : '-'
    //         )}
    //         {this.renderContentListGlobal(
    //           `Total Barang (${this.totalSKU()})`,
    //           MoneyFormat(this.props.history.dataDetailHistory.parcelGrossPrice)
    //         )}
    //         {/* {this.renderContentListGlobal(
    //           'Potongan Harga',
    //           `- ${MoneyFormat(
    //             this.props.history.dataDetailHistory.parcelPromo
    //           )}`,
    //           true
    //         )} */}
    //         {this.renderPromoList(
    //           this.props.history.dataDetailHistory.promoList
    //         )}
    //         {this.renderVoucherList(
    //           this.props.history.dataDetailHistory.voucherList
    //         )}
    //         {this.renderContentListGlobal('Ongkos Kirim', MoneyFormat(0))}
    //         {this.renderContentListGlobal(
    //           'PPN 10%',
    //           MoneyFormat(this.props.history.dataDetailHistory.parcelTaxes)
    //         )}
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             marginTop: 16
    //           }}
    //         >
    //           <View style={{ flex: 1, alignItems: 'flex-start' }}>
    //             <Text style={Fonts.type50}>Sub Total</Text>
    //           </View>
    //           <View style={{ flex: 1, alignItems: 'flex-end' }}>
    //             <Text style={Fonts.type21}>
    //               {MoneyFormat(
    //                 this.props.history.dataDetailHistory.parcelFinalPrice
    //               )}
    //             </Text>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // );
  // }
/** RENDER DETAIL PAYMENT */
renderDetailPayment() {
  if (this.props.history.dataDetailHistory !== null) {
    return(
      <HistoryDetailPayment
        data={this.props.history.dataDetailHistory}
        section={this.state.section}
      />)
    
  }
}

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.renderHeaderStatus()}
          {this.state.section === 'payment' ? (
            this.renderDetailPayment()
          ) : (
            <View />
          )}
          {this.renderRingkasanPesanan()}
          {this.renderProductList()}
          {this.renderDeliveryDetail()}
          {this.state.section === 'order' ? (
            this.renderPaymentInformation()
          ) : (
            <View />
          )}
           {/* {this.state.section === 'payment' ? (
            this.renderSelectPaymentMethod()
          ) : (
            <View />
          )} */}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </View>
    );
  }
  /**
   * ====================
   * RENDER MODAL
   * ====================
   */
  /** CALL CS */
  renderModalCallCS() {
    return this.state.openModalCS ? (
      <View>
        <CallCS
          statusBarRed
          open={this.state.openModalCS}
          close={() => this.setState({ openModalCS: false })}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** RENDER CANCEL BUTTON */
  renderCancelButton() {
    return (
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() =>
          this.setState({ openModalCancelOrderConfirmation: true })
        }
      >
        <Text style={Fonts.type11}>Batal</Text>
      </TouchableOpacity>
    );
  }
  /** RENDER BOTTOM ACTION */
  renderBottomAction() {
    return (
      <View style={styles.boxBottomAction}>
        <TouchableOpacity onPress={() => this.setState({ openModalCS: true })}>
          <Text style={Fonts.type22}>Butuh Bantuan ?</Text>
        </TouchableOpacity>
        {this.state.section === 'order' &&
        this.props.history.dataDetailHistory.status === 'confirm' ? (
          this.renderCancelButton()
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /**
   * ======================
   * MODAL
   * ======================
   */
  renderModalCancelOrderConfirmation() {
    return (
      <View>
        {this.state.openModalCancelOrderConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalCancelOrderConfirmation}
            content={'Yakin ingin membatalkan pesanan Anda ?'}
            type={'okeNotRed'}
            okText={'Ya'}
            cancelText={'Tidak'}
            ok={() => {
              this.setState({ openModalCancelOrderConfirmation: false });
              this.cancelOrder();
            }}
            cancel={() =>
              this.setState({ openModalCancelOrderConfirmation: false })
            }
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {!this.props.history.loadingDetailHistory &&
        !this.props.history.loadingEditHistory &&
        this.props.history.dataDetailHistory !== null ? (
          <View style={styles.mainContainer}>
            {this.renderBackground()}
            {this.renderContent()}
            {this.renderBottomAction()}
          </View>
        ) : (
          <LoadingPage />
        )}
        {/* modal */}
        {this.renderModalCallCS()}
        {this.renderModalCancelOrderConfirmation()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  backgroundRed: {
    width: '100%',
    backgroundColor: masterColor.mainColor,
    position: 'absolute',
    zIndex: 0,
    height: 50
  },
  boxBottomAction: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    borderTopColor: masterColor.fontBlack10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64
  },
  buttonCancel: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4
  }
});

const mapStateToProps = ({ history, user, merchant }) => {
  return { history, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailView);

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