import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import { Color } from '../../config';
import { Fonts, Scale } from '../../helpers';
import {
  Shadow as ShadowComponent,
  TabsCustom,
  typeCustomTabs,
  LoadingPage,
  Charts
} from '../../library/component';
import TargetCard from './target';
import moment from 'moment';
// import NavigationService from '../../navigation/NavigationService';

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
    title: 'T Order',
    value: 'countOrders'
  },
  {
    title: 'Total Penjualan',
    value: 'totalSales'
  },
  {
    title: 'T. Dikunjungi',
    value: 'visitedStores'
  },
  {
    title: 'T. Baru',
    value: 'newStores'
  },
  {
    title: 'Total Pesanan',
    value: 'orderedStores'
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
        now: false,
        daily: false,
        monthly: false
      },
      tOrder: false,
      tPenjualan: false,
      tDikunjungi: false,
      tBaru: false,
      tPesanan: false
    };
  }

  /** === GET KPI DATA === */
  getKpiData({ period, startDate, endDate }) {
    let params = {
      startDate: '',
      endDate: '',
      period: period === 'now' ? 'daily' : period,
      userId: this.props.user.id
    };
    switch (period) {
      case 'now':
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
    console.log('fetching START');
    this.setState({
      load: period
    });
    console.log({ period, startDate, endDate });
    console.log(period);
    this.props.getKpiDashboardDetailProcess(params);
  }

  getNowDetailKpi = () => {
    this.getKpiData({
      period: 'now',
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD')
    });
  };

  getInitialDetailKpi = () => {
    this.getKpiData({
      period: 'daily',
      startDate: moment()
        .subtract(3, 'day')
        .format('YYYY-MM-DD'),
      endDate: moment()
        .add(3, 'day')
        .format('YYYY-MM-DD')
    });
  };

  getMonthlyDetailKpi = () => {
    this.getKpiData({
      period: 'monthly',
      startDate: moment()
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
      if (this.state.load === 'now') {
        let newData = { ...this.state.data };
        newData.now = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
        this.getInitialDetailKpi();
      } else if (this.state.load === 'daily') {
        let newData = { ...this.state.data };
        newData.daily = this.props.salesmanKpi.kpiDashboardDetailData;
        this.setState({
          load: false,
          data: newData
        });
      } else if (this.state.load === 'monthly') {
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
      console.log('=========== FLAG ============');
      console.log(this.state.load);
      console.log('fetching DONE');
      console.log(prevProps.salesmanKpi);
      console.log(this.props.salesmanKpi);
    }
  }

  componentDidMount() {
    this.getNowDetailKpi();
  }

  parseDate = ({ day, month, year }) => {
    if (this.state.tabsTimeTarget === 'monthly') {
      return month;
    }
    return moment(new Date(year, month - 1, day, 0, 0, 0, 0)).format(
      'DD/MM/YYYY'
    );
  };

  parsePrevNext = data => {
    console.log(data);
    if (this.state.tabsTarget === 'prev') {
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
        ).isBefore(moment(new Date()).subtract(1, 'day'));
      });
      return newData;
    }
    const newData = data.filter(function(rows) {
      return moment(
        new Date(rows.date.year, rows.date.month - 1, rows.date.day, 0, 0, 0, 0)
      ).isAfter(new Date());
    });
    return newData;
  };

  tabsTimeChanged = value => {
    this.setState({
      tabsTime: value
    });
  };

  tabsWhiteChanged = value => {
    console.log(value);
    this.setState({
      tabsWhite: value
    });

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
  };

  tabsTargetChanged = value => {
    this.setState({
      tabsTarget: value
    });
  };

  renderChart = () => {
    let graphList = [
      {
        title: 'T.Order',
        data: {}
      },
      {
        title: 'Total Penjualan',
        data: {}
      },
      {
        title: 'T.Dikunjungi',
        data: {}
      },
      {
        title: 'T.Baru',
        data: {}
      },
      {
        title: 'Total Pesanan',
        data: {}
      }
    ];

    // prettier-ignore
    return <View style={styles.chartContainer}>
      <ScrollView style={{ width: '100%', }} horizontal showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={Scale(360)}
        snapToAlignment={'center'} >
        {
          graphList.map((graph, index) => {
            return <View key={index} style={{ width: Scale(360), height: '100%', }}>
              {/* Chart Title */}
              <Text>{graph.title}</Text>

              {/* Chart Component */}
              <Charts />
            </View>;
          })
        }
      </ScrollView>
      {/* TODO: create this as component */}
      <View style={{ alignItems: 'center', }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[
              styles.miniCircle,
              {
                backgroundColor: Color.mainColor
              }
            ]}
          />
          <View
            style={[
              styles.miniCircle,
              {
                backgroundColor: Color.fontBlack60
              },
            ]}
          />
        </View>
      </View>
    </View>;
  };

  render() {
    const {
      tabsTime,
      tabsWhite,
      tabsTimeTarget,
      tabsTarget,
      data,
      load
    } = this.state;
    return (
      <ScrollView scrollEnabled={!load}>
        {load ? (
          <View style={styles.loadingContainer}>
            <LoadingPage />
          </View>
        ) : null}
        <View style={styles.mainContainer}>
          <TabsCustom
            type={typeCustomTabs.redScroll}
            listMenu={listMenu}
            onChange={this.tabsTimeChanged}
            value={tabsTime}
          />
          <View style={styles.containerList}>
            <Text
              style={[
                Fonts.textHeaderPage,
                {
                  marginBottom: 15
                }
              ]}
            >
              T. Order
            </Text>
            <ShadowComponent>{this.renderChart()}</ShadowComponent>
          </View>
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
              <Text style={[Fonts.textHeaderPage]}>Target Saat Ini</Text>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 50
                }}
              >
                <TabsCustom
                  listMenu={listTimeTarget}
                  value={tabsTimeTarget}
                  onChange={value => {
                    console.log(data);
                    this.setState({
                      tabsTimeTarget: value
                    });
                    if (!data.monthly) {
                      this.getMonthlyDetailKpi();
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
                    padding: 20,
                    borderRadius: 12
                  }
                ]}
              >
                <View>
                  <Text style={[Fonts.textHeaderPage, styles.textContent]}>
                    Target
                  </Text>
                  <Text style={[Fonts.textHeaderPage, styles.textContent]}>
                    {this.state.tabsTimeTarget === 'monthly'
                      ? 'Bulan'
                      : 'Tanggal'}
                  </Text>
                  <Text style={[Fonts.textHeaderPage, styles.textContent]}>
                    Pencapaian
                  </Text>
                  <Text style={[Fonts.textHeaderPage, styles.textContent]}>
                    Target Status
                  </Text>
                </View>
                {data.now ? (
                  <View>
                    {/* <Text>{JSON.stringify(data.now[tabsWhite][0])}</Text> */}
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data.now[tabsWhite]
                        ? data.now[tabsWhite][0].target
                        : '0'}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data.now[tabsWhite]
                        ? this.parseDate(data.now[tabsWhite][0].date)
                        : '0'}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data.now[tabsWhite]
                        ? data.now[tabsWhite][0].achieved
                        : '0'}
                    </Text>
                    <Text
                      style={[
                        Fonts.type13,
                        styles.textContent,
                        {
                          color:
                            data.now[tabsWhite][0].achieved >=
                            data.now[tabsWhite][0].target
                              ? '#81C784'
                              : '#ef9a9a'
                        }
                      ]}
                    >
                      {data.now[tabsWhite]
                        ? data.now[tabsWhite][0].achieved >=
                          data.now[tabsWhite][0].target
                          ? 'Achieved'
                          : 'Not Achieved'
                        : '0'}
                    </Text>
                  </View>
                ) : null}
              </View>
            </ShadowComponent>
          </View>
          <View
            style={{
              padding: 20
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
    width: '100%',
    height: 300,
    backgroundColor: masterColor.backgroundWhite,
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
    fontSize: 16,
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

const mapStateToProps = ({ user, auth, salesmanKpi }) => {
  return { user, auth, salesmanKpi };
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
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
