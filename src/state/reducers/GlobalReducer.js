import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  token: null,
  /** data */
  search: ''
  /** error */
};

export const global = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   * - token
   */
  [types.DELETE_ALL_DATA](state, action) {
    return {
      ...state,
      token: null
    };
  },
  /**
   * ===================
   * TOKEN
   * ===================
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      token: action.payload.token
    };
  },
  /**
   * ======================
   * SEARCH TEXT
   * ======================
   */
  [types.SEARCH_TEXT](state, action) {
    return {
      ...state,
      search: action.payload
    };
  }
});
