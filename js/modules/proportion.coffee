define ->
	name:'Proportion'
	tags:['sample size']
	title: 'Simple Proportion'
	titleShort: 'Proportion'
	summary: 'Proportion summary here'
	description: 'Another not-so-gigantic description that should be longer than the summary. It should even go multiple lines.'
	inputFields: 
		numerator:
			label: 'Numerator'
			jqmType: 'textinput'
			dataType: 'number'
			editorAttrs:
				value: '10'
		denominator:
			label: 'Denominator'
			jqmType: 'textinput'
			dataType: 'number'
			editorAttrs:
				value: '20'
					
	calculate: (model, callback, error) ->
		callback(model.numerator / model.denominator)

	render: (result, callback, error) ->
		callback("<h4>" + result + "</h4>")