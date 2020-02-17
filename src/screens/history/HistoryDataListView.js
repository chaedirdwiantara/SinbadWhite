import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import moment from 'moment';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import SkeletonType5 from '../../components/skeleton/SkeletonType5';
import EmptyData from '../../components/empty_state/EmptyData';
import ProductListType1 from '../../components/list/ProductListType1';
import { LoadingLoadMore } from '../../components/Loading';
import { MoneyFormat } from '../../helpers/NumberFormater';
import NavigationService from '../../navigation/NavigationService';
import ModalConfirmation from '../../components/modal/ModalConfirmation';

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
  /** go to detail */
  goToDetail(item) {
    this.props.historyGetDetailProcess(item.id);
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
  /** ITEM */
  renderItem({ item, index }) {
    return (
      <View key={index}>
        <View style={GlobalStyle.shadowForBox}>
          <View style={styles.boxContent}>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type42}>{item.orderCode}</Text>
              <Text style={Fonts.type10}>
                {this.props.section === 'payment'
                  ? this.statusPayment(item.statusPayment)
                  : this.statusOrder(item.status)}
              </Text>
            </View>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type57}>
                {moment(new Date(item.createdAt)).format(
                  'DD MMM YYYY HH:mm:ss'
                )}
              </Text>
              <Text style={Fonts.type57}>{this.orderVia(item)}</Text>
            </View>
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            {this.renderProductSection(item.orderBrands)}
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type17}>
                {item.parcelDetails.totalQty} Qty, Total:{' '}
                {MoneyFormat(item.parcelDetails.totalNettPrice)}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {this.props.section === 'order' && item.status === 'confirm' ? (
                  this.renderButtonCancel(item)
                ) : (
                  <View />
                )}
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
