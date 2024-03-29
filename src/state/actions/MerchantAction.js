import * as types from '../types';
import * as EventName from '../../services/report/moengage/event';
import { globalReportFromAction } from '../../services/report/globalReport';
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
export function volatileResetMerchant() {
  return { type: types.MERCHANT_RESET_DATA_VOLATILE };
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
 * POST ACTIVITY V2
 * ==================================
 */
/** POST ACTIVITY PROCESS */
export function merchantPostActivityProcessV2(data) {
  globalReportFromAction(EventName.STORE_ACTIVITY, data);
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
 * GET LATEST CHECK IN AND CHECK OUT (LAST STORE)
 * ==================================
 */
/** GET LATEST CHECK IN AND CHECK OUT PROCESS */
export function merchantGetLatestCheckInOutProcess(data) {
  return {
    type: types.MERCHANT_GET_LATEST_CHECK_IN_OUT_PROCESS,
    payload: data
  };
}
/** GET LATEST CHECK IN AND CHECK OUT SUCCESS */
export function merchantGetLatestCheckInOutSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_LATEST_CHECK_IN_OUT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_LATEST_CHECK_IN_OUT_FAILED, payload: data };
}
/** GET LATEST CHECK IN AND CHECK OUT FAILED */
export function merchantGetLatestCheckInOutFailed(data) {
  return { type: types.MERCHANT_GET_LATEST_CHECK_IN_OUT_FAILED, payload: data };
}

/**
 * ==================================
 * EDIT MERCHANT
 * ==================================
 */
/** PORTFOLIO GET PROCESS */
export function merchantAddProcess(data) {
  globalReportFromAction(EventName.REGISTER_NEW_STORE, data);
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
 * GET NO ORDER REASON
 * ====================================
 */
/** === MERCHANT GET NO ORDER REASON PROCESS === */
export function merchantGetNoOrderReasonProcess(data) {
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_PROCESS, payload: data };
}
/** === MERCHANT GET NO ORDER REASON SUCCESS === */
export function merchantGetNoOrderReasonSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_NO_ORDER_REASON_GET_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_FAILED, payload: data };
}
/** === MERCHANT GET NO ORDER REASON FAILED === */
export function merchantGetNoOrderReasonFailed(data) {
  return { type: types.MERCHANT_NO_ORDER_REASON_GET_FAILED, payload: data };
}
/**
 * ====================================
 * GET NO VISIT REASON
 * ====================================
 */
/** === MERCHANT GET NO VISIT REASON PROCESS === */
export function merchantGetNoVisitReasonProcess(data) {
  return { type: types.MERCHANT_NO_VISIT_REASON_GET_PROCESS, payload: data };
}
/** === MERCHANT GET NO VISIT REASON SUCCESS === */
export function merchantGetNoVisitReasonSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_NO_VISIT_REASON_GET_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_NO_VISIT_REASON_GET_FAILED, payload: data };
}
/** === MERCHANT GET NO VISIT REASON FAILED === */
export function merchantGetNoVisitReasonFailed(data) {
  return { type: types.MERCHANT_NO_VISIT_REASON_GET_FAILED, payload: data };
}
/**
 * ====================================
 * POST NO VISIT REASON
 * ====================================
 */
/** === MERCHANT POST NO VISIT REASON PROCESS === */
export function merchantPostNoVisitReasonProcess(data) {
  return { type: types.MERCHANT_POST_NO_VISIT_REASON_PROCESS, payload: data };
}
/** === MERCHANT POST NO VISIT REASON SUCCESS === */
export function merchantPostNoVisitReasonSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_POST_NO_VISIT_REASON_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_POST_NO_VISIT_REASON_FAILED, payload: data };
}
/** === MERCHANT POST NO VISIT REASON FAILED === */
export function merchantPostNoVisitReasonFailed(data) {
  return { type: types.MERCHANT_POST_NO_VISIT_REASON_FAILED, payload: data };
}
/**
 * ====================================
 * GET JOURNEY BOOK DETAIL
 * ====================================
 */
/** === MERCHANT GET JOURNEY BOOK DETAIL PROCESS === */
export function merchantGetDetailJourneyBookProcess(data) {
  return {
    type: types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_PROCESS,
    payload: data
  };
}
/** === MERCHANT GET JOURNEY BOOK DETAIL SUCCESS === */
export function merchantGetDetailJourneyBookSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_FAILED, payload: data };
}
/** === MERCHANT GET JOURNEY BOOK DETAIL FAILED === */
export function merchantGetDetailJourneyBookFailed(data) {
  return { type: types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_FAILED, payload: data };
}
/**
 * =====================================
 * GET STORE STATUS
 * =====================================
 */
