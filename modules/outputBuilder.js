(function() {

  define(['jquery'], function($) {
    var OutputBuilder;
    OutputBuilder = (function() {

      function OutputBuilder() {
        this._columnCountMap = {
          2: 'a',
          3: 'b',
          4: 'c',
          5: 'd'
        };
        this._rowCountMap = {
          0: 'a',
          1: 'b',
          2: 'c',
          3: 'd',
          4: 'e'
        };
        this.el = $("");
        this._head = $("");
        this._columns = [];
        this._rows = [];
      }

      OutputBuilder.prototype.heading = function(text) {
        this._head = "<h3>" + text + "</h3>";
        return this;
      };

      '<div data-role="collapsible" data-content-theme="c">\n   <h3>Header</h3>\n   <p>I\'m the collapsible content with a themed content block set to "c".</p>\n</div>';


      OutputBuilder.prototype.columns = function(columns) {
        this._columns = columns;
        return this;
      };

      OutputBuilder.prototype.row = function(row) {
        this._rows.push(row);
        return this;
      };

      OutputBuilder.prototype.render = function(result) {
        var grid, i, inputs, item, j, key, klass, row, section, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        this.el = $("<div></div>");
        klass = 'ui-grid-' + this._columnCountMap[this._columns.length];
        section = $("<div data-role='collapsible' data-collapsed='false' data-theme='b' data-content-theme='d'></div>");
        section.append(this._head);
        grid = $("<div class='" + klass + "'></div>");
        _ref = this._columns;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          value = _ref[i];
          klass = this._rowCountMap[i];
          grid.append("<span class='ui-block-" + klass + "' style='background:lightgray;'>" + value + "</span>");
        }
        _ref1 = this._rows;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          row = _ref1[_j];
          for (j = _k = 0, _len2 = row.length; _k < _len2; j = ++_k) {
            item = row[j];
            klass = this._rowCountMap[j];
            grid.append("<span class='ui-block-" + klass + "' style='color:#333333;'>" + item + "</span>");
          }
        }
        section.append(grid);
        this.el.append(section);
        inputs = $("<div id='#inputs' data-role='collapsible' data-theme='d' data-content-theme='e'></div>");
        inputs.append("<h3>Input Data</h3>");
        _ref2 = result.model;
        for (key in _ref2) {
          value = _ref2[key];
          inputs.append("<div style='display:table-row'><span style='display:table-cell;text-align:right;color:#333333;'><b>" + result.fields[key].label + ":&nbsp;</b></span><span style='display:table-cell;text-align:right;'>" + value + "</span></div>");
        }
        this.el.append(inputs);
        section.collapsible();
        return inputs.collapsible();
      };

      return OutputBuilder;

    })();
    return {
      create: function() {
        return new OutputBuilder();
      }
    };
  });

}).call(this);
