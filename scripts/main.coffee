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
	'app'
	'jquery',
	'backbone',
	'backbone-forms',
	'editors/list',
	'templates/bootstrap',
	'jade'
], (app, $, bb, bbf, l, tb) ->
	console.log 'App started...'

'''
    script(src='scripts/jquery-1.8.3.js', type='text/javascript')
    script(src='scripts/jquery.mobile-1.2.0.min.js', type='text/javascript')
    script(src='scripts/toastr.js', type='text/javascript')  
    script(src='scripts/underscore.js', type='text/javascript')
    script(src='scripts/backbone-min.js', type='text/javascript')
    script(src='scripts/knockout-2.0.0.js', type='text/javascript')
    script(src='scripts/knockback.min.js', type='text/javascript')
    script(src='scripts/jade.js', type='text/javascript')
    script(src='scripts/jquery.jade.min.js', type='text/javascript')
'''


