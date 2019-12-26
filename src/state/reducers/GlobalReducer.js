import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  token: null
  /** data */
  /** error */
};

export const global = createReducer(INITIAL_STATE, {
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
  }
});
