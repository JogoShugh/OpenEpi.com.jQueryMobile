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

      OutputBuilder.prototype.columns = function(columns) {
        this._columns = columns;
        return this;
      };

      OutputBuilder.prototype.row = function(row) {
        this._rows.push(row);
        return this;
      };

      OutputBuilder.prototype.render = function(result) {
        var grid, i, inputs, item, j, key, klass, row, value, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        this.el = $("<div style='text-align:center'></div>");
        this.el.append(this._head);
        klass = 'ui-grid-' + this._columnCountMap[this._columns.length];
        grid = $("<div class='" + klass + "' style='border: 1px solid lightgray; background: #ffffff;'></div>");
        _ref = this._columns;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          value = _ref[i];
          klass = this._rowCountMap[i];
          grid.append("<div class='ui-block-" + klass + "' style='background:lightgray'>" + value + "</div>");
        }
        _ref1 = this._rows;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          row = _ref1[_j];
          for (j = _k = 0, _len2 = row.length; _k < _len2; j = ++_k) {
            item = row[j];
            klass = this._rowCountMap[j];
            grid.append("<div class='ui-block-" + klass + "'>" + item + "</div>");
          }
        }
        this.el.append(grid);
        this.el.append("<h4>Input Data</h4>");
        inputs = $("<div id='#inputs' data-role='collapsible' data-collapsed='true' style='background:#fcfcfc; padding:3px;border:1px solid darkgray;'></div>");
        _ref2 = result.model;
        for (key in _ref2) {
          value = _ref2[key];
          inputs.append("<div style='display:table-row'><span style='display:table-cell;text-align:right;'><b>" + result.fields[key].label + ":</b></span><span style='display:table-cell;'>" + value + "</span></div>");
        }
        return this.el.append(inputs);
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
