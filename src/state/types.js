/**
 * ====================================================
 * ALL VARIABLE THAT WILL USED BY ACTIONS AND REDUCERS
 * ====================================================
 */
/** === GLOBAL === */
/** FOR SIGNOUT */
export const DELETE_ALL_DATA = 'DeleteAllData';
export const SEARCH_TEXT = 'SearchText';
/** === AUTH === */
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
/** === MERCHANT === */
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
export const MERCHANT_ADD_DATA_VOLATILE = 'MerchantAddDataVolatile';
/** === JOURNEY === */
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
