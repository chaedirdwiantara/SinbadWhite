import ApiRest from '../apiRest';
import ApiRestMap from '../apiRestMap';
import { Store } from '../../state/Store';

function getListAndSearch(data) {
  const stateData = Store.getState();
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
    case 'numberOfEmployeeMerchant':
      listAndSearchApi = 'number-of-employees?';
      break;
    case 'province':
      listAndSearchApi = 'provinces?';
      break;
    case 'city':
      listAndSearchApi = `locations?type=city&provinceId=${
        stateData.global.dataLocationVolatile.provinceId
      }&`;
      break;
    case 'district':
      listAndSearchApi = `locations?type=district&city=${
        stateData.global.dataLocationVolatile.cityName
      }&`;
      break;
    case 'urban':
      listAndSearchApi = `locations?type=urban&district=${
        stateData.global.dataLocationVolatile.districtName
      }&`;
      break;
    default:
      break;
  }
  return ApiRest({
    path: `${listAndSearchApi}$skip=${data.page}&$limit=20&keyword=${
      data.search
    }`,
    method: 'GET'
  });
}
/**
 * ============================
 * GET ADDRESSS FROM LONG LAT
 * ============================
 */
/** === GET MAP GOOGLE === */
function getAddressFromLongLat(data) {
  return ApiRestMap({
    path: `&latlng=${data.latitude},${data.longitude}`,
    method: 'GET'
  });
}
/**
 * ============================
 * GET URBAN ID
 * ============================
 */
function getUrbanId(data) {
  return ApiRest({
    path: 'location-search',
    method: 'POST',
    params: data
  });
}
/** === GET VERSION === */
function getVersion() {
  return ApiRest({
    path: 'check-version',
    method: 'GET'
  });
}
/**
 * =========================================
 * THIS CODE IS NOT FETCHING (ONLY FUNCTION)
 * =========================================
 */
/** MAPPING SUPPLIER MERCHANT */
function merchantSupplierMapping() {
  const stateData = Store.getState();
  return stateData.merchant.selectedMerchant !== null
    ? stateData.merchant.selectedMerchant.store.supplierStores.map(
        item => item.supplierId
      )
    : '';
}
/** MAPPING SUPPLIER AGENT */
function userSupplierMapping() {
  const stateData = Store.getState();
  return stateData.user !== null
    ? stateData.user.userSuppliers.map(item => parseInt(item.supplierId, 10))
    : '';
}
/** MERCHANT STORE URBAN */
function merchantStoreUrban() {
  const stateData = Store.getState();
  if (stateData.merchant.selectedMerchant !== null) {
    if (stateData.merchant.selectedMerchant.store.urbanId !== null) {
      return stateData.merchant.selectedMerchant.store.urbanId;
    }
    return '';
  }
  return '';
}
/** MERCHAN STORE ID */
function merchantStoreId() {
  const stateData = Store.getState();
  if (stateData.merchant.selectedMerchant !== null) {
    if (stateData.merchant.selectedMerchant.store.id !== null) {
      return stateData.merchant.selectedMerchant.store.id;
    }
    return '';
  }
  return '';
}

export const GlobalMethod = {
  getListAndSearch,
  getAddressFromLongLat,
  getUrbanId,
  getVersion,
  merchantStoreUrban,
  merchantStoreId,
  merchantSupplierMapping,
  userSupplierMapping
};
