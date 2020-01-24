import ApiRest from '../apiRest';
/** === EDIT Profile === */
function editProfile(data) {
  return ApiRest({
    path: `agents/${data.agentId}`,
    method: 'PATCH',
    params: data.params
  });
}

export const ProfileMethod = {
  editProfile
};
