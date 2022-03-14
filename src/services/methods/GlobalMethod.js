import ApiRest from '../apiRest';
import ApiRestMap from '../apiRestMap';
import { Store } from '../../state/Store';
import { DEFAULT_PRIVILEGE } from '../../helpers/RoleBaseAccessControl';

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
    case 'warehouse':
      listAndSearchApi = `warehouses?supplierIds=${JSON.stringify(
        userSupplierMapping()
      )}&urbanId=${parseInt(
        stateData.global.dataGetUrbanId !== null
          ? stateData.global.dataGetUrbanId[0].id
          : stateData.merchant.dataMerchantVolatile.urbanId,
        10
      )}&`;
      break;
    case 'storeType':
      listAndSearchApi = `types?supplierIds=${JSON.stringify(
        userSupplierMapping()
      )}&status=active&`;
      break;
    case 'storeGroup':
      listAndSearchApi = `groups?supplierIds=${JSON.stringify(
        userSupplierMapping()
      )}&status=active&`;
      break;
    case 'storeCluster':
      listAndSearchApi = `clusters?supplierIds=${JSON.stringify(
        userSupplierMapping()
      )}&status=active&`;
      break;
    case 'storeChannel':
      listAndSearchApi = `channels?supplierIds=${JSON.stringify(
        userSupplierMapping()
      )}&status=active&`;
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
 * ==========================
 * UPLOAD PHOTO
 * ==========================
 */
function uploadImage(data) {
  return ApiRest({
    path: 'upload-user-photo',
    method: 'POST',
    params: data
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
    if (stateData.merchant.selectedMerchant.urbanId !== null) {
      return stateData.merchant.selectedMerchant.urbanId;
    }
    return '';
  }
  return '';
}
/** MERCHAN STORE ID */
function merchantStoreId() {
  const stateData = Store.getState();
  if (stateData.merchant.selectedMerchant !== null) {
    if (stateData.merchant.selectedMerchant.storeId !== null) {
      return stateData.merchant.selectedMerchant.storeId;
    }
    return '';
  }
  return '';
}
/** USER STORE */
function userStoreId() {
  const stateData = Store.getState();
  return stateData.user !== null ? stateData.user.userStores[0].storeId : '';
}

//** FORMATTER TEXTINPUT */
function addGaps(string = '', gaps, spacer) {
  const offsets = [0].concat(gaps).concat([string.length]);
  return offsets
    .map((end, index) => {
      if (index === 0) return '';
      const start = offsets[index - 1];
      return string.substr(start, end - start);
    })
    .filter(part => part !== '')
    .join(spacer);
}
/** ROLE BASE ACCESS CONTROL */
export function remappingPrivilege(privilege) {
  if (!privilege || privilege.length === 0) {
    return DEFAULT_PRIVILEGE;
  }
  const temp = { ...DEFAULT_PRIVILEGE };
  if (Array.isArray(privilege)) {
    for (const key in temp) {
      let flag = false;
      privilege.forEach(el => {
        if (temp[key].name === el.privilege) {
          flag = true;
          return;
        }
      });
      temp[key].status = flag;
    }
  }
  return temp;
}

export const GlobalMethod = {
  getListAndSearch,
  getAddressFromLongLat,
  getUrbanId,
  getVersion,
  merchantStoreUrban,
  merchantStoreId,
  userSupplierMapping,
  userStoreId,
  addGaps,
  uploadImage,
  remappingPrivilege
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
 * -> Remove unused function
 *
 */
