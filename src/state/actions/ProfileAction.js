import * as types from '../types';
const HUNTER = {
  "data": [
    {
      "id": 1,
      "privileges": "aa.checkin",
      "type": "agent-app"
    },
    {
      "id": 2,
      "privileges": "aa.checkout",
      "type": "agent-app"
    }
  ]
}


const TAKING_ORDER = {
  "data": [
    {
      "id": 1,
      "privileges": "aa.create.store",
      "type": "agent-app"
    },
    {
      "id": 2,
      "privileges": "aa.checkin",
      "type": "agent-app"
    },
    {
      "id": 3,
      "privileges": "aa.checkout",
      "type": "agent-app"
    },
    {
      "id": 4,
      "privileges": "aa.record.stock",
      "type": "agent-app"
    },
    {
      "id": 5,
      "privileges": "aa.order",
      "type": "agent-app"
    },
    {
      "id": 6,
      "privileges": "aa.survey",
      "type": "agent-app"
    },
    {
      "id": 7,
      "privileges": "aa.collection",
      "type": "agent-app"
    },
    {
      "id": 8,
      "privileges": "aa.retur",
      "type": "agent-app"
    }
  ]
}
/**
 * ==================================
 * ADD MERCHANT
 * ==================================
 */
/** PORTFOLIO GET PROCESS */
export function profileEditProcess(data) {
  return { type: types.PROFILE_EDIT_PROCESS, payload: data };
}
/** PORTFOLIO GET SUCCESS */
export function profileEditSuccess(data) {
  if (data.result === 'Ok') {
    return { type: types.PROFILE_EDIT_SUCCESS, payload: data.data };
  }
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
}
/** PORTFOLIO GET FAILED */
export function profileEditFailed(data) {
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
}
/**
 * =================================
 * PROFILE GET WAREHOUSE
 * =================================
 */
export function profileGetWarehouseProcess(data){
  return { type: types.PROFILE_GET_WAREHOUSE_PROCESS, payload: data }
}
export function profileGetWarehouseSuccess(data){
  if (data.result === 'Ok'){
    return { type: types.PROFILE_GET_WAREHOUSE_SUCCESS, payload: data.data}
  }
  return { type: types.PROFILE_GET_WAREHOUSE_FAILED, payload: data}
}
export function profileGetWarehouseFailed(data) {
  return { type: types.PROFILE_GET_WAREHOUSE_FAILED, payload: data}
}
/**
 * =================================
 * PROFILE GET SALES SEGMENTATION TEAM
 * =================================
 */
export function getSalesSegmentationTeamProcess(data){
  return { type: types.PROFILE_GET_SALES_SEGMENTATION_TEAM_PROCESS, payload: data }
}
export function getSalesSegmentationTeamSuccess(data){
  if (data.result === 'Ok'){
    return { type: types.PROFILE_GET_SALES_SEGMENTATION_TEAM_SUCCESS, payload: data.data}
  }
  return { type: types.PROFILE_GET_SALES_SEGMENTATION_TEAM_FAILED, payload: data}
}
export function getSalesSegmentationTeamFailed(data) {
  return { type: types.PROFILE_GET_SALES_SEGMENTATION_TEAM_FAILED, payload: data}
}
/**
 * =================================
 * PROFILE GET PRIVILIGE
 * =================================
 */
export function getPrivilegeProcess(data){
  return { type: types.PROFILE_GET_PRIVILEGE_PROCESS, payload: data }
}
export function getPrivilegeSuccess(data){
  return { type: types.PROFILE_GET_PRIVILEGE_SUCCESS, payload: TAKING_ORDER.data}
  if (data.result === 'Ok'){
    return { type: types.PROFILE_GET_PRIVILEGE_SUCCESS, payload: data.data}
  }
  return { type: types.PROFILE_GET_PRIVILEGE_FAILED, payload: data}
}
export function getPrivilegeFailed(data) {
  return { type: types.PROFILE_GET_PRIVILEGE_FAILED, payload: data}
}
export function setSalesRole(data){
  return {type: types.PROFILE_SET_SALES_ROLE, payload: data}
}