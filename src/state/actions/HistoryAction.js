import * as types from '../types';
/**
 * ==============================
 * DELETE NEW ORDER PER MERCHANT
 * ==============================
 */
export function historyDeleteNewOrderNotifPerMerchant(data) {
  return {
    type: types.HISTORY_DELETE_NEW_ORDER_NOTIF_PER_MERCHANT,
    payload: data
  };
}
