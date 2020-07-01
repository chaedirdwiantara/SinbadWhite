import * as types from '../types';
import createReducer from './createReducer';

const INITIAL_STATE = {
  /** loading */
  loadingGetMerchant: false,
  loadingAddMerchant: false,
  loadingEditMerchant: false,
  refreshGetMerchant: false,
  loadingLoadMoreGetMerchant: false,
  loadingGetPortfolio: false,
  loadingGetMerchantDetail: false,
  loadingGetMerchantLastOrder: false,
  loadingPostActivity: false,
  loadingGetLogAllActivity: false,
  loadingGetLogPerActivity: false,
  loadingGetNoOrderReason: false,
  /** data */
  dataPostActivity: null,
  dataGetLogAllActivity: null,
  dataGetLogPerActivity: null,
  selectedMerchant: null,
  dataGetMerchant: [],
  dataAddMerchant: null,
  dataEditMerchant: null,
  dataEditMerchantVolatile: {
    vehicleAccessibilityId: '',
    vehicleAccessibilityName: '',
    storeTypeId: '',
    storeTypeName: '',
    storeGroupId: '',
    storeGroupName: '',
    storeClustersId: '',
    storeClustersName: '',
    storeSegmentId: '',
    storeSegmentName: '',
    customerHierarchiesId: '',
    customerHierarchiesName: ''
  },
  dataGetMerchantDetail: null,
  dataGetMerchantLastOrder: null,
  dataAddMerchantVolatile: {
    name: '',
    address: '',
    longitude: '',
    latitude: '',
    user: {
      fullName: '',
      idNo: '',
      taxNo: '',
      phone: '',
      roles: [1]
    },
    supplier: {
      supplierId: '',
      supplierName: ''
    },
    detailAddress: {
      province: '',
      city: '',
      district: '',
      urban: ''
    }
  },
  totalDataGetMerchant: 0,
  pageGetMerchant: 0,
  dataGetPortfolio: null,
  merchantChanged: false,
  dataGetNoOrderReason: null,
  dataMerchantVolatile: {
    /** profile information */
    phone: null,
    fullName: null,
    name: null,
    idNo: null,
    taxNo: null,
    idImageUrl: null,
    taxImageUrl: null,
    selfieImageUrl: null,
    /** merchant information */
    numberOfEmployee: null,
    largeArea: null,
    topSellingBrand: null,
    mostWantedBrand: null,
    vehicleAccessibilityName: null,
    vehicleAccessibilityId: null,
    vehicleAccessibilityAmount: null,
    /** merchant address */
    address: null,
    noteAddress: null,
    longitude: null,
    latitude: null,
    province: null,
    city: null,
    district: null,
    urban: null,
    zipCode: null,
    urbanId: null,
    /** merchant profile */
    imageUrl: null,
    ownerId: null,
    storeCode: null,
    phoneNo: null,
    /** merchant classification */
    storeType: null,
    storeGroup: null,
    storeCluster: null,
    storeChannel: null
  },
  /** error */
  errorGetMerchant: null,
  errorAddMerchant: null,
  errorEditMerchant: null,
  errorGetPortfolio: null,
  errorGetMerchantDetail: null,
  errorGetMerchantLastOrder: null,
  errorPostActivity: null,
  errorGetLogAllActivity: null,
  errorGetLogPerActivity: null,
  errorGetNoOrderReason: null
};

