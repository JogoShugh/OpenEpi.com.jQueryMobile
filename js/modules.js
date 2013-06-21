// Generated by CoffeeScript 1.3.3
(function() {
  var __slice = [].slice;

  define(['modules/stdMortRatio', 'modules/ciMedian', 'modules/proportion'], function() {
    var allModules, args, getModule, mod, modName, modules, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    modules = {};
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      mod = args[_i];
      modules[mod.name] = mod;
    }
    for (modName in modules) {
      mod = modules[modName];
      console.log(mod);
      mod.resetInputModel = function() {
        var key, model, _j, _len1, _ref;
        if (mod.model != null) {
          delete mod.model;
        }
        model = {};
        _ref = mod.inputFields;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          key = _ref[_j];
          model[key] = '';
        }
        return mod.model = model;
      };
      console.log(mod.resetInputModel);
    }
    getModule = function(moduleName) {
      mod = modules[moduleName];
      if (!(mod != null)) {
        return null;
      }
      return mod;
    };
    allModules = function() {
      return modules;
    };
    return {
      getModule: getModule,
      allModules: allModules
    };
  });

}).call(this);
