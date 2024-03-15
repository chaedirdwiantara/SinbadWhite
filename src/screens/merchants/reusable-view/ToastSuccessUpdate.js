import { React, Component, View } from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { ToastType1 } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';

class ToastSuccessUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }
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
        this.setState({
          showToast: true
        });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      }
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === TOAST === */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={'Berhasil Update Data'} />
    ) : (
      <View />
    );
  }
  /** === MAIN === */
  render() {
    return <View>{this.renderToast()}</View>;
  }
}

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastSuccessUpdate);
