define ['jquery'], ($) ->
	class OutputBuilder
		constructor: () ->
			@_columnCountMap = {2:'a', 3:'b', 4:'c', 5:'d'}
			@_rowCountMap = {0:'a', 1:'b', 2:'c', 3:'d', 4:'e'}
			@el = $("")
			@_head = $("")
			@_columns = []
			@_rows = []

		heading: (text) ->
			@_head = "<h3>" + text + "</h3>"
			return @
		
		'''
		<div data-role="collapsible" data-content-theme="c">
		   <h3>Header</h3>
		   <p>I'm the collapsible content with a themed content block set to "c".</p>
		</div>
		'''

		columns: (columns) ->
			@_columns = columns
			return @

		row: (row) ->
			@_rows.push(row)
			return @

		render: (result) ->
			@el = $("<div></div>")
			klass = 'ui-grid-' + @_columnCountMap[@_columns.length]
			section = $("<div data-role='collapsible' data-collapsed='false' data-theme='b' data-content-theme='d'></div>")
			section.append(@_head)
			grid = $("<div class='#{klass}'></div>")
			for value, i in @_columns
				klass = @_rowCountMap[i]
				grid.append("<span class='ui-block-#{klass}' style='background:lightgray;'>#{value}</span>")
			for row in @_rows
				for item, j in row
					klass = @_rowCountMap[j]
					grid.append("<span class='ui-block-#{klass}' style='color:#333333;'>#{item}</span>")
			section.append(grid)
			@el.append(section)
			inputs = $("<div id='#inputs' data-role='collapsible' data-theme='d' data-content-theme='e'></div>")
			inputs.append("<h3>Input Data</h3>")
			for key, value of result.model
				inputs.append("<div style='display:table-row'><span style='display:table-cell;text-align:right;color:#333333;'><b>#{result.fields[key].label}:&nbsp;</b></span><span style='display:table-cell;text-align:right;'>#{value}</span></div>")
			@el.append(inputs)
			section.collapsible()
			inputs.collapsible()

	return {
		create: ->
			return new OutputBuilder()
	}