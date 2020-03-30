import ApiRest from '../apiRest';
import { GlobalMethod } from '../methods/GlobalMethod';

function getPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      data.supplierId
    )}&searchName=${data.search}&status=active&sort=${data.sort}&sortby=${
      data.sortBy
    }`,
    method: 'GET'
  });
}
/** GET PDP SKU DETAIL */
function getDetailPdp(pdpId) {
  return ApiRest({
    path: `catalogues/${pdpId}${GlobalMethod.userStoreUrban()}`,
    method: 'GET'
  });
}

export const PdpMethod = {
  getPdp,
  getDetailPdp
};
