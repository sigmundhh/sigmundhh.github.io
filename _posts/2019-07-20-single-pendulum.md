---
layout: post
title: "Single pendulum"
date: 2019-07-14
---

This is just a single pendulum, because I have to think about the double for a while.
<svg id="scene" height="500" width="900">
  <line id="string_parent" x1="300" y1="50" x2="500" y2="50" stroke="black" stroke-width="4" />
  <circle id="joint" cx="500" cy="50" r="5" fill="black" >
</svg>

<p id = "paragraph"> </p>

<script src="{{ base.url | prepend: site.url }}/assets/js/single_pendulum.js"></script>
<button type="button" onclick="startAnimation()">Start</button>
<button type="button" onclick="stopAnimation()">Stop</button>

