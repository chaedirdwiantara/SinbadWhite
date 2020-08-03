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

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsTime: listMenu[0].value,
      tabsWhite: listMenuWhite[0].value
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

  render() {
    const { tabsTime, tabsWhite } = this.state;
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
              <View
                style={{
                  width: '100%',
                  height: 300,
                  backgroundColor: masterColor.backgroundWhite,
                  borderRadius: 7
                }}
              />
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
            <Text
              style={[
                Fonts.textHeaderPage,
                {
                  marginBottom: 15
                }
              ]}
            >
              Target Saat Ini
            </Text>
            <ShadowComponent>
              <View
                style={{
                  width: '100%',
                  height: 300,
                  backgroundColor: masterColor.fontBlack40,
                  borderRadius: 7
                }}
              />
            </ShadowComponent>
          </View>
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
