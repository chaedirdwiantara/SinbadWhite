import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import { MoneyFormat } from '../../../helpers/NumberFormater';
import Fonts from '../../../helpers/GlobalFont';
import ButtonSingle from '../../../components/button/ButtonSingle';
import InputType1 from '../../../components/input/InputType1';
import DropdownType1 from '../../../components/input/DropdownType1';
import NavigationService from '../../../navigation/NavigationService';

class MerchantEditPartialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: this.props.showButton,
      merchantAccountEdit: false,
      /** all data need */
      storeId: this.props.merchant.dataGetMerchantDetail.id,
      ownerId: this.props.merchant.dataGetMerchantDetail.owner.id,
      idNo: this.props.merchant.dataGetMerchantDetail.owner.idNo,
      taxNo: this.props.merchant.dataGetMerchantDetail.owner.taxNo,
      name: this.props.merchant.dataGetMerchantDetail.name,
      numberOfEmployee: this.props.merchant.dataGetMerchantDetail
        .numberOfEmployee,
      largeArea: this.props.merchant.dataGetMerchantDetail.largeArea
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** EDIT */
  edit() {
    if (
      this.props.type === 'merchantOwnerIdNo' ||
      this.props.type === 'merchantOwnerTaxNo'
    ) {
      const data = {
        storeId: this.state.storeId,
        params: {
          owner: {
            id: this.state.ownerId,
            idNo: this.state.idNo,
            taxNo: this.state.taxNo
          }
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantAccount') {
      const data = {
        storeId: this.state.storeId,
        params: {
          name: this.state.name
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantPhysical') {
      const data = {
        storeId: this.state.storeId,
        params: {
          numberOfEmployee: this.state.numberOfEmployee,
          vehicleAccessibilityId: this.props.merchant.dataEditMerchantVolatile
            .vehicleAccessibilityId
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantClassification') {
      const data = {
        storeId: this.state.storeId,
        params: {
          storeTypeId:
            this.props.merchant.dataEditMerchantVolatile.storeTypeId !== ''
              ? this.props.merchant.dataEditMerchantVolatile.storeTypeId
              : null,
          storeGroupId:
            this.props.merchant.dataEditMerchantVolatile.storeGroupId !== ''
              ? this.props.merchant.dataEditMerchantVolatile.storeGroupId
              : null,
          storeSegmentId:
            this.props.merchant.dataEditMerchantVolatile.storeSegmentId !== ''
              ? this.props.merchant.dataEditMerchantVolatile.storeSegmentId
              : null,
          largeArea: this.state.largeArea
        }
      };
      console.log(data);
      this.props.merchantEditProcess(data);
    }
  }
  editData(data) {
    switch (data.type) {
      case 'merchantAccount':
        this.setState({ merchantAccountEdit: true, showButton: true });
        break;
      default:
        break;
    }
  }
  /** CHECK BUTTON */
  checkButton() {
    /** ID NO */
    if (this.props.type === 'merchantOwnerIdNo') {
      if (
        this.state.idNo !==
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.idNo &&
        this.state.idNo.length === 16
      ) {
        return false;
      }
    } else if (this.props.type === 'merchantOwnerTaxNo') {
      /** TAX NO */
      if (
        this.state.taxNo !==
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.taxNo &&
        this.state.taxNo.length === 15
      ) {
        return false;
      }
    } else if (this.props.type === 'merchantAccount') {
      /** TAX NO */
      if (
        this.state.name !== this.props.merchant.dataGetMerchantDetail.name &&
        this.state.name !== ''
      ) {
        return false;
      }
    } else if (this.props.type === 'merchantPhysical') {
      if (
        (this.state.numberOfEmployee !==
          this.props.merchant.dataGetMerchantDetail.numberOfEmployee &&
          this.state.numberOfEmployee !== '') ||
        (this.props.merchant.dataEditMerchantVolatile.vehicleAccessibilityId !==
          '' &&
          this.props.merchant.dataEditMerchantVolatile
            .vehicleAccessibilityId !==
            this.props.merchant.dataGetMerchantDetail.vehicleAccessibilityId)
      ) {
        return false;
      }
    } else if (this.props.type === 'merchantClassification') {
      if (
        (this.state.largeArea !==
          this.props.merchant.dataGetMerchantDetail.largeArea &&
          this.state.largeArea !== '') ||
        (this.props.merchant.dataEditMerchantVolatile.storeTypeId !== '' &&
          this.props.merchant.dataEditMerchantVolatile.storeTypeId !==
            this.props.merchant.dataGetMerchantDetail.storeTypeId) ||
        (this.props.merchant.dataEditMerchantVolatile.storeGroupId !== '' &&
          this.props.merchant.dataEditMerchantVolatile.storeGroupId !==
            this.props.merchant.dataGetMerchantDetail.storeGroupId) ||
        (this.props.merchant.dataEditMerchantVolatile.storeSegmentId !== '' &&
          this.props.merchant.dataEditMerchantVolatile.storeSegmentId !==
            this.props.merchant.dataGetMerchantDetail.storeSegmentId)
      ) {
        return false;
      }
    }
    return true;
  }
  /** GO TO LIST AND SEARCH PAGE */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      type: data.type
    });
  }
  /** SWITCH VIEW */
  switchView() {
    switch (this.props.type) {
      case 'merchantOwnerIdNo':
        return this.renderOwnerIdNo();
      case 'merchantOwnerTaxNo':
        return this.renderOwnerTaxNo();
      case 'merchantPhysical':
        return this.renderPhysicalMerchant();
      case 'merchantClassification':
        return this.renderClassificationMerchant();
      case 'merchantAccount':
        return this.renderAccountMerchant();
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT SECTION === */
  renderContentSection(data) {
    return (
      <View style={styles.boxContent}>
        <View>
          <Text style={[Fonts.type9, { marginBottom: 6 }]}>{data.key}</Text>
          <Text style={Fonts.type24}>{data.value ? data.value : '-'}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {data.action === 'tambah' ? (
            <TouchableOpacity onPress={() => this.editData(data)}>
              <Text style={Fonts.type22}>Tambah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {data.action === 'ubah' ? (
            <TouchableOpacity onPress={() => this.editData(data)}>
              <Text style={Fonts.type22}>Ubah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
  /** === RENDER OWNER ID === */
  renderOwnerIdNo() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputType1
          title={'Nomor Kartu Tanda Penduduk (KTP)'}
          value={this.state.idNo}
          maxLength={16}
          placeholder={'Masukan No KTP pemilik'}
          keyboardType={'numeric'}
          text={text => this.setState({ idNo: text })}
          error={false}
          errorText={''}
        />
      </View>
    );
  }
  /** === RENDER OWNER TAX === */
  renderOwnerTaxNo() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputType1
          title={'Nomor Pokok Wajib Pajak (NPWP)'}
          value={this.state.taxNo}
          placeholder={'Masukan NPWP pemilik'}
          keyboardType={'numeric'}
          maxLength={15}
          text={text => this.setState({ taxNo: text })}
          error={false}
          errorText={''}
        />
      </View>
    );
  }
  /** === RENDER PHYSICAL MERCHANT === */
  renderPhysicalMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputType1
          title={'Jumlah Karyawan'}
          value={this.state.numberOfEmployee}
          placeholder={'Jumlah Karyawan'}
          keyboardType={'numeric'}
          text={text => this.setState({ numberOfEmployee: text })}
          error={false}
          errorText={''}
          rightText={'Orang'}
        />
        <DropdownType1
          title={'Vehicle Accessibility'}
          placeholder={'Pilih Vehicle Accessibility'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile
              .vehicleAccessibilityName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'vehicleMerchant',
              placeholder: 'Cari Akses Kendaraan'
            })
          }
        />
      </View>
    );
  }
  /** === RENDER PHYSICAL MERCHANT === */
  renderClassificationMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        <DropdownType1
          title={'Tipe Toko'}
          placeholder={'Pilih Tipe Toko'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile.storeTypeName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'typeMerchant',
              placeholder: 'Cari Tipe Toko'
            })
          }
        />
        <DropdownType1
          title={'Group Toko'}
          placeholder={'Pilih Group Toko'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile.storeGroupName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'groupMerchant',
              placeholder: 'Cari Group Toko'
            })
          }
        />
        {/* <DropdownType1
          title={'Cluster Toko'}
          placeholder={'Pilih Cluster Toko'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile
              .vehicleAccessibilityName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'vehicleMerchant',
              placeholder: 'Cari Akses Kendaraan'
            })
          }
        /> */}
        <DropdownType1
          title={'Segment Toko'}
          placeholder={'Pilih Segment Toko'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile.storeSegmentName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'segmentMerchant',
              placeholder: 'Cari Segment Toko'
            })
          }
        />
        <InputType1
          title={'Ukuran Toko'}
          value={this.state.largeArea}
          placeholder={'Ukuran Toko'}
          keyboardType={'numeric'}
          text={text => this.setState({ largeArea: text })}
          error={false}
          errorText={''}
          rightText={'M²'}
        />
        {/* <DropdownType1
          title={'Hierarchy'}
          placeholder={'Pilih Hierarchy Toko'}
          selectedDropdownText={
            this.props.merchant.dataEditMerchantVolatile
              .vehicleAccessibilityName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'vehicleMerchant',
              placeholder: 'Cari Akses Kendaraan'
            })
          }
        /> */}
      </View>
    );
  }
  /** === RENDER ACCOUNT MERCHANT === */
  renderAccountMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        {!this.state.merchantAccountEdit ? (
          <View>
            {this.renderContentSection({
              key: 'ID Toko',
              value: this.props.merchant.dataGetMerchantDetail.storeCode
            })}
            {this.renderContentSection({
              key: 'Nama Toko',
              value: this.props.merchant.dataGetMerchantDetail.name,
              action: this.props.merchant.dataGetMerchantDetail.name
                ? 'ubah'
                : 'tambah',
              type: 'merchantAccount'
            })}
          </View>
        ) : (
          <InputType1
            title={'Nama Toko'}
            value={this.state.name}
            placeholder={'Masukan Nama Toko Anda'}
            keyboardType={'default'}
            text={text => this.setState({ name: text })}
            error={false}
            errorText={''}
          />
        )}
      </View>
    );
  }
  /** RENDER BUTTON */
  renderButton() {
    return this.state.showButton ? (
      <ButtonSingle
        disabled={this.checkButton() || this.props.merchant.loadingEditMerchant}
        loading={this.props.merchant.loadingEditMerchant}
        title={'Simpan'}
        borderRadius={4}
        onPress={() => this.edit()}
      />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.switchView()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    backgroundColor: masterColor.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'space-between',
    flexDirection: 'row'
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
)(MerchantEditPartialView);
