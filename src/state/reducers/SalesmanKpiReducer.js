import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  isLoadingKpiDashboard: false,
  isLoadingKpiDashboardDetail: false,
  isLoadingKpiGraphData: false,
  kpiDashboardData: {},
  kpiDashboardDetailData: {},
  errorKpiDashboard: '',
  errorDetailKpiDashboard: '',
  errorKpiGraphData: '',
  kpiGraphData: {
    totalSales: null,
    countOrder: null,
    countStore: null,
    countStoreOrder: null,
    countVisitedStore: null
  }
};

export const salesmanKpi = createReducer(INITIAL_STATE, {
  [types.KPI_DASHBOARD_GET_PROCESS](state, action) {
    return {
      ...state,
      isLoadingKpiDashboard: true
    };
  },
  [types.KPI_DASHBOARD_GET_SUCCESS](state, action) {
    return {
      ...state,
      isLoadingKpiDashboard: false,
      kpiDashboardData: action.payload
    };
  },
  [types.KPI_DASHBOARD_GET_FAILED](state, action) {
    return {
      ...state,
      isLoadingKpiDashboard: false,
      errorKpiDashboard: action.payload
    };
  },

  [types.KPI_DASHBOARD_DETAIL_GET_PROCESS](state, action) {
    return {
      ...state,
      isLoadingKpiDashboardDetail: true
    };
  },
  [types.KPI_DASHBOARD_DETAIL_GET_SUCCESS](state, action) {
    return {
      ...state,
      isLoadingKpiDashboardDetail: false,
      kpiDashboardDetailData: action.payload
    };
  },
  [types.KPI_DASHBOARD_DETAIL_GET_FAILED](state, action) {
    return {
      ...state,
      isLoadingKpiDashboardDetail: false,
      errorDetailKpiDashboard: action.payload
    };
  },

  [types.KPI_GRAPH_DATA_GET_PROCESS](state, action) {
    return {
      ...state,
      isLoadingKpiGraphData: true,
      errorKpiGraphData: ''
    };
  },
  [types.KPI_GRAPH_DATA_GET_SUCCESS](state, action) {
    return {
      ...state,
      isLoadingKpiGraphData: false,
      kpiGraphData: action.payload
    };
  },
  [types.KPI_GRAPH_DATA_GET_FAILED](state, action) {
    return {
      ...state,
      isLoadingKpiGraphData: false,
      errorKpiGraphData: action.payload
    };
  }
});
