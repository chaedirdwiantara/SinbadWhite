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
      token: null,
      newOrderSuccessPerMerchant: []
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
    /** this for make notification in pesanan */
    let newOrder = state.newOrderSuccessPerMerchant;
    const indexOrder = state.newOrderSuccessPerMerchant.indexOf(
      action.payload.storeId
    );
    if (indexOrder === -1) {
      newOrder.push(action.payload.storeId);
    }
    return {
      ...state,
      newOrderSuccessPerMerchant: newOrder
    };
  },
  /** DELETE NEW ORDER PER MERCHANT */
  [types.HISTORY_DELETE_NEW_ORDER_NOTIF_PER_MERCHANT](state, action) {
    return {
      ...state,
      newOrderSuccessPerMerchant: action.payload
    };
  }
});
