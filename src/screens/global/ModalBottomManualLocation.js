import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fonts from '../../helpers/GlobalFont';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import DropdownType1 from '../../components/input/DropdownType1';
import {
  StatusBarRedOP50,
  StatusBarBlack
} from '../../components/StatusBarGlobal';
import ModalBottomType4 from '../../components/modal_bottom/ModalBottomType4';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomManualLocation extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** === GO TO DROPDOWN LIST ===  */
  goToDropdown(data) {
    this.props.modalManualInputLocation(false);
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
  }
  /** === DISABLE BUTTON === */
  disabledButton() {
    const data = this.props.global.dataLocationVolatile;
    if (
      data.provinceName !== '' &&
      data.cityName !== '' &&
      data.districtName !== '' &&
      data.urbanName !== ''
    ) {
      return false;
    }
    return true;
  }
  /**
   * ========================
   * RENDER VIEW
   * ========================
   */
  /** === RENDER CONTENT === */
  /** => renderProvince */
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
  /** => renderCity */
  renderCity() {
    return this.props.global.dataLocationVolatile.provinceName !== '' ? (
      <DropdownType1
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
    ) : (
      <View />
    );
  }
  /** => renderDistrict */
  renderDistrict() {
    return this.props.global.dataLocationVolatile.cityName !== '' ? (
      <DropdownType1
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
    ) : (
      <View />
    );
  }
  /** => renderUrban */
  renderUrban() {
    return this.props.global.dataLocationVolatile.districtName !== '' ? (
      <DropdownType1
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
    ) : (
      <View />
    );
  }
  /** === RENDER DATA ==== */
  renderData() {
    return (
      <View>
        {this.renderProvince()}
        {this.renderCity()}
        {this.renderDistrict()}
        {this.renderUrban()}
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        {this.props.statusBarWhite ? <StatusBarBlack /> : <StatusBarRedOP50 />}
        <ScrollView>{this.renderData()}</ScrollView>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType4
        open={this.props.open}
        close={this.props.close}
        typeClose={'cancel'}
        onPress={this.props.onPress}
        buttonDisabled={this.disabledButton()}
        title={'Manual Input'}
        buttonTitle={'Simpan'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 0.5 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    flex: 1
  },
  boxInvoiceName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  boxMinPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomManualLocation);
