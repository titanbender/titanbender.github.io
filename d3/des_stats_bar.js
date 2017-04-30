// Width and height of the canvas
var w_bar = 1000, h_bar = 600, trans_dur = 500;
// Plotting margin
var margin_bar = {top: 20, right: 20, bottom: 87, left: 60};
var width_bar = w_bar - margin_bar.left - margin_bar.right;
var height_bar = h_bar - margin_bar.top - margin_bar.bottom;

// Set the ranges
var xScale_bar = d3.scaleBand().rangeRound([10, width_bar]).padding(0.05);
var yScale_bar = d3.scaleLinear().range([height_bar, 0]);

// Define the axis
var xAxis_bar = d3.axisBottom(xScale_bar);

var yAxis_bar = d3.axisLeft(yScale_bar);





//Create SVG element
var svg_bar = d3.select("#area_bar_stats") 
            .append("svg")
            .attr("width", width_bar + margin_bar.left + margin_bar.right)
            .attr("height", height_bar + margin_bar.top + margin_bar.bottom)
            .append("g")
            .attr("transform",  "translate(" + margin_bar.left + "," + margin_bar.top + ")");
// tip
var tip_bar = d3.tip().attr('class', 'd3-tip').offset([-10, 0])
        .html(function(d) { return "Frequency: " + d.value; });
svg_bar.call(tip_bar);  



// load inital NYC data
d3.json("data/bar_dict_NYC.json", function(error, data) {
             
    // scale the range of the data
    xScale_bar.domain(data.map(function(d) { return d.key; }));
    yMax_bar = d3.max(data, function(d) { return d.value; });
    yScale_bar.domain([0, yMax_bar]);

    //Create bars
     svg_bar.selectAll("rect")
        .data(data) // prositution as initial
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale_bar(d.key); })
        .attr("width", xScale_bar.bandwidth())
        .attr("y", function(d) { return yScale_bar(d.value); })
        .attr("height", function(d) { return height_bar - yScale_bar(d.value); })
        .style("fill", "teal")
        .style("hover", "black")
        .on('mouseover', tip_bar.show)
        .on('mouseout', tip_bar.hide)
        ;

    // add axis
    // x-axis
    svg_bar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height_bar + ")")
        .call(xAxis_bar)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
    
    // y-axis
    svg_bar.append("g").attr("class", "y axis").call(yAxis_bar);

    // add title text   
    svg_bar.append("text")
        .attr("class", "title")
        .attr("x", (width_bar / 2))             
        .attr("y", 10 - (margin_bar.top / 2))
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
	        yMax_bar = d3.max(data, function(d) { return d.value; });
	        yScale_bar.domain([0, yMax_bar]);

	        //Create bars
	         svg_bar.selectAll("rect")
	            .data(data) // prositution as initial
	            .transition() 
	            .delay(function(d, i) { return i * trans_dur/24; })
	            .duration(trans_dur) 
	            .attr("y", function(d) { return yScale_bar(d.value); })
	            .attr("height", function(d) { return height_bar - yScale_bar(d.value); });

	        // Update title
	        svg_bar.select("text.title").transition().duration(trans_dur).text(title_b);
	        //Update Y axis
	        svg_bar.select(".y.axis").transition().duration(trans_dur).call(yAxis_bar);
	        });
	    });
}

// Aæll
toggle_bars( key = "bar_BRONX", file = "data/bar_dict_BRONX.json", title_b = "BRONX")
toggle_bars( key = "bar_BROOKLYN", file = "data/bar_dict_BROOKLYN.json", title_b = "BROOKLYN")
toggle_bars( key = "bar_STATEN_ISLAND", file = "data/bar_dict_STATEN_ISLAND.json", title_b = "STATEN ISLAND")
toggle_bars( key = "bar_MANHATTAN", file = "data/bar_dict_MANHATTAN.json", title_b = "MANHATTAN")
toggle_bars( key = "bar_QUEENS", file = "data/bar_dict_QUEENS.json", title_b = "QUEENS")
toggle_bars( key = "bar_NYC", file = "data/bar_dict_NYC.json", title_b = "NYC")

// Injured
toggle_bars( key = "bar_BRONX_inj", file = "data/bar_dict_BRONX_inj.json", title_b = "BRONX Injured")
toggle_bars( key = "bar_BROOKLYN_inj", file = "data/bar_dict_BROOKLYN_inj.json", title_b = "BROOKLYN Injured")
toggle_bars( key = "bar_STATEN_ISLAND_inj", file = "data/bar_dict_STATEN_ISLAND_inj.json", title_b = "STATEN ISLAND Injured")
toggle_bars( key = "bar_MANHATTAN_inj", file = "data/bar_dict_MANHATTAN_inj.json", title_b = "MANHATTAN Injured")
toggle_bars( key = "bar_QUEENS_inj", file = "data/bar_dict_QUEENS_inj.json", title_b = "QUEENS Injured")
toggle_bars( key = "bar_NYC_inj", file = "data/bar_dict_NYC_inj.json", title_b = "NYC Injured")

// Killed
toggle_bars( key = "bar_BRONX_kill", file = "data/bar_dict_BRONX_kill.json", title_b = "BRONX Killed")
toggle_bars( key = "bar_BROOKLYN_kill", file = "data/bar_dict_BROOKLYN_kill.json", title_b = "BROOKLYN Killed")
toggle_bars( key = "bar_STATEN_ISLAND_kill", file = "data/bar_dict_STATEN_ISLAND_kill.json", title_b = "STATEN ISLAND Killed")
toggle_bars( key = "bar_MANHATTAN_kill", file = "data/bar_dict_MANHATTAN_kill.json", title_b = "MANHATTAN Killed")
toggle_bars( key = "bar_QUEENS_kill", file = "data/bar_dict_QUEENS_kill.json", title_b = "QUEENS Killed")
toggle_bars( key = "bar_NYC_kill", file = "data/bar_dict_NYC_kill.json", title_b = "NYC Killed")
