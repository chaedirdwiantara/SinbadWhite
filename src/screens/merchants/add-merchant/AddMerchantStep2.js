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
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  Button,
  connect,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  ProgressBarType1,
  InputType4,
  ModalBottomType4,
  IconButtonWithLabel,
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import { GlobalMethod } from '../../../services/methods';
import { Fonts } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';
import ImagePicker from 'react-native-image-crop-picker';

const idNumberGaps = [6,12]
const taxNoGaps = [2,5,8,9,12,15]

class AddMerchantStep2 extends Component {
  constructor(props) {
    super(props);
    const {user, merchant} = this.props
    const {dataMerchantVolatile: {fullName, name, idNo, taxNo}} = merchant
    this.state = {
      /** error */
      errorIdNumber: false,
      errorTaxNumber: false,
      /** supplier */
      supplierName: user?.userSuppliers.length === 1 ? user.userSuppliers[0].supplier.name: '',
      /** field data */
      fullName,
      name,
      idNo: idNo ? GlobalMethod.addGaps(idNo, idNumberGaps, " ") : null,
      taxNo: taxNo ? GlobalMethod.addGaps(taxNo, taxNoGaps, ".") : null,
      previewImage: false,
      showModalChoice: false,
      showModalTnC: false,
      checkTnC: false
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
      idNo: this.state.idNo?.replace(/[^0-9]/g, ''),
      taxNo: this.state.taxNo?.replace(/[^0-9]/g, '')
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
    
    const {fullName, name, idNo, supplierName, errorIdNumber, errorTaxNumber} = this.state
    const {loadingUploadImage, imageBase64} = this.props.global

    if (
      !fullName || !name || !idNo || !supplierName || errorIdNumber ||
      errorTaxNumber || loadingUploadImage || !imageBase64
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
  /** === PICK IMAGE === */
  pickImage(){
    ImagePicker.openPicker({
      includeBase64: true,
      width: 1920,
      height: 1080,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      this.setState({showModalTnC: false, checkTnC: false})
      this.props.setPickedFromGalley(true)
      this.props.saveImageBase64(image.data)
    });
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */

  suffixIcon = () => <MaterialCommunityIcons color={Color.fontBlack60} name={'close-circle'} size={20} />
  asteriskRed = () => <Text style={{color: 'red'}}>*</Text>
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
  renderNameOwner(editable) {
    return (
      <InputType4
        editable={!editable}
        title={<Text style={{fontSize: 12}}>{this.asteriskRed()} Nama Lengkap Pemilik</Text>}
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
        suffix={!editable}
        suffixForPush
        suffixPush={() =>this.setState({fullName: ''})}
        suffixContent={this.state.fullName && this.suffixIcon()}
      />
    );
  }
  /** === MERCHANT NAME === */
  renderNameMerchant(editable) {
    return (
      <InputType4
        title={<Text style={{fontSize: 12}}>{this.asteriskRed()} Nama Toko</Text>}
        editable={!editable}
        value={this.state.name}
        onChangeText={name => this.setState({ name })}
        placeholder={'Masukan Nama Toko'}
        keyboardType={'default'}
        marginBottom={16}
        maxLength={40}
        suffix={!editable}
        suffixForPush
        suffixPush={() =>this.setState({name: ''})}
        suffixContent={this.state.name && this.suffixIcon()}
      />
    );
  }
  /** === SUPPLIER === */
  renderSupplier() {
    return (
      <InputType4
        title={<Text style={{fontSize: 12}}>{this.asteriskRed()} Supplier</Text>}
        editable={false}
        placeholder={this.state.supplierName}
        keyboardType={'default'}
        marginBottom={16}
      />
    );
  }
  /** === OWNER ID NO === */
  renderIdNo(editable) {
    return (
      <InputType4
        editable={!editable}
        title={<Text style={{fontSize: 12}}>{this.asteriskRed()} Nomor Kartu Tanda Penduduk (KTP)</Text>}
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
        suffix={!editable}
        suffixForPush
        suffixPush={() =>this.setState({idNo: '', errorIdNumber: false})}
        suffixContent={this.state.idNo && this.suffixIcon()}
      />
    );
  }
  /** === OWNER TAX NO === */
  renderTaxId(editable) {
    return (
      <InputType4
        editable={!editable}
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
        suffix={!editable}
        suffixForPush
        suffixPush={() =>this.setState({taxNo: '', errorTaxNumber: false})}
        suffixContent={this.state.taxNo && this.suffixIcon()}
      />
    );
  }
  /** RENDER IMAGE KTP */
  renderImageIdNo(){
    const showImage = this.props.global.imageBase64 !== ''
    return (
      <View style={{paddingHorizontal: 16}}>
        <Text style={Fonts.type32}>{this.asteriskRed()} Upload Foto KTP</Text>
        {showImage ? this.renderPreviewImage() : this.renderButtonUploadPhoto()}
      </View>
    )
  }
  /** PREVIEW IMAGE */
  renderPreviewImage(){
    const {isPickedFromGallery} = this.props.global
    return(
      <View style={{marginBottom: 24}}>
        <Image 
          source={{uri: `data:image/jpg;base64,${this.props.global.imageBase64}`}}
          resizeMode="contain"
          style={{
            aspectRatio: 16/9,
            marginVertical: 12,
            width: '100%',
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
            onPress={() => this.setState({showModalChoice: true})}
            titleStyle={Fonts.textButtonWhiteActive}
            containerStyle={{flex: 1}}
            buttonStyle={{borderColor: Color.buttonActiveColorRed, borderWidth: 1.5, paddingVertical: 11, borderRadius: 4}}
            title="Ulangi Foto" />
        </View>
      </View>
    )
  }
  /** RENDER BUTTON UPLOAD PHOTO */
  renderButtonUploadPhoto(){
    const storeIsExist = this.props.auth.dataCheckPhoneAvailble?.store !== null
    const {idNo, errorIdNumber} = this.state
    const disabled = idNo === null || errorIdNumber || storeIsExist
    return(
      <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16}}>
        <TouchableOpacity 
          disabled={disabled}
          onPress={() => this.setState({showModalChoice: true})}
          style={{
              borderWidth: 1, alignItems: 'center', padding: 8, 
              borderRadius: 12, borderColor: masterColor.buttonGreyWhiteDisabled}}
        >
          <MaterialCommunityIcons
            name="image-plus"
            color={disabled ? masterColor.buttonGreyWhiteDisabled : masterColor.fontRed50}
            size={40}
          />
          <Text style={Fonts.type71}>Upload Foto</Text>
        </TouchableOpacity>
      </View>
    )
  }
  /** RENDER MODAL CHOICE */
  renderModalChoice(){
    const {showModalChoice} = this.state
    return(
      <ModalBottomType4 
        open={showModalChoice}
        title="Upload Foto"
        typeClose="cancel"
        close={() => this.setState({showModalChoice: false})}
        content={this.renderContentModalChoice()}
      />
    )
  }
  /** RENDER CONTENT MODAL CHOICE */
  renderContentModalChoice(){
    const {navigate} = this.props.navigation
    return(
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16}}>
        <IconButtonWithLabel 
          icon="image-plus" 
          label="Pilih Galeri"
          onPress={() => {
            this.setState({showModalChoice: false, showModalTnC: true})
          }}
        />
        <IconButtonWithLabel 
          icon="camera" 
          label="Ambil Foto"
          onPress={() => {
            this.setState({showModalChoice: false})
            navigate('TakeIdPicture', {typeCamera: 'id'})
          }}
        />
      </View>
    )
  }
  /** RENDER MODAL TNC */
  renderModalTnC(){
    const {showModalTnC} = this.state
    return(
      <ModalBottomType4 
        open={showModalTnC}
        title="Ketentuan Pilih Galeri"
        typeClose="cancel"
        close={() => this.setState({showModalTnC: false, checkTnC: false})}
        content={this.renderContentModalTnC()}
      />
    )
  }
  /** RENDER MODAL TNC CONTENT */
  renderContentModalTnC(){
    const {checkTnC} = this.state
    return(
      <View>
        <View style={{paddingHorizontal: 16, flex: 1, paddingBottom: 16, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.setState({ checkTnC: !checkTnC })}>
            <MaterialCommunityIcons
              color={checkTnC ? masterColor.mainColor : masterColor.fontBlack40}
              name={checkTnC ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
            />
          </TouchableOpacity>
          <Text style={[Fonts.type8, {marginLeft: 8, flex: 1}]}>
            Saya bertanggung jawab atas foto KTP pemilik toko yang saya upload. Apabila terdapat penyalahgunaan terhadap foto KTP ini, maka saya bersedia mengikuti kebijakan yang berlaku di Sinbad
          </Text>
        </View>
        <ButtonSingle
          disabled={!checkTnC}
          title={'Lanjutkan'}
          borderRadius={4}
          onPress={() => this.pickImage()}
        />
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
    const {showModalChoice, showModalTnC} = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView>
          {this.renderProgressHeader()}
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
        {showModalChoice && this.renderModalChoice()}
        {showModalTnC && this.renderModalTnC()}
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