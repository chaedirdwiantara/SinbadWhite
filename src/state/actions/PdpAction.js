import * as types from '../types';
import { Store } from '../Store';
/**
 * ===========================
 * GET DETAIL PDP
 * ===========================
 */
/** PDP SKU GET DETAILS PROCESS */
export function pdpGetDetailProcess(data) {
  return { type: types.PDP_GET_DETAIL_PROCESS, payload: data };
}
/** PDP SKU GET DETAILS SUCCESS */
export function pdpGetDetailSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PDP_GET_DETAIL_SUCCESS, payload: data.data };
  }
  return { type: types.PDP_GET_DETAIL_FAILED, payload: data };
}
/** PDP SKU GET DETAILS FAILED */
export function pdpGetDetailFailed(data) {
  return { type: types.PDP_GET_DETAIL_FAILED, payload: data };
}
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
 * GET SEARCH PDP BY SUPPLIER ID
 * ==============================
 */
/** === PDP SEARCH GET PROCESS ==== */
export function pdpSearchGetProcess(data) {
  return { type: types.PDP_SEARCH_GET_PROCESS, payload: data };
}
/** === PDP SEARCH GET SUCCESS === */
export function pdpSearchGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PDP_SEARCH_GET_SUCCESS, payload: data.data };
  }
  return { type: types.PDP_SEARCH_GET_FAILED, payload: data };
}
/** === PDP SEARCH GET FAILED === */
export function pdpSearchGetFailed(data) {
  return { type: types.PDP_SEARCH_GET_FAILED, payload: data };
}
/** === REFRESH GET SEARCH PDP === */
export function pdpSearchGetRefresh() {
  return { type: types.PDP_SEARCH_GET_REFRESH };
}
/** === RESET GET  SEARCH PDP === */
export function pdpSearchGetReset() {
  return { type: types.PDP_SEARCH_GET_RESET };
}
/** === LOAD MORE SEARCH GET PDP === */
export function pdpSearchGetLoadMore(page) {
  return { type: types.PDP_SEARCH_GET_LOADMORE, payload: page };
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
