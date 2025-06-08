---
layout: post
title: Earthquakes with Leaflet.js & Go
date: 2025-06-07 21:41 -0700
categories:
  - project
---

Living on the Juan de Fuca plate means earthquakes happen every day. Sometimes multiple times. While we wait for _the big one_, why not visualize some of the quakes.

<style>
quake-map {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
}
</style>
<quake-map data-api="https://quake.app.gregdaynes.com/api/v1/" data-marker-icon="/assets/images/marker-icon.png" data-marker-shadow="/assets/images/marker-shadow.png"></quake-map>
<script type="module" src="/assets/js/quake.js"></script>


The stack consists of

- RSS/Atom feed from [Earthquakes Canada](https://www.earthquakescanada.nrcan.gc.ca/index-en.php)
- [Go service](https://github.com/gregdaynes/earthquake-service/tree/main/backend)
- [Plain web component](https://github.com/gregdaynes/earthquake-service/tree/main/frontend)


## The Go service 

Designed to be simple to operate. It uses the stdlib `http/ServeMux`[^1] library for it's request/responses, exposes 2 endpoints `/api/v1/` and `/api/v1/update`.`modernc/sqlite`[^2] for the SQLite driver, and `GoFeed`[^3] for handling the ATOM feed.


### Updating & Refreshing the Data

The `/api/v1/update` endpoint, when called, triggers the fetch, parse, and store of the RSS feed. While the endpoint can be triggered by any request, the intended method is through cURL[^4] from a local crontab[^5].

_The endpoint maintains in-memory state of the last fetch timestamp, ensuring we don't fetch the data through public access._


### Persistence

The data received from the RSS/ATOM feed, is stored in a local SQLite database. For applications like this, you can't beat it (maybe writing to disk yourself). It's fast, small, and works well with most languages. Node.js[^6] recently started bundling it in, and I miss that with Golang, however its setup is simple, with the stdlib DB library, and the available drivers.

This is also the first time using my [schema based migration module](https://github.com/gregdaynes/earthquake-service/blob/3c39487dc1c63c6807891f3a4d8c2426b777eb31/backend/cmd/web/db.go) in production - which I started working on a while ago for various other project.The idea is that provided a schema in SQL, it will automatically apply the schema changes, and recreate indexes, like in Rails, and Directus.


### Hosting

This is the first time I'm hosting a Go service for myself, so I took this opportunity to think about a low-maintenance approach.

Instead of putting the app in Docker, I run the service with SystemD[^7]. This handles the starting, stopping, and restarting the service on failure.

```unit
[Unit]
Description=Quake App

[Service]
Environment="QUAKE_ARGS=-port=9001"
ExecStart=/var/apps/quakes.linux_amd64 $QUAKE_ARGS
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Refreshing the data is done every 30 minutes through `cron`

```crontab
*/30 * * * * curl https://quake.app.gregdaynes.com/api/v1/update
```

I opted for Caddy[^8] instead of Nginx[^9] for a reverse proxy. I have been playing with it for a few years, and I think it's time to make the switch. Automatic SSL is nice, and the very simple configuration in Caddyfile is quite friendly.

The SQLite database is backed up and restored through Litestream[^10]. Which if you're working on services backed with SQLite, it's a must. 

After warmup of 100k requests hitting around 3500req/s from my laptop, Caddy is running at 64M, and the Quake service at 20M. That's pretty nifty when compared to Node.js which usually starts around 80M and Nginx 22M for basic 80/443 configurations.

I should note at the time of writing, this is hosted in Toronto, Canada through Digital Ocean on AMD64 1GB/1VCPU @2.0GHz. There's lots of room on this server if everything is going to be so light on resources.


### Fetching Data

Nothing interesting about this, it's an endpoint that receives diagonal coordinates, and returns JSON describing all the points inside the provided bounds. This is not designed to be robust, it does not feature paginated data, query limiting, or anything fancy. The data is Canada specific, so while you can request any coordinates, it will always be limited to Canada.


## Web Component

I love plain, vanilla HTML web components. I think they're the way to build components, multi-page applications, and even single page applications going forward. They're robust, supported across all browsers, and aren't yet another framework to learn.

The component itself is not pretty. I wasn't going for greatness, just viable. It's [leaflet 2.0-alpha](https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html), jammed into a single component, using Shadow DOM, and inlined CSS. Did any of this need to be done? No. But, I have a shiny new tag to place on my site.

```html
<quake-map data-api="/api/v1/"></quake-map>
<script type="module" src="/assets/js/quake.js"></script>
```

This is all that's needed to render the map and markers on the page. 

It's built using Vite[^11], but is an unnecessary step (because it's in a single file to start) but it makes for a nicer time developing.


As always, let me know what you think through [email@gregdaynes.com](email@gregdaynes.com)

---

[^1]: [Golang http/ServeMux](https://pkg.go.dev/net/http#ServeMux)
[^2]: [modernc/sqlite](https://pkg.go.dev/modernc.org/sqlite)
[^3]: [GoFeed](https://pkg.go.dev/github.com/mmcdole/gofeed)
[^4]: [cURL](https://curl.se/docs/manpage.html)
[^5]: [crontab](https://www.man7.org/linux/man-pages/man5/crontab.5.html)
[^6]: [Node.js SQLite](https://nodejs.org/docs/latest/api/sqlite.html)
[^7]: [SystemD](https://systemd.io)
[^8]: [Caddy](http://caddyserver.com)
[^9]: [Nginx](https://nginx.org)
[^10]: [Litestream](https://litestream.io)
[^11]: [Vite](https://vite.dev)
