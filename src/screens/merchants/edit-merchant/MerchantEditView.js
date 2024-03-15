import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage'
import { Fonts } from '../../../helpers'
import { Color } from '../../../config'
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
/** MODULE PAGE */
import MerchantDetailPaymentView from '../details-merchant/MerchantDetailPaymentView';
import MerchantEditPartialView from './MerchantEditPartialView';

class MerchantEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      headerTitle: () => (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={Fonts.type5}>{state.params.title}</Text>
        </View>
      ),
      headerRight: <View />
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataEditMerchant !==
      this.props.merchant.dataEditMerchant
    ) {
      if (this.props.merchant.dataEditMerchant !== null) {
        if (
          this.props.navigation.state.params.type === 'merchantOwnerImageId'
        ) {
          this.props.saveImageBase64('');
        }
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }
  /** THIS FOR SWITCH VIEW */
  switchView() {
    switch (this.props.navigation.state.params.type) {
      case 'merchantPayment':
        return <MerchantDetailPaymentView />;
      case 'merchantAddress':
      case 'merchantCompletenessInformation':
      case 'merchantAccountName':
      case 'merchantAccountPhoneNo':
        return (
          <MerchantEditPartialView
            type={this.props.navigation.state.params.type}
            showButton
          />
        );
      case 'merchantAccountImage':
        return (
          <MerchantEditPartialView
            type={this.props.navigation.state.params.type}
            showButton={false}
            showButtonOpenCamera
            typeCamera={'merchant'}
          />
        );
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  render() {
    return <View style={styles.mainContainer}>{this.switchView()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantEditView);

/**
 * =======================
 * NOTE
 * =======================
 * - Module Exist
 * 1. merchantPayment = Faktur
 * 2. merchantAddress = Alamat Toko
 * 3. merchantAccount = Akun Toko
 * 4. merchantPhysical = Informasi Fisik Toko
 * 5. merchantClassification = Klasifikasi Toko
 * 6. merchantOwnerIdNo = Ubah KTP / Tambah KTP
 * 7. merchantOwnerTaxNo = Ubah NPWP / Tambah NPWP
 * 8. merchantOwnerImageId = Foto KTP
 * 9. merchantOwnerImageSelfie = Foto Selfie + KTP
 */
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
