import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  height
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ButtonSingle,
  DropdownType1
} from '../../library/component';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';

class InputManualLocation extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * ========================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {}
  /** === SAVE DATA === */
  save() {
    /** => BACK TO PAGE BEFORE */
    NavigationService.goBack(this.props.navigation.state.key);
    /** => SAVE DATA */
    setTimeout(() => {
      this.props.saveDataManualInputLocationToLongLat({
        province: this.props.global.dataLocationVolatile.provinceName,
        city: this.props.global.dataLocationVolatile.cityName,
        district: this.props.global.dataLocationVolatile.districtName,
        urban: this.props.global.dataLocationVolatile.urbanName
      });
    }, 500);
  }
  /** === GO TO DROPDOWN LIST ===  */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
  }
  /** === CHECK DISABLED BUTTON === */
  checkButtonDisabled() {
    if (
      this.props.global.dataLocationVolatile.provinceName === '' ||
      this.props.global.dataLocationVolatile.cityName === '' ||
      this.props.global.dataLocationVolatile.districtName === '' ||
      this.props.global.dataLocationVolatile.urbanName === ''
    ) {
      return true;
    }
    return false;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER PROVINCE === */
  renderProvince() {
    return (
      <DropdownType1
        title={'Provinsi'}
        placeholder={'Pilih Provinsi'}
        selectedDropdownText={
          this.props.global.dataLocationVolatile.provinceName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'province',
            placeholder: 'Cari Provinsi'
          })
        }
      />
    );
  }
  /** === RENDER CITY === */
  renderCity() {
    return (
      <DropdownType1
        disabled={this.props.global.dataLocationVolatile.provinceName === ''}
        title={'Kota'}
        placeholder={'Pilih Kota'}
        selectedDropdownText={this.props.global.dataLocationVolatile.cityName}
        openDropdown={() =>
          this.goToDropdown({
            type: 'city',
            placeholder: 'Cari Kota'
          })
        }
      />
    );
  }
  /** === RENDER DISTRICT === */
  renderDistric() {
    return (
      <DropdownType1
        disabled={this.props.global.dataLocationVolatile.cityName === ''}
        title={'Kecamatan'}
        placeholder={'Pilih Kecamatan'}
        selectedDropdownText={
          this.props.global.dataLocationVolatile.districtName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'district',
            placeholder: 'Cari Kecamatan'
          })
        }
      />
    );
  }
  /** === RENDER URBAN === */
  renderUrban() {
    return (
      <DropdownType1
        disabled={this.props.global.dataLocationVolatile.districtName === ''}
        title={'Kelurahan'}
        placeholder={'Pilih Kelurahan'}
        selectedDropdownText={this.props.global.dataLocationVolatile.urbanName}
        openDropdown={() =>
          this.goToDropdown({
            type: 'urban',
            placeholder: 'Cari Kelurahan'
          })
        }
      />
    );
  }
  /** === RENDER POSTAL CODE === */
  renderPostalCode() {
    return (
      <DropdownType1
        disabled
        title={'Kodepos'}
        placeholder={'Pilih Kodepos'}
        selectedDropdownText={this.props.global.dataLocationVolatile.zipCode}
      />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        {this.renderProvince()}
        {this.renderCity()}
        {this.renderDistric()}
        {this.renderUrban()}
        {this.renderPostalCode()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={this.checkButtonDisabled()}
        loading={false}
        title={'Simpan'}
        borderRadius={4}
        onPress={() => this.save()}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        <ScrollView>
          <View style={{ paddingTop: 16 }} />
          {this.renderContent()}
          <View style={{ paddingBottom: 0.1 * height }} />
        </ScrollView>
        {this.renderButton()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
 export default connect(mapStateToProps, mapDispatchToProps)(InputManualLocation);
