import ApiRest from '../apiRest';
import { GlobalMethod } from '../methods/GlobalMethod';

function getPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      GlobalMethod.userSupplierMapping()
    )}&searchName=${encodeURIComponent(data.search)}&status=active&sort=${
      data.sort
    }&sortby=${data.sortBy}&storeId=${GlobalMethod.merchantStoreId()}&invoiceGroupIds=${JSON.stringify(data.invoiceGroupIds)}`,
    method: 'GET'
  });
}
/** GET SEARCH PDP */
function getSearchPdp(data) {
  return ApiRest({
    path: `catalogues?$skip=${data.page}&$limit=10&supplierIds=${JSON.stringify(
      GlobalMethod.userSupplierMapping()
    )}&searchName=${encodeURIComponent(data.search)}&status=active&sort=${
      data.sort
    }&sortby=${data.sortBy}&storeId=${GlobalMethod.merchantStoreId()}&invoiceGroupIds=${JSON.stringify(data.invoiceGroupIds)}`,
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
 * updatedBy: dyah
 * updatedDate: 11062021
 * updatedFunction:
 * -> add parameter invoiceGroupIds (pdpGetProcess)
 */
