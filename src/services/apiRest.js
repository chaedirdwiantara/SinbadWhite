import { set, isEmpty } from 'lodash';
import apiHost from './apiHost';
import { Store } from '../state/Store';
import firestore from '@react-native-firebase/firestore';

export default async function endpoint({ path, method, params }) {
  const stateData = Store.getState();
  const headers = {};

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  set(headers, 'X-Platform', 'agent-app');

  const reqBody = {
    method,
    headers
  };

  if (stateData.permanent.token !== null) {
    set(headers, 'Authorization', `Bearer ${stateData.permanent.token}`);
  }

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
          const ref = firestore().collection('error-reports');
          ref.add({
            endpoint: path,
            method,
            payload: params,
            token:
              stateData.permanent.token !== null
                ? stateData.permanent.token
                : 'not login',
            error: data,
            time: new Date()
          });
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
