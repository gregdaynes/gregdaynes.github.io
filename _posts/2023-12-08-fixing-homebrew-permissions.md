---
layout: post
categories:
  - note
title: Fixing Homebrew permissions when using ASDF
excerpt: Ruby Gem management with ASDF-VM sometimes encounters issues with permissions when using bundler to manage gems.
---

Ruby Gem management with ASDF-VM sometimes encounters issues with permissions when using bundler to manage gems. I haven't gotten to the root-cause, but this snippet helps in fixing the permissions.

```bash
sudo chown -R $(whoami) $(brew --prefix)/*
```

Original post on [Stackoverflow](https://stackoverflow.com/questions/16432071/how-to-fix-homebrew-permissions)
