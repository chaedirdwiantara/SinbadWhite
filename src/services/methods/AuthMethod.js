import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

function getOTP(phoneNumber) {
  return ApiRest({
    path: 'auth/check-phone',
    method: 'POST',
    params: {
      mobilePhoneNo: phoneNumber
    }
  });
}

function checkPhoneNumberAvailable(phoneNumber) {
  return ApiRest({
    path: 'auth/check-phone-available',
    method: 'POST',
    params: {
      mobilePhoneNo: phoneNumber,
      supplierIds: GlobalMethod.userSupplierMapping()
    }
  });
}

function signIn({ mobilePhoneNo, otpCode }) {
  return ApiRest({
    path: 'auth/validate-otp',
    method: 'POST',
    params: {
      mobilePhoneNo,
      otpCode
    }
  });
}

export const AuthMethod = {
  getOTP,
  signIn,
  checkPhoneNumberAvailable
};
