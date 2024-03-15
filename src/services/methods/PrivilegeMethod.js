import ApiRest from '../apiRest';
// GET PRIVILEGE

function getPrivileges({supplierId, userId}){
  return ApiRest({
    path: `privileges?type=agent-app&supplierId=${supplierId}&userId=${userId}`,
    method: 'GET'
  })
}

export const PrivilegeMethod = {
  getPrivileges
};
