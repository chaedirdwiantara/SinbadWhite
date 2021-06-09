import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  SkeletonType5,
  EmptyData,
  ProductListType1,
  LoadingLoadMore,
  ModalConfirmation
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import CountDown from '../../components/CountDown';
import { REFUNDED, BILLING_PAID, PAID, WAITING_FOR_REFUND, PAYMENT_FAILED, WAITING_FOR_PAYMENT, PAY_NOW } from '../../constants/paymentConstants';
import {CONFIRM, PENDING_PAYMENT} from '../../constants/orderConstants';

class HistoryDataListView extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      openModalCancelOrderConfirmation: false,
      wantDeleteItem: null
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.historyGetReset();
    this.getHistory(true, 0);
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }
    if (prevProps.search !== this.props.search) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }
    if (prevProps.portfolio !== this.props.portfolio) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }
    if (prevProps.dateFilter !== this.props.dateFilter) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }
    if (
      prevProps.history.dataEditHistory !== this.props.history.dataEditHistory
    ) {
      if (this.props.history.dataEditHistory !== null) {
        this.props.historyGetReset();
        this.getHistory(true, 0);
      }
    }
  }

  /** CALL FROM CHILD */
  parentFunction(data) {
    if (data.type === 'countdown') {
      this.onHandleRefresh();
    }
  }
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.historyGetRefresh();
    this.getHistory(true, 0);
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.history.dataGetHistory) {
      if (
        this.props.history.dataGetHistory.length <
        this.props.history.totalDataGetHistory
      ) {
        const page = this.props.history.pageGetHistory + 10;
        this.props.historyGetLoadMore(page);
        this.getHistory(false, page);
      }
    }
  };
  /** FETCH DATA */
  getHistory(loading, page) {
    this.props.historyGetProcess({
      loading,
      userId: this.props.user.id,
      storeId: this.props.storeId,
      page,
      statusOrder: this.props.section === 'order' ? this.props.status : '',
      statusPayment: this.props.section === 'payment' ? this.props.status : '',
      dateGte: this.props.dateFilter.dateGte,
      dateLte: this.props.dateFilter.dateLte,
      portfolioId: this.props.portfolio,
      search: this.props.search
    });
  }
  /** CHECK STATUS */
  checkpayment(item) {
    const data = this.props.history.dataGetPaymentStatus.find(
      itemPayment => itemPayment.status === item
    );
    if (data) {
      return data.title;
    } else {
      return '';
    }
  }

  checkorder(item) {
    const data = this.props.history.dataGetOrderStatus.find(
      itemPayment => itemPayment.status === item
    );
    if (data) {
      return data.title;
    } else {
      return '';
    }
  }
  /** payment */
  statusPayment(item) {
    return this.props.history.dataGetPaymentStatus !== null
      ? this.checkpayment(item)
      : '';
  }
  /** order */
  statusOrder(item) {
    return this.props.history.dataGetOrderStatus !== null
      ? this.checkorder(item)
      : '';
  }

  /** === RENDER ITEM (STATUS PAYMENT) === */
  renderItemStatusOrder(item) {
    return (
      <View>
        <Text style={Fonts.type10}>{this.statusOrder(item.status)}</Text>
      </View>
    );
  }

  /** go to detail */
  goToDetail(item) {
    this.props.historyGetDetailProcess(item.billing.orderParcelId);
    NavigationService.navigate('HistoryDetailView', {
      section: this.props.section,
      storeId: item.store.id
    });
  }
  /** CANCEL ORDER */
  cancelOrder() {
    this.props.historyEditProcess({
      parcelId: this.state.wantDeleteItem.id,
      params: {
        status: 'cancel'
      }
    });
  }
  /** ORDER VIA */
  orderVia(item) {
    if (item.order !== null) {
      switch (item.order.orderVia) {
        case null:
          return '';
        case 'sales':
          return 'Sales Rep Order';
        case 'store':
          return 'Toko Order';
        default:
          break;
      }
    }
    return '';
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** ITEM BUTTON DETAIL*/
  renderButtonDetail(item) {
    return (
      <TouchableOpacity
        style={styles.buttonDetail}
        onPress={() => this.goToDetail(item)}
      >
        <Text style={Fonts.type39}>Detail</Text>
      </TouchableOpacity>
    );
  }
  /** ITEM BUTTON CANCEL */
  renderButtonCancel(item) {
    return (
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() =>
          this.setState({
            openModalCancelOrderConfirmation: true,
            wantDeleteItem: item
          })
        }
      >
        <Text style={Fonts.type11}>Batal</Text>
      </TouchableOpacity>
    );
  }
  /** ITEM PRODUCT SECTION */
  renderProductSection(data) {
    return <ProductListType1 data={data} />;
  }
  /** RENDER SEPARATOR */
  renderSeparator() {
    return <View style={GlobalStyle.boxPadding} />;
  }

  /** RENDER COUNTDOWN */
  renderCountDown(item) {
    const timeNow = new Date();
    const expiredTime = new Date(item.billing.expiredPaymentTime);
    const timeDiffInSecond = (timeNow.getTime() - expiredTime.getTime()) / 1000;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={Fonts.type10}>Waktu Bayar: </Text>
        <CountDown
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
          fontPrimer={Fonts.type18}
          backgroundColor={masterColor.mainColor}
          type={'small'}
          expiredTimer={Math.abs(timeDiffInSecond)}
        />
      </View>
    );
  }

  /** === RENDER ITEM (STATUS PAYMENT INFORMATION) === */
  renderItemStatusPaymentInformation(item) {
    let statusPaymentInformation = '';
    const diff = moment(new Date(item.dueDate)).diff(new Date(), 'days');
    if (diff === 0) {
      statusPaymentInformation = <Text style={Fonts.type59}>jatuh tempo</Text>;
    } else if (diff > 0) {
      statusPaymentInformation = (
        <Text>
          <Text style={Fonts.type22}>{diff} hari</Text>
          <Text style={Fonts.type59}> menuju pembayaran</Text>
        </Text>
      );
    } else if (diff < 0) {
      statusPaymentInformation = (
        <Text>
          <Text style={Fonts.type22}>{diff * -1} hari</Text>
          <Text style={Fonts.type59}> diluar batas pembayaran</Text>
        </Text>
      );
    }
    return item.dueDate !== null ? statusPaymentInformation : null;
  }

  /** === RENDER ITEM (STATUS PAYMENT) === */
  renderItemStatusPayment(item) {
    let textStyle = Fonts.type10;
    switch (item.statusPayment) {
      case 'payment_failed':
      case 'overdue':
      case 'waiting_for_payment':
        textStyle = Fonts.type11;
        break;
      case 'waiting_for_refund':
        textStyle = Fonts.type11;
        break;
      case 'refunded':
        textStyle = Fonts.type10;
        break;
      default:
        break;
    }
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          {item.paymentChannel.id === 2 &&
          moment.utc(new Date()).local() >
            moment.utc(item.billing.expiredPaymentTime).local() &&
          item.statusPayment === 'waiting_for_payment' ? (
            <Text style={{ ...textStyle, textAlign: 'right' }}>
              Tidak Dibayar
            </Text>
          ) : (
            <Text style={{ ...textStyle, textAlign: 'right', marginLeft: 15 }}>
              {this.statusPayment(item.statusPayment)}
            </Text>
          )}
          {item.statusPayment === 'overdue' ? (
            <View style={{ marginLeft: 5 }}>
              <MaterialIcon name="error" size={15} color={'#f0444c'} />
            </View>
          ) : (
            <View />
          )}
        </View>
        {item.statusPayment !== PAID && item.statusPayment !== REFUNDED && item.statusPayment !== WAITING_FOR_REFUND
          ? item.statusPayment !== PAYMENT_FAILED &&
            item.billing &&
            item.billing.billingStatus !== BILLING_PAID &&
            item.billing.expiredPaymentTime &&
            item.paymentChannel &&
            item.paymentChannel.paymentChannelTypeId !== PAY_NOW
            ? moment.utc(new Date()).local() >
                moment.utc(item.billing.expiredPaymentTime).local() &&
              item.statusPayment === WAITING_FOR_PAYMENT
              ? null
              : this.renderCountDown(item)
            : null
          : null}
      </View>
    );
  }
  /** === RENDER BUTTON FOR ORDER === */
