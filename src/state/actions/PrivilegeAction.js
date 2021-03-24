import { GlobalMethod } from '../../services/methods';
import * as types from '../types';
/**
 * =================================
 * GET PRIVILIGE
 * =================================
 */
export function getPrivilegeProcess(data){
  return { type: types.PRIVILEGE_GET_PROCESS, payload: data }
}
export function getPrivilegeSuccess(data){
  if (data.result === 'Ok'){
    return { type: types.PRIVILEGE_GET_SUCCESS, payload: GlobalMethod.remappingPrivilege(data.data.data)}
  }
  return { type: types.PRIVILEGE_GET_FAILED, payload: data}
}
export function getPrivilegeFailed(data) {
  return { type: types.PRIVILEGE_GET_FAILED, payload: data}
}
export function setSalesRole(data){
  return {type: types.PRIVILEGE_SET_SALES_ROLE, payload: data}
}