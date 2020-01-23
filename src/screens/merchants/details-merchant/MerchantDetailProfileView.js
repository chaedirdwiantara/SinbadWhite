import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import NavigationService from '../../../navigation/NavigationService';

class MerchantDetailProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === GO TO PAGE === */
  goTo(data) {
    switch (data.type) {
      case 'merchantOwnerIdNo':
        NavigationService.navigate('MerchantEditView', {
          title: data.title,
          type: data.type
        });
        break;
      case 'merchantOwnerTaxNo':
        NavigationService.navigate('MerchantEditView', {
          title: data.title,
          type: data.type
        });
        break;
      case 'merchantOwnerImageId':
        NavigationService.navigate('MerchantEditView', {
          title: data.title,
          type: data.type
        });
        break;
      case 'merchantOwnerImageSelfie':
        NavigationService.navigate('MerchantEditView', {
          title: data.title,
          type: data.type
        });
        break;
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
            <TouchableOpacity onPress={() => this.goTo(data)}>
              <Text style={Fonts.type22}>Tambah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {data.action === 'ubah' ? (
            <TouchableOpacity onPress={() => this.goTo(data)}>
              <Text style={Fonts.type22}>Ubah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        {this.renderContentSection({
          key: 'Nomor Handphone',
          value: this.props.merchant.dataGetMerchantDetail.owner.mobilePhoneNo
        })}
        {this.renderContentSection({
          key: 'Nomor Kartu Tanda Penduduk (KTP)',
          value: this.props.merchant.dataGetMerchantDetail.owner.idNo,
          action: this.props.merchant.dataGetMerchantDetail.owner.idNo
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerIdNo',
          title: this.props.merchant.dataGetMerchantDetail.owner.idNo
            ? 'Ubah KTP'
            : 'Tambah KTP'
        })}
        {this.renderContentSection({
          key: 'Nomor Pokok Wajib Pajak (NPWP)',
          value: this.props.merchant.dataGetMerchantDetail.owner.taxNo,
          action: this.props.merchant.dataGetMerchantDetail.owner.taxNo
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerTaxNo',
          title: this.props.merchant.dataGetMerchantDetail.owner.taxNo
            ? 'Ubah NPWP'
            : 'Tambah NPWP'
        })}
        {this.renderContentSection({
          key: 'Foto KTP',
          value: this.props.merchant.dataGetMerchantDetail.owner.idImageUrl
            ? 'Sudah diupload'
            : '-',
          action: this.props.merchant.dataGetMerchantDetail.owner.idImageUrl
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerImageId',
          title: 'Foto KTP'
        })}
        {this.renderContentSection({
          key: 'Foto Selfie + KTP',
          value: this.props.merchant.dataGetMerchantDetail.owner.selfieImageUrl
            ? 'Sudah diupload'
            : '-',
          action: this.props.merchant.dataGetMerchantDetail.owner.selfieImageUrl
            ? 'ubah'
            : 'tambah',
          type: 'merchantOwnerImageSelfie',
          title: 'Foto Selfie + KTP'
        })}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
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
)(MerchantDetailProfileView);
