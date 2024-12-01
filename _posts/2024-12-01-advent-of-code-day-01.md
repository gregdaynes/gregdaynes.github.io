---
layout: post
title: Advent of Code 2024 - Day 1
date: 2024-12-01 08:45 -0700
categories:
  - post
tags:
  - aoc
  - nodejs
---

{% include components/post/toc.html %}

### Introduction

Each time Advent of Code comes around, I have the intention of participating, read the first puzzle, maybe solve it and then forget to continue through the rest.

There's a few culprits to my abandonment.

- _Attention_; usually work or other tasks get in the way.
- _Steep Cliff_; the puzzles are a wall of text that I find intimidating.
- _Imposter Syndrome_; I'm not good enough to do it good so I shouldn't do it at all.
- _Learning languages_; I tend to want to pick up a new language, but get distracted by learning it instead of applying as I'm going.
- But it's mostly work and freetime.

This year is different. It overlaps with funemployment! Which means I don't have much preventing me from bashing out some terrible solutions.

As solutions to the above:

- I am going to do it in NodeJS, removing the language distraction.
- Wall of text; behavioral changes are hard, reading comprehension on meandering text is a struggle. Perhaps a symptom of an undiagnosed attention problem.
  Instead of trying to find problem solving algorithms; start with solving the problem. Make it better. Maybe an algorithm will emerge, this is practice and shoud be fun. So have at it!

### Solving Day 1

