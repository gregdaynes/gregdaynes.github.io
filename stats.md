---
layout: base
permalink: /stats
title: Stats
js:
  - stats.js
---
{% contentfor fullpage no-convert %}

<style>
    stats-display {
        --analytics-bar-color: dodgerblue;

        display: grid;
        gap: 1rem;
        grid-template-rows: min-content;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        font-family: sans-serif;

        > * {
            border: 1px solid;
        }

        > *:first-child {
            grid-column: 1/-1;
        }
    }
</style>

## Site Analytics

This page is a weekly report on the visitors of [gregdaynes.com](//gregdaynes.com). 

I wanted to see how I would implement site analytics, but with hard rules around privacy and open information. You can [read more about the project](https://gregdaynes.com/post/2025/06/16/stats-and-reporting.html)


<stats-display data-url="https://analytics.app.gregdaynes.com/report">
	<date-header></date-header>
	<unique-visitors></unique-visitors>
	<total-visits></total-visits>
	<total-pageviews></total-pageviews>
	<pages-per-visit></pages-per-visit>
	<bounce-rate></bounce-rate>
	<session-duration></session-duration>
	<entry-page></entry-page>
	<exit-page></exit-page>
	<session-countries></session-countries>
	<session-regions></session-regions>
	<tech-os></tech-os>
	<tech-browser></tech-browser>
	<tech-device></tech-type>
</stats-display>


{% endcontentfor %}
