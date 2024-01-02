---
layout: post
title: Cupped Brews — Code Demonstrations & Experiments
excerpt: Collected projects and playgrounds. Most often to figure out a problem for work, also for fun.
categories:
  - post
---

{% include components/post/toc.html %}

I realize how disorganized my Github repository list has become. Until I tidy it, this list will serve as _things I have worked on recently_.

## Lazy Short URLS

Repo: [gregdaynes/shortr](https://github.com/gregdaynes/shortr)

```sh
# Run application web server on port 3000
$ npm start
```

Recently when a friend was interviewing for a job, one of the code challenges was to create a url shortener. I decided to give it a try.

- Encode the recieved url with HMAC from Node's internal crypto library - [Link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L36-L41)
- Append an entry `${hash}:${url}` to a plaintext file - [link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L47-L48)
- Stores hash:url in a Set (Restored from the plaintext file on start) - [link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L7-L20)


## Composability with Entity-Component Systems

Repo: [gregdaynes/entity-component](https://github.com/gregdaynes/entity-component)

```sh
# Run application, stdout JSON data results
$ npm start

# Run application with profiling data, stdout pretty JSON data & performance metrics/telemetry
$ npm run profile
```

An exploration of Entity-Component System pattern used in game development. I wanted to see if the pattern could help with legibility and composability.

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


## Redis Recovery

Repo: [gregdaynes/redis-recovery](https://github.com/gregdaynes/redis-recovery)

```sh
# I don't recommend running this application - Bull queue data + env is required
```

This script came out of a need one Saturday where an applications job queue was not working as expected. _I am fuzzy on details of what had ocurred_. It might been from moving job data over to an Elixir application. I attempted fixing with several Redis admin tools, but the dataset ended up being too large.

- Uses event emitter, which was nice for developing in a pipeline style, while ignoring order.
- This was my first Node ESM module.
- In hindsight the use of Redis instead of IO Redis made things more annoying Promisify - [link](https://github.com/gregdaynes/redis-recovery/blob/965d236cb8671c42d32c4b54ff03e05aa6e2b116/index.js#L7-L11)
- I am not sure why I used promisify with `node:fs/appendFile` when a better option would be to use `node:fs/promises` - [link](https://github.com/gregdaynes/redis-recovery/blob/965d236cb8671c42d32c4b54ff03e05aa6e2b116/index.js#L11)


## Sweepline

Repo: [gregdaynes/sweepline](https://github.com/gregdaynes/sweepline)

```sh
# Run application, stdout JSON data results
$ npm start
```

This is a modified and incomplete implementation of the [Sweep Line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm). I developed this to take a small set of around 100k objects, containing key date data. The goal was to group the objects based on their dates, without overlapping. Objects could span many group. Additionally the function needed to be isomorphic, and fast enough that it would not block rendering (60fps) in the browser.

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


## Context-Aware Logging

Repo: [gregdaynes/chip-log](https://github.com/gregdaynes/chip-log)

Readme in repository has a breakdown of installation and usage.

One of the last projects I used Express on, had logging issues.
- Context between backend services,
- performance constraints,
- PII in the output.

Chip Log is a wrapper around PinoJS (a recommended replacement for other loggers like Morgan and Winston).

I no longer work to maintain this module. Instead directing attention to Fastify which has existing extensions providing these features. It should still work. The inspector will _probably_ break on Node 15+ and definitely can't operate in ESM mode.


## Envar Loading

Repo: [gregdaynes/env](https://github.com/gregdaynes/env)

```
# Start node repl with envars
$ node -r ./env-loader.js

# node repl
> console.log(process.env)
```

Envars are one of those things that seems to bite new members to a project. Most of the time they're not documented, typed, and local setups gain invalid values over time. I wanted a way to simplify the process, as well as provide useful information to the developer.

- Use JSON Schema to parse, validate, and provide defaults for values - [link](https://github.com/gregdaynes/env/blob/e6642323fc450e18cb1b80dfccad17f7fc99751d/env-schema.js)
- Uses common .env file with newline separated KEY=VALUE entries.
- `TEST_` prefixed values will override un-prefixed values in NODE_ENV=test to avoid having multiple .env.* files.


## CLI / Binary Artifact

Repo: [gregdaynes/pkg-test](https://github.com/gregdaynes/pkg-test)

```
# Build binaries
$ npm run build

# Run Binary
# ./pkg-test
```

A friend asked if it was possible to create binaries of a node application like Deno. I figured it would be a solved-problem, but didn't realize how easy it would be. Using Vercel's PKG package, it _just_ works.

_Note:_ This repo currently does not compile or execute on M1 Macs. I haven't bothered to investigate, but should be reasonable to resolve.


## App Example

Repo: [app-example](https://github.com/gregdaynes/app-example)

Readme in repository has in-depth documentation on the organization, cli, code generation, testing, database.

```sh
# Install modules for each area of the application
$ npm run setup

# Add required keyvalues to .env
# starting the application will inform you what required values are missing
# you can use the following
JWT_SECRET=supersecret
DB_CLIENT=mysql
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
DB_HOST=127.0.0.1
DB_PORT=3306
TEST_DB_CLIENT=sqlite3
TEST_DB_FILENAME=:memory:
TEST_DB_POOL_MIN=1
TEST_DB_POOL_MAX=1

# Setup Database
# if you don't have a local MySQL install, you can use the docker compose file included in this project to set up quickly.
# Note that the envars for MYSQL_ROOT_PASSWORD and MYSQL_DATABASE need to be defined in .env before running the following command.
$ docker compose up -d

# Migrate + Seed database
# you can use the script `db` to perform operations with KnexJS or use the CLI
$ npm run cli

$ npm run db -- migrate:latest
$ npm run db -- seed:run

# Running API Server
$ npm run start:api
# pino-pretty can provide cleaner stdout logs for dev
$ npm run start:api | npx pino-pretty

# Running Tests
# app tests
$ npm run test:app
# api tests
$ npm run test:api
# api & app tests
$ npm run test
```

A _mostly_ complete example for a monolith, which is also suitable for building "microservices".

- Mocha used as test runner for both the Api and the frontend (frontend excluded from this repository). I would personally choose to use [tap](https://www.npmjs.com/package/tap) for the Api, and Jest for the Frontend. I dislike Jest for testing Node because of the changes made to the runtime. There are also issues with slow adoption of newer capabilities (because of the these changes)—eg: ESM
- Replacing the database with SQLite when testing has been a positive choice for fast development (TDD). Given the choice again I would opt to use an in-memory-tuned instance of the production database for integration testing.
- No workspaces. I ran into an issue with other developers NPM not working with the _then new_ workspace feature (NPM @ 7). Yarn would have worked for this, as well as PNPM.
- Hygen for generating code based on `ejs` templates - [copy-template-dir](https://www.npmjs.com/package/copy-template-dir) or similar.
- CLI came after most of the application and web interface was complete. Nowadays I would build the CLI in parallel with the application logic. This benefits development by not having to remember REPL commands or building out administration uis.

The repository contains `app-example-requests.paw` and `app-example-requests-postman.json` for interacting with the api through Paw or Postman.
