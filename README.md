# is-unlucky

An npm package to check if a number is unlucky. Meant as an alternative to
is-thirteen.

## Why use it?

1. You might want to use is-thirteen to find whether a number is unlucky.
However, that may cause trouble for people in other parts of the world where
different numbers are unlucky. For example, in Japan, 4 and 9 are considered
unlucky. This package considers 4, 9, 13, and 17 to be unlucky, and issues with
more unlucky numbers from other cultures are welcome.

2. This package also can be used to test whether numbers are lucky. 7 and 8
are considered lucky.

3. If you really wanted to check whether a number is 13, you still can. Just
use the thirteen method!

4. The syntax is pleasantly English-like. Consider:

```javascript
does([1, 2, 13]).contain.any.unluckyNumbers(); // true
```

or

```javascript
are.any.of([1, 2, 3]).lucky(); // false
```

(both of which are in the examples you can get to by just scrolling down).

5. There is 100% test coverage.

6. is-unlucky exposes all its internals in an internals export, so if you want to play around with it you can.

7. is-unlucky is more honest than is-thirteen about whether something is 13.
Let's face it: the letter B is not thirteen, neither is it unlucky.

8. It has testing for whether a number is 8, not just 13. This can be extended
to other numbers by users via the define function.

9. I would again like to point out the importance of 100% test coverage in
today's world. For example, this list appears differently on npm and github,
and presumably one of those two markdown parsers is broken. If they both had
the same quality as is-unlucky, this would not be an issue.

## Examples

```javascript
const {is, are, does} = require('./');

is(13).unlucky(); // true
is(4).unlucky(); // true

is(4).plus(5).unlucky();      // true
is(12).plus(1).unlucky();    // true
is(4).minus(12).unlucky();    // false
is(14).minus(1).thirteen();    // true
is(1).times(8).unlucky();    // false
is(26).dividedBy(2).unlucky();  // true

is(8).lucky(); // true
is(3).plus(4).lucky(); // true
is(8).not.unlucky(); // true

is(8).thirteen(); // false
is(8).plus(5).thirteen(); // true
is(8).eight(); // true

does([1, 2, 13]).contain.any.unluckyNumbers(); // true
does([1, 2, 13]).contain.only.unluckyNumbers(); // false
does([1, 2, 13]).contain.any.eight(); // false
are.any.of([1, 2, 3]).lucky(); // false
is(88).all.eight(); // false
is(88).not.all.eight(); // true

is('B').thirteen(); // false
is('B').unlucky(); // false
```

## License

MIT
