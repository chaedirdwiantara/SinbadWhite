import { React, Component, View } from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage'
import * as ActionCreators from '../../../state/actions';
import ModalUserRejected from './ModalUserRejected';
import CallCS from '../../global/CallCS';
import NavigationService from '../../../navigation/NavigationService';

class MerchantVerifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      modalRejected: false,
      modalRejectedType: '',
      modalCallCS: false
    };
  }
  componentDidMount() {
    this.checkUser();
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'goToMerchantProfile':
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
    const { sinbad, supplier } = this.state.data;
    switch (sinbad) {
      case 'verified':
        this.userVerified(supplier);
        break;
      case 'rejected':
        this.userRejected(supplier);
        break;
      case 'updating':
        this.userUpdating(supplier);
        break;
      case 'pending':
        this.userPending(supplier);
        break;
      case 'guest':
        this.userGuest(supplier);
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
  /** RENDER MODAL REJECTED */
  renderModalRejected() {
    return (
      <ModalUserRejected
        open={this.state.modalRejected}
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
        close={() => this.setState({ modalCallCS: false })}
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

export default connect(mapStateToProps)(MerchantVerifyUser)