import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';
import { Store } from '../../state/Store';
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
  let params = {
    storeId: GlobalMethod.merchantStoreId(),
    cartId: data.cartId,
    catalogues: data.catalogues,
    portfolioId: data.portfolioId
  };
  // promo
  params.promos = promoData();
  return ApiRest({
    path: 'checkout',
    method: 'POST',
    params
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
    path: 'payment/v1/order/confirm',
    method: 'POST',
    params: {
      orderId: data.orderId,
      storeId: data.storeId,
      parcels: data.parcels,
      otp: data.otp
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
function getLastPaymentChannel({ orderParcelIds }) {
  return ApiRest({
    path: 'payment/v1/channel/last',
    method: 'POST',
    params: {
      storeId: parseInt(GlobalMethod.merchantStoreId(), 10),
      orderParcelIds: orderParcelIds
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
/** GET PAY LATER TYPE */
function getPayLaterType(data) {
  return ApiRest({
    path: 'payment/v1/paylater-types',
    method: 'POST',
    params: {
      paymentTypeId: data.paymentTypeId,
      orderParcelId: data.orderParcelId
    }
  });
}
/**
 * =========================================
 * THIS CODE IS NOT FETCHING (ONLY FUNCTION)
 * =========================================
 */
/** === GET PROMO DATA === */
function promoData() {
  const promos = [];
  const stateData = Store.getState();
  if (stateData.oms.dataOmsCheckPromo !== null) {
    if (stateData.oms.dataOmsCheckPromo.promoSku.length > 0) {
      stateData.oms.dataOmsCheckPromo.promoSku.map(sku => {
        sku.listPromo.map(promo => {
          if (!promos.includes(promo.id)) {
            promos.push(promo.id);
          }
        });
      });
    }
  }
  return promos;
}

/** GET APPLICABLE PAY LATER */
function getApplicablePaylater(data) {
  return ApiRest({
    path: 'payment/v1/loan-applicable',
    method: 'POST',
    params: {
      storeCode: data
    }
  });
}

/** GET KUR OTP */
function getKurOtp(data) {
  return ApiRest({
    path: `payment/v1/klik-acc/otp?via=phone&storeCode=${data}`,
    method: 'GET'
  });
}

/** POST KUR CONSENT */
function postKurConsent(data) {
  return ApiRest({
    path: 'payment/v1/consent',
    method: 'POST',
    params: {
      storeId: data.storeId,
      timestamp: data.timestamp
    }
  });
}

function getReturnDraft(data) {
  return ApiRest({
    method: 'GET',
    path: `return-draft?orderParcelId=${
      data.orderParcelId
    }&storeId=${GlobalMethod.merchantStoreId()}`
  });
}

function getReturnReason() {
  return ApiRest({
    method: 'GET',
    path: 'return-reasons?showOnAgentApp=true'
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
  checkPromo,
  getPayLaterType,
  getApplicablePaylater,
  getKurOtp,
  postKurConsent,
  getReturnDraft,
  getReturnReason
};
