import ApiRest from '../apiRest';
import { GlobalMethod } from '../methods/GlobalMethod';

function getPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      GlobalMethod.userSupplierMapping()
    )}&searchName=${data.search}&status=active&sort=${data.sort}&sortby=${
      data.sortBy
    }`,
    method: 'GET'
  });
}
/** GET SEARCH PDP */
function getSearchPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      GlobalMethod.userSupplierMapping()
    )}&searchName=${data.search}&status=active&sort=${data.sort}&sortby=${
      data.sortBy
    }`,
    method: 'GET'
  });
}
/** GET PDP SKU DETAIL */
function getDetailPdp(pdpId) {
  return ApiRest({
    path: `catalogues/${pdpId}?urbanId=${GlobalMethod.merchantStoreUrban()}&storeId=${GlobalMethod.merchantStoreId()}`,
    method: 'GET'
  });
}

export const PdpMethod = {
  getPdp,
  getDetailPdp,
  getSearchPdp
};

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: tatas
* updatedDate: 06072020
* updatedFunction:
* -> Change global method
*/

