'use strict';

let base = {};

let is = function (x) {
  let props = {
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
  let r = Object.create(base);
  for (let i in props) {
    r[i] = props[i];
  }
  r.include = r;
  r.contain = r;
  r.just = r.only;
  r.all = r.only;
  r.some = r.any;
  return r;
}

let are = is;
let does = is;

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
  let props = {
    value: to_list(x),
    type: 'only',
    after: function (x) {
      return x;
    }
  }
  let r = Object.create(base);
  for (let i in props) {
    r[i] = props[i];
  }
  return r;
}

let any = function (x) {
  let props = {
    value: to_list(x),
    type: 'any',
    after: function (x) {
      return x;
    }
  }
  let r = Object.create(base);
  for (let i in props) {
    r[i] = props[i];
  }
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
    } else if (this.type === 'any') {
      return this.after(this.value.some(f));
    } else if (this.type === 'only') {
      return this.after(this.value.every(f));
    } else {
      throw new Error('Unknown type.');
    }
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
        return y.includes(z);
      });
      generalize(x);
    } else if (typeof y === 'function') {
      Object.defineProperty(base, x, {
        get: function () {
          let copy = Object.create(Object.getPrototypeOf(this));
          for (let i in this) {
            copy[i] = this[i];
            if (copy[i].after) {
              let old_after = this[i].after.bind(this[i]);
              copy[i].after = function (x) {
                return y(old_after(x));
              }
            }
          }
          let old_after = this.after.bind(this);
          copy.after = function (x) {
            return y(old_after(x));
          }
          return copy;
        }
      });
    } else {
      throw new Error('I have no idea what this is.');
    }
  }
  r.as = r;
  r.to = r;
  r.be = r;
  return r;
}

let internals = {
  base: base,
  to_list: to_list,
  generalize: generalize,
  wrap: wrap
}

define('not').to.be(function (x) {return !x});
define('unlucky').to.be([4, 9, 13, 17]);
define('lucky').to.be([7, 8]);
define('thirteen').to.be(13);
define('eight').to.be(8);

module.exports = {is, are, does, define, internals};
