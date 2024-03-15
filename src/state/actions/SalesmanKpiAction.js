import * as types from '../types';

/*
 * FOR KPI SALES DASHBOARD ACTION
 */

export const getKpiDashboardProcess = params => {
  return {
    type: types.KPI_DASHBOARD_GET_PROCESS,
    payload: params
  };
};

export const getKpiDashboardSuccess = data => {
  return {
    type: types.KPI_DASHBOARD_GET_SUCCESS,
    payload: data
  };
};

export const getKpiDashboardFailed = data => {
  return {
    type: types.KPI_DASHBOARD_GET_FAILED,
    payload: data
  };
};

/*
 * FOR KPI SALES DASHBOARD DETAIL ACTION
 */
export const getKpiDashboardDetailProcess = params => {
  return {
    type: types.KPI_DASHBOARD_DETAIL_GET_PROCESS,
    payload: params
  };
};

export const getKpiDashboardDetailSuccess = data => {
  return {
    type: types.KPI_DASHBOARD_DETAIL_GET_SUCCESS,
    payload: data
  };
};

export const getKpiDashboardDetailFailed = data => {
  return {
    type: types.KPI_DASHBOARD_DETAIL_GET_FAILED,
    payload: data
  };
};
