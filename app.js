(function() {

  define(['modules', 'templates'], function(modules, templates) {
    var error, info, moduleLoad, renderModuleLinks, showResult;
    renderModuleLinks = function() {
      var html, moduleSelector, tmpl;
      info("Loaded all modules successfully...", {
        timeOut: 1000
      });
      moduleSelector = $("#moduleSelector");
      tmpl = templates['display-moduleList'];
      html = $.jade(tmpl, {
        modules: modules
      });
      return moduleSelector.append(html);
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
          tmpl = templates['input-' + field.type];
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
          return command.unbind('click').bind('click', function() {
            var result;
            return result = module.calculate(viewModel, function(result) {
              return showResult(result);
            });
          });
        });
        return $.mobile.changePage("#module");
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
    info = function(message, options) {
      return toastr.info(message, options);
    };
    error = function(message) {
      toastr.error(message);
      return console.log('OpenEpi Error:' + message);
    };
    return $(function() {
      renderModuleLinks();
      $('.moduleItem a').each(function() {
        var item, moduleName;
        item = $(this);
        moduleName = item.attr('data-moduleName');
        return item.bind('click', function() {
          return moduleLoad(moduleName);
        });
      });
      return window.setTimeout(function() {
        return $.mobile.changePage("#home");
      }, 1750);
    });
  });

}).call(this);
