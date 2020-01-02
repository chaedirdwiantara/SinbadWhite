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
import GlobalStyle from '../../helpers/GlobalStyle';
import { MoneyFormat } from '../../helpers/NumberFormater';
import { LoadingPage } from '../../components/Loading';

const { width } = Dimensions.get('window');

class MerchantDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {change ? (
            <TouchableOpacity>
              <Text style={Fonts.type22}>Ubah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {call ? (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Text style={Fonts.type22}>Hubungi</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
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
          <Image
            source={require('../../assets/images/merchant/merchant_list.png')}
            style={styles.imageHeader}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            width: 0.8 * width
          }}
        >
          <Text style={Fonts.type7}>
            [{this.props.merchant.dataGetMerchantDetail.storeCode}]
          </Text>
          <Text style={Fonts.type7}>
            {this.props.merchant.dataGetMerchantDetail.name}
          </Text>
          <Text style={[Fonts.type8, { marginTop: 5 }]}>
            {this.combineAddress(this.props.merchant.dataGetMerchantDetail)}
          </Text>
        </View>
      </View>
    );
  }
  /** === MERCHANT PROFILE === */
  renderMerchantProfile() {
    return (
      <View style={[styles.contentContainer, GlobalStyle.shadowForBox]}>
        {this.renderTitleSection('Informasi Profil')}
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        {this.renderContentSection(
          'Nomor Telepon',
          this.props.merchant.dataGetMerchantDetail.phoneNo,
          true,
          true
        )}
        {this.renderContentSection(
          'Nomor NPWP',
          this.props.merchant.dataGetMerchantDetail.taxNo
        )}
      </View>
    );
  }
  /** === MERCHANT INFORMATION === */
  renderMerchantInformation() {
    return (
      <View style={[styles.contentContainer, GlobalStyle.shadowForBox]}>
        {this.renderTitleSection('Informasi Toko')}
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        {this.renderContentSection(
          'ID Toko',
          this.props.merchant.dataGetMerchantDetail.storeCode
        )}
        {this.renderContentSection(
          'Nama Toko',
          this.props.merchant.dataGetMerchantDetail.name
        )}
        {this.renderContentSection(
          'Alamat',
          this.combineAddress(this.props.merchant.dataGetMerchantDetail)
        )}
      </View>
    );
  }
  /** === MERCHANT INFORMATION PHISYCAL === */
  renderMerchantInformationPhisycal() {
    return (
      <View style={[styles.contentContainer, GlobalStyle.shadowForBox]}>
        {this.renderTitleSection('Informasi Fisik Toko')}
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        {this.renderContentSection(
          'Jumlah Pegawai',
          this.props.merchant.dataGetMerchantDetail.numberOfEmployee,
          true
        )}
        {this.renderContentSection(
          'Akses Kendaraan',
          this.props.merchant.dataGetMerchantDetail.vehicleAccessibility !==
            null
            ? this.props.merchant.dataGetMerchantDetail.vehicleAccessibility
                .name
            : null,
          true
        )}
      </View>
    );
  }
  /** === MERCHANT CLASIFICATION === */
  renderMerchantClasification() {
    return (
      <View style={[styles.contentContainer, GlobalStyle.shadowForBox]}>
        {this.renderTitleSection('Klasifikasi Toko')}
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        {this.renderContentSection(
          'Tipe Toko',
          this.props.merchant.dataGetMerchantDetail.storeType !== null
            ? this.props.merchant.dataGetMerchantDetail.storeType.name
            : null
        )}
        {this.renderContentSection(
          'Group Toko',
          this.props.merchant.dataGetMerchantDetail.storeGroup !== null
            ? this.props.merchant.dataGetMerchantDetail.storeGroup.name
            : null
        )}
        {this.renderContentSection(
          'Cluster Toko',
          this.props.merchant.dataGetMerchantDetail.storeClusters.length > 0
            ? this.modifyCluster(
                this.props.merchant.dataGetMerchantDetail.storeClusters
              )
            : null
        )}
        {this.renderContentSection(
          'Hierarchy',
          this.props.merchant.dataGetMerchantDetail.customerHierarchies.length >
            0
            ? this.modifyHierarchy(
                this.props.merchant.dataGetMerchantDetail.customerHierarchies
              )
            : null
        )}
      </View>
    );
  }
  /** === MERHCANT PAYMENT === */
  renderMerchantPayment() {
    return this.props.merchant.dataGetMerchantDetail.creditLimitStores.map(
      (item, index) => {
        return (
          <View
            style={[styles.contentContainer, GlobalStyle.shadowForBox]}
            key={index}
          >
            {this.renderTitleSection(item.invoiceGroup.name)}
            <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
            {this.renderContentSection(
              'Kredit',
              item.allowCreditLimit ? 'Ya' : 'Tidak'
            )}
            {this.renderContentSection(
              'Kredit Limit',
              MoneyFormat(parseInt(item.creditLimit, 10))
            )}
            {this.renderContentSection(
              'Balance',
              MoneyFormat(parseInt(item.balanceAmount, 10))
            )}
            {this.renderContentSection(
              'Account Receiveable',
              MoneyFormat(parseInt(item.accountReceivable, 10))
            )}
          </View>
        );
      }
    );
  }
  /** === RENDER CONTENT DATA === */
  renderData() {
    return (
      <ScrollView>
        {this.renderHeaderMerchant()}
        {this.renderMerchantProfile()}
        {this.renderMerchantInformation()}
        {this.renderMerchantInformationPhisycal()}
        {this.renderMerchantClasification()}
        {this.renderMerchantPayment()}
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
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
    marginBottom: 10,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imageHeader: {
    height: 169,
    width: '100%'
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
