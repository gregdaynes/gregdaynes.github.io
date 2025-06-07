---
layout: post
title: Hyde Decap
categories:
  - project
---

A plugin for Jekyll that removes some of the setup and configuration when adding Decap CMS to a Jekyll site.

_The repository has instructions to get up and running._

- [Decap CMS](https://decapcms.org)
- [Hyde Decap Repo](https://github.com/gregdaynes/hyde-decap)
- [Ruby Gems](https://rubygems.org/gems/hyde-decap)

### Features

- Automatic creation of the /admin (or custom page), which includes the Javascript and mount-point for Decap to load.

- It adds (Responsive Decap](https://github.com/hithismani/responsive-decap/) to provide a better mobile experience to Decap.

- Configuration for Decap CMS is through YML which Hyde Decap gets from Jekyll's `_config.yml` instead of a standalone config.

- Provides a command for Jekyll CLI `jekyll decap` which acts like `jekyll serve`, but launches two processes, one for building and serving Jekyll and the other running a local backend for Decap CMS to connect to.

   1. Serve - This is the same command as calling `jekyll serve` and any options passed to `jekyll decap` will be forwarded to `serve`

   2. [Netlify CMS Proxy Server](https://www.npmjs.com/package/netlify-cms-proxy-server) - Facilitates local development by stubbing OAuth login and git management.
