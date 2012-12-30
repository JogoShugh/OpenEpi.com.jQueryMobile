(function() {
  var bindModuleLinks, error, fetchInputFieldTemplates, info, moduleLoad, modules, renderModuleLinks, showResult, templates;

  templates = {};

  modules = {};

  fetchInputFieldTemplates = function(callback) {
    var count, getTemplate, i, templateNames, _i, _ref, _results;
    templateNames = ['input-text-tmpl', 'display-moduleList-tmpl'];
    count = templateNames.length;
    _results = [];
    for (i = _i = 0, _ref = templateNames.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      getTemplate = function() {
        var currentTemplateName, src;
        currentTemplateName = templateNames[i];
        src = 'templates/' + currentTemplateName + '.jade';
        return $.ajax(src, {
          dataType: 'text'
        }).done(function(data) {
          templates[currentTemplateName] = data;
          count--;
          if (count === 0) {
            return callback();
          }
        }).fail(function(ex) {
          count--;
          error("Error loading input field templates in fetchInputFieldTemplates: " + ex);
          if (count === 0) {
            return callback();
          }
        });
      };
      _results.push(getTemplate());
    }
    return _results;
  };

  bindModuleLinks = function(callback) {
    var count, moduleLink, successCount, totalCount, _i, _len, _ref, _results;
    count = moduleLinks._links.modules.length;
    totalCount = count;
    successCount = 0;
    _ref = moduleLinks._links.modules;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      moduleLink = _ref[_i];
      _results.push($.ajax(moduleLink.href, {
        dataType: 'text'
      }).done(function(data) {
        var name;
        eval('module = ' + data);
        name = module.name;
        modules[name] = module;
        count--;
        successCount++;
        if (count === 0) {
          info("Loaded " + successCount + " of " + totalCount + " modules correctly...", {
            timeOut: 1000
          });
          return callback();
        }
      }).fail(function(ex) {
        count--;
        error(("Error loading module definition for module named " + moduleLink.id + ": ") + ex);
        if (count === 0) {
          info("Loaded " + successCount + " of " + totalCount + " modules correctly...", {
            timeOut: 1000
          });
          return callback();
        }
      }));
    }
    return _results;
  };

  renderModuleLinks = function() {
    var html, moduleList, moduleSelector, tmpl;
    moduleSelector = $("#moduleSelector");
    tmpl = templates['display-moduleList-tmpl'];
    html = $.jade(tmpl, {
      modules: modules
    });
    moduleSelector.append(html);
    return moduleList = $("#moduleList");
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

  info = function(message, options) {
    return toastr.info(message, options);
  };

  error = function(message) {
    toastr.error(message);
    return console.log('OpenEpi Error:' + message);
  };

  $(function() {
    return fetchInputFieldTemplates(function() {
      return bindModuleLinks(function() {
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
  });

}).call(this);
