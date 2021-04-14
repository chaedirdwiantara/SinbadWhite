import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard,
  Image,
  Text,
  PermissionsAndroid,
  ToastAndroid
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  Button
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  ProgressBarType1,
  InputType4,
  InputMapsType2,
  ModalBottomType3,
  StatusBarRedOP50,
  DropdownType1,
  InputType6
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import { Fonts } from '../../../helpers';
import { GlobalMethod } from '../../../services/methods';

const errorAreaMapping = "Alamat toko yang anda pilih diluar area mapping anda, silakan ubah alamat atau cek area mapping Anda."

class AddMerchantStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error */
      errorValidateAreaMapping: false,
      errorMessage: '',
      /** for maps refresh */
      refreshLocation: false,
      /** field data */
      existingStore: props.auth.dataCheckPhoneAvailble?.store,
      address: props.merchant.dataMerchantVolatile.address || '',
      noteAddress: props.merchant.dataMerchantVolatile.noteAddress || '',
      vehicleAccessibilityName: props.merchant.dataMerchantVolatile.vehicleAccessibilityName || '',
      vehicleAccessibilityAmount: props.merchant.dataMerchantVolatile.vehicleAccessibilityAmount || '',
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
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
    /** VALIDATE AREA MAPPING IS SUCCESS */
    if(prevProps.merchant.dataValidateAreaMapping !== this.props.merchant.dataValidateAreaMapping){
      let dataValidateAreaMapping = this.props.merchant.dataValidateAreaMapping
      if(dataValidateAreaMapping !== null){
        if(dataValidateAreaMapping.length > 0){
          if(dataValidateAreaMapping.length === 1){
            const warehouse = dataValidateAreaMapping[0]
            this.props.saveVolatileDataMerchant({
              warehouse: warehouse?.name || "",
              warehouseId: warehouse?.warehouseId || null,
            });
          }
          let urbanId = null
          if (this.props.global.dataGetUrbanId && this.props.global.dataGetUrbanId.length > 0) {
            urbanId = this.props.global.dataGetUrbanId[0].id
          }
          this.props.saveVolatileDataMerchant({
            longitude: this.props.global.longitude,
            latitude: this.props.global.latitude,
            address: this.state.address,
            noteAddress: this.state.noteAddress,
            vehicleAccessibilityAmount: this.state.vehicleAccessibilityAmount,
            urbanId
          });
          NavigationService.navigate('AddMerchantStep4')
        } else {
          this.setState({
            errorValidateAreaMapping: true,
            errorMessage: errorAreaMapping
          })
        }
      }
    }
    if(prevProps.merchant.dataMerchantVolatile.address !== this.props.merchant.dataMerchantVolatile.address){
      this.setState({address: this.props.merchant.dataMerchantVolatile.address})
    }
    if(prevProps.merchant.dataMerchantVolatile.vehicleAccessibilityName !== this.props.merchant.dataMerchantVolatile.vehicleAccessibilityName){
      this.setState({vehicleAccessibilityName: this.props.merchant.dataMerchantVolatile.vehicleAccessibilityName})
    }
    /** VALIDATE AREA MAPPING IS ERROR */
    if(prevProps.merchant.errorValidateAreaMapping !== this.props.merchant.errorValidateAreaMapping){
      const error = this.props.merchant.errorValidateAreaMapping
      if(error){
        this.setState({errorValidateAreaMapping: true})
        if(error?.code === 400){
          this.setState({errorMessage: errorAreaMapping})
        }
      }
    }
  }
  /** SEND DATA ADD MERCHANT */
  nextStep() {
    Keyboard.dismiss();
    this.props.resetValidateAreaMapping()
    let urbanId = null
    let supplierId = GlobalMethod.userSupplierMapping()
    if(supplierId.length > 0){
      supplierId = supplierId[0].toString()
    }
    if (this.props.global.dataGetUrbanId !== null && this.props.global.dataGetUrbanId.length > 0) {
      urbanId = this.props.global.dataGetUrbanId[0].id
    }
    const params = {
      urbanId,
      supplierId
    }
    this.props.validateAreaMappingProcess(params)
  }
  /** disable button */
  disableButton() {
    const {address, vehicleAccessibilityAmount, vehicleAccessibilityName} = this.state
    const {longitude, latitude, dataGetUrbanId} = this.props.global
    const latitudeIsNull = latitude === "" || latitude === 0
    const longitudeIsNull = longitude === "" || longitude === 0
    if (
      !address ||!vehicleAccessibilityName ||!vehicleAccessibilityAmount ||
      !latitudeIsNull || !longitudeIsNull || !dataGetUrbanId ||
      this.props.merchant.loadingValidateAreaMapping
    ){
      return true
    }
    return false
  }
  /** GO TO MAPS */
  async goToMaps() {
    try {
      let granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if(!granted) {
        let permissionResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (permissionResult === PermissionsAndroid.RESULTS.GRANTED){
          NavigationService.navigate('MapsView');
        } else {
          ToastAndroid.show('Anda harus mengizinkan aplikasi untuk mengakses lokasi', ToastAndroid.SHORT)
        }
      } else {
        NavigationService.navigate('MapsView');
      }
    } catch (error) {
      ToastAndroid.show(error?.message || '', ToastAndroid.SHORT)
    }
  }
  /** === GO TO DROPDOWN LIST ===  */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      hide: data.hide ? data.hide : false,
      type: data.type
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
          currentStep={3}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** === LONG LAT MAPS === */
  renderMaps() {
    return (
      <InputMapsType2
        change={!this.props.merchant.dataMerchantDisabledField.longLat}
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Koordinat Lokasi</Text>}
        urbanId={this.props.global.dataGetUrbanId}
        selectedMapLong={this.props.global.longitude}
        selectedMapLat={this.props.global.latitude}
        refresh={this.state.refreshLongLat}
        marginBottom={50}
        openMaps={() => this.goToMaps()}
      />
    );
  }
  /** === MERCHANT ADDRESS === */
  renderAddress() {
    return (
      <InputType4
        multiline={true}
        editable={this.state.existingStore?.address ? false : true}
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Detail Alamat</Text>}
        value={this.state.address}
        placeholder={'Contoh : Jl. Kemang Raya No.58, RT.8/RW…'}
        keyboardType={'default'}
        onChangeText={address =>
          this.setState({ address})
        }
        error={false}
        errorText={''}
        marginBottom={16}
      />
    );
  }
  /** === MERCHANT NOTE ADDRESS === */
  renderNoteAddress() {
    return (
      <InputType4
        editable={this.state.existingStore?.noteAddress ? false : true}
        title={'Catatan Alamat'}
        value={this.state.noteAddress}
        placeholder={'Contoh : Masuk Gang arjuna depan toko cilok'}
        keyboardType={'default'}
        onChangeText={noteAddress => this.setState({ noteAddress })}
        error={false}
        errorText={''}
        marginBottom={16}
      />
    );
  }
  /** === RENDER MERCHANT ROAD ACCESS === */
  renderMerchantRoadAccess() {
    return (
      <DropdownType1
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Aksebilitas Kendaraan</Text>}
        placeholder="Pilih aksesibilitas kendaraan"
        disabled={this.state.existingStore?.vehicleAccessibility ? true : false}
        selectedDropdownText={this.state.vehicleAccessibilityName}
        openDropdown={() =>
          this.goToDropdown({
            type: 'vehicleMerchant',
            placeholder: 'Cari Kendaraan'
          })
        }
      />
    );
  }
  /** === RENDER MERCHANT NUMBER OF ACCESS ROAD === */
  renderMerchantNumberOfAccessRoad() {
    return (
      <InputType6
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Kapasitas Jalan</Text>}
        value={this.state.vehicleAccessibilityAmount}
        onChangeText={text => {
          text = text.replace(/[^0-9]/g, '');
          this.setState({ vehicleAccessibilityAmount: text });
        }}
        editable={!this.state.existingStore?.vehicleAccessibilityAmount ? true : false} 
        info="Jumlah kendaraan yang bisa melewati jalan menuju Toko"
        placeholder={'Masukan kapasitas jalan'}
        keyboardType={'numeric'}
        marginBottom={16}
        maxLength={2}
      />
    );
  }
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderMaps()}
        {this.renderAddress()}
        {this.renderNoteAddress()}
        {this.renderMerchantRoadAccess()}
        {this.renderMerchantNumberOfAccessRoad()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={this.disableButton()}
        title={'Lanjutkan'}
        loading={this.props.merchant.loadingValidateAreaMapping}
        borderRadius={4}
        onPress={() => this.nextStep()}
      />
    );
  }
  /** RENDER MODAL ERROR */
  renderModalError(){
    return(
      <ModalBottomType3
        title={''}
        open={this.state.errorValidateAreaMapping}
        close={() => this.setState({errorValidateAreaMapping: false})}
        content={this.modalErrorContent()}
        onPress={this.props.onPress}
        typeClose={'cancel'}
      />
    )
  }

  /** RENDER MODAL ERROR CONTENT */
  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatusBarRedOP50 />
        <Image
          source={require('../../../assets/images/sinbad_image/cry_sinbad.png')}
          style={{ width: 208, height: 156 }}
        />
        <Text style={[Fonts.type7, { paddingVertical: 16 }]}>
          Toko Gagal Terbuat
        </Text>
        <Text style={[Fonts.type24, {paddingHorizontal: 56, textAlign: 'center', marginBottom: 16}]}>
          {this.state.errorMessage || "Terjadi kesalahan pada server"}
        </Text>
        <View style={{flexDirection: 'row', padding: 16}}>
          <Button
            type="outline"
            onPress={() => {
              this.setState({errorValidateAreaMapping: false, errorMessage: ''})
              NavigationService.navigate('ProfileAreaMapping')
            }}
            titleStyle={Fonts.textButtonWhiteActive}
            containerStyle={{flex: 1}}
            buttonStyle={{borderColor: Color.buttonActiveColorRed, borderWidth: 1.5, paddingVertical: 11, borderRadius: 4}}
            title="Cek Area Mapping" />
          <View style={{marginHorizontal: 4}} />
          <Button 
            buttonStyle={{backgroundColor: Color.buttonActiveColorRed, paddingVertical: 12, borderRadius: 4}}
            titleStyle={Fonts.textButtonRedActive}
            containerStyle={{flex: 1}} 
            onPress={() => this.setState({errorValidateAreaMapping: false, errorMessage: ''})}
            title="Ubah Alamat" />
        </View>
      </View>
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
        {this.state.errorValidateAreaMapping && this.renderModalError()}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMerchantStep3);
