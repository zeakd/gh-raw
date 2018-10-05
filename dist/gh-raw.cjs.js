'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var urlJoin = _interopDefault(require('url-join'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

class GhRaw {
  constructor({
    repository,
    blob = 'master',
    branch,
    commit
  } = {}) {
    this.repository = repository;
    this.blob = branch || commit || blob;
    this.axios = axios.create({
      baseURL: 'https://raw.githubusercontent.com/'
    });
  }

  get(path, options = {}) {
    const repository = options.repository || this.repository;
    const blob = options.blob || options.branch || options.commit || this.blob;
    if (!repository) throw new Error('gh-raw: options.repository is required');
    return this.axios.get(urlJoin(repository, blob, path)).then(res => res.data);
  }

  extend(options) {
    return new GhRaw(_objectSpread({
      repository: this.repository,
      blob: this.blob
    }, options));
  }

} // make default request object


const ghRaw = new GhRaw();

module.exports = ghRaw;