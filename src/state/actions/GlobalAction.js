import * as types from '../types';
/**
 * ===========================
 * MODAL MANUAL INPUT LOCATION
 * ============================
 */
/** === FLAG FOR MODAL SHOW OR NOT === */
export function modalManualInputLocation(data) {
  return { type: types.GLOBAL_MANUAL_INPUT_LOCATION, payload: data };
}
/** === SAVE VOLATILE DATA === */
export function saveDataManualInputLocation(data) {
  return {
    type: types.GLOBAL_MANUAL_INPUT_LOCATION_DATA_VOLATILE,
    payload: data
  };
}
/** === SAVE MANUAL INPUT LOCATION TO LONG LAT INPUT  */
export function saveDataManualInputLocationToLongLat(data) {
  return {
    type: types.GLOBAL_LONGLAT_TO_ADDRESS_SUCCESS,
    payload: data
  };
}
/**
 * ==============================
 * SEARCH TEXT GLOBAL
 * ==============================
 */
/** === SAVE GLOBAL SEARCH ==== */
export function saveSearch(text) {
  return { type: types.SEARCH_TEXT, payload: text };
}
/**
 * ==============================
 * SAVE IMAGE BASE64
 * ==============================
 */
export function saveImageBase64(image) {
  return { type: types.SAVE_IMAGE_BASE64, payload: image };
}
/**
 * ==============================
 * SAVE PAGE THAT ADD MERCHANT BEGIN
 * ==============================
 */
export function savePageAddMerchantFrom(data) {
  return { type: types.SAVE_PAGE_ADD_MERCHANT_FROM, payload: data };
}
/**
 * ===============================
 * SAVE PAGE THAT AREA MAPPING BEGIN
 * ===============================
 */
export function savePageAreaMappingFrom(data) {
  return { type: types.SAVE_PAGE_AREA_MAPPING_FROM, payload: data };
}
/**
 * ==============================
 * SAVE LONG LAT FROM ADDRESS DETAIL MERCHANT (FOR EDIT)
 * ==============================
 */
export function saveLongLatForEdit(data) {
  return { type: types.LOCATION_SAVE_DATA_VOLATILE, payload: data };
}
/**
 * ============================
 * GET LOCATION
 * ============================
 */
/** === LOCATION GET PROCESS ==== */
export function listAndSearchGetProcess(data) {
  return { type: types.LIST_AND_SEARCH_GET_PROCESS, payload: data };
}
/** === LOCATION GET SUCCESS === */
export function listAndSearchGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.LIST_AND_SEARCH_GET_SUCCESS, payload: data.data };
  }
  return { type: types.LIST_AND_SEARCH_GET_FAILED, payload: data };
}
/** === LOCATION GET FAILED === */
export function listAndSearchGetFailed(data) {
  return { type: types.LIST_AND_SEARCH_GET_FAILED, payload: data };
}
/** === REFRESH GET LOCATION === */
export function listAndSearchGetRefresh() {
  return { type: types.LIST_AND_SEARCH_GET_REFRESH };
}
/** === RESET GET LOCATION === */
export function listAndSearchGetReset() {
  return { type: types.LIST_AND_SEARCH_GET_RESET };
}
/** === LOAD MORE GET LOCATION === */
export function listAndSearchGetLoadMore(page) {
  return { type: types.LIST_AND_SEARCH_GET_LOADMORE, payload: page };
}
/**
 * =========================
 * GET URBAN ID
 * =========================
 */
/** === GET URBAN ID PROCESS === */
export function getUrbanIdProcess(data) {
  return { type: types.GET_URBAN_ID_PROCESS, payload: data };
}
/** === GET URBAN ID SUCCESS === */
export function getUrbanIdSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.GET_URBAN_ID_SUCCESS, payload: data.data };
  }
  return { type: types.GET_URBAN_ID_FAILED, payload: data };
}
/** === GET URBAN ID FAILED === */
export function getUrbanIdFailed(data) {
  return { type: types.GET_URBAN_ID_FAILED, payload: data };
}
/**
 * =========================
 * CLEAR DATA GET URBAN ID
 * =========================
 */
export function clearDataGetUrbanId() {
  return { type: types.GET_URBAN_ID_SUCCESS, payload: { data: null } };
}
/**
 * =========================
 * GET ADDRESS FROM LONG LAT
 * ==========================
 */
