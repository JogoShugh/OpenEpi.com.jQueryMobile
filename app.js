(function() {
  var bindModuleLinks, error, fetchInputFieldTemplates, moduleLoad, showResult, templates;

  templates = {};

  fetchInputFieldTemplates = function(callback) {
    var count, src, templateName, templateNames, _i, _len, _results;
    templateNames = ['input-text-tmpl'];
    count = templateNames.length;
    _results = [];
    for (_i = 0, _len = templateNames.length; _i < _len; _i++) {
      templateName = templateNames[_i];
      src = 'templates/' + templateName + '.txt';
      _results.push($.ajax(src).done(function(data) {
        templates[templateName] = data;
        count--;
        if (count === 0) {
          return callback();
        }
      }).fail(function(ex) {
        count--;
        if (count === 0) {
          callback();
        }
        return error("Error loading input field templates in fetchInputFieldTemplates: " + ex);
      }));
    }
    return _results;
  };

  bindModuleLinks = function() {
    return $('.moduleItem a').each(function() {
      var item, moduleName;
      item = $(this);
      moduleName = item.attr('data-moduleName');
      return item.bind('click', function() {
        return moduleLoad(moduleName);
      });
    });
  };

  moduleLoad = function(moduleName) {
    var module, modulePage;
    modulePage = $("#module");
    module = modules[moduleName];
    if (!(module != null)) {
      error("Could not find module " + moduleName);
      return;
    }
    $("#resultsMissing").show();
    $("#resultsPane").hide();
    return modulePage.find('.fields').each(function() {
      var field, fieldContainer, fields, html, model, tmpl, viewModel, viewModelData, _i, _len;
      fieldContainer = $(this);
      fieldContainer.empty();
      viewModelData = {};
      fields = module.inputFields;
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        field = fields[_i];
        viewModelData[field.id] = field.defaultValue;
        tmpl = templates['input-' + field.type + '-tmpl'];
        html = $.jade(tmpl, field);
        fieldContainer.append(html);
        fieldContainer.find("[data-id='" + field.id + "']").each(function() {
          return $(this)[field.jqmType]();
        });
      }
      model = new Backbone.Model(viewModelData);
      viewModel = kb.viewModel(model);
      ko.applyBindings(viewModel, this);
      modulePage.find('.calculate').each(function() {
        var command;
        command = $(this);
        command.unbind('click');
        return command.bind('click', function() {
          var result;
          result = module.calculate(viewModel);
          return showResult(result);
        });
      });
      $.mobile.changePage("#module");
      return $(".enterButton").addClass('ui-btn-down');
    });
  };

  showResult = function(result) {
    var drumRoll, resultData, resultPage;
    resultPage = $("#results");
    resultData = $("#resultData");
    drumRoll = $("#drumRoll");
    resultData.hide();
    drumRoll.show();
    $("#resultsMissing").hide();
    $("#resultsPane").show();
    $.mobile.changePage("#results");
    return window.setTimeout(function() {
      return drumRoll.fadeOut().promise().done(function() {
        resultData.html(result);
        return resultData.fadeIn();
      });
    }, 1000);
  };

  error = function(message) {
    toastr.error(message);
    return console.log('OpenEpi Error:' + message);
  };

  $(function() {
    return fetchInputFieldTemplates(function() {
      bindModuleLinks();
      return window.setTimeout(function() {
        return $.mobile.changePage("#home");
      }, 1750);
    });
  });

}).call(this);