export function merchantGetStoreStatusProcess(data) {
  return { type: types.MERCHANT_STORE_STATUS_PROCESS, payload: data };
}
export function merchantGetStoreStatusSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_STORE_STATUS_SUCCESS,
      payload: data
    };
  }
  return { type: types.MERCHANT_STORE_STATUS_FAILED, payload: data };
}
export function merchantGetStoreStatusFailed(data) {
  return { type: types.MERCHANT_STORE_STATUS_FAILED, payload: data };
}
/**
 * ===========================================
 * GET WAREHOSUE
 * ===========================================
 */
export function merchantGetWarehouseProcess(data) {
  return { type: types.MERCHANT_GET_WAREHOUSE_PROCESS, payload: data };
}
export function merchantGetWarehouseSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_WAREHOUSE_SUCCESS,
      payload: data
    };
  }
  return { type: types.MERCHANT_GET_WAREHOUSE_FAILED, payload: data };
}
export function merchantGetWarehouseFailed(data) {
  return { type: types.MERCHANT_GET_WAREHOUSE_FAILED, payload: data };
}
/**
 * ===========================================
 * GET SURVEY LIST
 * ===========================================
 */
/** === SURVEY LIST GET PROCESS ==== */
export function merchantGetSurveyListProcess(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_PROCESS, payload: data };
}
/** === SURVEY LIST GET SUCCESS ==== */
export function merchantGetSurveyListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_SURVEY_LIST_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_SURVEY_LIST_FAILED, payload: data };
}
/** === SURVEY LIST GET FAILED ==== */
export function merchantGetSurveyListFailed(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_FAILED, payload: data };
}
/** === RESET SURVEY LIST ==== */
export function merchantGetSurveyListReset(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_RESET, payload: data };
}
/** === REFRESH SURVEY LIST ==== */
export function merchantGetSurveyListRefresh(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_REFRESH, payload: data };
}
/** === LOAD MORE SURVEY LIST ==== */
export function MerchantGetSurveyListLoadMore(data) {
  return { type: types.MERCHANT_GET_SURVEY_LIST_LOADMORE, payload: data };
}
/**
 * ===========================================
 * GET TOTAL SURVEY
 * ===========================================
 */
export function merchantGetTotalSurveyProcess(data) {
  return { type: types.MERCHANT_GET_TOTAL_SURVEY_PROCESS, payload: data };
}
export function merchantGetTotalSurveySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_TOTAL_SURVEY_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_TOTAL_SURVEY_FAILED, payload: data };
}
export function merchantGetTotalSurveyFailed(data) {
  return { type: types.MERCHANT_GET_TOTAL_SURVEY_FAILED, payload: data };
}
/**
 * ===========================================
 * GET SURVEY BY ID
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
 * GET SURVEY BRAND BY SURVEY ID
 * ===========================================
 */
export function merchantGetSurveyBrandProcess(data) {
  return { type: types.MERCHANT_GET_SURVEY_BRAND_PROCESS, payload: data };
}
export function merchantGetSurveyBrandSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_SURVEY_BRAND_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_SURVEY_BRAND_FAILED, payload: data };
}
export function merchantGetSurveyBrandFailed(data) {
  return { type: types.MERCHANT_GET_SURVEY_BRAND_FAILED, payload: data };
}
/**
 * ===========================================
 * GET SURVEY RESPONSE
 * ===========================================
 */
export function merchantGetSurveyResponseProcess(data) {
  return { type: types.MERCHANT_GET_SURVEY_RESPONSE_PROCESS, payload: data };
}
export function merchantGetSurveyResponseSuccess(data, totalScore) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_SURVEY_RESPONSE_SUCCESS,
      payload: data.data,
      totalScore: totalScore
    };
  }
  return { type: types.MERCHANT_GET_SURVEY_RESPONSE_FAILED, payload: data };
}
export function merchantGetSurveyResponseFailed(data) {
  return { type: types.MERCHANT_GET_SURVEY_RESPONSE_FAILED, payload: data };
}
/**
 * ===========================================
 * SUBMIT SURVEY
 * ===========================================
 */
export function merchantSubmitSurveyResponseProcess(data) {
  return { type: types.MERCHANT_SUBMIT_SURVEY_RESPONSE_PROCESS, payload: data };
}
export function merchantSubmitSurveyResponseSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_SUBMIT_SURVEY_RESPONSE_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_SUBMIT_SURVEY_RESPONSE_FAILED, payload: data };
}
export function merchantSubmitSurveyResponseFailed(data) {
  return { type: types.MERCHANT_SUBMIT_SURVEY_RESPONSE_FAILED, payload: data };
}
/**
 * ===========================================
 * UPDATE SURVEY RESPONSE
 * ===========================================
 */
