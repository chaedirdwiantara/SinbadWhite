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
  InputType4,
  InputMapsType2,
  DropdownType2
} from '../../../library/component';
import { Color } from '../../../config';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';

class AddMerchantStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** error */
      errorLocation: false,
      errorDetailLocation: false,
      errorUrbanId: false,
      errorWarehouse: false,
      disabledDropdown: true,
      disabledAction: true,
      disableButton: true,
      /** for maps refresh */
      refreshLocation: false,
      /** field data */
      address: this.props.merchant.dataMerchantVolatile.address,
      noteAddress: this.props.merchant.dataMerchantVolatile.noteAddress,
      /** for warehouse check */
      warehouseFound: null,
      warehouse: '',
      warehouseTitle: 'Warehouse'
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

    /** CHECK URBAN ID */
    if (prevProps.global.dataGetUrbanId !== this.props.global.dataGetUrbanId ) {    
      /** GET WAREHOUSE */  
      if (this.props.global.dataGetUrbanId !== null && this.props.global.dataGetUrbanId.length !== 0) {
        setTimeout(() => {
          this.props.merchantGetWarehouseProcess(this.props.global.dataGetUrbanId[0].id)
        }, 100)
      }
      
      /** CHECK WAREHOUSE */
      setTimeout(() => {
        const warehouse = this.props.merchant.dataGetWarehouse
        if (warehouse.total === 0){
          this.setState({
            warehouse: 'Not found', 
            disableButton: false,
            warehouseFound: 0
          })
          this.props.saveVolatileDataMerchant({
            warehouse: 'Not Found' 
          })
        } else if (warehouse.total === 1) {
          this.setState({
            warehouseTitle: '*Warehouse',
            disableButton: false
          })
          this.props.saveVolatileDataMerchant({
            warehouse: warehouse.data[0].name, 
            warehouseId: warehouse.data[0].id,
          })
        } else {
          this.setState({
            warehouse: 'Pilih Warehouse', 
            disabledDropdown: false,
            disabledAction: false,
            disableButton: false,
            warehouseTitle: '*Warehouse'
          })
        }
      }, 100)
      
      
    } 
  }
  /** SEND DATA ADD MERCHANT */
  nextStep() {
    this.setState({ addStoreProcess: true });
    Keyboard.dismiss();
    this.props.saveVolatileDataMerchant({
      longitude: this.props.global.longitude,
      latitude: this.props.global.latitude,
      address: this.state.address,
      noteAddress: this.state.noteAddress,
      urbanId: this.props.global.dataGetUrbanId[0].id,
      warehouse: this.props.merchant.dataMerchantVolatile.warehouse,
      warehouseId: this.props.merchant.dataMerchantVolatile.warehouseId
    });
    setTimeout(() => {
      this.setState({ addStoreProcess: false });
      NavigationService.navigate('AddMerchantStep4')
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
      this.state.address === null ||
      this.props.global.longitude === '' ||
      this.props.global.latitude === '' ||
      this.props.global.dataGetUrbanId === null ||
      this.props.merchant.dataMerchantVolatile.warehouse === null
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
        title={'*Koordinat Lokasi'}
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
        editable={!this.props.merchant.dataMerchantDisabledField.address}
        title={'*Detail Alamat'}
        value={this.state.address}
        placeholder={'Contoh : Jl. Kemang Raya No.58, RT.8/RW…'}
        keyboardType={'default'}
        onChangeText={address =>
          this.setState({ address: address === '' ? null : address })
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
        editable={!this.props.merchant.dataMerchantDisabledField.noteAddress}
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
  /** MERCHANT WAREHOUSE */
  renderWarehouse(){
    return (
      <DropdownType2 
        title={this.state.warehouseTitle}
        placeholder={'Masukan Warehouse'}
        selectedDropdownText={this.props.merchant.dataMerchantVolatile.warehouse}
        disabledDropdown={this.state.disabledDropdown}
        disabledAction={this.state.disabledAction}
        openDropdown={() => this.goToDropdown({
          type: 'warehouse',
          placeholder: 'Pilih Warehouse'
        })}
        errorText={this.state.warehouseFound === 0 ?
          'Lokasi toko tidak dalam area jangkauan warehouse tertentu.' : ''}
      />
    )
  }
  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {this.renderMaps()}
        {this.renderAddress()}
        {this.renderNoteAddress()}
        {this.renderWarehouse()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.buttonDisable()
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep3);
