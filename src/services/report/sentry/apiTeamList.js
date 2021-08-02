import voyager from '../../apiList/voyager';
import scimitar from '../../apiList/scimitar';
import dinar from '../../apiList/dinar';
import kanzun from '../../apiList/kanzun';
import chimera from '../../apiList/chimera';
import davyjones from '../../apiList/davyjones';
import tortuga from '../../apiList/tortuga';
import pyramid from '../../apiList/pyramid';
import valkyrie from '../../apiList/valkyrie';

const apiLists = [
  ...voyager,
  ...scimitar,
  ...dinar,
  ...kanzun,
  ...chimera,
  ...davyjones,
  ...tortuga,
  ...pyramid,
  ...valkyrie
];

export const getTeam = api => {
  const checkTeam = apiLists.filter(apiList => api.includes(apiList.api));
  if (checkTeam.length > 0) {
    return checkTeam[0].team;
  }
  return 'no-team';
};
