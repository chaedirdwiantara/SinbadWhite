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
// function confirmOrder(data) {
//   return ApiRest({
//     path: 'confirm-order',
//     method: 'POST',
//     params: {
//       orderId: data.orderId,
//       parcels: data.parcels
//     }
//   });
// }
function confirmOrder(data) {
  return ApiRest({
    path: 'payment/v1/order/confirm',
    method: 'POST',
    params: {
      orderId: data.orderId,
      storeId: data.storeId,
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
/** GET PAYMENT CHANNEL */
function getPaymentChannel(data) {
  return ApiRest({
    path: 'payment/v1/channels',
    method: 'POST',
    params: {
      supplierId: data.supplierId,
      paymentTypeId: data.paymentTypeId,
      orderParcelId: data.orderParcelId
    }
  });
}
/** GET TERMS AND CONDITIONS */
function getTermsConditions(data) {
  return ApiRest({
    path: 'payment/v1/channel/terms-conditions',
    method: 'POST',
    params: {
      storeId: data.storeId,
      orderParcels: data.orderParcels
    }
  });
}

/** LAST PAYMENT CHANNEL */
function getLastPaymentChannel({ invoiceGroupIds }) {
  return ApiRest({
    path: 'payment/v1/channel/last',
    method: 'POST',
    params: {
      storeId: parseInt(GlobalMethod.merchantStoreId(), 10),
      invoiceGroupIds
    }
  });
}
/** CHECK PROMO */
function checkPromo(data) {
  let params = {
    storeId: GlobalMethod.merchantStoreId(),
    cartId: data.cartId,
    catalogues: data.catalogues
  };
  return ApiRest({
    path: 'check-promo',
    method: 'POST',
    params
  });
}

export const OmsMethod = {
  getCartItem,
  getCheckoutItem,
  getPayment,
  confirmOrder,
  deleteOrder,
  getPaymentChannel,
  getTermsConditions,
  getLastPaymentChannel,
  checkPromo
};
