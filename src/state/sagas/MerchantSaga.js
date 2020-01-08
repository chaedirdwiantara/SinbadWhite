import { put, call, takeEvery } from 'redux-saga/effects';
import { MerchantMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetFailed(error));
  }
}
/** === MERCHANT DETAIL === */
function* getMerchantDetail(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantDetail(actions.payload);
    });
    yield put(ActionCreators.merchantGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetDetailFailed(error));
  }
}
/** === PORTFOLIO BY USERID === */
function* getPortfolio(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getPortfolioByUserId(actions.payload);
    });
    yield put(ActionCreators.portfolioGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.portfolioGetSuccess(error));
  }
}
/** === ADD MERCHANT === */
function* addMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.addMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantAddSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantAddFailed(error));
  }
}
/** === MERCHANT DETAIL === */
function* getMerchantLastOrder(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.getMerchantLastOrder(actions.payload);
    });
    yield put(ActionCreators.merchantGetLastOrderSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantGetLastOrderFailed(error));
  }
}
/** === CHECKIN MERCHANT === */
function* checkinMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.checkMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantCheckinSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantCheckinFailed(error));
  }
}
/** === CHECKOUT MERCHANT === */
function* checkoutMerchant(actions) {
  try {
    const response = yield call(() => {
      return MerchantMethod.checkMerchant(actions.payload);
    });
    yield put(ActionCreators.merchantCheckoutSuccess(response));
  } catch (error) {
    yield put(ActionCreators.merchantCheckoutFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* MerchantSaga() {
  yield takeEvery(types.MERCHANT_GET_PROCESS, getMerchant);
  yield takeEvery(types.MERCHANT_GET_DETAIL_PROCESS, getMerchantDetail);
  yield takeEvery(types.PORTFOLIO_GET_PROCESS, getPortfolio);
  yield takeEvery(types.MERCHANT_ADD_PROCESS, addMerchant);
  yield takeEvery(types.MERCHANT_GET_LAST_ORDER_PROCESS, getMerchantLastOrder);
  yield takeEvery(types.MERCHANT_CHECKIN_PROCESS, checkinMerchant);
  yield takeEvery(types.MERCHANT_CHECKOUT_PROCESS, checkoutMerchant);
}

export default MerchantSaga;
