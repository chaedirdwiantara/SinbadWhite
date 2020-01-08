import ApiRest from '../apiRest';
/** GET CART ITEM */
function getCartItem(data) {
  return ApiRest({
    path: 'add-cart',
    method: 'POST',
    params: {
      storeId: data.storeId,
      cartId: null,
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
/** GET PAYMENT */
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
  getPayment,
  confirmOrder,
  deleteOrder
};
