---
layout: post
title: What's Going On - Where have I been
date: 2025-06-07 12:41 -0700
categories:
  - post
tags:
  - personal
  - consulting
  - development
  - failure
---
{% include components/post/toc.html %}

It's been a while. Where's AOC '24 articles after the 4th? What have I been up to since December? Let's go!

## December AOC & Disks

Back in December, a contract I had ended, work as delivered, projects successfully out on the market (save for one, more in a moment). Time to breathe, or so I thought.

While I was cleaning up the computer I had been using for this work and personal projects (the joys of consulting - single computer if you want). The disk failed. Not in a nice, recoverable way. Like fully properly failed. This was a Macbook Pro M1. Recovery was attempted, but no luck - I didn't stick it in a freezer if you're thinking I should have tried that - doesn't work with NAND like old spinning rust.

Luckily, all my work is backed up in many ways and places. I use git, I have time-machine on a NAS, I have rsync scripts to another networked disk, and I have another script that backs up some projects to my Desktop (which is sync'd to Apple Drive). Lots of redundancy, though not all client work has all this enabled.

I lost my AOC articles from the 5-14, both challenges per day. This was heartbreaking because I spent a lot of time and effort on those solutions and documentation. I was frustrated, and lost the drive to restart and finish. Maybe 2025 will be the year I do all of AOC?


### That one project that didn't get delivered (but did)

During the fall of 2024, I had taken on a task to do exploration of exponential growth of data usage and remedies. This wasn't part of my daily work, more of a curiosity, but was a data problem, and of course I love data problems. I started work in my Projects/Scratch directory, which is where I write throwaway code, and is not backed up. I continued working on it, evenings and weekends, whenever I had some time, or a spark of inspiration. 

The experiment was successful and handled the problem very well. Once I learned my contract would be ending, I wanted to hand over the codebase so the company could use it to deal with their data problem. But people and timelines are always trouble. For weeks the hand-off was delayed, from illness to vacations, end of the year and all. 

Then the disk failed and the project was lost.

I think other developers, may have responded with "oh well" and moved on. But I was proud of this work - and I made the conscious choice to rebuild it, hand it off as if nothing happened. And I did. Because I write everything in my logbook, most of the concepts were there, the ways I solved the problems and the specific techniques used, It took me from afternoon to the wee-hours of the morning (around 14 hours in total). And it was better than before.

I'll detail this project in another post, but let this be a warning - Backup everything, always. But more importantly

> MAINTAIN AN ENGINEERING LOGBOOK!!!


## Winter 

Back in the September, a long time client, had come to me to finally start on the modernization of their website & publishing platform. We had been talking over the last few years about the project, but never started. 

Throughout December, I worked on creating a prototype design for their site, based on the briefs with the Director of Communication. This was many, many iterations of work. To make it simple, I used the same stack that powers this site - Jekyll and my 3 plugins for html, css, and javascript enhancements. This allowed me to move quickly and efficiently, even live coding with the Project Manager to try out ideas.

Sign off was quick, and I was off to design the system and content model.

My plan for this being 2 months of work, quickly imploded from time commitment conflicts, to bike-shedding, to feedback from other people.

But, we progressed where possible - while waiting. This gave me a ton of time for doing other research and development, and brushing up on the latest PHP 8.3/4 (The original site was made in PHP 5.4, and over the years I upgraded, and refactored to PHP 8.1).


### Learning Go

A side quest I picked up in January, was to learn Golang. I had been working on a project management app called _Project Spy_. 

Up until January, it was written in my trusted stack of Node JS and Fastify. It worked well for development, and testing things out, but it fell short in how do I get people to install it, let alone, how do I install it and use it locally (NPM global is fine, but not really friendly). I explored the current state of making a single file binary, [which I wrote previously about in 2021](/note/2021/09/18/node-binary-artifacts.html). The problems I had in 2021 were still persistent, and I tried to contribute improvements to make it work, but wasn't successful.

Let's Go!

I decided to explore languages that would produce the artifact - Rust and Go were my top choices, of course C# was there (but no). Rust probably would have been a good choice, but given my distain for the syntax I settled on Go.

I have had some exposure in the past, in 2019-2020 I worked on a fork of Battle Snake for 2020 competition (Covid-19 in the end prevented that). It was ok, but a little weird for me at the time. 

I worked through both of [Alex Edward's Let's Go](https://lets-go.alexedwards.net) and [Let's Go Further](https://lets-go-further.alexedwards.net) (These are great books to learn Go). Then I picked up [Jon Bodner's Learning Go, 2nd Edition](https://www.oreilly.com/library/view/learning-go-2nd/9781098139285), and finally [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests). There was also a lot of reading [the official site Go.dev](https://go.dev) and various blogs.

After a few weeks, I had the core of the app written in Go, and I started using it to manage my client projects.


## Spring 

Spring was essentially, a continuation of Winter, focused on building and delivery of the platform. The work focused on building out the content, and the support for it, a few small embeddable applications, training for the new platform. Overall nothing was complex, only time consuming.

There was still room in the day for other side projects, and especially Project Spy.


### Project Spy & Go

This is when things really picked up for tinkering, and improving Project Spy. As I used the app to manage work, I found deficiencies in the workflows, and made improvements. Even being mostly fresh to Go, it makes for quick development cycles (still slower than writing in Node, it's going to take years before I'm that efficient).

Something interesting about my personal use of Go, I love to do coding drills in it - Leet code style questions. I find them less daunting in Go, a language I only have a little experience in. And that I believe is the reason. Because I don't know it inside-out, I fallback to writing the most basic code, for loops and conditionals. I'm sure I could make things more efficient using advanced techniques, but not knowing the options, makes solving things quick. And I enjoy it!


### Job hunting

I like consulting. I like time keeping, I like record management, I like writing software. I do not like finding clients. I am not good about marketing, or reaching out to prospective companies. This is a known deficiency of mine, that I don't wish to remedy at the moment. So I've been looking for full-time employment, but not really actively. I had a recruiter reach out (first time in quite a while), had some chats, and did technical interviews. Mostly things went well, but ended with someone else. Sadly, but no problem.

While I was interviewing with the above, another recruiter reached out, for a company I've followed for years (and recommended as a resource for other developers because of their wealth of knowledge and technical content). We chatted a few times, and then I was ghosted. I tried reaching out again and nothing. Needless to say, I have stopped following and recommending them, and have warned other devs in my network.

Companies / Recruiters - please send any form of communication that you're no longer interested. Even if it's an automated email from a no-reply.


## Summer 

It's now June, which means it's hot. And my 2 month project has now taken 5. Still under budget thankfully, but I'm feeling the stress of needing to get it out the door so I'm free to move onto either new clients, or full-time employment. 

The content platform is done, live, and serving thousands of visitors a day!

There was a hiccup at the end though. A newsletter template I developed wasn't rendering correctly on some outlook versions. The original template was made with MJML.io to get the layout blocked in, then run through the content platform to populate. I had wrongly assumed the layout would account for Outlook styling. After testing with Litmus, I saw the problems, and the only fix was to start again. 

Have you ever written a responsive email template, that supports from Outlook 2009 - OL 365? It's a nightmare. You still have to support HTML 4.01 through Trident (but not even the recent versions, essentially a broken IE 6). I had experienced this in 2012 when I made the last template for the same client.

So, queue a mad sprint of 23 hours (over 2 sessions) to re-write from scratch the newsletter. In 2012, I used Mailchimp's no-code editor to do the layout, then hacked it up. I did the same thing again, though for the 2025 version, things are way more complex, with interleaving sponsorships, and decorative borders. Still, same process worked. There are so many tables, and tables in tables, and tables in tables, in tables (this can go on forever). I however was able to deliver it, on time for the first newsletter to go out.

_On [Litmus](https://litmus.com). If you need to test emails in all clients, there is no better place. It's worked for years, and I can't recommend them enough. Though, if you want to cancel your subscription, you have to use Chrome, so remove 1 star from my review. Otherwise, if you're making email templates, the cost is worth it._


## What's next?

Not resting, that's for sure. 

I'm on now actively searching for work. I'm stressed about it, because so are many thousands of developers. I hope they all find success and wish them luck. We'll get through this, even with generative AIs trying to take our work (I have lots of thoughts on GenAI, but this is not the post for it)

In my quest for a job, I am working on updating this site, side projects, research / experimentation, and gardening - everyone needs some time outdoors. Especially wildflower season.
