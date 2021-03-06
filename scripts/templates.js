(function() {
  var __slice = [].slice;

  (function() {
    var name, templateInsaneNames, templateNames;
    templateNames = ["input-text", "display-moduleList", "input-textarea", 'display-templatesList', 'display-templatesListItem'];
    templateInsaneNames = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = templateNames.length; _i < _len; _i++) {
        name = templateNames[_i];
        _results.push("text!../templates/" + name + ".jade");
      }
      return _results;
    })();
    return define(templateInsaneNames, function() {
      var args, i, templates, _i, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      templates = {};
      for (i = _i = 0, _ref = args.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        templates[templateNames[i]] = args[i];
      }
      return templates;
    });
  })();

}).call(this);
