'use strict';

let base = {};

let is = function (x) {
  let r = {
    value: x,
    type: 'is',
    plus: function (y) {
      return is(x + y);
    },
    minus: function (y) {
      return is(x - y);
    },
    times: function (y) {
      return is(x * y);
    },
    dividedBy: function (y) {
      return is(x / y);
    },
    only: only(x),
    any: any(x),
    after: function (x) {
      return x;
    }
  }
  r.include = r;
  r.just = r.only;
  r.some = r.any;
  r.prototype = base;
  return r;
}

let to_list = function (x) {
  if (typeof x === 'number') {
    x = '' + x;
  }
  let r = [];
  if (typeof x === 'string') {
    for (let i = 0; i <= x.length; i++) {
      for (let j = 0; j < i; j++) {
        r.push(+x.slice(j, i));
      }
    }
  } else {
    for (let i of x) {
      r.push(i);
    }
  }
  return r;
}

let only = function (x) {
  let r = {
    value: x,
    type: 'only',
    after: function (x) {
      return x;
    }
  }
  r.prototype = base;
  return r;
}

let any = function (x) {
  let r = {
    value: x,
    type: 'any',
    after: function (x) {
      return x;
    }
  }
  r.prototype = base;
  return r;
}

is.any = any;
is.only = only;
any.of = any;
only.of = only;

let generalize = function (x) {
  base[x + '_number'] = base[x];
  base[x + '_numbers'] = base[x];
  base[x + 'Number'] = base[x];
  base[x + 'Numbers'] = base[x];
}

let wrap = function (f) {
  return function () {
    if (this.type === 'is') {
      return this.after(f(this.value));
    } else if (this.type)
  }
}

let define = function (x) {
  let r = function (y) {
    if (typeof y === 'number') {
      base[x] = wrap(function (z) {
        return y === z;
      });
      generalize(x);
    } else if (Array.isArray(y)) {
      base[x] = wrap(function (z) {
        return y.contains(z);
      });
      generalize(x);
    } else if (typeof y === 'function') {
      base[x] = function (z) {
        let copy = {};
        copy.prototype = z.prototype;
        for (let i in z) {
          copy[i] = z[i];
        }
        copy.after = function (x) {
          return y(z.after(x));
        }
        return copy;
      }
    } else {
      throw new Error('I have no idea what this is.');
    }
  }
  r.as = r;
  r.to = r;
  r.be = r;
}

define('not').to.be(function (x) {return !x});
define('unlucky').to.be([4, 9, 13, 17]);
define('lucky').to.be([7, 8]);
define('thirteen').to.be(13);
define('eight').to.be(8);
