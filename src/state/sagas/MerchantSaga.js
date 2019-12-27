import { put, call, takeEvery } from 'redux-saga/effects';
import { MerchantMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

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

function* MerchantSaga() {
  yield takeEvery(types.MERCHANT_GET_PROCESS, getMerchant);
  yield takeEvery(types.PORTFOLIO_GET_PROCESS, getPortfolio);
}

export default MerchantSaga;
