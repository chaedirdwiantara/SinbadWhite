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
  loadingGetLatestCheckInOut: false,
  loadingGetNoOrderReason: false,
  loadingGetNoVisitReason: false,
  loadingPostNoVisitReason: false,
  loadingGetJourneyBookDetail: false,
  loadingGetStoreStatus: false,
  loadingGetWarehouse: false,
  loadingGetListSurvey: false,
  refreshGetSurveyList: false,
  loadingLoadMoreSurveyList: false,
  loadingGetTotalSurvey: false,
  loadingGetSurvey: false,
  loadingGetSurveyBrand: false,
  loadingGetSurveyResponse: false,
  loadingSubmitSurveyResponse: false,
  loadingValidateAreaMapping: false,
  loadingGetSalesSegmentation: false,
  /** data */
  dataPostActivityV2: null,
  dataGetLogAllActivityV2: null,
  dataGetLogPerActivityV2: null,
  dataGetLatestCheckInOut: null,
  selectedMerchant: null,
  dataGetMerchantV2: [],
  dataGetWarehouse: [],
  dataAddMerchant: null,
  dataEditMerchant: null,
  dataStoreStatus: {},
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
  dataGetMerchantDetailV2: null,
  dataGetMerchantLastOrder: null,
  totalDataGetMerchantV2: 0,
  pageGetMerchantV2: 0,
  dataGetPortfolioV2: null,
  merchantChanged: false,
  dataGetNoOrderReason: null,
  dataGetNoVisitReason: null,
  dataPostNoVisitReason: null,
  dataGetJourneyBookDetail: null,
  dataMerchantRejectedV2: {
    name: null,
    phoneNo: null,
    imageUrl: null
  },
  dataMerchantDisabledField: {
    fullName: false,
    idNo: false,
    taxNo: false,
    storeName: false,
    longLat: false,
    address: false,
    noteAddress: false
  },
  dataMerchantVolatile: {
    storeId: null,
    externalId: null,
    /** profile information */
    phone: null,
    fullName: null,
    name: null,
    idNo: null,
    taxNo: null,
    idImageUrl: null,
    taxImageUrl: null,
    selfieImageUrl: null,
    isEmailVerified: false,
    isMobilePhoneNoVerified: false,
    email: null,
    /** merchant information */
    numberOfEmployee: null,
    largeArea: null,
    topSellingBrand: null,
    mostWantedBrand: null,
    vehicleAccessibilityName: null,
    vehicleAccessibilityId: null,
    vehicleAccessibilityAmount: null,
    warehouse: '',
    warehouseId: null,
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
    storeType: '',
    typeId: null,
    storeGroup: '',
    groupId: null,
    storeCluster: '',
    clusterId: null,
    storeChannel: '',
    channelId: null
  },
  surveyList: {
    payload: {
      data: null
    },
    success: null
  },
  totalDataGetSurveyList: 0,
  pageGetSurveyList: 0,
  dataGetTotalSurvey: null,
  dataGetSurvey: null,
  dataGetSurveyBrand: null,
  newSurveyResponse: false,
  dataSurveyResponse: {
    id: null,
    status: '',
    responsePhoto: []
  },
  dataSubmitSurveyResponse: {
    surveyId: null,
    surveyQuestionId: null,
    storeId: null,
    storeName: '',
    status: '',
    photos: []
  },

  dataValidateAreaMapping: null,
  dataSalesSegmentation: null,
  /** error */
  errorGetMerchantV2: null,
  errorAddMerchant: null,
  errorEditMerchant: null,
  errorGetPortfolioV2: null,
  errorGetMerchantDetailV2: null,
  errorGetMerchantLastOrder: null,
  errorPostActivityV2: null,
  errorGetLogAllActivityV2: null,
  errorGetLogPerActivityV2: null,
  errorGetLatestCheckInOut: null,
  errorGetNoOrderReason: null,
  errorGetNoVisitReason: null,
  errorGetJourneyBookDetail: null,
  errorPostNoVisitReason: null,
  errorGetStoreStatus: null,
  errorGetWarehouse: null,
  errorGetSurveyList: null,
  errorGetTotalSurvey: null,
  errorGetSurvey: null,
  errorGetSurveyBrand: null,
  errorGetSurveyResponse: null,
  errorSubmitSurveyResponse: null,
  errorValidateAreaMapping: null,
  errorGetSalesSegmentation: null
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
   * PORTFOLIO BY USER ID V2
   * ==========================
   */
  [types.PORTFOLIO_GET_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetPortfolio: true,
      loadingGetMerchant: true,
      dataGetPortfolioV2: null,
      dataGetMerchantV2: [],
      totalDataGetMerchantV2: 0,
      errorGetPortfolioV2: null
    };
  },
  [types.PORTFOLIO_GET_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      dataGetPortfolioV2: action.payload.data
    };
  },
  [types.PORTFOLIO_GET_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetPortfolio: false,
      loadingGetMerchant: false,
      errorGetPortfolioV2: action.payload
    };
  },
  /**
   * ===================
   * MERCHANT LIST BY PORTFOLIO V2
   * ===================
   */
  [types.MERCHANT_GET_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetMerchant: action.payload.loading,
      errorGetMerchantV2: null
    };
  },
  [types.MERCHANT_GET_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      totalDataGetMerchantV2: action.payload.data.length,
      dataGetMerchantV2: [...state.dataGetMerchantV2, ...action.payload.data]
    };
  },
  [types.MERCHANT_GET_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      errorGetMerchantV2: action.payload
    };
  },
  [types.MERCHANT_GET_RESET_V2](state, action) {
    return {
      ...state,
      pageGetMerchantV2: 0,
      totalDataGetMerchantV2: 0,
      dataGetMerchantV2: []
    };
  },
  [types.MERCHANT_GET_REFRESH_V2](state, action) {
    return {
      ...state,
      refreshGetMerchant: true,
      loadingGetMerchant: true,
      pageGetMerchantV2: 0,
      totalDataGetMerchantV2: 0,
      dataGetMerchantV2: []
    };
  },
  [types.MERCHANT_GET_LOADMORE_V2](state, action) {
    return {
      ...state,
      loadingLoadMoreGetMerchant: true,
      pageGetMerchantV2: action.payload
    };
  },
  /**
   * ===================
   * MERCHANT LIST BY PORTFOLIO EXCLUDE STORE ON JOURNEY PLAN
   * ===================
   */
  [types.MERCHANT_EXISTING_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: action.payload.loading,
      errorGetMerchantV2: null
    };
  },
  [types.MERCHANT_EXISTING_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      totalDataGetMerchantV2: action.payload.data.length,
      dataGetMerchantV2: [...state.dataGetMerchantV2, ...action.payload.data]
    };
  },
  [types.MERCHANT_EXISTING_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetMerchant: false,
      loadingLoadMoreGetMerchant: false,
      refreshGetMerchant: false,
      errorGetMerchantV2: action.payload
    };
  },
  [types.MERCHANT_EXISTING_GET_RESET](state, action) {
    return {
      ...state,
      pageGetMerchantV2: 0,
      totalDataGetMerchantV2: 0,
      dataGetMerchantV2: []
    };
  },
  [types.MERCHANT_EXISTING_GET_REFRESH](state, action) {
    return {
      ...state,
      refreshGetMerchant: true,
      loadingGetMerchant: true,
      pageGetMerchantV2: 0,
      totalDataGetMerchantV2: 0,
      dataGetMerchantV2: []
    };
  },
  [types.MERCHANT_EXISTING_GET_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreGetMerchant: true,
      pageGetMerchantV2: action.payload
    };
  },
  /**
   * ==========================
   * MERCHANT DETAIL V2
   * ==========================
   */
  [types.MERCHANT_GET_DETAIL_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: true,
      dataGetMerchantDetailV2: null,
      errorGetMerchantDetailV2: null
    };
  },
  [types.MERCHANT_GET_DETAIL_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      dataGetMerchantDetailV2: action.payload,
      dataMerchantVolatile: saveDataMerchantVolatile(action.payload),
      dataMerchantRejectedV2:
        action.payload.rejectedFields !== null
          ? action.payload.rejectedFields
          : INITIAL_STATE.dataMerchantRejectedV2
    };
  },
  [types.MERCHANT_GET_DETAIL_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetMerchantDetail: false,
      errorGetMerchantDetailV2: action.payload
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
        storeId: checkData('storeId', dataUpdate, dataPrevious),
        externalId: checkData('externalId', dataUpdate, dataPrevious),
        /** profile information */
        phone: checkData('phone', dataUpdate, dataPrevious),
        fullName: checkData('fullName', dataUpdate, dataPrevious),
        name: checkData('name', dataUpdate, dataPrevious),
        idNo: checkData('idNo', dataUpdate, dataPrevious),
        taxNo: checkData('taxNo', dataUpdate, dataPrevious),
        idImageUrl: checkData('idImageUrl', dataUpdate, dataPrevious),
        taxImageUrl: checkData('taxImageUrl', dataUpdate, dataPrevious),
        selfieImageUrl: checkData('selfieImageUrl', dataUpdate, dataPrevious),
        isEmailVerified: checkData('isEmailVerified', dataUpdate, dataPrevious),
        isMobilePhoneNoVerified: checkData('isMobilePhoneNoVerified', dataUpdate, dataPrevious),
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
        warehouse: checkData('warehouse', dataUpdate, dataPrevious),
        warehouseId: checkData('warehouseId', dataUpdate, dataPrevious),
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
        typeId: checkData('typeId', dataUpdate, dataPrevious),
        storeGroup: checkData('storeGroup', dataUpdate, dataPrevious),
        groupId: checkData('groupId', dataUpdate, dataPrevious),
        storeCluster: checkData('storeCluster', dataUpdate, dataPrevious),
        clusterId: checkData('clusterId', dataUpdate, dataPrevious),
        storeChannel: checkData('storeChannel', dataUpdate, dataPrevious),
        channelId: checkData('channelId', dataUpdate, dataPrevious)
      }
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
      dataMerchantVolatile:
        action.payload.store === null
          ? INITIAL_STATE.dataMerchantVolatile
          : saveDataMerchantVolatile(action.payload.store),
      dataMerchantDisabledField: {
        fullName:
          action.payload.store !== null
            ? action.payload.store.owner.fullName !== null
            : false,
        idNo:
          action.payload.store !== null
            ? action.payload.store.owner.idNo !== null
            : false,
        taxNo:
          action.payload.store !== null
            ? action.payload.store.owner.taxNo !== null
            : false,
        longLat:
          action.payload.store !== null
            ? action.payload.store.latitude !== null
            : false,
        address:
          action.payload.store !== null
            ? action.payload.store.address !== null
            : false,
        noteAddress:
          action.payload.store !== null
            ? action.payload.store.noteAddress !== null
            : false,
        storeName: action.payload?.store?.name ? true : false
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
      dataMerchantVolatile: INITIAL_STATE.dataMerchantVolatile,
      dataMerchantDisabledField: INITIAL_STATE.dataMerchantDisabledField
    };
  },
  [types.RESET_MERCHANT_ADD](state, action) {
    return {
      ...state,
      loadingAddMerchant: false,
      dataAddMerchant: null,
      errorAddMerchant: null
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
      dataMerchantVolatile: saveDataMerchantVolatile(action.payload),
      dataGetMerchantDetail: action.payload,
      dataEditMerchant: action.payload,
      dataMerchantRejected:
        action.payload.rejectedFields !== null
          ? action.payload.rejectedFields
          : INITIAL_STATE.dataMerchantRejected
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
   * POST ACTIVITY V2
   * =============================
   */
  [types.MERCHANT_POST_ACTIVITY_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingPostActivity: true,
      dataPostActivityV2: null,
      errorPostActivityV2: null
    };
  },
  [types.MERCHANT_POST_ACTIVITY_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingPostActivity: false,
      selectedMerchant: {
        ...state.selectedMerchant,
        journeyBookStores: action.payload.data
      },
      dataPostActivityV2: action.payload.data
    };
  },
  [types.MERCHANT_POST_ACTIVITY_FAILED_V2](state, action) {
    return {
      ...state,
      loadingPostActivity: false,
      errorPostActivityV2: action.payload
    };
  },
  /**
   * =============================
   * GET LOG ALL ACTIVITY MERCHANT V2
   * =============================
   */
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: true,
      dataGetLogAllActivityV2: null,
      errorGetLogAllActivityV2: null
    };
  },
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: false,
      dataGetLogAllActivityV2: action.payload.data
    };
  },
  [types.MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetLogAllActivity: false,
      errorGetLogAllActivityV2: action.payload
    };
  },
  /**
   * =============================
   * GET LOG PER ACTIVITY MERCHANT V2
   * =============================
   */
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS_V2](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: true,
      dataGetLogPerActivityV2: null,
      errorGetLogPerActivityV2: null
    };
  },
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_SUCCESS_V2](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: false,
      dataGetLogPerActivityV2: action.payload.data
    };
  },
  [types.MERCHANT_GET_LOG_PER_ACTIVITY_FAILED_V2](state, action) {
    return {
      ...state,
      loadingGetLogPerActivity: false,
      errorGetLogPerActivityV2: action.payload
    };
  },
  /**
   * =============================
   * GET LATEST CHECK IN AND CHECK OUT (LAST STORE)
   * =============================
   */
  [types.MERCHANT_GET_LATEST_CHECK_IN_OUT_PROCESS](state, action) {
    return {
      ...state,
      loadingGetLatestCheckInOut: true,
      dataGetLatestCheckInOut: null,
      errorGetLatestCheckInOut: null
    };
  },
  [types.MERCHANT_GET_LATEST_CHECK_IN_OUT_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetLatestCheckInOut: false,
      dataGetLatestCheckInOut: action.payload.data
    };
  },
  [types.MERCHANT_GET_LATEST_CHECK_IN_OUT_FAILED](state, action) {
    return {
      ...state,
      loadingGetLatestCheckInOut: false,
      errorGetLatestCheckInOut: action.payload
    };
  },
  /**
  /**
   * =============================
   * GET NO ORDER REASON
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
  },
  /**
   * =============================
   * GET NO VISIT REASON
   * =============================
   */
  [types.MERCHANT_NO_VISIT_REASON_GET_PROCESS](state, action) {
    return {
      ...state,
      loadingGetNoVisitReason: true,
      dataGetNoVisitReason: null,
      errorGetNoVisitReason: null
    };
  },
  [types.MERCHANT_NO_VISIT_REASON_GET_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetNoVisitReason: false,
      dataGetNoVisitReason: action.payload.data
    };
  },
  [types.MERCHANT_NO_VISIT_REASON_GET_FAILED](state, action) {
    return {
      ...state,
      loadingGetNoVisitReason: false,
      errorGetNoVisitReason: action.payload
    };
  },
  /**
   * =============================
   * POST NO VISIT REASON
   * =============================
   */
  [types.MERCHANT_POST_NO_VISIT_REASON_PROCESS](state, action) {
    return {
      ...state,
      loadingPostNoVisitReason: true,
      dataPostNoVisitReason: null,
      errorPostNoVisitReason: null
    };
  },
  [types.MERCHANT_POST_NO_VISIT_REASON_SUCCESS](state, action) {
    return {
      ...state,
      loadingPostNoVisitReason: false,
      selectedMerchant: {
        ...state.selectedMerchant,
        journeyBookStores: action.payload.data
      },
      dataPostNoVisitReason: action.payload.data
    };
  },
  [types.MERCHANT_POST_NO_VISIT_REASON_FAILED](state, action) {
    return {
      ...state,
      loadingPostNoVisitReason: false,
      errorPostNoVisitReason: action.payload
    };
  },
  /**
   * =============================
   * GET JOURNEY BOOK DETAIL
   * =============================
   */
  [types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_PROCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyBookDetail: true,
      dataGetJourneyBookDetail: null,
      errorGetJourneyBookDetail: null
    };
  },
  [types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetJourneyBookDetail: false,
      selectedMerchant: {
        ...state.selectedMerchant,
        journeyBookStores: action.payload.data
      },
      dataGetJourneyBookDetail: action.payload.data
    };
  },
  [types.MERCHANT_GET_JOURNEY_BOOK_DETAIL_FAILED](state, action) {
    return {
      ...state,
      loadingGetJourneyBookDetail: false,
      errorGetJourneyBookDetail: action.payload
    };
  },
  /**
   * ============================
   * GET STORE STATUS
   * ============================
   */
  [types.MERCHANT_STORE_STATUS_PROCESS](state, action) {
    return {
      ...state,
      loadingGetStoreStatus: true,
      dataStoreStatus: {},
      errorGetStoreStatus: null
    };
  },
  [types.MERCHANT_STORE_STATUS_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetStoreStatus: false,
      dataStoreStatus: action.payload.data
    };
  },
  [types.MERCHANT_STORE_STATUS_FAILED](state, action) {
    return {
      ...state,
      loadingGetStoreStatus: false,
      errorGetStoreStatus: action.payload
    };
  },
  /**
   * ============================
   * GET WAREHOUSE
   * ============================
   */
  [types.MERCHANT_GET_WAREHOUSE_PROCESS](state, action) {
    return {
      ...state,
      loadingGetWarehouse: true,
      dataGetWarehouse: [],
      errorGetWarehouse: null
    };
  },
  [types.MERCHANT_GET_WAREHOUSE_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetWarehouse: false,
      dataGetWarehouse: action.payload.data
    };
  },
  [types.MERCHANT_GET_WAREHOUSE_FAILED](state, action) {
    return {
      ...state,
      loadingGetWarehouse: false,
      errorGetWarehouse: action.payload
    };
  },

  /**
   * =============================
   * MERCHANT VOLATILE RESET
   * =============================
   */
  [types.MERCHANT_RESET_DATA_VOLATILE](state, action) {
    return {
      ...state,
      dataMerchantVolatile: INITIAL_STATE.dataMerchantVolatile,
      dataMerchantDisabledField: INITIAL_STATE.dataMerchantDisabledField
    };
  },

  /**
   * ============================
   * GET SURVEY LIST
   * ============================
   */
  [types.MERCHANT_GET_SURVEY_LIST_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyList: true,
      surveyList: INITIAL_STATE.surveyList,
      errorGetSurveyList: null
    };
  },
  [types.MERCHANT_GET_SURVEY_LIST_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyList: false,
      refreshGetSurveyList: false,
      surveyList: action.payload
    };
  },
  [types.MERCHANT_GET_SURVEY_LIST_FAILED](state, action) {
    return {
      ...state,
      loadingGetSurveyList: false,
      errorGetSurveyList: action.payload
    };
  },
  [types.MERCHANT_GET_SURVEY_LIST_RESET](state, action) {
    return {
      ...state,
      surveyList: INITIAL_STATE.surveyList
    };
  },
  [types.MERCHANT_GET_SURVEY_LIST_REFRESH](state, action) {
    return {
      ...state,
      refreshGetSurveyList: true,
      loadingGetSurveyList: true,
      pageGetSurveyList: 0,
      totalDataGetSurveyList: 0,
      surveyList: INITIAL_STATE.surveyList
    };
  },
  [types.MERCHANT_GET_SURVEY_LIST_LOADMORE](state, action) {
    return {
      ...state,
      loadingLoadMoreSurveyList: true,
      pageGetSurveyList: action.payload
    };
  },
  /**
   * ============================
   * GET TOTAL SURVEY
   * ============================
   */
  [types.MERCHANT_GET_TOTAL_SURVEY_PROCESS](state, action) {
    return {
      ...state,
      loadingGetTotalSurvey: true,
      dataGetTotalSurvey: null,
      errorGetTotalSurvey: null
    };
  },
  [types.MERCHANT_GET_TOTAL_SURVEY_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetTotalSurvey: false,
      dataGetTotalSurvey: action.payload.payload
    };
  },
  [types.MERCHANT_GET_TOTAL_SURVEY_FAILED](state, action) {
    return {
      ...state,
      loadingGetTotalSurvey: false,
      errorGetTotalSurvey: action.payload
    };
  },
  /**
   * ============================
   * GET SURVEY BY ID
   * ============================
   */
  [types.MERCHANT_GET_SURVEY_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSurvey: true,
      dataGetSurvey: null,
      errorGetSurvey: null
    };
  },
  [types.MERCHANT_GET_SURVEY_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSurvey: false,
      dataGetSurvey: action.payload.payload
    };
  },
  [types.MERCHANT_GET_SURVEY_FAILED](state, action) {
    return {
      ...state,
      loadingGetSurvey: false,
      errorGetSurvey: action.payload
    };
  },
  /**
   * ============================
   * GET SURVEY BRAND BY SURVEY ID
   * ============================
   */
  [types.MERCHANT_GET_SURVEY_BRAND_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyBrand: true,
      dataGetSurveyBrand: null,
      errorGetSurveyBrand: null
    };
  },
  [types.MERCHANT_GET_SURVEY_BRAND_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyBrand: false,
      dataGetSurveyBrand: action.payload.payload.data
    };
  },
  [types.MERCHANT_GET_SURVEY_BRAND_FAILED](state, action) {
    return {
      ...state,
      loadingGetSurveyBrand: false,
      errorGetSurveyBrand: action.payload
    };
  },

  /**
   * ============================
   * GET SURVEY RESPONSE
   * ============================
   */
  [types.MERCHANT_GET_SURVEY_RESPONSE_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyResponse: true,
      dataSurveyResponse: {
        id: null,
        status: '',
        responsePhoto: []
      },
      newSurveyResponse: false,
      errorGetSurveyResponse: null
    };
  },
  [types.MERCHANT_GET_SURVEY_RESPONSE_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSurveyResponse: false,
      dataSurveyResponse: action.payload
    };
  },
  [types.MERCHANT_GET_SURVEY_RESPONSE_FAILED](state, action) {
    return {
      ...state,
      loadingGetSurveyResponse: false,
      errorGetSurveyResponse: action.payload
    };
  },

  /**
   * ============================
   * SUBMIT SURVEY
   * ============================
   */
  [types.MERCHANT_SUBMIT_SURVEY_RESPONSE_PROCESS](state, action) {
    return {
      ...state,
      loadingSubmitSurveyResponse: true,
      dataSubmitSurveyResponse: {},
      errorSubmitSurveyResponse: null
    };
  },
  [types.MERCHANT_SUBMIT_SURVEY_RESPONSE_SUCCESS](state, action) {
    return {
      ...state,
      loadingSubmitSurveyResponse: false,
      dataSubmitSurveyResponse: action.payload,
      newSurveyResponse: true
    };
  },
  [types.MERCHANT_SUBMIT_SURVEY_RESPONSE_FAILED](state, action) {
    return {
      ...state,
      loadingSubmitSurveyResponse: false,
      errorSubmitSurveyResponse: action.payload
    };
  },
