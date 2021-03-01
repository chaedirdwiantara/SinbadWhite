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

/** GET PAYMENT METHOD */
function* getPaymentMethod(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getPaymentMethod(actions.payload);
    });
    yield put(ActionCreators.sfaGetPaymentMethodSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetPaymentMethodFailed(error));
  }
}

/** GET ALL BANK */
function* getAllBank(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getAllBank(actions.payload);
    });
    yield put(ActionCreators.sfaGetAllBankSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetAllBankFailed(error));
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
    yield takeEvery(types.SFA_GET_PAYMENT_METHOD_PROCESS, getPaymentMethod)
    yield takeEvery(types.SFA_GET_ALL_BANK_PROCESS,getAllBank )
}

export default SfaSaga;