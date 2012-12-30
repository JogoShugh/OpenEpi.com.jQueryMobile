# Summary

This is a rough draft at a version of OpenEpi.com done with jQueryMobile, and a bunch of other popular and powerful open-source libraries.

# How to run

I've only tested with FireFox and Chrome so far. In FireFox, you should be able to run from file:///, but in Chrome, you'll have to start chrome with `<pathtochrome>\chrome.exe --allow-file-access-from-files` to enable AJAX support from the file system. _(This is not optimal, so I will eventually not rely on this way of loading dynamic files)_

# Technical Implementation

Besides jQuery Mobile, the libraries used so far are:

1. Knockback.js (Backbone.js + Knockout.js)
2. Jade templating
3. CoffeeScript
4. toastr (for toast style messages)
5. Nodefront for Jade "compilation" to HTML

# How to compile from source

The app doesn't currently use Node.js to run, but you'll need to install Node.js and [Nodefront](http://karthikv.github.com/nodefront/) in order to "compile" the Jade into static HTML.

Once you've installed that, you can type `nodefront compile` and it will regenerate index.html, etc from the jade files.

There's a little hack right now also which requires running `. ./mini.sh` to regenerate the modules.jade file. And, you have to remove `var` from the file by hand and the trailing statement after the minified object. I plan to dynamically render the module list, however, so this will go away soon.












