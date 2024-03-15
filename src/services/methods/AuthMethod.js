import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

function getOTP(phoneNumber) {
  return ApiRest({
    path: 'auth/check-phone-v2',
    method: 'POST',
    params: {
      mobilePhoneNo: phoneNumber
    }
  });
}

function checkPhoneNumberAvailable(phoneNumber) {
  let supplierId = GlobalMethod.userSupplierMapping();
  if (supplierId.length > 0) {
    supplierId = supplierId[0];
  }
  return ApiRest({
    path: 'auth/valid-phone',
    method: 'POST',
    params: {
      mobilePhoneNo: phoneNumber,
      supplierId
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
