---
layout: post
title: Composability with Entity-Component Systems
excerpt:
categories:
  - post
---
This was an exploration of Entity-Component System pattern used in game development. I wanted to see if the pattern could help with legibility and composability.

Repo: [gregdaynes/entity-component](https://github.com/gregdaynes/entity-component)

```sh
# Run application, stdout JSON data results
$ npm start

# Run application with profiling data, stdout pretty JSON data & performance metrics/telemetry
$ npm run profile
```

While not as performant as the original implementation. EC proved to be a happy in-between performance and maintainability. I found it to be like [Function Composition](/function-composition) as well as way more memory efficient (this is where EC proves it’s value).

The concept is for entites to act as containers of data with a global unique dentifier. The logic exists outside of the entities in systems. Each system operates on entities which have the components the system knows about. Usually a system performs arithmetic, which makes it fast and efficient.

This served as a place to experiment with the new [Performance Hooks](https://nodejs.org/dist/latest-v16.x/docs/api/perf_hooks.html#perf_hooks_performance_measurement_apis) API.

- Choosing to write this using Classes instead of Prototype, I found it to be more legible. Programmers coming from OOP languages like Ruby makes this easier to understand.
- For/of loops and if/else blocks are also used instead of collection methods like map/reduce. Ease for programmers of all levels to understand without Javascript collections knowledge. And keep me away from long method chains.
- Main loop which performs 100,000 frames (iterations) of systems over the entities - [link](https://github.com/gregdaynes/entity-component/blob/5a859c67f7e9ce161e10daefd38dd6d43378f8de/src/index.js#L60-L75)
- Entity factory shows creation of entities with their components- [link](https://github.com/gregdaynes/entity-component/blob/5a859c67f7e9ce161e10daefd38dd6d43378f8de/src/factory-ship.js)
- Customizing entities with more components - [link](https://github.com/gregdaynes/entity-component/blob/5a859c67f7e9ce161e10daefd38dd6d43378f8de/src/index.js#L43-L50)
- Entity Manager which maintains collections of entities and their components - [link](https://github.com/gregdaynes/entity-component/blob/5a859c67f7e9ce161e10daefd38dd6d43378f8de/src/lib/entity-manager.js)
- Wrapper for perf hooks - [link](https://github.com/gregdaynes/entity-component/blob/5a859c67f7e9ce161e10daefd38dd6d43378f8de/src/lib/perf.js)

I'm still exploring the posibile applications of an EC-like pattern outside of games.

