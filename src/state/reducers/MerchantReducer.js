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
   * ==================================
   * SAVE VOLATILE DATA TO EDIT MERCHANT
   * =================================
   */
  [types.MERCHANT_EDIT_DATA_VOLATILE](state, action) {
    return {
      ...state,
      dataEditMerchantVolatile: {
        vehicleAccessibilityId: action.payload.vehicleAccessibilityId
          ? action.payload.vehicleAccessibilityId
          : state.dataEditMerchantVolatile.vehicleAccessibilityId,
        vehicleAccessibilityName: action.payload.vehicleAccessibilityName
          ? action.payload.vehicleAccessibilityName
          : state.dataEditMerchantVolatile.vehicleAccessibilityName,
        storeTypeId: action.payload.storeTypeId
          ? action.payload.storeTypeId
          : state.dataEditMerchantVolatile.storeTypeId,
        storeTypeName: action.payload.storeTypeName
          ? action.payload.storeTypeName
          : state.dataEditMerchantVolatile.storeTypeName,
        storeGroupId: action.payload.storeGroupId
          ? action.payload.storeGroupId
          : state.dataEditMerchantVolatile.storeGroupId,
        storeGroupName: action.payload.storeGroupName
          ? action.payload.storeGroupName
          : state.dataEditMerchantVolatile.storeGroupName,
        storeClustersId: action.payload.storeClustersId
          ? action.payload.storeClustersId
          : state.dataEditMerchantVolatile.storeClustersId,
        storeClustersName: action.payload.storeClustersName
          ? action.payload.storeClustersName
          : state.dataEditMerchantVolatile.storeClustersName,
        storeChannelId: action.payload.storeChannelId
          ? action.payload.storeChannelId
          : state.dataEditMerchantVolatile.storeChannelId,
        storeChannelName: action.payload.storeChannelName
          ? action.payload.storeChannelName
          : state.dataEditMerchantVolatile.storeChannelName
      }
    };
  },
  /**
   * ==================================
   * SAVE VOLATILE DATA TO ADD MERCHANT
   * =================================
   */
  [types.MERCHANT_ADD_DATA_VOLATILE](state, action) {
    return {
      ...state,
      dataAddMerchantVolatile: {
        name: action.payload.name ? action.payload.name : '',
        address: action.payload.address ? action.payload.address : '',
        longitude: action.payload.longitude ? action.payload.longitude : '',
        latitude: action.payload.latitude ? action.payload.latitude : '',
        user: {
          fullName: action.payload.fullName ? action.payload.fullName : '',
          idNo: action.payload.idNo ? action.payload.idNo : '',
          taxNo: action.payload.taxNo ? action.payload.taxNo : '',
          phone: action.payload.phone ? action.payload.phone : '',
          roles: [1]
        },
        supplier: {
          supplierId: action.payload.supplierId
            ? action.payload.supplierId
            : '',
          supplierName: action.payload.supplierName
            ? action.payload.supplierName
            : ''
        },
        detailAddress: {
          province: action.payload.province ? action.payload.province : '',
          city: action.payload.city ? action.payload.city : '',
          district: action.payload.district ? action.payload.district : '',
          urban: action.payload.urban ? action.payload.urban : ''
        }
      }
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
      dataEditMerchantVolatile: {
        vehicleAccessibilityId:
          action.payload.vehicleAccessibilityId !== null
            ? action.payload.vehicleAccessibilityId
            : '',
        vehicleAccessibilityName:
          action.payload.vehicleAccessibility !== null
            ? action.payload.vehicleAccessibility.name
            : '',
        storeTypeId:
          action.payload.storeTypes.length > 0
            ? action.payload.storeTypes[0].type.id
            : '',
        storeTypeName:
          action.payload.storeTypes.length > 0
            ? action.payload.storeTypes[0].type.name
            : '',
        storeGroupId:
          action.payload.storeGroups.length > 0
            ? action.payload.storeGroups[0].group.id
            : '',
        storeGroupName:
          action.payload.storeGroups.length > 0
            ? action.payload.storeGroups[0].group.name
            : '',
        storeClusterId:
          action.payload.storeClusters.length > 0
            ? action.payload.storeClusters[0].cluster.id
            : '',
        storeClusterName:
          action.payload.storeClusters.length > 0
            ? action.payload.storeClusters[0].cluster.name
            : '',
        storeChannelId:
          action.payload.storeChannels.length > 0
            ? action.payload.storeChannels[0].channel.id
            : '',
        storeChannelName:
          action.payload.storeChannels.length > 0
            ? action.payload.storeChannels[0].channel.name
            : ''
      }
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
