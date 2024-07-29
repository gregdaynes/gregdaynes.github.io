---
layout: post
title: building a shopify rails app in 2024
date: 2024-01-06 13:43 -0800
---

I've been back and forth with myself the last few days on whethere I should build an idea for a Shopify App. It has potential (though I've done no market research), shouldn't be too complicated (more in a moment), and I hope to learn things.


## What? Why?

I'm bored, and this idea has presented itself in a reasonable way. I don't have to do this, I shouldn't do this, but after a few days of saying no, I am thinking why not. It doesn't have to work out, I don't have to ship it. This could just be another point of knowledge for my clients and their apps.


## Whatever conscience. How're you going to do it?

Well first, it'll be a Rails app. In 2024, when Shopify is pushing Remix? Yep. I'll get to that in a moment too.

I want this to be a maintainable and sustainable app. Ruby, and Rails fit well here. I could use Elixir, I could use Remix, hell I can do this with frameworkless Node in probably half the time and effort. But no, for this, it must be Ruby and Rails.


## What else?

I don't want to use React. Frontend has been using React for far too long, and it's time to move on. Vue, Svelte, Solid, whatever they're all great choices (I'm particularily fond of Vue and Svelte), but I will say no to these.

Uh what about Polaris? Shopify's UI design language, with things built in React?

Yes! That is a concern. But the CSS is exposed, and they have HTML and CSS snippets of the components, where you bring your own JS. Great! Sounds like a plan to me. Write all my own JS, that seems like a great idea.

Because this is a Rails app, I'd be remiss to count out the html-over-the-wire patterns. Hotwire from 37 Signals fits the bill here, because of Rails (though not a requirement, I've built numerous apps with Node + Fastify using Hotwire, and love LiveView when working with Elixir).

So Ruby, Rails, Hotwire, Html, CSS, and hopefully a minimal amount of JS.

Another goal, is cheap, and hopefully fast. I'm not really planning on making money with this app, so the cheaper I can make operations the better. Ruby and Rails are usually referred to as slow, and I can somewhat attest to that with some of the apps I've worked on over the years. A few dozen requests a second at best before needing to more instances. More instances == more money. Whereas the Elixir, Node, and Go apps I've worked on are thousands of requests per seconds with equivalent I/O. So this will be an opportunity to think about performance and getting everything I can from the stack, beucase sustainability depends on it.


## Maintainable & Sustainable

I'm busy. Between consulting, trying to run a company, family and friends, I don't know how often I'll be able to work on the app after it's released. At least a few times a month I hope, and definitely in cadence with Shopify API updates and changes.

Too many of the apps I've worked on usually fall into a maintainability hellscape. The dependencies get out of date, and if you're not on it every time (maybe dependabot helps) you fall behind, and it can take days, weeks, or maybe not even possible to update everything.

So, stability in dependencies will be key. Which again is why Ruby, Rails, Hotwire, HTML, CSS. There will be 3rd party gems. Shopify gems in particular. I don't want to reinvent api request to shopify, and I don't want to roll my own everything. They're mostly stable, but do require work every few months to bring inline with Shopify API updates.

On Remix: I could use Remix, it's a nice framework, it's owned by Shopify, it's got lots of documentation and Shopify pushes it now over Ruby. Which is precisely why I am not going to touch it. Too many times I've been burned by Shopify churn. Remix will be no different. But hey, the gems will likey disappear one day too, and then hopefully this app will.


## What other modern things will be left behind?

Well, it's 2024, and Typescript is continuing on the takeover of Javascript. Great. I'm still going to use vanilla Javascript. Hotwire will help here, but not with all of it. We also have decent web components today, so maybe some work will be done with them.

You're gonna use RSpec right? Not today. Minitest is great, and it's not an external dependency. FactoryBot? yes. And likely many other gems, but not Rspec.


## This sounds like a bad idea.

It does, and likely will be. But we're going to give it a go.
