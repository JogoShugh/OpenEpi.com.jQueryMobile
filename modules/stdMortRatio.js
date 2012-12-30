define(['require'],	function(require) {
		return {
			name:'StdMortRatio',
			group:'Counts',
			title: 'Standardized Mortality Ratio',
			titleShort: 'Std.Mort.Ratio',
			inputFields:
			[
				{
					id: 'observedNumberOfCases',
					label: 'Observed number of cases',
					required: true,
					type: 'text',
					jqmType: 'textinput',
					minlength: 5,
					maxlength: 50,
					defaultValue: '4'
				}
				,{
					id: 'expectedNumberOfCases',
					label: 'Expected number of cases',
					required: true,
					type: 'text',
					jqmType: 'textinput',
					minlength: 5,
					maxlength: 50,
					defaultValue: '3'
				}
			]
			,
			calculate: function(viewModel, callback) { 
				require(['modules/bigFatPowerAlgorithm'], function(bigFatPowerAlgorithm) {
					var result = bigFatPowerAlgorithm.execute(
						viewModel.observedNumberOfCases(), viewModel.expectedNumberOfCases());
					callback(result);
				});
			}
		};
	}
);