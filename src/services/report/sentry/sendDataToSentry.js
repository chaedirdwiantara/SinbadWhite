import { Sentry } from './SentryConfig';
import { getTeam } from './apiTeamList';
import apiHost from '../../apiHost';
import { Store } from '../../../state/Store';
/** API ERROR */
export const sendDataApiError = data => {
  Sentry.configureScope(function(scope) {
    scope.setTag('Bug Type', 'API Error');
    scope.setTag('Team', getTeam(data.path));
    scope.setExtras({
      ...getUserId(),
      endpoint: apiHost.url + data.path,
      method: data.method,
      params: data.params,
      payloadString: JSON.stringify(data.params),
      error: data.error
    });
    switch (data.path) {
      case 'auth/login':
      case 'auth/check-phone':
        scope.setLevel(Sentry.Severity.Warning);
        Sentry.captureMessage(
          `API Error ${data.path} ${getPhoneNumber(data.params)}`
        );
        break;
      default:
        scope.setLevel(setSeverity(data.error));
        Sentry.captureMessage(`API Error ${data.path}`);
        break;
    }
  });
};
/** SERVER DOWN */
export const sendDataServiceError = data => {
  Sentry.configureScope(function(scope) {
    scope.setTag('Bug Type', 'Service Error');
    scope.setTag('Team', getTeam(data.path));
    scope.setLevel(Sentry.Severity.Fatal);
    scope.setExtras({
      ...getUserId(),
      endpoint: apiHost.url + data.path,
      method: data.method,
      params: data.params,
      payloadString: JSON.stringify(data.params)
    });
    Sentry.captureMessage(`Service Error ${data.path}`);
  });
};
/** local function */
const getUserId = () => {
  const stateData = Store.getState();
  return {
    userId: stateData.user === null ? 'not login' : stateData.user.id,
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
/** get phone number */
const getPhoneNumber = data => {
  if (data) {
    return data.mobilePhoneNo;
  }
  return 'not found';
};
