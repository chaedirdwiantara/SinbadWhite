import * as types from '../types';
import { globalReportFromAction } from '../../services/report/globalReport';
import * as EventName from '../../services/report/moengage/event';

/**
 * ==============================
 * GET JOURNEY PLAN BY USERID V2
 * ==============================
 */
/** === JOURNEY PLAN GET PROCESS ==== */
export function journeyPlanGetProcessV2(data) {
  return { type: types.JOURNEY_PLAN_GET_PROCESS_V2, payload: data };
}
/** === JOURNEY PLAN GET SUCCESS === */
export function journeyPlanGetSuccessV2(data) {
  if (data.result === 'Ok') {
    globalReportFromAction(EventName.JOURNEY_PLAN, data.data);
    return { type: types.JOURNEY_PLAN_GET_SUCCESS_V2, payload: data.data };
  }
  return { type: types.JOURNEY_PLAN_GET_FAILED_V2, payload: data };
}
/** === JOURNEY PLAN GET FAILED === */
export function journeyPlanGetFailedV2(data) {
  return { type: types.JOURNEY_PLAN_GET_FAILED_V2, payload: data };
}
/** === REFRESH GET MERCHANT === */
export function journeyPlanGetRefreshV2() {
  return { type: types.JOURNEY_PLAN_GET_REFRESH_V2 };
}
/** === RESET GET MERCHANT === */
export function journeyPlanGetResetV2() {
  return { type: types.JOURNEY_PLAN_GET_RESET_V2 };
}
/** === LOAD MORE GET MERCHANT === */
export function journeyPlanGetLoadMoreV2(page) {
  return { type: types.JOURNEY_PLAN_GET_LOADMORE_V2, payload: page };
}
/**
 * ==============================
 * GET JOURNEY PLAN MAP DATA
 * ==============================
 */
/** === JOURNEY PLAN GET MAP DATA PROCESS ==== */
export function journeyPlanGetMapDataProcess(data) {
  return { type: types.JOURNEY_PLAN_GET_MAP_DATA_PROCESS, payload: data };
}
/** === JOURNEY PLAN GET MAP DATA SUCCESS === */
export function journeyPlanGetMapDataSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.JOURNEY_PLAN_GET_MAP_DATA_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.JOURNEY_PLAN_GET_MAP_DATA_FAILED, payload: data };
}
/** === JOURNEY PLAN GET MAP DATA FAILED === */
export function journeyPlanGetMapDataFailed(data) {
  return { type: types.JOURNEY_PLAN_GET_MAP_DATA_FAILED, payload: data };
}
/** === JOURNEY PLAN GET MAP DATA RESET === */
export function journeyPlanGetMapDataReset() {
  return { type: types.JOURNEY_PLAN_GET_MAP_DATA_RESET };
}
/**
 * ==============================
 * GET JOURNEY PLAN MAP SEARCH
 * ==============================
 */
/** === JOURNEY PLAN GET PROCESS ==== */
export function journeyPlanGetMapSearchProcess(data) {
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_PROCESS, payload: data };
}
/** === JOURNEY PLAN GET SUCCESS === */
export function journeyPlanGetMapSearchSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.JOURNEY_PLAN_GET_MAP_SEARCH_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_FAILED, payload: data };
}
/** === JOURNEY PLAN GET FAILED === */
export function journeyPlanGetMapSearchFailed(data) {
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_FAILED, payload: data };
}
/** === REFRESH GET MERCHANT === */
export function journeyPlanGetMapSearchRefresh() {
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_REFRESH };
}
/** === RESET GET MERCHANT === */
export function journeyPlanGetMapSearchReset() {
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_RESET };
}
/** === LOAD MORE GET MERCHANT === */
export function journeyPlanGetMapSearchLoadMore(page) {
  return { type: types.JOURNEY_PLAN_GET_MAP_SEARCH_LOADMORE, payload: page };
}
/**
 * ================================
 * SAVE MERCHANT TO JOURNEY PLAN V2
 * ================================
 */
/** === SAVE TO JOURNEY PLAN PROCESS === */
export function saveMerchantToJourneyPlanProcessV2(data) {
  return {
    type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS_V2,
    payload: data
  };
}
/** === SAVE TO JOURNEY PLAN SUCCESS === */
export function saveMerchantToJourneyPlanSuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED_V2, payload: data };
}
/** === SAVE TO JOURNEY PLAN FAILED === */
export function saveMerchantToJourneyPlanFailedV2(data) {
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED_V2, payload: data };
}
/**
 * ==============================
 * GET JOURNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2
 * ==============================
 */
/** === JOURNEY PLAN REPORT GET PROCESS === */
export function getJourneyPlanReportProcessV2(data) {
  return { type: types.JOURNEY_PLAN_GET_REPORT_PROCESS_V2, payload: data };
}
/** === JOURNEY PLAN REPORT GET SUCCESS === */
export function getJourneyPlanReportSuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.JOURNEY_PLAN_GET_REPORT_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.JOURNEY_PLAN_GET_REPORT_FAILED_V2, payload: data };
}
/** === JOURNEY PLAN REPORT GET FAILED === */
export function getJourneyPlanReportFailedV2(data) {
  return { type: types.JOURNEY_PLAN_GET_REPORT_FAILED_V2, payload: data };
}
