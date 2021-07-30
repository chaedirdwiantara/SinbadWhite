import {
  React,
  Component,
  View,
  Image,
  Text
} from '../../../library/reactPackage'
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage'
import {
  ModalBottomType1,
  StatusBarRedOP50
} from '../../../library/component'
import { GlobalStyle, Fonts } from '../../../helpers'
import * as ActionCreators from '../../../state/actions';

class ModalBottomSuccessOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  clearOmsData() {
    this.props.omsResetData();
    /** FOR GET LAST ORDER */
    this.props.merchantGetLastOrderProcess(
      this.props.merchant.selectedMerchant.storeId
    );
    /** FOR GET LOG ALL ACTIVITY */
    this.props.merchantGetLogAllActivityProcessV2(
      this.props.merchant.selectedMerchant.journeyBookStores.id
    );
  }

  /** MAIN */
  render() {
    return (
      <ModalBottomType1
        accessible={true}
        accessibilityLabel={'btnModalTerimakasih'}
        open={this.props.oms.dataOmsConfirmOrder !== null}
        title={''}
        buttonTitle={'Selesai'}
        onPress={() => this.clearOmsData()}
        content={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 60
            }}
          >
            <StatusBarRedOP50 />
            <Image
              source={require('../../../assets/images/sinbad_image/check_sinbad.png')}
              style={GlobalStyle.image77}
            />
            <Text style={Fonts.type55}>Terimakasih</Text>
          </View>
        }
      />
    );
  }
}

const mapStateToProps = ({ oms, merchant }) => {
  return { oms, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomSuccessOrder);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Change key
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 * updatedBy: dyah
 * updatedDate: 25022021
 * updatedFunction:
 * -> Update the props of log activity.
 */
