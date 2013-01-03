define ->
	name:'Proportion',
	group:'Sample Size',
	title: 'Simple Proportion',
	titleShort: 'Proportion',
	inputFields: 
		numerator:
			label: 'Numerator'
			jqmType: 'textinput'
			editorAttrs:
				value: '10'
		denominator:
			label: 'Denominator'
			jqmType: 'textinput'
			editorAttrs:
				value: '20'
					
	calculate: (model, callback) ->
		console.log model.numerator
		console.log model.denominator
		callback(model.numerator / model.denominator)

'''
	inputFields2:
	[
		{
			id: 'numerator',
			name:'numerator',
			label: 'Numerator',
			required: true,
			type: 'text',
			jqmType: 'textinput',
			minlength: 5,
			maxlength: 50,
			defaultValue: '10'
		}
		,{
			id: 'denominator',
			name: 'denominator',
			label: 'Denominator',
			required: true,
			type: 'text',
			jqmType: 'textinput',
			minlength: 5,
			maxlength: 50,
			defaultValue: '20'
		}
	]
'''