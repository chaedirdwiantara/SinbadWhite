import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard,
  Text,
  TouchableOpacity,
  Image,
  width,
  TouchableWithoutFeedback,
  ModalPopUp
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  Button,
  connect,
  MaterialCommunityIcons,
  MaterialIcon
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
import { Fonts } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';
import PhotoUploaded from '../reusable-view/PhotoUploaded';

const idNumberGaps = [6,12]
const taxNoGaps = [2,5,8,9,12,15]

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
      idNo: 
        this.props.merchant.dataMerchantVolatile.idNo 
          ? GlobalMethod.addGaps(this.props.merchant.dataMerchantVolatile.idNo, idNumberGaps, " ") 
          : '',
      taxNo: 
        this.props.merchant.dataMerchantVolatile.taxNo 
          ? GlobalMethod.addGaps(this.props.merchant.dataMerchantVolatile.taxNo, taxNoGaps, ".") 
          : '',
      previewImage: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** === IF SUCCESS UPLOAD === */
    if (prevProps.global.dataUploadImage !== this.props.global.dataUploadImage) {
      if (this.props.global.dataUploadImage !== null) {
        this.props.saveVolatileDataMerchant({
          idImageUrl: this.props.global.dataUploadImage.url
        });
        this.gotoNextScreen()
      }
    }
    /** === IF FAILED UPLOAD === */
    if (prevProps.global.errorUploadImage !== this.props.global.errorUploadImage) {
      if (this.props.global.errorUploadImage !== null && this.state.thisPage) {
        console.log("Error Uploading Image");
      }
    }
  }
  /** GO TO NEXT SCREEN */
  gotoNextScreen(){
    this.props.saveImageBase64('');
    this.props.saveVolatileDataMerchant({
      fullName: this.state.fullName,
      name: this.state.name,
      idNo: this.state.idNo.replace(/[^0-9]/g, ''),
      taxNo: this.state.taxNo.replace(/[^0-9]/g, '')
    });
    NavigationService.navigate('AddMerchantStep3')
  }
   /** === UPLOAD PHOTO */
  uploadPhoto() {
    this.props.uploadImageProcess({
      image: `data:image/jpg;base64,${this.props.global.imageBase64}`,
      type: 'idCard',
      oldLink: this.props.merchant.dataMerchantVolatile.idImageUrl
    });
  }
  /** SEND DATA ADD MERCHANT */
  handleNextButton() {
    Keyboard.dismiss();
    if(this.props.global.imageBase64 !== ''){
      this.uploadPhoto()
    } else {
      this.gotoNextScreen()
    }
  }
  /** disable button */
  disableButton() {
    const storeIsExist = this.props.auth.dataCheckPhoneAvailble?.store !== null
    if(storeIsExist) return false
    
    if (
      !this.state.fullName || !this.state.name ||
      !this.state.idNo || !this.state.supplierName ||
      this.state.errorIdNumber || this.state.errorTaxNumber || 
      this.props.global.loadingUploadImage || !this.props.global.imageBase64
    ){
      return true
    }
    return false
  }
  /** === CHECK ID NUMBER FORMAT === */
  checkIdNoFormat(idNumber) {
    idNumber = idNumber.substr(0, 16)
    const formatted = GlobalMethod.addGaps(idNumber, idNumberGaps, " ")
    this.setState({ 
      idNo: formatted,
      errorIdNumber: !(formatted === '' || formatted.length >= 18) 
    });
  }
  /** === CHECK TAX NUMBER FORMAT === */
  checkTaxNoFormat(taxNumber) {
    taxNumber = taxNumber.substr(0, 15)
    const formatted = GlobalMethod.addGaps(taxNumber, taxNoGaps, ".")
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

  renderAsteriskRed = () => <Text style={{color: 'red'}}>*</Text>
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
  renderNameOwner(disabled) {
    return (
      <InputType4
        editable={!disabled}
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Nama Lengkap Pemilik</Text>}
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
        suffix={!disabled}
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
  renderNameMerchant(disabled) {
    return (
      <InputType4
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Nama Toko</Text>}
        editable={!disabled}
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        placeholder={'Masukan Nama Toko'}
        keyboardType={'default'}
        marginBottom={16}
        maxLength={40}
        suffix={!disabled}
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
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Supplier</Text>}
        editable={false}
        placeholder={this.state.supplierName}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** === OWNER ID NO === */
  renderIdNo(disabled) {
    return (
      <InputType4
        editable={!disabled}
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Nomor Kartu Tanda Penduduk (KTP)</Text>}
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
        suffix={!disabled}
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
  renderTaxId(disabled) {
    return (
      <InputType4
        editable={!disabled}
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
        suffix={!disabled}
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
  /** RENDER IMAGE KTP */
  renderImageIdNo(){
    const showImage = this.props.global.imageBase64 !== ''
    return (
      <View style={{paddingHorizontal: 16}}>
        <Text style={Fonts.type32}>{this.renderAsteriskRed()} Upload Foto KTP</Text>
        {showImage ? this.renderThumbnail() : this.renderTakeIdNoPhotoButton()}
      </View>
    )
  }
  renderThumbnail(){
    return(
      <View style={{marginBottom: 24}}>
        <Image 
          source={{uri: `data:image/jpg;base64,${this.props.global.imageBase64}`}}
          resizeMode="contain"
          style={{
            aspectRatio: 1/1,
            marginVertical: -56,
            zIndex: -9999,
            width: '100%', 
            transform: [{rotate: '270deg'}]
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Button
            type="clear"
            onPress={() => this.props.saveImageBase64('')}
            titleStyle={Fonts.textButtonWhiteActive}
            containerStyle={{flex: 1}}
            title="Hapus" />
          <View style={{marginHorizontal: 4}} />
          <Button
            type="outline"
            onPress={() => this.props.navigation.navigate('TakeIdPicture')}
            titleStyle={Fonts.textButtonWhiteActive}
            containerStyle={{flex: 1}}
            buttonStyle={{borderColor: Color.buttonActiveColorRed, borderWidth: 1.5, paddingVertical: 11, borderRadius: 4}}
            title="Ulangi Foto" />
        </View>
      </View>
    )
  }
  renderPreviewImage() {
    return (
      <ModalPopUp
        animationType="slide"
        transparent={true}
        visible={this.state.previewImage}
      >
        <View
          style={{
            backgroundColor: masterColor.fontWhite,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity 
            onPress={() => this.setState({previewImage: false})}
            style={{position: 'absolute', right: 16, top: 16}}>
            <MaterialIcon
              name="close"
              color={Color.fontBlack50}
              size={24}
            />
          </TouchableOpacity>
          <Image 
            source={{uri: `data:image/jpg;base64,${this.props.global.imageBase64}`}}
            resizeMode="stretch"
            style={{
              width: width * .7, height: width, 
              transform: [{rotate: '270deg'}]
            }}
          />
        </View>
      </ModalPopUp>
    )
  }
  renderTakeIdNoPhotoButton(){
    const storeIsExist = this.props.auth.dataCheckPhoneAvailble?.store !== null
    const {idNo, errorIdNumber} = this.state
    const disabled = idNo === "" || errorIdNumber || storeIsExist
    return(
      <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16}}>
        <TouchableOpacity 
          disabled={disabled}
          onPress={() => this.props.navigation.navigate('TakeIdPicture')}
          style={{
              borderWidth: 1, alignItems: 'center', padding: 8, 
              borderRadius: 12, borderColor: masterColor.buttonGreyWhiteDisabled}}
        >
          <MaterialIcon
            name="photo-camera"
            color={ disabled ? masterColor.buttonGreyWhiteDisabled : masterColor.fontRed50}
            size={40}
          />
          <Text style={Fonts.type71}>Upload Foto</Text>
        </TouchableOpacity>
      </View>
    )
  }
  /** main content */
  renderContent() {
    const storeIsExist = this.props.auth.dataCheckPhoneAvailble?.store !== null
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderNameOwner(storeIsExist)}
        {this.renderNameMerchant(storeIsExist)}
        {this.renderSupplier()}
        {this.renderIdNo(storeIsExist)}
        {this.renderImageIdNo()}
        {this.renderTaxId(storeIsExist)}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={this.disableButton() }
        title={'Lanjutkan'}
        loading={this.props.global.loadingUploadImage}
        borderRadius={4}
        onPress={() => this.handleNextButton()}
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
        {/* {this.renderPreviewImage()} */}
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
