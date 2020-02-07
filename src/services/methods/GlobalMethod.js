import ApiRest from '../apiRest';
import ApiRestMap from '../apiRestMap';

function getListAndSearch(data) {
  /**
   * PROPS
   * data.type =  'vehicleMerchant' / 'hierarchyMerchant' / 'clusterMerchant' / 'typeMerchant' / 'groupMerchant' / 'segmentMerchant'
   * data.page = for pagination (all type)
   * data.search = for search keyword (all type)
   */
  let listAndSearchApi = '';
  switch (data.type) {
    case 'hierarchyMerchant':
      listAndSearchApi = `hierarchies?supplierIds=${JSON.stringify(
        data.supplierId
      )}&`;
      break;
    case 'clusterMerchant':
      listAndSearchApi = `clusters?supplierIds=${JSON.stringify(
        data.supplierId
      )}&`;
      break;
    case 'typeMerchant':
      listAndSearchApi = 'store-types?';
      break;
    case 'groupMerchant':
      listAndSearchApi = 'store-groups?';
      break;
    case 'suplierMerchant':
      listAndSearchApi = `suppliers?userId=${data.userId}&`;
      break;
    case 'segmentMerchant':
      listAndSearchApi = 'store-segments?';
      break;
    case 'vehicleMerchant':
      listAndSearchApi = 'vehicle-accessibilities?';
      break;
    default:
      break;
  }
  return ApiRest({
    path: `${listAndSearchApi}$skip=${data.page}&$limit=20&keyword=${data.search}`,
    method: 'GET'
  });
}
/**
 * ============================
 * GET ADDRESSS FROM LONG LAT
 * ============================
 */
/** === TES MAPS  */
function getAddressFromLongLat(data) {
  return ApiRestMap({
    path: `&latlng=${data.latitude},${data.longitude}`,
    method: 'GET'
  });
}

export const GlobalMethod = {
  getListAndSearch,
  getAddressFromLongLat
};
