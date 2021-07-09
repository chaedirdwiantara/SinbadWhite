import { Sentry } from './SentryConfig';
import { getTeam } from './apiTeamList';
import apiHost from '../../apiHost';
import { Store } from '../../../state/Store';
/** API ERROR */
export const sendDataApiError = data => {
  Sentry.configureScope(function(scope) {
    scope.setTag('Bug Type', 'API Error');
    scope.setTag('Team', getTeam(data.path));
    scope.setLevel(setSeverity(data.error));
    scope.setExtras({
      ...getUserIdAndStoreId(),
      endpoint: apiHost.url + data.path,
      method: data.method,
      params: data.params,
      payloadString: JSON.stringify(data.params),
      error: data.error
    });
    Sentry.captureMessage(`API Error ${data.path}`);
  });
};
/** SERVER DOWN */
export const sendDataServerDown = () => {
  Sentry.configureScope(function(scope) {
    scope.setTag('Bug Type', 'Service Error');
    scope.setLevel(Sentry.Severity.Fatal);
    Sentry.captureMessage('Service Error');
  });
};
/** local function */
const getUserIdAndStoreId = () => {
  const stateData = Store.getState();
  return {
    userId: stateData.user === null ? 'not login' : stateData.user.id,
    storeId:
      stateData.user === null
        ? 'not login'
        : stateData.user.userStores[0].storeId,
    token:
      stateData.permanent.token !== null
        ? stateData.permanent.token
        : 'not login'
  };
};
/** set severity */
const setSeverity = error => {
  if (error.data) {
    return Sentry.Severity.Warning;
  }
  return Sentry.Severity.Error;
};
