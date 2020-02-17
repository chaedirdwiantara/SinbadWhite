import { put, call, takeEvery } from 'redux-saga/effects';
import { GlobalMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getListAndSearch(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getListAndSearch(actions.payload);
    });
    yield put(ActionCreators.listAndSearchGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.listAndSearchGetFailed(error));
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
/** === THIS FOR GET VERSION === */
function* getVersion(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getVersion(actions.payload);
    });
    yield put(ActionCreators.versionsGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.versionsGetFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* GlobalSaga() {
  yield takeEvery(types.LIST_AND_SEARCH_GET_PROCESS, getListAndSearch);
  yield takeEvery(types.APP_VERSION_PROCESS, getVersion);
  yield takeEvery(
    types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS,
    getAddressFromLongLat
  );
}

export default GlobalSaga;
