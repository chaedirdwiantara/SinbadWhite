/**
 * COLLECTION METHOD TYPE
 * 1. Cash
 * 2. Check
 * 3. Giro
 * 4. Transfer
 * 5. Promo (Kerjasama Promosi)
 * 6. Retur
 */
export const CASH = 1;
export const CHECK = 2;
export const GIRO = 3;
export const TRANSFER = 4;
export const PROMO = 5;
export const RETUR = 6;

/** COLLECTION METHOD TYPE LABEL */
export const CASH_LABEL = 'Tunai';
export const CHECK_LABEL = 'Cek';
export const GIRO_LABEL = 'Giro';
export const TRANSFER_LABEL = 'Transfer';
export const PROMO_LABEL = 'Kerjasama Promosi';
export const RETUR_LABEL = 'Barang Retur';

/**
 * STATUS APPROVAL SFA
 * 1. approved
 * 2. pending
 * 3. reject
 */
export const APPROVED = 'approved';
export const PENDING = 'pending';
export const REJECTED = 'rejected';

/**
 * STATUS STAMP SFA
 * 1. NOT_USED
 * 2. USED
 * 3. USED_BY_OTHERS
 * 4. NOT_AVAILABLE
 */

export const NOT_USED = 'NOT_USED';
export const USED = 'USED';
export const USED_BY_OTHERS = 'USED_BY_OTHERS';
export const NOT_AVAILABLE = 'NOT_AVAILABLE';
