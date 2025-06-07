---
layout: post
title: 2024 Return of the personal life
date: 2024-01-01 23:03 -0800
categories:
  - post
---

Happy New Year - Welcome to 2024!

2023 brought a lot of changes in technology, with the availability of LLM and Generative AIs for public consumption, to the [enshittification](https://pluralistic.net/2023/01/21/potemkin-ai/) of everything.

I spent much of the year as a consultant, mostly in Shopify e-commerce, location based entertainment, interactive education, and physical literacy. After leaving my research & development role within the Canadian defence industry.

In my work and areas of research, several technical themes kept reappearing throughout 2023 - outside of AI of course:

1. Software Maintainability
2. Sustainable Development
3. Fediverse and Platform Exodus
4. Reduced role of Active-Computing

While 1, 2 are self explanatory and something that will forever be a topic of discussion and professional pursuit, 3 & 4 are not new, but have a renewed focus.

### Fediverse and the Exodus - Bring on the [Indieweb](https://indieweb.org)

I'm not sure I like the term indieweb, but it works for now. I've missed the internet of the 90s/00s, but it didn't disappear, our attention was misplaced elsewhere. Events in 2022 and 2023 have brought the independent web back into view as some people are rebelling against centralized platforms.

Those platforms aren't going to disappear anytime soon, but we can make concerted efforts to prioritize and utilize the free and open web to control our own content and publish as we see fit. The [POSSE](https://www.theverge.com/2023/10/23/23928550/posse-posting-activitypub-standard-twitter-tumblr-mastodon) protocol is a good guidance for moving on in 2024.

### Reduced role of Active Computing

A subject I've been ruminating over this past year, is the role Active computing takes in our lives. Between deep work, or mindless doomscrolling, we're actively engaging with computers to do things. This requires our time and attention to perform actions however menial. Computers are surprisingly good at doing things repeatedly and scheduled. So why do we need to actively engage to get what we want? Why isn't it available for us when we think about it or pass by?

Phone lock screens are one way to achieve this. It's personal, and with you most of the time, but that comes with the mental burden of having the device with you and looking at it. Physical information dashboards like [magic mirrors]() and [e-ink calendars]() are potentially more appropriate for passive information.

Communication channels: Slack, Discord, Texting/SMS are all asynchronous communication but have certain expectations to be synchronous. This puts a burden on us to have our phones or laptops at the ready, to be willing to jump to answer any question asked. Bring back email, things can wait for a few hours, or days. Nothing needs immediate resolution, and if it does, pick up the phone and call.

_Email, I never thought I'd say I wanted more email, but here we are._

During Summer 2023, I was writing small applications that would fetch data from various services. My goal for each of these applications was to be fast, simple, and out of the way. They're CLIs, which requires inputting the command into a terminal, and viewing the results. Fast + Simple were covered, single responsibility and ASCII output means there's not a lot of room for feature creep and bloat.

But they were very much in-the-way, and required active computing.

Enter `cron`, My favourite scheduling tool from 1975. Unchanged, and unequalled for 48 years.

_Did you know cron jobs will email the output of the job upon completion? Usually it's to the local inbox on your computer, but you can configure sending to an external email address._

Pairing cron + my little CLIs, I now get emails of daily events, weather, air quality, alerts, and news without having to open separate apps, or refresh screens. I can now consume the data on my own time and schedule, that's independent of the application.

This has reduced my phone use, and increased my focus on work, and life away from technology however it is still active-computing.

Something I haven't explored enough yet, alert-only systems. Maybe these apps could have thresholds for when something is sent to the consumer? We use this for application monitoring when your network is saturated or response time exceeds 500ms, financial trading does this, so why not daily life things?

Schedule for the day starts earlier than usual, notification when you are getting ready for the day. Air Quality is abnormal - notification to don a mask. UV index is high and you are outside for more than a few minutes, notification put on sunscreen or seek cover. Breaking news events, aggregate and send as an email near the end of the day.

The last one is not actionable, it does not impact you, you can't do anything to affect it, so move it to something you can look at when you feel like it. This is where LLMs can come in somewhat handy, rough 1-2 sentence summary of daily events, in an aggregate email. now you don't need to check your RSS reader periodically.

I have more thoughts on this which I will write about as I can. If you have suggestions for apps that could be a good fit, please let me know! I'd love more of this in my life.

### Where I'm going

Instead of resolutions for 2024, I have my goals.

They are to:

- Own my personal platforms (this website)
- Automate any software task that should not need my attention or instruction to complete.
- Read and write more emails.
- Put the phone down and spend time with purpose.
- Reduce computer usage in favour of work and play.
- Make an effort to use boring and low-tech computing.

What are your goals for 2024?

_I started out by writing a rant around Business growth, economic layoffs, Generative AIs/LLMS, burnout and lack of caring that's causing maintainbility and sustainable softare development to fall to the wayside, but it was really just me yelling at the clouds. I'm trying to be more proactive._
