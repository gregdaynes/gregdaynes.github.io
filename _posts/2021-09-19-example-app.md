---
layout: post
title: Example NodeJS Application
excerpt: An example application in NodeJS
categories:
  - post
---

_Note: While this is outdated, some of the takeaways are still valid. I hope to do a follow up - with the same idea using current proven practices and dependencies._

A _mostly_ complete example for a monolith, which is also suitable for building "microservices".

- Mocha used as test runner for both the Api and the frontend (frontend excluded from this repository). I would personally choose to use [tap](https://www.npmjs.com/package/tap) for the Api, and Jest for the Frontend. I dislike Jest for testing Node because of the changes made to the runtime. There are also issues with slow adoption of newer capabilities (because of the these changes)—eg: ESM
- Replacing the database with SQLite when testing has been a positive choice for fast development (TDD). Given the choice again I would opt to use an in-memory-tuned instance of the production database for integration testing.
- No workspaces. I ran into an issue with other developers NPM not working with the _then new_ workspace feature (NPM @ 7). Yarn would have worked for this, as well as PNPM.
- Hygen for generating code based on `ejs` templates - [copy-template-dir](https://www.npmjs.com/package/copy-template-dir) or similar.
- CLI came after most of the application and web interface was complete. Nowadays I would build the CLI in parallel with the application logic. This benefits development by not having to remember REPL commands or building out administration uis.

The repository contains `app-example-requests.paw` and `app-example-requests-postman.json` for interacting with the api through Paw or Postman.

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


