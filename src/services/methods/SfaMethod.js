import ApiRest from '../apiRest';
import { GlobalMethod } from './GlobalMethod';

/** GET ORDER STATUS */
function getCollectionStatus(data) {
    return ApiRest({
      path: 'collection/v1/available-payment-status',
      method: 'GET'
    });
  }

/** GET ORDER STATUS */
function getSfaDetail(orderParcelId) {
  return ApiRest({
    path: `collection/v1/order-parcel/${orderParcelId}`,
    method: 'GET'
  });
}

/** GET COLLECTION LIST */
function getCollectionList(data) {
  return ApiRest({
    path: `collection/v1/order-parcels?skip=0&limit=${data.limit}&storeId=${data.storeId}&supplierId=${data.supplierId}&keyword=${data.keyword}&statusPayment=${data.statusPayment}`,
    method: `GET`
  })
}

/** GET COLLECTION LIST */
function getReferenceList(data) {
  return ApiRest({
    path: `collection/v1/payment-method?supplierId=${data.supplierId}&storeId=${data.storeId}&paymentCollectionTypeId=${data.paymentCollectionTypeId}&skip=0&limit=${data.limit}`,
    method: `GET`
  })
}

/** GET COLLECTION LIST */
function getPaymentMethod(data) {
  return ApiRest({
    path: `collection/v1/available-payment-methods?supplierId=2&storeId=101`,
    method: `GET`
  })
}

  export const SfaMethod = {
    getCollectionStatus,
    getSfaDetail,
    getCollectionList,
    getReferenceList,
    getPaymentMethod
  };