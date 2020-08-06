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
  ScrollView
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
  TabsCustom
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormatShort } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import { Color } from '../../config';

const { width } = Dimensions.get('window');
const defaultImage = require('../../assets/images/sinbad_image/sinbadopacity.png');

const tabDashboard = [
  {
    title: 'Harian',
    value: 'day'
  },
  {
    title: 'Mingguan',
    value: 'week'
  },
  {
    title: 'Bulanan',
    value: 'month'
  }
];

const kpiDashboardDummy = () => [
  {
    id: 'order',
    data: {
      achieved: 12,
      target: 20
    }
  },
  {
    id: 'sell',
    data: {
      achieved: 2300000,
      target: 4600000
    }
  },
  {
    id: 'visit',
    data: {
      achieved: 12,
      target: 20
    }
  },
  {
    id: 'new',
    data: {
      achieved: 10,
      target: 20
    }
  },
  {
    id: 'orderCreated',
    data: {
      achieved: 10,
      target: 20
    }
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
          id: 'order',
          image: require('../../assets/images/menu_dashboard/order.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'T. Baru',
          id: 'new',
          image: require('../../assets/images/menu_dashboard/new.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'Total Penjualan',
          id: 'sell',
          image: require('../../assets/images/menu_dashboard/sell.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'Total Pesanan',
          id: 'orderCreated',
          image: require('../../assets/images/menu_dashboard/orderCreated.png'),
          data: {
            achieved: 0,
            target: 0
          }
        },
        {
          title: 'T. Dikunjungi',
          id: 'visit',
          image: require('../../assets/images/menu_dashboard/visit.png'),
          data: {
            achieved: 0,
            target: 0
          }
        }
      ],
      pageOne: 0,
      tabValue: tabDashboard[0].value
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.versionsGetProcess();
    this.props.getKpiDashboardProcess({});
    this.getKpiData();
    this.props.navigation.setParams({
      fullName: this.props.user.fullName,
      imageUrl: this.props.user.imageUrl
    });
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
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
  /** === GET KPI DATA === */
  getKpiData() {
    const newData = kpiDashboardDummy();
    let newKpiDashboard = [...this.state.kpiDashboard];
    newData.map(item => {
      const index = newKpiDashboard.findIndex(
        newitem => newitem.id === item.id
      );
      newKpiDashboard[index].data = item.data;
    });
    this.setState({ kpiDashboard: newKpiDashboard });
  }
  /** === ON CHANGE TAB === */
  onChangeTab(value) {
    this.setState({ tabValue: value });
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
        <View style={{ width: '100%', height: 15 }} />
        <Text style={Fonts.type7}>Your Dashboard</Text>
        <View style={{ width: '100%', height: 8 }} />
        <TabsCustom
          listMenu={tabDashboard}
          onChange={value => this.onChangeTab(value)}
          value={this.state.tabValue}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          style={{ marginTop: 8 }}
          snapToInterval={width - 90}
          snapToAlignment={'center'}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30
          }}
          onScroll={data => {
            this.setState({ pageOne: data.nativeEvent.contentOffset.x });
          }}
        >
          <FlatList
            data={this.state.kpiDashboard}
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            show={false}
            style={{ marginBottom: 10 }}
            numColumns={2}
            listKey={(item, index) => index.toString()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Shadow
                key={index}
                radius={10}
                elevation={1}
                margin={5}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 2,
                  padding: 10,
                  width: 320,
                  backgroundColor: 'white'
                }}
              >
                <Image
                  source={item.image ? item.image : defaultImage}
                  style={styles.menuCircleImage}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[Fonts.type97, { color: Color.fontBlack50 }]}>
                    {item.title}
                  </Text>
                  <ProgressBarType2
                    target={item.data.target}
                    achieved={item.data.achieved}
                  />
                  {item.data.target === 0 ? (
                    <Text style={[Fonts.type65, { color: Color.fontRed50 }]}>
                      {' '}
                      Sedang tidak ada target{' '}
                    </Text>
                  ) : (
                    <Text style={[Fonts.type65, { color: Color.fontRed50 }]}>
                      {item.title === 'Total Penjualan'
                        ? MoneyFormatShort(
                            item.data.target - item.data.achieved
                          )
                        : item.data.target - item.data.achieved}{' '}
                      {item.title === 'Total Penjualan' ? null : 'Toko'} lagi
                      mencapai target
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    <View style={{ width: '50%' }}>
                      <Text
                        style={[Fonts.type44, { color: Color.fontBlack50 }]}
                      >
                        Pencapaian
                      </Text>
                      <Text
                        style={[Fonts.type44, { color: Color.fontBlack50 }]}
                      >
                        {item.title === 'Total Penjualan'
                          ? MoneyFormatShort(item.data.achieved)
                          : item.data.achieved}{' '}
                        {item.title === 'Total Penjualan' ? null : 'Toko'}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: Color.fontBlack40,
                        marginRight: 20
                      }}
                    />
                    <View>
                      <Text
                        style={[Fonts.type44, { color: Color.fontBlack50 }]}
                      >
                        Target
                      </Text>
                      <Text
                        style={[Fonts.type44, { color: Color.fontBlack50 }]}
                      >
                        {item.title === 'Total Penjualan'
                          ? MoneyFormatShort(item.data.target)
                          : item.data.target}{' '}
                        {item.title === 'Total Penjualan' ? null : 'Toko'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Shadow>
            )}
          />
        </ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[
                styles.miniCircle,
                {
                  backgroundColor:
                    this.state.pageOne === 0
                      ? Color.mainColor
                      : Color.fontBlack60
                }
              ]}
            />
            <View
              style={[
                styles.miniCircle,
                {
                  backgroundColor:
                    this.state.pageOne === 0
                      ? Color.fontBlack60
                      : Color.mainColor
                }
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.goToPage({ goTo: 'dashboard' })}
            style={{ marginTop: 8 }}
          >
            <Text style={Fonts.type11}>Lihat Detail Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
 * updatedDate: 04082020
 * updatedFunction:
 * -> Add KPI dashboard and Comment dashboard menu icon
 *
 */
