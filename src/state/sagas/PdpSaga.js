import { put, call, takeEvery } from 'redux-saga/effects';
import { PdpMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';

function* getPdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getPdp(actions.payload);
    });
    yield put(ActionCreators.pdpGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpGetFailed(error));
  }
}
/** GET SEARCH PDP */
function* getSearchPdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getSearchPdp(actions.payload);
    });
    yield put(ActionCreators.pdpSearchGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpSearchGetFailed(error));
  }
}
/** GET PDP DETAIL */
function* getDetailPdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getDetailPdp(actions.payload);
    });
    yield put(ActionCreators.pdpGetDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpGetDetailFailed(error));
  }
}

/** GET PDP BUNDLE DETAIL */
function* getDetailBundlePdp(actions) {
  try {
    const response = yield call(() => {
      return PdpMethod.getDetailPdp(actions.payload);
    });
    yield put(ActionCreators.pdpGetBundleDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.pdpGetBundleDetailFailed(error));
  }
}

/** GET MSS CATALOGUES */
function* getMSSCatalogues(actions){
  try {
    const response = yield call(() => {
      return PdpMethod.getMSSCatalogues(actions.payload)
    })
    yield put(ActionCreators.getMSSCataloguesSuccess(response))
  } catch (error) {
    yield put (ActionCreators.getMSSCataloguesFailed(error))
  }
}

function* PdpSaga() {
  yield takeEvery(types.PDP_GET_PROCESS, getPdp);
  yield takeEvery(types.PDP_SEARCH_GET_PROCESS, getSearchPdp);
  yield takeEvery(types.PDP_GET_DETAIL_PROCESS, getDetailPdp);
  yield takeEvery(types.PDP_GET_BUNDLE_DETAIL_PROCESS, getDetailBundlePdp);
  yield takeEvery(types.MSS_GET_CATALOGUES_PROCESS, getMSSCatalogues)
}

export default PdpSaga;
