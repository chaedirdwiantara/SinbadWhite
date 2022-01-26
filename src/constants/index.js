/*
 * Request parameter of Graphic Content Types on Dashboard detail
 */
export const TOKO_ORDER = 'toko.order';
export const TOTAL_PENJUALAN = 'total.penjualan';
export const TOKO_DIKUNJUNGI = 'toko.dikunjungi';
export const TOKO_BARU = 'toko.baru';
export const TOTAL_PESANAN = 'total.pesanan';

/**
 * Sales Toko Journey Plan
 * Flows:
 * 1. Sales check in
 * 2. Sales then do order
 * 3. Sales then exit toko (check out)
 */
export const ACTIVITY_JOURNEY_PLAN_CHECK_IN = 'check_in';
export const ACTIVITY_JOURNEY_PLAN_ORDER = 'order';
export const ACTIVITY_JOURNEY_PLAN_RETUR = 'retur';
export const ACTIVITY_JOURNEY_PLAN_STOCK = 'record_stock';
export const ACTIVITY_JOURNEY_PLAN_CHECK_OUT = 'check_out';

/*
 * Sales JOURNEY PLAN ACTIVITY TOKO SURVEY
 * Before sales exit toko, must do survey
 * 3. Sales do toko survey
 * 4. Sales then exit toko (check out)
 */
export const ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY = 'toko_survey';

/*
 * Sales JOURNEY PLAN ACTIVITY TOKO SURVEY
 * Before sales exit toko, must do survey
 * 3. Sales then do penagihan if there is isCollectionAvailable property
 * 4. Sales then exit toko (check out)
 */
export const ACTIVITY_JOURNEY_PLAN_COLLECTION = 'collection';
export const ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING = 'collection_ongoing';
export const ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS = 'collection_success';
export const ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS = 'collection_not_success';

/**
 * JOURNEY PLAN PAUSE STATUS
 * 0. jbs just started haven't paused or resumed
 * 1. if journey plan isPaused == true
 * 2. if journey plan isPaused == false, means journey plan is running/resume
 */
export const JOURNEY_PLAN_PAUSE_STATUS_DEFAULT = 0
export const JOURNEY_PLAN_PAUSE_STATUS_PAUSED = 1;
export const JOURNEY_PLAN_PAUSE_STATUS_RESUME = 2;
