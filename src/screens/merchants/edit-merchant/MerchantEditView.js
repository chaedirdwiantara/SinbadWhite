import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import NavigationService from '../../../navigation/NavigationService';
/** MODULE PAGE */
import MerchantDetailPaymentView from '../details-merchant/MerchantDetailPaymentView';
import MerchantEditPartialView from './MerchantEditPartialView';

class MerchantEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={Fonts.type5}>{state.params.title}</Text>
        </View>
      ),
      headerRight: () => <View />
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataEditMerchant !==
      this.props.merchant.dataEditMerchant
    ) {
      if (this.props.merchant.dataEditMerchant !== null) {
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }
  /** THIS FOR SWITCH VIEW */
  switchView() {
    switch (this.props.navigation.state.params.type) {
      case 'merchantPayment':
        return <MerchantDetailPaymentView />;
      case 'merchantPhysical':
      case 'merchantClassification':
      case 'merchantOwnerIdNo':
      case 'merchantOwnerTaxNo':
        return (
          <MerchantEditPartialView
            type={this.props.navigation.state.params.type}
            showButton
          />
        );
      case 'merchantAccount':
        return (
          <MerchantEditPartialView
            type={this.props.navigation.state.params.type}
            showButton={false}
          />
        );
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  render() {
    return <View style={styles.mainContainer}>{this.switchView()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(MerchantEditView);

/**
 * =======================
 * NOTE
 * =======================
 * - Module Exist
 * 1. merchantPayment = Faktur
 * 2. merchantAddress = Alamat Toko
 * 3. merchantAccount = Akun Toko
 * 4. merchantPhysical = Informasi Fisik Toko
 * 5. merchantClassification = Klasifikasi Toko
 * 6. merchantOwnerIdNo = Ubah KTP / Tambah KTP
 * 7. merchantOwnerTaxNo = Ubah NPWP / Tambah NPWP
 * 8. merchantOwnerImageId = Foto KTP
 * 9. merchantOwnerImageSelfie = Foto Selfie + KTP
 */
