(function() {

  define(function() {
    return {
      name: 'Proportion',
      group: 'Sample Size',
      title: 'Simple Proportion',
      titleShort: 'Proportion',
      inputFields: {
        numerator: {
          label: 'Numerator',
          jqmType: 'textinput',
          dataType: 'number',
          editorAttrs: {
            value: '10'
          }
        },
        denominator: {
          label: 'Denominator',
          jqmType: 'textinput',
          dataType: 'number',
          editorAttrs: {
            value: '20'
          }
        }
      },
      calculate: function(model, callback, error) {
        return callback(model.numerator / model.denominator);
      },
      render: function(result, callback, error) {
        return callback("<h4>" + result + "</h4>");
      }
    };
  });

}).call(this);
