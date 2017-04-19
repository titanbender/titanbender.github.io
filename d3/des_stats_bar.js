// use <script src="https://d3js.org/d3.v4.js"></script> 

// Width and height of the canvas
var w = 800, h = 600;
var trans_dur = 500;
// Plotting margin
var margin = {top: 20, right: 20, bottom: 87, left: 60};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

// Set the ranges
var xScale = d3.scaleBand().rangeRound([10, width]).padding(0.05);
var yScale = d3.scaleLinear().range([height, 0]);

// Define the axis
var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);





//Create SVG element
var svg = d3.select("#area_intro") 
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",  "translate(" + margin.left + "," + margin.top + ")");
// tip
var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0])
        .html(function(d) { return "Frequency: " + d.value; });
svg.call(tip);  



// load inital NYC data
d3.json("data/bar_dict_NYC.json", function(error, data) {
             
    // scale the range of the data
    xScale.domain(data.map(function(d) { return d.key; }));
    yMax = d3.max(data, function(d) { return d.value; });
    yScale.domain([0, yMax]);

    //Create bars
     svg.selectAll("rect")
        .data(data) // prositution as initial
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.key); })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); })
        .style("fill", "teal")
        .style("hover", "black")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        ;

    // add axis
    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
    
    // y-axis
    svg.append("g").attr("class", "y axis").call(yAxis);

    // add title text   
    svg.append("text")
        .attr("class", "title")
        .attr("x", (width / 2))             
        .attr("y", 10 - (margin.top / 2))
        .text("NYC");
});


// toggle between boroughs function
function toggle_bars( key, file, title_b ) {
	// BRONX
	d3.select(key)
	    .on("click", function() {
	        //New values for dataset
	        d3.json(file, function(error, data) {
	        // scale the range of the data
	        yMax = d3.max(data, function(d) { return d.value; });
	        yScale.domain([0, yMax]);

	        //Create bars
	         svg.selectAll("rect")
	            .data(data) // prositution as initial
	            .transition() 
	            .delay(function(d, i) { return i * trans_dur/24; })
	            .duration(trans_dur) 
	            .attr("y", function(d) { return yScale(d.value); })
	            .attr("height", function(d) { return height - yScale(d.value); });

	        // Update title
	        svg.select("text.title").transition().duration(trans_dur).text(title_b);
	        //Update Y axis
	        svg.select(".y.axis").transition().duration(trans_dur).call(yAxis);
	        });
	    });
}

// BRONX
toggle_bars( key = "bar_BRONX", file = "data/bar_dict_BRONX.json", title_b = "BRONX")
toggle_bars( key = "bar_BROOKLYN", file = "data/bar_dict_BROOKLYN.json", title_b = "BROOKLYN")
toggle_bars( key = "bar_STATEN_ISLAND", file = "data/bar_dict_STATEN_ISLAND.json", title_b = "STATEN ISLAND")
toggle_bars( key = "bar_MANHATTAN", file = "data/bar_dict_MANHATTAN.json", title_b = "MANHATTAN")
toggle_bars( key = "bar_QUEENS", file = "data/bar_dict_QUEENS.json", title_b = "QUEENS")
toggle_bars( key = "bar_NYC", file = "data/bar_dict_NYC.json", title_b = "NYC")
