import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView,
  Text,
  Image,
  height,
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons,
  Button
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  StatusBarWhite,
  InputType4,
  ProgressBarType1,
  ModalBottomType4,
  ModalBottomType3,
  StatusBarBlackOP40,
  StatusBarRedOP50
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import { Fonts } from '../../../helpers';
import { PureComponent } from 'react';

class AddMerchantStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      errorPhoneNumber: '',
      correctFormatPhoneNumber: false,
      showStoreInformation: false,
      showErrorNotEligible: false,
      errorTitle: '',
      errorMessage: '',
      showModalError: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** COMPONENT DID UPDATE */
  componentDidUpdate(prevPros) {
    /** IF SUCCESS */
    if (
      prevPros.auth.dataCheckPhoneAvailble !==
      this.props.auth.dataCheckPhoneAvailble
    ) {
      if (this.props.auth.dataCheckPhoneAvailble !== null) {
        const {store} = this.props.auth.dataCheckPhoneAvailble || {}
        if(store){
          this.setState({showStoreInformation: true})
        } else {
          NavigationService.navigate('AddMerchantStep2');
          this.props.saveVolatileDataMerchant({
            phone: this.state.phoneNumber
          });
        }
      } 
    }
    /** IF ERROR */
    if (
      prevPros.auth.errorCheckPhoneAvailble !==
      this.props.auth.errorCheckPhoneAvailble
    ) {
      if (this.props.auth.errorCheckPhoneAvailble !== null) {
        this.setState({
          errorPhoneNumber: this.checkErrorMessage(
            this.props.auth.errorCheckPhoneAvailble
          ),
          correctFormatPhoneNumber: true
        });
      }
    }
  }
  /** === DID UPDATE FUNCTION === */
  /** === CHECK ERROR MESSAGE === */
  checkErrorMessage(error) {
    if (error.code === 400) {
      return 'No. HP yang anda masukan sudah terdaftar';
    }
    return 'Terjadi kesalahan pada server';
  }
  /** === PHONE NUMBER MODIFY === */
  checkPhone() {
    Keyboard.dismiss();
    this.props.checkPhoneNumberAvailableProcess(this.state.phoneNumber);
  }
  checkPhoneFormat(phoneNumber) {
    let reg = /^08[0-9]{0,15}$/;
    let checkFormat = reg.test(phoneNumber);

    if (checkFormat) {
      reg = /^08[0-9]{8,15}$/;
      checkFormat = reg.test(phoneNumber);
      if (checkFormat) {
        this.setState({
          phoneNumber,
          correctFormatPhoneNumber: checkFormat,
          errorPhoneNumber: ''
        });
      } else {
        this.setState({
          phoneNumber,
          correctFormatPhoneNumber: checkFormat,
          errorPhoneNumber: 'No. HP harus 10-14 digit'
        });
      }
    } else {
      let nol = phoneNumber.length > 1;
      this.setState({
        phoneNumber,
        correctFormatPhoneNumber: checkFormat,
        errorPhoneNumber: nol ? 'No. HP harus diawali dengan 08' : ''
      });
    }
  }
  storeName(name){
    if(!name) return null
    name = name.split(' ').map(word => {
      word = word.toUpperCase()
      word = [...word]
      for (let i = 1; i < word.length - 1; i++) {
        word[i] = '*'
      }
      return word.join('')
    })
    return name.join(' ')
  }
  /** CLOSE MODAL STORE INFORMATION */
  closeModalStoreInformation(){
    this.setState({
      showStoreInformation: false,
      phoneNumber: ''
    })
  }
  /** NEXT STEP TO ADD MERCHANT STEP 2 */
  nextStep(){
    const segmentationIsMatch = this.props.auth?.dataCheckPhoneAvailble?.segmentationDetail?.match
    const portfolioExist = this.props.auth?.dataCheckPhoneAvailble?.segmentationDetail?.porfolioExist
    this.closeModalStoreInformation()
    if (portfolioExist){
      this.setState({
        errorTitle: 'Toko Sudah Ditangani',
        errorMessage: 'Toko anda sudah ditangani oleh Sales Rep lain dengan Sales Team yang sama. Silahkan hubungi admin untuk proses lebih lanjut.',
        showModalError: true
      })
      return
    }
    if(segmentationIsMatch){
      NavigationService.navigate('AddMerchantStep2');
      const segmentation = this.props.auth?.dataCheckPhoneAvailble?.segmentationDetail
      let dataWarehouses = segmentation?.warehouses
      let warehouse = null
      if(dataWarehouses !== null){
        if(dataWarehouses.length > 0){
          warehouse = dataWarehouses[0]
        }
      }
      this.props.saveVolatileDataMerchant({
        phone: this.state.phoneNumber,
        warehouse: warehouse?.name || null,
        warehouseId: warehouse?.id || null,
        storeType: segmentation?.type?.name || '',
        typeId: segmentation?.type?.id,
        storeGroup: segmentation?.group?.name || '',
        groupId: segmentation?.group?.id,
        storeCluster: segmentation?.cluster?.name || '',
        clusterId: segmentation?.cluster?.id,
        storeChannel: segmentation?.channel?.name || '',
        channelId: segmentation?.channel?.id,
      });
    } else {
      this.setState({
        errorTitle: 'Segmentasi toko tidak sesuai',
        errorMessage: 'Maaf anda belum bisa menambahkan toko ini. Silahkan hubungi admin untuk proses lebih lanjut.',
        showModalError: true
      })
    }
  }
  /**
   * ====================
   * RENDER VIEW
   * ===================
   */
  /** === RENDER INPUT PHONE NUMBER === */
  renderInputPhoneNumber() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <InputType4
          title={'Nomor Handphone Pemilik Toko'}
          error={this.state.errorPhoneNumber !== ''}
          errorText={this.state.errorPhoneNumber}
          value={this.state.phoneNumber}
          onChangeText={phoneNumber => {
            const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
            this.checkPhoneFormat(cleanNumber);
          }}
          placeholder={'Masukan nomor handphone pemilik toko'}
          keyboardType={'numeric'}
          maxLength={14}
          suffix
          suffixForPush
          suffixPush={() =>
            this.setState({
              phoneNumber: '',
              errorPhoneNumber: ''
            })
          }
          suffixContent={
            this.state.phoneNumber !== '' ? (
              <MaterialCommunityIcons
                color={Color.fontBlack60}
                name={'close-circle'}
                size={20}
              />
            ) : (
              <View />
            )
          }
          marginBottom={30}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.errorPhoneNumber != '' ||
          this.state.phoneNumber.length < 10 ||
          this.props.auth.loadingCheckPhoneAvailble
        }
        loading={this.props.auth.loadingCheckPhoneAvailble}
        title={'Lanjutkan'}
        borderRadius={4}
        onPress={() => this.checkPhone()}
      />
    );
  }
  /** === RENDER STEP HEADER === */
  renderProgressHeader() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ProgressBarType1
          totalStep={4}
          currentStep={1}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** RENDER MODAL STORE INFORMATION */
  renderModalStoreInformation(){
    return (
      <ModalBottomType4 
        title="Tambahkan Toko"
        typeClose="cancel"
        content={this.renderStoreInformation()}
        close={() => this.closeModalStoreInformation()}
        open={this.state.showStoreInformation}  />
    )
  }
  /** RENDER STORE INFORMATION */
  renderStoreInformation(){
    return(
      <View style={{height: .7 * height}}>
        <View style={{flex: 1}}>
          <ScrollView style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <Text style={Fonts.type8}>Apakah toko ini yang akan anda tambahkan?</Text>
            {this.renderStoreDetail()}
            {this.renderStoreSegmentation()}
          </ScrollView>
        </View>
        {this.renderStoreInformationAction()}
      </View>
    )
  }
  /** RENDER STORE DETAIL */
  renderStoreDetail(){
    const {store} = this.props.auth.dataCheckPhoneAvailble || {}
    return(
      <View style={{paddingVertical: 16, flexDirection: 'row'}}>
        <Image 
          source={{uri: store?.imageUrl}}
          borderRadius={12} 
          style={{height: 72, width: 72, backgroundColor: '#f0f0f0'}} />
        <View style={{paddingHorizontal: 16, flex: 1}}>
          <Text style={Fonts.type7}>{store?.name || 'N/A'}</Text>
          <Text numberOfLines={2} style={[Fonts.type7, {marginVertical: 4}]}>
            {this.storeName(store?.owner?.fullName) || 'N/A'}
          </Text>
          <Text style={[Fonts.type8, {marginVertical: 4}]}>
            {store?.address || 'N/A'}
          </Text>
        </View>
      </View>
    )
  }
  /** RENDER STORE SEGMENTATION */
  renderStoreSegmentation(){
    const {segmentationDetail} = this.props.auth.dataCheckPhoneAvailble || {}
    return(
      <View>
        <Text style={[Fonts.type7, {marginVertical: 12}]}>Segmentasi Toko</Text>
        <SegmentationCell 
          showSeparator 
          label="Warehouse" 
          value={segmentationDetail?.warehouses[0]?.name} />
        <View style={{height: .5, backgroundColor: Color.fontBlack40}} />
        <SegmentationCell 
          showSeparator 
          label="Tipe Toko" 
          value={segmentationDetail?.cluster?.name} />
        <View style={{height: .5, backgroundColor: Color.fontBlack40}} />
        <SegmentationCell 
          showSeparator 
          label="Group Toko" 
          value={segmentationDetail?.group?.name} />
        <View style={{height: .5, backgroundColor: Color.fontBlack40}} />
        <SegmentationCell 
          label="Channel Toko" 
          value={segmentationDetail?.channel?.name} />
        <View style={{height: .5, backgroundColor: Color.fontBlack40}} />
        <SegmentationCell 
          label="Jenis Toko" 
          value={segmentationDetail?.type?.name} />
      </View>
    )
  }
  /** RENDER STORE INFORMATION ACTION */
  renderStoreInformationAction(){
    return(
      <View style={{flexDirection: 'row', padding: 16}}>
        <Button
          type="outline"
          onPress={() => this.closeModalStoreInformation()}
          titleStyle={Fonts.textButtonWhiteActive}
          containerStyle={{flex: 1}}
          buttonStyle={{borderColor: Color.buttonActiveColorRed, borderWidth: 1.5, paddingVertical: 11, borderRadius: 4}}
          title="No" />
        <View style={{marginHorizontal: 4}} />
        <Button 
          buttonStyle={{backgroundColor: Color.buttonActiveColorRed, paddingVertical: 12, borderRadius: 4}}
          titleStyle={Fonts.textButtonRedActive}
          containerStyle={{flex: 1}} 
          onPress={() => this.nextStep()}
          title="Yes" />
      </View>
    )
  }
  /** RENDER MODAL ERROR */
  renderModalError(){
    return(
      <ModalBottomType3
        title={''}
        open={this.state.showModalError}
        close={() => this.setState({showModalError: false, errorTitle: '', errorMessage: ''})}
        content={this.modalErrorContent()}
        typeClose={'cancel'}
      />
    )
  }

  /** RENDER MODAL ERROR CONTENT */
  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
        {this.props.white ? <StatusBarBlackOP40 /> : <StatusBarRedOP50 />}
        <Image
          source={require('../../../assets/images/sinbad_image/failed_error.png')}
          style={{ width: 208, height: 156 }}
        />
        <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
          {this.state.errorTitle}
        </Text>
        <Text style={[Fonts.type17, {textAlign: 'center', lineHeight: 18}]}>
          {this.state.errorMessage}
        </Text>
        <View style={{ width: '100%', paddingTop: 40 }}>
          <ButtonSingle
            borderRadius={4}
            title={'Oke, Saya Mengerti'}
            onPress={() => {
              this.setState({showModalError: false, errorTitle: '', errorMessage: ''})
            }}
          />
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
          {this.renderInputPhoneNumber()}
          {this.state.showStoreInformation && this.renderModalStoreInformation()}
          {this.state.showModalError && this.renderModalError()}
        </ScrollView>
        {this.renderButton()}
      </SafeAreaView>
    );
  }
}

class SegmentationCell extends PureComponent{
  render(){
    const {label, value, showSeparator} = this.props || {}
    return(
      <View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 16}}>
            <Text style={[Fonts.type8, {color: Color.fontBlack50OP50}]}>{label}</Text>
            <Text style={[Fonts.type7, {color: value ? Color.fontBlack50 : Color.fontBlack100OP40, fontSize: 12 }]}>{value || 'Belum Ditetapkan'}</Text>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep1);
