import ApiRest from '../apiRest';

function getMerchant() {
  return ApiRest({
    path: 'agent-store-lists?$skip=0&$limit=10&portfolioId=1&keyword=',
    method: 'GET'
  });
}

export const MerchantMethod = {
  getMerchant
};
