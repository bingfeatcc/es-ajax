import XhrAbstract from './xhr-abstract';
import internal from './utils/internal';
import { methods } from './utils/methods';

export default class FetchAPI extends XhrAbstract {
  constructor(url, request = {}, headers = {}) {
    super();

    const self = internal(this);

    self._defaultHeaders = {
      'Content-Type': 'text/plain'
    };
    self._defaultRequest = {
      method: methods.get,
      mode: 'cors', // cors, no-cors, same-origin, cors-with-forced-preflight
      // Should cookies go with the request?
      credentials: 'omit', // omit, same-origin
      redirect: 'follow', // follow, error, manual
      cache: 'default' // default, reload, no-cache
    };
    self._url = url;

    if (!fetch) {
      throw new Error('Fetch is not supported.');
    }

    this
      .setHeaders(headers)
      .setRequest(request);

    return this;
  }

  send() {
    return fetch(internal(this)._request);
  }

  cancel() {
    throw new Error('Currently it is not possible to cancel a request in "fetch".');
  }

  onProgress() {
    throw new Error('Currently it is not possible to check a progress via "fetch".');
  }

  file() {
    throw new Error('Currently it is not possible to send a file via "fetch".');
  }

  setTimeout() {
    throw new Error('Currently it is not possible to set timeout for "fetch".');
  }

  hasHeader(header) {
    return internal(this)._headers.has(header);
  }

  setHeaders(headers = {}) {
    const self = internal(this);

    if (typeof headers !== 'object') {
      throw new TypeError(`${headers} must be an object`);
    }

    self._headers = new Headers(
      Object.assign({}, self._defaultHeaders, headers)
    );

    return this;
  }

  setRequest(request = {}) {
    // const self = internal(this);

    if (typeof request !== 'object') {
      throw new TypeError(`${request} must be an object`);
    }

    // @todo
    // self._request = new Request(self._url,
    //   Object.assign({}, self._defaultRequest, headers: self._headers)
    // );

    return this;
  }
}
