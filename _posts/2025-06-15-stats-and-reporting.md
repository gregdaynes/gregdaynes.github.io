---
layout: post
title: Stats & Reporting
date: 2025-06-15 22:05 -0700
categories:
  - post
tags:
  - development
---
{% include components/post/toc.html %}

Something I have been wanting to build for a while is Website Analytics. There are lots of products out there, Google Analytics is still the top, but over the last few years with GDPR and Privacy regulations, smaller companies and self hosted analytic platforms have emerged. 

Every client wants some form of analytics, I no longer try to get them to divulge why they need the data, rather, tell them to get their Privacy Policy updated and I'll add GA or Plausible.

I wanted to try building one, to practice and see how I might go about making a platform, with hard rules around privacy and open information.

1. Must not share data with any other party.
2. Must not collect, log, expose IP addresses.
3. Must publish all data publicly.
4. Must respect users advertising & tracking blockers.
5. Should be as minimally invasive as possible. 

Easy enough. 


## Collecting

The first stage of analytics, is collecting the data. It's common to use javascript to send data back to the server because of the rich data that can be collected. 

I wanted a low-tech approach. Back in the 90s-2000s, cPanel would have some metrics available. These were generated from aggregating logs on the server. These log metrics account for most of what is in analytics platforms, even the ones that use javascript. It does miss out on device size, network speed, user preferences. Because this site is statically generated and hosted on an edge, parsing logs is not viable. But using HTML we can make a request to an application that can collect the data emitted from the browser during a request.

There are a few elements that can be used to make a request: `<img>`, `<link>` and `<script>`. Images are sometimes referred to as Tracking Pixels.

The act of making a request to a server for a file, sends a bunch of information. The basic are 

- Referer _yes the spelling is incorrect in the spec._ 
  <br>This reports the origin of the request, protocol, url, and port
- IP address 
  <br>Using the IP Address we can get location, service provider
- UserAgent 
  <br>Browser, operating system, even type can be inferred
- Timestamp 
  <br>nothing really to say about the time

That's just from a request like `<img src="//analytics.apps.gregdaynes.com">`

Geo location from IP addresses is error prone due to the nature of them, but it's better than nothing, and isn't as invasive as a prompt to have their location reported. 

UserAgent is another error prone data source. It's easy to manipulate, and usually is to get around limitations of sites/technologies. Some browsers do not send them at all. Bots and Crawlers tend to have their own, and AI is the wild west. It's best to ignore, but still a datapoint we can use.

Referer is annoying, both in it's spelling and that it doesn't report the full URL. But we can add query parameters that fill in some details. Like the current page.

Rule 4 states that it must respect being blocked by the browsers extensions, or manually. This is pretty easy to accomplish by being obvious in the url and naming of things. Most will block anything called "analytics" or empty responses.

