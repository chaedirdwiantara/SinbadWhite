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
/** === THIS FOR GET ADDRESS FROM LONG LAT GOOGLE MAPS === */
function* getAddressFromLongLat(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getAddressFromLongLat(actions.payload);
    });
    yield put(ActionCreators.longlatToAddressGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.longlatToAddressGetFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* GlobalSaga() {
  yield takeEvery(types.LOCATION_GET_PROCESS, getLocation);
  yield takeEvery(
    types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS,
    getAddressFromLongLat
  );
}

export default GlobalSaga;
