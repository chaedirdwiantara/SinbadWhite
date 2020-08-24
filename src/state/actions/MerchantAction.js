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
export function saveVolatileDataMerchant(data) {
  return { type: types.MERCHANT_SAVE_DATA_VOLATILE, payload: data };
}
/**
 * ==================================
 * SAVE VOLATILE DATA TO EDIT MERCHANT
 * =================================
 */
export function saveVolatileDataEditMerchant(data) {
  return { type: types.MERCHANT_EDIT_DATA_VOLATILE, payload: data };
}
/**
 * ====================================
 * SAVE VOLATILE DATA TO RESET MERCHANT
 * ====================================
 */
export function volatileResetMerchant(){
  return { type: types.MERCHANT_RESET_DATA_VOLATILE }
}
/**
 * ====================================
 * FLAG CHANGE MERCHANT FOR ORDER CHECK
 * ====================================
 */
export function merchantChanged(data) {
  return { type: types.MERCHANT_CHANGED, payload: data };
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
    /** this for add default portfolio */
    const dataResult = data.data;
    const addingData = {
      id: '',
      name: 'Toko Baru'
    };
    dataResult.unshift(addingData);
    return { type: types.PORTFOLIO_GET_SUCCESS, payload: dataResult };
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
export function merchantEditProcess(data) {
  return { type: types.MERCHANT_EDIT_PROCESS, payload: data };
}
/** PORTFOLIO GET SUCCESS */
export function merchantEditSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_EDIT_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_EDIT_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function merchantEditFailed(data) {
  return { type: types.MERCHANT_EDIT_FAILED, payload: data };
}

/**
 * ====================================
 * GET LAST ORDER BY STORE ID
 * ====================================
 */
/** LAST ORDER GET PROCESS */
export function merchantGetLastOrderProcess(storeId) {
  return { type: types.MERCHANT_GET_LAST_ORDER_PROCESS, payload: storeId };
}
/** LAST ORDER GET SUCCESS */
export function merchantGetLastOrderSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_LAST_ORDER_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_GET_LAST_ORDER_FAILED, payload: data };
}
/** LAST ORDER GET FAILED */
export function merchantGetLastOrderFailed(data) {
  return { type: types.MERCHANT_GET_LAST_ORDER_FAILED, payload: data };
}
/**
 * ==================================
 * POST ACTIVITY
 * ==================================
 */
/** POST ACTIVITY PROCESS */
export function merchantPostActivityProcess(data) {
  return { type: types.MERCHANT_POST_ACTIVITY_PROCESS, payload: data };
}
/** POST ACTIVITY SUCCESS */
export function merchantPostActivitySuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_POST_ACTIVITY_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_POST_ACTIVITY_FAILED, payload: data };
}
/** POST ACTIVITY FAILED */
export function merchantPostActivityFailed(data) {
  return { type: types.MERCHANT_POST_ACTIVITY_FAILED, payload: data };
}
/**
 * ==================================
 * GET LOG ALL ACTIVITY MERCHANT
 * ==================================
 */
/** GET LOG ALL ACTIVITY MERCHANT PROCESS */
export function merchantGetLogAllActivityProcess(data) {
  return { type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS, payload: data };
}
/** GET LOG ALL ACTIVITY MERCHANT SUCCESS */
export function merchantGetLogAllActivitySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED, payload: data };
}
/** GET LOG ALL ACTIVITY MERCHANT FAILED */
export function merchantGetLogAllActivityFailed(data) {
  return { type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED, payload: data };
}
/**
 * ==================================
 * GET LOG PER ACTIVITY MERCHANT
 * ==================================
 */
/** GET LOG PER ACTIVITY MERCHANT PROCESS */
export function merchantGetLogPerActivityProcess(data) {
  return { type: types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS, payload: data };
}
/** GET LOG PER ACTIVITY MERCHANT SUCCESS */
export function merchantGetLogPerActivitySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_LOG_PER_ACTIVITY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED, payload: data };
}
/** GET LOG PER ACTIVITY MERCHANT FAILED */
export function merchantGetLogPerActivityFailed(data) {
  return { type: types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED, payload: data };
}

/**
 * ==================================
 * EDIT MERCHANT
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
 * GET MERCHANT DETAIL
 * ====================================
 */
/** === MERCHANT GET DETAIL PROCESS === */
export function merchantGetNoOrderReasonProcess(data) {
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_PROCESS, payload: data };
}
/** === MERCHANT GET DETAIL SUCCESS === */
export function merchantGetNoOrderReasonSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_NO_ORDER_REASON_GET_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_FAILED, payload: data };
}
/** === MERCHANT GET DETAIL FAILED === */
export function merchantGetNoOrderReasonFailed(data) {
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_FAILED, payload: data };
}
/**
 * =====================================
 * GET STORE STATUS
 * =====================================
 */
export function merchantGetStoreStatusProcess(data){
  return { type: types.MERCHANT_STORE_STATUS_PROCESS, payload: data}
}
export function merchantGetStoreStatusSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_STORE_STATUS_SUCCESS,
      payload: data
    }
  }
  return { type: types.MERCHANT_STORE_STATUS_FAILED, payload: data }
}
export function merchantGetStoreStatusFailed(data){
  return { type: types.MERCHANT_STORE_STATUS_FAILED, payload: data }
}
/**
 * ===========================================
 * GET WAREHOSUE
 * ===========================================
 */
export function merchantGetWarehouseProcess(data){
  return { type: types.MERCHANT_GET_WAREHOUSE_PROCESS, payload: data}
}
export function merchantGetWarehouseSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_GET_WAREHOUSE_SUCCESS,
      payload: data
    }
  }
  return { type: types.MERCHANT_GET_WAREHOUSE_FAILED, payload: data}
}
export function merchantGetWarehouseFailed(data){
  return { type: types.MERCHANT_GET_WAREHOUSE_FAILED, payload: data}
}