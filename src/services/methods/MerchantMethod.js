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

export const MerchantMethod = {
  getMerchant,
  getMerchantDetail,
  getPortfolioByUserId
};
