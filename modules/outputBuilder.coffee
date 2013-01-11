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

		columns: (columns) ->
			@_columns = columns
			return @

		row: (row) ->
			@_rows.push(row)
			return @

		render: (result) ->
			@el = $("<div style='text-align:center'></div>")	
			@el.append(@_head)	
			klass = 'ui-grid-' + @_columnCountMap[@_columns.length]
			grid = $("<div class='#{klass}' style='border: 1px solid lightgray; background: #ffffff;'></div>")
			for value, i in @_columns
				klass = @_rowCountMap[i]
				grid.append("<div class='ui-block-#{klass}' style='background:lightgray'>#{value}</div>")
			for row in @_rows
				for item, j in row
					klass = @_rowCountMap[j]
					grid.append("<div class='ui-block-#{klass}'>#{item}</div>")
			@el.append(grid)
			@el.append("<h4>Input Data</h4>")
			inputs = $("<div id='#inputs' data-role='collapsible' data-collapsed='true' style='background:#fcfcfc; padding:3px;border:1px solid darkgray;'></div>")
			for key, value of result.model
				inputs.append("<div style='display:table-row'><span style='display:table-cell;text-align:right;'><b>#{result.fields[key].label}:</b></span><span style='display:table-cell;'>#{value}</span></div>")
			@el.append(inputs)

	return {
		OutputBuilder: OutputBuilder
	}