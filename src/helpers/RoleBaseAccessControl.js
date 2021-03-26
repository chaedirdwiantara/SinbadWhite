/** PRIVILEGE */
const createStore = {
    name: "aa.create.store",
    status: true
}
const checkIn = {
    name: "aa.checkin",
    status: true
}
const checkOut = {
    name: "aa.checkout",
    status: true
}
const checkStock = {
    name: "aa.record.stock",
    status: true
}
const order = {
    name: "aa.order",
    status: true
}
const survey = {
    name: "aa.survey",
    status: true
}
const collection = {
    name: "aa.collection",
    status: true
}

const retur = {
    name: "aa.retur",
    status: true
}

/** DEFAULT PRIVILEGE */
export const DEFAULT_PRIVILEGE = {
    createStore,
    checkIn,
    checkOut,
    checkStock,
    order,
    survey,
    collection,
    retur
}