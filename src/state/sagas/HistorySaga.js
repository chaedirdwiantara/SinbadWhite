import { put, call, takeEvery } from 'redux-saga/effects';
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
function* HistorySaga() {
  yield takeEvery(types.HISTORY_GET_PROCESS, getHistory);
  yield takeEvery(
    types.HISTORY_GET_ORDER_STATUS_PROCESS,
    getHistoryOrderStatus
  );
  yield takeEvery(
    types.HISTORY_GET_PAYMENT_STATUS_PROCESS,
    getHistoryPaymentStatus
  );
}

export default HistorySaga;