/**
   * ============================
   * VALIDATE AREA MAPPING
   * ============================
   */
  [types.VALIDATE_AREA_MAPPING_PROCESS](state, action) {
    return {
      ...state,
      loadingValidateAreaMapping: true,
      dataValidateAreaMapping: null,
      errorValidateAreaMapping: null
    };
  },
  [types.VALIDATE_AREA_MAPPING_SUCCESS](state, action) {
    return {
      ...state,
      loadingValidateAreaMapping: false,
      dataValidateAreaMapping: action.payload.data
    };
  },
  [types.VALIDATE_AREA_MAPPING_FAILED](state, action) {
    return {
      ...state,
      loadingValidateAreaMapping: false,
      errorValidateAreaMapping: action.payload
    };
  },
  [types.RESET_VALIDATE_AREA_MAPPING](state, action) {
    return {
      ...state,
      loadingValidateAreaMapping: false,
      dataValidateAreaMapping: null,
      errorValidateAreaMapping: null
    };
  },
/**
   * ============================
   * GET SALES SEGMENTATION
   * ============================
   */
  [types.GET_SALES_SEGMENTATION_PROCESS](state, action) {
    return {
      ...state,
      loadingGetSalesSegmentation: true,
      dataSalesSegmentation: null,
      errorGetSalesSegmentation: null
    };
  },
  [types.GET_SALES_SEGMENTATION_SUCCESS](state, action) {
    return {
      ...state,
      loadingGetSalesSegmentation: false,
      dataSalesSegmentation: action.payload.data
    };
  },
  [types.GET_SALES_SEGMENTATION_FAILED](state, action) {
    return {
      ...state,
      loadingGetSalesSegmentation: false,
      errorGetSalesSegmentation: action.payload
    };
  },
  [types.RESET_SALES_SEGMENTATION](state) {
    return {
      ...state,
      loadingGetSalesSegmentation: false,
      dataSalesSegmentation: null,
      errorGetSalesSegmentation: null
    };
  },

  /**
   * ============================
   * UPDATE SURVEY
   * ============================
   */
  [types.MERCHANT_UPDATE_SURVEY_RESPONSE_PROCESS](state, action) {
    return {
      ...state,
      loadingSubmitSurveyResponse: true,
      dataSubmitSurveyResponse: {},
      errorSubmitSurveyResponse: null
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
    storeId: data.id,
    externalId: data.externalId,
    /** for owner data */
    ownerId: data.owner.id,
    fullName: data.owner.fullName,
    email: data.owner.email,
    phone: data.owner.mobilePhoneNo,
    idNo: data.owner.idNo,
    taxNo: data.owner.taxNo,
    taxImageUrl: data.owner.taxImageUrl,
    idImageUrl: data.owner.idImageUrl,
    selfieImageUrl: data.owner.selfieImageUrl,
    isEmailVerified: data.owner.isEmailVerified,
    isMobilePhoneNoVerified: data.owner.isMobilePhoneNoVerified,
    bank: data.owner.bank,
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
    warehouse: data.warehouse ? data.warehouse.name : null,
    warehouseId: data.warehouseId,
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
    storeType: data.storeType ? data.storeType.name : '',
    storeGroup: data.storeGroup ? data.storeGroup.name : '',
    storeCluster: data.storeCluster ? data.storeCluster.name : '',
    storeChannel: data.storeChannel ? data.storeChannel.name : ''
  };
}