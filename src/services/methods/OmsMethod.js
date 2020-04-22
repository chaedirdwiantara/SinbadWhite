import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';
/** GET CART ITEM */
function getCartItem(data) {
  return ApiRest({
    path: 'add-cart',
    method: 'POST',
    params: {
      storeId: GlobalMethod.merchantStoreId(),
      cartId: null,
      catalogues: data.catalogues
    }
  });
}
/** GET CHECKOUT ITEM */
function getCheckoutItem(data) {
  return ApiRest({
    path: 'checkout',
    method: 'POST',
    params: {
      storeId: GlobalMethod.merchantStoreId(),
      cartId: data.cartId,
      catalogues: data.catalogues
    }
  });
}
/** GET PAYMENT */
function getPayment(data) {
  return ApiRest({
    path: `payment-list?orderParcelId=${data.parcelId}`,
    method: 'GET'
  });
}
/** POST CONFIRM ORDER */
function confirmOrder(data) {
  return ApiRest({
    path: 'confirm-order',
    method: 'POST',
    params: {
      orderId: data.orderId,
      parcels: data.parcels
    }
  });
}
/** DELETE ORDER */
function deleteOrder(data) {
  return ApiRest({
    path: `orders/${data.orderId}`,
    method: 'DELETE'
  });
}

export const OmsMethod = {
  getCartItem,
  getCheckoutItem,
  getPayment,
  confirmOrder,
  deleteOrder
};
