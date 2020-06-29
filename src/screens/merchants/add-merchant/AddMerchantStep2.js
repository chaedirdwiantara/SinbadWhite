import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  ProgressBarType1,
  DropdownType1,
  InputType2,
  InputType4,
  InputMapsType1
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import InputType1 from '../../../components/input/InputType1';
import ModalBottomErrorRespons from '../../../components/error/ModalBottomErrorRespons';

class AddMerchantStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorIdNumber: false,
      errorTaxNumber: false,
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
      this.state.idNo.length === 16 &&
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
  /** === CHECK ID NUMBER FORMAT === */
  checkIdNoFormat(idNumber) {
    this.setState({ idNo: idNumber });
    if (idNumber === '' || idNumber.length === 16) {
      this.setState({ errorIdNumber: false });
    } else {
      this.setState({ errorIdNumber: true });
    }
  }
  /** === CHECK TAX NUMBER FORMAT === */
  checkTaxNoFormat(taxNumber) {
    this.setState({ taxNo: taxNumber });
    if (taxNumber === '' || taxNumber.length === 15) {
      this.setState({ errorTaxNumber: false });
    } else {
      this.setState({ errorTaxNumber: true });
    }
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
      <InputType4
        title={'*Nama Pemilik Toko'}
        value={this.state.fullName}
        onChangeText={fullName => {
          const cleanNameFormat = fullName.replace(/[^\w\s]|[0-9]|[_]/g, '');
          this.setState({ fullName: cleanNameFormat });
        }}
        placeholder={'Masukan Nama Pemilik Toko'}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** merchant name */
  renderNameMerchant() {
    return (
      <InputType4
        title={'*Nama Toko'}
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        placeholder={'Masukan Nama Toko'}
        keyboardType={'default'}
        marginBottom={16}
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
      <InputType4
        title={'Nomor Pokok Wajib Pajak (NPWP)'}
        value={this.state.taxNo}
        onChangeText={taxNo => {
          const cleanNumber = taxNo.replace(/[^0-9]/g, '');
          this.checkTaxNoFormat(cleanNumber);
        }}
        placeholder={'Masukan NPWP pemilik maks.15 Digit'}
        keyboardType={'numeric'}
        error={this.state.errorTaxNumber}
        errorText={'Pastikan No.NPWP maks. 15 Digit'}
        maxLength={15}
        marginBottom={16}
      />
    );
  }
  /** id owner */
  renderIdNo() {
    return (
      <InputType4
        title={'Nomor Kartu Tanda Penduduk (KTP)'}
        value={this.state.idNo}
        onChangeText={idNo => {
          const cleanNumber = idNo.replace(/[^0-9]/g, '');
          this.checkIdNoFormat(cleanNumber);
        }}
        placeholder={'Masukan KTP pemilik maks. 16 Digit'}
        keyboardType={'numeric'}
        error={this.state.errorIdNumber}
        errorText={'Pastikan No.KTP maks. 16 Digit'}
        maxLength={16}
        marginBottom={16}
      />
    );
  }
  /** address */
  renderAddress() {
    return (
      <InputType2
        title={'*Detail Alamat'}
        value={this.state.address}
        placeholder={'Masukkan Alamat lengkap Toko'}
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
        {/* {this.renderSupplier()} */}
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
      <ModalBottomErrorRespons
        statusBarType={'white'}
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
    backgroundColor: Color.backgroundWhite
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
