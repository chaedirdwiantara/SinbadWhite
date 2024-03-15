import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';

export default async function endpoint({ path, method, params }) {
  const headers = {};

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  const reqBody = {
    method,
    headers
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(apiHost.urlMap + path, reqBody)
    .then(response => {
      if (response.status === 200) {
        return response.json().then(data => {
          return {
            result: 'Ok',
            code: 200,
            data: data
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
