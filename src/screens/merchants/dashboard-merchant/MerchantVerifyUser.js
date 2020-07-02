import { React, Component, View } from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage'
import ModalUserRejected from './ModalUserRejected';
import CallCS from '../../global/CallCS';
import NavigationService from '../../../navigation/NavigationService';
import * as ActionCreators from '../../../state/actions';

class MerchantVerifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRejected: false,
      modalRejectedType: '',
      modalCallCS: false
    };
  }
  componentDidMount() {
    this.props.merchantGetStoreStatusProcess()
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.merchant.dataStoreStatus !== this.props.merchant.dataStoreStatus ){
      if (this.props.merchant.dataStoreStatus !== null && this.props.pageFocus){
        this.checkUser()
      }
    }
  }

  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'goToMerchantProfile':

        this.toParentFunction('Close')
        this.setState({ modalRejected: false });
        NavigationService.navigate('MerchantDetailView', {
          storeId: this.props.merchant.selectedMerchant.store.id
        });
        break;
      case 'goToCallCS':
        this.setState({
          modalRejected: false,
          modalCallCS: true
        });
        break;
      case 'close':
        this.toParentFunction({ type: 'close'})
        this.setState({ modalCallCS: false });
        break;
      default:
        break;
    }
  }

  /** SEND TO PARENT */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }
  /** CHECK USER */
  checkUser() {
    const { 
      sinbadStoreStatus, 
      supplierStoreStatus 
    } = this.props.merchant.dataStoreStatus
    switch (sinbadStoreStatus) {
      case 'verified':
        this.userVerified(supplierStoreStatus);
        break;
      case 'rejected':
        this.userRejected(supplierStoreStatus);
        break;
      case 'updating':
        this.userUpdating(supplierStoreStatus);
        break;
      case 'pending':
        this.userPending(supplierStoreStatus);
        break;
      case 'guest':
        this.userGuest(supplierStoreStatus);
        break;

      default:
        break;
    }
  }
  /** CHECK USER MATRIX */
  userVerified(supplierStatus) {
    if (supplierStatus === 'rejected') {
      this.showModalSupplier();
    } else {
      this.toParentFunction({ type: 'pdp' });
    }
  }
  userRejected(supplierStatus) {
    if (supplierStatus === 'rejected') {
      this.showModalSupplier();
    } else {
      this.showModalSinbad();
    }
  }
  userUpdating(supplierStatus) {
    if (supplierStatus === 'rejected') {
      this.showModalSupplier();
    } else {
      this.toParentFunction({ type: 'pdp' });
    }
  }
  userPending(supplierStatus) {
    if (supplierStatus === 'rejected') {
      this.showModalSupplier();
    } else {
      this.toParentFunction({ type: 'pdp' });
    }
  }
  userGuest(supplierStatus) {
    if (supplierStatus === 'rejected') {
      this.showModalSupplier();
    } else {
      this.toParentFunction({ type: 'pdp' });
    }
  }
  /** CHANGE MODAL TYPE */
  showModalSupplier() {
    this.setState({ modalRejected: true, modalRejectedType: 'supplier' });
  }
  showModalSinbad() {
    this.setState({ modalRejected: true, modalRejectedType: 'sinbad' });
  }
  /** CHANGE STATUS MODAL AT PARENT */
  toChangeParentModal(){
    this.toParentFunction({ type: 'close' })
  }
  /** RENDER MODAL REJECTED */
  renderModalRejected() {
    return (
      <ModalUserRejected
        open={this.state.modalRejected}
        close={() => {
          this.toChangeParentModal()
          this.setState({ modalRejected: false })
        }}
        ModalType={this.state.modalRejectedType}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    );
  }
  /** RENDER MODAL CALL CS */
  renderModalCallCS() {
    return (
      <CallCS
        open={this.state.modalCallCS}
        close={() => {
          this.toChangeParentModal()
          this.setState({ modalCallCS: false })
          }}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    );
  }
  /** MAIN RENDER */
  render() {
    return (
      <View>
        {this.renderModalRejected()}
        {this.renderModalCallCS()}
      </View>
    );
  }
}

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantVerifyUser)

/**
* ============================
* NOTES
* ============================
* createdBy: Tatas
* createdDate: 30062020
* updatedBy: Tatas
* updatedDate: 02072020
* updatedFunction:
* -> Create action to merchant method to get store status
* -> Create function to change parent modal status
*/
