(function() {

  define(['modules', 'templates', 'backbone', 'backbone-forms', 'underscore', 'toastr', 'jquery', 'jquery.mobile', 'jquery.jade'], function(modules, templates, Backbone, bbforms, _, toastr, $, jqm, jade) {
    var error, getModule, getModuleModel, info, moduleLoad, moduleModels, renderModuleLinks, showResult;
    renderModuleLinks = function() {
      var html, mods, moduleSelector, tmpl;
      info("Loaded all modules successfully...", {
        timeOut: 1000
      });
      moduleSelector = $("#moduleSelector");
      tmpl = templates['display-moduleList'];
      mods = new Object();
      mods.modules = modules;
      html = $.jade(tmpl, mods);
      return moduleSelector.append(html);
    };
    moduleLoad = function(moduleName) {
      var module, moduleModel, modulePage;
      modulePage = $("#module");
      module = getModule(moduleName);
      if (!(module != null)) {
        return;
      }
      moduleModel = getModuleModel(module);
      if (!(moduleModel != null)) {
        return;
      }
      $("#resultsMissing").show();
      $("#resultsPane").hide();
      return modulePage.find('.fields').each(function() {
        var fieldContainer, form, model;
        fieldContainer = $(this);
        fieldContainer.empty();
        model = new moduleModel;
        form = new Backbone.Form({
          model: model
        }).render();
        fieldContainer.html(form.el);
        window.CurrentModule = module;
        window.CurrentModel = model;
        modulePage.find('.calculate').each(function() {
          var command;
          command = $(this);
          return command.unbind('click').bind('click', function() {
            var formValue;
            formValue = form.getValue();
            console.log(formValue);
            return module.calculate(formValue, function(result) {
              return showResult(result, module.render);
            }, error);
          });
        });
        $.mobile.changePage("#module");
        return modulePage.trigger('create');
      });
    };
    moduleModels = {};
    getModule = function(moduleName) {
      var module;
      module = modules[moduleName];
      if (!(module != null)) {
        error("Could not find module " + moduleName);
        return null;
      }
      return module;
    };
    getModuleModel = function(module) {
      var moduleModel;
      moduleModel = moduleModels[module.name];
      if (!(moduleModel != null)) {
        moduleModel = Backbone.Model.extend({
          schema: module.inputFields
        });
        moduleModels[module.name] = moduleModel;
      }
      return moduleModel;
    };
    showResult = function(result, renderFn) {
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
          var completeRender;
          completeRender = function(html) {
            resultData.empty();
            resultData.append(html);
            return resultData.fadeIn();
          };
          renderFn(result, completeRender, error);
          return 'el = $("<div style=\'padding:3px;border:1px solid darkgray;\'></div>")\nfor key, value of result.model\n  el.append("<div><b>#{key}:</b> #{value}</div>")';
        });
      }, 100);
    };
    info = function(message, options) {
      return toastr.info(message, options);
    };
    error = function(message) {
      toastr.error(message);
      return console.log('OpenEpi Error:' + message);
    };
    return $(function() {
      $("#popupPanel").on({
        popupbeforeposition: function() {
          var h;
          h = $(window).height();
          return $("#popupPanel").css("height", h);
        }
      });
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
