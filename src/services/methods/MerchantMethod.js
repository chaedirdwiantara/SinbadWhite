import ApiRest from '../apiRest';

function getMerchant(data) {
  return ApiRest({
    path: `agent-store-lists?$skip=${data.page}&$limit=10&portfolioId=${data.portfolioId}&keyword=${data.search}`,
    method: 'GET'
  });
}

function getPortfolioByUserId(userId) {
  return ApiRest({
    path: `portfolios?userId=${userId}&paginate=false`,
    method: 'GET'
  });
}

export const MerchantMethod = {
  getMerchant,
  getPortfolioByUserId
};
