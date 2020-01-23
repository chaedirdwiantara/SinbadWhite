import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard
} from 'react-native';
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
      longitude: this.props.global.longitude,
      latitude: this.props.global.latitude,
      refreshLocation: false,
      openErrorAddMerchant: false
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
        switch (this.props.global.pageAddMerchantFrom) {
          case 'MerchantView':
            this.props.merchantGetReset();
            this.props.merchantGetProcess({
              type: 'direct',
              page: 0,
              loading: true,
              portfolioId: '',
              search: ''
            });
            break;
          case 'JourneyView':
            this.props.journeyPlanGetReset();
            this.props.journeyPlanGetProcess({ page: 0, loading: true });
            this.props.getJourneyPlanReportProcess(
              this.props.user.userSuppliers.map(item => item.supplierId)
            );
            break;

          default:
            break;
        }
        NavigationService.navigate(this.props.global.pageAddMerchantFrom);
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
    /** UPDATE LONGLAT */
    if (
      prevProps.global.longitude !== this.props.global.longitude ||
      prevProps.global.latitude !== this.props.global.latitude
    ) {
      this.setState({ refreshLocation: true });
      setTimeout(() => {
        this.setState({ refreshLocation: false });
      }, 100);
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
      longitude: this.props.global.longitude,
      latitude: this.props.global.latitude,
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
      this.props.global.longitude !== '' &&
      this.props.global.latitude !== ''
    );
  }
  /** GO TO MAPS */
  goToMaps() {
    NavigationService.navigate('MapsView');
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ProgressBarType1
          totalStep={2}
          currentStep={2}
          title={'Langkah melengkapi profil'}
        />
      </View>
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
        change
        title={'*Koordinat Lokasi'}
        selectedMapLong={this.props.global.longitude}
        selectedMapLat={this.props.global.latitude}
        refresh={this.state.refreshLocation}
        openMaps={() => this.goToMaps()}
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
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
        {/* modal */}
        {this.renderModalErrorAdd()}
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
