import { React, Component, View } from '../../library/reactPackage';
import {
  firebase,
  connect,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

class RealTimeActionFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maintenance: false
    };
    this.maintenanceRef = firebase.database().ref('maintenance/sinbadWhite');
  }

  /**
   * =========================
   * FUNCTIONAL
   * =======================
   */
  /** => DID MOUNT == */
  componentDidMount() {
    this.fetchDataForMaintenance();
  }
  /** => DID UPDATE === */
  componentDidUpdate(prevState) {
    if (prevState.maintenance !== this.state.maintenance) {
      if (this.props.permanent.appMaintenance !== this.state.maintenance) {
        if (this.state.maintenance) {
          NavigationService.navigate('MaintenanceView');
        }
        this.saveDataMaintenance(this.state.maintenance);
      }
    }
  }
  // /** === save data */
  saveDataMaintenance(data) {
    this.props.appMaintenance(data);
  }
  /** => FETCH DATA */
  fetchDataForMaintenance() {
    this.maintenanceRef.on('value', data => {
      this.setState({ maintenance: data.val() });
    });
  }

  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === MAIN === */
  render() {
    return <View />;
  }
}

const mapStateToProps = ({ permanent }) => {
  return { permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RealTimeActionFirebase);
