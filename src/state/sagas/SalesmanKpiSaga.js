import { put, takeLatest, call } from 'redux-saga/effects';
import * as ActionCreators from '../actions';
import * as types from '../types';
import { KpiDashboardMethod } from '../../services/methods';

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
    const response = yield call(() => {
      return KpiDashboardMethod.getKpiDataDetail(actions.payload);
    });
    yield put(ActionCreators.getKpiDashboardDetailSuccess(response));
  } catch (error) {
    yield put(ActionCreators.getKpiDashboardDetailFailed(error));
  }
}

function* SalesmanKpiSaga() {
  yield takeLatest(types.KPI_DASHBOARD_GET_PROCESS, getKpiDashboardProcess);
  yield takeLatest(
    types.KPI_DASHBOARD_DETAIL_GET_PROCESS,
    getKpiDashboardDetailProcess
  );
}

export default SalesmanKpiSaga;
