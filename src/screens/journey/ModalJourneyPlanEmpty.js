import { React, Component } from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { ModalConfirmationType4 } from '../../library/component';
import * as ActionCreators from '../../state/actions';

class ModalJourneyPlanEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** MAIN */
  render() {
    return (
      <ModalConfirmationType4
        title={'Belum Ada Toko'}
        statusBarWhite
        okText={'Tambahkan Toko'}
        open={this.props.open}
        content={
          'Belum ada toko terdaftar di Journey Plan saat ini. Tambahkan Toko sekarang?'
        }
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
)(ModalJourneyPlanEmpty);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 28072021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create ModalJourneyPlanEmpty.
 */
