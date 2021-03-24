import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingEditProfile: false,
  loadingGetWarehouse: false,
  loadingGetSalesSegmentationTeam: false,
  loadingGetPrivilege: true,
  /** data */
  dataEditProfile: null,
  dataGetWarehouse: [],
  dataSalesSegmentationTeam: null,
  dataPrivilege: null,
  salesRole: null,
  /** error */
  errorAddProfile: null,
  errorGetWarehouse: null,
  errorGetSalesSegmentationTeam: null,
  errorGetPrivilege: null
};

export const profile = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * =============================
   * EDIT PROFILE
   * =============================
   */
  [types.PROFILE_EDIT_PROCESS](state, action) {
    return {
      ...state,
      loadingEditProfile: true,
      dataEditProfile: null,
      errorAddProfile: null
    };
  },
  [types.PROFILE_EDIT_SUCCESS](state, action) {
    return {
      ...state,
      loadingEditProfile: false,
      dataEditProfile: action.payload
    };
  },
  [types.PROFILE_EDIT_FAILED](state, action) {
    return {
      ...state,
      loadingEditProfile: false,
      errorAddProfile: action.payload
    };
  },
  [types.PROFILE_GET_WAREHOUSE_PROCESS](state, action){
    return {
      ...state,
      loadingGetWarehouse: true,
      dataGetWarehouse: null,
      errorGetWarehouse: null
    }
  },
  [types.PROFILE_GET_WAREHOUSE_SUCCESS](state, action){
    return {
      ...state,
      loadingGetWarehouse: false,
      dataGetWarehouse: action.payload
    }
  },
  [types.PROFILE_GET_WAREHOUSE_FAILED](state, action){
    return {
      ...state,
      loadingGetWarehouse: false,
      errorGetWarehouse: action.payload
    }
  },
  [types.PROFILE_GET_SALES_SEGMENTATION_TEAM_PROCESS](state, action){
    return {
      ...state,
      loadingGetSalesSegmentationTeam: true,
      dataSalesSegmentationTeam: null,
      errorGetSalesSegmentationTeam: null
    }
  },
  [types.PROFILE_GET_SALES_SEGMENTATION_TEAM_SUCCESS](state, action){
    return {
      ...state,
      loadingGetSalesSegmentationTeam: false,
      dataSalesSegmentationTeam: action.payload
    }
  },
  [types.PROFILE_GET_SALES_SEGMENTATION_TEAM_FAILED](state, action){
    return {
      ...state,
      loadingGetSalesSegmentationTeam: false,
      errorGetSalesSegmentationTeam: action.payload
    }
  }
});
