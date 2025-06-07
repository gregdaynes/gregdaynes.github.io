---
layout: post
title: Hyde Fonts
categories:
  - project
excerpt:
---
A plugin for Jekyll that automates adding Google Fonts to your site.

_The repository has instructions to get up and running._

- [Hyde Fonts Repo](https://github.com/gregdaynes/hyde-fonts)
- [Ruby Gems](https://rubygems.org/gems/hyde-fonts)

### Features

- Utilizes a configuration file to specify fonts and variants to include in your site.

- Creates CSS declarations for each font.
   - This can be included as a file or inline with other CSS on your site.

   - Exposes a liquid tag `{% raw %}{% hyde_fonts link %}{% endraw %}` to include  the fonts in your site using a link tag. Or `{% raw %}{% hyde_fonts inline %}{% endraw %}` to include the CSS for inclusion in other CSS files or `<style>` tags.
