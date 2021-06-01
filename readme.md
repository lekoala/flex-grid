# flex-grid

[![NPM](https://nodei.co/npm/flex-grid-element.png?mini=true)](https://nodei.co/npm/flex-grid-element/)
[![Downloads](https://img.shields.io/npm/dt/flex-grid-element.svg)](https://www.npmjs.com/package/flex-grid-element)

A powerful flex based grid system

## Introduction

Bootstrap 5 grid weights about 51kb minified. flex-grid, on the other hand, weights 4kb of css + 2 kb of js and provide a
similar feature set. Only 4kb of blocking css are between you are your dream layout!

## How to use

Simply include the library

```html
<script src="flex-grid.js"></script>
```

And use your grid

```html
<flex-grid>
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</flex-grid>
```

## Why a custom element ?

The custom element is just a convenience around setting the custom styles

It just makes the whole thing neat. Also, it allows targeting of elements
based on their attributes in css.

```html
<flex-grid md="3" lg="4">
  <div>col 1 of md=3/lg=4</div>
  <div>col 2 of md=3/lg=4</div>
  <div>col 3 of md=3/lg=4</div>
  <div>col 4 of md=3/lg=4</div>
</flex-grid>
```

Also, using attributes makes it very clear what is related to the layout when
classes can mean various things.

## Demo and more

For usage, please look at the demo

See demo.html or https://codepen.io/lekoalabe/pen/ExWowBM
