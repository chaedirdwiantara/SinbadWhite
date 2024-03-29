/* eslint-disable react/no-did-update-set-state */
import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import {
  Fonts,
  Scale,
  MoneyFormatShort,
  getStartDateNow,
  getStartDateMinHour,
  generateGraphUri
} from '../../helpers';
import {
  Shadow as ShadowComponent,
  TabsCustom,
  typeCustomTabs,
  LoadingPage,
  SalesmanChart,
  SlideIndicator,
  ModalBottomErrorRespons
} from '../../library/component';
import TargetCard from './target';
import moment from 'moment';
import _ from 'lodash';
// import NavigationService from '../../navigation/NavigationService';
import {
  TOKO_ORDER,
  TOTAL_PENJUALAN,
  TOKO_DIKUNJUNGI,
  TOKO_BARU,
  TOTAL_PESANAN
} from '../../constants';

/*
 * period is used for request parameter
 */

const listMenu = [
  {
    title: '7 Hari Terakhir',
    value: '7Day'
  },
  {
    title: 'Bulan Ini',
    value: 'thisMonth'
  },
  {
    title: '6 Bulan Terakhir',
    value: '6Month'
  }
];

const listMenuWhite = [
  {
    title: 'Toko Memesan',
    value: 'orderedStores'
  },
  {
    title: 'Total Penjualan',
    value: 'totalSales'
  },
  {
    title: 'Toko Dikunjungi',
    value: 'visitedStores'
  },
  {
    title: 'Toko Baru',
    value: 'newStores'
  },
  {
    title: 'Total Pesanan',
    value: 'countOrders'
  }
];

const listTimeTarget = [
  {
    title: 'Harian',
    value: 'daily'
  },
  {
    title: 'Bulanan',
    value: 'monthly'
  }
];

