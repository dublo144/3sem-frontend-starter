import { authUtils } from './authUtils';

const baseURL = 'http://localhost:8080/security_war_exploded';

const handleHttpErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
};

const makeOptions = (method, body, token) => {
  const opts = {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (token) {
    opts.headers['x-access-token'] = token;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const fetchData = (url, opts) => {
  return fetch(`${baseURL}/${url}`, opts).then(handleHttpErrors);
};

export const apiUtils = {
  fetchData: fetchData,
  handleHttpErrors: handleHttpErrors,
  makeOptions: makeOptions
};
