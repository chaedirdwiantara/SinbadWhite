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
export const ACTIVITY_JOURNEY_PLAN_CHECK_OUT = 'check_out';
export const ACTIVITY_JOURNEY_PLAN_COLLECTION = 'collection';

/*
 * Sales JOURNEY PLAN ACTIVITY TOKO SURVEY
 * Before sales exit toko, must do survey
 * 3. Sales do toko survey
 * 4. Sales then exit toko (check out)
 */
export const ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY = 'toko_survey';
