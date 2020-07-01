import {
  React,
  Component,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class MerchantDetailAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  goTo(data) {
    switch (data.type) {
      case 'merchantAccountName':
      case 'merchantAccountPhoneNo':
      case 'merchantAccountImage':
        NavigationService.navigate('MerchantEditView', {
          title: data.title,
          type: data.type
        });
        break;
      default:
        break;
    }
  }
  /** === CHECK REJECTION === */
  checkRejectionStatus(field) {
    if (this.props.merchant.dataMerchantRejected[field]) {
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
          <Text style={[Fonts.type9, { marginBottom: 6 }]}>{data.key}</Text>
          <Text style={data.fontType}>{this.checkRejectionValue(data)}</Text>
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
          key: 'ID Toko',
          fontType: Fonts.type24,
          value: this.props.merchant.dataMerchantVolatile.storeCode
        })}
        {this.renderContentSection({
          key: 'Nama Toko',
          failed: this.checkRejectionStatus('name'),
          fontType: this.checkRejectionStatus('name')
            ? Fonts.type84
            : Fonts.type24,
          value: this.props.merchant.dataMerchantVolatile.name,
          action: this.props.merchant.dataMerchantVolatile.name
            ? 'ubah'
            : 'tambah',
          type: 'merchantAccountName',
          title: this.props.merchant.dataMerchantVolatile.name
            ? 'Ubah Nama Toko'
            : 'Tambah Nama Toko'
        })}
        {this.renderContentSection({
          key: 'Nomor Handphone Toko',
          failed: this.checkRejectionStatus('phoneNo'),
          fontType: this.checkRejectionStatus('phoneNo')
            ? Fonts.type84
            : Fonts.type24,
          value: this.props.merchant.dataMerchantVolatile.phoneNo,
          action: this.props.merchant.dataMerchantVolatile.phoneNo
            ? 'ubah'
            : 'tambah',
          type: 'merchantAccountPhoneNo',
          title: this.props.merchant.dataMerchantVolatile.phoneNo
            ? 'Ubah No. Handphone Toko'
            : 'Tambah No. Handphone Toko'
        })}
        {this.renderContentSection({
          key: 'Foto Toko',
          failed: this.checkRejectionStatus('imageUrl'),
          fontType: this.checkRejectionStatus('imageUrl')
            ? Fonts.type84
            : Fonts.type98,
          value: this.props.merchant.dataMerchantVolatile.imageUrl
            ? 'Sudah diupload'
            : '-',
          action: this.props.merchant.dataMerchantVolatile.imageUrl
            ? 'ubah'
            : 'tambah',
          type: 'merchantAccountImage',
          title: 'Foto Toko'
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
)(MerchantDetailAccountView);
