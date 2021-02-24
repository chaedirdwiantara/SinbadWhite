import { put, call, takeEvery } from 'redux-saga/effects';
import { JourneyMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** GET JOURNEY PLAN LIST BY USER ID */
function* getJourneyPlan(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlan(actions.payload);
    });
    yield put(ActionCreators.journeyPlanGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.journeyPlanGetFailed(error));
  }
}
/** GET JOURNEY PLAN LIST BY USER ID V2 */
function* getJourneyPlanV2(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanV2(actions.payload);
    });
    yield put(ActionCreators.journeyPlanGetSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.journeyPlanGetFailedV2(error));
  }
}
/** ADD MERCHANT TO JOURNEY PLAN */
function* saveMerchantToJourneyPlan(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.saveMerchantToJourneyPlan(actions.payload);
    });
    yield put(ActionCreators.saveMerchatToJourneyPlanSuccess(response));
  } catch (error) {
    yield put(ActionCreators.saveMerchatToJourneyPlanFailed(error));
  }
}
/** ADD MERCHANT TO JOURNEY PLAN V2*/
function* saveMerchantToJourneyPlanV2(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.saveMerchantToJourneyPlanV2(actions.payload);
    });
    yield put(ActionCreators.saveMerchantToJourneyPlanSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.saveMerchantToJourneyPlanFailedV2(error));
  }
}
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER */
function* getJourneyPlanReport(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanReport(actions.payload);
    });
    yield put(ActionCreators.getJourneyPlanReportSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getJourneyPlanReportFailed(error));
  }
}
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2*/
function* getJourneyPlanReportV2(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanReportV2(actions.payload);
    });
    yield put(ActionCreators.getJourneyPlanReportSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.getJourneyPlanReportFailedV2(error));
  }
}
function* JourneySaga() {
  yield takeEvery(types.JOURNEY_PLAN_GET_PROCESS, getJourneyPlan);
  yield takeEvery(types.JOURNEY_PLAN_GET_PROCESS_V2, getJourneyPlanV2);
  yield takeEvery(
    types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS,
    saveMerchantToJourneyPlan
  );
  yield takeEvery(
    types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS_V2,
    saveMerchantToJourneyPlanV2
  );
  yield takeEvery(types.JOURNEY_PLAN_GET_REPORT_PROCESS, getJourneyPlanReport);
  yield takeEvery(
    types.JOURNEY_PLAN_GET_REPORT_PROCESS_V2,
    getJourneyPlanReportV2
  );
}

export default JourneySaga;
