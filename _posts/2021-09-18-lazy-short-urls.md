---
layout: post
title: Lazy Short URLs
excerpt: Recently when a friend was interviewing for a job, one of the code challenges was to create a url shortener. I decided to give it a try.
categories:
  - post
---

Recently when a friend was interviewing for a job, one of the code challenges was to create a url shortener. I decided to give it a try.

Repo: [gregdaynes/shortr](https://github.com/gregdaynes/shortr)

```sh
# Run application web server on port 3000
$ npm start
```

- Encode the received url with HMAC from Node's internal crypto library - [Link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L36-L41)
- Append an entry `${hash}:${url}` to a plaintext file - [link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L47-L48)
- Stores hash:url in a Set (Restored from the plaintext file on start) - [link](https://github.com/gregdaynes/shortr/blob/492cb8fe770fef12ac8ca8f1c291413f3f0c82df/index.mjs#L7-L20)
