---
layout: post
title: Function Composition
excerpt: Use function composition to construct functions greater than the sum of  their parts.
categories:
  - post
tags:
  - fp
  - javascript
---

This is a quick look at applying one of the core concepts in functional programming - Composition.

Starting with a simple function that takes a number as value and adds 2.

```js
const addTwo = (value) => value + 2;
```

Another function that multiplies a value by 3.

```js
const timesThree = (value) => value * 3;
```

Putting the functions to use, we can write something like

```js
const x = 1;
const y = addTwo(x);
const z = timesThree(y);
```

When run, it yields 9.

Another way to write this without the intermediate variables

```js
const x = timesThree(addTwo(1));
```

Again yields 9, but is slightly awkward to read at a glance.

_This is an example of Javascript's first class functions. We can use them as variables, and use them as values in other functions._

It works the same as the more verbose way, read from right to left. Starting with the value `1`, then passing that as an argument to `addTwo`, once again passing that as a param, this time to `timesThree`.

We can use composition to help us make it easier to read (this is also called Currying or Piping). There is one caveat; the composed functions can only have an arrity of 1 (they can only take 1 argument). Luckily for our simple functions above, they take 1 argument, and return 1 value. Ideal candidates for composition.

```js
function compose(...fns) {
  return function compose(input) {
    return fns.reduce((v, fn) => v.then(fn), Promise.resolve(input));
  };
}
```

This compose function, takes a list of functions as arguments, and returns a new instance of the function that takes an argument which the original list of functions are applied in order.

**bonus, this handles promises returned from functions**

This is a slightly different approach from some user-land libraries that offer composition/currying. They are usually read right to left because of how we pass in the first argument.

```js
compose(addTwo, timesThree)(1);
```

This looks pretty good. A quick glance gets the majority of how it works, but the `1` seems out of place. With only a handful of operations it's not a problem. It starts to break down when you have many operations that are being done.

```js
const life = compose(
  drinkCoffee,
  eatBiscuit,
  playVideogame,
  sleep,
  drinkCoffee,
  gotoWork
)("greg");
```

Reading the variable, then understanding that a composition is about to occur, jump to the end, figure out what the argument is, jump back to the compose and read what is about to happen. Again, this is where having it read right to left might be preferable.

A very simple and quick fix for this is to define the initial value as the first argument in the list of functions. We'll call this `pipe`

```js
function pipe(x, ...fns) {
  return compose(...fns)(x);
}
```

Now we can move the initial value to the start of the list of arguments.

```js
const life = compose(
  "greg",
  drinkCoffee,
  eatBiscuit,
  playVideogame,
  sleep,
  drinkCoffee,
  gotoWork
);
```

That's it. A brief look at function composition.

There's still the issue of having each function take a single argument. The quick solution is Objects/Enums as the input/output of each function. Type-checking tools help here in figuring out what the IO for each step is.

Another solution, which I tend to reach for is to embrace the single argument functions, but make each function in the list, also return a function. That was worded horribly, here's an example.

```js
const add = (i) => (value) => value + i;
const multiply = (i) => (value) => value * i;

pipe(1, add(2), multiply(3));
```

This yields 9 again, and gives the functions more flexibility/configurability without too much extra work.

This method is not ideal, but can help keep things simple when getting into function composition.

Here's a real world example of function composition, that is not one of these trivial `(1 + 2) * 3 = 9` operations that is easier written inline.

```js
async function createArticle(article) {
  const connection = connect()

  return await pipe(
    connection,
    useDatabase(databaseName)
    useCollection(collectionName)
    insertOne(article)
    handleCreateResult()
    close(connection)
  )
}
```

Here you can read the composition top to bottom, with care in naming you don't have to be a programmer to understand what's going on.

Once you learn and determine how you can apply composition to your code, you'll start to see the possibility of pipes everywhere and how they can simplify even the most complex functions into simple, legible operations.

Some guidelines to leave you with:

- Function should aim for an arrity of 1 to prevent complications
- Function should do 1 thing, break multiple things into multiple functions
- Composable functions lend themselves to unit tests

**Some libraries that offer Composition**

- [Ramda](https://ramdajs.com/)
- [Lodash](https://lodash.com/)
