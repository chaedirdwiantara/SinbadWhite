import React, { Component } from 'react';
import ReactMoE, { MoEAppStatus } from 'react-native-moengage';
import {
  DeviceInfo,
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import * as ActionCreators from '../../../state/actions';
import RNInstallReferrer from 'react-native-install-referrer';
import { SnbRecord } from './index';
import * as eventName from './event';

class MoengageCore extends Component {
  componentDidMount() {
    ReactMoE.initialize();
    this.checkAppVersion();
  }

  checkAppVersion() {
    if (this.props.permanent.appVersion === null) {
      ReactMoE.setAppStatus(MoEAppStatus.Install);
      this.props.saveAppVersion(DeviceInfo.getBuildNumber());
      RNInstallReferrer.getReferrer().then(referrer => {
        let installReferrer = referrer.installReferrer;
        installReferrer = installReferrer.split('&');

        let installSource = {};
        installSource.installTimestamp = referrer.installTimestamp;
        installSource.clickTimestamp = referrer.clickTimestamp;
        installReferrer.map((data, index) => {
          let split = data.split('=');
          return (installSource[split.shift()] = split.pop());
        });

        SnbRecord(eventName.INSTALL_SOURCE, installSource);
      });
    }

    if (this.props.permanent.appVersion !== null) {
      if (this.props.permanent.appVersion !== DeviceInfo.getBuildNumber()) {
        ReactMoE.setAppStatus(MoEAppStatus.Update);
        this.props.saveAppVersion(DeviceInfo.getBuildNumber());
      }
    }
  }
  render() {
    return <></>;
  }
}

const mapStateToProps = ({ permanent, global }) => {
  return { permanent, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoengageCore);
