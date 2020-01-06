import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Text from 'react-native-text';
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
      address: ''
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  /** NEXT STEP MULTI STEP FORM */
  nextStep() {
    NavigationService.navigate('AddMerchant4');
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
    console.log('lala');
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
        totalStep={7}
        currentStep={3}
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
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <DropdownType1
          title={'Provinsi'}
          placeholder={'Pilih Provinsi'}
          selectedDropdownText={''}
          openDropdown={() =>
            this.goToDropdown({
              type: 'province',
              placeholder: 'Cari Provinsi Anda'
            })
          }
        />
        <DropdownType1
          title={'Kota'}
          placeholder={'Pilih Kota'}
          selectedDropdownText={''}
          openDropdown={() =>
            this.goToDropdown({
              type: 'city',
              placeholder: 'Cari Kota Anda'
            })
          }
        />
        <DropdownType1
          title={'Kecamatan'}
          placeholder={'Pilih Kecamatan'}
          selectedDropdownText={''}
          openDropdown={() =>
            this.goToDropdown({
              type: 'distric',
              placeholder: 'Cari Kecamatan Anda'
            })
          }
        />
        <DropdownType1
          title={'Kelurahan'}
          placeholder={'Pilih Kelurahan'}
          selectedDropdownText={''}
          openDropdown={() =>
            this.goToDropdown({
              type: 'urban',
              placeholder: 'Cari Kelurahan Anda'
            })
          }
        />
        <InputType1
          title={'Kodepos'}
          editable={false}
          placeholder={'Kodepos'}
          keyboardType={'default'}
          text={text => this.setState({ address: text })}
          error={false}
          errorText={''}
        />
        <InputType2
          title={'Alamat'}
          placeholder={'Masukan Alamat lengkap Anda'}
          keyboardType={'default'}
          text={text => this.setState({ address: text })}
          error={false}
          errorText={''}
        />
        <InputMapsType1
          title={'Koordinat Lokasi'}
          selectedMapText={''}
          openMaps={() => this.goToMaps('maps')}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMerchantAddress);
