import {
  React,
  Component,
  View,
  StyleSheet
} from '../../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage'
import {
  ButtonMenuType1,
} from '../../../library/component'
import { Color } from '../../../config'
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import ToastSuccessUpdate from '../reusable-view/ToastSuccessUpdate';

class MerchantDetailInformationView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  goTo(page) {
    switch (page) {
      case 'merchantAccount':
        NavigationService.navigate('MerchantDetailAccountView');
        break;
      case 'merchantCompletenessInformation':
        NavigationService.navigate('MerchantEditView', {
          title: 'Kelengkapan Informasi Toko',
          type: 'merchantCompletenessInformation'
        });
        break;
      case 'merchantClassification':
        NavigationService.navigate('MerchantDetailClassificationView')
        break;
      default:
        break;
    }
  }
  /** === CHECK REJECTION === */
  checkRejection(field) {
    const data = this.props.merchant.dataMerchantRejectedV2;
    switch (field) {
      case 'detailMerchantAccount':
        return data.name || data.imageUrl || data.phoneNo;
      default:
        break;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        <ButtonMenuType1
          notification={this.checkRejection('detailMerchantAccount')}
          title={'Akun Toko'}
          onPress={() => this.goTo('merchantAccount')}
        />
        <ButtonMenuType1
          title={'Kelengkapan Informasi Toko'}
          onPress={() => this.goTo('merchantCompletenessInformation')}
        />
        <ButtonMenuType1
          title={'Klasifikasi Toko'}
          onPress={() => this.goTo('merchantClassification')}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ToastSuccessUpdate />
        {this.renderContent()}
      </View>
    );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailInformationView);

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
