(function() {

  define(['modules', 'templates', 'backbone', 'backbone-forms', 'underscore', 'toastr', 'jquery', 'jquery.mobile', 'jquery.jade'], function(modules, templates, Backbone, bbforms, _, toastr, $, jqm, jade) {
    var OpenEpiShell, error, info, log, success;
    log = function(message) {
      return console.log(message);
    };
    info = function(message, options) {
      return toastr.info(message, options);
    };
    success = function(message, options) {
      return toastr.success(message, options);
    };
    error = function(message) {
      toastr.error(message);
      return console.log('OpenEpi Error:' + message);
    };
    OpenEpiShell = (function() {

      function OpenEpiShell() {
        var _this = this;
        this.moduleModels = {};
        this.templateModules = [];
        this.templatesListRendered = false;
        $(function() {
          var h;
          h = $(window).height();
          $("#splash").css("height", h);
          $.mobile.loading('show');
          $('#bodyDiv').css('visibility', 'visible').hide().fadeIn('slow');
          $.mobile.loading('hide');
          $("#more").on({
            popupbeforeposition: function() {
              h = $(window).height();
              return $("#more").css("height", h);
            }
          });
          $("#moreModule").on({
            popupbeforeposition: function() {
              h = $(window).height();
              return $("#moreModule").css("height", h);
            }
          });
          _this.renderModuleLinks();
          return window.setTimeout(function() {
            return $.mobile.changePage("#home");
          }, 1750);
        });
      }

      OpenEpiShell.prototype.renderModuleLinks = function() {
        var html, mods, moduleSelector, that, tmpl;
        info("Loaded all modules successfully...", {
          timeOut: 1000
        });
        moduleSelector = $("#moduleSelector");
        tmpl = templates['display-moduleList'];
        mods = {
          modules: modules
        };
        html = $.jade(tmpl, mods);
        moduleSelector.append(html);
        that = this;
        return $('.moduleItem a').each(function() {
          var item, moduleName,
            _this = this;
          item = $(this);
          moduleName = item.attr('data-moduleName');
          return item.bind('click', function() {
            return that.moduleLoad(moduleName);
          });
        });
      };

      OpenEpiShell.prototype.moduleLoad = function(moduleName, formValue) {
        var module, moduleModel, modulePage,
          _this = this;
        modulePage = $("#module");
        module = this.getModule(moduleName);
        if (!(module != null)) {
          return;
        }
        moduleModel = this.getModuleModel(module);
        if (!(moduleModel != null)) {
          return;
        }
        $("#resultsMissing").show();
        $("#resultsPane").hide();
        return modulePage.find('.fields').each(function(i, el) {
          var args, authorCredit, authorType, authors, fieldContainer, form, formModel, model, _ref;
          fieldContainer = $(el);
          fieldContainer.empty();
          $("#moduleTitle").text(module.title);
          model = new moduleModel;
          args = {
            model: model
          };
          formModel = new Backbone.Form(args);
          if (formValue != null) {
            formModel.model.attributes = formValue;
          }
          form = formModel.render();
          fieldContainer.html(form.el);
          modulePage.find('.calculate').each(function(i, el) {
            var command;
            command = $(el);
            return command.unbind('click').bind('click', function() {
              formValue = form.getValue();
              $.mobile.loading('show');
              return module.calculate(formValue, function(result) {
                _this.showResult(result, module.render);
                return $.mobile.loading('hide');
              }, _this.error);
            });
          });
          modulePage.find('.templateSave').each(function(i, el) {
            var command;
            command = $(el);
            return command.unbind('click').bind('click', function() {
              var stp;
              formValue = form.getValue();
              _this.templatesAdd(module, formValue);
              stp = $('#saveTemplatePopup');
              return stp.popup('close');
            });
          });
          $("#moduleSummary").html(module.summary);
          $("#moduleDescription").html(module.description);
          authors = $("<div style='padding-left:5px'></div>");
          _ref = module.authors;
          for (authorType in _ref) {
            authorCredit = _ref[authorType];
            authors.append("<div style='color:#333333'><b style='color:#555555'>" + authorType + ":</b> " + authorCredit + "</div>");
          }
          $("#moduleAuthors").append(authors);
          $("#moduleInfo").collapsible();
          $.mobile.changePage("#module");
          return modulePage.trigger('create');
        });
      };

      OpenEpiShell.prototype.getModule = function(moduleName) {
        var module;
        module = modules[moduleName];
        if (!(module != null)) {
          error("Could not find module " + moduleName);
          return null;
        }
        return module;
      };

      OpenEpiShell.prototype.getModuleModel = function(module) {
        var moduleModel;
        moduleModel = this.moduleModels[module.name];
        if (!(moduleModel != null)) {
          moduleModel = Backbone.Model.extend({
            schema: module.inputFields
          });
          this.moduleModels[module.name] = moduleModel;
        }
        return moduleModel;
      };

      OpenEpiShell.prototype.showResult = function(result, renderFn) {
        var processing, resultData, resultPage;
        resultPage = $('#results');
        resultData = $('#resultData');
        processing = $('#processing');
        resultData.hide();
        processing.show();
        $("#resultsMissing").hide();
        $("#resultsPane").show();
        $.mobile.changePage('#results');
        return window.setTimeout(function() {
          return processing.fadeOut().promise().done(function() {
            var completeRender;
            completeRender = function(html) {
              resultData.empty();
              resultData.append(html);
              return resultData.fadeIn(200);
            };
            return renderFn(result, completeRender, error);
          });
        }, 200);
      };

      OpenEpiShell.prototype.templatesAdd = function(module, formValue) {
        var templateModule, templateName;
        templateName = $('#templateName').val();
        templateModule = {
          templateName: templateName,
          module: module,
          formValue: formValue
        };
        this.templateModules.unshift(templateModule);
        success("Template " + templateName + " added");
        return this.templateModulesListRender();
      };

      OpenEpiShell.prototype.templateModulesListRender = function() {
        var html, items, mods, templateModuleSelector, tmpl, tmplItems,
          _this = this;
        templateModuleSelector = $("#templateModules");
        if (this.templatesListRendered === false) {
          tmpl = templates['display-templatesList'];
          html = $.jade(tmpl, {});
          templateModuleSelector.append(html);
        }
        $('#templateModulesList').empty();
        mods = {
          templateModules: this.templateModules
        };
        tmplItems = templates['display-templatesListItem'];
        items = $.jade(tmplItems, mods);
        $('#templateModulesList').append(items);
        $('.templateModule').children('a').each(function(i, el) {
          var formValue, index, item, moduleName, templateModule;
          item = $(el);
          index = Number(item.attr('data-index'));
          templateModule = _this.templateModules[index];
          moduleName = templateModule.module.name;
          formValue = templateModule.formValue;
          return item.bind('click', function() {
            return _this.moduleLoad(moduleName, formValue);
          });
        });
        if (this.templatesListRendered) {
          return $('#templateModulesList').listview('refresh');
        } else {
          return this.templatesListRendered = true;
        }
      };

      return OpenEpiShell;

    })();
    return OpenEpiShell;
  });

}).call(this);
