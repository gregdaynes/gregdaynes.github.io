---
layout: post
title: Redis Recovery
excerpt: Fixing a Bull Queue instance from overflowning
categories:
  - post
---

This script came out of a need one Saturday where an applications job queue was not working as expected. _I am fuzzy on details of what had occurred. It might been from moving job data over to an Elixir application. I attempted fixing with several Redis admin tools, but the dataset ended up being too large.

Repo: [gregdaynes/redis-recovery](https://github.com/gregdaynes/redis-recovery)

```sh
# I don't recommend running this application - Bull queue data + env is required
```

- Uses event emitter, which was nice for developing in a pipeline style, while ignoring order.
- This was my first Node ESM module.
- In hindsight the use of Redis instead of IO Redis made things more annoying Promisify - [link](https://github.com/gregdaynes/redis-recovery/blob/965d236cb8671c42d32c4b54ff03e05aa6e2b116/index.js#L7-L11)
- I am not sure why I used promisify with `node:fs/appendFile` when a better option would be to use `node:fs/promises` - [link](https://github.com/gregdaynes/redis-recovery/blob/965d236cb8671c42d32c4b54ff03e05aa6e2b116/index.js#L11)
x