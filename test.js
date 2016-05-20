'use strict';
const shape = require('./index.js');
const assert = require('assert');

let patternExmp = '/test/:mid/2/:a';
assert.deepEqual(shape.parse(patternExmp), [{ value: '' }, { value: 'test' }, { key: 'mid' }, { value: '2' },{ key: 'a' } ]);
assert.deepEqual(shape.params(patternExmp), ['mid', 'a']);
assert.deepEqual(shape.buildUrl(patternExmp, { mid: 'mid', a: 123 }), '/test/mid/2/123');
assert.deepEqual(shape.buildUrl('http://test.com/test/:mid/2/:a', { mid: 'mid', a: 123 }), 'http://test.com/test/mid/2/123');
