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
    path: `collection/v1/order-parcels?skip=${data.skip}&limit=${data.limit}&storeId=${
      data.storeId
    }&supplierId=${data.supplierId}&keyword=${data.keyword}&statusPayment=${
      data.statusPayment
    }`,
    method: `GET`
  });
}

/** GET COLLECTION LIST */
function getReferenceList(data) {
  return ApiRest({
    path: `collection/v1/payment-method?supplierId=${data.supplierId}&storeId=${
      data.storeId
    }&userId=${data.userId}&paymentCollectionTypeId=${
      data.paymentCollectionTypeId
    }&skip=0&limit=${data.limit}`,
    method: `GET`
  });
}

/** GET COLLECTION LIST */
function getPaymentMethod(data) {
  return ApiRest({
    path: `collection/v1/available-payment-methods?supplierId=${
      data.supplierId
    }&storeId=${data.storeId}`,
    method: `GET`
  });
}

/** GET ALL BANK ACCOUNT */
function getAllBank() {
  return ApiRest({
    path: `collection/v1/banks`,
    method: 'GET'
  });
}

/** GET COLLECTION LIST */
function getBankAccount(data) {
  return ApiRest({
    path: `collection/v1/bank-accounts?orderParcelId=${
      data.orderParcelId
    }&skip=${data.skip}&limit=${data.limit}`,
    method: `GET`
  });
}

/** POST PAYMENT METHOD */
function postPaymentMethod(data) {
  return ApiRest({
    path: 'collection/v1/payment-method',
    method: 'POST',
    params: data
  });
}

/** POST COLLECTION PAYMENT */
function postCollectionPayment(data) {
  return ApiRest({
    path: 'collection/v1/payment',
    method: 'POST',
    params: data
  });
}

/** GET STAMPS*/
function getStamp(data) {
  return ApiRest({
    path: 'collection/v1/stamps',
    method: 'GET',
    params: data
  });
}

/** GET STATUS ORDER */
function getStatusOrder(data) {
  return ApiRest({
    path: `collection/v1/count-order-parcels?storeId=${parseInt(
      data.storeId
    )}&supplierId=${parseInt(data.supplierId)}`,
    method: 'GET'
  });
}

/** GET TRANSFER IMAGE */
function getTransferImage(id) {
  return ApiRest({
    path: `collection/v1/payment-method/images/${id}`,
    method: 'GET'
  });
}

/** GET PRINCIPAL */
function getPrincipal(data) {
  return ApiRest({
    path: `collection/v1/principals?supplierId=${data.supplierId}&skip=${
      data.skip
    }&limit=${data.limit}&keyword=`,
    method: 'GET'
  });
}

/** GET COLLECTION LOG */
function getCollectionLog(data) {
  return ApiRest({
    // testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-billings?storeId=${data.storeId}&orderParcelId=${data.orderParcelId}&limit=${data.limit}&skip=${data.skip}`,
    path: `collection/v1/payment-billings?storeId=${
      data.storeId
    }&orderParcelId=${data.orderParcelId}&limit=${data.limit}&skip=${
      data.skip
    }`,
    method: 'GET'
  });
}

/** GET COLLECTION DETAIL */
function getCollectionDetail(data) {
  return ApiRest({
    // path: `collection/v1/payment-billing?paymentCollectionId=${data}`,
    path: `collection/v1/payment-method/${data}`,
    testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-method/${data}`,
    method: 'GET'
  });
}

/** EDIT COLLECTION*/
function editCollection(data) {
  return ApiRest({
    path: 'collection/v1/payment',
    method: 'PATCH',
    params: data
  });
}

/** DELETE COLLECTION */
function deleteCollection(data) {
  return ApiRest({
    path: `collection/v1/payment/${data}`,
    method: 'DELETE'
  });
}

/** GET BILLING DETAIL */
function getBillingDetail(data) {
  return ApiRest({
    path: `collection/v1/payment-billing/${data}`,
    testpath: `https://e7686c2e-1298-481b-a158-af31670f15b3.mock.pstmn.io/collection/v1/payment-billing/${data}`,
    method: 'GET'
  });
}

export const SfaMethod = {
  getCollectionStatus,
  getSfaDetail,
  getCollectionList,
  getReferenceList,
  getPaymentMethod,
  getAllBank,
  getBankAccount,
  postPaymentMethod,
  postCollectionPayment,
  getStamp,
  getStatusOrder,
  getTransferImage,
  getPrincipal,
  getCollectionLog,
  getCollectionDetail,
  editCollection,
  deleteCollection,
  getBillingDetail
};
