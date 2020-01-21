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
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import ComingSoon from '../../../components/empty_state/ComingSoon';

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
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT SECTION === */
  renderContentSection(key, value, action) {
    return (
      <View style={styles.boxContent}>
        <View>
          <Text style={[Fonts.type9, { marginBottom: 6 }]}>{key}</Text>
          <Text style={Fonts.type24}>{value ? value : '-'}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {action === 'tambah' ? (
            <TouchableOpacity>
              <Text style={Fonts.type22}>Tambah</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {action === 'ubah' ? (
            <TouchableOpacity>
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
        {this.renderContentSection(
          'Nomor Handphone',
          this.props.merchant.dataGetMerchantDetail.userStores[0].user
            .mobilePhoneNo
        )}
        {this.renderContentSection(
          'Nomor Kartu Tanda Penduduk (KTP)',
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.idNo,
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.idNo
            ? 'ubah'
            : 'tambah'
        )}
        {this.renderContentSection(
          'Nomor Pokok Wajib Pajak (NPWP)',
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.taxNo,
          this.props.merchant.dataGetMerchantDetail.userStores[0].user.taxNo
            ? 'ubah'
            : 'tambah'
        )}
        {this.renderContentSection(
          'Foto KTP',
          this.props.merchant.dataGetMerchantDetail.userStores[0].user
            .idImageUrl,
          this.props.merchant.dataGetMerchantDetail.userStores[0].user
            .idImageUrl
            ? 'ubah'
            : 'tambah'
        )}
        {this.renderContentSection(
          'Foto Selfie + KTP',
          this.props.merchant.dataGetMerchantDetail.userStores[0].user
            .selfieImageUrl,
          this.props.merchant.dataGetMerchantDetail.userStores[0].user
            .selfieImageUrl
            ? 'ubah'
            : 'tambah'
        )}
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
