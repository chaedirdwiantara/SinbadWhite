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
import InputType1 from '../../../components/input/InputType1';
import DropdownType1 from '../../../components/input/DropdownType1';

class AddMerchantInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.merchant.dataAddMerchantVolatile.name,
      largeArea: this.props.merchant.dataAddMerchantVolatile.largeArea,
      numberOfEmployee: this.props.merchant.dataAddMerchantVolatile
        .numberOfEmployee
    };
  }
  /**
   * =====================
   * FUNCTIONAL
   * =====================
   */
  nextStep() {
    NavigationService.navigate('AddMerchant7');
  }
  /** GO TO DROPDOWN LIST */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
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
        totalStep={5}
        currentStep={4}
        title={'Langkah melengkapi profil'}
      />
    );
  }
  renderNameMerchant() {
    return (
      <InputType1
        title={'Nama Toko'}
        value={this.state.nameMerchant}
        placeholder={'Masukan Nama Toko Anda'}
        keyboardType={'default'}
        text={text => this.setState({ nameMerchant: text })}
        error={false}
        errorText={''}
      />
    );
  }
  renderMerchanSize() {
    return (
      <InputType1
        title={'Ukuran Toko'}
        value={this.state.nameMerchant}
        placeholder={'0 M2'}
        keyboardType={'numeric'}
        text={text => this.setState({ nameMerchant: text })}
        error={false}
        errorText={''}
      />
    );
  }
  renderEmployeeTotal() {
    return (
      <InputType1
        title={'Jumlah Karyawan'}
        value={this.state.nameMerchant}
        placeholder={'Jumlah Karyawan'}
        keyboardType={'numeric'}
        text={text => this.setState({ nameMerchant: text })}
        error={false}
        errorText={''}
      />
    );
  }
  renderMerchantType() {
    return (
      <DropdownType1
        title={'Tipe Toko'}
        placeholder={'Pilih Tipe Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.storeTypeName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'typeMerchant',
            placeholder: 'Cari Tipe Toko'
          })
        }
      />
    );
  }
  renderMerchantGroup() {
    return (
      <DropdownType1
        title={'Group Toko'}
        placeholder={'Pilih Group Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.storeGroupName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'groupMerchant',
            placeholder: 'Cari Group Toko'
          })
        }
      />
    );
  }
  renderMerchantCluster() {
    return (
      <DropdownType1
        title={'Cluster Toko'}
        placeholder={'Pilih Cluster Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.cluster.clusterName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'clusterMerchant',
            placeholder: 'Cari Cluster Toko'
          })
        }
      />
    );
  }
  renderMerchantSegment() {
    return (
      <DropdownType1
        title={'Segment Toko'}
        placeholder={'Pilih Segment Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.storeSegmentName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'segmentMerchant',
            placeholder: 'Cari Segment Toko'
          })
        }
      />
    );
  }
  renderMerchantSupplier() {
    return (
      <DropdownType1
        title={'Suplier Toko'}
        placeholder={'Pilih Suplier Toko'}
        selectedDropdownText={
          this.props.merchant.dataAddMerchantVolatile.supplier.supplierName
        }
        openDropdown={() =>
          this.goToDropdown({
            type: 'suplierMerchant',
            placeholder: 'Cari Suplier Toko'
          })
        }
      />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        {this.renderNameMerchant()}
        {this.renderMerchantType()}
        {this.renderMerchantGroup()}
        {this.renderMerchantCluster()}
        {this.renderMerchantSegment()}
        {this.renderMerchantSupplier()}
        {this.renderMerchanSize()}
        {this.renderEmployeeTotal()}
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

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMerchantInformation);
