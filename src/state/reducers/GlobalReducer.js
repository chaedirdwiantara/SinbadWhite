import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetListAndSearch: false,
  refreshGetListAndSearch: false,
  loadingLoadMoreGetListAndSearch: false,
  loadingGlobalLongLatToAddress: false,
  loadingGetVersion: false,
  loadingGetUrbanId: false,
  loadingUploadImage: false,
  /** data */
  search: '',
  longitude: '',
  latitude: '',
  pageAddMerchantFrom: '',
  pageAreaMappingFrom: '',
  imageBase64: '',
  isPickedFromGallery: false,
  dataGetListAndSearch: [],
  totalDataGetListAndSearch: 0,
  pageGetListAndSearch: 0,
  dataGlobalLongLatToAddress: null,
  dataGetVersion: null,
  dataOpenModalManualInputLocation: false,
  dataLocationVolatile: {
    provinceId: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    urbanName: '',
    zipCode: ''
  },
  dataGetUrbanId: null,
  dataUploadImage: null,
  /** error */
  errorGetListAndSearch: null,
  errorGlobalLongLatToAddress: null,
  errorGetVersion: null,
  errorGetUrbanId: null,
  errorUploadImage: null
};

export const global = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   * - token
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ===================
   * TOKEN
   * ===================
   */
  [types.SIGN_IN_SUCCESS](state, action) {
    return {
      ...state,
      token: action.payload.token
    };
  },
  /**
   * ==============================
   * SAVE IMAGE BASE64
   * ==============================
   */
  [types.SAVE_IMAGE_BASE64](state, action) {
    return {
      ...state,
      imageBase64: action.payload
    };
  },
  /**
   * ================================
   * ADD DATA IF PHONE EXIST
   * ================================
   */
  [types.CHECK_PHONE_NUMBER_AVAILABLE_SUCCESS](state, action) {
    return {
      ...state,
      longitude:
        action.payload.store !== null ? action.payload.store.longitude : '',
      latitude:
        action.payload.store !== null ? action.payload.store.latitude : '',
      dataGetUrbanId:
        action.payload.store !== null
          ? [
              {
                id: action.payload.store.urbanId
              }
            ]
          : null
    };
  },
  /**
   * ==================================
   * SAVE PAGE THAT ADD MERCHANT BEGIN
   * ==================================
   */
  [types.SAVE_PAGE_ADD_MERCHANT_FROM](state, action) {
    return {
      ...state,
      pageAddMerchantFrom: action.payload,
      longitude: '',
      latitude: '',
      dataGlobalLongLatToAddress: null
    };
  },
  /**
   * ======================
   * SEARCH TEXT
   * ======================
   */
  [types.SEARCH_TEXT](state, action) {
    return {
      ...state,
      search: action.payload
    };
  },
  /**
   * =====================
   * SAVE LONG LAT FROM ADDRESS DETAIL MERCHANT (FOR EDIT)
   * ====================
   */
  [types.LOCATION_SAVE_DATA_VOLATILE](state, action) {
    return {
      ...state,
      longitude: action.payload.longitude,
      latitude: action.payload.latitude
    };
  },
  /**
   * ================================
   * OPEN MODAL MANUAL INPUT LOCATION
   * ================================
   */
  [types.GLOBAL_MANUAL_INPUT_LOCATION](state, action) {
    return {
      ...state,
      dataOpenModalManualInputLocation: action.payload
    };
  },
  /**
   * ============================
   * SAVE MANUAL INPUT LOCATION
   * =============================
   */
  [types.GLOBAL_MANUAL_INPUT_LOCATION_DATA_VOLATILE](state, action) {
    const dataUpdate = action.payload;
    const dataPrevious = state.dataLocationVolatile;
    return {
      ...state,
      dataLocationVolatile: {
        provinceId: checkData('provinceId', dataUpdate, dataPrevious),
        provinceName: checkData('provinceName', dataUpdate, dataPrevious),
        cityName: checkData('cityName', dataUpdate, dataPrevious),
        districtName: checkData('districtName', dataUpdate, dataPrevious),
        urbanName: checkData('urbanName', dataUpdate, dataPrevious),
        zipCode: checkData('zipCode', dataUpdate, dataPrevious)
      }
    };
  },
  /**
   * ============================
   * RESET MANUAL INPUT LOCATION
   * =============================
   */
  [types.RESET_MANUAL_INPUT_LOCATION_DATA](state, action) {
    return {
      ...state,
      dataLocationVolatile: INITIAL_STATE.dataLocationVolatile,
    };
  },
  /**
   * ===================================
   * GET URBAN ID
   * ===================================
   */
  [types.GET_URBAN_ID_PROCESS](state, action) {
    return {
      ...state,
      loadingGetUrbanId: true,
      dataGetUrbanId: null,
      errorGetUrbanId: null
    };
  },
  [types.GET_URBAN_ID_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetUrbanId: false,
      dataGetUrbanId: action.payload.data
    };
  },
  [types.GET_URBAN_ID_FAILED](state, action) {
    return {
      ...state,
      loadingGetUrbanId: false,
      errorGetUrbanId: action.payload
    };
  },
  /**
   * ===================
   * LOCATION LIST
   * ===================
   */
  [types.LIST_AND_SEARCH_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetListAndSearch: action.payload.loading,
      errorGetListAndSearch: null
    };
  },
  [types.LIST_AND_SEARCH_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetListAndSearch: false,
      loadingLoadMoreGetListAndSearch: false,
      refreshGetListAndSearch: false,
      totalDataGetListAndSearch: action.payload.total,
      dataGetListAndSearch: [
        ...state.dataGetListAndSearch,
        ...action.payload.data
      ]
    };
  },
  [types.LIST_AND_SEARCH_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetListAndSearch: false,
      loadingLoadMoreGetListAndSearch: false,
      refreshGetListAndSearch: false,
      errorGetListAndSearch: action.payload
    };
  },
  [types.LIST_AND_SEARCH_GET_RESET](state, action) {
    return {
      ...state,
      pageGetListAndSearch: 0,
      totalDataGetListAndSearch: 0,
      dataGetListAndSearch: []
    };
  },
  [types.LIST_AND_SEARCH_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetListAndSearch: true,
      loadingGetListAndSearch: true,
      pageGetListAndSearch: 0,
      totalDataGetListAndSearch: 0,
      dataGetListAndSearch: []
    };
  },
  [types.LIST_AND_SEARCH_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetListAndSearch: true,
      pageGetListAndSearch: action.payload
    };
  },
  /**
   * ================================================
   * THIS FOR GET ADDRESS FROM LONG LAT GOOGLE MAPS
   * ================================================
   */
  [types.GLOBAL_LONGLAT_TO_ADDRESS_PROCESS](state, action) {
    return {
      ...state,
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
      loadingGlobalLongLatToAddress: true,
      dataGlobalLongLatToAddress: null,
      errorGlobalLongLatToAddress: null
    };
  },
  [types.GLOBAL_LONGLAT_TO_ADDRESS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGlobalLongLatToAddress: false,
      dataGlobalLongLatToAddress: {
        province: action.payload.province,
        city: action.payload.city,
        district: action.payload.district,
        urban: action.payload.urban
      }
    };
  },
  [types.GLOBAL_LONGLAT_TO_ADDRESS_FAILED](state, action) {
    return {
      ...state,
      loadingGlobalLongLatToAddress: false,
      errorGlobalLongLatToAddress: action.payload,
      dataLocationVolatile: INITIAL_STATE.dataLocationVolatile
    };
  },
  /**
   * ===================================
   * GET VERSION
   * ===================================
   */
  [types.APP_VERSION_PROCESS](state, action) {
    return {
      ...state,
      loadingGetVersion: true,
      dataGetVersion: null,
      errorGetVersion: null
    };
  },
  [types.APP_VERSION_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetVersion: false,
      dataGetVersion: action.payload
    };
  },
  [types.APP_VERSION_FAILED](state, action) {
    return {
      ...state,
      loadingGetVersion: false,
      errorGetVersion: action.payload
    };
  },
  [types.SAVE_PAGE_AREA_MAPPING_FROM](state, action){
    return {
      ...state,
      pageAreaMappingFrom: action.payload
    }
  },
  /**
   * ===================================
   * UPLOAD IMAGE
   * ===================================
   */
  [types.UPLOAD_IMAGE_PROCESS](state, action) {
    return {
      ...state,
      loadingUploadImage: true,
      dataUploadImage: null,
      errorUploadImage: null
    };
  },
  [types.UPLOAD_IMAGE_SUCCESS](state, action) {
    return {
      ...state,
      loadingUploadImage: false,
      dataUploadImage: action.payload
    };
  },
  [types.UPLOAD_IMAGE_FAILED](state, action) {
    return {
      ...state,
      loadingUploadImage: false,
      errorUploadImage: action.payload
    };
  },
  [types.SET_PICKED_FROM_GALLERY](state, action) {
    return {
      ...state,
      isPickedFromGallery: action.payload
    };
  }
});
/**
 * ===========================
 * FUNCTION SERVICE
 * ============================
 */
/** === CHECK DATA EXIST OR NOT ===  */
function checkData(key, dataUpdate, dataPrevious) {
  return dataUpdate[key] !== undefined ? dataUpdate[key] : dataPrevious[key];
}
