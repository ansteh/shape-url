'use strict';
const shape = require('./index.js');

let parsed = shape.parse.path('/one/two/three', '//:mid/');
console.log(parsed);
