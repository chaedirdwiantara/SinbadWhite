import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon,
  DeviceInfo
} from '../../library/thirdPartyPackage';
import { StatusBarWhite, ToastType1 } from '../../library/component';
import { Color } from '../../config';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import CallCS from '../../screens/global/CallCS';
import { GlobalMethod } from '../../services/methods';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCS: false,
      showToast: false,
      menu: [
        {
          name: 'Data Diri',
          goTo: 'data_diri'
        },
        {
          name: 'Segementasi Sales Team',
          goTo: 'segmentasi_sales_team'
        },
        // {
        //   name: 'Area Mapping',
        //   goTo: 'area_mapping'
        // },
        {
          name: 'Hubungi Customer Services',
          goTo: 'call_cs'
        },
        {
          name: 'Clear Cache',
          goTo: 'clear_cache'
        }
      ]
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'close':
        this.setState({ openModalCS: false });
        break;
      default:
        break;
    }
  }
  /** === SIGN OUT === */
  signOut() {
    this.props.navigation.navigate('Auth');
    setTimeout(() => {
      this.props.signOut();
      this.props.deleteAllData();
    }, 50);
  }
  /** === GO TO PAGE === */
  goTo(page) {
    switch (page) {
      case 'data_diri':
        NavigationService.navigate('ProfileDataView');
        break;
      case 'call_cs':
        this.setState({ openModalCS: true });
        break;
      // case 'area_mapping':
      //   this.props.savePageAddMerchantFrom('ProfileView')
      //   NavigationService.navigate('ProfileAreaMapping')
      //   break;
      case 'segmentasi_sales_team':
        NavigationService.navigate('SegmentasiSalesTeamView')
        break;
      case 'clear_cache':
        this.clearCache();
        break;
      default:
        break;
    }
  }
  /** === CLEAR CACHE === */
  clearCache() {
    this.setState({ showToast: true });
    this.props.deleteAllData();
    this.getPrivileges();
    this.props.versionsGetProcess();
    this.props.getSalesTeamProcess();
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 1000);
  }
  /** === GET SALES PRIVILEGE === */
  getPrivileges() {
    let supplierId = GlobalMethod.userSupplierMapping();
    if (supplierId.length > 0) {
      supplierId = supplierId[0].toString();
    }
    let userId = this.props.user?.id || '';
    this.props.getPrivilegeProcess({ supplierId, userId });
  }
  /**
   * ================
   * RENDER VIEW
   * ================
   */
  /** === RENDER HEADER === */
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeaderImage}>
          {this.props.user.imageUrl !== null ? (
            <Image
              source={{ uri: this.props.user.imageUrl }}
              style={[GlobalStyle.image46, { borderRadius: 46 }]}
            />
          ) : (
            <Image
              source={require('../../assets/images/profile/avatar.png')}
              style={[GlobalStyle.image46, { borderRadius: 46 }]}
            />
          )}
        </View>
        <View style={styles.boxHeaderNamePhone}>
          <Text style={Fonts.type19}>{this.props.user.fullName}</Text>
          <Text style={Fonts.type20}>{this.props.user.mobilePhoneNo}</Text>
        </View>
        <View />
      </View>
    );
  }
  /** === RENDER MENU ==== */
  renderMenu() {
    return this.state.menu.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => this.goTo(item.goTo)}
          >
            <Text style={Fonts.type8}>{item.name}</Text>
            <View style={{ position: 'absolute', right: 16 }}>
              <MaterialIcon
                name="chevron-right"
                color={Color.fontBlack40}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      );
    });
  }

  renderVersion() {
    const envName = (w = DeviceInfo.getApplicationName()) => {
      let words = w.split(" ");
      if (words.length == 3) {
        return words[2]; // return Development, Staging, ""
      } else {
        return ""
      }
    }
    return (
      <View style={{ paddingLeft: 16, paddingVertical: 16 }}>
        <Text style={Fonts.type9}>
          {envName()} Versi {DeviceInfo.getVersion()} (
          {DeviceInfo.getBuildNumber()})
        </Text>
      </View>
    );
  }
  /** === RENDER SIGNOUT === */
  renderSignOut() {
    return (
      <TouchableOpacity
        style={styles.signOutContainer}
        onPress={() => this.signOut()}
      >
        <Text style={Fonts.type21}>LOGOUT</Text>
      </TouchableOpacity>
    );
  }
  /** MENU CALL */
  /** MODAL MENU ADD MERCHANT */
  renderModalCallCS() {
    return this.state.openModalCS ? (
      <View>
        <CallCS
          open={this.state.openModalCS}
          close={() => this.setState({ openModalCS: false })}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** TOAST */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1
        margin={30}
        content={'Data kamu sudah berhasil dibersihkan'}
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderMenu()}
        {this.renderVersion()}
        {this.renderSignOut()}
        {this.renderModalCallCS()}
        {this.renderToast()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  headerContainer: {
    backgroundColor: Color.mainColor,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 16
  },
  signOutContainer: {
    paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.fontBlack10
  },
  boxMenu: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxHeaderNamePhone: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  boxHeaderImage: {
    paddingRight: 5
  }
});

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
