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
    yield put(
      ActionCreators.getKpiDashboardDetailSuccess(response.data.payload)
    );
  } catch (error) {
    yield put(ActionCreators.getKpiDashboardDetailFailed(error));
  }
}

function* getKpiGraphDataProcess(actions) {
  try {
    /*
     * Request total sales
     */
    const totalSales = yield call(SalesmanKpiMethod.getKpiDataGraphTotalSales, actions.payload);

    /*
     * Request count order
     */
    const countOrder = yield call(SalesmanKpiMethod.getKpiDataGraphCountOrder, actions.payload);

    /*
     * Request count store
     */
    const countStore = yield call(SalesmanKpiMethod.getKpiDataGraphCountStore, actions.payload);

    /*
     * Request count store order
     */
    const countStoreOrder = yield call(SalesmanKpiMethod.getKpiDataGraphCountStoreOrder, actions.payload);

    /*
     * Request count visited store
     */
    const countVisitedStore = yield call(SalesmanKpiMethod.getKpiDataGraphCountVisitedStore, actions.payload);

    let data = {};

    data.totalSales = totalSales.data.payload;
    data.countOrder = countOrder.data.payload;
    data.countStore = countStore.data.payload;
    data.countStoreOrder = countStoreOrder.data.payload;
    data.countVisitedStore = countVisitedStore.data.payload;

    yield put(ActionCreators.getKpiGraphDataSuccess(data));
  } catch (error) {
    yield put(ActionCreators.getKpiGraphDataFailed(error));
  }
}

function* SalesmanKpiSaga() {
  yield takeLatest(types.KPI_DASHBOARD_GET_PROCESS, getKpiDashboardProcess);
  yield takeLatest(
    types.KPI_DASHBOARD_DETAIL_GET_PROCESS,
    getKpiDashboardDetailProcess
  );
  yield takeLatest(types.KPI_GRAPH_DATA_GET_PROCESS, getKpiGraphDataProcess);
}

export default SalesmanKpiSaga;
