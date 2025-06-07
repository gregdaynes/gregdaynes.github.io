---
layout: post
title: Advent of Code 2024 - Day 3
date: 2024-12-02 22:27 -0700
categories:
  - post
tags:
  - aoc
  - nodejs
---
{% include components/post/toc.html %}

Code for [Day 03](https://github.com/gregdaynes/advent-of-code-2024/tree/day03)

Wow. After Day 2 pt 2, I was sure I'd be cooked and not be able to continue on. Oh how wrong Greg from a 4 hours ago was.

Today's challenge involves filtering through "corrupted data" looking for recognizable operations and performing them.

I didn't even bother with a separate file, instead wrote each solver in tests.

#### Part 1

For part 1 - the only operation needed is `mul(x,y)` - X and Y are numbers to multiply together. Then summing the product.

```js
test('pt1 sample dataset', () => {
  const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
  const matcher = /mul\((?<a>\d+),(?<b>\d+)\)/gm
  const matches = input.matchAll(matcher)

  let sum = 0
  for (const match of matches) {
    const group = match.groups

    sum = sum + (Number(group.a) * Number(group.b))
  }

  assert.equal(sum, 188192787)
})
```

If you know RegEx the solution is easy. We can use it to find the data to multiply together as groups and then iterate over the iterator collections adding up the multiplications.


#### Part 2

Part 2 introduced 2 new "uncorrupted" operations to pay attention to.

`don't()` and `do()`

They act as flags to disable and enable future operations.

The default state is to perform the operations

We can think in terms of _gating_ or _switching_ to understand the logic.

```js
test('pt2 sample dataset', async t => {
  const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

  const matcher = /(mul\((?<a>\d+),(?<b>\d+)\)|(?<dont>don't\(\))|(?<do>do\(\)))/gm
  const matches = input.matchAll(matcher)

  let enabled = true

  let sum = 0
  for (const match of matches) {
    const group = match.groups

    if (group.dont) {
      enabled = false
      continue
    }

    if (group.do) {
      enabled = true
      continue
    }

    if (enabled) {
      sum = sum + (Number(group.a) * Number(group.b))
    }
  }

  assert.equal(sum, 48)
})
```

An adjustment to the RegEx from Part 1 is needed

1. Wrapping the whole matcher in a group
2. Use `|` to define alternate group matchers for `don't()` and `do()`

This gives a Regex pattern that has 3 possible matches for the group.

Once the matcher is run against the input, the output is an iterator with each group in sequence. Meaning there will be either a `mul`, `don't()`, `do()` in each step of the iterator, sequentially matching the input.

1. Starting with `mul` enabled
2. Step through each match
3. If enabled === `true` and  the match is `mul` - perform multiplication and add the product to the sum
4. If the match is `don't()` set enabled to false
5. If the match is `do` set enabled to true

---

This code is _easy_ enough to understand without much documentation on the operations that someone without regex experience should be able to understand and alter (assuming they do not look at the matcher). However the regex itself is also easy to understand, that a quick visit to [Regex101](https://regex101.com/r/Km0QEM/1) will describe it in detail and provide a playground to test against.

Overall, I feel relieved and elated that Day 3 challenge wasn't such a struggle as Day 2.

Takeaway from today

__ALWAYS BET ON REGEX__

(unless to parse email, then avoid.)
