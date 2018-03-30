const tap = require('tap');
const {is, are, does, define} = require('./');

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

define('asNum').to.be(function (x) {return +x});
tap.equal(is(100).asNum.thirteen(), 0);
tap.equal(is(100).not.asNum.thirteen(), 1);
tap.equal(is(100).asNum.not.thirteen(), true);

// exception
tap.throws(function() {
  define('testing').to.be('test');
}, new Error('I have no idea what this is.'), 'should throw error');

// inner implementation stuff
tap.equal(is(2).not.value, 2);
