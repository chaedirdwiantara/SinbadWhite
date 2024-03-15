import { put, takeLatest, call } from 'redux-saga/effects';
import * as ActionCreators from '../actions';
import * as types from '../types';
import { SalesmanKpiMethod } from '../../services/methods';

function* getKpiDashboardProcess(actions) {
  try {
    const response = yield call(() => {
      return SalesmanKpiMethod.getKpiData(actions.payload);
    });
    yield put(ActionCreators.getKpiDashboardSuccess(response.data.payload));
  } catch (error) {
    yield put(ActionCreators.getKpiDashboardFailed(error));
  }
}

function* getKpiDashboardDetailProcess(actions) {
  try {
    const response = yield call(() => {
      return SalesmanKpiMethod.getKpiDataDetail(actions.payload);
    });
    // check status code
    if (response.code <= 400) {
      yield put(
        ActionCreators.getKpiDashboardDetailSuccess(response.data.payload)
      );
    } else {
      yield put(ActionCreators.getKpiDashboardDetailFailed(response.message?.response.message));
    }
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
