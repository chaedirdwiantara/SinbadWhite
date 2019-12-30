import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = null;

export const user = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * Save data for user after success login
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return action.payload.user;
  }
});
