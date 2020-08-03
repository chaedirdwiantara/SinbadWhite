import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  ScrollView
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import MenuHorizontal from '../../components/tabs/tabsHorizontal';
import TabsLightHorizontal from '../../components/tabs/tabsLightHorizontal';
import { Fonts } from '../../helpers';
import ShadowComponent from '../../components/card/shadow';
import TabsCustom from '../../components/tabs/tabsCustom';
import TabsCenter from '../../components/tabs/tabsCenter';
import TargetCard from '../../components/card/target';
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
    title: 'T. Barang',
    value: 'tBarang'
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

const dummyDataTarget = [
  {
    target: 10,
    date: '14/06/2020',
    achieve: 12,
    status: true
  },
  {
    target: 10,
    date: '15/06/2020',
    achieve: 9,
    status: false
  },
  {
    target: 10,
    date: '16/06/2020',
    achieve: 1,
    status: false
  },
  {
    target: 10,
    date: '17/06/2020',
    achieve: 20,
    status: true
  }
];

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsTime: listMenu[0].value,
      tabsWhite: listMenuWhite[0].value,
      tabsTimeTarget: listTimeTarget[0].value,
      tabsTarget: listTarget[0].value
    };
  }

  tabsTimeChanged = value => {
    this.setState({
      tabsTime: value
    });
  };

  tabsWhiteChanged = value => {
    this.setState({
      tabsWhite: value
    });
  };

  tabsTargetChanged = value => {
    this.setState({
      tabsTarget: value
    });
  };

  render() {
    const { tabsTime, tabsWhite, tabsTimeTarget, tabsTarget } = this.state;
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <MenuHorizontal
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
              <View style={styles.chartContainer} />
            </ShadowComponent>
          </View>
          <View style={styles.sparator} />
          <TabsLightHorizontal
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
              <TabsCustom listMenu={listTimeTarget} value={tabsTimeTarget} />
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
                <View>
                  <Text
                    style={[
                      Fonts.type13,
                      styles.textContent,
                      {
                        color: '#757575'
                      }
                    ]}
                  >
                    10 Toko
                  </Text>
                  <Text
                    style={[
                      Fonts.type13,
                      styles.textContent,
                      {
                        color: '#757575'
                      }
                    ]}
                  >
                    15/06/2020
                  </Text>
                  <Text
                    style={[
                      Fonts.type13,
                      styles.textContent,
                      {
                        color: '#757575'
                      }
                    ]}
                  >
                    8 Toko
                  </Text>
                </View>
              </View>
            </ShadowComponent>
          </View>
          <View
            style={{
              padding: 20
            }}
          >
            <TabsCenter
              listMenu={listTarget}
              value={tabsTarget}
              onChange={this.tabsTargetChanged}
            />
          </View>
          {dummyDataTarget.map((row, i) => (
            <View
              key={i.toString()}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5
              }}
            >
              <TargetCard data={row} />
            </View>
          ))}
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
    marginVertical: 5
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);

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
