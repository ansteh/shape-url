'use strict';
const _   = require('lodash');
const parse = require('url').parse;

const parsePath = (url, pattern) => {
  let pathname = parse(url).pathname;
  let fields = _.split(pattern, "/");
  if(_.get(fields, '0') === '') {
    fields.shift();
  }
  let values = _.split(pathname, "/");
  if(_.get(values, '0') === '') {
    values.shift();
  }
  let collector = {};
  _.forEach(fields, (field, index) => {
    collector[index.toString()] = values[index];
    if(_.startsWith(field, ':')) collector[_.trimStart(field, ':')] = values[index];
  });
  return collector;
};

module.exports = {
  parse: {
    path: parsePath
  }
};
