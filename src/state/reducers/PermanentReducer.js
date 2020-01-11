import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** data */
  token: null,
  newOrderSuccessPerMerchant: []
};

export const permanent = createReducer(INITIAL_STATE, {
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
  /** SAVE NEW ORDER PER MERCHANT */
  [types.OMS_CONFIRM_ORDER_SUCCESS](state, action) {
    return {
      ...state,
      newOrderSuccessPerMerchant: [
        ...state.newOrderSuccessPerMerchant,
        ...action.payload.storeId
      ]
    };
  }
});
