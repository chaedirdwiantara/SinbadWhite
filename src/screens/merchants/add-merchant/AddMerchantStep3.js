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
  InputMapsType2,
  DropdownType1
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
      getWarehouse: false,
      /** for maps refresh */
      refreshLocation: false,
      /** field data */
      address: this.props.merchant.dataMerchantVolatile.address,
      noteAddress: this.props.merchant.dataMerchantVolatile.noteAddress,
      warehouse: this.props.merchant.dataMerchantVolatile.warehouse
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

    /** GET WAREHOUSE */
    if (
      prevProps.global.dataGetUrbanId !== this.props.global.dataGetUrbanId
    ) {
      // GET Warehouse in urban coverage
      console.log('Warehouse updated!')
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
      urbanId: this.props.global.dataGetUrbanId[0].id
    });
    setTimeout(() => {
      this.setState({ addStoreProcess: false });
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
      this.props.global.dataGetUrbanId === null
      // Add condition for Warehouse later
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
      <DropdownType1 
        title={'*Warehouse'}
        placeholder={'Masukan Warehouse'}
        selectedDropdownText={''}
        openDropdown={() => this.goToDropdown({
          type: 'warehouse',
          placeholder: 'Pilih Warehouse'
        })}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantStep3);