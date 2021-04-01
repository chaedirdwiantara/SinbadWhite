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
 * ==============================
 * GET MERCHANT LIST BY PORTFOLIO EXCLUDE STORE ON JOURNEY PLAN
 * ==============================
 */
/** === MERCHANT GET PROCESS ==== */
export function merchantExistingGetProcess(data) {
  return { type: types.MERCHANT_EXISTING_GET_PROCESS, payload: data };
}
/** === MERCHANT GET SUCCESS === */
export function merchantExistingGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_EXISTING_GET_SUCCESS, payload: data.data };
  }
  return { type: types.MERCHANT_EXISTING_GET_FAILED, payload: data };
}
/** === MERCHANT GET FAILED === */
export function merchantExistingGetFailed(data) {
  return { type: types.MERCHANT_EXISTING_GET_FAILED, payload: data };
}
/** === REFRESH GET MERCHANT === */
export function merchantExistingGetRefresh() {
  return { type: types.MERCHANT_EXISTING_GET_REFRESH };
}
/** === RESET GET MERCHANT === */
export function merchantExistingGetReset() {
  return { type: types.MERCHANT_EXISTING_GET_RESET };
}
/** === LOAD MORE GET MERCHANT === */
export function merchantExistingGetLoadMore(page) {
  return { type: types.MERCHANT_EXISTING_GET_LOADMORE, payload: page };
}
/**
 * ==============================
 * GET MERCHANT LIST BY PORTFOLIO V2
 * ==============================
 */
/** === MERCHANT GET PROCESS ==== */
export function merchantGetProcessV2(data) {
  return { type: types.MERCHANT_GET_PROCESS_V2, payload: data };
}
/** === MERCHANT GET SUCCESS === */
export function merchantGetSuccessV2(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_SUCCESS_V2, payload: data.data };
  }
  return { type: types.MERCHANT_GET_FAILED_V2, payload: data };
}
/** === MERCHANT GET FAILED === */
export function merchantGetFailedV2(data) {
  return { type: types.MERCHANT_GET_FAILED_V2, payload: data };
}
/** === REFRESH GET MERCHANT === */
export function merchantGetRefreshV2() {
  return { type: types.MERCHANT_GET_REFRESH_V2 };
}
/** === RESET GET MERCHANT === */
export function merchantGetResetV2() {
  return { type: types.MERCHANT_GET_RESET_V2 };
}
/** === LOAD MORE GET MERCHANT === */
export function merchantGetLoadMoreV2(page) {
  return { type: types.MERCHANT_GET_LOADMORE_V2, payload: page };
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
 * GET MERCHANT DETAIL V2
 * ====================================
 */
/** === MERCHANT GET DETAIL PROCESS === */
export function merchantGetDetailProcessV2(data) {
  return { type: types.MERCHANT_GET_DETAIL_PROCESS_V2, payload: data };
}
/** === MERCHANT GET DETAIL SUCCESS === */
export function merchantGetDetailSuccessV2(data) {
  if (data.result === 'Ok') {
    return { type: types.MERCHANT_GET_DETAIL_SUCCESS_V2, payload: data.data };
  }
  return { type: types.MERCHANT_GET_DETAIL_FAILED_V2, payload: data };
}
/** === MERCHANT GET DETAIL FAILED === */
export function merchantGetDetailFailedV2(data) {
  return { type: types.MERCHANT_GET_DETAIL_FAILED_V2, payload: data };
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
 * ====================================
 * GET PORTFOLIO BY USERID V2
 * ====================================
 */
/** PORTFOLIO GET PROCESS */
export function portfolioGetProcessV2() {
  return { type: types.PORTFOLIO_GET_PROCESS_V2 };
}
/** PORTFOLIO GET SUCCESS */
export function portfolioGetSuccessV2(data) {
  if (data.result === 'Ok') {
    return { type: types.PORTFOLIO_GET_SUCCESS_V2, payload: data.data };
  }
  return { type: types.PORTFOLIO_GET_FAILED_V2, payload: data };
}
/** PORTFOLIO GET FAILED */
export function portfolioGetFailedV2(data) {
  return { type: types.PORTFOLIO_GET_FAILED_V2, payload: data };
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
 * POST ACTIVITY V2
 * ==================================
 */
/** POST ACTIVITY PROCESS */
export function merchantPostActivityProcessV2(data) {
  return { type: types.MERCHANT_POST_ACTIVITY_PROCESS_V2, payload: data };
}
/** POST ACTIVITY SUCCESS */
export function merchantPostActivitySuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_POST_ACTIVITY_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_POST_ACTIVITY_FAILED_V2, payload: data };
}
/** POST ACTIVITY FAILED */
export function merchantPostActivityFailedV2(data) {
  return { type: types.MERCHANT_POST_ACTIVITY_FAILED_V2, payload: data };
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
 * GET LOG ALL ACTIVITY MERCHANT V2
 * ==================================
 */
/** GET LOG ALL ACTIVITY MERCHANT PROCESS */
export function merchantGetLogAllActivityProcessV2(data) {
  return {
    type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS_V2,
    payload: data
  };
}
/** GET LOG ALL ACTIVITY MERCHANT SUCCESS */
export function merchantGetLogAllActivitySuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED_V2, payload: data };
}
/** GET LOG ALL ACTIVITY MERCHANT FAILED */
export function merchantGetLogAllActivityFailedV2(data) {
  return { type: types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED_V2, payload: data };
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
 * GET LOG PER ACTIVITY MERCHANT V2
 * ==================================
 */
/** GET LOG PER ACTIVITY MERCHANT PROCESS */
export function merchantGetLogPerActivityProcessV2(data) {
  return {
    type: types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS_V2,
    payload: data
  };
}
/** GET LOG PER ACTIVITY MERCHANT SUCCESS */
export function merchantGetLogPerActivitySuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_LOG_PER_ACTIVITY_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED_V2, payload: data };
}
/** GET LOG PER ACTIVITY MERCHANT FAILED */
export function merchantGetLogPerActivityFailedV2(data) {
  return { type: types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED_V2, payload: data };
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
export function resetMerchantAdd() {
  return { type: types.RESET_MERCHANT_ADD };
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

/**
 * ===========================================
 * GET SURVEY LIST
 * ===========================================
 */
export function merchantGetSurveyListProcess(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_PROCESS, payload: data };
}
export function merchantGetSurveyListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_SURVEY_LIST_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_SURVEY_LIST_FAILED, payload: data };
}
export function merchantGetSurveyListFailed(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_FAILED, payload: data };
}
export function merchantGetSurveyListReset(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_RESET, payload: data };
}
/**
 * ===========================================
 * GET SURVEY RESPONSE
 * ===========================================
 */
