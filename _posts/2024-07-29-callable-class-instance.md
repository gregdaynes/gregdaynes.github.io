---
layout: post
title: Callable Class Instance
date: 2024-07-29 18:55 -0700
categories:
  - note
excerpt: Class instance that can be called as a function?!
---

I encountered a situation in Javascript, where I needed a Class instance that could be called like a function.

StackOverflow to the rescue[^1]

```javascript
import test from 'node:test'
import assert from 'node:assert/strict'

test('Callable ClassInstance', () => {
  class Callable extends Function {
    constructor () {
      super('...args', 'return this.fn(...args)')
      return this.bind(this)
    }

    fn () {
      console.log('called')
    }
  }

  const callableInstance = new Callable()
  callableInstance()
})
```

Another approach, much simpler is to define a function, then attach properties to it.

```javascript
test('Callable Object Instance', () => {
  function Callable() {

    const fn = function () {
      console.log('called')
    }

    fn.someProperty = 'prop'

    return fn
  }

  const callableInstance = Callable() 
  callableInstance()
})
```

This approach breaks sharing Prototype Shapes, so too many of these will be problematic for memory[^2][^3].

## References

[^1]: [Calling class instance as a function in JavaScript](https://stackoverflow.com/questions/49279702/calling-class-instance-as-a-function-in-javascript)
[^2]: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
[^3]: [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics#shapes)