/** === GET ADDRESS FROM LONG LAT PROCESS ==== */
export function longlatToAddressGetProcess(data) {
  return { type: types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS, payload: data };
}
/** === GET ADDRESS FROM LONG LAT SUCCESS === */
export function longlatToAddressGetSuccess(data) {
  if (data.result === 'Ok' && data.data.results.length > 0) {
    return {
      type: types.GLOBAL_LONGLAT_TO_ADDRESS_SUCCESS,
      payload: modifyDataAddressFromGmaps(
        data.data.results[0].address_components
      )
    };
  }
  return { type: types.GLOBAL_LONGLAT_TO_ADDRESS_FAILED, payload: data };
}
/** === GET ADDRESS FROM LONG LAT === */
export function longlatToAddressGetFailed(data) {
  return { type: types.GLOBAL_LONGLAT_TO_ADDRESS_FAILED, payload: data };
}
/** === RESET MANUAL LOCATION INPUT DATA === */
export function resetManualLocationInputData() {
  return { type: types.RESET_MANUAL_INPUT_LOCATION_DATA };
}
function modifyDataAddressFromGmaps(data) {
  const dataAddress = {
    province: '',
    city: '',
    district: '',
    urban: ''
  };

  data.map((item, index) => {
    if (item.types.indexOf('administrative_area_level_4') > -1) {
      dataAddress.urban = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_3') > -1) {
      dataAddress.district = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_2') > -1) {
      dataAddress.city = item.long_name;
    }
    if (item.types.indexOf('administrative_area_level_1') > -1) {
      dataAddress.province = item.long_name;
    }
  });
  return dataAddress;
}
/**
 * ======================================
 * CHECK VERSION
 * ======================================
 */
/** === VERSION GET PROCESS === */
export function versionsGetProcess(data) {
  return { type: types.APP_VERSION_PROCESS, payload: data };
}
/** === VERSION GET SUCCESS === */
export function versionsGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.APP_VERSION_SUCCESS, payload: data.data };
  }
  return { type: types.APP_VERSION_FAILED, payload: data };
}
/** === VERSION GET FAILED === */
export function versionsGetFailed(data) {
  return { type: types.APP_VERSION_FAILED, payload: data };
}

/**
 * =========================
 * UPLOAD IMAGE
 * =========================
 */
/** === UPLOAD IMAGE PROCESS === */
export function uploadImageProcess(data) {
  return { type: types.UPLOAD_IMAGE_PROCESS, payload: data };
}
/** === UPLOAD IMAGE SUCCESS === */
export function uploadImageSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.UPLOAD_IMAGE_SUCCESS, payload: data.data };
  }
  return { type: types.UPLOAD_IMAGE_FAILED, payload: data };
}
/** === UPLOAD IMAGE FAILED === */
export function uploadImageFailed(data) {
  return { type: types.UPLOAD_IMAGE_FAILED, payload: data };
}
/**
 * ===========================
 * CLEAR CACHE
 * ==========================
 */
/** === REMOVE ALL DATA === */
export function deleteAllData() {
  return { type: types.DELETE_ALL_DATA };
}
/**
 * ======================
 * MAINTENANCE APP
 * ======================
 */
export function appMaintenance(data) {
  return { type: types.APP_MAINTENANCE, payload: data };
}
/**
 * ======================
 * VERSION APP
 * ======================
 */
export function appVersion(data) {
  return { type: types.APP_VERSION, payload: data };
}
/**
 * ======================
 * GET CATALOGUE_TAXES VALUE
 * ======================
 */
export function getCatalogueTaxesProcess(data) {
  return { type: types.GET_CATALOGUE_TAXES_PROCESS, payload: data };
}
/** === UPLOAD IMAGE SUCCESS === */
export function getCatalogueTaxesSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.GET_CATALOGUE_TAXES_SUCCESS, payload: data.data };
  }
  return { type: types.GET_CATALOGUE_TAXES_FAILED, payload: data };
}
/** === UPLOAD IMAGE FAILED === */
export function getCatalogueTaxesFailed(data) {
  return { type: types.GET_CATALOGUE_TAXES_FAILED, payload: data };
}
/**
 * ========================
 * NOTE
 * ========================
 * - FOR GOOGLE MAPS
 * urban : 'administrative_area_level_4'
 * district: 'administrative_area_level_3'
 * city: 'administrative_area_level_2'
 * province: 'administrative_area_level_1'
 */
