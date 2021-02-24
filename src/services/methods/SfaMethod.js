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
  console.log(data, 'data method');
  return ApiRest({
    path: `collection/v1/order-parcels?skip=0&limit=${data.limit}&storeId=${data.storeId}&supplierId=${data.supplierId}&keyword=${data.keyword}&statusPayment=${data.statusPayment}`,
    method: `GET`
  })
}

  export const SfaMethod = {
    getCollectionStatus,
    getSfaDetail,
    getCollectionList
  };