---
layout: post
title: Advent of Code 2024 - Day 2
date: 2024-12-02 18:35 -0700
categories:
  - post
tags:
  - aoc
  - nodejs
---
{% include components/post/toc.html %}

Code for [Day 02](https://github.com/gregdaynes/advent-of-code-2024/tree/day02)

I'll be honest, this one broke me. Part 1 was easy, but part two came in and just stomped on everything.

I almost gave up. I did a few times throughout the day.

I also cheated by going through reddit for more edge cases to test.

Which in the end may not have been necessary. It turns out, even though my downloaded data looked clean, I didn't run `.trim` on it before processing, which lead to overcounting the safe reports by 1.

Starting off with a good reminder.

__CLEAN YOUR DATA FIRST__

It may look clean, and if you're dealing with line based data, always trim off empty lines.

### My solution

```js
function solve (input) {
  const reports = input.split('\n')

  function isValid (levels) {
    let inc = true
    let dec = true

    for (let i = 0; i < levels.length - 1; i++) {
      const c = levels[i]
      const n = levels[i + 1]

      if (!(c < n && n <= c + 3)) {
        inc = false
      }

      if (!(c > n && n >= c - 3)) {
        dec = false
      }
    }

    if (inc || dec) return true

    return false
  }

  for (const report in reports) {
    const levels = reports[report].split(' ').map(Number)
    let safe = true

    let arrays = []
    for (const i in levels) {
      const levelsClone = [...levels]
      levelsClone.splice(i, 1)
      arrays.push(levelsClone)
    }

    arrays = arrays.map(isValid).filter(Boolean)

    //we need at least 1 valid set of levels
    if (!arrays.length) safe = false

    reports[report] = safe
  }

  // return made safe report count
  return reports.reduce((acc, item) => item ? acc + 1 : acc, 0)
}
```

What's incredibly frustrating about this challenge, is that the way to do it is through brute-force. I can't imagine any other way to handle it. And the brute-force approach is tedious at best.

I wouldn't want to inherit this code, even with substantial tests and documentation. It would likely become marked with here-be-dragons and I would dread needing to make any change. It's brittle, and has a high cognitive load.
