---
layout: post
title: Hexdump shell command
date: 2024-02-09 19:52 -0800
categories:
  - note
---

I was asked to help understand the following command

```sh
xxd -p data.txt | tr -d '\n' | sed 's/.{2}/0x&,/g' > obfuscated.txt
```

This is my breakdown

`xxd -p data.txt` dumps the hex value of the data.
`tr -d '\n'` is deleting `\n` on each input, it's removing newlines.
`sed -E 's/.{2}/0x&,/g'` takes the single line input and checks it against the regex.

`s/.{2}/0x&,/g` breaks down to
`.{2}` which says match 2 of any non line-terminating character such as `\n`
`0x&,` is then used to surround the 2 characters matched. `0x` is the prefix, `&` is the stand in for the matched characters, and `,` is the suffix
`g` is the flag to run against all, not just the first match.

So this script it converting a multiline hexdump, into a single line, then prefixing each character pair with the the numerical constant in hex.

`echo '1' | xxd -p` outputs `310a`.
`1` is `31` in hex `0a` is end of line.
`echo '1' | xxd -p | tr -d '\n'` outputs `310a%`  removing the line breaks from the hex dump.
`echo '1' | xxd -p | tr -d '\n' | sed -E 's/.{2}/0x&,/g'` outputs `0x31,0x0a,`


I found this task deeply enjoyable, hopefully my understanding is correct.
