import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import OpenAppSettings from 'react-native-app-settings';
import NavigationService from '../../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import ButtonSingle from '../../../components/button/ButtonSingle';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import masterColor from '../../../config/masterColor';
import ProgressBarType1 from '../../../components/progress_bar/ProgressBarType1';
import DropdownType1 from '../../../components/input/DropdownType1';
import InputType2 from '../../../components/input/InputType2';
import InputType1 from '../../../components/input/InputType1';
import InputMapsType1 from '../../../components/input/InputMapsType1';
import ModalBottomErrorResponsWhite from '../../../components/error/ModalBottomErrorResponsWhite';
import ErrorPageNoGPS from '../../../components/error/ErrorPageNoGPS';

class AddMerchantStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.merchant.dataAddMerchantVolatile.user.fullName,
      name: this.props.merchant.dataAddMerchantVolatile.name,
      phone: this.props.merchant.dataAddMerchantVolatile.user.phone,
      supplier:
        this.props.user.userSuppliers.length === 1
          ? this.props.user.userSuppliers[0].supplier.id
          : this.props.merchant.dataAddMerchantVolatile.supplier.supplierId,
      supplierName:
        this.props.user.userSuppliers.length === 1
          ? this.props.user.userSuppliers[0].supplier.name
          : this.props.merchant.dataAddMerchantVolatile.supplier.supplierName,
      idNo: this.props.merchant.dataAddMerchantVolatile.user.idNo,
      taxNo: this.props.merchant.dataAddMerchantVolatile.user.taxNo,
      address: this.props.merchant.dataAddMerchantVolatile.address,
      longitude: this.props.merchant.dataAddMerchantVolatile.longitude,
      latitude: this.props.merchant.dataAddMerchantVolatile.latitude,
      refreshLocation: false,
      openErrorAddMerchant: false,
      openModalNoGPS: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    /** IF ADD MERCHANT SUCCESS */
    if (
      prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant
    ) {
      if (this.props.merchant.dataAddMerchant !== null) {
        NavigationService.navigate('Home');
      }
    }
    /** IF ERROR ADD MERCHANT */
    if (
      prevProps.merchant.errorAddMerchant !==
      this.props.merchant.errorAddMerchant
    ) {
      if (this.props.merchant.errorAddMerchant !== null) {
        this.setState({ openErrorAddMerchant: true });
      }
    }
  }
  /** SEND DATA ADD MERCHANT */
  finalStep() {
    Keyboard.dismiss();
    this.props.saveVolatileDataAddMerchant({
      fullName: this.state.fullName,
      name: this.state.name,
      supplierId: this.state.supplier,
      supplierName: this.state.supplierName,
      idNo: this.state.idNo,
      taxNo: this.state.taxNo,
      phone: this.state.phone,
      address: this.state.address,
      longitude: this.props.merchant.dataAddMerchantVolatile.longitude,
      latitude: this.props.merchant.dataAddMerchantVolatile.latitude,
      province: this.props.global.dataGlobalLongLatToAddress.province,
      city: this.props.global.dataGlobalLongLatToAddress.city,
      district: this.props.global.dataGlobalLongLatToAddress.district,
      urban: this.props.global.dataGlobalLongLatToAddress.urban
    });
    setTimeout(() => {
      this.props.merchantAddProcess(
        this.props.merchant.dataAddMerchantVolatile
      );
    }, 100);
  }
  /** FOR GEOLOCATION */
  /** === GET CURRENT LOCATION === */
  successMaps = success => {
    this.setState({ openModalNoGPS: false });
    NavigationService.navigate('MapsView');
  };
  errorMaps = () => {
    this.setState({ openModalNoGPS: true });
  };
  getCurrentLocation() {
    Geolocation.getCurrentPosition(this.successMaps, this.errorMaps);
  }
  /** GO TO DROPDOWN LIST */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
  }
  /** disable button */
  buttonDisable() {
    return (
      this.state.fullName !== '' &&
      this.state.name !== '' &&
      this.state.supplier !== '' &&
      this.state.address !== '' &&
      this.props.merchant.dataAddMerchantVolatile.longitude !== '' &&
      this.props.merchant.dataAddMerchantVolatile.latitude !== ''
    );
  }
  /** GO TO MAPS */
  goToMaps() {
    this.getCurrentLocation();
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <ProgressBarType1
        totalStep={2}
        currentStep={2}
        title={'Langkah melengkapi profil'}
      />
    );
  }
  /** === RENDER CONTENT === */
  /** owner name */
  renderNameOwner() {
    return (
      <InputType1
        title={'*Nama Lengkap Pemilik'}
        value={this.state.fullName}
        placeholder={'Nama Lengkap Pemilik'}
        keyboardType={'default'}
        text={text => this.setState({ fullName: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** merchant name */
  renderNameMerchant() {
    return (
      <InputType1
        title={'*Nama Toko'}
        value={this.state.name}
        placeholder={'Masukan Nama Toko Anda'}
        keyboardType={'default'}
        text={text => this.setState({ name: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** supplier */
  renderSupplier() {
    return this.props.user.userSuppliers.length === 1 ? (
      <InputType1
        title={'*Supplier'}
        editable={false}
        placeholder={this.props.user.userSuppliers[0].supplier.name}
        keyboardType={'default'}
        text={text => this.setState({ supplier: text })}
        error={false}
        errorText={''}
      />
    ) : (
      <DropdownType1
        title={'Suplier Toko'}
        placeholder={'Pilih Suplier Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.supplier.supplierName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'suplierMerchant',
            placeholder: 'Cari Suplier Toko'
          })
        }
      />
    );
  }
  /** tax Owner */
  renderTaxId() {
    return (
      <InputType1
        optional
        title={'Nomor Pokok Wajib Pajak (NPWP)'}
        value={this.state.taxNo}
        placeholder={'Masukan NPWP pemilik'}
        keyboardType={'numeric'}
        maxLength={15}
        text={text => this.setState({ taxNo: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** id owner */
  renderIdNo() {
    return (
      <InputType1
        optional
        title={'Nomor Kartu Tanda Penduduk (KTP)'}
        value={this.state.idNo}
        maxLength={16}
        placeholder={'Masukan No KTP pemilik'}
        keyboardType={'numeric'}
        text={text => this.setState({ idNo: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** address */
  renderAddress() {
    return (
      <InputType2
        title={'*Alamat'}
        value={this.state.address}
        placeholder={'Masukan Alamat lengkap Anda'}
        keyboardType={'default'}
        text={text => this.setState({ address: text })}
        error={false}
        errorText={''}
      />
    );
  }
  /** maps */
  renderMaps() {
    return (
      <InputMapsType1
        title={'*Koordinat Lokasi'}
        selectedMapLong={this.props.merchant.dataAddMerchantVolatile.longitude}
        selectedMapLat={this.props.merchant.dataAddMerchantVolatile.latitude}
        refresh={this.state.refreshLocation}
        openMaps={() => this.goToMaps('maps')}
      />
    );
  }
  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderNameOwner()}
        {this.renderNameMerchant()}
        {this.renderSupplier()}
        {this.renderIdNo()}
        {this.renderTaxId()}
        {this.renderMaps()}
        {this.renderAddress()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** NO GPS */
  renderNoGps() {
    return this.state.openModalNoGPS ? (
      <ErrorPageNoGPS
        onPress={() => {
          this.setState({ openModalNoGPS: false });
          OpenAppSettings.open();
        }}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          !this.buttonDisable() || this.props.merchant.loadingAddMerchant
        }
        title={'Lanjutkan'}
        loading={this.props.merchant.loadingAddMerchant}
        borderRadius={4}
        onPress={() => this.finalStep()}
      />
    );
  }
  /** MODAL */
  renderModalErrorAdd() {
    return this.state.openErrorAddMerchant ? (
      <ModalBottomErrorResponsWhite
        open={this.state.openErrorAddMerchant}
        onPress={() => {
          this.setState({ openErrorAddMerchant: false });
        }}
      />
    ) : (
      <View />
    );
  }
  renderData() {
    return (
      <View>
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
        {/* modal */}
        {this.renderModalErrorAdd()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {this.state.openModalNoGPS ? this.renderNoGps() : this.renderData()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth, global, merchant, user }) => {
  return { auth, global, merchant, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep2);
