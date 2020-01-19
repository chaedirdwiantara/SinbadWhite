import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Text from 'react-native-text';
import MapView, { Marker } from 'react-native-maps';
import NavigationService from '../../../navigation/NavigationService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import ButtonSingle from '../../../components/button/ButtonSingle';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import masterColor from '../../../config/masterColor';
import ProgressBarType1 from '../../../components/progress_bar/ProgressBarType1';
import DropdownType1 from '../../../components/input/DropdownType1';
import InputType2 from '../../../components/input/InputType2';
import InputType1 from '../../../components/input/InputType1';
import InputMapsType1 from '../../../components/input/InputMapsType1';
import Fonts from '../../../helpers/GlobalFont';

class AddMerchantAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: this.props.global.dataLocationVolatile.address,
      refreshLocation: false
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  componentDidUpdate(prevProps) {
    // if (
    //   prevProps.global.dataLocationVolatile.longitude !==
    //     this.props.global.dataLocationVolatile.longitude ||
    //   prevProps.global.dataLocationVolatile.latitude !==
    //     this.props.global.dataLocationVolatile.latitude
    // ) {
    //   this.setState({ refreshLocation: true });
    //   setTimeout(() => {
    //     this.setState({ refreshLocation: false });
    //   }, 100);
    // }
  }
  /** NEXT STEP MULTI STEP FORM */
  nextStep() {
    // this.props.longlatToAddressGetProcess({
    //   longitude: this.props.global.dataLocationVolatile.longitude,
    //   latitude: this.props.global.dataLocationVolatile.latitude
    // });
    this.props.saveLocationDataVolatile({
      address: this.state.address
    });
    this.props.saveVolatileDataAddMerchant({
      urbanId: this.props.global.dataLocationVolatile.urbanId,
      longitude: this.props.global.dataLocationVolatile.longitude,
      latitude: this.props.global.dataLocationVolatile.latitude,
      address: this.state.address
    });
    NavigationService.navigate('AddMerchant6');
  }
  /** GO TO DROPDOWN LIST */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
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
      <ProgressBarType1
        totalStep={4}
        currentStep={2}
        title={'Langkah melengkapi profil'}
      />
    );
  }
  /** === RENDER DESCRIPTION === */
  renderDescription() {
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={Fonts.type23}>
          Alamat akan digunakan untuk lokasi pengiriman barang pesanannmu
        </Text>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  /** renderProvince */
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
            placeholder: 'Cari Provinsi Anda'
          })
        }
      />
    );
  }
  /** renderCity */
  renderCity() {
    return this.props.global.dataLocationVolatile.provinceName !== '' ? (
      <DropdownType1
        title={'Kota'}
        placeholder={'Pilih Kota'}
        selectedDropdownText={this.props.global.dataLocationVolatile.cityName}
        openDropdown={() =>
          this.goToDropdown({
            type: 'city',
            placeholder: 'Cari Kota Anda'
          })
        }
      />
    ) : (
      <View />
    );
  }
  /** renderDistrict */
  renderDistric() {
    return this.props.global.dataLocationVolatile.cityName !== '' ? (
      <DropdownType1
        title={'Kecamatan'}
        placeholder={'Pilih Kecamatan'}
        selectedDropdownText={
          this.props.global.dataLocationVolatile.districName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'distric',
            placeholder: 'Cari Kecamatan Anda'
          })
        }
      />
    ) : (
      <View />
    );
  }
  /** renderUrban */
  renderUrban() {
    return this.props.global.dataLocationVolatile.districName !== '' ? (
      <DropdownType1
        title={'Kelurahan'}
        placeholder={'Pilih Kelurahan'}
        selectedDropdownText={this.props.global.dataLocationVolatile.urbanName}
        openDropdown={() =>
          this.goToDropdown({
            type: 'urban',
            placeholder: 'Cari Kelurahan Anda'
          })
        }
      />
    ) : (
      <View />
    );
  }
  /** renderZipCode */
  renderZipCode() {
    return this.props.global.dataLocationVolatile.urbanName !== '' ? (
      <InputType1
        title={'Kodepos'}
        editable={false}
        placeholder={
          this.props.global.dataLocationVolatile.zipCode !== ''
            ? this.props.global.dataLocationVolatile.zipCode
            : 'Kodepos'
        }
        keyboardType={'default'}
        text={text => this.setState({ address: text })}
        error={false}
        errorText={''}
      />
    ) : (
      <View />
    );
  }
  /** address */
  renderAddress() {
    return this.props.global.dataLocationVolatile.urbanName !== '' ? (
      <InputType2
        title={'Alamat'}
        value={this.state.address}
        placeholder={'Masukan Alamat lengkap Anda'}
        keyboardType={'default'}
        text={text => this.setState({ address: text })}
        error={false}
        errorText={''}
      />
    ) : (
      <View />
    );
  }
  /** maps */
  renderMaps() {
    return (
      <InputMapsType1
        title={'Koordinat Lokasi'}
        selectedMapLong={this.props.merchant.dataAddMerchantVolatile.longitude}
        selectedMapLat={this.props.merchant.dataAddMerchantVolatile.latitude}
        refresh={this.state.refreshLocation}
        openMaps={() => this.goToMaps('maps')}
      />
    );
  }
  /** main content */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        {/* {this.renderProvince()}
        {this.renderCity()}
        {this.renderDistric()}
        {this.renderUrban()}
        {this.renderZipCode()}
        {this.renderAddress()} */}
        {this.renderMaps()}
        <View style={{ paddingBottom: 50 }} />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    // const {
    //   provinceName,
    //   cityName,
    //   districName,
    //   urbanName,
    //   longitude,
    //   latitude
    // } = this.props.global.dataLocationVolatile;
    return (
      <ButtonSingle
        disabled={
          false
          // provinceName === '' ||
          // cityName === '' ||
          // districName === '' ||
          // urbanName === '' ||
          // this.state.address === '' ||
          // longitude === '' || latitude === ''
        }
        title={'Lanjutkan'}
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
          {this.renderDescription()}
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
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ auth, global, merchant }) => {
  return { auth, global, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantAddress);
