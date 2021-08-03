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
  LoadingPage,
  ButtonSingle
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import ModalChangePaymentMethod from './ModalChangePaymentMethod';
import ModalWarning from '../../components/modal/ModalWarning';
import ModalTAndR from './ModalTAndC';
import HistoryDetailPaymentInformation from './HistoryDetailPaymentInformation';
import HistoryDetailPayment from './HistoryDetailPayment';
import CallCS from '../../screens/global/CallCS';
import ModalBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import ModalBottomErrorResponsWhite from '../../components/error/ModalBottomErrorResponsWhite';
import {
  REFUNDED,
  WAITING_FOR_PAYMENT,
  PAY_NOW,
  PAID,
  WAITING_FOR_REFUND
} from '../../constants/paymentConstants';
import {
  CANCEL,
  CONFIRM,
  DELIVERED,
  DONE,
  PENDING_PAYMENT
} from '../../constants/orderConstants';
import HistoryBonusProductList from './product-list/HistoryBonusProductList';
import HistoryDeletedProductList from './product-list/HistoryDeletedProductList';
class HistoryDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCS: false,
      openModalCancelOrderConfirmation: false,
      section: this.props.navigation.state.params.section,
      storeId: this.props.navigation.state.params.storeId,
      openModalErrorGlobal: false,
      openPaymentMethod: false,
      selectedPaymentType: [],
      changePaymentMethod: null,
      modalTAndR: false,
      tAndRLoading: false,
      alreadyFetchTAndR: false,
      warningChangePayment: null,
      modalWarningChangePayment: false,
      openModalError: false
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
    if (
      prevProps.history.errorHistoryDetail !==
      this.props.history.errorHistoryDetail
    ) {
      if (
        this.props.history.errorHistoryDetail &&
        this.props.history.errorHistoryDetail.data !== null
      ) {
        if (
          this.props.history.errorHistoryDetail.code >= 400 &&
          this.props.history.errorHistoryDetail.code < 500
        ) {
          this.manageError();
        } else {
          this.setState({ openModalError: true });
        }
      }
    }
    if (
      prevProps.oms.dataOmsGetTermsConditions !==
      this.props.oms.dataOmsGetTermsConditions
    ) {
      if (this.props.oms.dataOmsGetTermsConditions !== null) {
        this.setState({
          tAndRDetail: this.props.oms.dataOmsGetTermsConditions.data
        });
      }
    }
    if (
      prevProps.oms.dataOmsGetTermsConditions !==
      this.props.oms.dataOmsGetTermsConditions
    ) {
      this.setState({ tAndRLoading: false, alreadyFetchTAndR: true });
      const tAndR = this.props.oms.dataOmsGetTermsConditions;
      if (tAndR !== null) {
        if (
          tAndR.data.paymentChannels == null &&
          tAndR.data.paymentTypes == null
        ) {
          this.renderChangePaymentMethod();
        } else {
          this.setState({ modalTAndR: true });
        }
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
      search: '',
      changePaymentMethod: null
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
    if (
      this.props.history.dataDetailHistory.billing.paymentChannelId === 2 &&
      this.props.history.dataDetailHistory.statusPayment ===
        'waiting_for_payment' &&
      moment.utc(new Date()).local() >
        moment
          .utc(this.props.history.dataDetailHistory.billing.expiredPaymentTime)
          .local()
    ) {
      return {
        title: 'Tidak Dibayar',
        desc: 'Pesanan Tidak Dibayar'
      };
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
      title: data ? data.title : '-',
      desc: data ? data.detail : '-'
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
          <Text style={green ? Fonts.type107 : Fonts.type9}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={green ? Fonts.type107 : Fonts.type9}>{value}</Text>
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
  /** RENDER INFORMASI PENGEMBALIAN */
  renderInformasiPengembalian() {
    const detailHistory = this.props.history.dataDetailHistory;
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Informasi Pengembalian</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />

          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            {this.renderContentListGlobal(
              'Total Pembayaran Pesanan',
              MoneyFormat(detailHistory.billing.totalPayment)
            )}
            {this.renderContentListGlobal(
              'Total Pembayaran Pengiriman',
              MoneyFormat(
                detailHistory.status === CANCEL
                  ? 0
                  : detailHistory.billing.deliveredTotalPayment
              )
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 16
              }}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={Fonts.type48}>Total Pengembalian</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={Fonts.type48}>
                  {MoneyFormat(
                    this.props.history.dataDetailHistory.billing.refundTotal
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /** RENDER RINGKASAN PESANAN */
  renderRingkasanPesanan() {
    const statusPayment = this.props.history.dataDetailHistory.statusPayment;
    return (
      <View>
        <View style={GlobalStyle.boxPadding} />
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
            {this.props.history.dataDetailHistory.status !== CANCEL &&
            statusPayment !== REFUNDED
              ? this.renderContentListGlobal(
                  this.props.history.dataDetailHistory.deliveredDate !== null
                    ? 'Tanggal Pengiriman'
                    : 'Estimasi Tanggal Pengiriman',
                  this.props.history.dataDetailHistory.deliveredDate !== null
                    ? moment(
                        new Date(
                          this.props.history.dataDetailHistory.deliveredDate
                        )
                      ).format('DD MMM YYYY HH:mm:ss')
                    : this.props.history.dataDetailHistory.estDeliveredDate !==
                      null
                    ? moment(
                        new Date(
                          this.props.history.dataDetailHistory.estDeliveredDate
                        )
                      ).format('DD MMM YYYY HH:mm:ss')
                    : '-'
                )
              : null}
            {this.props.history.dataDetailHistory.status !== CANCEL &&
            statusPayment !== REFUNDED &&
            this.props.history.dataDetailHistory.status !== DELIVERED &&
            this.props.history.dataDetailHistory.status !== DONE
              ? this.renderContentListGlobal(
                  this.props.history.dataDetailHistory.dueDate !== null
                    ? 'Jatuh Tempo'
                    : 'Estimasi Jatuh Tempo',
                  this.props.history.dataDetailHistory.dueDate !== null
                    ? moment(
                        new Date(this.props.history.dataDetailHistory.dueDate)
                      ).format('DD MMM YYYY HH:mm:ss')
                    : this.props.history.dataDetailHistory.estDueDate !== null
                    ? moment(
                        new Date(
                          this.props.history.dataDetailHistory.estDueDate
                        )
                      ).format('DD MMM YYYY HH:mm:ss')
                    : '-'
                )
              : null}
            {this.props.history.dataDetailHistory.status === CANCEL &&
            statusPayment !== REFUNDED
              ? this.renderContentListGlobal(
                  'Tanggal Pembatalan',
                  moment(
                    new Date(this.props.history.dataDetailHistory.cancelTime)
                  ).format('DD MMM YYYY HH:mm:ss')
                )
              : null}
            {statusPayment === REFUNDED || statusPayment === WAITING_FOR_REFUND
              ? this.renderContentListGlobal(
                  'Tanggal Pengembalian',
                  statusPayment === REFUNDED
                    ? moment(
                        new Date(
                          this.props.history.dataDetailHistory.refundedTime
                        )
                      ).format('DD MMM YYYY HH:mm:ss')
                    : '-'
                )
              : null}
          </View>
        </View>
      </View>
    );
  }
  /** RENDER PRODUCT LIST */
  renderProductList() {
    return (
      <>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Daftar Produk</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <ProductListType2
            accessible={true}
            accessibilityLabel={'cardDetailProduk'}
            data={this.props.history.dataDetailHistory.orderBrands}
          />
        </View>
      </>
    );
  }
  /** RENDER DELETED PRODUCT LIST */
  renderDeletedProductList() {
    const detailHistory = this.props.history.dataDetailHistory;
    return (detailHistory.removedList.length !== 0 &&
      detailHistory.deliveredParcelModified) ||
      (detailHistory.invoicedParcelModified &&
        detailHistory.status === 'delivered') ||
      detailHistory.status === 'done' ? (
      <HistoryDeletedProductList data={detailHistory.removedList} />
    ) : (
      <View />
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
                <Text style={Fonts.type9}>Alamat Pengiriman</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Address
                  position={'right'}
                  font={Fonts.type9}
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
  renderPaymentInformation() {
    if (this.props.history.dataDetailHistory !== null) {
      return (
        <HistoryDetailPaymentInformation
          data={this.props.history.dataDetailHistory}
          section={this.state.section}
        />
      );
    }
  }

  /** RENDER DETAIL PAYMENT */
  renderDetailPayment() {
    if (this.props.history.dataDetailHistory !== null) {
      return (
        <HistoryDetailPayment
          data={this.props.history.dataDetailHistory}
          section={this.state.section}
        />
      );
    }
  }

  /** RENDER CONTENT */
  renderContent() {
    const detailHistory = this.props.history.dataDetailHistory;
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
          {this.renderDetailPayment()}
          {detailHistory.paymentType.id === PAY_NOW &&
          this.state.section === 'payment' &&
          ((detailHistory.status === CANCEL &&
            (detailHistory.statusPayment === PAID ||
              detailHistory.statusPayment === REFUNDED ||
              detailHistory.statusPayment === WAITING_FOR_REFUND)) ||
            detailHistory.deliveredParcelModified)
            ? this.renderInformasiPengembalian()
            : null}
          {this.renderRingkasanPesanan()}
          {this.renderProductList()}
          {this.renderBonusProductList()}
          {this.renderDeletedProductList()}
          {this.renderDeliveryDetail()}
          {this.state.section === 'order' ? (
            this.renderPaymentInformation()
          ) : (
            <View />
          )}
          {detailHistory.paymentType.id === PAY_NOW &&
          this.state.section === 'order' &&
          ((detailHistory.status === CANCEL &&
            (detailHistory.statusPayment === PAID ||
              detailHistory.statusPayment === REFUNDED ||
              detailHistory.statusPayment === WAITING_FOR_REFUND)) ||
            detailHistory.deliveredParcelModified)
            ? this.renderInformasiPengembalian()
            : null}
          {this.state.section === 'payment' ? (
            this.renderSelectPaymentMethod()
          ) : (
            <View />
          )}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </View>
    );
  }
  /**
   * =============================
   * ERROR FUNCTION
   * ============================
   */
  manageError() {
    switch (this.props.history.errorHistoryDetail.data.errorCode) {
      case 'ERR_APP_UPDATE_BILLING':
        this.errorUpdateBilling();
        break;
      case 'ERR_APP_CREATE_VA':
        this.errorCreateVA();
        break;
      case 'ERR_APP_INVOICE_NOT_FOUND':
        this.errorInvoicENotFound();
        break;
      case 'ERR_APP_INVOICE_ON_PROGRESS':
        this.errorInvoiceOnProgress();
        break;
      default:
        this.setState({
          openModalErrorGlobal: true
        });
        break;
    }
  }
  // ERROR UPDATE BILLING
  errorUpdateBilling() {
    this.setState({
      openModalErrorGlobal: true
    });
  }
  //ERROR CREATE VA
  errorCreateVA() {
    this.setState({
      openModalErrorGlobal: true
    });
  }
  //ERROR INVOICE ON PROGRESS
  errorInvoiceOnProgress() {
    this.setState({
      openModalErrorGlobal: true
    });
  }
  //ERROR INVOICE NOT FOUND
  errorInvoicENotFound() {
    this.setState({
      openModalErrorGlobal: true
    });
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
  /** RENDER PAYMENT TERM AND REFRENCE (30012020) */
  renderModalTAndR() {
    return (
      <View>
        {this.state.modalTAndR ? (
          <ModalTAndR
            open={this.state.modalTAndR}
            data={[this.state.tAndRDetail]}
            close={() => this.setState({ modalTAndR: false })}
            onRef={ref => (this.agreeTAndR = ref)}
            confirmOrder={this.renderChangePaymentMethod.bind(this)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /**RENDER CHANGE PAYMENT METHOD */
  renderChangePaymentMethod() {
    this.props.historyChangePaymentMethodProcess(
      this.state.changePaymentMethod
    );
    this.setState({ openPaymentMethod: false, modalTAndR: false });
  }

  /** MODAL ERROR PAYMENT GLOBAL */
  renderModalErrorGlobal() {
    return this.state.openModalErrorGlobal ? (
      <View>
        <ModalBottomFailPayment
          open={this.state.openModalErrorGlobal}
          onPress={() => this.setState({ openModalErrorGlobal: false })}
          text={this.props.history.errorHistoryDetail.message}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** MODAL ERROR GLOBAL TERJADI KESALAHAN */
  renderModalError() {
    return this.state.openModalError ? (
      <View>
        <ModalBottomErrorResponsWhite
          open={this.state.openModalError}
          onPress={() => this.setState({ openModalError: false })}
        />
      </View>
    ) : (
      <View />
    );
  }
  //RENDER MODAL CHANGE PAYMENT
  renderModalWarningChangePayment() {
    return (
      <View>
        {this.state.modalWarningChangePayment ? (
          <ModalWarning
            open={this.state.modalWarningChangePayment}
            content={`${this.state.warningChangePayment}`}
          />
        ) : (
          <View />
        )}
      </View>
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

  /** === RENDER BUTTON CHANGE PAYMENT === */
  renderSelectPaymentMethod() {
    const statusPayment = this.props.history.dataDetailHistory.statusPayment;
    return (
      <View>
        {statusPayment === 'paid' || statusPayment === 'payment_failed' ? (
          <View />
        ) : (
          this.renderButtonChangePayment()
        )}
        {this.renderModalChangePaymentMethod()}
      </View>
    );
  }

  //**RENDER BUTTON UBAH METODE PEMBAYARAN */
  renderButtonChangePayment() {
    if (this.props.history.dataDetailHistory.paymentType.id === 2) {
      return (
        <View>
          <View style={GlobalStyle.boxPadding} />
          <View style={GlobalStyle.shadowForBox}>
            <ButtonSingle
              white
              disabled={false}
              title={'Ubah Metode Pembayaran'}
              borderRadius={0}
              onPress={() => this.renderOpenModalPaymentMethod()}
            />
          </View>
        </View>
      );
    }
  }

  /** RENDER BOTTOM ACTION */
  renderBottomAction() {
    const dataDetailHistory = this.props.history.dataDetailHistory;
    return (
      <View style={styles.boxBottomAction}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'btnDetailButuhBantuan'}
          onPress={() => this.setState({ openModalCS: true })}
        >
          <Text style={Fonts.type22}>Butuh Bantuan ?</Text>
        </TouchableOpacity>
        {this.state.section === 'order' ? (
          this.renderButtonForOrder(dataDetailHistory)
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
  /** RENDER BONUS PRODUCT LIST */
  renderBonusProductList() {
    return this.props.history.dataDetailHistory.bonusCatalogues.length !== 0 ? (
      <HistoryBonusProductList data={this.props.history.dataDetailHistory} />
    ) : (
      <View />
    );
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

  /**RENDER OPEN MODAL PAYMENT METHOD */
  async renderOpenModalPaymentMethod() {
    const selectedPaymentType = this.props.history.dataDetailHistory;
    const params = {
      supplierId: parseInt(selectedPaymentType.supplierId, 10),
      orderParcelId: parseInt(
        selectedPaymentType.orderBrands
          .map(item => item.orderParcelId)
          .toString(),
        10
      ),
      paymentTypeId: parseInt(selectedPaymentType.paymentType.id, 10)
    };
    await this.props.OmsGetPaymentChannelProcess(params);
    this.setState({
      selectedPaymentType: this.props.oms.dataOmsGetPaymentChannel,
      openPaymentMethod: true
    });
  }

  /**RENDER MODAL PAYMENT METHOD */
  renderModalChangePaymentMethod() {
    const paylaterType = this.props.history.dataDetailHistory.paylaterType;
    return this.state.openPaymentMethod ? (
      <ModalChangePaymentMethod
        open={this.state.openPaymentMethod}
        close={() =>
          this.setState({
            openPaymentMethod: false
          })
        }
        paymentMethod={this.props.oms.dataOmsGetPaymentChannel}
        paymentType={this.props.history.dataDetailHistory.paymentType}
        billingID={this.props.history.dataDetailHistory.billing.id}
        total={this.props.history.dataDetailHistory.parcelFinalPrice}
        loading={this.props.oms.loadingOmsGetPaymentChannel}
        actionChange={this.renderWantToConfirm.bind(this)}
        selectedPaylaterType={paylaterType} // orderPrice={this.calTotalPrice()}
        // onRef={ref => (this.selectPaymentMethod = ref)}
        // selectPaymentMethod={this.selectedPayment.bind(this)}
      />
    ) : (
      <View />
    );
  }

  /** === RENDER BUTTON FOR ORDER === */
  renderButtonForOrder(item) {
    switch (item.status) {
      case CONFIRM:
        if (
          item.paymentType.id !== PAY_NOW &&
          item.statusPayment === WAITING_FOR_PAYMENT
        ) {
          return this.renderCancelButton(item);
        }
        break;
      case PENDING_PAYMENT:
        if (
          item.paymentType.id === PAY_NOW &&
          item.statusPayment === WAITING_FOR_PAYMENT
        ) {
          return this.renderCancelButton(item);
        }
        break;
      default:
        return <View />;
    }
  }

  /**RENDER WANT TO CONFIRM*/
  renderWantToConfirm(item) {
    const params = {
      billingID: parseInt(this.props.history.dataDetailHistory.billing.id, 10),
      newPaymentChannelId: parseInt(item, 10)
    };
    this.setState({
      changePaymentMethod: params
    });
    const data = {
      storeId: parseInt(this.props.history.dataDetailHistory.store.id, 10),
      orderParcels: [
        {
          invoiceGroupId: parseInt(
            this.props.history.dataDetailHistory.invoiceGroupId,
            10
          ),
          paymentChannelId: parseInt(params.newPaymentChannelId, 10),
          paymentTypeId: parseInt(
            this.props.history.dataDetailHistory.paymentType.id,
            10
          )
        }
      ]
    };
    this.props.OmsGetTermsConditionsProcess(data);
  }

  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {!this.props.history.loadingDetailHistory &&
        !this.props.history.loadingEditHistory &&
        !this.props.history.loadingHistoryChangePaymentMethod &&
        !this.props.history.loadingHistoryActivateVA &&
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
        {this.renderModalErrorGlobal()}
        {this.renderModalTAndR()}
        {this.renderModalError()}
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

const mapStateToProps = ({ history, user, merchant, oms }) => {
  return { history, user, merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailView);

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
