import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';

export default function endpoint({ path, method, params }) {
  const headers = {};

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'X-Platform', 'agent-app');

  const reqBody = {
    method,
    headers
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(apiHost.url + path, reqBody)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return {
            result: 'Ok',
            code: 200,
            data: data
          };
        });
      } else {
        return response.json().then(data => {
          return {
            result: 'Error',
            data: data.data,
            code: response.status,
            message: data.message,
            errorCodeMessage: data.data ? data.data.errCode : null
          };
        });
      }
    })
    .catch(err => {
      return {
        result: 'Error',
        code: 503,
        message: 'Server Down',
        errorCodeMessage: null,
        data: err
      };
    });
}
