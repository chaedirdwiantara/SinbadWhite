import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage'
import {
  StatusBarWhite,
  StatusBarBlackOP40,
  SearchBarType1,
  ModalBottomType3,
  ModalBottomType4,
  DatePickerSpinner
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import HistoryTabView from './HistoryTabView';
import HistoryOrderView from './HistoryOrderView';
import HistoryPaymentView from './HistoryPaymentView';
import HistoryFilterView from './HistoryFilterView';
import HistoryPortfolioFilterView from './HistoryPortfolioFilterView';
import HistoryDateFilterView from './HistoryDateFilterView';

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
      openMainFilter: false,
      openPortfolioFilter: false,
      openDateFilter: false,
      openDateSelect: false
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
  /** === FROM CHILD FUNCTION === */
  parentFunction(data) {
    if (data.type === 'section') {
      this.setState({ activeTab: data.data });
    } else if (data.type === 'search') {
      this.setState({ searchText: data.data });
    } else if (data.type === 'portfolio') {
      this.setState({ openMainFilter: false, openPortfolioFilter: true });
    } else if (data.type === 'date') {
      this.setState({ openMainFilter: false, openDateFilter: true });
    } else if (data.type === 'addPortfolio') {
      this.setState({
        openMainFilter: true,
        openPortfolioFilter: false,
        portfolio: data.data
      });
    } else if (data.type === 'doFilter') {
      this.setState({
        openMainFilter: false,
        startDate: data.data.startDate,
        endDate: data.data.endDate,
        portfolioId: data.data.portfolio,
        dateFilter: data.data.dateFilter
      });
    } else if (data.type === 'dateType') {
      this.setState({
        typeDate: data.data,
        openDateSelect: true,
        openDateFilter: false
      });
    } else if (data.type === 'datePicker') {
      this.setState({ openDateSelect: false, openDateFilter: true });
      if (this.state.typeDate === 'startDate') {
        this.setState({ startDate: data.data, endDate: '' });
      } else {
        this.setState({ endDate: data.data });
      }
    } else if (data.type === 'selectDate') {
      if (data.data.type === 'selectedDate') {
        this.setState({ openDateFilter: false, openMainFilter: true });
      }
      this.setState({
        startDate: data.data.startDate,
        endDate: data.data.endDate
      });
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
          />
        ) : (
          <HistoryOrderView
            storeId={this.props.navigation.state.params.storeId}
            section={this.state.activeTab}
            search={this.state.searchText}
            dateFilter={this.state.dateFilter}
            portfolio={this.state.portfolioId}
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
            <SearchBarType1
              accessible={true}
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
              source={require('../../assets/icons/pdp/filter.png')}
              style={{ height: 24, width: 24 }}
            />
            <Text style={Fonts.type67}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={GlobalStyle.lines} />
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

const mapStateToProps = ({ merchant, permanent }) => {
  return { merchant, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);

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
