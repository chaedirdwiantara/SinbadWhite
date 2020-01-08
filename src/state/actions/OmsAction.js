import * as types from '../types';
import { Store } from '../Store';
/**
 * ====================================
 * GET CART ITEM
 * ====================================
 */
/** === CART ITEM PROCESS === */
export function omsGetCartItemProcess(data) {
  return { type: types.OMS_GET_CART_ITEM_PROCESS, payload: data };
}
/** === CART ITEM SUCCESS === */
export function omsGetCartItemSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.OMS_GET_CART_ITEM_SUCCESS, payload: data.data };
  }
  return { type: types.OMS_GET_CART_ITEM_FAILED, payload: data };
}
/** === CART ITEM FAILED === */
export function omsGetCartItemFailed(data) {
  return { type: types.OMS_GET_CART_ITEM_FAILED, payload: data };
}
/**
 * ==============================
 * ADD TO CART GLOBAL
 * ==============================
 */
/** === ADD TO CART GLOBAL ==== */
/**
 * ==============================
 * ADD TO CART
 * ==============================
 */
export function omsAddToCart(data) {
  const allPropsData = Store.getState();
  const dataCart = allPropsData.oms.dataCart;
  const dataCheckBoxlistCart = allPropsData.oms.dataCheckBoxlistCart;
  /**
   * ===============================================================
   * fungsi ini untuk delete product yang ada di data checklist box
   * ===============================================================
   */
  if (dataCheckBoxlistCart.length > 0) {
    if (data.method === 'delete') {
      const indexDataCheckBoxlistCart = dataCheckBoxlistCart.findIndex(
        itemDataCheckBoxlistCart =>
          parseInt(itemDataCheckBoxlistCart.catalogue.id, 10) ===
          data.catalogueId
      );
      if (indexDataCheckBoxlistCart > -1) {
        dataCheckBoxlistCart.splice(indexDataCheckBoxlistCart, 1);
        return {
          type: types.OMS_CHECKLIST_ITEM_CART,
          payload: dataCheckBoxlistCart
        };
      }
    }
  }
  /** =============================================================== */
  if (allPropsData.oms.dataCart.length > 0) {
    const indexDataCart = dataCart.findIndex(
      itemCart => itemCart.catalogueId === data.catalogueId
    );

    switch (data.method) {
      case 'add':
        dataCart.push({
          catalogueId: data.catalogueId,
          qty: data.qty
        });
        break;
      case 'update':
        dataCart[indexDataCart].qty = data.qty;
        break;
      case 'delete':
        dataCart.splice(indexDataCart, 1);
        break;
      default:
        break;
    }
  } else {
    dataCart.push({ catalogueId: data.catalogueId, qty: data.qty });
  }
  return { type: types.OMS_ITEM_FOR_CART, payload: dataCart };
}