export function merchantGetSurveyProcess(data) {
  return { type: types.MERCHANT_GET_SURVEY_PROCESS, payload: data };
}
export function merchantGetSurveySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_SURVEY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_SURVEY_FAILED, payload: data };
}
export function merchantGetSurveyFailed(data) {
  return { type: types.MERCHANT_GET_SURVEY_FAILED, payload: data };
}
/**
 * ===========================================
 * SUBMIT SURVEY
 * ===========================================
 */
export function merchantSubmitSurveyProcess(data) {
  return { type: types.MERCHANT_SUBMIT_SURVEY_PROCESS, payload: data };
}
export function merchantSubmitSurveySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_SUBMIT_SURVEY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_SUBMIT_SURVEY_FAILED, payload: data };
}
export function merchantSubmitSurveyFailed(data) {
  return { type: types.MERCHANT_SUBMIT_SURVEY_FAILED, payload: data };
}
/**
 * ===========================================
 * UPDATE SURVEY RESPONSE
 * ===========================================
 */
export function merchantUpdateSurveyProcess(data) {
  return { type: types.MERCHANT_UPDATE_SURVEY_PROCESS, payload: data };
}
/**
 * ======================
 * STOCK MANAGEMENT ADD RECORD STOCK
 * ======================
 */
export function merchantAddStockRecordProcess(data){
  return { type: types.MERCHANT_ADD_STOCK_RECORD_PROCESS, payload: data }
}

export function merchantAddStockRecordSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_ADD_STOCK_RECORD_SUCCESS,
      payload: data.data
    }
  }
  return { type: types.MERCHANT_ADD_STOCK_RECORD_FAILED, payload: data}
}

