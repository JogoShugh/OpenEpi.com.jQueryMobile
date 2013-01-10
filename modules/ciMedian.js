(function() {

  define(function() {
    var _this = this;
    return {
      name: 'ConfidenceInterval',
      group: 'Continuous Variables',
      title: 'Confidence Interval',
      titleShort: 'Median / %ile CI',
      summary: 'Confidence Interval of median or other percentile for a sample size',
      description: "This module calculates confidence interval around a selected percentile for a sample size given. Entering sample size and desired percentile will calculate 95% confidence interval as a default confidence limit. The user can change the confidence interval by typing in new value. Please note that the selected percentile should be within 1-100%",
      authors: [
        {
          Statistics: 'Minn M. Soe and Kevin M. Sullivan (Emory University)',
          Interface: 'Andrew G. Dean (EpiInformatics.com), Roger A. Mir, and Joshua Gough (AgileFromTheGroundUp.com)'
        }
      ],
      inputFields: {
        sampleSize: {
          label: 'Sample Size',
          jqmType: 'textinput',
          editorAttrs: {
            value: '100'
          }
        },
        median: {
          label: 'Desired Percentile',
          jqmType: 'textinput',
          editorAttrs: {
            value: '50'
          }
        },
        confidenceLevel: {
          label: 'Confidence Level (%)',
          jqmType: 'textinput',
          editorAttrs: {
            value: '95'
          }
        }
      },
      calculate: function(model, callback, error) {
        var cscrit, ll, median, n, np, p, pt, resultModel, ul, z;
        n = parseFloat(model.sampleSize);
        if (n <= 0) {
          error("Sample size must be > 0");
          return;
        }
        median = parseFloat(model.median);
        if (median <= 0 || median > 100) {
          error("Percentile value must be within the limits of 1-100%");
          return;
        }
        cscrit = 0;
        pt = 0;
        z = 0;
        pt = parseFloat(model.confidenceLevel);
        if (pt === 99.99) {
          cscrit = 15.137;
        }
        if (pt === 99.98) {
          cscrit = 13.831;
        }
        if (pt === 99.95) {
          cscrit = 12.116;
        }
        if (pt === 99.9) {
          cscrit = 10.828;
        }
        if (pt === 99.8) {
          cscrit = 9.550;
        }
        if (pt === 99.5) {
          cscrit = 7.879;
        }
        if (pt === 99) {
          cscrit = 6.635;
        }
        if (pt === 98) {
          cscrit = 5.412;
        }
        if (pt === 95) {
          cscrit = 3.841;
        }
        if (pt === 90) {
          cscrit = 2.706;
        }
        if (pt === 85) {
          cscrit = 2.072;
        }
        if (pt === 80) {
          cscrit = 1.642;
        }
        if (pt === 75) {
          cscrit = 1.323;
        }
        if (pt === 70) {
          cscrit = 1.074;
        }
        if (pt === 65) {
          cscrit = 0.873;
        }
        if (pt === 60) {
          cscrit = 0.708;
        }
        if (pt === 55) {
          cscrit = 0.571;
        }
        if (pt === 50) {
          cscrit = 0.455;
        }
        if (pt === 45) {
          cscrit = 0.357;
        }
        if (pt === 40) {
          cscrit = 0.275;
        }
        if (pt === 35) {
          cscrit = 0.206;
        }
        if (pt === 30) {
          cscrit = 0.148;
        }
        if (pt === 25) {
          cscrit = 0.102;
        }
        if (pt === 20) {
          cscrit = 0.064;
        }
        if (cscrit === 0) {
          error("The selected confidence interval is not available, choose other ranges");
          return false;
        }
        z = Math.sqrt(cscrit);
        np = 0;
        p = 0;
        p = median / 100;
        if (p === 0.5) {
          np = (n + 1) / 2;
        } else {
          np = Math.round(n * p);
        }
        ll = Math.round(n * p - z * (Math.sqrt(n * p * (1 - p))));
        if (ll <= 0) {
          ll = 0;
        }
        ul = Math.round(1 + n * p + z * (Math.sqrt(n * p * (1 - p))));
        if (ul <= 0) {
          ul = 0;
        }
        if (ul >= n) {
          ul = n;
        }
        resultModel = {
          model: model,
          fields: this.inputFields,
          n: n,
          median: median,
          pt: pt,
          confidenceIntervalCategory: pt,
          sampleSize: n,
          lowerLimit: ll,
          rank: np,
          upperLimit: ul
        };
        return callback(resultModel);
      },
      render: function(result, callback, error) {
        var el, grid, heading, inputs, key, value, _ref;
        el = $("<div style='text-align:center'></div>");
        heading = "<h3>Confidence Interval for " + result.model.median + "th percentile of sample size " + result.model.sampleSize + "</h3>";
        el.append(heading);
        grid = $("<div class='ui-grid-c' style='border: 1px solid lightgray; background: #ffffff;'></div>");
        grid.append("<div class='ui-block-a' style='background:lightgray'>Method</div>");
        grid.append("<div class='ui-block-b' style='background:lightgray'>Lower Limit</div>");
        grid.append("<div class='ui-block-c' style='background:lightgray'>Rank</div>");
        grid.append("<div class='ui-block-d' style='background:lightgray'>Upper Limit</div>");
        grid.append("<div class='ui-block-a'>Normal Approximation</div>");
        grid.append("<div class='ui-block-b'>" + result.lowerLimit + "</div>");
        grid.append("<div class='ui-block-c'>" + result.rank + "</div>");
        grid.append("<div class='ui-block-d'>" + result.upperLimit + "</div>");
        el.append(grid);
        el.append("<h4>Input Data</h4>");
        inputs = $("<div id='#inputs' data-role='collapsible' data-collapsed='true' style='background:#fcfcfc; padding:3px;border:1px solid darkgray;'></div>");
        _ref = result.model;
        for (key in _ref) {
          value = _ref[key];
          inputs.append("<div style='display:table-row'><span style='display:table-cell;text-align:right;'><b>" + result.fields[key].label + ":</b></span><span style='display:table-cell;'>" + value + "</span></div>");
        }
        el.append(inputs);
        return callback(el);
      }
    };
  });

  '\ntableGenerationFunc: function () {\n    if (currentObject.OutputCollector != null) {\n        with (currentObject.OutputCollector) {\n            newtable(6, 90);	 //6 columns and 90 pixels per column\n            title("<h3>" + CalcCIMedian.Title + "</h3>");\n            newrow("", "", "span2:c:bold:Input Data");\n            newrow();\n            newrow("", "color#66ffff:span2:r:Sample Size:", "color#ffff99:span1:r:" + n);\n            newrow("", "color#66ffff:span2:r:Desired percentile:", "color#ffff99:span1:r:" + median);\n            newrow("", "color#66ffff:span2:r:Confidence Interval (%):", "color#ffff99:span1:r:" + pt);\n            newrow();\n            line(6); 	//line with 6 columns size\n\n            //tableAsHTML(0);   //Reproduce the input table in the output *************************************;\n\n            newtable(6, 90);\n            title("<h4>Confidence Interval for " + currentObject.Data[1]["E1D0"] + "<SUP>th</SUP>" + " percentile of " + "sample size " + currentObject.Data[1]["E0D0"] + "</h4>");\n            newrow("span2:bold:c:Method:", "span1:bold:c:Lower Limit", "span1:bold:r:  Rank", "span2:c:bold:Upper Limit");\n            newrow("span2:c:Normal Approximation", "span1:c:" + fmtSigFig(ll, 6), "span1:r:" + fmtSigFig(np, 6), "span2:c:" + fmtSigFig(ul, 6)); //6 means 6 digits including decimals;\n\n            line(6);\n            endtable();\n';


  '\n//The text in the next variables will be inserted into the HTML document that comes up in response to the Exercise link\nCalcCIMedian.Demo = "For non-Normal distribution, the median of the sample or population is preferable to the mean as a measure of location (Rank). Medians are also appropriate in other situations-for example, when measurements are on an ordinal scale. In a dataset of 100 diabetic patients, let\'s assume the median systolic blood pressure is 146 mmHg. Using this module, let\'s calculate 95% confidence interval of median value in the sample." +\n        "<ul>" +\n        "<li>First, enter the sample size (eg. 100), median value (eg. 50), and 95% confidence interval (eg. 95) in respective cells in Open Epi Median program, and click on Calculate. </li>" +\n        "<li>In the new window screen, 95% confidence limits of Median position in the sample are seen as 40 - 61. This result is calculated from the normal approximation method of large sample size theory. </li>" +\n        "<li>Then, after arranging observations (here, the systolic blood pressure) in increasing order, read the corresponding values of systolic blood pressure at 40th and 61th position. They are 95% confidence interval of median systolic blood pressure of the sample. </li>" +\n        "</ul>";\n\nCalcCIMedian.Exercises = "currently not available";\n';


}).call(this);
