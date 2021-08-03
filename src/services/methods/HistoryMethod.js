import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

/** GET CART ITEM */
function getHistory(data) {
  return ApiRest({
    path: `payment/v1/order/get-parcels?userId=${data.userId}&storeId=${
      data.storeId
    }&$limit=10&$skip=${data.page}&status=${data.statusOrder}&statusPayment=${
      data.statusPayment
    }&orderGte=${data.dateGte}&orderLte=${data.dateLte}&searchKey=${
      data.search
    }`,
    method: 'GET'
  });
}
// function getHistory(data) {
//   return ApiRest({
//     path: `get-parcel?userId=${data.userId}&storeId=${
//       data.storeId
//     }&$limit=10&$skip=${data.page}&status=${data.statusOrder}&statusPayment=${
//       data.statusPayment
//     }&orderGte=${data.dateGte}&orderLte=${
//       data.dateLte
//     }&portfolioIds=${JSON.stringify(data.portfolioId)}&searchKey=${
//       data.search
//     }`,
//     method: 'GET'
//   });
// }
/** GET ORDER STATUS */
function getHistoryOrderStatus(data) {
  return ApiRest({
    path: 'order-status',
    method: 'GET'
  });
}
/** GET PAYMENT STATUS */
function getHistoryPaymentStatus(data) {
  return ApiRest({
    path: 'payment-status',
    method: 'GET'
  });
}
/** EDIT HISTORY */
function editHistory(data) {
  return ApiRest({
    path: `order-parcels/${data.parcelId}`,
    method: 'PATCH',
    params: data.params
  });
}
/** DETAIL HISTORY */
function getDetailHistory(parcelId) {
  return ApiRest({
    path: `payment/v1/order/parcel/${parcelId}`,
    method: 'GET'
  });
}

/** CHANGE PAYMENT METHOD */
function changePaymentMethod(data) {
  return ApiRest({
    path: 'payment/v1-1/billing/update',
    method: 'POST',
    params: {
      billingID: data.billingID,
      newPaymentChannelId: data.newPaymentChannelId
    }
  });
}

/** ACTIVATE VA */
function activateVA(data) {
  return ApiRest({
    path: 'payment/v1-1/billing/update',
    method: 'POST',
    params: {
      billingID: data.billingID
    }
  });
}

/** VIEW INVOICE */
function viewInvoice(id) {
  return ApiRest({
    path: `payment/v1/invoice/${id}`,
    // path: 'payment/v1/invoice/1',
    method: 'GET'
  });
}

export const HistoryMethod = {
  getHistory,
  getHistoryOrderStatus,
  getHistoryPaymentStatus,
  editHistory,
  getDetailHistory,
  activateVA,
  changePaymentMethod,
  viewInvoice
};
