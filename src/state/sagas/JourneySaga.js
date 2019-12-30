import { put, call, takeEvery } from 'redux-saga/effects';
import { JourneyMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

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

function* JourneySaga() {
  yield takeEvery(types.JOURNEY_PLAN_GET_PROCESS, getJourneyPlan);
  yield takeEvery(
    types.SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS,
    saveMerchantToJourneyPlan
  );
}

export default JourneySaga;
