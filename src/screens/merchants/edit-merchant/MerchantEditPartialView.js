import {
  React,
  Component,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  ButtonSingle,
  InputMapsType2,
  DropdownType1,
  InputType4,
  InputType2,
  DropdownType2
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import MerchantPhotoUploadRules from '../reusable-view/MerchantPhotoUploadRules';
import PhotoUploaded from '../reusable-view/PhotoUploaded';

class MerchantEditPartialView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: this.props.showButton,
      showButtonOpenCamera: this.props.showButtonOpenCamera,
      refreshLocation: false,
      typeCamera: this.props.typeCamera,
      disabledDropdown: true,
      disabledAction: false,
      /** all data need */
      id: this.props.merchant.dataGetMerchantDetailV2.id,
      /** for merchant information */
      name: this.props.merchant.dataMerchantVolatile.name,
      phoneNo: this.props.merchant.dataMerchantVolatile.phoneNo,
      /** for merchant address */
      address: this.props.merchant.dataMerchantVolatile.address,
      noteAddress: this.props.merchant.dataMerchantVolatile.noteAddress,
      urbanId: this.props.merchant.dataMerchantVolatile.urbanId,
      zipCode: this.props.merchant.dataMerchantVolatile.zipCode,
      urban: this.props.merchant.dataMerchantVolatile.urban,
      warehouse: true,
      /** for merchant completeness information */
      largeArea: this.props.merchant.dataMerchantVolatile.largeArea,
      topSellingBrand: this.props.merchant.dataMerchantVolatile.topSellingBrand,
      mostWantedBrand: this.props.merchant.dataMerchantVolatile.mostWantedBrand,
      vehicleAccessibilityAmount: this.props.merchant.dataMerchantVolatile
        .vehicleAccessibilityAmount,
      /** for warehouse check */
      warehouseFound: null
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.saveLongLatForEdit({
      latitude: this.props.merchant.dataMerchantVolatile.latitude,
      longitude: this.props.merchant.dataMerchantVolatile.longitude
    });
    this.props.merchantGetWarehouseProcess(
      this.props.merchant.dataMerchantVolatile.urbanId
    );
  }
  /** === DID UPDATE === */
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

    /** GET WAREHOUSE BY URBAN ID */
    if (prevProps.global.dataGetUrbanId !== this.props.global.dataGetUrbanId) {
      /** GET WAREHOUSE */

      if (
        this.props.global.dataGetUrbanId !== null &&
        this.props.global.dataGetUrbanId.length !== 0
      ) {
        setTimeout(() => {
          this.props.merchantGetWarehouseProcess(
            this.props.global.dataGetUrbanId[0].id
          );
        }, 100);
      }
    }
    /** CHECK WAREHOUSE */
    if (
      prevProps.merchant.dataGetWarehouse !==
      this.props.merchant.dataGetWarehouse
    ) {
      if (this.props.merchant.dataGetWarehouse !== null) {
        if (this.props.merchant.dataGetWarehouse.total === 0) {
          this.props.saveVolatileDataMerchant({
            warehouse: null,
            warehouseId: null
          });
        } else if (this.props.merchant.dataGetWarehouse.total === 1) {
          this.props.saveVolatileDataMerchant({
            warehouse: this.props.merchant.dataGetWarehouse.data[0].name,
            warehouseId: this.props.merchant.dataGetWarehouse.data[0].id
          });
        }
      }
    }
  }
  /** === DID UNMOUNT */
  componentWillUnmount() {
    /** make long lat null, for re render maps page before */
    this.props.saveLongLatForEdit({
      latitude: '',
      longitude: ''
    });
    this.props.saveImageBase64('');
  }
  /** === GO TO MAPS === */
  goToMaps() {
    NavigationService.navigate('MapsView');
  }
  /** === EDIT === */
  edit() {
    if (
      this.props.type === 'merchantAccountName' ||
      this.props.type === 'merchantAccountPhoneNo'
    ) {
      const data = {
        id: this.state.id,
        params: {
          name: this.state.name,
          phoneNo: this.state.phoneNo
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantCompletenessInformation') {
      const data = {
        id: this.state.id,
        params: {
          numberOfEmployee: this.props.merchant.dataMerchantVolatile
            .numberOfEmployee,
          largeArea: this.state.largeArea,
          topSellingBrand: this.state.topSellingBrand,
          mostWantedBrand: this.state.mostWantedBrand,
          vehicleAccessibilityId: this.props.merchant.dataMerchantVolatile
            .vehicleAccessibilityId,
          vehicleAccessibilityAmount: this.state.vehicleAccessibilityAmount
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantAddress') {
      const warehouse = this.props.merchant.dataGetWarehouse
      const data = {
        id: this.state.id,
        params: {
          address: this.state.address,
          noteAddress: this.state.noteAddress,
          longitude: this.props.global.longitude,
          latitude: this.props.global.latitude,
          warehouseId: warehouse.total === 0 || warehouse.total === 1 ? null : this.props.merchant.dataMerchantVolatile.warehouseId,
          urbanId:
            this.props.global.dataGetUrbanId !== null
              ? this.props.global.dataGetUrbanId[0].id
              : this.state.urbanId
        }
      };
      this.props.merchantEditProcess(data);
    } else if (this.props.type === 'merchantAccountImage') {
      const data = {
        id: this.state.id,
        params: {
          image: `data:image/gif;base64,${this.props.global.imageBase64}`
        }
      };
      this.props.merchantEditProcess(data);
    }
  }
  /** === OPEN CAMERA === */
  openCamera() {
    switch (this.state.typeCamera) {
      case 'merchant':
        NavigationService.navigate('TakeMerchantPicture');
        break;
      default:
        break;
    }
  }
  /** === CHECK BUTTON FOR URBAN WAREHOUSE === */
  checkButtonForUrbanWarehouse() {
    if (this.props.merchant.dataGetWarehouse.total === 0) {
      return (
        this.props.global.longitude ===
          this.props.merchant.dataGetMerchantDetailV2.longitude &&
        this.props.global.latitude ===
          this.props.merchant.dataGetMerchantDetailV2.latitude
      );
    } else {
      if (this.props.merchant.dataGetMerchantDetailV2.warehouse) {
        return (
          this.props.merchant.dataGetMerchantDetailV2.warehouse.name ===
          this.props.merchant.dataMerchantVolatile.warehouse
        );
      } else {
        return this.props.merchant.dataMerchantVolatile.warehouse === null;
      }
    }
  }
  /** === CHECK BUTTON (CHECK BUTTON SAVE DISBALE OR NOT) === */
  checkButton() {
    const data = this.props.merchant.dataMerchantVolatile;
    switch (this.props.type) {
      case 'merchantImage':
        return this.props.global.imageBase64 === '';
      case 'merchantAccountName':
        return this.state.name === data.name;
      case 'merchantAccountPhoneNo':
        return this.state.phoneNo === data.phoneNo;
      case 'merchantCompletenessInformation':
        return (
          this.state.largeArea === data.largeArea &&
          this.state.topSellingBrand === data.topSellingBrand &&
          this.state.mostWantedBrand === data.mostWantedBrand &&
          this.state.vehicleAccessibilityAmount ===
            data.vehicleAccessibilityAmount &&
          this.props.merchant.dataMerchantVolatile.vehicleAccessibilityId ===
            this.props.merchant.dataGetMerchantDetailV2.vehicleAccessibilityId &&
          this.props.merchant.dataMerchantVolatile.numberOfEmployee ===
            this.props.merchant.dataGetMerchantDetailV2.numberOfEmployee
        );
      case 'merchantAddress':
        return (
          this.checkButtonForUrbanWarehouse() &&
          this.state.address === data.address &&
          this.state.noteAddress === data.noteAddress
        );
      default:
        break;
    }
  }
  /** === GO TO LIST AND SEARCH PAGE (GLOBAL USED) === */
  goToDropdown(data) {
    NavigationService.navigate('ListAndSearchType1', {
      placeholder: data.placeholder,
      hide: data.hide ? data.hide : false,
      type: data.type
    });
  }
  /** SWITCH VIEW */
  switchView() {
    switch (this.props.type) {
      case 'merchantAddress':
        return this.renderAddressMerchant();
      case 'merchantCompletenessInformation':
        return this.renderCompletenessInformationMerchant();
      case 'merchantAccountName':
        return this.renderMerchantAccountName();
      case 'merchantAccountPhoneNo':
        return this.renderMerchantAccountPhoneNo();
      case 'merchantAccountImage':
        return this.renderMerchantAccountImage();
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /**
   * ===============================
   * RENDER GLOBAL USED
   * ================================
   */
  /** === RENDER CONTENT SECTION === */
  renderContentSection(data) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 16,
          marginBottom: 28
        }}
      >
        <View style={{ flex: 7, flexDirection: 'column' }} >
          <View style={{flex: 1}}>
            <Text style={[Fonts.type9, { marginBottom: 6 }]}>{data.key}</Text>
          </View> 
          <View style={{flex: 1}}>
            <Text style={Fonts.type24}>{data.value ? data.value : '-'}</Text>
          </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column'}} >
          <TouchableOpacity
            onPress={() => this.goToDropdown({
              type: data.type,
              placeholder: data.placeholder
            })}
          >
            <Text style={[Fonts.type11, {marginLeft: 0}]}>Ubah</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  /** === RENDER UPLOADED IMAGE === */
  renderUploadedImage(data) {
    return (
      <PhotoUploaded
        image={
          data.image !== null && this.props.global.imageBase64 === ''
            ? data.image
            : `data:image/jpg;base64,${this.props.global.imageBase64}`
        }
        imageBase64={this.props.global.imageBase64}
        loading={this.props.global.loadingUploadImage}
        rotate={data.rotate}
        reTake={() => this.openCamera()}
        marginTop={data.marginTop}
        marginTopRetakeText={data.marginTopRetakeText}
      />
    );
  }
  /**
   * ======================================
   * RENDER MERCHANT ADDRESS (ALAMAT TOKO)
   * ======================================
   */
  renderAddressMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputMapsType2
          change
          title={'Koordinat Lokasi'}
          selectedMapLong={this.props.global.longitude}
          selectedMapLat={this.props.global.latitude}
          refresh={this.state.refreshLocation}
          openMaps={() => this.goToMaps()}
        />

        <InputType2
          title={'Detail Alamat'}
          value={this.state.address}
          placeholder={'Contoh : Jl. Kemang Raya No.58, RT.8/RW…'}
          keyboardType={'default'}
          text={text => this.setState({ address: text })}
          error={false}
          errorText={''}
        />
        <InputType2
          title={'Catatan Alamat'}
          value={this.state.noteAddress}
          placeholder={'Contoh : Masuk Gang arjuna depan toko cilok'}
          keyboardType={'default'}
          text={text => this.setState({ noteAddress: text })}
          error={false}
          errorText={''}
        />
        <DropdownType2
          title={
            this.props.merchant.dataGetWarehouse.total !== 0
              ? '*Warehouse'
              : 'Warehouse'
          }
          placeholder={
            this.props.merchant.dataGetWarehouse.total !== 0
              ? 'Masukan Warehouse'
              : 'Lokasi toko tidak dalam area jangkauan warehouse tertentu'
          }
          selectedDropdownText={
            this.props.merchant.dataMerchantVolatile.warehouse
          }
          disabledDropdown={this.props.merchant.dataGetWarehouse.total <= 1}
          disabledAction={this.props.merchant.dataGetWarehouse.total <= 1}
          openDropdown={() =>
            this.goToDropdown({
              type: 'warehouse',
              placeholder: 'Cari Warehouse'
            })
          }
          errorText={
            this.props.merchant.dataGetWarehouse.total === 1
              ? 'Lokasi toko berada dalam area jangkauan warehouse tertentu dan tidak dapat diubah.'
              : ''
          }
        />
      </View>
    );
  }
  /**
   * =====================================
   * RENDER ACCOUNT MERCHANT (AKUN TOKO)
   * =====================================
   */
  /** === RENDER MERCHANT ACCOUNT NAME === */
  renderMerchantAccountName() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputType4
          title={'Nama Toko'}
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder={'Masukan Nama Toko'}
          keyboardType={'default'}
          marginBottom={16}
        />
      </View>
    );
  }
  /** === RENDER MERCHANT ACCOUNT PHONE NUMBER === */
  renderMerchantAccountPhoneNo() {
    return (
      <View style={{ marginTop: 16 }}>
        <InputType4
          title={'Nomor Handphone Toko'}
          value={this.state.phoneNo}
          onChangeText={phoneNo => {
            const cleanNumber = phoneNo.replace(/[^0-9]/g, '');
            this.setState({ phoneNo: cleanNumber });
          }}
          placeholder={'Masukan Nomor Handphone Toko'}
          keyboardType={'numeric'}
          maxLength={13}
          marginBottom={16}
        />
      </View>
    );
  }
  /** === RENDER MERCHANT ACCOUNT IMAGE === */
  renderMerchantAccountImage() {
    return (
      <View style={{ paddingVertical: 16 }}>
        {this.props.global.imageBase64 === '' &&
        this.props.merchant.dataMerchantVolatile.imageUrl === null ? (
          <MerchantPhotoUploadRules />
        ) : (
          this.renderUploadedImage({
            image: this.props.merchant.dataMerchantVolatile.imageUrl,
            marginTop: -40,
            marginTopRetakeText: -30,
            rotate: false
          })
        )}
      </View>
    );
  }
  /**
   * =============================================================
   * RENDER COMPLETENESS MERCHANT INFORMATION (KELENGKAPAN INFORMASI TOKO)
   * =============================================================
   */
  /** === RENDER COMPLETENESS MERCHANT INFORMATION DETAIL === */
  renderCompletenessInformationMerchant() {
    return (
      <View style={{ marginTop: 16 }}>
        <DropdownType1
          title={'Jumlah Karyawan'}
          placeholder={'Pilih Jumlah Karyawan'}
          selectedDropdownText={
            this.props.merchant.dataMerchantVolatile.numberOfEmployee
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'numberOfEmployeeMerchant',
              placeholder: '',
              hide: true
            })
          }
        />
        <InputType4
          title={'Top Brand Selling'}
          value={this.state.topSellingBrand}
          onChangeText={topSellingBrand => this.setState({ topSellingBrand })}
          placeholder={'Masukan Top Brand Selling'}
          keyboardType={'default'}
          marginBottom={16}
        />
        <InputType4
          title={'Wanted Brand'}
          value={this.state.mostWantedBrand}
          onChangeText={mostWantedBrand => this.setState({ mostWantedBrand })}
          placeholder={'Masukan Wanted Brand'}
          keyboardType={'default'}
          marginBottom={16}
        />
        <DropdownType1
          title={'Akses Jalan'}
          placeholder={'Pilih Akses Jalan'}
          selectedDropdownText={
            this.props.merchant.dataMerchantVolatile.vehicleAccessibilityName
          }
          openDropdown={() =>
            this.goToDropdown({
              type: 'vehicleMerchant',
              placeholder: 'Cari Kendaraan'
            })
          }
        />
        <InputType4
          title={'Jumlah Akses Jalan'}
          value={this.state.vehicleAccessibilityAmount}
          onChangeText={vehicleAccessibilityAmount => {
            const cleanNumber = vehicleAccessibilityAmount.replace(
              /[^0-9]/g,
              ''
            );
            this.setState({ vehicleAccessibilityAmount: cleanNumber });
          }}
          placeholder={'Masukan Jumlah Akses Jalan'}
          keyboardType={'numeric'}
          marginBottom={16}
        />
        <InputType4
          title={'Ukuran Toko'}
          value={this.state.largeArea}
          onChangeText={largeArea => {
            const cleanNumber = largeArea.replace(/[^0-9]/g, '');
            this.setState({ largeArea: cleanNumber });
          }}
          placeholder={'Masukan Ukuran Toko'}
          keyboardType={'numeric'}
          suffix
          suffixContent={
            <View>
              <Text style={Fonts.type24}>m²</Text>
            </View>
          }
          marginBottom={16}
        />
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return this.props.global.imageBase64 !== '' || this.state.showButton ? (
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
  /** === RENDER BUTTON FOR OPEN CAMERA === */
  renderButtonOpenCamera() {
    return this.state.showButtonOpenCamera &&
      this.props.global.imageBase64 === '' ? (
      <ButtonSingle
        disabled={false}
        title={'Ambil Foto'}
        borderRadius={4}
        onPress={() => this.openCamera()}
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
        {this.renderButtonOpenCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    backgroundColor: Color.backgroundWhite,
    marginBottom: 16,
    paddingVertical: 6
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ merchant, global }) => {
  return { merchant, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantEditPartialView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
