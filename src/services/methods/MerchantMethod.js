import ApiRest from '../apiRest';

/** === MERCHANT LIST === */
function getMerchant(data) {
  return ApiRest({
    path: `agent-stores?$skip=${data.page}&$limit=10&portfolioId=${data.portfolioId}&keyword=${data.search}`,
    method: 'GET'
  });
}
/** === MERCHANT DETAIL === */
function getMerchantDetail(storeId) {
  return ApiRest({
    path: `agent-stores/${storeId}`,
    method: 'GET'
  });
}
/** === PORTFOLIO BY USERID === */
function getPortfolioByUserId(userId) {
  return ApiRest({
    path: `portfolios?userId=${userId}&paginate=false`,
    method: 'GET'
  });
}
/** === ADD MERCHANT === */
function addMerchant(params) {
  return ApiRest({
    path: 'journey-plan-list?storeType=new_store',
    method: 'POST',
    params
  });
}
/** === MERCHANT LAST ORDER === */
function getMerchantLastOrder(storeId) {
  return ApiRest({
    path: `journey-reports/${storeId}`,
    method: 'GET'
  });
}
/** === CHECKIN MERCHANT === */
function checkMerchant(params) {
  return ApiRest({
    path: 'journey-plan-sale-logs',
    method: 'POST',
    params
  });
}

export const MerchantMethod = {
  getMerchant,
  getMerchantDetail,
  getPortfolioByUserId,
  addMerchant,
  getMerchantLastOrder,
  checkMerchant
};
