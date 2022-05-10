import PropTypes from 'prop-types';
import { SnbRecord, SnbSetAttribute } from '../index';
import ReactMoE from 'react-native-moengage';

export function trackUserLogin(props) {
  const { data, eventName } = props;
  ReactMoE.setAlias(data.user.id);
  ReactMoE.setUserUniqueID(data.user.id);
  ReactMoE.setUserFirstName(data.user.fullName);
  ReactMoE.setUserName(data.user.fullName);
  ReactMoE.setUserContactNumber(data.user.mobilePhoneNo);

  const neededData = {
    unique_id: data.user.id,
    sr_id: data.user.id,
    sr_mobile_number: data.user.mobilePhoneNo,
    sr_name: data.user.fullName,
    sr_salesteam_id: data.user.userSuppliers[0].salesTeamId,
    sr_supplier_id: data.user.userSuppliers[0].supplier.id,
    sr_supplier_name: data.user.userSuppliers[0].supplier.name
  };
  SnbRecord(eventName, neededData);
  SnbSetAttribute(neededData);
}

export function trackUserLogout(props) {
  const { data, eventName } = props;

  const neededData = {
    sr_phone_number: data
  };
  SnbRecord(eventName, neededData);
  ReactMoE.logout();
}

export function trackUserRegister(props) {
  const { eventName, data } = props;
  SnbRecord(eventName, data);
}

trackUserLogin.propTypes = {
  loginType: PropTypes.string,
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      fullName: PropTypes.string,
      mobilePhoneNo: PropTypes.string,
      email: PropTypes.string
    })
  })
};

trackUserLogout.propTypes = {
  data: PropTypes.shape({
    user_phone_number: PropTypes.string
  })
};
