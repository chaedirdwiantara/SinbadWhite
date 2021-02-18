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
  connect,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  ProgressBarType1,
  InputType4,
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import { GlobalMethod } from '../../../services/methods';

class AddMerchantStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error */
      errorIdNumber: false,
      errorTaxNumber: false,
      addStoreProcess: false,
      /** supplier */
      supplierName:
        this.props.user?.userSuppliers.length === 1
          ? this.props.user.userSuppliers[0].supplier.name
          : '',
      /** field data */
      fullName: this.props.merchant.dataMerchantVolatile.fullName || '',
      name: this.props.merchant.dataMerchantVolatile.name || '',
      idNo: this.props.merchant.dataMerchantVolatile.idNo || '',
      taxNo: this.props.merchant.dataMerchantVolatile.taxNo || ''
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** SEND DATA ADD MERCHANT */
  nextStep() {
    Keyboard.dismiss();
    this.props.saveVolatileDataMerchant({
      fullName: this.state.fullName,
      name: this.state.name,
      idNo: this.state.idNo.replace(/[^0-9]/g, ''),
      taxNo: this.state.taxNo ? this.state.taxNo.replace(/[^0-9]/g, '') : ''
    });
    NavigationService.navigate('AddMerchantStep3')
  }
  /** disable button */
  buttonDisable() {
    return (
      this.state.fullName === '' ||
      this.state.name === '' ||
      this.state.idNo === '' ||
      this.state.errorIdNumber ||
      this.state.errorTaxNumber
    );
  }
  /** === CHECK ID NUMBER FORMAT === */
  checkIdNoFormat(idNumber) {
    idNumber = idNumber.substr(0, 16)
    const gaps = [6,12]
    const formatted = GlobalMethod.addGaps(idNumber, gaps, " ")
    this.setState({ 
      idNo: formatted,
      errorIdNumber: !(formatted === '' || formatted.length >= 18) 
    });
  }
  /** === CHECK TAX NUMBER FORMAT === */
  checkTaxNoFormat(taxNumber) {
    taxNumber = taxNumber.substr(0, 15)
    const gaps = [2,5,8,9,12,15]
    const formatted = GlobalMethod.addGaps(taxNumber, gaps, ".")
    this.setState({ 
      taxNo: formatted,
      errorTaxNumber: !(formatted === '' || formatted.length >= 20) 
    });
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
        title={'* Nama Lengkap Pemilik'}
        value={this.state.fullName}
        onChangeText={fullName => {
          const cleanNameFormat = fullName.replace(/[^\w\s]|[0-9]|[_]/g, '');
          this.setState({
            fullName: cleanNameFormat === '' ? null : cleanNameFormat
          });
        }}
        placeholder={'Masukan Nama Pemilik'}
        keyboardType={'default'}
        marginBottom={16}
        maxLength={40}
        suffix={!this.props.merchant.dataMerchantDisabledField.fullName}
        suffixForPush
        suffixPush={() =>this.setState({fullName: ''})}
        suffixContent={
          this.state.fullName && (
            <MaterialCommunityIcons
              color={Color.fontBlack60}
              name={'close-circle'}
              size={20}
            />
          )
        }
      />
    );
  }
  /** === MERCHANT NAME === */
  renderNameMerchant() {
    return (
      <InputType4
        title={'* Nama Toko'}
        editable={!this.props.merchant.dataMerchantDisabledField.storeName}
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        placeholder={'Masukan Nama Toko'}
        keyboardType={'default'}
        marginBottom={16}
        maxLength={40}
        suffix={!this.props.merchant.dataMerchantDisabledField.storeName}
        suffixForPush
        suffixPush={() =>this.setState({name: ''})}
        suffixContent={
          this.state.name && (
            <MaterialCommunityIcons
              color={Color.fontBlack60}
              name={'close-circle'}
              size={20}
            />
          )
        }
      />
    );
  }
  /** === SUPPLIER === */
  renderSupplier() {
    return (
      <InputType4
        title={'* Supplier'}
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
        title={'* Nomor Kartu Tanda Penduduk (KTP)'}
        value={this.state.idNo}
        onChangeText={idNo => {
          const cleanNumber = idNo.replace(/[^0-9]/g, '');
          this.checkIdNoFormat(cleanNumber);
        }}
        placeholder={'Masukan KTP pemilik'}
        keyboardType={'numeric'}
        error={this.state.errorIdNumber}
        errorText={'Pastikan No.KTP maksimal 16 Digit'}
        maxLength={18}
        marginBottom={16}
        suffix={!this.props.merchant.dataMerchantDisabledField.idNo}
        suffixForPush
        suffixPush={() =>this.setState({idNo: '', errorIdNumber: false})}
        suffixContent={
          this.state.idNo && (
            <MaterialCommunityIcons
              color={Color.fontBlack60}
              name={'close-circle'}
              size={20}
            />
          )
        }
      />
    );
  }
  /** === OWNER TAX NO === */
  renderTaxId() {
    return (
      <InputType4
        editable={!this.props.merchant.dataMerchantDisabledField.taxNo}
        title={'Nomor Pokok Wajib Pajak (NPWP)'}
        value={this.state.taxNo}
        onChangeText={taxNo => {
          const cleanNumber = taxNo.replace(/[^0-9]/g, '');
          this.checkTaxNoFormat(cleanNumber);
        }}
        placeholder={'Masukan NPWP pemilik'}
        keyboardType={'numeric'}
        error={this.state.errorTaxNumber}
        errorText={'Pastikan No.NPWP maksimal 15 Digit'}
        maxLength={20}
        marginBottom={16}
        suffix={!this.props.merchant.dataMerchantDisabledField.taxNo}
        suffixForPush
        suffixPush={() =>this.setState({taxNo: '', errorTaxNumber: false})}
        suffixContent={
          this.state.taxNo && (
            <MaterialCommunityIcons
              color={Color.fontBlack60}
              name={'close-circle'}
              size={20}
            />
          )
        }
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
