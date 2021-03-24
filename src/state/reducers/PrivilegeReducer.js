import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  loadingGetPrivilege: false,
  dataPrivilege: null,
  errorGetPrivilege: null,
  salesRole: null
};

export const privileges = createReducer(INITIAL_STATE, {
  [types.PRIVILEGE_GET_PROCESS](state, action){
    return {
      ...state,
      loadingGetPrivilege: true,
      dataPrivilege: null,
      errorGetPrivilege: null
    }
  },
  [types.PRIVILEGE_GET_SUCCESS](state, action){
    return {
      ...state,
      loadingGetPrivilege: false,
      dataPrivilege: action.payload
    }
  },
  [types.PRIVILEGE_GET_FAILED](state, action){
    return {
      ...state,
      loadingGetPrivilege: false,
      errorGetPrivilege: action.payload
    }
  },
  [types.PRIVILEGE_SET_SALES_ROLE](state, action){
    return {
      ...state,
      salesRole: action.payload
    }
  }
});
