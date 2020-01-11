import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import HistoryTabView from './HistoryTabView';
import SearchBarType1 from '../../components/search_bar/SearchBarType1';
import HistoryOrderView from './HistoryOrderView';
import HistoryPaymentView from './HistoryPaymentView';
import ModalBottomType3 from '../../components/modal_bottom/ModalBottomType3';
import ModalBottomType4 from '../../components/modal_bottom/ModalBottomType4';
import HistoryFilterView from './HistoryFilterView';
import HistoryPortfolioFilterView from './HistoryPortfolioFilterView';

class HistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'payment',
      searchText: '',
      dateGte: '',
      dateLte: '',
      dateFilter: {
        dateGte: '',
        dateLte: ''
      },
      portfolio: [],
      portfolioId: [],
      openMainFilter: false,
      openPortfolioFilter: false,
      openDateFilter: false
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
        portfolioId: data.data.portfolio,
        dateFilter: data.data.dateFilter
      });
    }
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
            section={this.state.activeTab}
            search={this.state.searchText}
            dateFilter={this.state.dateFilter}
            portfolio={this.state.portfolioId}
          />
        ) : (
          <HistoryOrderView
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
              placeholder={'Cari produk, nomor pesanan'}
              searchText={this.state.searchText}
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.parentFunction.bind(this)}
            />
          </View>
          <TouchableOpacity
            style={{ paddingRight: 16, justifyContent: 'center' }}
            onPress={() => this.setState({ openMainFilter: true })}
          >
            {this.state.portfolioId.length > 0 ||
            this.state.dateGte !== '' ||
            this.state.dateLte !== '' ? (
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
            dateGte={this.state.dateGte}
            dateLte={this.state.dateLte}
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
          <HistoryFilterView
            onRef={ref => (this.parentFunction = ref)}
            parentFunction={this.parentFunction.bind(this)}
          />
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
