import ApiRest from '../apiRest';

function getOTP(phoneNumber) {
  return ApiRest({
    path: 'auth/check-phone',
    method: 'POST',
    params: {
      mobilePhoneNo: phoneNumber
    }
  });
}

export const AuthMethod = {
  getOTP
};
