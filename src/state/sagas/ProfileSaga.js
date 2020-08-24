import { put, call, takeEvery } from 'redux-saga/effects';
import { ProfileMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === EDIT MERCHANT === */
function* editProfile(actions) {
  try {
    const response = yield call(() => {
      return ProfileMethod.editProfile(actions.payload);
    });
    yield put(ActionCreators.profileEditSuccess(response));
  } catch (error) {
    yield put(ActionCreators.profileEditFailed(error));
  }
}
/** === GET WAREHOUSE === */
function* getWarehouse(actions){
  try {
    const response = yield call(() => {
      return ProfileMethod.getWarehouse(actions.payload)
    })
    yield put(ActionCreators.profileGetWarehouseSuccess(response))
  } catch (error) {
    yield put(ActionCreators.profileGetWarehouseFailed(error))
  }
}
/** === SAGA FUNCTION === */
function* ProfileSaga() {
  yield takeEvery(types.PROFILE_EDIT_PROCESS, editProfile);
  yield takeEvery(types.PROFILE_GET_WAREHOUSE_PROCESS, getWarehouse)
}

export default ProfileSaga;
