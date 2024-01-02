---
layout: post
title: Envar Loading
excerpt: Schema based envars for Node
categories:
  - post
---

Envars are one of those things that seems to bite new members to a project. Most of the time they're not documented, typed, and local setups gain invalid values over time. I wanted a way to simplify the process, as well as provide useful information to the developer.

- Use JSON Schema to parse, validate, and provide defaults for values - [link](https://github.com/gregdaynes/env/blob/e6642323fc450e18cb1b80dfccad17f7fc99751d/env-schema.js)
- Uses common .env file with newline separated KEY=VALUE entries.
- `TEST_` prefixed values will override un-prefixed values in NODE_ENV=test to avoid having multiple .env.* files.

Repo: [gregdaynes/env](https://github.com/gregdaynes/env)

```
# Start node repl with envars
$ node -r ./env-loader.js

# node repl
> console.log(process.env)
```
