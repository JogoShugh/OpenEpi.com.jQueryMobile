(function() {

  define(["require"], function(require) {
    return {
      name: "StdMortRatio",
      group: "Counts",
      title: "Standardized Mortality Ratio",
      titleShort: "Std.Mort.Ratio",
      inputFields: {
        observedNumberOfCases: {
          label: 'Observed number of cases',
          jqmType: 'textinput',
          editorAttrs: {
            value: '4'
          }
        },
        expectedNumberOfCases: {
          label: 'Expected number of cases',
          jqmType: 'textinput',
          editorAttrs: {
            value: '3'
          }
        }
      },
      calculate: function(model, callback) {
        console.log("calculate: about to load my own dependency on 'bigFatPowerAlgorithm' " + "using require...Hold on to your hats for a moment...");
        return require(["../modules/bigFatPowerAlgorithm"], function(bigFatPowerAlgorithm) {
          var result;
          console.log("calculate: I have my bigFatPowerAlgorithm!");
          result = bigFatPowerAlgorithm.execute(Number(model.observedNumberOfCases), Number(model.expectedNumberOfCases));
          return callback(result);
        });
      }
    };
  });

}).call(this);