export const merchant = createReducer(INITIAL_STATE, {
  /**
   * ==================================
   * DELETE ALL DATA
   * ==================================
   */
  [types.DELETE_ALL_DATA](state, action) {
    return INITIAL_STATE;
  },
  /**
   * ============================
   * SELECTED MERCHANT
   * ============================
   */
  [types.MERCHANT_SELECTED](state, action) {
    return {
      ...state,
      selectedMerchant: action.payload
    };
  },
  /**
   * ====================================
   * FLAG CHANGE MERCHANT FOR ORDER CHECK
   * ====================================
   */
  [types.MERCHANT_CHANGED](state, action) {
    return {
      ...state,
      merchantChanged: action.payload
    };
  },
  /**
   * ==========================
   * PORTFOLIO LIST
   * ==========================
   */
  [types.PORTFOLIO_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetPortfolio: true,
      loadingGetMerchant: true,
      dataGetPortfolio: null,
      errorGetPortfolio: null
    };
  },
  [types.PORTFOLIO_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      dataGetPortfolio: action.payload
    };
  },
  [types.PORTFOLIO_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      errorGetPortfolio: action.payload
    };
  },
  /**
   * ===================
   * MERCHANT LIST
   * ===================
   */
  [types.MERCHANT_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: action.payload.loading,
      errorGetMerchant: null
    };
  },
  [types.MERCHANT_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      totalDataGetMerchant: action.payload.total,
      dataGetMerchant: [...state.dataGetMerchant, ...action.payload.data]
    };
  },
  [types.MERCHANT_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      errorGetMerchant: action.payload
    };
  },
  [types.MERCHANT_GET_RESET](state, action) {
    return {
      ...state,
      pageGetMerchant: 0,
      totalDataGetMerchant: 0,
      dataGetMerchant: []
    };
  },
  [types.MERCHANT_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetMerchant: true,
      loadingGetMerchant: true,
      pageGetMerchant: 0,
      totalDataGetMerchant: 0,
      dataGetMerchant: []
    };
  },
  [types.MERCHANT_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetMerchant: true,
      pageGetMerchant: action.payload
    };
  },
  /**
   * ==========================
   * MERCHANT DETAIL
   * ==========================
   */
  [types.MERCHANT_GET_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: true,
      dataGetMerchantDetail: null,
      errorGetMerchantDetail: null
    };
  },
  [types.MERCHANT_GET_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      dataGetMerchantDetail: action.payload,
      dataMerchantVolatile: saveDataMerchantVolatile(action.payload)
    };
  },
  [types.MERCHANT_GET_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      errorGetMerchantDetail: action.payload
    };
  },
  /**
   * ==================================
   * SAVE VOLATILE DATA MERCHANT
   * =================================
   */
  [types.MERCHANT_SAVE_DATA_VOLATILE](state, action) {
    const dataUpdate = action.payload;
    const dataPrevious = state.dataMerchantVolatile;
    return {
      ...state,
      dataMerchantVolatile: {
        /** profile information */
        phone: checkData('phone', dataUpdate, dataPrevious),
        fullName: checkData('fullName', dataUpdate, dataPrevious),
        name: checkData('name', dataUpdate, dataPrevious),
        idNo: checkData('idNo', dataUpdate, dataPrevious),
        taxNo: checkData('taxNo', dataUpdate, dataPrevious),
        idImageUrl: checkData('idImageUrl', dataUpdate, dataPrevious),
        taxImageUrl: checkData('taxImageUrl', dataUpdate, dataPrevious),
        selfieImageUrl: checkData('selfieImageUrl', dataUpdate, dataPrevious),
        /** merchant information */
        numberOfEmployee: checkData(
          'numberOfEmployee',
          dataUpdate,
          dataPrevious
        ),
        largeArea: checkData('largeArea', dataUpdate, dataPrevious),
        topSellingBrand: checkData('topSellingBrand', dataUpdate, dataPrevious),
        mostWantedBrand: checkData('mostWantedBrand', dataUpdate, dataPrevious),
        vehicleAccessibilityName: checkData(
          'vehicleAccessibilityName',
          dataUpdate,
          dataPrevious
        ),
        vehicleAccessibilityId: checkData(
          'vehicleAccessibilityId',
          dataUpdate,
          dataPrevious
        ),
        vehicleAccessibilityAmount: checkData(
          'vehicleAccessibilityAmount',
          dataUpdate,
          dataPrevious
        ),
        /** merchant address */
        address: checkData('address', dataUpdate, dataPrevious),
        noteAddress: checkData('noteAddress', dataUpdate, dataPrevious),
        longitude: checkData('longitude', dataUpdate, dataPrevious),
        latitude: checkData('latitude', dataUpdate, dataPrevious),
        province: checkData('province', dataUpdate, dataPrevious),
        city: checkData('city', dataUpdate, dataPrevious),
        district: checkData('district', dataUpdate, dataPrevious),
        urban: checkData('urban', dataUpdate, dataPrevious),
        zipCode: checkData('zipCode', dataUpdate, dataPrevious),
        urbanId: checkData('urbanId', dataUpdate, dataPrevious),
        /** merchant profile */
        imageUrl: checkData('imageUrl', dataUpdate, dataPrevious),
        ownerId: checkData('ownerId', dataUpdate, dataPrevious),
        storeCode: checkData('storeCode', dataUpdate, dataPrevious),
        phoneNo: checkData('phoneNo', dataUpdate, dataPrevious),
        /** merchant classification */
        storeType: checkData('storeType', dataUpdate, dataPrevious),
        storeGroup: checkData('storeGroup', dataUpdate, dataPrevious),
        storeCluster: checkData('storeCluster', dataUpdate, dataPrevious),
        storeChannel: checkData('storeChannel', dataUpdate, dataPrevious)
      }
    };
  },
  /**
   * =============================
   * ADD MERCHANT
   * =============================
   */
  [types.MERCHANT_ADD_PROCESS](state, action) {
    return {
      ...state,
      loadingAddMerchant: true,
      dataAddMerchant: null,
      errorAddMerchant: null
    };
  },
  [types.MERCHANT_ADD_SUCCESS](state, action) {
    return {
      ...state,
      loadingAddMerchant: false,
      dataAddMerchant: action.payload,
      dataAddMerchantVolatile: INITIAL_STATE.dataAddMerchantVolatile
    };
  },
  [types.MERCHANT_ADD_FAILED](state, action) {
    return {
      ...state,
      loadingAddMerchant: false,
      errorAddMerchant: action.payload
    };
  },
  /**
   * =============================
   * EDIT MERCHANT
   * =============================
   */
  [types.MERCHANT_EDIT_PROCESS](state, action) {
    return {
      ...state,
      loadingEditMerchant: true,
      dataEditMerchant: null,
      errorEditMerchant: null
    };
  },
  [types.MERCHANT_EDIT_SUCCESS](state, action) {
    return {
      ...state,
      loadingEditMerchant: false,
      dataGetMerchantDetail: action.payload,
      dataEditMerchant: action.payload
    };
  },
  [types.MERCHANT_EDIT_FAILED](state, action) {
    return {
      ...state,
      loadingEditMerchant: false,
      errorEditMerchant: action.payload
    };
  },
  /**
   * ==========================
   * MERCHANT LAST ORDER
   * ==========================
   */
  [types.MERCHANT_GET_LAST_ORDER_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: true,
      dataGetMerchantLastOrder: null,
      errorGetMerchantLastOrder: null
    };
  },
  [types.MERCHANT_GET_LAST_ORDER_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: false,
      dataGetMerchantLastOrder: action.payload.lastOrder
    };
  },
  [types.MERCHANT_GET_LAST_ORDER_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchantLastOrder: false,
      errorGetMerchantLastOrder: action.payload
    };
  },
  /**
   * =============================
   * POST ACTIVITY
   * =============================
   */
  [types.MERCHANT_POST_ACTIVITY_PROCESS](state, action) {
    return {
      ...state,
      loadingPostActivity: true,
      dataPostActivity: null,
      errorPostActivity: null
    };
  },
  [types.MERCHANT_POST_ACTIVITY_SUCCESS](state, action) {
    return {
      ...state,
      loadingPostActivity: false,
      dataPostActivity: action.payload
    };
  },
  [types.MERCHANT_POST_ACTIVITY_FAILED](state, action) {
    return {
      ...state,
      loadingPostActivity: false,
      errorPostActivity: action.payload
    };
  },
  /**
   * =============================
   * GET LOG ALL ACTIVITY MERCHANT
   * =============================
   */
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: true,
      dataGetLogAllActivity: null,
      errorGetLogAllActivity: null
    };
  },
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: false,
      dataGetLogAllActivity: action.payload
    };
  },
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: false,
      errorGetLogAllActivity: action.payload
    };
  },
  /**
   * =============================
   * GET LOG PER ACTIVITY MERCHANT
   * =============================
   */
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: true,
      dataGetLogPerActivity: null,
      errorGetLogPerActivity: null
    };
  },
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: false,
      dataGetLogPerActivity: action.payload.data
    };
  },
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: false,
      errorGetLogPerActivity: action.payload
    };
  },
  /**
   * =============================
   * GET LOG PER ACTIVITY MERCHANT
   * =============================
   */
  [types.MERCHANT_NO_ORDER_REASON_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetNoOrderReason: true,
      dataGetNoOrderReason: null,
      errorGetNoOrderReason: null
    };
  },
  [types.MERCHANT_NO_ORDER_REASON_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetNoOrderReason: false,
      dataGetNoOrderReason: action.payload.data
    };
  },
  [types.MERCHANT_NO_ORDER_REASON_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetNoOrderReason: false,
      errorGetNoOrderReason: action.payload
    };
  }
});
/**
 * ===========================
 * FUNCTION SERVICE
 * ============================
 */
