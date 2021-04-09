/**
 * STATUS PAYMENT : 
 * 1. Waiting For Payment
 * 2. Payment Paid
 * 3. Payment Failed
 * 4. Overdue
 */
export const WAITING_FOR_PAYMENT = "waiting_for_payment"
export const PAID = 'paid'
export const FAILED = 'payment_failed'
export const OVERDUE = 'overdue'

/**
 * ORDER STATUS : 
 * 1. Confirm
 * 2. Shipping
 * 3. Done
 * 4. Pending Payment
 */
 export const CONFIRM = "confirm"
 export const SHIPPING = 'shipping'
 export const DONE = 'done'
 export const PENDING_PAYMENT = 'pending_payment'

 /**
 * PAYMENT TYPE : 
 * 1. Pay Now
 * 2. Pay Later
 * 3. Pay on Delivery
 */
export const PAY_NOW = 1
export const PAY_LATER = 2
export const PAY_ON_DELIVERY = 3