import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';

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
  /** === CHECK REJECTION === */
  checkRejectionStatus(field) {
    if (this.props.merchant.dataMerchantRejectedV2[field]) {
      return true;
    }
    return false;
  }
  /** === CHECK REJECTION VALUE === */
  checkRejectionValue(data) {
    if (data.value) {
      if (data.failed) {
        return 'Gagal Verifikasi';
      }
      return data.value;
    }
    return '-';
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
          {this.renderLabel(data)}
          <Text style={data.fontType}>{this.checkRejectionValue(data)}</Text>
        </View>
      </View>
    );
  }
  renderLabel(data){
    if(data.verified){
        return (
          <View style={{flexDirection: 'row', marginBottom: 6}}>
            <Text style={Fonts.type9}>{data.key}</Text>
            <View style={styles.emailBadge}>
              <MaterialCommunityIcons 
                name="check" 
                color={Color.fontWhite}
                size={9} 
                style={{marginHorizontal: 4}} />
              <Text 
                style={[Fonts.type9, {fontSize: 9, color: Color.fontWhite}]}>
                  Terverifikasi
              </Text>
            </View>
          </View>
        )
      } else {
        return <Text style={[Fonts.type9, { marginBottom: 6 }]}>{data.key}</Text>
      }
  }
  /** === RENDER CONTENT === */
  renderContent() {
    const {dataMerchantVolatile} = this.props.merchant
    return (
      <View>
        {this.renderContentSection({
          key: 'Nama Lengkap Pemilik',
          failed: this.checkRejectionStatus('fullName'),
          fontType: this.checkRejectionStatus('fullName') ? Fonts.type84 : Fonts.type24,
          value: dataMerchantVolatile.fullName
        })}
        {this.renderContentSection({
          key: 'Nomor Handphone',
          fontType: Fonts.type24,
          value: dataMerchantVolatile.phone,
          verified: dataMerchantVolatile.isMobilePhoneNoVerified,
        })}
        {this.renderContentSection({
          key: 'Email',
          fontType: Fonts.type24,
          value: dataMerchantVolatile.email,
          verified: dataMerchantVolatile.isEmailVerified,
        })}
        {this.renderContentSection({
          key: 'Nomor Rekening Bank',
          fontType: Fonts.type24,
          value: dataMerchantVolatile?.bank?.accountNo,
          verified: dataMerchantVolatile?.bank?.isVerified,
        })}
        {this.renderContentSection({
          key: 'Nomor Kartu Tanda Penduduk (KTP)',
          failed: this.checkRejectionStatus('idNo'),
          fontType: this.checkRejectionStatus('idNo') ? Fonts.type84 : Fonts.type24,
          value: dataMerchantVolatile.idNo
        })}
        {this.renderContentSection({
          key: 'Nomor Pokok Wajib Pajak (NPWP)',
          failed: this.checkRejectionStatus('taxNo'),
          fontType: this.checkRejectionStatus('taxNo') ? Fonts.type84 : Fonts.type24,
          value: dataMerchantVolatile.taxNo
        })}
        {this.renderContentSection({
          key: 'Foto Nomor Pokok Wajib Pajak (NPWP)',
          failed: this.checkRejectionStatus('taxImageUrl'),
          fontType: this.checkRejectionStatus('taxImageUrl') ? Fonts.type84 : Fonts.type98
        })}
        {this.renderContentSection({
          key: 'Foto KTP',
          failed: this.checkRejectionStatus('idImageUrl'),
          fontType: this.checkRejectionStatus('idImageUrl') ? Fonts.type84 : Fonts.type98,
          value: dataMerchantVolatile.idImageUrl ? 'Sudah diupload' : '-'
        })}
        {this.renderContentSection({
          key: 'Foto Selfie + KTP',
          failed: this.checkRejectionStatus('selfieImageUrl'),
          fontType: this.checkRejectionStatus('selfieImageUrl') ? Fonts.type84 : Fonts.type98,
          value: dataMerchantVolatile.selfieImageUrl ? 'Sudah diupload' : '-'
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
    backgroundColor: Color.backgroundWhite
  },
  boxContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  emailBadge:{
    marginHorizontal: 8, 
    backgroundColor: Color.fontGreen50, 
    borderRadius: 8, 
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
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