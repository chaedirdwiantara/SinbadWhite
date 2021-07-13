import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = null;

export const user = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_USER_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * Save data for user after success login
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return action.payload.user;
  },
  /** IF EDIT PROFILE SUCCESS */
  [types.PROFILE_EDIT_SUCCESS](state, action) {
    return {
      ...state,
      imageUrl: action.payload.imageUrl,
      fullName: action.payload.fullName
    };
  }
});
