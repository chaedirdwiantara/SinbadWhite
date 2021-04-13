import { GlobalMethod } from '../../services/methods';
import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
  salesRole: null
};

export const privileges = createReducer(INITIAL_STATE, {
  [types.PRIVILEGE_GET_PROCESS](state, action){
    return {
      ...state,
      loading: true,
      data: null,
      error: null
    }
  },
  [types.PRIVILEGE_GET_SUCCESS](state, action){
    return {
      ...state,
      loading: false,
      data: action.payload
    }
  },
  [types.PRIVILEGE_GET_FAILED](state, action){
    return {
      ...state,
      loading: false,
      error: action.payload,
      data: GlobalMethod.remappingPrivilege(null) //SET DEFAULT PRIVILEGE TO HAVE ALL ACCESS WHEN ERROR HAPPEN
    }
  },
  [types.DELETE_ALL_DATA](state, action){
    return INITIAL_STATE
  }
});
