import { React, Component } from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import { ModalConfirmationType4 } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';

class ModalBeforeCheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** MAIN */
  render() {
    return (
      <ModalConfirmationType4
        title={'Anda Belum Menyelesaikan Kunjungan'}
        statusBarWhite
        okText={'OK, Saya mengerti'}
        open={this.props.open}
        content={'Harap Periksa kembali kunjungan anda pada toko sebelumnya.'}
        ok={this.props.ok}
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
)(ModalBeforeCheckIn);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06/05/2021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create modalBeforeCheckIn.
 */
