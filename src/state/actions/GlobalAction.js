import * as types from '../types';
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
 * LOCATION (FROM LONGLAT TO ADDRESS)
 * ==============================
 */
/** === SAVE LOCATION VOLATILE DATA === */
export function saveLocationDataVolatile(data) {
  return { type: types.LOCATION_SAVE_DATA_VOLATILE, payload: data };
}
/**
 * ==============================
 * SAVE PAGE THAT ADD MERCHANT BEGIN
 * ==============================
 */
/** === SAVE LOCATION VOLATILE DATA === */
export function savePageAddMerchantFrom(data) {
  return { type: types.SAVE_PAGE_ADD_MERCHANT_FROM, payload: data };
}
/**
 * ============================
 * GET LOCATION
 * ============================
 */
/** === LOCATION GET PROCESS ==== */
export function locationGetProcess(data) {
  return { type: types.LOCATION_GET_PROCESS, payload: data };
}
/** === LOCATION GET SUCCESS === */
export function locationGetSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.LOCATION_GET_SUCCESS, payload: data.data };
  }
  return { type: types.LOCATION_GET_FAILED, payload: data };
}
/** === LOCATION GET FAILED === */
export function locationGetFailed(data) {
  return { type: types.LOCATION_GET_FAILED, payload: data };
}
/** === REFRESH GET LOCATION === */
export function locationGetRefresh() {
  return { type: types.LOCATION_GET_REFRESH };
}
/** === RESET GET LOCATION === */
export function locationGetReset() {
  return { type: types.LOCATION_GET_RESET };
}
/** === LOAD MORE GET LOCATION === */
export function locationGetLoadMore(page) {
  return { type: types.LOCATION_GET_LOADMORE, payload: page };
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
 * ========================
 * NOTE
 * ========================
 * - FOR GOOGLE MAPS
 * urban : 'administrative_area_level_4'
 * district: 'administrative_area_level_3'
 * city: 'administrative_area_level_2'
 * province: 'administrative_area_level_1'
 */
