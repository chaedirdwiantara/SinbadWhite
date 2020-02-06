import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import ProgressBarType1 from '../../components/progress_bar/ProgressBarType1';
import GlobalStyle from '../../helpers/GlobalStyle';
import { LoadingPage } from '../../components/Loading';
import NavigationService from '../../navigation/NavigationService.js';
import ButtonMenuType1 from '../../components/button/ButtonMenuType1';
import CallMerchant from '../../screens/global/CallMerchant';

const { width } = Dimensions.get('window');

class MerchantDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCallMerchant: false
    };
  }
  /**
   * ===============================
   * FUNCTIONAL
   * ==============================
   */
  componentDidMount() {
    this.props.merchantGetDetailProcess(
      this.props.navigation.state.params.storeId
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

  toMapDetail() {
    NavigationService.navigate('MerchantDetailMapView', {
      latitude: this.props.merchant.dataGetMerchantDetail.latitude,
      longitude: this.props.merchant.dataGetMerchantDetail.longitude,
      name: this.props.merchant.dataGetMerchantDetail.name,
      storeCode: this.props.merchant.dataGetMerchantDetail.storeCode,
      externalId: this.props.merchant.dataGetMerchantDetail.externalId,
      address: this.props.merchant.dataGetMerchantDetail.address,
      urban: this.props.merchant.dataGetMerchantDetail.urban
    });
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
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
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
          {this.props.merchant.dataGetMerchantDetail.imageUrl ? (
            <Image
              source={{
                uri: this.props.merchant.dataGetMerchantDetail.imageUrl
              }}
              style={styles.imageHeader}
            />
          ) : (
            <View
              style={{
                height: 169,
                backgroundColor: masterColor.fontBlack05,
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
          <Text style={Fonts.type7}>
            {this.props.merchant.dataGetMerchantDetail.externalId
              ? this.props.merchant.dataGetMerchantDetail.externalId
              : this.props.merchant.dataGetMerchantDetail.storeCode
              ? this.props.merchant.dataGetMerchantDetail.storeCode
              : '-'}
          </Text>
          <Text style={Fonts.type7}>
            {this.props.merchant.dataGetMerchantDetail.name}
          </Text>
          <Text
            style={[Fonts.type8, { marginTop: 5, textTransform: 'capitalize' }]}
          >
            {this.combineAddress(this.props.merchant.dataGetMerchantDetail)}
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
          totalStep={this.props.merchant.dataGetMerchantDetail.progress.total}
          currentStep={this.props.merchant.dataGetMerchantDetail.progress.done}
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
            {this.props.merchant.dataGetMerchantDetail.progress.ownerData.done}/
            {this.props.merchant.dataGetMerchantDetail.progress.ownerData.total}{' '}
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
            {this.props.merchant.dataGetMerchantDetail.progress.storeData.done}/
            {this.props.merchant.dataGetMerchantDetail.progress.storeData.total}{' '}
            Selesai
          </Text>
        </View>
        <ButtonMenuType1
          child
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
  /** === RENDER CONTENT DATA === */
  renderData() {
    return (
      <ScrollView>
        {this.renderHeaderMerchant()}
        {this.renderMerchantProfileBar()}
        {this.renderMerchantInformationList()}
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
            this.props.merchant.dataGetMerchantDetail.owner.mobilePhoneNo
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
        this.props.merchant.dataGetMerchantDetail !== null ? (
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
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    backgroundColor: masterColor.backgroundWhite,
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