export function merchantAddStockRecordFailed(data){
  return { type: types.MERCHANT_ADD_STOCK_RECORD_FAILED, payload: data}
}

export function merchantAddStockRecordReset(){
  return { type: types.MERCHANT_ADD_STOCK_RECORD_RESET }
}
/**
 * ======================
 * GET STOCK RECORD
 * ======================
 */
export function merchantGetStockRecordProcess(data){
  return { type: types.MERCHANT_GET_STOCK_RECORD_PROCESS, payload: data}
}
export function merchantGetStockRecordSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_GET_STOCK_RECORD_SUCCESS,
      payload: data.data
    }
  }
  return { type: types.MERCHANT_GET_STOCK_RECORD_FAILED, payload: data}
}
export function merchantGetStockRecordFailed(data){
  return { type: types.MERCHANT_GET_STOCK_RECORD_FAILED, payload: data}
}
export function merchantGetRecordRefresh(){
  return { type: types.MERCHANT_GET_STOCK_RECORD_REFRESH }
}
/**
 * =======================
 * DELETE STOCK RECORD
 * =======================
 */
export function merchantDeleteStockRecordProcess(data){
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_PROCESS, payload: data}
}
export function merchantDeleteStockRecordSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_DELETE_STOCK_RECORD_SUCCESS,
      payload: data.data
    }
  }
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_FAILED, payload: data}
}
export function merchantDeleteStockRecordFailed(data){
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_FAILED, payload: data}
}
export function merchantDeleteStockRecordReset(){
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_RESET}
}
/**
 * =====================
 * UPDATE STOCK RECORD
 * =====================
 */
export function merchantUpdateStockRecordProcess(data){
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_PROCESS, payload: data}
}
export function merchantUpdateStockRecordSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_UPDATE_STOCK_RECORD_SUCCESS,
      payload: data.data
    }
  }
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_FAILED, payload: data}
}
export function merchantUpdateStockRecordFailed(data){
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_FAILED, payload: data}
}
export function merchantUpdateStockRecordReset(){
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_RESET}
}
/**
 * ============================
 * BATCH DELETE STOCK RECORD
 * ============================
 */
export function merchantBatchDeleteStockProcess(data){
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_PROCESS, payload: data}
}
export function merchantBatchDeleteStockSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.MERCHANT_BATCH_DELETE_STOCK_SUCCESS,
      payload: data.data
    }
  }
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_FAILED, payload: data }
}
export function merchantBatchDeleteStockFailed(data){
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_FAILED, payload: data }
}
export function merchantBatchDeleteStockReset(){
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_RESET }
}
/**
 * ===============================
 * MERCHANT STOCK RECORD STATUS
 * ===============================
 */
export function merchantStockRecordStatus(status){
  return { type: types.MERCHANT_STOCK_RECORD_STATUS, payload: status}
}

/**
 * ===========================================
 * VALIDATE AREA MAPPING
 * ===========================================
 */
export function validateAreaMappingProcess(data){
  return { type: types.VALIDATE_AREA_MAPPING_PROCESS, payload: data}
}
export function validateAreaMappingSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.VALIDATE_AREA_MAPPING_SUCCESS,
      payload: data
    }
  }
  return { type: types.VALIDATE_AREA_MAPPING_FAILED, payload: data}
}
export function validateAreaMappingFailed(data){
  return { type: types.VALIDATE_AREA_MAPPING_FAILED, payload: data}
}
export function resetValidateAreaMapping(){
  return { type: types.RESET_VALIDATE_AREA_MAPPING }
}
/**
 * ===========================================
 * GET SALES SEGMENTATION
 * ===========================================
 */
export function getSalesSegmentationProcess(data){
  return { type: types.GET_SALES_SEGMENTATION_PROCESS, payload: data}
}
export function getSalesSegmentationSuccess(data){
  if (data.result === 'Ok'){
    return {
      type: types.GET_SALES_SEGMENTATION_SUCCESS,
      payload: data
    }
  }
  return { type: types.GET_SALES_SEGMENTATION_FAILED, payload: data}
}
export function getSalesSegmentationFailed(data){
  return { type: types.GET_SALES_SEGMENTATION_FAILED, payload: data}
}
export function resetGetSalesSegmentation(){
  return { type: types.RESET_SALES_SEGMENTATION }
}
