define ->	
	name:'ConfidenceInterval',
	group:'Continuous Variables',
	title: 'Confidence Interval',
	titleShort: 'Median / %ile CI',
	summary: 'Confidence Interval of median or other percentile for a sample size',
	description: "This module calculates confidence interval around a selected percentile for 
a sample size given. Entering sample size and desired percentile will calculate 
95% confidence interval as a default confidence limit. The user can change the 
confidence interval by typing in new value. Please note that the selected percentile 
should be within 1-100%",
	authors: [
		Statistics: 'Minn M. Soe and Kevin M. Sullivan (Emory University)',
		Interface: 'Andrew G. Dean (EpiInformatics.com), Roger A. Mir, and Joshua Gough (AgileFromTheGroundUp.com)'
	],
	inputFields: 
		sampleSize:
			label: 'Sample Size'
			jqmType: 'textinput'
			editorAttrs:
				value: '100'
		median:
			label: 'Desired Percentile'
			jqmType: 'textinput'
			editorAttrs:
				value: '50'
		confidenceLevel:
			label: 'Confidence Level (%)'
			jqmType: 'textinput'
			editorAttrs:
				value: '95'
	 
	calculate: (model, callback, error) ->
		n = parseFloat model.sampleSize
		if n <= 0
			error "Sample size must be > 0"
			return

		median = parseFloat model.median

		if median <= 0 or median > 100
			error "Percentile value must be within the limits of 1-100%"
			return

		cscrit = 0
		pt = 0
		z = 0
		pt = parseFloat model.confidenceLevel

		cscrit = 15.137 if pt is 99.99
		cscrit = 13.831 if pt is 99.98
		cscrit = 12.116 if pt is 99.95
		cscrit = 10.828 if pt is 99.9
		cscrit = 9.550  if pt is 99.8
		cscrit = 7.879  if pt is 99.5
		cscrit = 6.635  if pt is 99
		cscrit = 5.412  if pt is 98
		cscrit = 3.841  if pt is 95
		cscrit = 2.706  if pt is 90
		cscrit = 2.072  if pt is 85
		cscrit = 1.642  if pt is 80
		cscrit = 1.323  if pt is 75
		cscrit = 1.074  if pt is 70
		cscrit = 0.873  if pt is 65
		cscrit = 0.708  if pt is 60
		cscrit = 0.571  if pt is 55
		cscrit = 0.455  if pt is 50
		cscrit = 0.357  if pt is 45
		cscrit = 0.275  if pt is 40
		cscrit = 0.206  if pt is 35
		cscrit = 0.148  if pt is 30
		cscrit = 0.102  if pt is 25
		cscrit = 0.064 	if pt is 20
		
		if cscrit is 0 
			error "The selected confidence interval is not available, choose other ranges"
			return false
		
		z = Math.sqrt cscrit

		#rank calculation:
		np = 0
		p = 0
		p = median / 100
		if p is 0.5
			np = (n + 1) / 2
		else
			np = Math.round(n * p)

		#confidence limits and checking errors;
		ll = Math.round(n * p - z * (Math.sqrt(n * p * (1 - p))))
		ll = 0  if ll <= 0
		ul = Math.round(1 + n * p + z * (Math.sqrt(n * p * (1 - p))))
		ul = 0  if ul <= 0
		ul = n  if ul >= n

		resultModel = 
			model: model
			n: n
			median: median
			pt: pt
			confidenceIntervalCategory: pt
			sampleSize: n
			lowerLimit: ll
			rank: np
			upperLimit: ul

		callback resultModel

	render: (result, callback, error) ->
		el = $("<div></div>")
		heading = "<h3>Confidence Interval for #{result.model.median}th percentile of sample size #{result.model.sampleSize}</h3>"
		el.append(heading)
		grid = $("<div class='ui-grid-c' style='border: 1px solid lightgray;'></div>")
		grid.append("<div class='ui-block-a' style='background:lightgray'>Method</div>")
		grid.append("<div class='ui-block-b' style='background:lightgray'>Lower Limit</div>")
		grid.append("<div class='ui-block-c' style='background:lightgray'>Rank</div>")
		grid.append("<div class='ui-block-d' style='background:lightgray'>Upper Limit</div>")		
		grid.append("<div class='ui-block-a'>Normal Approximation</div>")
		grid.append("<div class='ui-block-b'>#{result.lowerLimit}</div>")
		grid.append("<div class='ui-block-c'>#{result.rank}</div>")
		grid.append("<div class='ui-block-d'>#{result.upperLimit}</div>")		
		el.append(grid)
		callback(el)

'''

        tableGenerationFunc: function () {
            if (currentObject.OutputCollector != null) {
                with (currentObject.OutputCollector) {
                    newtable(6, 90);	 //6 columns and 90 pixels per column
                    title("<h3>" + CalcCIMedian.Title + "</h3>");
                    newrow("", "", "span2:c:bold:Input Data");
                    newrow();
                    newrow("", "color#66ffff:span2:r:Sample Size:", "color#ffff99:span1:r:" + n);
                    newrow("", "color#66ffff:span2:r:Desired percentile:", "color#ffff99:span1:r:" + median);
                    newrow("", "color#66ffff:span2:r:Confidence Interval (%):", "color#ffff99:span1:r:" + pt);
                    newrow();
                    line(6); 	//line with 6 columns size

                    //tableAsHTML(0);   //Reproduce the input table in the output *************************************;

                    newtable(6, 90);
                    title("<h4>Confidence Interval for " + currentObject.Data[1]["E1D0"] + "<SUP>th</SUP>" + " percentile of " + "sample size " + currentObject.Data[1]["E0D0"] + "</h4>");
                    newrow("span2:bold:c:Method:", "span1:bold:c:Lower Limit", "span1:bold:r:  Rank", "span2:c:bold:Upper Limit");
                    newrow("span2:c:Normal Approximation", "span1:c:" + fmtSigFig(ll, 6), "span1:r:" + fmtSigFig(np, 6), "span2:c:" + fmtSigFig(ul, 6)); //6 means 6 digits including decimals;

                    line(6);
                    endtable();

'''

'''

//The text in the next variables will be inserted into the HTML document that comes up in response to the Exercise link
CalcCIMedian.Demo = "For non-Normal distribution, the median of the sample or population is preferable to the mean as a measure of location (Rank). Medians are also appropriate in other situations-for example, when measurements are on an ordinal scale. In a dataset of 100 diabetic patients, let's assume the median systolic blood pressure is 146 mmHg. Using this module, let's calculate 95% confidence interval of median value in the sample." +
        "<ul>" +
        "<li>First, enter the sample size (eg. 100), median value (eg. 50), and 95% confidence interval (eg. 95) in respective cells in Open Epi Median program, and click on Calculate. </li>" +
        "<li>In the new window screen, 95% confidence limits of Median position in the sample are seen as 40 - 61. This result is calculated from the normal approximation method of large sample size theory. </li>" +
        "<li>Then, after arranging observations (here, the systolic blood pressure) in increasing order, read the corresponding values of systolic blood pressure at 40th and 61th position. They are 95% confidence interval of median systolic blood pressure of the sample. </li>" +
        "</ul>";

CalcCIMedian.Exercises = "currently not available";

'''