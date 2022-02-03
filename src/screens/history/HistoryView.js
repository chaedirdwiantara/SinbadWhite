import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  StatusBarBlackOP40,
  SearchBarType7,
  ModalBottomType3,
  ModalBottomType4,
  DatePickerSpinner
} from '../../library/component';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import HistoryTabView from './HistoryTabView';
import HistoryOrderView from './HistoryOrderView';
import HistoryPaymentView from './HistoryPaymentView';
import HistoryFilterView from './HistoryFilterView';
import HistoryPortfolioFilterView from './HistoryPortfolioFilterView';
import HistoryDateFilterView from './HistoryDateFilterView';
import HistoryOrderFilterView from './order-filter/HistoryOrderFilterView';

class HistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'payment',
      typeDate: 'startDate',
      startDate: '',
      endDate: '',
      searchText: '',
      dateFilter: {
        dateGte: '',
        dateLte: ''
      },
      portfolio: [],
      portfolioId: [],
      order: {
        userId: '',
        name: ''
      },
      openMainFilter: false,
      openPortfolioFilter: false,
      openDateFilter: false,
      openDateSelect: false,
      openOrderFilter: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT FUNCTION === */
  componentDidMount() {
    this.checkNewOrderNotif();
    this.props.historyGetOrderStatusProcess();
    this.props.historyGetPaymentStatusProcess();
    // this.getSalesName();
  }

  /** CHECK NEW ORDER NOTIF */
  checkNewOrderNotif() {
    if (this.props.merchant.selectedMerchant !== null) {
      const data = this.props.permanent.newOrderSuccessPerMerchant;
      const selectedStoreId = this.props.merchant.selectedMerchant.storeId;
      const index = this.props.permanent.newOrderSuccessPerMerchant.indexOf(
        selectedStoreId
      );
      if (index > -1) {
        data.splice(index, 1);
        this.props.historyDeleteNewOrderNotifPerMerchant(data);
      }
    }
  }
  getSalesName() {
    const order = {
      userId: this.props.user.id,
      name: this.props.user.fullName
    };
    this.setState({ order });
  }
  /** === FROM CHILD FUNCTION === */
  parentFunction(data) {
    switch (data.type) {
      case 'section':
        this.setState({ activeTab: data.data });
        break;
      case 'search':
        this.setState({ searchText: data.data });
        break;
      case 'portfolio':
        this.setState({ openMainFilter: false, openPortfolioFilter: true });
        break;
      case 'order':
        this.setState({ openMainFilter: false, openOrderFilter: true });
        break;
      case 'date':
        this.setState({ openMainFilter: false, openDateFilter: true });
        break;
      case 'addPortfolio':
        this.setState({
          openMainFilter: true,
          openPortfolioFilter: false,
          portfolio: data.data
        });
        break;
      case 'doFilter':
        this.setState({
          openMainFilter: false,
          startDate: data.data.startDate,
          endDate: data.data.endDate,
          portfolioId: data.data.portfolio,
          dateFilter: data.data.dateFilter,
          order: data.data.order
        });
        break;
      case 'dateType':
        this.setState({
          typeDate: data.data,
          openDateSelect: true,
          openDateFilter: false
        });
        break;
      case 'datePicker':
        this.setState({ openDateSelect: false, openDateFilter: true });
        if (this.state.typeDate === 'startDate') {
          this.setState({ startDate: data.data, endDate: '' });
        } else {
          this.setState({ endDate: data.data });
        }
        break;
      case 'selectDate':
        if (data.data.type === 'selectedDate') {
          this.setState({ openDateFilter: false, openMainFilter: true });
        }
        this.setState({
          startDate: data.data.startDate,
          endDate: data.data.endDate
        });
        break;
      case 'orderFilter':
        this.setState({
          openMainFilter: false,
          openOrderFilter: false,
          order: data.data
        });
        break;
      default:
        break;
    }
  }
  /** SAVE DATE FILTER */
  saveDatePicker(date) {
    if (this.state.typeDate === 'startDate') {
      this.setState({ startDate: date });
    } else {
      this.setState({ endDate: date });
    }
    setTimeout(() => {
      this.setState({ openModalFilterDate: true, openModalDatePicker: false });
    }, 100);
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={styles.containerContent}>
        {this.state.activeTab === 'payment' ? (
          <HistoryPaymentView
            storeId={this.props.navigation.state.params.storeId}
            section={this.state.activeTab}
            search={this.state.searchText}
            dateFilter={this.state.dateFilter}
            portfolio={this.state.portfolioId}
            order={this.state.order}
          />
        ) : (
          <HistoryOrderView
            storeId={this.props.navigation.state.params.storeId}
            section={this.state.activeTab}
            search={this.state.searchText}
            dateFilter={this.state.dateFilter}
            portfolio={this.state.portfolioId}
            order={this.state.order}
          />
        )}
      </View>
    );
  }
  /** === HEADER TABS === */
  renderHeaderTabs() {
    return (
      <View style={styles.containerTabs}>
        <HistoryTabView
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }
  /** === RENDER FILTER AND SEARCH === */
  renderSearchAndFilter() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SearchBarType7
              accessibilityLabel={'txtFieldTagihanCariProduk'}
              placeholder={'Cari produk, nomor pesanan'}
              searchText={this.state.searchText}
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.parentFunction.bind(this)}
            />
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'btnTagihanFilter'}
            style={{ paddingRight: 16, justifyContent: 'center' }}
            onPress={() => this.setState({ openMainFilter: true })}
          >
            {this.state.portfolioId.length > 0 ||
            this.state.dateFilter.dateGte !== '' ||
            this.state.dateFilter.dateLte !== '' ? (
              <View style={styles.circleFilter} />
            ) : (
              <View />
            )}

            <Image
              source={require('../../assets/icons/pdp/filter-black.png')}
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /**
   * ====================
   * MODAL
   * ====================
   */
  renderModalFilterMain() {
    return this.state.openMainFilter ? (
      <ModalBottomType3
        open={this.state.openMainFilter}
        title={'Filter'}
        typeClose={'cancel'}
        close={() => this.setState({ openMainFilter: false })}
        content={
          <HistoryFilterView
            portfolio={this.state.portfolio}
            dateGte={this.state.startDate}
            dateLte={this.state.endDate}
            order={this.state.order}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
      />
    ) : (
      <View />
    );
  }

  renderModalFilterOrder() {
    return this.state.openOrderFilter ? (
      <ModalBottomType4
        open={this.state.openOrderFilter}
        title={'Filter'}
        close={() =>
          this.setState({ openMainFilter: true, openOrderFilter: false })
        }
        content={
          <HistoryOrderFilterView
            order={this.state.order.userId}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
      />
    ) : (
      <View />
    );
  }

  renderModalFitlerPortfolio() {
    return this.state.openPortfolioFilter ? (
      <ModalBottomType4
        open={this.state.openPortfolioFilter}
        title={'Filter'}
        close={() =>
          this.setState({ openMainFilter: true, openPortfolioFilter: false })
        }
        content={
          <HistoryPortfolioFilterView
            portfolio={this.state.portfolio}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
      />
    ) : (
      <View />
    );
  }

  renderModalFitlerDate() {
    return this.state.openDateFilter ? (
      <ModalBottomType3
        open={this.state.openDateFilter}
        title={'Filter'}
        close={() =>
          this.setState({ openMainFilter: true, openDateFilter: false })
        }
        content={
          <HistoryDateFilterView
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
        }
      />
    ) : (
      <View />
    );
  }

  renderModalSelectDate() {
    return this.state.openDateSelect ? (
      <ModalBottomType4
        open={this.state.openDateSelect}
        title={
          this.state.typeDate === 'startDate' ? 'Tanggal Awal' : 'Tanggal Akhir'
        }
        close={() =>
          this.setState({ openDateFilter: true, openDateSelect: false })
        }
        content={
          <View>
            <StatusBarBlackOP40 />
            <DatePickerSpinner
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.parentFunction.bind(this)}
            />
          </View>
        }
      />
    ) : (
      <View />
    );
  }

  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeaderTabs()}
        {this.renderSearchAndFilter()}
        {this.renderContent()}
        {/* modal */}
        {this.renderModalFilterMain()}
        {this.renderModalFitlerPortfolio()}
        {this.renderModalFitlerDate()}
        {this.renderModalSelectDate()}
        {this.renderModalFilterOrder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerContent: {
    flex: 1
  },
  circleFilter: {
    height: 7,
    width: 7,
    backgroundColor: masterColor.mainColor,
    borderRadius: 6,
    position: 'absolute',
    right: 17,
    top: 6,
    zIndex: 1000
  }
});

const mapStateToProps = ({ merchant, permanent, user }) => {
  return { merchant, permanent, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryView);

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
