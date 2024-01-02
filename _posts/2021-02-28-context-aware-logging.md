---
layout: post
title: Context-Aware Logging
excerpt: A small module to provide Pino JS logger with additional context around the log statement.
categories:
  - post
---
One of the last projects I used Express on, had logging issues.
- Context between backend services,
- performance constraints,
- PII in the output.

Chip Log is a wrapper around PinoJS (a recommended replacement for other loggers like Morgan and Winston).

I no longer work to maintain this module. Instead directing attention to Fastify which has existing extensions providing these features. It should still work. The inspector will _probably_ break on Node 15+ and definitely can't operate in ESM mode.

Repo: [gregdaynes/chip-log](https://github.com/gregdaynes/chip-log)

Readme in repository has a breakdown of installation and usage.
