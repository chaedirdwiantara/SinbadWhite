import * as types from '../types';

/**
 * ==============================
 * GET MERCHANT BY PORTFOLIO
 * ==============================
 */
/** === MERCHANT GET PROCESS ==== */
export function merchantGetProcess(data) {
  return { type: types.MERCHANT_GET_PROCESS, payload: data };
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
/** === REFRESH GET MERCHANT === */
export function merchantGetRefresh() {
  return { type: types.MERCHANT_GET_REFRESH };
}
/** === RESET GET MERCHANT === */
export function merchantGetReset() {
  return { type: types.MERCHANT_GET_RESET };
}
/** === LOAD MORE GET MERCHANT === */
export function merchantGetLoadMore(page) {
  return { type: types.MERCHANT_GET_LOADMORE, payload: page };
}
/**
 * ====================================
 * GET MERCHANT DETAIL
 * ====================================
 */
/** === MERCHANT GET DETAIL PROCESS === */
export function merchantGetDetailProcess(data) {
  return { type: types.MERCHANT_GET_DETAIL_PROCESS, payload: data };
}
/** === MERCHANT GET DETAIL SUCCESS === */
export function merchantGetDetailSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_DETAIL_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_GET_DETAIL_FAILED, payload: data };
}
/** === MERCHANT GET DETAIL FAILED === */
export function merchantGetDetailFailed(data) {
  return { type: types.MERCHANT_GET_DETAIL_FAILED, payload: data };
}
/**
 * ====================================
 * GET PORTFOLIO BY USERID
 * ====================================
 */
/** PORTFOLIO GET PROCESS */
export function portfolioGetProcess(userId) {
  return { type: types.PORTFOLIO_GET_PROCESS, payload: userId };
}
/** PORTFOLIO GET SUCCESS */
export function portfolioGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PORTFOLIO_GET_SUCCESS, payload: data.data };
  }
  return { type: types.PORTFOLIO_GET_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function portfolioGetFailed(data) {
  return { type: types.PORTFOLIO_GET_FAILED, payload: data };
}
