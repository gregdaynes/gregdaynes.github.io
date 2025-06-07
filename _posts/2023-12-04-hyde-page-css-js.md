---
layout: post
title: Hyde Page CSS & JS
categories:
  - project
excerpt: A pair of plugins that provide frontmatter options to include CSS and JS files on specific pages and layouts.
---

Hyde Page CSS / JS are plugins that provide the ability to declare CSS and JS in the frontmatter of a page or layout.

_The repository has instructions to get up and running._

- [Hyde Page CSS Repo](https://github.com/gregdaynes/hyde-page-css)
- [Ruby Gems](https://rubygems.org/gems/hyde-page-css)

- [Hyde Page JS Repo](https://github.com/gregdaynes/hyde-page-js)
- [Ruby Gems](https://rubygems.org/gems/hyde-page-js)

### Preamble

These gems eschew the firmly established pattern of bundle your CSS and JS files together and serving them as single payloads.

This may be a bad idea in the long run, but so far, it's been successful for the sites I've used them and their predecessors on.

### Features

- Frontmatter option `css` or `js` which takes an array of file names in the `/assets/css` or `/assets/js` folder. These files are concatenated, minified and fingerprinted.

- Adds absolute urls to `page.css_files` or `page.js_files` for adding link tags to the page through liquid.

- Hierarchy of Layouts - with Jekyll, a page may have 0 or more layouts, in a hierarchical fashion, for example: `base.html > blog.hmtl > post.html > page`
  Each layout and page can have as many CSS/JS files as wanted, but will be concatenated to a single file per layout/page in the hierarchy.

