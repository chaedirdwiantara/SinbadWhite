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
function* JourneySaga() {
  yield takeEvery(types.JOURNEY_PLAN_GET_PROCESS, getJourneyPlan);
  yield takeEvery(
    types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS,
    saveMerchantToJourneyPlan
  );
  yield takeEvery(types.JOURNEY_PLAN_GET_REPORT_PROCESS, getJourneyPlanReport);
}

export default JourneySaga;