export function merchantUpdateSurveyResponseProcess(data) {
  return { type: types.MERCHANT_UPDATE_SURVEY_RESPONSE_PROCESS, payload: data };
}
/**
 * ===========================================
 * SURVEY RESULT
 * ===========================================
 */
export function getSurveyResult(data) {
  return { type: types.MERCHANT_SURVEY_RESULT, payload: data };
}
/**
 * ======================
 * STOCK MANAGEMENT ADD RECORD STOCK
 * ======================
 */
export function merchantAddStockRecordProcess(data) {
  return { type: types.MERCHANT_ADD_STOCK_RECORD_PROCESS, payload: data };
}

export function merchantAddStockRecordSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_ADD_STOCK_RECORD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_ADD_STOCK_RECORD_FAILED, payload: data };
}

export function merchantAddStockRecordFailed(data) {
  return { type: types.MERCHANT_ADD_STOCK_RECORD_FAILED, payload: data };
}

export function merchantAddStockRecordReset() {
  return { type: types.MERCHANT_ADD_STOCK_RECORD_RESET };
}
/**
 * ======================
 * GET STOCK RECORD
 * ======================
 */
export function merchantGetStockRecordProcess(data) {
  return { type: types.MERCHANT_GET_STOCK_RECORD_PROCESS, payload: data };
}
export function merchantGetStockRecordSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_STOCK_RECORD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_STOCK_RECORD_FAILED, payload: data };
}
export function merchantGetStockRecordFailed(data) {
  return { type: types.MERCHANT_GET_STOCK_RECORD_FAILED, payload: data };
}
export function merchantGetRecordRefresh() {
  return { type: types.MERCHANT_GET_STOCK_RECORD_REFRESH };
}
/**
 * =======================
 * DELETE STOCK RECORD
 * =======================
 */
export function merchantDeleteStockRecordProcess(data) {
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_PROCESS, payload: data };
}
export function merchantDeleteStockRecordSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_DELETE_STOCK_RECORD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_FAILED, payload: data };
}
export function merchantDeleteStockRecordFailed(data) {
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_FAILED, payload: data };
}
export function merchantDeleteStockRecordReset() {
  return { type: types.MERCHANT_DELETE_STOCK_RECORD_RESET };
}
/**
 * =====================
 * UPDATE STOCK RECORD
 * =====================
 */
export function merchantUpdateStockRecordProcess(data) {
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_PROCESS, payload: data };
}
export function merchantUpdateStockRecordSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_UPDATE_STOCK_RECORD_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_FAILED, payload: data };
}
export function merchantUpdateStockRecordFailed(data) {
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_FAILED, payload: data };
}
export function merchantUpdateStockRecordReset() {
  return { type: types.MERCHANT_UPDATE_STOCK_RECORD_RESET };
}
/**
 * ============================
 * BATCH DELETE STOCK RECORD
 * ============================
 */
export function merchantBatchDeleteStockProcess(data) {
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_PROCESS, payload: data };
}
export function merchantBatchDeleteStockSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_BATCH_DELETE_STOCK_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_FAILED, payload: data };
}
export function merchantBatchDeleteStockFailed(data) {
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_FAILED, payload: data };
}
export function merchantBatchDeleteStockReset() {
  return { type: types.MERCHANT_BATCH_DELETE_STOCK_RESET };
}
/**
 * ===============================
 * MERCHANT STOCK RECORD STATUS
 * ===============================
 */
export function merchantStockRecordStatus(status) {
  return { type: types.MERCHANT_STOCK_RECORD_STATUS, payload: status };
}

/**
 * ===========================================
 * VALIDATE AREA MAPPING
 * ===========================================
 */
export function validateAreaMappingProcess(data) {
  return { type: types.VALIDATE_AREA_MAPPING_PROCESS, payload: data };
}
export function validateAreaMappingSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.VALIDATE_AREA_MAPPING_SUCCESS,
      payload: data
    };
  }
  return { type: types.VALIDATE_AREA_MAPPING_FAILED, payload: data };
}
export function validateAreaMappingFailed(data) {
  return { type: types.VALIDATE_AREA_MAPPING_FAILED, payload: data };
}
export function resetValidateAreaMapping() {
  return { type: types.RESET_VALIDATE_AREA_MAPPING };
}
/**
 * ===========================================
 * GET SALES SEGMENTATION
 * ===========================================
 */
