define({
	name:'Proportion',
	group:'Sample Size',
	title: 'Simple Proportion',
	titleShort: 'Proportion',
	inputFields:
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
	,
	calculate: function(viewModel, callback) { 
		callback( viewModel.numerator() / viewModel.denominator() );
	}
});