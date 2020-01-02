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
/** === SAGA FUNCTION === */
function* MerchantSaga() {
  yield takeEvery(types.MERCHANT_GET_PROCESS, getMerchant);
  yield takeEvery(types.MERCHANT_GET_DETAIL_PROCESS, getMerchantDetail);
  yield takeEvery(types.PORTFOLIO_GET_PROCESS, getPortfolio);
}

export default MerchantSaga;