export function getSalesSegmentationProcess(data) {
  return { type: types.GET_SALES_SEGMENTATION_PROCESS, payload: data };
}
export function getSalesSegmentationSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.GET_SALES_SEGMENTATION_SUCCESS,
      payload: data
    };
  }
  return { type: types.GET_SALES_SEGMENTATION_FAILED, payload: data };
}
export function getSalesSegmentationFailed(data) {
  return { type: types.GET_SALES_SEGMENTATION_FAILED, payload: data };
}
export function resetGetSalesSegmentation() {
  return { type: types.RESET_SALES_SEGMENTATION };
}
/**
 * ==============================
 * GET RETURN ACTIVE INFO
 * ==============================
 */
export function getReturnActiveInfoProcess(data) {
  return { type: types.GET_RETURN_ACTIVE_INFO_PROCESS, payload: data };
}
export function getReturnActiveInfoSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.GET_RETURN_ACTIVE_INFO_SUCCESS, payload: data.data };
  }
  return { type: types.GET_RETURN_ACTIVE_INFO_FAILED, payload: data };
}
export function getReturnActiveInfoFailed(data) {
  return { type: types.GET_RETURN_ACTIVE_INFO_FAILED, payload: data };
}
/**
 * ===========================================
 * GET RADIUS LOCK GEOTAG
 * ===========================================
 */
export function getRadiusLockGeotagProcess(data) {
  return { type: types.GET_RADIUS_LOCK_GEOTAG_PROCESS, payload: data };
}
export function getRadiusLockGeotagSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.GET_RADIUS_LOCK_GEOTAG_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.GET_RADIUS_LOCK_GEOTAG_FAILED, payload: data };
}
export function getRadiusLockGeotagFailed(data) {
  return { type: types.GET_RADIUS_LOCK_GEOTAG_FAILED, payload: data };
}
/**
 * ===========================================
 * CHECK CAN RESUME VISIT JOURNEY BOOK STORES
 * ===========================================
 */
export function checkCanResumeVisitProcess(data) {
  return { type: types.CHECK_CAN_RESUME_VISIT_PROCESS, payload: data };
}
export function checkCanResumeVisitSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.CHECK_CAN_RESUME_VISIT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.CHECK_CAN_RESUME_VISIT_FAILED, payload: data };
}
export function checkCanResumeVisitFailed(data) {
  return { type: types.CHECK_CAN_RESUME_VISIT_FAILED, payload: data };
}
// /**
//  * ===========================================
//  * PAUSE / RESUME VISIT JOURNEY BOOK
//  * ===========================================
//  */
export function pauseResumeVisitProcess(data) {
  return { type: types.PAUSE_RESUME_VISIT_PROCESS, payload: data };
}
export function pauseResumeVisitSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.PAUSE_RESUME_VISIT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.PAUSE_RESUME_VISIT_FAILED, payload: data };
}
export function pauseResumeVisitFailed(data) {
  return { type: types.PAUSE_RESUME_VISIT_FAILED, payload: data };
}

/**
 * ============================
 * GET MERCHANT CREDIT LIMIT LIST
 * ============================
 */
export function merchantGetCreditLimitListProcess(data) {
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_PROCESS, payload: data };
}
export function merchantGetCreditLimitListSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_CREDIT_LIMIT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_FAILED, payload: data };
}
export function merchantGetCreditLimitListFailed(data) {
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_FAILED, payload: data };
}
export function merchantGetCreditLimitListReset() {
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_RESET };
}
/** === LOAD MORE GET MERCHANT  CREDIT LIMIT LIST=== */
export function merchantGetCreditLimitListLoadMore(page) {
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_LOADMORE, payload: page };
}
/**
 * ============================
 * GET MERCHANT CREDIT LIMIT SUMMARY
 * ============================
 */
export function merchantGetCreditLimitSummaryProcess(data) {
  return {
    type: types.MERCHANT_GET_CREDIT_LIMIT_SUMMARY_PROCESS,
    payload: data
  };
}
export function merchantGetCreditLimitSummarySuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.MERCHANT_GET_CREDIT_LIMIT_SUMMARY_SUCCESS,
      payload: data.data
    };
  }
  return {
    type: types.MERCHANT_GET_CREDIT_LIMIT_SUMMARY_FAILED,
    payload: data
  };
}
export function merchantGetCreditLimitSummaryFailed(data) {
  return {
    type: types.MERCHANT_GET_CREDIT_LIMIT_SUMMARY_FAILED,
    payload: data
  };
}
export function merchantGetCreditLimitSummaryReset() {
  return { type: types.MERCHANT_GET_CREDIT_LIMIT_SUMMARY_RESET };
}

/** MODAL CHANGE MERCHANT */
export function modalChangeMerchant(data) {
  return {
    type: types.MODAL_CHANGE_MERCHANT,
    payload: data
  };
}
