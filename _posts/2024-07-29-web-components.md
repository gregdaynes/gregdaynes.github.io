---
layout: post
title: Web Components 
date: 2024-07-29 10:55 -0700
categories:
  - note
excerpt: Collecting snippets and tips for Web Components
---

## handleEvent() 

Event handlers in javascript can take a handler function callback, or an object.
If the object has a `handleEvent()` method, that will be called when any event fires.
Debinding events works the same, pass `this` to `.removeEventListener('some-event', this)`

```
function someContext () {
  return {
    handleEvent() {
      // this will respond do any event triggered on the element
    }
  }
}

el.addEventListener('some-event', this)
```

This can lead to much simpler component markup, especially when debinding events[^1]


## References

[^1]: [The handleEvent() method is the absolute best way to handle events in Web Components](https://gomakethings.com/the-handleevent-method-is-the-absolute-best-way-to-handle-events-in-web-components)
[^2]: [Patterns for Memory Efficient DOM Manipulation with Modern Vanilla JavaScript](https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation)
