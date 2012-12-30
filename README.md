# Summary

This is a rough draft at a version of OpenEpi.com done with jQueryMobile, and a bunch of other popular and powerful open-source libraries.

# How to run

I've only tested with FireFox and Chrome so far. In FireFox, you should be able to run `index.html` from a `file://` url, but in Chrome, you'll have to start chrome with `<pathtochrome>\chrome.exe --allow-file-access-from-files` to enable AJAX support from the file system. _(This is not optimal, so I will eventually not rely on this way of loading dynamic files)_

# Technical Implementation

Besides [jQuery Mobile](http://jquerymobile.com/), the libraries used so far are:

1. [RequireJS](http://requirejs.org) -- Asynchronous Module Definition (AMD)
2. [Knockback.js](http://kmalakoff.github.com/knockback/) -- Backbone.js + Knockout.js) for magic bindings
3. [Jade](http://jade-lang.com/) -- HTML templates
4. [toastr](https://github.com/CodeSeven/toastr) -- toast style messages
5. [CoffeeScript](http://coffeescript.org/) -- _love JS, but gotta have my caffeine now..._
6. [Nodefront](http://karthikv.github.com/nodefront/) -- for CoffeeScript and Jade "compilation" to JavaScript and static HTML

# How to compile from source

The app doesn't currently use Node.js to run, but if you want to modify and compile the JavaScript and HTML you'll need to install [Node.js](http://nodejs.org/) and [Nodefront](http://karthikv.github.com/nodefront/) in order to "compile" the Jade into static HTML.

Once you've installed that, you can type `nodefront compile` and it will regenerate index.html, etc from the jade files.
