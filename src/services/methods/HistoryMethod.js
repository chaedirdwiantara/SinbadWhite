import ApiRest from '../apiRest';
/** GET CART ITEM */
function getHistory(data) {
  return ApiRest({
    path: `get-parcel?userId=${data.userId}&storeId=${
      data.storeId
    }&$limit=10&$skip=${data.page}&status=${data.statusOrder}&statusPayment=${
      data.statusPayment
    }&orderGte=${data.dateGte}&orderLte=${
      data.dateLte
    }&portfolioIds=${JSON.stringify(data.portfolioId)}&searchKey=${
      data.search
    }`,
    method: 'GET'
  });
}
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
/** EDIT HISTORY */
function getDetailHistory(parcelId) {
  return ApiRest({
    path: `order-parcels/${parcelId}`,
    method: 'GET'
  });
}

export const HistoryMethod = {
  getHistory,
  getHistoryOrderStatus,
  getHistoryPaymentStatus,
  editHistory,
  getDetailHistory
};
