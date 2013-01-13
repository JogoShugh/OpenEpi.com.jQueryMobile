requirejs.config
	shim:
		'underscore':
			exports: '_'
		'backbone':
		    deps: ['underscore', 'jquery']
		    exports: 'Backbone'
		'jade': []
		'jquery.jade':
			deps: ['jquery']

require [
	'openEpiShell'
	'jquery',
	'backbone',
	'backbone-forms',
	'editors/list',
	'templates/bootstrap',
	'jade'
], (openEpiShell, $, bb, bbf, l, tb) ->
	app = new openEpiShell()