const listTarget = [
  {
    title: 'Target Sebelumnya',
    value: 'prev'
  },
  {
    title: 'Target Selanjutnya',
    value: 'next'
  }
];

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsTime: listMenu[0].value,
      tabsWhite: listMenuWhite[0].value,
      tabsTimeTarget: listTimeTarget[0].value,
      tabsTarget: listTarget[0].value,
      data: {
        now: {
          daily: false,
          monthly: false
        },
        daily: false,
        monthly: false
      },
      currentSlideIndex: 0,
      refreshing: false,
      graphicDataList: [
        {
          graphContentType: TOKO_ORDER,
          uri: '',
          title: 'Toko Memesan'
        },
        {
          graphContentType: TOTAL_PENJUALAN,
          uri: '',
          title: 'Total Penjualan'
        },
        {
          graphContentType: TOKO_DIKUNJUNGI,
          uri: '',
          title: 'Toko Dikunjungi'
        },
        {
          graphContentType: TOKO_BARU,
          uri: '',
          title: 'Toko Baru'
        },
        {
          graphContentType: TOTAL_PESANAN,
          uri: '',
          title: 'Total Pesanan'
        }
      ],
      showModalError: false,
      checkError: false // flag for check error, so when re-entering this screen will check the error again
    };
  }

  /** === UPDATE KPI GRAPH === */
  updateKpiGraph() {
    if (_.isNil(this.props.user)) {
      return;
    }

    let startDate;
    let endDate = moment().format();

    /* eslint-disable indent */
    switch (this.state.tabsTime) {
      case 'thisMonth':
        startDate = moment()
          .startOf('month')
          .format();
        period = 'thisMonth';
        break;

      case '6Month':
        startDate = moment()
          .subtract(5, 'month')
          .startOf('month')
          .format();
        endDate = moment()
          .add(1, 'month')
          .format();
        period = 'last3Month';
        break;

      // default last 7 days
      default:
        startDate = moment()
          .subtract(7, 'day')
          .format();
        var period = 'last7Days';
    }
    /* eslint-enable indent */

    let graphicDataList = this.state.graphicDataList.map((item, index) => {
      return {
        ...item,
        uri: generateGraphUri({
          graphContentType: item.graphContentType,
          startDate,
          endDate,
          userId: this.props.user.id,
          supplierId: this.props.user.userSuppliers[0].supplierId,
          period
        })
      };
    });

    this.setState({
      graphicDataList
    });
  }

  /** === GET KPI DATA === */
  getKpiData({ period, startDate, endDate }) {
    if (_.isNil(this.props.user)) {
      return;
    }

    let supplierId = 1;
    try {
      supplierId = this.props.user.userSuppliers[0].supplierId;
    } catch (error) {
      return;
    }
    let params = {
      startDate: '',
      endDate: '',
      period:
        period === 'nowDaily'
          ? 'daily'
          : period === 'nowMonthly'
          ? 'monthly'
          : period,
      userId: this.props.user.id,
      supplierId
    };

    switch (period) {
      case 'nowDaily':
        params.startDate = startDate;
        params.endDate = endDate;
        break;

      case 'nowMonthly':
        params.startDate = startDate;
        params.endDate = endDate;
        break;

      case 'daily':
        params.startDate = startDate;
        params.endDate = endDate;
        break;

      case 'weekly':
        params.startDate = startDate;
        params.endDate = endDate;
        break;

      case 'monthly':
        params.startDate = startDate;
        params.endDate = endDate;
        break;

      default:
        break;
    }
    this.setState({
      load: period
    });
    this.props.getKpiDashboardDetailProcess(params);
  }

  /** === KPI DATA BY DATE NOW DAILY === */
  getNowDetailKpi = () => {
    this.getKpiData({
      period: 'nowDaily',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    });
  };

  /** === KPI DATA BY DATE NOW MONTHLY === */
  getNowDetailKpiMonthly = () => {
    let date = new Date();
    this.getKpiData({
      period: 'nowMonthly',
      startDate: moment(
        new Date(date.getFullYear(), date.getMonth(), 1)
      ).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    });
  };

  /** === KPI DATA BY DAILY === */
  getInitialDetailKpi = () => {
    this.getKpiData({
      period: 'daily',
      startDate: moment(getStartDateNow())
        .subtract(3, 'day')
        .format('YYYY-MM-DD'),
      endDate: moment()
        .add(3, 'day')
        .format('YYYY-MM-DD')
    });
  };

  /** === KPI DATA BY MONTH === */
  getMonthlyDetailKpi = () => {
    let date = new Date();
    this.getKpiData({
      period: 'monthly',
      startDate: moment(new Date(date.getFullYear(), date.getMonth(), 1))
        .subtract(3, 'month')
        .format('YYYY-MM-DD'),
      endDate: moment()
        .add(3, 'month')
        .format('YYYY-MM-DD')
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.salesmanKpi.kpiDashboardDetailData !==
      prevProps.salesmanKpi.kpiDashboardDetailData
    ) {
      if (this.state.load === 'nowDaily') {
        /** === UPDATE STATE WHEN FLAG IS nowDaily === */
        let newData = { ...this.state.data };
        newData.now.daily = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
        this.getInitialDetailKpi();
      } else if (this.state.load === 'nowMonthly') {
        /** === UPDATE STATE WHEN FLAG IS nowMonthly === */
        let newData = { ...this.state.data };
        newData.now.monthly = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
        this.getMonthlyDetailKpi();
      } else if (this.state.load === 'daily') {
        /** === UPDATE STATE WHEN FLAG IS DAILY === */
        let newData = { ...this.state.data };
        newData.daily = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
      } else if (this.state.load === 'monthly') {
        /** === UPDATE STATE WHEN FLAG IS MONTHLY === */
        let newData = { ...this.state.data };
        newData.monthly = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
      } else {
        this.setState({
          load: false
        });
      }
    }

    /** handle error */
    if (
      this.props.salesmanKpi.errorDetailKpiDashboard !==
      prevProps.salesmanKpi.errorDetailKpiDashboard &&
      !this.state.checkError 
    ) {
      if (this.props.salesmanKpi.errorDetailKpiDashboard !== '') {
        this.setState({
          load: false,
          showModalError: true,
          checkError: true,
        });
       }
    }
  }

  /** === GET INITIAL DATA === */
  getInitialData = () => {
    this.getNowDetailKpi();
    this.updateKpiGraph();
  };

  /** === INITIAL LIFESYCLE GET KPI DATA BY DATE NOW === */
  componentDidMount() {
    this.getInitialData();
  }

  /** === FOR PARSE DATE === */
  parseDate = ({ day, month, year }) => {
    if (this.state.tabsTimeTarget === 'monthly') {
      return moment(new Date(year, month - 1, day, 0, 0, 0, 0)).format('MMMM');
    }
    return moment(new Date(year, month - 1, day, 0, 0, 0, 0)).format(
      'DD/MM/YYYY'
    );
  };

  /** === FOR PARSE VALUE === */
  parseValue = (value, type, exeption) => {
    if (value === 0 && !exeption) {
      return '-';
    }
    if (type === 'totalSales') {
      if (value === 0) {
        return 'Rp. 0';
      }
      return MoneyFormatShort(value);
    }
    if (type === 'countOrders') {
      return `${value} Order`;
    }
    return `${value} Toko`;
  };

  /** === GET DATA BY PREV OR NEXT === */
  parsePrevNext = data => {
    if (this.state.tabsTarget === 'prev') {
      let range = 'day';
      if (this.state.tabsTimeTarget !== 'daily') {
        range = 'month';
      }
      const newData = data.filter(function(rows) {
        return moment(
          new Date(
            rows.date.year,
            rows.date.month - 1,
            rows.date.day,
            0,
            0,
            0,
            0
          )
        ).isBefore(moment(new Date()).subtract(1, range));
      });
      let reverseData = [];
      // eslint-disable-next-line no-unused-vars
      for (let row of newData) {
        reverseData.unshift(row);
      }
      return reverseData;
    }
    const newData = data.filter(function(rows) {
      return moment(
        new Date(rows.date.year, rows.date.month - 1, rows.date.day, 0, 0, 0, 0)
      ).isAfter(new Date());
    });
    return newData;
  };

  /** === TABS PREV NEXT ON CHANGED === */
  tabsTimeChanged = value => {
    if (this.state.tabsTime !== value) {
      this.setState(
        {
          tabsTime: value
        },
        () => {
          this.updateKpiGraph();
        }
      );
    }
  };

  /** === TABS TYPE OF KEY OBJECT CHANGED === */
  tabsWhiteChanged = value => {
    this.setState({
      tabsWhite: value
    });

    /* eslint-disable indent */
    switch (value) {
      case 'tOrder':
        this.setState({
          data: this.state.tOrder
        });
        break;
      case 'tPenjualan':
        this.setState({
          data: this.state.tPenjualan
        });
        break;
      case 'tDikunjungi':
        this.setState({
          data: this.state.tDikunjungi
        });
        break;
      case 'tBaru':
        this.setState({
          data: this.state.tBaru
        });
        break;
      case 'tPesanan':
        this.setState({
          data: this.state.tPesanan
        });
        break;
      default:
        break;
    }
    /* eslint-enable indent */
  };

  /** === TABS TARGET ON CHANGED === */
  tabsTargetChanged = value => {
    this.setState({
      tabsTarget: value
    });
  };

  /** === PULL TO REFRESH === */
  _onRefresh() {
    this.setState({ refreshing: true });
    this.getInitialData();
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  /** === CART COMPONENT === */
  renderChart = () => {
    return (
      <View style={styles.chartContainer}>
        {/* combine these scroll with bottom indicator */}
        <ScrollView
          style={{ width: '100%', marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={styles.chartContainer.width}
          snapToAlignment={'center'}
          // contentContainerStyle={{
          // }}
          onScroll={event => {
            let horizontalLimit = styles.chartContainer.width;
            if (event.nativeEvent.contentOffset.x % horizontalLimit) {
              const newPage = Math.round(
                event.nativeEvent.contentOffset.x / horizontalLimit
              );
              if (this.state.currentSlideIndex !== newPage) {
                this.setState({
                  currentSlideIndex: newPage
                });
              }
            }
          }}
        >
          {this.state.graphicDataList.map((item, index) => (
            <SalesmanChart
              key={index}
              title={item.title}
              isVisible={true}
              style={{
                width: styles.chartContainer.width
              }}
              uri={item.uri}
              token={this.props.permanent.token}
            />
          ))}
        </ScrollView>
        {/* slide indicator */}
        <SlideIndicator
          totalItem={this.state.graphicDataList.length}
          activeIndex={this.state.currentSlideIndex}
        />
      </View>
    );
  };

  // Details = React.lazy(() => import('./containers/Details'));

  render() {
    const {
      tabsTime,
      tabsWhite,
      tabsTimeTarget,
      tabsTarget,
      data,
      load,
      showModalError,
    } = this.state;

    const isValidData = data.now[tabsTimeTarget] && data.now[tabsTimeTarget][tabsWhite] && data.now[tabsTimeTarget][tabsWhite].length > 0;

    return (
      <ScrollView
        scrollEnabled={!load}
        refreshControl={
          <RefreshControl
            onRefresh={() => this._onRefresh()}
            refreshing={this.state.refreshing}
          />
        }
      >
        {load ? (
          <View style={styles.loadingContainer}>
            <LoadingPage />
          </View>
        ) : null}
        <ModalBottomErrorRespons
          open={showModalError}
          onPress={() => this.setState({ showModalError: false })}
        />  
        <View style={styles.mainContainer}>
          <TabsCustom
            type={typeCustomTabs.redScroll}
            listMenu={listMenu}
            onChange={this.tabsTimeChanged}
            value={tabsTime}
          />
          <View style={styles.containerList}>{this.renderChart()}</View>
          <View style={styles.sparator} />
          <TabsCustom
            type={typeCustomTabs.whiteScroll}
            listMenu={listMenuWhite}
            onChange={this.tabsWhiteChanged}
            value={tabsWhite}
          />
          <View
            style={[
              styles.containerList,
              {
                paddingTop: 20
              }
            ]}
          >
            <View style={styles.targetHeader}>
              <View
                style={{
                  flex: 4
                }}
              >
                <Text style={[Fonts.type7]}>Target Saat Ini</Text>
              </View>
              <View
                style={{
                  flex: 5
                }}
              >
                <TabsCustom
                  listMenu={listTimeTarget}
                  value={tabsTimeTarget}
                  onChange={value => {
                    this.setState({
                      tabsTimeTarget: value
                    });
                    if (!data.monthly) {
                      this.getNowDetailKpiMonthly();
                    }
                  }}
                />
              </View>
            </View>
            <ShadowComponent radius={12}>
              <View
                style={[
                  styles.targetHeader,
                  {
                    backgroundColor: masterColor.backgroundWhite,
                    marginBottom: 0,
                    padding: 16,
                    borderRadius: 12
                  }
                ]}
              >
                <View>
                  <Text style={[Fonts.type16, styles.textContent]}>Target</Text>
                  <Text style={[Fonts.type16, styles.textContent]}>
                    {this.state.tabsTimeTarget === 'monthly'
                      ? 'Bulan'
                      : 'Tanggal'}
                  </Text>
                  <Text style={[Fonts.type16, styles.textContent]}>
                    Pencapaian
                  </Text>
                </View>
                {data.now[tabsTimeTarget] ? (
                  <View>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {isValidData
                        ? this.parseValue(
                            data.now[tabsTimeTarget][tabsWhite][0].target,
                            tabsWhite
                          )
                        : '-'}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {isValidData
                        ? this.parseDate(
                            data.now[tabsTimeTarget][tabsWhite][0].date,
                            tabsWhite
                          )
                        : '-'}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {isValidData
                        ? this.parseValue(
                            data.now[tabsTimeTarget][tabsWhite][0].achieved,
                            tabsWhite,
                            true
                          )
                        : '-'}
                    </Text>
                  </View>
                ) : null}
              </View>
            </ShadowComponent>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 15
            }}
          >
            <TabsCustom
              type={typeCustomTabs.round}
              listMenu={listTarget}
              value={tabsTarget}
              onChange={this.tabsTargetChanged}
            />
          </View>
          {data[tabsTimeTarget]
            ? data[tabsTimeTarget][tabsWhite]
              ? this.parsePrevNext(data[tabsTimeTarget][tabsWhite]).map(
                  (row, i) => (
                    <View
                      key={i.toString()}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 5
                      }}
                    >
                      <TargetCard
                        type={tabsTarget}
                        data={row}
                        typeValue={tabsWhite}
                        tabsTimeTarget={this.state.tabsTimeTarget}
                      />
                    </View>
                  )
                )
              : null
            : null}
          <View
            style={{
              height: 20
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerList: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  sparator: {
    height: 15,
    width: '100%',
    backgroundColor: masterColor.fontBlack10
  },
  chartContainer: {
    width: Scale(320),
    height: 300,
    borderRadius: 7
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textContent: {
    marginVertical: 5,
    color: '#000',
    lineHeight: 16
  },
  loadingContainer: {
    height: Dimensions.get('screen').height - 120,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(250,250,250 ,0.8)'
  },
  miniCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

const mapStateToProps = ({ user, auth, salesmanKpi, permanent }) => {
  return { user, auth, salesmanKpi, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
// export default DashboardView;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Raka
 * updatedDate: 30112021
 * updatedFunction:
 * -> fix handle check error.
 *
 */
