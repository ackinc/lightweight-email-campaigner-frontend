import axios from 'axios';

const RUNNING_ON_LOCALHOST = /localhost/.test(window.location.origin);
const BACKEND_LOCATION = RUNNING_ON_LOCALHOST ?
  'http://localhost:8000' :
  'https://khonvo-challenge-backend.herokuapp.com';

export function get(url, query, needAuth = false) {
  const config = { baseURL: BACKEND_LOCATION, params: query };

  if (needAuth) {
    const token = window.localStorage.getItem('token');
    if (token) config.headers = { authorization: token };
    else throw new AuthError('Request needs to carry auth, but no auth token found');
  }

  return axios.get(url, config)
    .then(({ data }) => data)
    .catch(processRequestError);
}

export function post(url, data, needAuth = false) {
  const config = { baseURL: BACKEND_LOCATION };

  if (needAuth) {
    const token = window.localStorage.token;
    if (token) config.headers = { authorization: token };
    else throw new AuthError('Request needs to carry auth, but no auth token found');
  }

  return axios.post(url, data, config)
    .then(({ data }) => data)
    .catch(processRequestError);
}

function processRequestError(err) {
  const { response, request, message, config } = err;

  if (response) { // received a non-2xx response from server
    const { status, data } = response.status;

    // if the server response has an error message, use that
    // else use the generic error message provided by axios
    const errMsg = data && data.error ? data.error : message;

    if (status >= 500) throw new ServerError(errMsg);
    if (status === 404) throw new ResourceNotFoundError('The requested resource was not found');
    if (status >= 401) throw new AuthError(errMsg);
    /* status === 400 */ throw new InvalidInputError(errMsg);
  }

  console.log(config);
  console.error(err);

  // request sent, but did not receive a response from the server
  if (request) {
    // this is fun
    if (/EAI_AGAIN/.test(message)) throw new NetworkError('We are offline');
    if (/ENOTFOUND/.test(message)) throw new NetworkError('The server could not be found');
    if (/ECONNREFUSED/.test(message)) throw new BadRequestError('There is no server application listening at that address');
    if (/socket hang up/i.test(message)) throw new BadRequestError('The server refused our request');
    if (/(EPROTO)|(parse error)/i.test(message)) throw new BadRequestError('The server speaks a different protocol');
    throw new ServerError(message); // the server probably crashed
  }

  // error occurred while setting up the request
  throw new Error(message);
}

class ResourceNotFoundError extends Error {
  constructor(message = 'The server could not find the requested resource') {
    super(message);
    this.name = 'NetworkError';
  }
}

class BadRequestError extends Error {
  constructor(message = 'There was something wrong with your request') {
    super(message);
    this.name = 'NetworkError';
  }
}

class NetworkError extends Error {
  constructor(message = 'You seem to be offline') {
    super(message);
    this.name = 'NetworkError';
  }
}

class ServerError extends Error {
  constructor(message = 'Something went wrong on the server') {
    super(message);
    this.name = 'ServerError';
  }
}

class AuthError extends Error {
  constructor(message = 'The auth credentials you sent were invalid') {
    super(message);
    this.name = 'AuthError';
  }
}

class InvalidInputError extends Error {
  constructor(message = 'The input you sent was invalid') {
    super(message);
    this.name = 'InputError';
  }
}
