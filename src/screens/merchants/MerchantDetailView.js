import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Text,
  PermissionsAndroid,
  ToastAndroid
} from '../../library/reactPackage';
import {
  connect,
  bindActionCreators,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ProgressBarType1,
  LoadingPage,
  ButtonMenuType1
} from '../../library/component';
import { Color } from '../../config';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService.js';
import CallMerchant from '../../screens/global/CallMerchant';

const { width } = Dimensions.get('window');

class MerchantDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCallMerchant: false,
      showToast: false
    };
  }
  /**
   * ===============================
   * FUNCTIONAL
   * ==============================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.merchantGetDetailProcessV2(
      this.props.navigation.state.params.id
    );
  }
  /** === COMBINE ADDRESS === */
  combineAddress(item) {
    let address = '';
    let urban = '';
    let province = '';
    if (item.address) {
      address = item.address ? item.address : '';
    }
    if (item.urban) {
      urban =
        (item.urban.urban ? `, ${item.urban.urban}` : '') +
        (item.urban.district ? `, ${item.urban.district}` : '') +
        (item.urban.city ? `, ${item.urban.city}` : '');
    }
    if (item.urban) {
      province = item.urban.province ? `, ${item.urban.province.name}` : '';
    }
    return address + urban + province;
  }
  /** === MODIFY CLUSTER === */
  modifyCluster(item) {
    const cluster = [];
    item.map((itemCluster, index) => {
      if (index === 0) {
        cluster.push(itemCluster.cluster.name);
      } else {
        cluster.push(', ' + itemCluster.cluster.name);
      }
    });
    return cluster;
  }
  /** === MODIFY HIRARCHY === */
  modifyHierarchy(item) {
    const hierarchy = [];
    item.map((itemHierarchy, index) => {
      if (index === 0) {
        hierarchy.push(itemHierarchy.hierarchy.name);
      } else {
        hierarchy.push(', ' + itemHierarchy.hierarchy.name);
      }
    });
    return hierarchy;
  }

  async toMapDetail() {
    const {
      latitude,
      longitude,
      name,
      storeCode,
      externalId,
      address,
      urban
    } = this.props.merchant.dataGetMerchantDetailV2;
    const params = {
      latitude,
      longitude,
      name,
      storeCode,
      externalId,
      address,
      urban
    };
    try {
      let granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!granted) {
        let permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
          NavigationService.navigate('MerchantDetailMapView', params);
        } else {
          ToastAndroid.show(
            'Anda harus mengizinkan aplikasi untuk mengakses lokasi',
            ToastAndroid.SHORT
          );
        }
      } else {
        NavigationService.navigate('MerchantDetailMapView', params);
      }
    } catch (error) {
      ToastAndroid.show(error?.message || '', ToastAndroid.SHORT);
    }
  }
  /** GO TO PAGE */
  goTo(page) {
    switch (page) {
      case 'profileInformation':
        NavigationService.navigate('MerchantDetailProfileView');
        break;
      case 'merchantInformation':
        NavigationService.navigate('MerchantDetailInformationView');
        break;
      case 'merchantPayment':
        NavigationService.navigate('MerchantEditView', {
          title: 'Faktur',
          type: 'merchantPayment'
        });
        break;
      case 'merchantAddress':
        NavigationService.navigate('MerchantDetailAddressView');
        break;
      case 'merchantOrderHistory':
        NavigationService.navigate('HistoryView', {
          storeId: this.props.merchant.dataGetMerchantDetailV2.storeId
        });
        break;
      default:
        break;
    }
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'close':
        this.setState({ openModalCallMerchant: false });
        break;
      default:
        break;
    }
  }
  /** === CHECK REJECTION === */
  checkRejection(field) {
    const data = this.props.merchant.dataMerchantRejectedV2;
    switch (field) {
      case 'merchantInformation':
        return data.name || data.imageUrl || data.phoneNo;
      default:
        break;
    }
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER VERIFIED ICON === */
  renderVerifiedIcon() {
    return this.props.merchant.dataGetMerchantDetailV2.approvalStatus ===
      'rejected' ||
      this.props.merchant.dataGetMerchantDetailV2.approvalStatus ===
        'verified' ? (
      <View style={{ paddingRight: 8 }}>
        {this.props.merchant.dataGetMerchantDetailV2.approvalStatus ===
        'rejected' ? (
          <MaterialIcon name="cancel" color={Color.mainColor} size={24} />
        ) : (
          <MaterialIcon
            name="verified-user"
            color={Color.fontGreen50}
            size={24}
          />
        )}
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER TTILE SECTION === */
  renderTitleSection(title) {
    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
        <Text style={Fonts.type30}>{title}</Text>
      </View>
    );
  }
  /** === RENDER CONTENT SECTION === */
  renderContentSection(key, value, change, call) {
    return (
      <View style={styles.boxContent}>
        <View style={{ width: 0.6 * width }}>
          <Text style={[Fonts.type31, { marginBottom: 6 }]}>{key}</Text>
          <Text style={Fonts.type8}>{value ? value : '-'}</Text>
        </View>
      </View>
    );
  }
  /** === HEADER MERCHANT === */
  renderHeaderMerchant() {
    const { dataGetMerchantDetailV2 } = this.props.merchant;
    return (
      <View
        style={[
          styles.contentContainer,
          GlobalStyle.shadowBottom,
          { paddingVertical: 0 }
        ]}
      >
        <View>
          <TouchableOpacity
            style={[styles.boxMaps, GlobalStyle.shadowForBox5]}
            onPress={() => this.toMapDetail()}
          >
            <Image
              source={require('../../assets/icons/maps/map.png')}
              style={styles.mapImage}
            />
          </TouchableOpacity>
          {dataGetMerchantDetailV2.imageUrl ? (
            <Image
              source={{ uri: dataGetMerchantDetailV2.imageUrl }}
              style={{ width: '100%', height: 169 }}
            />
          ) : (
            <View
              style={{
                height: 169,
                backgroundColor: Color.fontBlack05,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={require('../../assets/images/merchant/store.png')}
                style={styles.imageHeader}
              />
            </View>
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            width: 0.8 * width
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {this.renderVerifiedIcon()}
            <Text style={Fonts.type7}>
              {dataGetMerchantDetailV2.externalId ||
                dataGetMerchantDetailV2.storeCode ||
                '-'}
            </Text>
          </View>

          <Text style={Fonts.type7}>{dataGetMerchantDetailV2.name}</Text>
          <Text
            style={[Fonts.type8, { marginTop: 5, textTransform: 'capitalize' }]}
          >
            {this.combineAddress(dataGetMerchantDetailV2)}
          </Text>
          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => this.setState({ openModalCallMerchant: true })}
          >
            <Text style={[Fonts.type62, { textDecorationLine: 'underline' }]}>
              Hubungi Toko
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /**
   * =============================
   * NEW DESIGN PROFILE MERCHANT
   * =============================
   */
  /** PROFILE BAR */
  renderMerchantProfileBar() {
    return (
      <View
        style={[
          GlobalStyle.shadowForBox,
          { paddingVertical: 16, marginBottom: 16 }
        ]}
      >
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <Text style={Fonts.type42}>Kelengkapan Profil</Text>
        </View>
        <ProgressBarType1
          totalStep={this.props.merchant.dataGetMerchantDetailV2.progress.total}
          currentStep={
            this.props.merchant.dataGetMerchantDetailV2.progress.done
          }
        />
      </View>
    );
  }
  /** MERCHANT INFORMATION */
  renderMerchantInformationList() {
    return (
      <View>
        {this.renderMerchantInformationOwner()}
        {this.renderMerchantInformationMerchant()}
        {this.renderMerchantInformationPayment()}
      </View>
    );
  }
  /** MERCHANT INFORMATION OWNER */
  renderMerchantInformationOwner() {
    return (
      <View>
        <View style={styles.boxContentHeader}>
          <Text style={Fonts.type42}>Data Pemilik</Text>
          <Text style={Fonts.type59}>
            {
              this.props.merchant.dataGetMerchantDetailV2.progress.ownerData
                .done
            }
            /
            {
              this.props.merchant.dataGetMerchantDetailV2.progress.ownerData
                .total
            }{' '}
            Selesai
          </Text>
        </View>
        <ButtonMenuType1
          child
          title={'Informasi  Profil'}
          onPress={() => this.goTo('profileInformation')}
        />
      </View>
    );
  }
  /** MERCHANT INFORMATION MERCHANT */
  renderMerchantInformationMerchant() {
    return (
      <View>
        <View style={styles.boxContentHeader}>
          <Text style={Fonts.type42}>Data Toko</Text>
          <Text style={Fonts.type59}>
            {
              this.props.merchant.dataGetMerchantDetailV2.progress.storeData
                .done
            }
            /
            {
              this.props.merchant.dataGetMerchantDetailV2.progress.storeData
                .total
            }{' '}
            Selesai
          </Text>
        </View>
        <ButtonMenuType1
          child
          notification={this.checkRejection('merchantInformation')}
          title={'Informasi Toko'}
          onPress={() => this.goTo('merchantInformation')}
        />
        <ButtonMenuType1
          child
          title={'Alamat Toko'}
          onPress={() => this.goTo('merchantAddress')}
        />
      </View>
    );
  }
  /** MERCHANT INFORMATION PAYMENT */
  renderMerchantInformationPayment() {
    return (
      <View>
        <View style={styles.boxContentHeader}>
          <Text style={Fonts.type42}>Pengaturan Pembayaran</Text>
        </View>
        <ButtonMenuType1
          child
          title={'Faktur'}
          onPress={() => this.goTo('merchantPayment')}
        />
      </View>
    );
  }
  /** MERCHANT HISTORY ORDER */
  renderMerchantOrderHistory() {
    return (
      <View>
        <View style={styles.boxContentHeader}>
          <Text style={Fonts.type42}>Pesanan</Text>
        </View>
        <ButtonMenuType1
          child
          title={'Pesanan'}
          onPress={() => this.goTo('merchantOrderHistory')}
        />
        <ButtonMenuType1
          child
          title={'Riwayat Retur'}
          onPress={() => this.goTo('merchantOrderHistory')}
        />
      </View>
    );
  }
  /** === RENDER CONTENT DATA === */
  renderData() {
    return (
      <ScrollView>
        {this.renderHeaderMerchant()}
        {this.renderMerchantProfileBar()}
        {this.renderMerchantInformationList()}
        {this.renderMerchantOrderHistory()}
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
    );
  }
  /**
   * =====================
   * MODAL
   * =====================
   */

  /** MODAL CALL */
  renderModalCallMerchant() {
    return this.state.openModalCallMerchant ? (
      <View>
        <CallMerchant
          phoneNumber={
            this.props.merchant.dataGetMerchantDetailV2.owner.mobilePhoneNo
          }
          open={this.state.openModalCallMerchant}
          close={() => this.setState({ openModalCallMerchant: false })}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {!this.props.merchant.loadingGetMerchantDetail &&
        this.props.merchant.dataGetMerchantDetailV2 !== null ? (
          this.renderData()
        ) : (
          <LoadingPage />
        )}
        {/* modal */}
        {this.renderModalCallMerchant()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  boxContentHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imageHeader: {
    height: 120,
    width: 120
  },
  boxMaps: {
    width: 60,
    height: 60,
    borderRadius: 5,
    position: 'absolute',
    right: 16,
    zIndex: 1000,
    bottom: -30
  },
  mapImage: {
    width: 60,
    height: 60,
    borderRadius: 5
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantDetailView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
