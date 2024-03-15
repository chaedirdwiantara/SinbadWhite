import { put, call, takeLatest } from 'redux-saga/effects';
import { JourneyMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** GET JOURNEY PLAN LIST BY USER ID V2 */
function* getJourneyPlanV2(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanV2(actions.payload);
    });

    if (response.data.data === null) {
      response.data.data = [];
    }

    yield put(ActionCreators.journeyPlanGetSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.journeyPlanGetFailedV2(error));
  }
}
/** GET JOURNEY PLAN MAP DATA */
function* getJourneyPlanMapData(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanV2(actions.payload);
    });

    if (response.data.data === null) {
      response.data.data = [];
    }

    yield put(ActionCreators.journeyPlanGetMapDataSuccess(response));
  } catch (error) {
    yield put(ActionCreators.journeyPlanGetMapDataFailed(error));
  }
}
/** GET JOURNEY PLAN MAP SEARCH LIST */
function* getJourneyPlanMapSearch(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanV2(actions.payload);
    });

    if (response.data.data === null) {
      response.data.data = [];
    }

    yield put(ActionCreators.journeyPlanGetMapSearchSuccess(response));
  } catch (error) {
    yield put(ActionCreators.journeyPlanGetMapSearchFailed(error));
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
/** GET JOUNEY PLAN REPORT VISIT AND TOTAL PRICE ORDER V2*/
function* getJourneyPlanReportV2(actions) {
  try {
    const response = yield call(() => {
      return JourneyMethod.getJourneyPlanReportV2();
    });
    yield put(ActionCreators.getJourneyPlanReportSuccessV2(response));
  } catch (error) {
    yield put(ActionCreators.getJourneyPlanReportFailedV2(error));
  }
}
function* JourneySaga() {
  yield takeLatest(types.JOURNEY_PLAN_GET_PROCESS_V2, getJourneyPlanV2);
  yield takeLatest(
    types.JOURNEY_PLAN_GET_MAP_DATA_PROCESS,
    getJourneyPlanMapData
  );
  yield takeLatest(
    types.JOURNEY_PLAN_GET_MAP_SEARCH_PROCESS,
    getJourneyPlanMapSearch
  );
  yield takeLatest(
    types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS_V2,
    saveMerchantToJourneyPlanV2
  );
  yield takeLatest(
    types.JOURNEY_PLAN_GET_REPORT_PROCESS_V2,
    getJourneyPlanReportV2
  );
}

export default JourneySaga;
