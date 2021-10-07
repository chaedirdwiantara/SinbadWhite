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
/**
 * ============================
 * HISTORY DETAIL
 * ==========================
 */
/** HISTORY GET DETAILS PROCESS */
export function historyGetDetailProcess(data) {
  return { type: types.HISTORY_GET_DETAIL_PROCESS, payload: data };
}
/** HISTORY GET DETAILS SUCCESS */
export function historyGetDetailSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.HISTORY_GET_DETAIL_SUCCESS, payload: data.data };
  }
  return { type: types.HISTORY_GET_DETAIL_FAILED, payload: data };
}
/** HISTORY GET DETAILS FAILED */
export function historyGetDetailFailed(data) {
  return { type: types.HISTORY_GET_DETAIL_FAILED, payload: data };
}
/**
 * ============================
 * HISTORY EDIT
 * ==========================
 */
/** HISTORY EDIT PROCESS */
export function historyEditProcess(data) {
  return { type: types.HISTORY_EDIT_PROCESS, payload: data };
}
/** HISTORY EDIT SUCCESS */
export function historyEditSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.HISTORY_EDIT_SUCCESS, payload: data.data };
  }
  return { type: types.HISTORY_EDIT_FAILED, payload: data };
}
/** HISTORY EDIT FAILED */
export function historyEditFailed(data) {
  return { type: types.HISTORY_EDIT_FAILED, payload: data };
}

/**
 * ===========================
 * AKTIFKAN VA
 * ===========================
 */
/** === AKTIFKAN VA PROCESS === */
export function historyActivateVAProcess(data) {
  return { type: types.HISTORY_ACTIVATE_VA_PROCESS, payload: data };
}

/** === ACTIVATE VA SUCCESS === */
export function historyActivateVASuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.HISTORY_ACTIVATE_VA_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.HISTORY_ACTIVATE_VA_FAILED, payload: data };
}

/** === ACTIVATE VA FAILED === */
export function historyActivateVAFailed(data) {
  return { type: types.HISTORY_ACTIVATE_VA_FAILED, payload: data };
}

/**
 * ====================================
 * CHANGE PAYMENT METHOD
 * ====================================
 */
/** === CHANGE PAYMENT METHOD PROCESS === */
export function historyChangePaymentMethodProcess(data) {
  return { type: types.HISTORY_CHANGE_PAYMENT_METHOD_PROCESS, payload: data };
}

/** === CHANGE PAYMENT METHOD SUCCESS === */
export function historyChangePaymentMethodSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.HISTORY_CHANGE_PAYMENT_METHOD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.HISTORY_CHANGE_PAYMENT_METHOD_FAILED, payload: data };
}

/** === CHANGE PAYMENT METHOD FAILED === */
export function historyChangePaymentMethodFailed(data) {
  return { type: types.HISTORY_CHANGE_PAYMENT_METHOD_FAILED, payload: data };
}

/**
 * ====================================
 * VIEW INVOICE
 * ====================================
 */
/** === VIEW INVOICE PROCESS === */
export function historyViewInvoiceProcess(data) {
  return { type: types.HISTORY_VIEW_INVOICE_PROCESS, payload: data };
}

/** === VIEW INVOICE SUCCESS === */
export function historyViewInvoiceSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.HISTORY_VIEW_INVOICE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.HISTORY_VIEW_INVOICE_FAILED, payload: data };
}

/** === VIEW INVOICE FAILED === */
export function historyViewInvoiceFailed(data) {
  return { type: types.HISTORY_VIEW_INVOICE_FAILED, payload: data };
}

/** GET RETURN STATUS */
export function getReturnStatusProcess(data) {
  return { type: types.GET_RETURN_STATUS_PROCESS, payload: data };
}

export function getReturnStatusSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.GET_RETURN_STATUS_SUCCESS, payload: data };
  }
  return { type: types.GET_RETURN_STATUS_FAILED, payload: data };
}

export function getReturnStatusFailed(data) {
  return { type: types.GET_RETURN_STATUS_FAILED, payload: data };
}

/** GET RETURN PARCELS */
export function getReturnParcelsProcess(data) {
  return { type: types.GET_RETURN_PARCELS_PROCESS, payload: data };
}

export function getReturnParcelsSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.GET_RETURN_PARCELS_SUCCESS, payload: data };
  }
  return { type: types.GET_RETURN_PARCELS_FAILED, payload: data };
}

export function getReturnParcelsFailed(data) {
  return { type: types.GET_RETURN_PARCELS_FAILED, payload: data };
}
/** === REFRESH GET HISTORY === */
export function getReturnParcelsRefresh() {
  return { type: types.GET_RETURN_PARCELS_REFRESH };
}
/** === RESET GET HISTORY === */
export function getReturnParcelsReset() {
  return { type: types.GET_RETURN_PARCELS_RESET };
}
/** === LOAD MORE GET HISTORY === */
export function getReturnParcelsLoadMore(page) {
  return { type: types.GET_RETURN_PARCELS_LOADMORE, payload: page };
}
