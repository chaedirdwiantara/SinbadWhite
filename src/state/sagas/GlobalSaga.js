import { put, call, takeEvery } from 'redux-saga/effects';
import { GlobalMethod } from '../../services/methods';
import * as ActionCreators from '../actions';
import * as types from '../types';
/** === MERCHANT LIST === */
function* getListAndSearch(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getListAndSearch(actions.payload);
    });
    yield put(ActionCreators.listAndSearchGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.listAndSearchGetFailed(error));
  }
}
/** === THIS FOR GET ADDRESS FROM LONG LAT GOOGLE MAPS === */
function* getAddressFromLongLat(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getAddressFromLongLat(actions.payload);
    });
    yield put(ActionCreators.longlatToAddressGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.longlatToAddressGetFailed(error));
  }
}
/** === THIS FOR GET VERSION === */
function* getVersion(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getVersion(actions.payload);
    });
    yield put(ActionCreators.versionsGetSuccess(response));
  } catch (error) {
    yield put(ActionCreators.versionsGetFailed(error));
  }
}
/** === THIS FOR GET URBAN ID === */
function* getUrbanId(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.getUrbanId(actions.payload);
    });
    yield put(ActionCreators.getUrbanIdSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getUrbanIdFailed(error));
  }
}
/** === THIS FOR UPLOAD IMAGE === */
function* uploadImage(actions) {
  try {
    const response = yield call(() => {
      return GlobalMethod.uploadImage(actions.payload);
    });
    yield put(ActionCreators.uploadImageSuccess(response));
  } catch (error) {
    yield put(ActionCreators.uploadImageFailed(error));
  }
}
/** === THIS FOR GET CATALOGUE_TAXES VALUE === */
function* getCatalogueTaxes() {
  try {
    const response = yield call(() => {
      return GlobalMethod.getCatalogueTaxes();
    });
    yield put(ActionCreators.getCatalogueTaxesSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getCatalogueTaxesFailed(error));
  }
}
/** === SAGA FUNCTION === */
function* GlobalSaga() {
  yield takeEvery(types.LIST_AND_SEARCH_GET_PROCESS, getListAndSearch);
  yield takeEvery(types.UPLOAD_IMAGE_PROCESS, uploadImage);
  yield takeEvery(types.GET_URBAN_ID_PROCESS, getUrbanId);
  yield takeEvery(types.APP_VERSION_PROCESS, getVersion);
  yield takeEvery(
    types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS,
    getAddressFromLongLat
  );
  yield takeEvery(types.GET_CATALOGUE_TAXES_PROCESS, getCatalogueTaxes);
}

export default GlobalSaga;
