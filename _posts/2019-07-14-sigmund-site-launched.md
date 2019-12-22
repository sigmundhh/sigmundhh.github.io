---
layout: post
title: "Sigmund, Launches Site"
date: 2019-07-14
---

Well. Finally got around to putting this old website together. Neat thing about it - powered by [Jekyll](http://jekyllrb.com) and I can use Markdown to author my posts. It actually is a lot easier than I thought it was going to be. Below is my humble attempt to make a double pendulum.
<svg id="scene" height="500" width="900">
  <line id="string_parent" x1="150" y1="50" x2="250" y2="50" stroke="black" stroke-width="4" />
  <line id="string_child" x1="250" y1="50" x2="350" y2="50" stroke="black" stroke-width="2" />
  <circle id="joint" cx="250" cy="50" r="5" fill="black" >
</svg>

<p id = "paragraph"> </p>

<script src="{{ base.url | prepend: site.url }}/assets/js/first_script.js"></script>
<button type="button" onclick="startAnimation()">Start</button>
<button type="button" onclick="stopAnimation()">Stop</button>


