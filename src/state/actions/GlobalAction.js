import * as types from '../types';
/**
 * ==============================
 * SEARCH TEXT GLOBAL
 * ==============================
 */
/** === SAVE GLOBAL SEARCH ==== */
export function saveSearch(text) {
  return { type: types.SEARCH_TEXT, payload: text };
}
/** === SAVE LOCATION VOLATILE DATA === */
export function saveLocationDataVolatile(data) {
  return { type: types.LOCATION_SAVE_DATA_VOLATILE, payload: data };
}
/**
 * ============================
 * GET LOCATION
 * ============================
 */
/** === LOCATION GET PROCESS ==== */
export function locationGetProcess(data) {
  return { type: types.LOCATION_GET_PROCESS, payload: data };
}
/** === LOCATION GET SUCCESS === */
export function locationGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.LOCATION_GET_SUCCESS, payload: data.data };
  }
  return { type: types.LOCATION_GET_FAILED, payload: data };
}
/** === LOCATION GET FAILED === */
export function locationGetFailed(data) {
  return { type: types.LOCATION_GET_FAILED, payload: data };
}
/** === REFRESH GET LOCATION === */
export function locationGetRefresh() {
  return { type: types.LOCATION_GET_REFRESH };
}
/** === RESET GET LOCATION === */
export function locationGetReset() {
  return { type: types.LOCATION_GET_RESET };
}
/** === LOAD MORE GET LOCATION === */
export function locationGetLoadMore(page) {
  return { type: types.LOCATION_GET_LOADMORE, payload: page };
}
