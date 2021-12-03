import * as types from '../types';
/**
 * ==============================
 * SIGNOUT
 * ==============================
 */
/** === DELETE ALL DATA ==== */
export function signOut() {
  return { type: types.DELETE_USER_DATA };
}
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
    return { type: types.OTP_GET_SUCCESS, payload: data?.data?.otp };
  }
  return { type: types.OTP_GET_FAILED, payload: data };
}
/** === OTP FAILED === */
export function otpGetFailed(data) {
  return { type: types.OTP_GET_FAILED, payload: data };
}
/**
 * ==============================
 * CHECK AVAILABLE PHONE NUMBER
 * ==============================
 */
/** === CHECK PHONE NUMBER PROCESS ==== */
export function checkPhoneNumberAvailableProcess(phoneNumber) {
  return {
    type: types.CHECK_PHONE_NUMBER_AVAILABLE_PROCESS,
    payload: phoneNumber
  };
}
/** === CHECK PHONE NUMBER SUCCESS === */
export function checkPhoneNumberAvailableSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.CHECK_PHONE_NUMBER_AVAILABLE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.CHECK_PHONE_NUMBER_AVAILABLE_FAILED, payload: data };
}
/** === CHECK PHONE NUMBER FAILED === */
export function checkPhoneNumberAvailableFailed(data) {
  return { type: types.CHECK_PHONE_NUMBER_AVAILABLE_FAILED, payload: data };
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
