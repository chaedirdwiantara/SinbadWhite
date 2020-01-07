import * as types from '../types';

/**
 * ==============================
 * GET PDP BY SUPPLIER ID
 * ==============================
 */
/** === PDP GET PROCESS ==== */
export function pdpGetProcess(data) {
  return { type: types.PDP_GET_PROCESS, payload: data };
}
/** === PDP GET SUCCESS === */
export function pdpGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PDP_GET_SUCCESS, payload: data.data };
  }
  return { type: types.PDP_GET_FAILED, payload: data };
}
/** === PDP GET FAILED === */
export function pdpGetFailed(data) {
  return { type: types.PDP_GET_FAILED, payload: data };
}
/** === REFRESH GET PDP === */
export function pdpGetRefresh() {
  return { type: types.PDP_GET_REFRESH };
}
/** === RESET GET PDP === */
export function pdpGetReset() {
  return { type: types.PDP_GET_RESET };
}
/** === LOAD MORE GET PDP === */
export function pdpGetLoadMore(page) {
  return { type: types.PDP_GET_LOADMORE, payload: page };
}
