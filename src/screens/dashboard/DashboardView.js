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
import { Fonts } from '../../helpers';
import {
  Shadow as ShadowComponent,
  TabsCustom,
  typeCustomTabs,
  LoadingPage,
  Charts
} from '../../library/component';
import TargetCard from './target';
// import moment from 'moment';
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
    value: 'tOrder'
  },
  {
    title: 'Total Penjualan',
    value: 'tPenjualan'
  },
  {
    title: 'T. Dikunjungi',
    value: 'tDikunjungi'
  },
  {
    title: 'T. Baru',
    value: 'tBaru'
  },
  {
    title: 'Total Pesanan',
    value: 'tPesanan'
  }
];

const listTimeTarget = [
  {
    title: 'Harian',
    value: 'day'
  },
  {
    title: 'Bulanan',
    value: 'month'
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
      data: false,
      tOrder: false,
      tPenjualan: false,
      tDikunjungi: false,
      tBaru: false,
      tPesanan: false
    };
  }

  getInitialDetailKpi = () => {
    this.props.getKpiDashboardDetailProcess({
      type: 'typooo'
    });
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps.salesmanKpi);
    console.log(this.props.salesmanKpi);
    // if (
    //   prevProps.profile.dataEditProfile !== this.props.profile.dataEditProfile
    // ) {
    //   if (this.props.profile.dataEditProfile !== null) {
    //     NavigationService.goBack(this.props.navigation.state.key);
    //   }
    // }
  }

  componentDidMount() {
    // this.getInitialDetailKpi();
    this.getData();
  }

  getData = async () => {
    try {
      console.log('fetching ...');
      this.setState({
        load: true
      });
      let response = await fetch(
        'https://cantik-app.herokuapp.com/dummy/detail-dashboard'
      );
      let json = await response.json();
      if (json) {
        this.setState({
          load: false
        });
        console.log('fetching DONE');
        if (!json.error) {
          this.setState({
            load: false,
            data: json.data.order,
            tOrder: json.data.order,
            tPenjualan: json.data.sold,
            tDikunjungi: json.data.visited,
            tBaru: json.data.new,
            tPesanan: json.data.newOrder
          });
        }
      }
    } catch (error) {
      this.setState({
        load: false
      });
      console.error(error);
    }
  };

  tabsTimeChanged = value => {
    this.setState({
      tabsTime: value
    });
  };

  tabsWhiteChanged = value => {
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
    return <View style={styles.chartContainer}>
             <Charts />
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
            <ShadowComponent>
              {this.renderChart()}
            </ShadowComponent>
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
                    Tanggal
                  </Text>
                  <Text style={[Fonts.textHeaderPage, styles.textContent]}>
                    Pencapaian
                  </Text>
                </View>
                {data ? (
                  <View>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data[tabsTimeTarget].now
                        ? data[tabsTimeTarget].now.target
                        : '0'}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data[tabsTimeTarget].now
                        ? data[tabsTimeTarget].now.date
                        : ''}
                    </Text>
                    <Text style={[Fonts.type13, styles.textContent]}>
                      {data[tabsTimeTarget].now
                        ? data[tabsTimeTarget].now.achieve
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
            ? data[tabsTimeTarget][tabsTarget]
              ? data[tabsTimeTarget][tabsTarget].map((row, i) => (
                  <View
                    key={i.toString()}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 5
                    }}
                  >
                    <TargetCard type={tabsTarget} data={row} />
                  </View>
                ))
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
  }
});

const mapStateToProps = ({ auth, salesmanKpi }) => {
  return { auth, salesmanKpi };
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
