---
layout: post
title: Sweepline
excerpt: efficient flattening of multi-dimensional data over time.
categories:
  - post
---

This is a modified and incomplete implementation of the [Sweep Line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm). I developed this to take a small set of around 100k objects, containing key date data. The goal was to group the objects based on their dates, without overlapping. Objects could span many group. Additionally the function needed to be isomorphic, and fast enough that it would not block rendering (60fps) in the browser.

Repo: [gregdaynes/sweepline](https://github.com/gregdaynes/sweepline)

```sh
# Run application, stdout JSON data results
$ npm start
```

A visualization of the data, and desired output
```
Input
                  ┌─────┐
                  │  C  │
                  └─────┘
    ┌───┐ ┌────┐      ┌─────────┐
    │ B │ │ B  │      │    B    │
    └───┘ └────┘      └─────────┘
 ┌──────────┐  ┌───┐         ┌───┐
 │    A     │  │ A │         │ A │
 └──────────┘  └───┘         └───┘
──────────────────────────────────▶
               Time

Results
 ┌──┬───┬─┬─┬──┬──┬┬──┬─┬────┬──┬┐
─┴──┴───┴─┴─┴──┴──┴┴──┴─┴────┴──┴┴▶
  A   A  A A B  A  A C B   B  A A
      B    B       C   C      B
```

Sweepline proved to be useful in a few areas of the application. Cleaning up logic unique to each implementation which was
- illegible—nested foreach loops
- terse—nested ternary
- untested—untestable code
