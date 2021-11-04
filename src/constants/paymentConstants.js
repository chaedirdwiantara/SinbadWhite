/**
 * STATUS PAYMENT :
 * 1. Waiting For Payment
 * 2. Payment Paid
 * 3. Payment Failed
 * 4. Overdue
 */
export const WAITING_FOR_PAYMENT = 'waiting_for_payment';
export const PAID = 'paid';
export const PAYMENT_FAILED = 'payment_failed';
export const OVERDUE = 'overdue';
export const WAITING_FOR_REFUND = 'waiting_for_refund';
export const REFUNDED = 'refunded';

/**
 * PAYMENT TYPE :
 * 1. Pay Now
 * 2. Pay Later
 * 3. Pay on Delivery
 */
export const PAY_NOW = 1;
export const PAY_LATER = 2;
export const PAY_ON_DELIVERY = 3;

/**
 * BILLING STATUS :
 * 1. Paid
 * 2. Refunded
 */
export const BILLING_PAID = 'paid';
export const BILLING_REFUNDED = 'refunded';
export const BILLING_REFUND_REQUESTED = 'refund_requested';
export const BILLING_EXPIRED = 'expired';
export const BILLING_CANCEL = 'cancel';

/**
 * IMAGE SIZE :
 */

export const II_MB = 1024 * 1024 * 2;

/**
 * PAYMENT PAGES:
 * 1. HISTORY
 * 2. COLLECTION
 */

export const HISTORY = 'history';
export const COLLECTION = 'collection';
