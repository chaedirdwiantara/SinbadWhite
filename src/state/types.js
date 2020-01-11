/**
 * ====================================================
 * ALL VARIABLE THAT WILL USED BY ACTIONS AND REDUCERS
 * ====================================================
 */
/** =======================
 * GLOBAL
 * ========================
 */
/** FOR SIGNOUT */
export const DELETE_ALL_DATA = 'DeleteAllData';
/** FOR SAVE SEARCH GLOBAL */
export const SEARCH_TEXT = 'SearchText';
/** FOR SAVE LOCATION VOLATILE DATA */
export const LOCATION_SAVE_DATA_VOLATILE = 'LocationSaveDataVolatile';
/** FOR GET LOCATION */
export const LOCATION_GET_PROCESS = 'LocationGetProcess';
export const LOCATION_GET_SUCCESS = 'LocationGetSuccess';
export const LOCATION_GET_FAILED = 'LocationGetFailed';
export const LOCATION_GET_RESET = 'LocationGetReset';
export const LOCATION_GET_REFRESH = 'LocationGetRefresh';
export const LOCATION_GET_LOADMORE = 'LocationGetLoadMore';
/** =======================
 * AUTH
 * ========================
 */
/** FOR OTP */
export const OTP_GET_PROCESS = 'OTPgetProcess';
export const OTP_GET_SUCCESS = 'OTPgetSuccess';
export const OTP_GET_FAILED = 'OTPgetFailed';
/** FOR SIGNIN */
export const SIGN_IN_PROCESS = 'signInProcess';
export const SIGN_IN_SUCCESS = 'signInSuccess';
export const SIGN_IN_FAILED = 'signInFailed';
/** FOR CHECK PHONE NUMBER AVAILABLE */
export const CHECK_PHONE_NUMBER_AVAILABLE_PROCESS =
  'CheckPhoneNumberAvailbleProcess';
export const CHECK_PHONE_NUMBER_AVAILABLE_SUCCESS =
  'CheckPhoneNumberAvailbleSuccess';
export const CHECK_PHONE_NUMBER_AVAILABLE_FAILED =
  'CheckPhoneNumberAvailbleFailed';
/** =======================
 * MERCHANT
 * ========================
 */
/** PORTFOLIO */
export const PORTFOLIO_GET_PROCESS = 'PortfolioGetProcess';
export const PORTFOLIO_GET_SUCCESS = 'PortfolioGetSuccess';
export const PORTFOLIO_GET_FAILED = 'PortfolioGetFailed';
/** FOR GET MERCHANT LIST */
export const MERCHANT_GET_PROCESS = 'MerchantGetProcess';
export const MERCHANT_GET_SUCCESS = 'MerchantGetSuccess';
export const MERCHANT_GET_FAILED = 'MerchantGetFailed';
export const MERCHANT_GET_RESET = 'MerchantGetReset';
export const MERCHANT_GET_REFRESH = 'MerchantGetRefresh';
export const MERCHANT_GET_LOADMORE = 'MerchantGetLoadMore';
/** FOR GET MERCHANT DETAIL */
export const MERCHANT_GET_DETAIL_PROCESS = 'MerchantGetDetailProcess';
export const MERCHANT_GET_DETAIL_SUCCESS = 'MerchantGetDetailSuccess';
export const MERCHANT_GET_DETAIL_FAILED = 'MerchantGetDetailFailed';
/** FOR ADD MERCHANT */
export const MERCHANT_ADD_PROCESS = 'MerchantAddProcess';
export const MERCHANT_ADD_SUCCESS = 'MerchantAddSuccess';
export const MERCHANT_ADD_FAILED = 'MerchantAddFailed';
/** FOR ADD MERCHANT */
export const MERCHANT_ADD_DATA_VOLATILE = 'MerchantAddDataVolatile';
/** FOR GET MERCHANT LAST ORDER */
export const MERCHANT_GET_LAST_ORDER_PROCESS = 'MerchantGetLastOrderProcess';
export const MERCHANT_GET_LAST_ORDER_SUCCESS = 'MerchantGetLastOrderSuccess';
export const MERCHANT_GET_LAST_ORDER_FAILED = 'MerchantGetLastOrderFailed';
/** FOR CHECKIN MERCHANT */
export const MERCHANT_POST_ACTIVITY_PROCESS = 'MerchantPostActivityProcess';
export const MERCHANT_POST_ACTIVITY_SUCCESS = 'MerchantPostActivitySuccess';
export const MERCHANT_POST_ACTIVITY_FAILED = 'MerchantPostActivityFailed';
/** FOR CHECKOUT MERCHANT */
export const MERCHANT_GET_LOG_ALL_ACTIVITY_PROCESS =
  'MerchantGetLogAllActivityProcess';
