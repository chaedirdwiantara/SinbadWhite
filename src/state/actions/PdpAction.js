import * as types from '../types';
import { Store } from '../Store';

/**
 * ==============================
 * GET PDP BY SUPPLIER ID
 * ==============================
 */
/** === PDP GET PROCESS ==== */
export function pdpGetProcess(data) {
  return { type: types.PDP_GET_PROCESS, payload: data };
}
/** === PDP GET SUCCESS === */
export function pdpGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PDP_GET_SUCCESS, payload: data.data };
  }
  return { type: types.PDP_GET_FAILED, payload: data };
}
/** === PDP GET FAILED === */
export function pdpGetFailed(data) {
  return { type: types.PDP_GET_FAILED, payload: data };
}
/** === REFRESH GET PDP === */
export function pdpGetRefresh() {
  return { type: types.PDP_GET_REFRESH };
}
/** === RESET GET PDP === */
export function pdpGetReset() {
  return { type: types.PDP_GET_RESET };
}
/** === LOAD MORE GET PDP === */
export function pdpGetLoadMore(page) {
  return { type: types.PDP_GET_LOADMORE, payload: page };
}

/**
 * ==============================
 * FILTER & DISPLAY PDP
 * ==============================
 */
/** === CHANGE DISPLAY GRID ==== */
export function pdpChangeDisplay(data) {
  return { type: types.PDP_CHANGE_DISPLAY, payload: data };
}
/** === CHANGE DISPLAY GRID ==== */
export function pdpOpenOrder(data) {
  return { type: types.PDP_OPEN_ORDER, payload: data };
}
export function pdpCloseOrder(data) {
  return { type: types.PDP_CLOSE_ORDER };
}

/**
 * ==============================
 * SEMENTARA
 * ==============================
 */
export function pdpModifyProductListData(data) {
  const allPropsData = Store.getState();
  const findProductById = allPropsData.pdp.dataGetPdp.find(
    product => parseInt(product.id, 10) === data.catalogueId
  );
  if (findProductById !== undefined) {
    console.log(data, findProductById, 'ini apa');
    switch (data.method) {
      case 'add':
        findProductById.addToCart = true;
        findProductById.qtyToCart = data.qty;
        break;
      case 'update':
        findProductById.qtyToCart = data.qty;
        break;
      case 'delete':
        delete findProductById.addToCart;
        delete findProductById.qtyToCart;
        break;
      default:
        break;
    }
  }
  return { type: types.PDP_MODIFY_PRODUCT_LIST_DATA };
}
