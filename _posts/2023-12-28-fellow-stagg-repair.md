---
layout: post
title: Fellow Stagg Repair
categories:
  - project
excerpt: Outlining repair of the base for the Stag EKG Kettle by Fellow.
---

### Problem

The control knob on the base was not registering presses (which turn the kettle on and off). The kettle itself was working fine, and the temperature control was working.

### Solution

The base is held together with 4 screws, and 8 clips. The clips are easy to release with a flathead screwdriver. The screws are hidden under the sticker on the bottom - _Not the rubber pads_.

_In my looking for the screws, I removed the feet, which caused the rubber to tear. They're easy enough to glue back on._

The rotary encoder is situated on a daughter board fixed with 2 philips screws and connected with a ribbon cable to the main board. The cable disconnects from a JST port on the mainboard, but is soldered on the daughter board.

Rotary Encoder Details:

- 5V
- 20 pulses
- 13mm x 14mm

I used [these encoders](https://www.amazon.ca/dp/B07T3672VK) from Amazon.

Desoldering the rotary encoder was straight forward, I used a solder-sucker and wick to remove and prepare the pads. I did have to have fairly high temperature on my iron around 740 to get the factory solder to warm up.

Re-assembly is disassembly in reverse, be mindful of the thin wires routing around the center. Use a bit of Kapton tape to keep things in place.

### Outcome

I can use my kettle again. I broke the display, but it works enough to not warrant a replacement base $100 USD from their parts shop, which when factored in CAD and shipping, is more than new kettle from a Canadian distributer.

I like my Fellow Stagg EKG Kettle, but I don't think I will buy another Fellow product with electronics (I love the Prismo - Aeropress accessory).

### Notes

The screws use a triangle security bit, which I didn't have on hand, however a T-6 Torx bit worked well.

The LCD is fixed (more than solder joints) to the main control board, which turns out is very fragile. I managed to crack the LCD even while attempting to be gentle, I didn't touch the board except disconnect and reconnect of the rotary daughter board connector. Beware.

I did not measure the stem prior to this repair, the donor rotary encoder stem was much longer. Beware of this and make sure to measure and find the appropriate stem. A long one of course workse, but the knob stands above the case now, and is easier for water to find ingress into the electronics.

