import { put, call, takeEvery, take } from 'redux-saga/effects';
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

/** GET COLLECTION LIST */
function* getCollectionList(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getCollectionList(actions.payload);
    });
    yield put(ActionCreators.sfaGetCollectionListSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetCollectionListFailed(error));
  }
}

/** GET REFERENCE LIST */
function* getReferenceList(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getReferenceList(actions.payload);
    });
    yield put(ActionCreators.sfaGetReferenceListSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetReferenceListFailed(error));
  }
}


  function* SfaSaga() {
    yield takeEvery(
      types.SFA_GET_COLLECTION_STATUS_PROCESS,
      getSfaCollectionStatus
    )
    yield takeEvery(types.SFA_GET_DETAIL_PROCESS, getSfaDetail);
    yield takeEvery(types.SFA_GET_COLLECTION_PROCESS, getCollectionList)
    yield takeEvery(types.SFA_GET_REFERENCE_PROCESS, getReferenceList)
}

export default SfaSaga;