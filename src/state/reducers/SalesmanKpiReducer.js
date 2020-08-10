import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  isLoadingKpiDashboard: false,
  isLoadingKpiDashboardDetail: false,
  kpiDashboardData: {},
  kpiDashboardDetailData: {},
  errorKpiDashboard: '',
  errorDetailKpiDashboard: ''
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
  }
});
