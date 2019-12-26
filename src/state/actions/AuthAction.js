import * as types from '../types';

/**
 * ==============================
 * OTP
 * ==============================
 */
/** === OTP PROCESS ==== */
export function otpGetProcess(phoneNumber) {
  return {
    type: types.OTP_GET_PROCESS,
    payload: phoneNumber
  };
}
/** === OTP SUCCESS === */
export function otpGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OTP_GET_SUCCESS, payload: data.data.otp };
  }
  return { type: types.OTP_GET_FAILED, payload: data };
}
/** === OTP FAILED === */
export function otpGetFailed(data) {
  return {
    type: types.OTP_GET_FAILED,
    payload: data
  };
}
