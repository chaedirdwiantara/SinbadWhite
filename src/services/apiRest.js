import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';
import { Store } from '../state/Store';
import {
  sendDataApiError,
  sendDataServiceError
} from './report/sentry/sendDataToSentry';

export default async function endpoint({ path, method, params, testpath }) {
  const stateData = Store.getState();
  const headers = {};
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'X-Platform', 'agent-app');
  const reqBody = { method, headers };
  if (stateData.permanent.token !== null) {
    set(headers, 'Authorization', `Bearer ${stateData.permanent.token}`);
  }
  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }
  return fetch(testpath ? testpath : apiHost.url + path, reqBody)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return { result: 'Ok', code: 200, data: data };
        });
      } else {
        return response.json().then(data => {
          sendDataApiError({
            path,
            method,
            params,
            error: data
          });
          if (data.code > 1000) {
            return {
              result: 'Error',
              data: data,
              code: response.status,
              message: data.message,
              errorCodeMessage: data.data ? data.data.errCode : null
            };
          } else {
            return {
              result: 'Error',
              data: data.data,
              code: response.status,
              message: data.message,
              errorCodeMessage: data.data ? data.data.errCode : null
            };
          }
        });
      }
    })
    .catch(err => {
      sendDataServiceError({
        path,
        method,
        params
      });
      return {
        result: 'Error',
        code: 503,
        message: 'Server Down',
        errorCodeMessage: null,
        data: err
      };
    });
}
