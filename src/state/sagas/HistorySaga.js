import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { HistoryMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** GET HISTORY LIST */
function* getHistory(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getHistory(actions.payload);
    });
    yield put(ActionCreators.historyGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyGetFailed(error));
  }
}
/** GET ORDER STATUS */
function* getHistoryOrderStatus(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getHistoryOrderStatus(actions.payload);
    });
    yield put(ActionCreators.historyGetOrderStatusSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyGetOrderStatusFailed(error));
  }
}
/** GET PAYMENT STATUS */
function* getHistoryPaymentStatus(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getHistoryPaymentStatus(actions.payload);
    });
    yield put(ActionCreators.historyGetPaymentStatusSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyGetPaymentStatusFailed(error));
  }
}

/** === CHANGE PAYMENT METHOD === */
function* changePaymentMethod(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.changePaymentMethod(actions.payload);
    });
    yield put(ActionCreators.historyChangePaymentMethodSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyChangePaymentMethodFailed(error));
  }
}

/** EDIT HISTORY */
function* editHistory(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.editHistory(actions.payload);
    });
    yield put(ActionCreators.historyEditSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyEditFailed(error));
  }
}
/** DETAIL HISTORY */
function* getDetailHistory(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getDetailHistory(actions.payload);
    });
    yield put(ActionCreators.historyGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyGetDetailFailed(error));
  }
}
/** === ACTIVATE VA === */
function* activateVA(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.activateVA(actions.payload);
    });
    yield put(ActionCreators.historyActivateVASuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyActivateVAFailed(error));
  }
}
/** === VIEW INVOICE === */
function* viewInvoice(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.viewInvoice(actions.payload);
    });
    yield put(ActionCreators.historyViewInvoiceSuccess(response));
  } catch (error) {
    yield put(ActionCreators.historyViewInvoiceFailed(error));
  }
}

/** GET RETURN STATUS */
function* getReturnStatus(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getReturnStatus(actions.payload);
    });
    yield put(ActionCreators.getReturnStatusSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getReturnStatusFailed(error));
  }
}

/** GET RETURN PARCELS */
function* getReturnParcels(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getReturnParcels(actions.payload);
    });
    yield put(ActionCreators.getReturnParcelsSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getReturnParcelsFailed(error));
  }
}

/** GET RETURN PARCEL DETAIL */
function* getReturnParcelDetail(actions) {
  try {
    const response = yield call(() => {
      return HistoryMethod.getReturnParcelsDetail(actions.payload);
    });
    yield put(ActionCreators.getReturnParcelDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getReturnParcelDetailFailed(error));
  }
}

function* HistorySaga() {
  yield takeLatest(types.HISTORY_GET_PROCESS, getHistory);
  yield takeEvery(types.HISTORY_GET_DETAIL_PROCESS, getDetailHistory);
  yield takeEvery(types.HISTORY_EDIT_PROCESS, editHistory);
  yield takeEvery(
    types.HISTORY_GET_ORDER_STATUS_PROCESS,
    getHistoryOrderStatus
  );
  yield takeEvery(
    types.HISTORY_GET_PAYMENT_STATUS_PROCESS,
    getHistoryPaymentStatus
  );
  yield takeEvery(
    types.HISTORY_CHANGE_PAYMENT_METHOD_PROCESS,
    changePaymentMethod
  );
  yield takeEvery(types.HISTORY_ACTIVATE_VA_PROCESS, activateVA);
  yield takeEvery(types.HISTORY_VIEW_INVOICE_PROCESS, viewInvoice);
  yield takeEvery(types.GET_RETURN_STATUS_PROCESS, getReturnStatus);
  yield takeEvery(types.GET_RETURN_PARCELS_PROCESS, getReturnParcels);
  yield takeEvery(
    types.GET_RETURN_PARCEL_DETAIL_PROCESS,
    getReturnParcelDetail
  );
}

export default HistorySaga;
