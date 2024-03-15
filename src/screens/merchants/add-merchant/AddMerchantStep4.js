import {
  React,
  Component,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Keyboard,
  Image,
  Text
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
  ModalBottomType3,
  StatusBarBlackOP40,
  ModalBottomType1
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';
import { Fonts } from '../../../helpers';
import { GlobalMethod } from '../../../services/methods';

class AddMerchantStep4 extends Component {
  constructor(props) {
    super(props);
    const {
      cluster, group, channel, type
    } = props.auth.dataCheckPhoneAvailble?.segmentationDetail || {}
    const singleWareHouse = props.merchant.dataValidateAreaMapping.length === 1
    
    this.state = {
      disableWarehouse: singleWareHouse,
      disableGroup: group,
      disableTipe: type,
      disableChannel: channel,
      disableCluster: cluster,
      showModalSuccess: false,
      showModalError: false,
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
    if (prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant) {
      if(this.props.merchant.dataAddMerchant !== null){
        this.props.saveImageBase64('');
        this.setState({showModalSuccess: true})
      }
    }
    /** IF ERROR ADD MERCHANT */
    if (prevProps.merchant.errorAddMerchant !== this.props.merchant.errorAddMerchant) {
      if(this.props.merchant.errorAddMerchant){
        this.setState({showModalError: true})
      }
    }
  }
  
  /** SEND DATA ADD MERCHANT */
  finalStep() {
    this.props.resetMerchantAdd()
    Keyboard.dismiss();
    let {
      storeId, name, address, longitude, latitude,
      urbanId, warehouseId, fullName, idNo, taxNo,
      phone, clusterId, channelId, groupId, typeId,
      noteAddress, idImageUrl, vehicleAccessibilityId,
      vehicleAccessibilityAmount
    } = this.props.merchant.dataMerchantVolatile
    let {supplierStoreId} = this.props.auth.dataCheckPhoneAvailble
    let supplierId = GlobalMethod.userSupplierMapping()
    if(supplierId.length > 0){
      supplierId = supplierId[0].toString()
    }
    const payload = {
      supplierStoreId: supplierStoreId || null,
      storeId,
      supplierId, 
      registerData: {
        user: {
          fullName,
          idNo,
          taxNo,
          phone,
          idImageUrl
        },
        name, // nama toko
        address,
        noteAddress,
        longitude,
        latitude,
        urbanId,
        warehouseId,
        vehicleAccessibilityId,
        vehicleAccessibilityAmount,
        clusterId,
        groupId,
        typeId,
        channelId
      }
    }
    this.props.merchantAddProcess(payload)
  }
  /** GO TO DROPDOWN LIST */
  goToDropdown(params) {
    NavigationService.navigate('SegmentationList', params);
  }
  setDisable(){
    const {warehouseId} = this.props.merchant.dataMerchantVolatile

    if ( 
      !this.props.merchant.loadingAddMerchant && warehouseId
    ) {
      return false
    }
    return true
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
          currentStep={4}
          title={'Langkah melengkapi profil'}
        />
      </View>
    );
  }
  /** WAREHOUSE */
  renderWarehouse(){
    return (
      <DropdownType1 
        title={<Text style={{fontSize: 12}}>{this.renderAsteriskRed()} Warehouse</Text>}
        placeholder={'Masukan warehouse'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.warehouse || '-'}
        disabled={this.state.disableWarehouse}
        openDropdown={() => this.goToDropdown({
          type: 'warehouses',
          placeholder: 'Cari Warehouse'
        })}
      />
    )
  }
  /** STORE TYPE */
  renderStoreType(){
    return (
      <DropdownType1 
        title="Tipe Toko"
        placeholder={'Masukan tipe toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeType || '-'}
        disabled={this.state.disableTipe}
        openDropdown={() => this.goToDropdown({
          type: 'types',
          placeholder: 'Cari Tipe Toko'
        })}
      />
    )
  }
  /** STORE GROUP */
  renderStoreGroup(){
    return(
      <DropdownType1 
        title="Group Toko"
        placeholder={'Masukan group toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeGroup || '-'}
        disabled={this.state.disableGroup}
        openDropdown={() => this.goToDropdown({
          type: 'groups',
          placeholder: 'Cari Group Toko'
        })}
      />
    )
  }
  /** STORE CLUSTER */
  renderStoreCluster(){
    return(
      <DropdownType1 
        disabled={this.state.disableCluster}
        title="Cluster Toko"
        placeholder={'Masukan cluster toko'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeCluster || '-'}
        openDropdown={() => this.goToDropdown({
          type: 'clusters',
          placeholder: 'Cari Cluster Toko'
        })}
      />
      )
    }
    /** STORE CHANNEL */
    renderStoreChannel(){
      return(
        <DropdownType1 
          title="Channel Toko"
          placeholder={'Masukan channel toko'}
          selectedDropdownText={this.props.merchant.dataMerchantVolatile.storeChannel || '-'}
          disabled={this.state.disableChannel}
          openDropdown={() => this.goToDropdown({
            type: 'channels',
            placeholder: 'Cari Channel Toko'
          })}
        />
        )
      }

  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderWarehouse()}
        {this.renderStoreType()}
        {this.renderStoreGroup()}
        {this.renderStoreCluster()}
        {this.renderStoreChannel()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        title={'Selesai'}
        loading={this.props.merchant.loadingAddMerchant}
        disabled={this.setDisable()}
        borderRadius={4}
        onPress={() => this.finalStep()}
      />
    );
  }
  /** RENDER MODAL SUCCESS */
  renderModalSuccess(){
    return(
      <ModalBottomType1
        title={''}
        open={this.state.showModalSuccess}
        content={this.modalSuccessContent()}
      />
    )
  }
  /** RENDER MODAL SUCCESS CONTENT */
  modalSuccessContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatusBarBlackOP40 />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/sinbad_image/smile_sinbad.png')}
            style={{ width: 240, height: 160 }}
            resizeMode="contain"
          />
          <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
            Selamat, Toko Berhasil Didaftarkan
          </Text>
          <Text style={[Fonts.type8, {textAlign: 'center', marginHorizontal: 24, lineHeight: 24}]}>
            Sekarang Anda dapat melihat toko yang didaftarkan di fitur Journey Plan atau List Toko
          </Text>
        </View>
        <View style={{marginVertical: 16}} />
        <View style={{ width: '100%'}}>
          <ButtonSingle
            borderRadius={4}
            title="Kembali ke Beranda"
            onPress={() => {
              this.setState({showModalSuccess: false})
              NavigationService.navigate("HomeView")
            }}
          />
        </View>
      </View>
    );
  }
  /** RENDER MODAL ERROR */
  renderModalError(){
    return(
      <ModalBottomType3
        title={''}
        open={this.state.showModalError}
        close={() => this.setState({showModalError: false})}
        content={this.modalErrorContent()}
        typeClose={'cancel'}
      />
    )
  }
  /** RENDER MODAL ERROR CONTENT */
  modalErrorContent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatusBarBlackOP40 />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/sinbad_image/failed_error.png')}
            style={{ width: 240, height: 160 }}
            resizeMode="contain"
          />
          <View style={{marginVertical: 16}} />
          <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
            Toko Gagal Dibuat
          </Text>
          <Text style={[Fonts.type8, {textAlign: 'center', marginHorizontal: 24, lineHeight: 24}]}>
            Maaf anda belum bisa menambahkan toko ini
          </Text>
          <Text style={[Fonts.type8, {textAlign: 'center', marginHorizontal: 24, lineHeight: 24}]}>
            Silahkan hubungi admin untuk proses lebih lanjut.
          </Text>
        </View>
        <View style={{marginVertical: 16}} />
        <View style={{ width: '100%'}}>
          <ButtonSingle
            borderRadius={4}
            title={'Oke, Saya Mengerti'}
            onPress={() => {
              this.setState({showModalError: false})
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
          {this.renderContent()}
        </ScrollView>
        {this.renderButton()}
        {this.state.showModalSuccess && this.renderModalSuccess()}
        {this.state.showModalError && this.renderModalError()}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep4);
