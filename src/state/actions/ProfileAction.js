import { GlobalMethod } from '../../services/methods';
import * as types from '../types';
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