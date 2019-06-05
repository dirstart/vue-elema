const path = require('path');

const a = __dirname;
const b = '/img/so';
const c = 'foo';
const d = 'test';
const e = 'dota2';
const f = 'jx3';

let join1 = path.join(a, b);
let join2 = path.join(a, c, d);
let join3 = path.join(d, e, f);

let resolve1 = path.resolve(a, b);
let resolve2 = path.resolve(a, c, d);
let resolve3 = path.resolve(d, e, f);

console.log('join', join1, join2, join3);
console.log('resolve', resolve1, resolve2, resolve3);