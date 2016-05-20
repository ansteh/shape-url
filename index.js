'use strict';
const _     = require('lodash');
const parseUrl = require('url').parse;

//let pathname = parseUrl(urlStr).pathname;

const parse = (pattern) => {
  return _.map(_.split(pattern, '/'), (value, key) => {
    if(_.startsWith(value, ':')){
      return { key: _.trim(value, ':') };
    }
    return { value: value };
  });
};

const params = (pattern) => {
  return _.chain(parse(pattern)).filter('key').map('key').value();
};

const builPath = _.curry((pattern, provider) => {
  let parsed = parse(pattern);
  if(_.get(parsed, '0.value') === '') parsed.shift();

  return _.reduce(parsed, (url, instance) => {
    let dir = instance.value;
    if(_.isUndefined(dir)) {
      dir = provider[instance.key];
    }
    return `${url}/${dir}`;
  }, '');
});

const buildUrl = _.curry((pattern, provider) => {
  let url = parseUrl(pattern);
  let prefix = '';
  if(url.hostname){
    prefix = `${url.protocol}//${url.hostname}`;
  }
  return `${prefix}${builPath(url.pathname, provider)}`;
});

module.exports = {
  parse: parse,
  params: params,
  builPath: builPath,
  buildUrl: buildUrl
};