This is an example of the tracking pixel on this page (it's the first element of the body if you look at source).

```html
 <img src="//analytics.apps.gregdaynes.com:4000?type=image&page=/post/2025/06/15/stats-and-reporting.html" width=0 height=0/>
```

Rule 5 is to be a minimally invasive as possible. This is vague, but has some meaning. A single request is a good start, there is not cascade of follow up requests. The response is not empty, rather, the smallest possible valid image - `<?xml version=\"1.0\"?><svg xmlns=\"http://www.w3.org/2000/svg\"/>` which has a content length of 62 bytes.


### Anonymizing Data

When the request hits the endpoint, it's usually logged. In my application, I have forgone logging on most things, because I don't want to deal with it. Another solution is to scrub sensitive data like IP Address from the log before writing.

Once received, the app takes the IP Address and does 2 things.

1. Creates a fingerprint of the request
2. Looks up the Country and Region using MaxMind's GeoLite2 City[^1] database. 

Creating the fingerprint involves SHA1 hashing of the IP Address, UserAgent, and a Random String (salt). This makes the fingerprint weak, because any change to the constituent data results in a new fingerprint. But it's good enough to not have to resort to cookies.

With the fingerprint, country, and region, it's safe to discard the IP Address.


## Aggregating

Once a request has been received, it's stored in a database and awaits to be processed further.

Periodically, the stored events are aggregated into "sessions" - A session is defined as one or more requests to the site from a fingerprint over a period of time, ending when a certain duration has elapsed without a subsequent event. Say 10 minutes after landing on a page without navigating to another, or reloading, counts as the end of a session.


### Actor Model

When I got around to writing the aggregator, I started with writing out a bunch of ideas on how to do it. Grug-brain loops was my first thought, but quickly ignored because of how tedious the work would be.

I came across Hollywood[^2] library when exploring some other side projects, but couldn't find a use for it. Turns out, data aggregation is a perfect for for the actor model. 

_The only times I've used Actors was using Elixir Broadway, which is a fantastic abstraction of GenStage in Elixir. And every time, it was the right choice._

I decided on a design that each request Fingerprint would be an actor. Which makes it possible to take a batch of stored requests, loop over them sending each actor their events to process.

Actors can maintain state, as each event is received by the actor, it is compared to the current state. If the event timestamp is after session duration limit, then the actor's state is written to the database, and a new state is created. The actor processes the event and updates any counters and collections in the state.

That's pretty much it. The code is simple, though still tedious checking things.


## Reporting

This part was the worst of everything. Taking all the aggregate sessions and turning it into a usable report. There wasn't anything interesting about the approach I took. It's mostly counters and averages, and sorting. At least on the backend side of things.

Continuing with my joy of creating HTML Custom Elements, I created a card dashboard that displays the results in a pretty common way. 

The architecture is simple, the root component is created, finds its Light DOM children, then when connected dispatches a fetch request to the report endpoint. When the response fulfills, the data is disseminated to the children and they take over final processing and rendering of the data.

Charts.js[^3] is used for the vertical bar charts. This was pretty easy to get running, the data needs to be in ordered arrays for x/y axis and then fed to the configuration.

The horizontal bar charts, for things like top 10 entry points, are done with CSS. I didn't like the look of the horizontal charts in Chart.js so this was a lightweight approach while still providing some utility.


## Next Steps

Because this is a toy, built over a few afternoons and evenings, I left things unfinished. 

Logging needs to be improved, for operational purposes. Things like errors to stderr and statements for monitoring actors are being cleaned up as needed. And I would like to explore censoring logs with Slog. Pino.js[^4] has a fantastic api for doing this, so I hope there is something equivalent in Go.

Testing. I avoided doing TDD and any testing at the start of this, because I didn't have a direction. As a fully supported project, I would count this as the spike, having the direction and general design completed, I'd start again with testing policies in place. But the codebase is small enough that adding testing after the fact won't be too much effort (I'm in danger).

On a small site like mine, I'm not expecting much data. To even have 1000 events to aggregate would be amazing, so I don't really even need to remove used events (they'll be consumed by the actors almost instantly - local testing I was able to process 5 million events per second over 2 cores). At some point I'll have to remove old ones, but not for launch. There is the possibility that my site gets crawled by Google, or an AI Agent, which will blow up my events estimate, but I'll deal with that when it arises. The collector endpoint can handle persistent writes up to 250k / second, so I can at least collect the data. This will also give me data to explore batch processing and paginated database results.


## Summary

Out of interest in exploring how I would approach writing a website analytics engine, I got to working with Go more, doing concurrent data aggregation following the actor model, and continuing to improve my use of vanilla web components. 

[^1]: [MaxMind GeoLite2](https://www.maxmind.com/en/geolite-free-ip-geolocation-data)
[^2]: [Hollywood](https://github.com/anthdm/hollywood)
[^3]: [Chart.js](https://www.chartjs.org)
[^4]: [Pino.js](https://getpino.io/#/)
