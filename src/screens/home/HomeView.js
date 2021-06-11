import {
  React,
  Component,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  BackHandler,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
  Text,
  ScrollView,
  RefreshControl
} from '../../library/reactPackage';
import {
  MaterialIcon,
  DeviceInfo,
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  BackHandlerCloseApp,
  ModalConfirmation,
  ModalConfirmationType2,
  ProgressBarType2,
  Shadow,
  TabsCustom,
  SlideIndicator
} from '../../library/component';
import {
  GlobalStyle,
  Fonts,
  MoneyFormatShort,
  getStartDateNow,
  getStartDateMinHour,
  getDateNow,
  getStartDateMonth,
  getEndDateMonth
} from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import _ from 'lodash';
import { SalesmanKpiMethod } from '../../services/methods';

const { width } = Dimensions.get('window');
const defaultImage = require('../../assets/images/sinbad_image/sinbadopacity.png');

const tabDashboard = [
  {
    title: 'Harian',
    value: 'daily'
  },
  // {
  //   title: 'Mingguan',
  //   value: 'weekly'
  // },
  {
    title: 'Bulanan',
    value: 'monthly'
  }
];

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalUpdateApp: false,
      openModalForceUpdateApp: false,
      menu: [
        {
          title1: 'Journey',
          title2: 'Plan',
          image: require('../../assets/images/menu/journey_plan.png'),
          goTo: 'journey_plan'
        },
        {
          title1: 'List',
          title2: 'Toko',
          image: require('../../assets/images/menu/list_toko.png'),
          goTo: 'list_toko'
        }
        // {
        //   title1: 'Dashboard',
        //   title2: '',
        //   image: require('../../assets/images/menu/dashboard.png'),
        //   goTo: 'dashboard'
        // }
      ],
      kpiDashboard: [
        {
          title: 'T. Order',
          id: 'orderedStores',
          image: require('../../assets/images/menu_dashboard/order.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'T. Baru',
          id: 'newStores',
          image: require('../../assets/images/menu_dashboard/new.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'Total Penjualan',
          id: 'totalSales',
          image: require('../../assets/images/menu_dashboard/sell.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'Total Pesanan',
          id: 'countOrders',
          image: require('../../assets/images/menu_dashboard/orderCreated.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'T. Dikunjungi',
          id: 'visitedStores',
          image: require('../../assets/images/menu_dashboard/visit.png'),
          data: {
            achieved: 0,
            target: 0
          }
        }
      ],
      pageOne: 0,
      tabValue: tabDashboard[0].value,
      refreshing: false,
      totalSalesPending: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.versionsGetProcess();
    this.getKpiData(this.state.tabValue);
    this.props.navigation.setParams({
      fullName: this.props.user.fullName,
      imageUrl: this.props.user.imageUrl
    });
    this.props.getSalesTeamProcess();
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (this.props.salesmanKpi.kpiDashboardData) {
      if (
        prevProps.salesmanKpi.kpiDashboardData !==
        this.props.salesmanKpi.kpiDashboardData
      ) {
        if (Object.keys(this.props.salesmanKpi.kpiDashboardData).length !== 0) {
          let newKpiDashboard = [...this.state.kpiDashboard];
          Object.keys(this.props.salesmanKpi.kpiDashboardData).map((key, i) => {
            const index = newKpiDashboard.findIndex(item => item.id === key);
            if (_.isEmpty(this.props.salesmanKpi.kpiDashboardData[key])) {
              newKpiDashboard[index].data.target = 0;
              newKpiDashboard[index].data.achieved = 0;
            } else {
              const newData = this.props.salesmanKpi.kpiDashboardData[key][0];
              newKpiDashboard[index].data.target = newData.target;
              newKpiDashboard[index].data.achieved = newData.achieved;
            }
          });
          this.setState({ kpiDashboard: newKpiDashboard });
        }
      }
    }
    if (prevProps.global.dataGetVersion !== this.props.global.dataGetVersion) {
      if (this.props.global.dataGetVersion !== null) {
        if (
          this.props.global.dataGetVersion.version !== DeviceInfo.getVersion()
        ) {
          if (this.props.global.dataGetVersion.isForce) {
            this.setState({ openModalForceUpdateApp: true });
          } else {
            this.setState({ openModalUpdateApp: true });
          }
        }
      }
    }
  }
  /** === PULL TO REFRESH === */
  _onRefresh() {
    this.setState({ refreshing: true }, () =>
      this.getKpiData(this.state.tabValue)
    );
  }
  /** === GET KPI DATA === */
  getKpiData(period) {
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
      period,
      userId: this.props.user.id,
      supplierId
    };

    switch (period) {
      case 'daily':
        params.startDate = getStartDateMinHour();
        params.endDate = getDateNow();
        break;

      case 'weekly':
        params.startDate = getStartDateNow();
        params.endDate = getDateNow();
        break;

      case 'monthly':
        params.startDate = getStartDateMonth();
        params.endDate = getEndDateMonth();
        break;

      default:
        break;
    }
    this.props.getKpiDashboardProcess(params);
    SalesmanKpiMethod.getKpiSalesPending(params).then(response => {
      if (response.code === 200 && response.data.payload.data.length !== 0) {
        this.setState({
          totalSalesPending: response.data.payload.data[0].achieved
        });
      } else {
        this.setState({
          totalSalesPending: 0
        });
      }
    });
    this.setState({ refreshing: false });
  }
  /** === FOR PARSE VALUE === */
  parseValue = (value, type, target) => {
    if (target) {
      if (value === 0 || value === '0') {
        return '-';
      }
    }
    if (type === 'totalSales') {
      if (value === 0 || value === '0') {
        return '-';
      }
      return MoneyFormatShort(value);
    }
    if (type === 'countOrders') {
      return `${value} Order`;
    }

    return `${value} Toko`;
  };
  /** === ON CHANGE TAB === */
  onChangeTab(value) {
    this.setState({ tabValue: value }, () =>
      this.getKpiData(this.state.tabValue)
    );
  }
  /** === GO TO PAGE === */
  goToPage(item) {
    switch (item.goTo) {
      case 'dashboard':
        NavigationService.navigate('DashboardView');
        break;
      case 'list_toko':
        NavigationService.navigate('MerchantView');
        break;
      case 'journey_plan':
        NavigationService.navigate('JourneyView');
        break;
      default:
        break;
    }
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => NavigationService.navigate('NotificationView')}
        >
          <MaterialIcon
            color={masterColor.fontBlack40}
            name={'notifications'}
            size={24}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={styles.headerLeftBox}>
          {navigation.state.params ? (
            navigation.state.params.imageUrl !== null ? (
              <View>
                <Image
                  source={{ uri: navigation.state.params.imageUrl }}
                  style={styles.circleImage}
                />
              </View>
            ) : (
              <View>
                <MaterialIcon
                  name="account-circle"
                  color={masterColor.mainColor}
                  size={30}
                />
              </View>
            )
          ) : (
            <View>
              <MaterialIcon
                name="account-circle"
                color={masterColor.mainColor}
                size={30}
              />
            </View>
          )}

          <View style={{ marginLeft: 12 }}>
            <Text style={Fonts.type5}>
              Hello{' '}
              {navigation.state.params
                ? navigation.state.params.fullName.length >= 20
                  ? navigation.state.params.fullName.substring(0, 20) + '...'
                  : navigation.state.params.fullName
                : ''}{' '}
              !
            </Text>
          </View>
        </View>
      )
    };
  };
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER BANNER === */
  renderBanner() {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={styles.boxBanner}>
          <Image
            source={require('../../assets/images/sinbad_image/Sinbad-Agent-Apps.png')}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: undefined,
              aspectRatio: 7 / 3
            }}
          />
        </View>
      </View>
    );
  }
  /** === RENDER KPI DASHBOARD === */
  renderKpiDashboard() {
    return (
      <View style={{ paddingVertical: 10 }}>
        <View style={{ height: 15 }} />
        <Text style={Fonts.type7}>Your Dashboard</Text>
        <View style={{ height: 8 }} />
        <TabsCustom
          listMenu={tabDashboard}
          onChange={value => this.onChangeTab(value)}
          value={this.state.tabValue}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          style={{ marginTop: 8, marginHorizontal: -16 }}
          snapToInterval={width - 90}
          snapToAlignment={'center'}
          onScroll={event => {
            let horizontalLimit = width - 90;
            if (event.nativeEvent.contentOffset.x % horizontalLimit) {
              const newPage = Math.round(
                event.nativeEvent.contentOffset.x / horizontalLimit
              );
              if (this.state.pageOne !== newPage) {
                this.setState({
                  pageOne: newPage
                });
              }
            }
          }}
        >
          <FlatList
            data={this.state.kpiDashboard}
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            show={false}
            style={{ marginBottom: 10, paddingHorizontal: 16 }}
            numColumns={2}
            listKey={(item, index) => index.toString()}
            renderItem={this.renderKpiDashboardItem.bind(this)}
          />
        </ScrollView>
        <View style={{ alignItems: 'center' }}>
          <SlideIndicator totalItem={2} activeIndex={this.state.pageOne} />
          <TouchableOpacity
            onPress={() => this.goToPage({ goTo: 'dashboard' })}
            style={{ marginTop: 16 }}
          >
            <Text style={Fonts.type11}>Lihat Detail Dashboard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>
    );
  }
  /** === RENDER KPI DASHBOARD ITEM === */
  renderKpiDashboardItem = ({ item, index }) => {
    return (
      <View key={index}>
        <Shadow
          radius={10}
          elevation={1}
          margin={5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 2,
            padding: 16,
            width: width * 0.77,
            backgroundColor: 'white'
          }}
        >
          <Image
            source={item.image ? item.image : defaultImage}
            style={styles.menuDashboardImage}
          />
          <View style={{ width: '78%' }}>
            <Text style={[Fonts.type97, { color: masterColor.fontBlack50 }]}>
              {item.title}
            </Text>
            <ProgressBarType2
              target={item.data.target}
              achieved={item.data.achieved}
            />
            {item.data.target === 0 ||
            item.data.target - item.data.achieved < 0 ? (
              <Text style={[Fonts.type65, { color: masterColor.fontRed50 }]}>
                {Number(item.data.target) === 0
                  ? 'Sedang tidak ada target'
                  : 'Anda sudah mencapai target'}
              </Text>
            ) : (
              <Text style={[Fonts.type65, { color: masterColor.fontRed50 }]}>
                {this.parseValue(
                  item.data.target - item.data.achieved,
                  item.id
                )}{' '}
                lagi untuk mencapai target
              </Text>
            )}
            {this.state.totalSalesPending !== 0 && item.id === 'totalSales' ? (
              <Text style={[Fonts.type65, { color: masterColor.fontRed50 }]}>
                (Total pesanan dalam proses{' '}
                {MoneyFormatShort(this.state.totalSalesPending)})
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', marginVertical: 4 }}>
              <View style={{ width: '50%' }}>
                <Text
                  style={[Fonts.type44, { color: masterColor.fontBlack50 }]}
                >
                  Pencapaian
                </Text>
                <Text
                  style={[Fonts.type44, { color: masterColor.fontBlack50 }]}
                >
                  {this.parseValue(item.data.achieved, item.id)}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: masterColor.fontBlack40,
                  marginRight: 20
                }}
              />
              <View>
                <Text
                  style={[Fonts.type44, { color: masterColor.fontBlack50 }]}
                >
                  Target
                </Text>
                <Text
                  style={[Fonts.type44, { color: masterColor.fontBlack50 }]}
                >
                  {this.parseValue(item.data.target, item.id, true)}
                </Text>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  };
  /** === RENDER MENU === */
  renderMenu() {
    return (
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          data={this.state.menu}
          renderItem={this.renderMenuItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ height: 20 }} />
      </View>
    );
  }
  /** === RENDER MENU ITEM === */
  renderMenuItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.menuBoxPerItem}
        key={index}
        onPress={() => this.goToPage(item)}
      >
        <Image source={item.image} style={styles.menuCircleImage} />
        <View style={styles.menuTitleBox}>
          <Text style={Fonts.type8}>{item.title1}</Text>
          <Text style={Fonts.type8}>{item.title2}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  /** === RENDER LAST ACTIVITY === */
  renderLastActivity() {
    return (
      <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
        <View>
          <Text style={Fonts.type7}>Last Actvity</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 16 }}>
          <View style={GlobalStyle.lines} />
        </View>
      </View>
    );
  }
  /** === RENDER LAST ACTIVITY ITEM === */
  renderLastActivityItem() {
    return (
      <View>
        <Text>last activity content</Text>
      </View>
    );
  }
  /** === RENDER ITEM MAIN === */
  renderItem({ item, index }) {
    return (
      <View style={styles.mainContainer} key={index}>
        {/* {this.renderBanner()} */}
        {this.renderKpiDashboard()}
        {this.renderMenu()}
        {/* {this.renderLastActivity()} */}
        {/* {this.renderLastActivityItem()} */}
      </View>
    );
  }
  /** === RENDER MAIN DATA === */
  renderData() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          refreshControl={
            <RefreshControl
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.refreshing}
            />
          }
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
  /**
   * =====================
   * MODAL
   * =====================
   */
  /** RENDER MODAL FORCE UPDATE */
  renderModalForceUpdate() {
    return this.state.openModalForceUpdateApp ? (
      <ModalConfirmationType2
        title={'Update Aplikasi'}
        statusBarWhite
        okText={'Update'}
        open={this.state.openModalForceUpdateApp}
        content={
          'Update aplikasi sekarang dan nikmati performa yang lebih stabil.'
        }
        type={'okeRed'}
        ok={() => {
          BackHandler.exitApp();
          Linking.openURL('market://details?id=com.sinbad.agent');
        }}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL UPDATE */
  renderModalUpdate() {
    return this.state.openModalUpdateApp ? (
      <ModalConfirmation
        title={'Update Aplikasi'}
        statusBarWhite
        okText={'Update'}
        cancelText={'Nanti'}
        open={this.state.openModalUpdateApp}
        content={
          'Update aplikasi sekarang dan nikmati performa yang lebih stabil.'
        }
        type={'okeRed'}
        ok={() => {
          this.setState({ openModalUpdateApp: false });
          Linking.openURL('market://details?id=com.sinbad.agent');
        }}
        cancel={() => this.setState({ openModalUpdateApp: false })}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <BackHandlerCloseApp navigation={this.props.navigation} />
        <StatusBarWhite />
        {this.renderData()}
        {/* modal */}
        {/* {this.renderModalUpdate()} */}
        {this.renderModalForceUpdate()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftBox: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    paddingLeft: 16
  },
  mainContainer: {
    paddingHorizontal: 16
  },
  boxBanner: {
    // backgroundColor: masterColor.mainColor,
    width: '100%',
    borderRadius: 15
    // paddingHorizontal: 20,
    // paddingVertical: 37
  },
  circleImage: {
    height: 30,
    width: 30,
    borderRadius: 30
  },
  menuCircleImage: {
    marginBottom: 6,
    marginHorizontal: 16,
    height: 50,
    width: 50,
    borderRadius: 50
  },
  menuTitleBox: {
    alignItems: 'center'
  },
  menuBoxPerItem: {
    alignItems: 'center',
    marginRight: 5
  },
  miniCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  },
  divider: {
    backgroundColor: masterColor.fontBlack10,
    height: 8,
    marginHorizontal: -16,
    marginVertical: 16
  },
  menuDashboardImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 16
  }
});

const mapStateToProps = ({ user, merchant, global, salesmanKpi }) => {
  return { user, merchant, global, salesmanKpi };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Dyah
 * updatedDate: 26112020
 * updatedFunction:
 * -> update kpi dashboard (bug fix & array validation)
 *
 */
