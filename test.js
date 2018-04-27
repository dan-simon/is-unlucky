const tap = require('tap');
const {is, are, does, define, internals} = require('./');

tap.equal(is(13).unlucky(), true);
tap.equal(is(2).unlucky(), false);
tap.equal(is(2).not.value, 2);
tap.equal(is(2).not.unlucky(), true);
tap.equal(does([2, 13]).contain.any.unluckyNumbers(), true);
tap.equal(does([2, 13]).contain.only.unluckyNumbers(), false);
tap.equal(does(117).contain.any.unluckyNumbers(), true);
tap.equal(does('123').contain.any.luckyNumbers(), false);
tap.equal(does('777').contain.any.luckyNumbers(), true);
tap.equal(does('777').contain.any.lucky_numbers(), true);
tap.equal(does('789').contain.any.eight(), true);
tap.equal(does('789').contain.only.eight(), false);
tap.equal(does('8').contain.only.eight(), true);
tap.equal(are([2, 4]).all.thirteen(), false);
tap.equal(are([13, 13]).all.thirteen(), true);

define('aLot').as([100, 1000000]);
tap.equal(is(100).aLot(), true);
tap.equal(is(1000).aLot(), false);

define('asNum').to.be.operator(function (x) {return +x});
tap.equal(is(100).asNum.thirteen(), 0);
tap.equal(is(100).not.asNum.thirteen(), 1);
tap.equal(is(100).asNum.not.thirteen(), true);

// exceptions
tap.throws(function() {
  define('testing').to.be({'a': 1});
}, new Error('I have no idea what this is ([object Object]).'), 'should throw error');

tap.throws(function() {
  let o = {type: 'weird'}
  o.test = internals.wrap(function (x) {return !x});
  o.test();
}, new Error('Unknown type.'), 'should throw error');

tap.throws(function() {
  Object.create(internals.base).not;
}, new Error("Either you've mucked around with " +
"the implementation or there's a bug."), 'should throw error');

tap.throws(function() {
  define('test').to.be.operator('test');
}, new Error('I have no idea what this is (test).'), 'should throw error');

// inner implementation stuff
tap.equal(is(2).not.value, 2);

// internals tests
tap.equal(
  Object.keys(internals).sort().join(', '),
  'base, generalize, to_list, wrap')

// stuff from the readme

tap.equal(is(13).unlucky(), true);
tap.equal(is(4).unlucky(), true);

tap.equal(is(4).plus(5).unlucky(), true);
tap.equal(is(12).plus(1).unlucky(), true);
tap.equal(is(4).minus(12).unlucky(), false);
tap.equal(is(14).minus(1).thirteen(), true);
tap.equal(is(1).times(8).unlucky(), false);
tap.equal(is(26).dividedBy(2).unlucky(), true);

tap.equal(is(8).lucky(), true);
tap.equal(is(3).plus(4).lucky(), true);
tap.equal(is(8).not.unlucky(), true);

tap.equal(is(8).thirteen(), false);
tap.equal(is(8).plus(5).thirteen(), true);
tap.equal(is(8).eight(), true);

tap.equal(does([1, 2, 13]).contain.any.unluckyNumbers(), true);
tap.equal(does([1, 2, 13]).contain.only.unluckyNumbers(), false);
tap.equal(does([1, 2, 13]).contain.any.eight(), false);
tap.equal(are.any.of([1, 2, 3]).lucky(), false);

tap.equal(is('B').thirteen(), false);
tap.equal(is('B').unlucky(), false);

tap.equal(is(100).big(), true);
tap.equal(is(40).big(), false);
tap.equal(is(1e6).a.lot(), true);
tap.equal(is(40).a.lot(), false);
tap.equal(is(7).small(), true);
tap.equal(is(10).small(), true);
tap.equal(is(13).small(), false);

// Stuff that had been in the README but was actually embarrassing.
tap.equal(is(88).all.eight(), false);
tap.equal(is(88).not.all.eight(), true);
