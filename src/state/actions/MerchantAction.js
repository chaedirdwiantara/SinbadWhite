import * as types from '../types';

/**
 * ==============================
 * GET MERCHANT BY PORTFOLIO
 * ==============================
 */
/** === MERCHANT GET PROCESS ==== */
export function merchantGetProcess() {
  return { type: types.MERCHANT_GET_PROCESS };
}
/** === MERCHANT GET SUCCESS === */
export function merchantGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_GET_FAILED, payload: data };
}
/** === MERCHANT GET FAILED === */
export function merchantGetFailed(data) {
  return { type: types.MERCHANT_GET_FAILED, payload: data };
}
