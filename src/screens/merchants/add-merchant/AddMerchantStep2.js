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
  InputType2,
  InputType4,
  InputMapsType1
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import ModalBottomErrorRespons from '../../../components/error/ModalBottomErrorRespons';

class AddMerchantStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error */
      errorIdNumber: false,
      errorTaxNumber: false,
      openErrorAddMerchant: false,
      addStoreProcess: false,
      /** supplier */
      supplierName:
        this.props.user.userSuppliers.length === 1
          ? this.props.user.userSuppliers[0].supplier.name
          : '',
      /** field data */
      fullName: this.props.merchant.dataMerchantVolatile.fullName,
      name: this.props.merchant.dataMerchantVolatile.name,
      idNo: this.props.merchant.dataMerchantVolatile.idNo,
      taxNo: this.props.merchant.dataMerchantVolatile.taxNo
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** SEND DATA ADD MERCHANT */
  nextStep() {
    this.setState({ addStoreProcess: true });
    Keyboard.dismiss();
    this.props.saveVolatileDataMerchant({
      fullName: this.state.fullName,
      name: this.state.name,
      idNo: this.state.idNo,
      taxNo: this.state.taxNo
    });
    setTimeout(() => {
      this.setState({ addStoreProcess: false });
      NavigationService.navigate('AddMerchantStep3')
    }, 100);
  }
  /** disable button */
  buttonDisable() {
    return (
      this.state.fullName === null ||
      this.state.name === null ||
      this.state.idNo === null ||
      this.state.taxNo === null ||
      this.state.errorIdNumber ||
      this.state.errorTaxNumber
    );
  }
  /** === CHECK ID NUMBER FORMAT === */
  checkIdNoFormat(idNumber) {
    this.setState({ idNo: idNumber === '' ? null : idNumber });
    if (idNumber === '' || idNumber.length === 16) {
      this.setState({ errorIdNumber: false });
    } else {
      this.setState({ errorIdNumber: true });
    }
  }
  /** === CHECK TAX NUMBER FORMAT === */
  checkTaxNoFormat(taxNumber) {
    this.setState({ taxNo: taxNumber === '' ? null : taxNumber });
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
          totalStep={4}
          currentStep={2}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** === OWNER NAME === */
  renderNameOwner() {
    return (
      <InputType4
        editable={!this.props.merchant.dataMerchantDisabledField.fullName}
        title={'*Nama Pemilik Toko'}
        value={this.state.fullName}
        onChangeText={fullName => {
          const cleanNameFormat = fullName.replace(/[^\w\s]|[0-9]|[_]/g, '');
          this.setState({
            fullName: cleanNameFormat === '' ? null : cleanNameFormat
          });
        }}
        placeholder={'Masukan Nama Pemilik Toko'}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** === MERCHANT NAME === */
  renderNameMerchant() {
    return (
      <InputType4
        title={'*Nama Toko'}
        value={this.state.name}
        onChangeText={name =>
          this.setState({ name: name === '' ? null : name })
        }
        placeholder={'Masukan Nama Toko'}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** === SUPPLIER === */
  renderSupplier() {
    return (
      <InputType4
        title={'*Supplier'}
        editable={false}
        placeholder={this.state.supplierName}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** === OWNER ID NO === */
  renderIdNo() {
    return (
      <InputType4
        editable={!this.props.merchant.dataMerchantDisabledField.idNo}
        title={'*Nomor Kartu Tanda Penduduk (KTP)'}
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
  /** === OWNER TAX NO === */
  renderTaxId() {
    return (
      <InputType4
        editable={!this.props.merchant.dataMerchantDisabledField.taxNo}
        title={'*Nomor Pokok Wajib Pajak (NPWP)'}
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
  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderNameOwner()}
        {this.renderNameMerchant()}
        {this.renderSupplier()}
        {this.renderIdNo()}
        {this.renderTaxId()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.buttonDisable() ||
          this.props.merchant.loadingAddMerchant ||
          this.state.addStoreProcess
        }
        title={'Lanjutkan'}
        loading={
          this.props.merchant.loadingAddMerchant || this.state.addStoreProcess
        }
        borderRadius={4}
        onPress={() => this.nextStep()}
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
