import * as types from '../types';
/**
 * ==================================
 * SELECTED MERCHANT FROM JOURNEY
 * ==================================
 */
export function merchantSelected(data) {
  return { type: types.MERCHANT_SELECTED, payload: data };
}
/**
 * ==================================
 * SAVE VOLATILE DATA TO ADD MERCHANT
 * =================================
 */
export function saveVolatileDataAddMerchant(data) {
  return { type: types.MERCHANT_ADD_DATA_VOLATILE, payload: data };
}
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
/**
 * ==================================
 * ADD MERCHANT
 * ==================================
 */
/** PORTFOLIO GET PROCESS */
export function merchantAddProcess(data) {
  return { type: types.MERCHANT_ADD_PROCESS, payload: data };
}
/** PORTFOLIO GET SUCCESS */
export function merchantAddSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_ADD_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_ADD_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function merchantAddFailed(data) {
  return { type: types.MERCHANT_ADD_FAILED, payload: data };
}

/**
 * ====================================
 * GET LAST ORDER BY STORE ID
 * ====================================
 */
/** PORTFOLIO GET PROCESS */
export function merchantGetLastOrderProcess(storeId) {
  return { type: types.MERCHANT_GET_LAST_ORDER_PROCESS, payload: storeId };
}
/** PORTFOLIO GET SUCCESS */
export function merchantGetLastOrderSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_LAST_ORDER_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_GET_LAST_ORDER_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function merchantGetLastOrderFailed(data) {
  return { type: types.MERCHANT_GET_LAST_ORDER_FAILED, payload: data };
}

/**
 * ==================================
 * CHECK IN MERCHANT
 * ==================================
 */
/** MERCHANT CHECKIN PROCESS */
export function merchantCheckinProcess(data) {
  return { type: types.MERCHANT_CHECKIN_PROCESS, payload: data };
}
/** MERCHANT CHECKIN SUCCESS */
export function merchantCheckinSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_CHECKIN_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_CHECKIN_FAILED, payload: data };
}
/** MERCHANT CHECKIN FAILED */
export function merchantCheckinFailed(data) {
  return { type: types.MERCHANT_CHECKIN_FAILED, payload: data };
}

/**
 * ==================================
 * CHECK OUT MERCHANT
 * ==================================
 */
/** MERCHANT CHECKOUT PROCESS */
export function merchantCheckoutProcess(data) {
  return { type: types.MERCHANT_CHECKOUT_PROCESS, payload: data };
}
/** MERCHANT CHECKOUT SUCCESS */
export function merchantCheckoutSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_CHECKOUT_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_CHECKOUT_FAILED, payload: data };
}
/** MERCHANT CHECKOUT FAILED */
export function merchantCheckoutFailed(data) {
  return { type: types.MERCHANT_CHECKOUT_FAILED, payload: data };
}

/**
 * ==================================
 * GET LOG MERCHANT
 * ==================================
 */
/** MERCHANT GET LOG PROCESS */
export function merchantGetLogProcess(data) {
  return { type: types.MERCHANT_GET_LOG_PROCESS, payload: data };
}
/** MERCHANT GET LOG SUCCESS */
export function merchantGetLogSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_LOG_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_GET_LOG_FAILED, payload: data };
}
/** MERCHANT GET LOG FAILED */
export function merchantGetLogFailed(data) {
  return { type: types.MERCHANT_GET_LOG_FAILED, payload: data };
}
