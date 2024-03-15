import { put, call, takeEvery, delay } from 'redux-saga/effects';
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
/** === GET SALES SEGMENTATION TEAM === */
function* getSalesSegementationTeam(actions){
  try {
    const response = yield call(() => {
      return ProfileMethod.getSalesSegementationTeam(actions.payload)
    })
    yield put(ActionCreators.getSalesSegmentationTeamSuccess(response))
  } catch (error) {
    yield put(ActionCreators.getSalesSegmentationTeamFailed(error))
  }
}
/** === GET SALES SEGMENTATION TEAM === */
function* getSalesTeam(actions){
  try {
    const response = yield call(() => {
      return ProfileMethod.getSalesTeam(actions.payload)
    })
    yield put(ActionCreators.getSalesTeamSuccess(response))
  } catch (error) {
    yield put(ActionCreators.getSalesTeamFailed(error))
  }
}
/** === SAGA FUNCTION === */
function* ProfileSaga() {
  yield takeEvery(types.PROFILE_EDIT_PROCESS, editProfile);
  yield takeEvery(types.PROFILE_GET_WAREHOUSE_PROCESS, getWarehouse)
  yield takeEvery(types.PROFILE_GET_SALES_SEGMENTATION_TEAM_PROCESS, getSalesSegementationTeam)
  yield takeEvery(types.PROFILE_GET_SALES_TEAM_PROCESS, getSalesTeam)
}

export default ProfileSaga;
