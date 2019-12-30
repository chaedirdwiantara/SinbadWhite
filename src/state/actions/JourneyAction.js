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
