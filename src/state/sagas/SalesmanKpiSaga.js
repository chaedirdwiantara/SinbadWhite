import { put, takeLatest } from 'redux-saga/effects';
import * as ActionCreators from '../actions';
import * as types from '../types';

function* getKpiDashboardProcess(actions) {
  try {
    let data = {};

    yield put(ActionCreators.getKpiDashboardSuccess(data));
  } catch (error) {
    yield put(ActionCreators.getKpiDashboardFailed(error));
  }
}

function* getKpiDashboardDetailProcess(actions) {
  try {
    let data = {};

    yield put(ActionCreators.getKpiDashboardDetailSuccess(data));
  } catch (error) {
    yield put(ActionCreators.getKpiDashboardDetailFailed(error));
  }
}

function* SalesmanKpiSaga() {
  // yield takeLatest(types.KPI_DASHBOARD_GET_PROCESS, getKpiDashboardProcess);
  // yield takeLatest(types.KPI_DASHBOARD_DETAIL_GET_PROCESS, getKpiDashboardDetailProcess);
}

export default SalesmanKpiSaga;