renderButtonForOrder(item) {
  switch (item.status){
    case CONFIRM :
      if (item.paymentType.id !== PAY_NOW && item.statusPayment === WAITING_FOR_PAYMENT){
        return this.renderButtonCancel(item)
      }
      case PENDING_PAYMENT:
        if (item.paymentType.id === PAY_NOW && item.statusPayment === WAITING_FOR_PAYMENT ){
          return this.renderButtonCancel(item)
        }
    default :
    return <View/>
  }
}

  // /** === RENDER BUTTON FOR PAYMENT === */
  // renderButtonForPayment(item) {
  //   if (item.status === 'confirm') {
  //     switch (item.statusPayment) {
  //       case 'confirm':
  //         return this.renderButtonCancel(item);
  //       default:
  //         return <View />;
  //     }
  //   }
  // }
  /** ITEM */
  renderItem({ item, index }) {
    const paymentType = item.paymentType.id;
    return (
      <View key={index}>
        <View style={GlobalStyle.shadowForBox}>
          <View style={styles.boxContent}>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type10}>{item.orderCode}</Text>
              {this.props.section === 'payment'
                ? this.renderItemStatusPayment(item)
                : this.renderItemStatusOrder(item)}
            </View>
            <View style={styles.boxItemContent}>
              {this.props.section === 'payment' ? (
                <Text style={Fonts.type57}>
                  {moment(new Date(item.createdAt)).format(
                    'DD MMM YYYY HH:mm:ss'
                  )}
                </Text>
              ) : (
                <View />
              )}
              {this.props.section === 'payment' &&
              item.statusPayment !== 'payment_failed' &&
              item.statusPayment !== 'paid' ? (
                <Text style={Fonts.type57}>
                  {this.renderItemStatusPaymentInformation(item)}
                </Text>
              ) : (
                <View />
              )}
            </View>
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            {this.renderProductSection(item.orderBrands)}
            {this.props.section === 'order' ? (
              <View style={{ marginTop: 8, alignItems: 'flex-end' }}>
                <Text style={Fonts.type17}>
                  Dipesan pada{' '}
                  {moment(new Date(item.createdAt)).format(
                    'DD MMM YYYY HH:mm:ss'
                  )}
                </Text>
              </View>
            ) : (
              <View />
            )}
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type17}>
                {item.parcelQty} Qty, Total:{' '}
                {MoneyFormat(item.billing.totalPayment)}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {this.props.section === 'order'
                  ? this.renderButtonForOrder(item)
                  : null}
                {this.renderButtonDetail(item)}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  /** EMPTY DATA */
  renderEmpty() {
    return <EmptyData title={'Tidak ada pesanan'} description={''} />;
  }
  /** RENDER DATA */
  renderData() {
    return this.props.history.dataGetHistory.length > 0 ? (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.props.history.dataGetHistory}
          renderItem={this.renderItem}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.history.refreshGetHistory}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={this.onHandleLoadMore}
          showsVerticalScrollIndicator
        />
      </View>
    ) : (
      this.renderEmpty()
    );
  }

  /** SKELETON */
  renderSkeleton() {
    return <SkeletonType5 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.history.loadingLoadMoreGetHistory ? (
      <LoadingLoadMore />
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
            statusBarWhite
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
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.history.loadingGetHistory ||
        this.props.history.loadingEditHistory
          ? this.renderSkeleton()
          : this.renderData()}
        {/* for loadmore */}
        {this.renderLoadMore()}
        {/* modal */}
        {this.renderModalCancelOrderConfirmation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  flatListContainer: {
    paddingBottom: 50
  },
  boxContent: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  boxItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonDetail: {
    backgroundColor: masterColor.mainColor,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8
  },
  buttonCancel: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  countDownText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.fontWhite
  },
  countDownTextContainer: {
    backgroundColor: masterColor.fontRed50,
    borderRadius: 2,
    minWidth: 20,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ history, user, merchant }) => {
  return { history, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDataListView);

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
