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
          editorAttrs: {
            value: '10'
          }
        },
        denominator: {
          label: 'Denominator',
          jqmType: 'textinput',
          editorAttrs: {
            value: '20'
          }
        }
      },
      calculate: function(model, callback) {
        console.log(model.numerator);
        console.log(model.denominator);
        return callback(model.numerator / model.denominator);
      }
    };
  });

  'inputFields2:\n[\n	{\n		id: \'numerator\',\n		name:\'numerator\',\n		label: \'Numerator\',\n		required: true,\n		type: \'text\',\n		jqmType: \'textinput\',\n		minlength: 5,\n		maxlength: 50,\n		defaultValue: \'10\'\n	}\n	,{\n		id: \'denominator\',\n		name: \'denominator\',\n		label: \'Denominator\',\n		required: true,\n		type: \'text\',\n		jqmType: \'textinput\',\n		minlength: 5,\n		maxlength: 50,\n		defaultValue: \'20\'\n	}\n]';


}).call(this);
