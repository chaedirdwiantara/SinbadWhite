import * as types from '../types';
/**
 * ==============================
 * DELETE NEW ORDER PER MERCHANT
 * ==============================
 */
export function historyDeleteNewOrderNotifPerMerchant(data) {
  return {
    type: types.HISTORY_DELETE_NEW_ORDER_NOTIF_PER_MERCHANT,
    payload: data
  };
}
/**
 * ===========================
 * GET ORDER STATUS
 * ===========================
 */
/** === HISTORY GET ORDER STATUS PROCESS === */
export function historyGetOrderStatusProcess(data) {
  return { type: types.HISTORY_GET_ORDER_STATUS_PROCESS, payload: data };
}
/** === HISTORY GET ORDER STATUS SUCCESS === */
export function historyGetOrderStatusSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.HISTORY_GET_ORDER_STATUS_SUCCESS, payload: data.data };
  }
  return { type: types.HISTORY_GET_ORDER_STATUS_FAILED, payload: data };
}
/** === HISTORY GET ORDER STATUS FAILED === */
export function historyGetOrderStatusFailed(data) {
  return { type: types.HISTORY_GET_ORDER_STATUS_FAILED, payload: data };
}
/**
 * ===========================
 * GET PAYMENT STATUS
 * ===========================
 */
/** === HISTORY GET PAYMENT STATUS PROCESS === */
export function historyGetPaymentStatusProcess(data) {
  return { type: types.HISTORY_GET_PAYMENT_STATUS_PROCESS, payload: data };
}
/** === HISTORY GET PAYMENT STATUS SUCCESS === */
export function historyGetPaymentStatusSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.HISTORY_GET_PAYMENT_STATUS_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.HISTORY_GET_PAYMENT_STATUS_FAILED, payload: data };
}
/** === HISTORY GET PAYMENT STATUS FAILED === */
export function historyGetPaymentStatusFailed(data) {
  return { type: types.HISTORY_GET_PAYMENT_STATUS_FAILED, payload: data };
}
/**
 * ==============================
 * GET HISTORY LIST
 * ==============================
 */
/** === HISTORY GET PROCESS ==== */
export function historyGetProcess(data) {
  return { type: types.HISTORY_GET_PROCESS, payload: data };
}
/** === HISTORY GET SUCCESS === */
export function historyGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.HISTORY_GET_SUCCESS, payload: data.data };
  }
  return { type: types.HISTORY_GET_FAILED, payload: data };
}
/** === HISTORY GET FAILED === */
export function historyGetFailed(data) {
  return { type: types.HISTORY_GET_FAILED, payload: data };
}
/** === REFRESH GET HISTORY === */
export function historyGetRefresh() {
  return { type: types.HISTORY_GET_REFRESH };
}
/** === RESET GET HISTORY === */
export function historyGetReset() {
  return { type: types.HISTORY_GET_RESET };
}
/** === LOAD MORE GET HISTORY === */
export function historyGetLoadMore(page) {
  return { type: types.HISTORY_GET_LOADMORE, payload: page };
}
