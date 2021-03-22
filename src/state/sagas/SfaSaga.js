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
/** GET PAYMENT METHOD */
function* getBankAccount(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getBankAccount(actions.payload);
    });
    yield put(ActionCreators.sfaGetBankAccountSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetBankAccountFailed(error));
  }
}

/** POST PAYMENT METHOD */
function* postPaymentMethod(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.postPaymentMethod(actions.payload);
    });
    yield put(ActionCreators.sfaPostPaymentMethodSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaPostPaymentMethodFailed(error));
  }
}

/** POST COLLECTION PAYMENT */
function* postCollectionPayment(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.postCollectionPayment(actions.payload);
    });
    yield put(ActionCreators.sfaPostCollectionPaymentSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaPostCollectionPaymentFailed(error));
  }
}

/** GET STAMP LIST */
function* getStampList(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getStamp(actions.payload);
    });
    yield put(ActionCreators.sfaGetStampListSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetStampListFailed(error));
  }
}

/** GET STATUS ORDER */
function* getStatusOrder(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getStatusOrder(actions.payload);
    });
    yield put(ActionCreators.sfaGetStatusOrderSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetStatusOrderFailed(error));
  }
}

/** GET TRANSFER IMAGE */
function* getTransferImage(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getTransferImage(actions.payload);
    });
    yield put(ActionCreators.sfaGetTransferImageSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetTransferImageFailed(error));
  }
}

/** GET PRINCIPAL */
function* getPrincipal(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getPrincipal(actions.payload);
    });
    yield put(ActionCreators.sfaGetPrincipalSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaGetPrincipalFailed(error));
  }
}

/** GET PRINCIPAL */
function* loadmorePrincipal(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getPrincipal(actions.payload);
    });
    yield put(ActionCreators.sfaPrincipalLoadmoreSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaPrincipalLoadmoreFailed(error));
  }
}

/** LOADMORE BANK ACCOUNT */
function* loadmoreBankAccount(actions) {
  try {
    const response = yield call(() => {
      return SfaMethod.getBankAccount(actions.payload);
    });
    yield put(ActionCreators.sfaBankAccountLoadmoreSuccess(response));
  } catch (error) {
    yield put(ActionCreators.sfaBankAccountLoadmoreFailed(error));
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
    yield takeEvery(types.SFA_GET_BANK_ACCOUNT_PROCESS, getBankAccount)
    yield takeEvery(types.SFA_POST_PAYMENT_METHOD_PROCESS, postPaymentMethod)
    yield takeEvery(types.SFA_POST_COLLECTION_PAYMENT_PROCESS, postCollectionPayment)
    yield takeEvery(types.SFA_GET_STAMP_PROCESS, getStampList)
    yield takeEvery(types.SFA_GET_STATUS_ORDER_PROCESS, getStatusOrder)
    yield takeEvery(types.SFA_GET_TRANSFER_IMAGE_PROCESS, getTransferImage)
    yield takeEvery(types.SFA_GET_PRINCIPAL_PROCESS, getPrincipal),
    yield takeEvery(types.SFA_PRINCIPAL_LOADMORE_PROCESS, loadmorePrincipal),
    yield takeEvery(types.SFA_BANK_ACCOUNT_LOADMORE_PROCESS, loadmoreBankAccount)
}

export default SfaSaga;