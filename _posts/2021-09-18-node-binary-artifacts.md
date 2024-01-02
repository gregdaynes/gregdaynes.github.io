---
layout: post
title: Node CLI / Binary Artifacts
excerpt: Building NodeJS apps into single-file binaries.
categories:
  - note
---

A friend asked if it was possible to create binaries of a node application like Deno. I figured it would be a solved-problem, but didn't realize how easy it would be. Using Vercel's PKG package, it _just_ works.

_Note:_ This repo currently does not compile or execute on M1 Macs. I haven't bothered to investigate, but should be reasonable to resolve.

_Note:_ ESM is not supported. A rollup build step is required to convert ESM to CJS

Repo: [gregdaynes/pkg-test](https://github.com/gregdaynes/pkg-test)

```
# Build binaries
$ npm run build

# Run Binary
# ./pkg-test
```


