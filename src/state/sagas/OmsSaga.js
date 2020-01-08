import { put, call, takeEvery } from 'redux-saga/effects';
import { GlobalMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getLocation(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getLocation(actions.payload);
    });
    yield put(ActionCreators.locationGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.locationGetFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* GlobalSaga() {
  yield takeEvery(types.LOCATION_GET_PROCESS, getLocation);
}

export default GlobalSaga;