/** === CHECK DATA UNDEFINED OR NOT === */
function checkData(key, dataUpdate, dataPrevious) {
  return dataUpdate[key] !== undefined ? dataUpdate[key] : dataPrevious[key];
}
/** === SAVE DATA VOLATILE MERCHANT === */
function saveDataMerchantVolatile(data) {
  return {
    /** for owner data */
    ownerId: data.owner.id,
    fullName: data.owner.fullName,
    email: data.owner.email,
    phone: data.owner.mobilePhoneNo,
    idNo: data.owner.idNo,
    taxNo: data.owner.taxNo,
    taxImageUrl: data.owner.taxImageUrl,
    idImageUrl: data.owner.idImageUrl,
    selfieImageUrl: data.owner.idImageUrl,
    /** for merchant information */
    storeCode: data.storeCode,
    name: data.name,
    phoneNo: data.phoneNo,
    imageUrl: data.imageUrl,
    /** for merchant completeness information */
    numberOfEmployee: data.numberOfEmployee,
    largeArea: data.largeArea,
    topSellingBrand: data.topSellingBrand,
    mostWantedBrand: data.mostWantedBrand,
    vehicleAccessibilityId: data.vehicleAccessibilityId,
    vehicleAccessibilityName:
      data.vehicleAccessibility !== null ? data.vehicleAccessibility.name : '',
    vehicleAccessibilityAmount: data.vehicleAccessibilityAmount,
    /** for address */
    address: data.address,
    noteAddress: data.noteAddress,
    longitude: data.longitude,
    latitude: data.latitude,
    urbanId: data.urbanId,
    province: data.urban !== null ? data.urban.province.name : '',
    city: data.urban !== null ? data.urban.city : '',
    district: data.urban !== null ? data.urban.district : '',
    urban: data.urban !== null ? data.urban.urban : '',
    zipCode: data.urban !== null ? data.urban.zipCode : '',
    /** for store clasification */
    storeType: data.storeTypes.length > 0 ? data.storeTypes[0].type.name : '',
    storeGroup:
      data.storeGroups.length > 0 ? data.storeGroups[0].group.name : '',
    storeCluster:
      data.storeClusters.length > 0 ? data.storeClusters[0].cluster.name : '',
    storeChannel:
      data.storeChannels.length > 0 ? data.storeChannels[0].channel.name : ''
  };
}
