import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingEditProfile: false,
  /** data */
  dataEditProfile: null,
  /** error */
  errorAddProfile: null
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
  }
});