export const MERCHANT_GET_LOG_ALL_ACTIVITY_SUCCESS =
  'MerchantGetLogAllActivitySuccess';
export const MERCHANT_GET_LOG_ALL_ACTIVITY_FAILED =
  'MerchantGetLogAllActivityFailed';
/** FOR GET LOG MERCHANT */
export const MERCHANT_GET_LOG_PER_ACTIVITY_PROCESS =
  'MerchantGetLogPerActivityProcess';
export const MERCHANT_GET_LOG_PER_ACTIVITY_SUCCESS =
  'MerchantGetLogPerActivitySuccess';
export const MERCHANT_GET_LOG_PER_ACTIVITY_FAILED =
  'MerchantGetLogPerActivityFailed';
/** SELECTED MERCHANT === */
export const MERCHANT_SELECTED = 'MerchantSelected';
/** =======================
 * JOURNEY
 * ========================
 */
/** FOR GET JOURNEY PLAN LIST */
export const JOURNEY_PLAN_GET_PROCESS = 'JourneyPlanGetProcess';
export const JOURNEY_PLAN_GET_SUCCESS = 'JourneyPlanGetSuccess';
export const JOURNEY_PLAN_GET_FAILED = 'JourneyPlanGetFailed';
export const JOURNEY_PLAN_GET_RESET = 'JourneyPlanGetReset';
export const JOURNEY_PLAN_GET_REFRESH = 'JourneyPlanGetRefresh';
export const JOURNEY_PLAN_GET_LOADMORE = 'JourneyPlanGetLoadMore';
/** FOR POST MERCHANT TO JOURNEY PLAN */
export const SAVE_MERCHANT_TO_JOURNEY_PLAN_PROCESS =
  'saveMerchantToJourneyPlanProcess';
export const SAVE_MERCHANT_TO_JOURNEY_PLAN_SUCCESS =
  'saveMerchantToJourneyPlanSuccess';
export const SAVE_MERCHANT_TO_JOURNEY_PLAN_FAILED =
  'saveMerchantToJourneyPlanFailed';
/** FOR GET REPORT VISIT AND TOTAL ORDER */
export const JOURNEY_PLAN_GET_REPORT_PROCESS = 'JourneyPlanGetReportProcess';
export const JOURNEY_PLAN_GET_REPORT_SUCCESS = 'JourneyPlanGetReportSuccess';
export const JOURNEY_PLAN_GET_REPORT_FAILED = 'JourneyPlanGetReportFailed';
/** =======================
 * PDP
 * ========================
 */
/** FOR GET PDP LIST */
export const PDP_GET_PROCESS = 'PdpGetProcess';
export const PDP_GET_SUCCESS = 'PdpGetSuccess';
export const PDP_GET_FAILED = 'PdpGetFailed';
export const PDP_GET_RESET = 'PdpGetReset';
export const PDP_GET_REFRESH = 'PdpGetRefresh';
export const PDP_GET_LOADMORE = 'PdpGetLoadMore';
/** FOR GET PDP LIST */
export const PDP_CHANGE_DISPLAY = 'PdpChangeDisplay';
/** FOR ORDER PDP */
export const PDP_OPEN_ORDER = 'PdpOpenOrder';
export const PDP_CLOSE_ORDER = 'PdpCloseOrder';
export const PDP_ADD_TO_CART = 'pdpAddToCart';
export const PDP_MODIFY_PRODUCT_LIST_DATA = 'pdpModifyProductListData';
/** =======================
 * OMS
 * ========================
 */
