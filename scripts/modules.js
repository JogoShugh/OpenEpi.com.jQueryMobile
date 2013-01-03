(function() {
  var __slice = [].slice;

  define(['../modules/stdMortRatio', '../modules/add', '../modules/proportion'], function() {
    var args, module, modules, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    modules = {};
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      module = args[_i];
      modules[module.name] = module;
    }
    return modules;
  });

}).call(this);
