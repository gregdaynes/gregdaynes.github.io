---
layout: post
title: Advent of Code 2024 - Day 4
date: 2024-12-04 11:28 -0700
categories:
  - post
tags:
  - aoc
  - nodejs
---
{% include components/post/toc.html %}

Code for [Day 04](https://github.com/gregdaynes/advent-of-code-2024/tree/day04)

Today's challenge is based around matrices, or in JS, 2D arrays and coordinates. This kind of challenge is when I wish there was a better standard library, as well as matrix operations.


#### Part 1

Crossword style challenge
From given input, find all occurrences of XMAS
Can be horizontal, vertical, or diagonal - this includes backwards

Today I decided to think about the problem and write out a plan before coding.

```
if we turn the input into a 2d array, we can use [x,y] coordinates to find characters
a function to calculate each direction
when converting to 2d array, index all X positions
 for each X
 - take [x,y]
 - compute the horizontal coordinates for each letter M A S - [x+1,y][x+2,y][x+3,y]
 - repeat for direction - should be 8 in total
 - if direction can't be computed - eg: too close to an edge, skip it.
 - test each direction letter coords for a match
 - sum complete matches per X
 sum all matches
```

Makes sense. The next thing to do is remember that coordinates will be in [y,x] not [x,y]. One of those human things where we think horizontally first, whereas the easiest operations are row first. Maybe a transform would be a good brain saving step, but would take more time and memory to perform instead of removing the problem before code - fix the human programmer.

```js
function verticalBackwards([y,x]) {
  return [[y,x], [y-1,x], [y-2,x], [y-3,x]]
}

function upright([y,x]) {
  return [[y,x], [y-1,x+1], [y-2,x+2], [y-3,x+3]]
}

function horizontal([y,x]) {
  return [[y,x], [y,x+1], [y,x+2], [y,x+3]]
}

function downright([y,x]) {
  return [[y,x], [y+1,x+1], [y+2,x+2], [y+3,x+3]]
}

function vertical([y,x]) {
  return [[y,x], [y+1,x], [y+2,x], [y+3,x]]
}

function downleft([y,x]) {
  return [[y,x], [y+1,x-1], [y+2,x-2], [y+3,x-3]]
}

function horizontalBackwards([y,x]) {
  return [[y,x], [y,x-1], [y,x-2], [y,x-3]]
}

function upleft([y,x]) {
  return [[y,x], [y-1,x-1], [y-2,x-2], [y-3,x-3]]
}

function solve (input) {
  // convert input into 2d array.
  const input2dArray = input.split('\n').map(row => row.split(''))

  // find all X with coords [y,x]
  const xMap = []
  for (const y in input2dArray) {
    for (const x in input2dArray[y]) {
      if (input2dArray[y][x] === 'X') {
        xMap.push([Number(y), Number(x)])
      }
    }
  }

  const xValidDirections = []
  for (const coord of xMap) {
    const allCoords = [
      verticalBackwards,
      upright,
      horizontal,
      downright,
      vertical,
      downleft,
      horizontalBackwards,
      upleft
    ].map(fn => {
      return fn(coord)
    })

    xValidDirections.push(allCoords)
  }

  let count = 0
  for (const validDirections of xValidDirections) {
    for (const direction of validDirections) {
      if (!direction) continue;

      const word = direction.map(([y, x]) => input2dArray[y]?.[x]).join('')

      if (word === 'XMAS') {
        //console.log(direction, word)
        count += 1
      }
    }
  }

  return count
}
```

Great, this works and returns the correct result for both sample and actual datasets. Done.

I had notions of guard clauses using yMax and xMax to skip calculating directions that would be clipped by the length, however it was overzealous and broke with sample dataset so I scrapped it before submitting.

Theres lots of loops here, 8 if I'm counting correctly. This can be cleaned up later.


#### Part 2

Of course it wouldn't be Advent of Code if the second part didn't crush all your hard work of the first part.

This time the task is to look for X-MAS, which is the word MAS in an X like shape (2 MAS with A in the centre).

Immediately we can scrap the horizontal and vertical checks, meaning we have 4 directions to check.

And we can simplify our operations by changing the starting letter to A. Which allows us to check the immediate 4 coordinates on at the diagonals.

```js
function solve (input) {
  // convert input into 2d array.
  const input2dArray = input.split('\n').map(row => row.split(''))

  const aMap = []
  for (const y in input2dArray) {
    for (const x in input2dArray[y]) {
      if (input2dArray[y][x] === 'A') {
        aMap.push([Number(y), Number(x)])
      }
    }
  }

  const matches = []
  for (const [aY, aX] of aMap) {
    // tl tr br bl
    const quadrants = [
      [aY - 1, aX - 1],
      [aY - 1, aX + 1],
      [aY + 1, aX + 1],
      [aY + 1, aX - 1],
    ]

    const results = []
    let letters = ''

    for (const [y, x] of quadrants) {
      const charAtCoord = input2dArray[y]?.[x]

      if (['M', 'S'].includes(charAtCoord)) {
        letters += charAtCoord
      }
    }

    if (letters.length === 4) {
      results.push(letters)
    }


    for (const possibleMatch of results) {
      switch (possibleMatch) {
        case 'MMSS':
        case 'MSSM':
        case 'SSMM':
        case 'SMMS':
          matches.push(possibleMatch)
          break;
        default:
          break;
      }
    }
  }

  return matches.length
}
```

Done.

Still a lot of loops like part 1 solution.

Opting for the manually defined quadrants was easier than reusing the functions from part 1.

Because the the results of X-MAS really is looking for positions of M and S around the A, I wrote out the 4 possible permutations of the pattern in order of `top left, top right, bottom right, bottom left`.

This makes a switch to patch each set of found letters a pretty good use case. I don't see a way to make this easier. But if we were looking for more letters, or the other 4 cardinal directions, this would be a more painful. Luckily, we can keep it simple. The hope and dream of call code.


### Cleanup Time

Those loops will keep me up at night if they're not reduced at least a little.

Starting with Part 1, lets sort some things out.


#### Cleanup Pt 1: First Pass

Instead of generating coordinates, and then going through each set to find the letter, then going through each set to check the word - we can check the word in the first pass. It still requires looking up each letter, but now its done in 1 loop.

This introduces a gastly amount of bloat to each of the direction functions

```js
function verticalBackwards(input, [y,x]) {
  const lookups = [[y,x], [y-1,x], [y-2,x], [y-3,x]]

  let word = ''
  for (const [y, x] of lookups) {
    word += input[y]?.[x]
  }

  if (word === 'XMAS') {
    return word
  }
}

// rest of them skipped for brevity.
```

Now we receive the word if it matches, or undefined if not.

Next I extracted the input to 2d array parser to a function (light code resuse, also so I don't have to look at it). And then did the same with the map creation for a specific letter. These are not performance oriented operations, they're still the same operations.

```js
function solve (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'X')

  const validWords = []
  for (const coord of map) {
    const validWord = [
      verticalBackwards,
      upright,
      horizontal,
      downright,
      vertical,
      downleft,
      horizontalBackwards,
      upleft
    ].map(fn => fn(input2dArray, coord))
    .filter(Boolean)

    validWords.push(validWord)
  }

  return validWords.flat().length
}
```

The solver drops a for loop and a nested loop, but does gain a filter, and flat(), simpler operations are better right?


#### Cleanup Pt 1: Second Pass

This time instead of mapping and filtering, and appending words to an array, flattening, and then counting, we can increment a counter if the we receive a result from the map.

```js
function solve (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'X')

  const fns = [
    verticalBackwards,
    upright,
    horizontal,
    downright,
    vertical,
    downleft,
    horizontalBackwards,
    upleft
  ]

  let count = 0
  for (const coord of map) {
    fns.forEach(fn => {
      if (fn(input2dArray, coord)) {
        count += 1
      }
    })
  }

  return count
}
```

In addition to removing filter, push, flat, length, I opted to hoist the functions list outside of the loop. It won't save much but nice to not have it redefined for each root letter.


#### Cleanup Pt 1: Third Pass

Reducers, the bane of any developer (save for intermediates. JUST KIDDING! you all do the important and necessary work, do it how you need to get it done).

It's commonplace to dislike reducers due to their syntax and the complexity understanding them involves. In this case, it is much more cryptic than the for loop with accumulator, but internally is small enough that it should be reasonable to keep in mind. A little more complexity can sometimes be worth it.

In this case, the reducer is slightly faster than previous implementations, so a worthwhile tradeoff.


```js
function solve (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'X')

  const fns = [
    verticalBackwards,
    upright,
    horizontal,
    downright,
    vertical,
    downleft,
    horizontalBackwards,
    upleft
  ]

  const count = map.reduce((acc, coord) => {
    fns.forEach(fn => fn(input2dArray, coord) && acc++)

    return acc
  }, 0)

  return count
}
```

#### Cleanup Pt 1: Fourth Pass

It's time to replace those functions with all the repeat word === XMAS logic.

```js
function fn(input, [y,x]) {
  const matrix = [
    [[y,x], [y-1,x],   [y-2,x],   [y-3,x]  ], // verticalBackwards
    [[y,x], [y-1,x+1], [y-2,x+2], [y-3,x+3]], // upright
    [[y,x], [y,x+1],   [y,x+2],   [y,x+3]  ], // horizontal
    [[y,x], [y+1,x+1], [y+2,x+2], [y+3,x+3]], // downright
    [[y,x], [y+1,x],   [y+2,x],   [y+3,x]  ], // vertical
    [[y,x], [y+1,x-1], [y+2,x-2], [y+3,x-3]], // downleft
    [[y,x], [y,x-1],   [y,x-2],   [y,x-3]  ], // horizontalBackwards
    [[y,x], [y-1,x-1], [y-2,x-2], [y-3,x-3]], // upleft
  ]

  let count = 0
  for (const lookups of matrix) {
    let word = []

    for (const [y, x] of lookups) {
      word += input[y]?.[x]
    }

    if (word === 'XMAS') {
      count++
    }
  }

  return count
}
```

This isn't "better" but it is dry-er (Remember, DRY is ok sometimes).

What is nice about this change, is we can return the count from this function, removing the need to count in the caller. A little bit of encapsulation never hurt.

So now the solver looks like this:

```js
export function p1a (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'X')

  return map.reduce((acc, coord) => acc += fn(input2dArray, coord), 0)
}
```

Well isn't that nice to look at. With all the scary things hidden away.


#### Cleanup Pt 1: Fifth Pass

Let's take it one step further.

```js
function countValidWordsForCoord(input, [y,x]) {
  const matrix = [
    [[y,x], [y-1,x],   [y-2,x],   [y-3,x]  ], // verticalBackwards
    [[y,x], [y-1,x+1], [y-2,x+2], [y-3,x+3]], // upright
    [[y,x], [y,x+1],   [y,x+2],   [y,x+3]  ], // horizontal
    [[y,x], [y+1,x+1], [y+2,x+2], [y+3,x+3]], // downright
    [[y,x], [y+1,x],   [y+2,x],   [y+3,x]  ], // vertical
    [[y,x], [y+1,x-1], [y+2,x-2], [y+3,x-3]], // downleft
    [[y,x], [y,x-1],   [y,x-2],   [y,x-3]  ], // horizontalBackwards
    [[y,x], [y-1,x-1], [y-2,x-2], [y-3,x-3]], // upleft
  ]

  // returns count of valid words
  return matrix.reduce((acc, coords) =>
    acc += (wordFromCoords(input, coords) === 'XMAS' && 1), 0)
}

// returns a string of letters from coordinates, eg: XMAS
function wordFromCoords (input, coords) {
  // destructuring coord into [y, x] is slower than coord[0], coord[1] looups
  return coords.reduce((acc, coord) => acc + input[coord[0]]?.[coord[1]], '')
}

export function p1a (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'X')

  return map.reduce((acc, coord) =>
    acc += countValidWordsForCoord(input2dArray, coord), 0)
}
```

Introducing yet another reducer is not pleasant here, but makes the count function a little shorter - but now we have to jump around, so ergonomics and complexity are worse, but code is less. This does not seem like a valid trade off.

Something that came out of this is the removal of destructuring, which turns out to be quite a bit slower than direct access through index. But is worse for readability, so, use where appropriate - like optimization steps of proven code.

I think that's enough reworking of Part 1's solver.


#### Cleanup Pt 2: First pass

First order of business is to replace ['M', 'S'].includes check with direct === 'M' === 'S' checks which are faster for 2 entries.

Next I questioned why do filtering at all instead of just appending any value (including `undefined`) to the string of letters. The switch is pattern matching is simple, so we can remove the string preparations.

This meant we could remove the results and count checks and within the switch body update count instead of accumulating words, and checking length later.

Using a reducer to accumulate the letters is short and simple enough so I think it's ok here (especially compared to the Pt 1 reducers).

```js
function solve (input) {
  const input2dArray = parseInputToArray(input)
  const map = findallLetterCoordiates(input2dArray, 'A')

  let count = 0
  for (const [aY, aX] of map) {
    // tl tr br bl
    const quadrants = [
      [aY - 1, aX - 1],
      [aY - 1, aX + 1],
      [aY + 1, aX + 1],
      [aY + 1, aX - 1],
    ]

    const letters = quadrants.reduce((acc, coord) => {
      return acc + input2dArray[coord[0]]?.[coord[1]]
    }, '')

    switch (letters) {
      case 'MMSS':
      case 'MSSM':
      case 'SSMM':
      case 'SMMS':
        count++
      default:
        break;
    }
  }

  return count
}
```

Less loops, cleaner syntax, even with the cognitive cost of the reducer. It also performs much faster (2-3x by rough test speed)


#### Cleanup Both Parts: Final Pass

Last thing that was bugging me was performing the input to 2d array, then iterating the matrix to find coordinates of target letters. This can be reduced to being done inline with the creation of the 2d array, where the lookups are only done against the length of each row.

This doesn't really change performance on either dataset, but is less code, so maybe that is a win for maintainability.

```js
function parseInputToArray (input, target) {
  const map = []

  const matrix = input.split('\n').map((row, y) => {
    const letters = row.split('')

    letters.forEach((letter, x) => {
      if (letter === target) {
        map.push([y, x])
      }
    })

    return letters
  })

  return [matrix, map]
}
```

So now each parts solver can skip

```js
const input2dArray = parseInputToArray(input)
const map = findallLetterCoordiates(input2dArray, 'A')
```

And do this instead

```js
const [input2dArray, map] = parseInputToArray(input, 'A')
```


### Summary & Benchmarks

Approaching with a plan, and remembering the pain around [y,x] from previous work (especially game dev), made today's challenge a breeze.

I know there are branches of mathematics and well defined algorithms that make working with coordinate data easier, and faster, but I can't remember them, and also chose to not look it up.

Performance of the first implementations left a lot to be desired

|part|time (ms)|
|----|---------|
|1) sample data| 1.798084|
|1) actual data|25.352125|
|2) sample data| 0.760792|
|2) actual data| 3.878375|

Overall not bad, but 25ms operation in Game dev means you're at best getting 30fps - not good.

After cleanup and optimizations

|part|time (ms)|
|----|---------|
|1) sample data|1.280416|
|1) actual data|7.645583|
|2) sample data|0.319542|
|2) actual data|2.491416|

Look at that, actual data for Part 1 is 1/3 the of the original, and Part 2 is 2/3 of the original.

I'm sure with more efficient matrix operations all of these could be done in under 1ms. But I'm not doing that today.