Code for [Day 01](https://github.com/gregdaynes/advent-of-code-2024/tree/day01)

#### Day 1: Part 1

Given an input with 2 columns of numbers (2 numbers per line).
Find the distance between the first lowest of each column.
Find the distance between the second lowest of each column.
Repeat for each set of numbers.
Return the sum of the distances.

---


##### First Pass

Bash out a solution, improve later.

```js
function solve (input) {
  const pairs = input.split('\n')

  const leftCollection = []
  const rightCollection = []

  for (const pair of pairs) {
    const [left, right] = pair.split('   ')
    if (!left || !right) continue

    leftCollection.push(left)
    rightCollection.push(right)
  }

  leftCollection.sort()
  rightCollection.sort()

  let distanceAcc = 0

  while(leftCollection.length) {
    distanceAcc += Math.abs(
      leftCollection.shift() - rightCollection.shift()
    )
  }

  return distanceAcc
}
```

This is awful, doesn't scale well, but does solve the problem.

The first offence is splitting the input on new line into an array. Already we've introduced memory issues - what if the input in many GBs? Looking at the known inputs, we're safe, so we don't have to be proactive (or defensive) here. If this was real-life code, I'd want more samples, or at least ask what the maximum size will be.

Next are the creation of 2 arrays - seems harmless. Paired with iterating the split array, performing a split on each entry and then puting the values into the corrosponding array is probably fine.

We then sort each array as a mutation. This could be done without the mutation, but we'd double up memory again. So now we have input string, input array, left array, right array.  We've iterated each array at once, meaning we've done 3*n operations.

Finally looping over all items in the left array, but doing another mutation of both left and right to get the first entries each step. Knowing javascript array mutation isn't the fastest, a better option would probably be to reverse the sort direction so lowest value is last and then using pop instead of shift to remove the entry.


##### Second Pass

```
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)/gm

  const Left = []
  const Right = []

  ;[...input.matchAll(regex)]
    .forEach(({  groups: { left, right } }) => {
      Left.push(left)
      Right.push(right)
    })

  Left.sort()
  Right.sort()

  let distanceAcc = 0

  for (const i in Left) {
    distanceAcc = distanceAcc + Math.abs(Left[i] - Right[i])
  }

  return distanceAcc
}
```

A bit better.

Instead of splitting the input into an array based on new lines, and then iterating each line and splitting based on separator, Regex gives us the ability grab each number on each line directly. There is still the input size problem, but can ignore it based on what we know.

We still have the 2 arrays, and the sorting problem - I don't see a way out of it.

Iteration to create the sum is no longer in a while loop - this doesn't really matter.

No longer mutating the arrays, instead using the index of the loop to lookup the values. Seems fine.

_If input happened to be too much to hold in memory, NodeJS FileSystem Readline stream would be a good approach. The regex is still usable, but doesn't need to be multi-line_

Rough timing through `node:test` reveals the `second pass` is slightly faster.

|pass             |time (ms)|
|-----------------|---------|
|1: sample dataset|0.526166 |
|2: sample dataset|0.192042 |
|1: actual dataset|1.409791 |
|2: actual dataset|1.182459 |

Just over 1ms to work through 1000 rows of numbers isn't exactly performant. But good enough.


#### Day 1: Part 2

Same as part 1, except instead summing distances between the numbers.
Score the lowest number in the left column through multiplication of the occurrances in the right.
Finally sum the scores.


##### First pass

```js
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)/gm

  const Left = []
  const Right = []

  ;[...input.matchAll(regex)]
    .forEach(({  groups: { left, right } }) => {
      Left.push(left)
      Right.push(right)
    })

  let similarity = 0

  for (const left of Left) {
    const occurrances = Right.filter((right) => left === right).length
    similarity += left * occurrances
  }

  return similarity
}
```

Chuffed with the regex solution for creating two arrays of numbers, I will keep that.

Scoring iterates over the left array and uses Array.filter to produce a new array of matching values. Taking the size of resulting array and doing the scoring. Back to iterating each array many times. Seems fine with the test dataset, but actual dataset is very slow.

This can be improved.


##### Second pass

```js
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)/gm

  return [...input.matchAll(regex)]
    .reduce((acc, current, i) => {
      const [_, left] = current
      const rightMatch = new RegExp("\\W(" + left + ")$", "gm")
      const count = [...input.matchAll(rightMatch)].length

      return acc + left * count
    }, 0)
}
```

Reducers to the rescue!

The code is much more compact, cool I guess, but there are some new problems.

The reducer is being used correctly, nothing wrong there

The first problem is constructing a new regex pattern in each loop containing the left column value to find in the right column. This has a small cost to it, but it's notable.

We then apply that match against the whole input - while it's a string, this is almost the same as looking through the right array with the filter each time, but we have a more complex operation, and do it on the entire dataset.

I had hopes this would be better, but is so much worse.


##### Third Pass

```js
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)$/gm

  const Left = []
  const Right = new Map()

  ;[...input.matchAll(regex)]
    .forEach(({  groups: { left, right } }) => {
      Left.push(left)

      if (Right.has(right)) {
        Right.set(right, Right.get(right) + 1)
      } else {
        Right.set(right, 1)
      }
    })

  let similarity = 0

  for (const left of Left) {
    const occurrances = Right.get(left)
    if (occurrances) {
      similarity += left * occurrances
    }
  }

  return similarity
}
```

Being let down with the reducer, and regex, I spent a moment to think what a faster operation would be.

_Why not count occurrances as we're iterating to produce the 2 arrays?_

Using a map, with the number as the key and the occurances as the value - each occurrance increments the value.

There's no need to store all the right numbers anymore, duplicates are removed. Awesome.

Now the scoring is a quick lookup of the map for the left number.

Initial testing of this revealed that it was faster than the reducer on the test set, but still slower than the first pass with the array filter. _This is why real data is important to work with too_ - This approach is much faster than the approach one and two with the actual data.


##### Fourth pass

Maps are weird, what about an object that behaves the same?

```js
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)$/gm

  const Left = []
  const Right = {}

  ;[...input.matchAll(regex)]
    .forEach(({  groups: { left, right } }) => {
      Left.push(left)

      Right[right] = (Right[right] + 1 || 1)
    })

  let similarity = 0

  for (const left of Left) {
    similarity += left * (Right[left] || 0)
  }

  return similarity
}
```

The code is about the same, though I don't think the `||` (OR) operators are doing favours for readability.

The object is a little easier to reason about if you've don't know how a map works.

But this also performs worse compared to the third pass. But only slightly slower.

##### Fifth pass (for funzies)

```js
function solve (input) {
  const regex = /(?<left>\d+)\s+(?<right>\d+)$/gm

  const Left = []
  const Right = {}

  ;[...input.matchAll(regex)]
    .forEach(({  groups: { left, right } }) => {
      Left.push(left)

      const value = Right[right] ?? 0
      Right[right] = value + 1
    })

  let similarity = 0

  for (const left of Left) {
    const occurrances = Right[left] ?? 0
    similarity += left * occurrances
  }

  return similarity
}
```

Instead of the `||` (OR) operators, what about nullish coallescence (??)

This turns out to be more faster than the OR operator, and more stable in timing, but still slower than map.

I should probably call it there.

---

### Summary & Timings

I think thats enough approaches to solve the problem.

Starting with rough solutions and then refining was a good exercise in going through the motions of make it work first make it better later.

I'm very happy with the operation times, I'm sure there is some amazing algorithm that can do this much faster.

|passes (pt1)     |time (ms)|
|-----------------|---------|
|1: sample dataset|0.526166 |
|__2: sample dataset__|__0.192042__|
|1: actual dataset|1.409791 |
|__2: actual dataset__|__1.182459__|

|passes (pt2)     |time (ms)|
|-----------------|---------|
|1: sample dataset|0.136167 |
|2: sample dataset|0.328542 |
|3: sample dataset|0.168917 |
|4: sample dataset|0.28325  |
|__5: sample dataset__|__0.123125__|
|1: actual dataset|11.550959|
|2: actual dataset|28.845666|
|__3: actual dataset__|__0.640042__|
|4: actual dataset|0.847375 |
|5: actual dataset|0.802458 |

This is also a good reminder to that when testing performance of functions, remember to test against a variety of data. If I had only tested with the sample dataset, I'd lave landed on using an Object instead of a Map for keeping track of numbers and values. Missing out on a 5x improvement on larger data.

Sub-millisecond solution for part 2 makes me incredibly proud.

#### Additional Findings

Something really fun to keep in mind when working with NodeJS - the JIT compiler in V8 can do some wonderful things for performance. If you "warm up" the function with a run or two, the operation becomes even faster.

| Runs |time (ms)|
|-|-|
|Run 1: sample dataset|0.10170799999999858|
|Run 2: sample dataset|0.01087500000000218|
|Run 1: actual dataset|0.6606670000000037 |
|Run 2: actual dataset|0.36933299999999747|

The sample dataset reveals a 10x improvement. The dream is crushed with the actual dataset, with only a 2x improvement.

---

Overall, first day was fun! I learned some things about the approaches, and in writing this blog post out, I learned some things about myself.
