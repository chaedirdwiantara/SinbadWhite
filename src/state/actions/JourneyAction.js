import * as types from '../types';

/**
 * ==============================
 * GET JOURNEY PLAN BY USERID
 * ==============================
 */
/** === JOURNEY PLAN GET PROCESS ==== */
export function journeyPlanGetProcess(data) {
  return { type: types.JOURNEY_PLAN_GET_PROCESS, payload: data };
}
/** === JOURNEY PLAN GET SUCCESS === */
export function journeyPlanGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.JOURNEY_PLAN_GET_SUCCESS, payload: data.data };
  }
  return { type: types.JOURNEY_PLAN_GET_FAILED, payload: data };
}
/** === JOURNEY PLAN GET FAILED === */
export function journeyPlanGetFailed(data) {
  return { type: types.JOURNEY_PLAN_GET_FAILED, payload: data };
}
/** === REFRESH GET MERCHANT === */
export function journeyPlanGetRefresh() {
  return { type: types.JOURNEY_PLAN_GET_REFRESH };
}
/** === RESET GET MERCHANT === */
export function journeyPlanGetReset() {
  return { type: types.JOURNEY_PLAN_GET_RESET };
}
/** === LOAD MORE GET MERCHANT === */
export function journeyPlanGetLoadMore(page) {
  return { type: types.JOURNEY_PLAN_GET_LOADMORE, payload: page };
}
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
 * SAVE MERCHANT TO JOURNEY PLAN
 * ==============================
 */
export function saveMerchatToJourneyPlanProcess(data) {
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS, payload: data };
}
/** === JOURNEY PLAN GET SUCCESS === */
export function saveMerchatToJourneyPlanSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED, payload: data };
}
/** === JOURNEY PLAN GET FAILED === */
export function saveMerchatToJourneyPlanFailed(data) {
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED, payload: data };
}
/**
 * ================================
 * SAVE MERCHANT TO JOURNEY PLAN V2
 * ================================
 */
/** === SAVE TO JOURNEY PLAN PROCESS === */
export function saveMerchatToJourneyPlanProcessV2(data) {
  return {
    type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS_V2,
    payload: data
  };
}
/** === SAVE TO JOURNEY PLAN SUCCESS === */
export function saveMerchatToJourneyPlanSuccessV2(data) {
  if (data.result === 'Ok') {
    return {
      type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS_V2,
      payload: data.data
    };
  }
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED_V2, payload: data };
}
/** === SAVE TO JOURNEY PLAN FAILED === */
export function saveMerchatToJourneyPlanFailedV2(data) {
  return { type: types.SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED_V2, payload: data };
}
/**
 * ==============================
 * GET JOURNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER
 * ==============================
 */
export function getJourneyPlanReportProcess(data) {
  return { type: types.JOURNEY_PLAN_GET_REPORT_PROCESS, payload: data };
}
/** === JOURNEY PLAN GET SUCCESS === */
export function getJourneyPlanReportSuccess(data) {
  if (data.result === 'Ok') {
    return {
      type: types.JOURNEY_PLAN_GET_REPORT_SUCCESS,
      payload: data.data
    };
  }
  return { type: types.JOURNEY_PLAN_GET_REPORT_FAILED, payload: data };
}
/** === JOURNEY PLAN GET FAILED === */
export function getJourneyPlanReportFailed(data) {
  return { type: types.JOURNEY_PLAN_GET_REPORT_FAILED, payload: data };
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
