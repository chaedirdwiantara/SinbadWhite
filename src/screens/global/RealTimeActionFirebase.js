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
      maintenance: false,
      versionCode: 0
    };
    this.maintenanceRef = firebase.database().ref('maintenance/sinbadWhite');
    this.checkVersion = firebase.database().ref('mobileVersion/sinbadWhite');
  }

  /**
   * =========================
   * FUNCTIONAL
   * =======================
   */
  /** => DID MOUNT == */
  componentDidMount() {
    this.fetchDataForMaintenance();
    this.fetchDataForVersion();
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
    /** FOR VERSION */
    if (prevState.versionCode !== this.state.versionCode) {
      if (this.props.permanent.appVersionCode !== this.state.versionCode) {
        this.saveDataVersionCode(this.state.versionCode);
      }
    }
  }
  // /** === save data */
  saveDataMaintenance(data) {
    this.props.appMaintenance(data);
  }
  /** => save data version code */
  saveDataVersionCode(data) {
    this.props.appVersion(data);
  }
  /** => FETCH DATA */
  fetchDataForMaintenance() {
    this.maintenanceRef.on('value', data => {
      this.setState({ maintenance: data.val() });
    });
  }
  /** => FETCH DATA FOR VERSION */
  fetchDataForVersion() {
    this.checkVersion.on('value', data => {
      this.setState({ versionCode: data.val().versionCode });
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
