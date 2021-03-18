/** PRIVILEGE */
const createStore = {
    name: "aa.create.store",
    status: false
}
const checkIn = {
    name: "aa.checkin",
    status: false
}
const checkOut = {
    name: "aa.checkout",
    status: false
}
const checkStock = {
    name: "aa.record.stock",
    status: false
}
const order = {
    name: "aa.order",
    status: false
}
const survey = {
    name: "aa.survey",
    status: false
}
const collection = {
    name: "aa.collection",
    status: false
}

const retur = {
    name: "aa.retur",
    status: false
}

/** DEFAULT PRIVILEGE */
export const DEFAULT_PRIVILEGE = [
    createStore,
    checkIn,
    checkOut,
    checkStock,
    order,
    survey,
    collection,
    retur
]


/** SALES ROLES */
export const HUNTER = "Hunter"
export const TAKING_ORDER = "Taking Order"