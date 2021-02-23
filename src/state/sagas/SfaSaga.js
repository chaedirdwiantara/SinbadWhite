import { put, call, takeEvery } from 'redux-saga/effects';
import { SfaMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

/** GET COLLECTION STATUS */
function* getSfaCollectionStatus(actions) {
    try {
      const response = yield call(() => {
        return SfaMethod.getCollectionStatus(actions.payload);
      });
      yield put(ActionCreators.sfaGetCollectionStatusSuccess(response));
    } catch (error) {
      yield put(ActionCreators.sfaGetCollectionStatusFailed(error));
    }
  }

/** GET SFA DETAIL */
function* getSfaDetail(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getSfaDetail(actions.payload);
    });
    yield put(ActionCreators.sfaGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetDetailFailed(error));
  }
}
  function* SfaSaga() {
    yield takeEvery(
      types.SFA_GET_COLLECTION_STATUS_PROCESS,
      getSfaCollectionStatus
    )
    yield takeEvery(types.SFA_GET_DETAIL_PROCESS, getSfaDetail);
}

export default SfaSaga;