export const OMS_ADD_TO_CART = 'OmsAddToCart';
// INI SEMENTARA HARUS DI GANTI
export const OMS_ITEM_FOR_CART = 'omsAddToCart';
export const OMS_CHECKLIST_ITEM_CART = 'omsCheckListItemCart';
/** GET CART ITEM */
export const OMS_GET_CART_ITEM_PROCESS = 'OmsGetCartItemProcess';
export const OMS_GET_CART_ITEM_SUCCESS = 'OmsGetCartItemSuccess';
export const OMS_GET_CART_ITEM_FAILED = 'OmsGetCartItemFailed';
/** GET CHECKOUT DATA */
export const OMS_GET_CHECKOUT_ITEM_PROCESS = 'OmsGetCheckoutItemProcess';
export const OMS_GET_CHECKOUT_ITEM_SUCCESS = 'OmsGetCheckoutItemSuccess';
export const OMS_GET_CHECKOUT_ITEM_FAILED = 'OmsGetCheckoutItemFailed';
/** CONFIRM ORDER */
export const OMS_CONFIRM_ORDER_PROCESS = 'OmsConfirmOrderProcess';
export const OMS_CONFIRM_ORDER_SUCCESS = 'OmsConfirmOrderSuccess';
export const OMS_CONFIRM_ORDER_FAILED = 'OmsConfirmOrderFailed';
/** DELETE CART ITEM */
export const OMS_DELETE_CART_ITEM_PROCESS = 'OmsDeleteCartItemProcess';
export const OMS_DELETE_CART_ITEM_SUCCESS = 'OmsDeleteCartItemSuccess';
export const OMS_DELETE_CART_ITEM_FAILED = 'OmsDeleteCartItemFailed';
/** PAYMENT */
export const OMS_GET_PAYMENT_PROCESS = 'OmsGetPaymentProcess';
export const OMS_GET_PAYMENT_SUCCESS = 'OmsGetPaymentSuccess';
export const OMS_GET_PAYMENT_FAILED = 'OmsGetPaymentFailed';
/** DELETE ALL DATA IN OMS */
export const OMS_RESET_DATA = 'OmsResetData';
/** =======================
 * HISTORY
 * ========================
 */
/** GET ORDER STATUS */
export const HISTORY_GET_ORDER_STATUS_PROCESS = 'HistoryGetOrderStatusProcess';
export const HISTORY_GET_ORDER_STATUS_SUCCESS = 'HistoryGetOrderStatusSuccess';
export const HISTORY_GET_ORDER_STATUS_FAILED = 'HistoryGetOrderStatusFailed';
/** GET PAYMENT STATUS */
export const HISTORY_GET_PAYMENT_STATUS_PROCESS =
  'HistoryGetPaymentStatusProcess';
export const HISTORY_GET_PAYMENT_STATUS_SUCCESS =
  'HistoryGetPaymentStatusSuccess';
export const HISTORY_GET_PAYMENT_STATUS_FAILED =
  'HistoryGetPaymentStatusFailed';
/** GET HISTORY LIST */
export const HISTORY_GET_PROCESS = 'HistoryGetProcess';
export const HISTORY_GET_SUCCESS = 'HistoryGetSuccess';
export const HISTORY_GET_FAILED = 'HistoryGetFailed';
/** DELETE NEW ORDER PER MERCHANT */
export const HISTORY_DELETE_NEW_ORDER_NOTIF_PER_MERCHANT =
  'HistoryDeleteNewOrderNotifPerMerchant';
