import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetPdp: false,
  refreshGetPdp: false,
  loadingLoadMoreGetPdp: false,
  loadingGetPortfolio: false,
  /** data */
  dataGetPdp: [],
  totalDataGetPdp: 0,
  pageGetPdp: 0,
  /** error */
  errorGetPdp: null
};

export const pdp = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ===================
   * PDP LIST
   * ===================
   */
  [types.PDP_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetPdp: action.payload.loading,
      errorGetPdp: null
    };
  },
  [types.PDP_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetPdp: false,
      loadingLoadMoreGetPdp: false,
      refreshGetPdp: false,
      totalDataGetPdp: action.payload.total,
      dataGetPdp: [...state.dataGetPdp, ...action.payload.data]
    };
  },
  [types.PDP_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetPdp: false,
      loadingLoadMoreGetPdp: false,
      refreshGetPdp: false,
      errorGetPdp: action.payload
    };
  },
  [types.PDP_GET_RESET](state, action) {
    return {
      ...state,
      pageGetPdp: 0,
      totalDataGetPdp: 0,
      dataGetPdp: []
    };
  },
  [types.PDP_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetPdp: true,
      loadingGetPdp: true,
      pageGetPdp: 0,
      totalDataGetPdp: 0,
      dataGetPdp: []
    };
  },
  [types.PDP_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetPdp: true,
      pageGetPdp: action.payload
    };
  }
});
