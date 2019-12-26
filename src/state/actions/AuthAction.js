import * as types from '../types';

/**
 * ==============================
 * GET OTP
 * ==============================
 */
/** === OTP PROCESS ==== */
export function otpGetProcess(phoneNumber) {
  return { type: types.OTP_GET_PROCESS, payload: phoneNumber };
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
  return { type: types.OTP_GET_FAILED, payload: data };
}
/**
 * =================================
 * SIGNIN PROCESS
 * =================================
 */
/** === SINGIN PROCESS === */
export function signInProcess(data) {
  return { type: types.SIGN_IN_PROCESS, payload: data };
}
/** === SIGNIN SUCCESS === */
export function signInSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.SIGN_IN_SUCCESS, payload: data.data };
  }
  return { type: types.SIGN_IN_FAILED, payload: data };
}
/** === SIGNIN FAILED === */
export function signInFailed(data) {
  return { type: types.SIGN_IN_FAILED, payload: data };
}
