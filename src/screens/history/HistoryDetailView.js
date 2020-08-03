import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ProductListType2,
  Address,
  ModalConfirmation,
  ToastType1,
  ModalBottomType3,
  LoadingPage
} from '../../library/component'
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import CallCS from '../../screens/global/CallCS';
import HistoryReturnReasonView from './HistoryReturnReasonView';
import HistoryReturnSkuDetailView from './HistoryReturnSkuDetailView';
import ButtonSingle from '../../components/button/ButtonSingle';
import ModalChangePaymentMethod from './ModalChangePaymentMethod';
import ModalWarning from '../../components/modal/ModalWarning';
import ModalTAndR from './ModalTAndC';
import HistoryDetailPaymentInformation from './HistoryDetailPaymentInformation'
import HistoryDetailPayment from './HistoryDetailPayment'

class HistoryDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCS: false,
      refreshing: false,
      showToast: false,
      showToastError: false,
      toastNotifText: '',
      openModalCancelOrderConfirmation: false,
      openModalReturnReason: false,
      openModalReturnDetail: false,
      selectedReturnReason: null,
      returnItem: null,
      openModalDeliveredOrderConfirmation: false,
      openModalReOrderConfirmation: false,
      item: null,
      modalPaymentTypeMethod: false,
      modalPaymentTypeList: false,
      selectedPaymentType: [],
      paymentMethod: null,
      section: this.props.navigation.state.params.section,
      modalWarningChangePayment: false,
      tAndRDetail: null,
      tAndRLoading: false,
      changePaymentMethod: null,
      modalTAndR: false,
      warningChangePayment: null
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
    /** SUCCESS */
    /** => if edit success */
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
    /** => if return success */
    if (
      prevProps.history.dataSaveHistoryReturn !==
      this.props.history.dataSaveHistoryReturn
    ) {
      if (this.props.history.dataSaveHistoryReturn !== null) {
        this.setState({
          openModalReturnDetail: false,
          toastNotifText: 'Retur produk berhasil dikirim',
          showToast: true
        });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      }
    }
    /** ERROR */
    /** => if error return */
    if (
      prevProps.history.errorSaveHistoryReturn !==
      this.props.history.errorSaveHistoryReturn
    ) {
      if (this.props.history.errorSaveHistoryReturn !== null) {
        this.setState({
          openModalReturnDetail: false,
          toastNotifText: 'Maaf, Retur produk gagal',
          showToast: true,
          showToastError: true
        });
        setTimeout(() => {
          this.setState({ showToast: false, showToastError: false });
        }, 3000);
      }
      if (this.props.oms.dataOmsGetPaymentChannel !== null) {
        this.setState({
          paymentMethod: this.props.oms.dataOmsGetPaymentChannel.data
        });
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

    if (
      prevProps.history.errorHistoryChangePaymentMethod !==
      this.props.history.errorHistoryChangePaymentMethod
    ) {
      if (this.props.history.errorHistoryChangePaymentMethod !== null) {
        this.setState({
          warningChangePayment: this.props.history
            .errorHistoryChangePaymentMethod.message,
          modalWarningChangePayment: true
        });
        setTimeout(() => {
          this.setState({ modalWarningChangePayment: false });
        }, 3000);
      }
    }

    // if (prevProps.history.dataDetailHistory !== this.props.history.dataDetailHistory){
    //   if (this.props.history.dataDetailHistory.billing !== null) {
    //     if (prevProps.history.dataDetailHistory.billing.expiredPaymentTime !== this.props.history.dataDetailHistory.billing.expiredPaymentTime){
    //       this.onRefresh()
    //     }
    //   }
    // }
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
  /** REFRESH LIST HISTORY AFTER EDIT HISTORY STATUS */
  getHistory() {
    this.props.historyGetProcess({
      loading: true,
      userId: '',
      page: 0,
      statusOrder: '',
      statusPayment: '',
      dateGte: '',
      dateLte: '',
      portfolioId: [],
      search: '',
      openPaymentMethod: false
    });
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'close':
        this.setState({ openModalCS: false });
        break;
      case 'return':
        this.setState({ openModalReturnReason: true, returnItem: data.data });
        break;
      case 'addReturnReason':
        this.setState({
          selectedReturnReason: data.data,
          openModalReturnDetail: true,
          openModalReturnReason: false
        });
        break;
      case 'createReturn':
        /** => save data return */
        this.props.historyReturnSaveProcess({
          catalogueId: this.state.returnItem.catalogueId,
          returnReasonId: this.state.selectedReturnReason,
          orderParcelId: this.props.history.dataDetailHistory.orderId,
          qty: data.data
        });
        break;
      default:
        break;
    }
  }
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
  /** CHANGE ORDER STATUS */
  changeOrderStatus(status) {
    this.props.historyEditProcess({
      parcelId: this.props.history.dataDetailHistory.id,
      params: {
        status
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
  /** === RE ORDER === */
  reOrder() {
    /** => save to dataCart */
    this.props.omsReOrderModifyDataCart(this.state.item.orderBrands);
    this.setState({
      toastNotifText: 'Produk berhasil ditambahkan ke keranjang',
      showToast: true
    });
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER BUTTON FOR ORDER === */
  renderButtonForOrder(item) {
    switch (item.status) {
      case 'confirm':
        return this.renderButtonCancel(item);
      case 'shipping':
        return this.renderButtonDelivered(item);
      case 'done':
        return this.renderButtonReOrder(item, 'red');
      default:
        return <View />;
    }
  }
  /** ITEM BUTTON CANCEL */
  renderButtonCancel(item) {
    return (
      <TouchableOpacity
        style={styles.buttonWhite}
        onPress={() =>
          this.setState({
            openModalCancelOrderConfirmation: true,
            item
          })
        }
      >
        <Text style={Fonts.type11}>Batal</Text>
      </TouchableOpacity>
    );
  }
  /** ITEM BUTTON DELIVER */
  renderButtonDelivered(item) {
    return (
      <TouchableOpacity
        style={styles.buttonRed}
        onPress={() =>
          this.setState({
            openModalDeliveredOrderConfirmation: true,
            item
          })
        }
      >
        <Text style={Fonts.type39}>Diterima</Text>
      </TouchableOpacity>
    );
  }
  /** ITEM BUTTON RE ORDER */
  renderButtonReOrder(item, type) {
    return (
      <TouchableOpacity
        style={type === 'red' ? styles.buttonRed : styles.buttonWhite}
        onPress={() =>
          this.setState({
            openModalReOrderConfirmation: true,
            item
          })
        }
      >
        <Text style={type === 'red' ? Fonts.type39 : Fonts.type11}>
          Beli Lagi
        </Text>
      </TouchableOpacity>
    );
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
      <View>
        <View style={GlobalStyle.boxPadding} />
        <View style={GlobalStyle.shadowForBox}>
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text style={Fonts.type48}>Daftar Produk</Text>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <ProductListType2
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
            status={this.props.history.dataDetailHistory.status}
            data={this.props.history.dataDetailHistory.orderBrands}
          />
        </View>
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
  /** === RENDER PAYMENT NOTIFICATION ITEM CONTENT DIFF DAY === */
  renderDateDiff(item) {
    let notifDay = '';
    const diff = moment(new Date(item.dueDate)).diff(new Date(), 'days');
    if (diff === 0) {
      notifDay = <Text style={Fonts.type18}>Hari ini</Text>;
    } else if (diff > 0) {
      notifDay = <Text style={Fonts.type18}>{diff} Hari</Text>;
    } else if (diff < 0) {
      notifDay = <Text style={Fonts.type18}>{diff * -1} Hari</Text>;
    }
    return item.dueDate !== null ? notifDay : null;
  }
  /** === RENDER PAYMENT NOTIFICATION ITEM CONTENT === */
  renderPaymentNotificationItemContent() {
    return this.props.history.dataDetailHistory.statusPayment === 'overdue'
      ? 'Pesanan Overdue selama'
      : 'Selesaikan pembayaran dalam';
  }
  /** === RENDER PAYMENT NOTIFICATION ITEM DIFF DAY === */
  renderPaymentNotificationItemDiffDay() {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          borderRadius: 4,
          paddingVertical: 8,
          backgroundColor:
            this.props.history.dataDetailHistory.statusPayment === 'overdue'
              ? masterColor.mainColor
              : masterColor.fontYellow50
        }}
      >
        {this.renderDateDiff(this.props.history.dataDetailHistory)}
      </View>
    );
  }
  /** === RENDER PAYMENT NOTIFICATION === */
  renderPaymentNotification() {
    return this.props.history.dataDetailHistory.statusPayment !== 'paid' &&
      this.props.history.dataDetailHistory.statusPayment !== 'payment_failed' &&
      this.state.section === 'payment' ? (
      <View style={[GlobalStyle.shadowForBox, styles.boxPaymentNotification]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcon
            name="timer"
            color={masterColor.fontBlack50}
            size={24}
          />
          <Text style={[Fonts.type8, { marginLeft: 10 }]}>
            {this.renderPaymentNotificationItemContent()}
          </Text>
        </View>
        {this.renderPaymentNotificationItemDiffDay()}
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
  /**RENDER CHANGE PAYMENT METHOD */
  async renderChangePaymentMethod() {
    this.props.historyChangePaymentMethodProcess(
      this.state.changePaymentMethod
    );
    this.setState({ openPaymentMethod: false, modalTAndR: false });
  }

  /**RENDER MODAL PAYMENT METHOD */
  renderModalChangePaymentMethod() {
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
        actionChange={this.renderWantToConfirm.bind(this)} // orderPrice={this.calTotalPrice()}
        // onRef={ref => (this.selectPaymentMethod = ref)}
        // selectPaymentMethod={this.selectedPayment.bind(this)}
      />
    ) : (
      <View />
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
  /** === RENDER PAYMENT INFORMATION === */
  renderDetailPayment() {
    if (this.props.history.dataDetailHistory !== null) {
      return(
      // {this.renderPaymentInformationA()}
      // return (
        
        <HistoryDetailPayment
          data={this.props.history.dataDetailHistory}
          section={this.state.section}
        />)
      // );
    }
  }


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
  /** === RENDER BUTTON CHANGE PAYMENT === */
  renderSelectPaymentMethod() {
    return (
      <View>
        {this.props.history.dataDetailHistory.statusPayment === 'paid' ? (
          <View />
        ) : (
          this.renderButtonChangePayment()
        )}
        {this.renderModalChangePaymentMethod()}
      </View>
    );
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
          {/* {this.renderPaymentNotification()} */}
          {this.state.section === 'payment' ? (
            
            this.renderDetailPayment()
            
          ) : (
            <View />
          )}
          {this.renderRingkasanPesanan()}
          {this.renderProductList()}
          {this.renderDeliveryDetail()}
          {this.state.section === 'order' ? (
            this.renderPaymentInformation2()
          ) : (
            <View />
          )}
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
  /** RENDER BOTTOM ACTION */
  renderBottomAction() {
    return (
      <View style={styles.boxBottomAction}>
        <TouchableOpacity onPress={() => this.setState({ openModalCS: true })}>
          <Text style={Fonts.type22}>Butuh Bantuan ?</Text>
        </TouchableOpacity>
        {this.state.section === 'order' ? (
          this.renderButtonForOrder(this.props.history.dataDetailHistory)
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
  /** === RENDER MODAL CANCEL ORDER CONFIRMATION === */
  renderModalCancelOrderConfirmation() {
    return (
      <View>
        {this.state.openModalCancelOrderConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalCancelOrderConfirmation}
            content={'Yakin ingin membatalkan pesanan Anda ?'}
            type={'okeNotRed'}
            ok={() => {
              this.setState({ openModalCancelOrderConfirmation: false });
              this.changeOrderStatus('cancel');
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
  /** === RENDER MODAL DELIVERED ORDER CONFIRMATION ===  */
  renderModalDeliveredOrderConfirmation() {
    return (
      <View>
        {this.state.openModalDeliveredOrderConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalDeliveredOrderConfirmation}
            content={'Apakah Anda yakin order Anda sudah diterima ?'}
            type={'okeRed'}
            ok={() => {
              this.setState({ openModalDeliveredOrderConfirmation: false });
              this.changeOrderStatus('delivered');
            }}
            cancel={() =>
              this.setState({ openModalDeliveredOrderConfirmation: false })
            }
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** === RENDER MODAL RE ORDER CONFIRMATION ===  */
  renderModalReOrderConfirmation() {
    return (
      <View>
        {this.state.openModalReOrderConfirmation ? (
          <ModalConfirmation
            title={'Konfirmasi'}
            open={this.state.openModalReOrderConfirmation}
            content={'Apakah Anda ingin membeli produk ini lagi ?'}
            type={'okeRed'}
            ok={() => {
              this.setState({ openModalReOrderConfirmation: false });
              this.reOrder();
            }}
            cancel={() =>
              this.setState({ openModalReOrderConfirmation: false })
            }
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** === RENDER MODAL RETURN REASON === */
  renderModalReturnReason() {
    return this.state.openModalReturnReason ? (
      <ModalBottomType3
        open={this.state.openModalReturnReason}
        typeClose={'cancel'}
        close={() =>
          this.setState({
            openModalReturnReason: false,
            selectedReturnReason: null
          })
        }
        title={'Alasan Retur'}
        content={
          <HistoryReturnReasonView
            selectedReturnReason={this.state.selectedReturnReason}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL RETURN DETAIL === */
  renderModalReturnDetail() {
    return this.state.openModalReturnDetail ? (
      <ModalBottomType3
        open={this.state.openModalReturnDetail}
        title={'Detail Retur Produk'}
        content={
          <HistoryReturnSkuDetailView
            data={this.state.returnItem}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
        close={() =>
          this.setState({
            openModalReturnDetail: false,
            openModalReturnReason: true
          })
        }
      />
    ) : (
      <View />
    );
  }
  /**
   * ===================
   * TOAST
   * ====================
   */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1
        margin={10}
        content={this.state.toastNotifText}
        error={this.state.showToastError}
      />
    ) : (
      <View />
    );
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
        {this.renderModalDeliveredOrderConfirmation()}
        {this.renderModalReOrderConfirmation()}
        {this.renderModalReturnReason()}
        {this.renderModalReturnDetail()}
        {this.renderModalTAndR()}
        {/* toast */}
        {this.renderToast()}
        {this.renderModalWarningChangePayment()}
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
  boxPaymentNotification: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  /** BUTTON */
  buttonRed: {
    backgroundColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8
  },
  buttonWhite: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4
  }
});

const mapStateToProps = ({ oms, history, user, merchant }) => {
  return { oms, history, user, merchant };
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
 * updatedBy: tatas
 * updatedDate: 22062020
 * updatedFunction:
 * -> Refactoring Module Import
 * 
 */
