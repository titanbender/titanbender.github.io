var widthT=800, heightT=500, trans_dur = 500;

var margin = {top: 20, right: 20, bottom: 110, left: 40},
    margin2 = {top: 430, right: 20, bottom: 30, left: 40},
    width = widthT - margin.left - margin.right,
    height = heightT - margin.top - margin.bottom,
    height2 = heightT - margin2.top - margin2.bottom,
    
    svg = d3.select("#area_intro") 
            .append("svg")
            .attr("width", widthT + margin.left + margin.right)
            .attr("height", heightT + margin.top + margin.bottom);
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var parseTime = d3.timeParse("%d-%b-%y");
var parseDate = d3.timeParse("%m/%d/%Y");
var formatDate = d3.timeFormat("%Y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// insert data

d3.json("data/ts/ts_NYC.json", function(error, data) {
  data.forEach(function(d) { d.date = parseDate(d.date); });
  if (error) throw error;
  console.log(data)
  var line1 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.tot); });

  var line2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.inj); });

  var line3 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.kill); });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.tot; }));

  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

  g.append("path")
      .attr("class", "ts line tot")
      .datum(data)
      .attr("stroke", "none")
      .attr("d", line1);


  g.append("path")
      .attr("class", "ts line inj")
      .datum(data)
      .attr("stroke", "green")
      .attr("d", line2);

  g.append("path")
      .attr("class", "ts line kill")
      .datum(data)
      .attr("stroke", "red")
      .attr("d", line3);

  // add title text   
  g.append("text")
      .attr("class", "title")
      .attr("x", (width / 2))             
      .attr("y", 10 - (margin.top / 2))
      .text("NYC");
});

 
// toggle function
function toggle_ts( key, file, title_b ) {
  d3.select(key)
    .on("click", function() {
      //New values for dataset
      d3.json(file, function(error, data) {
        data.forEach(function(d) { d.date = parseDate(d.date); });
       
      if (error) throw error;
      // scale the range of the data
      var line1 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.tot); });

      var line2 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.inj); });

      var line3 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.kill); });

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.tot; }));

      //Update bars
      g.selectAll("path.ts.line.tot")
        .datum(data) // prositution as initial
        // .transition() 
        // .delay(function(d, i) { return i * trans_dur/24; })
        // .duration(trans_dur) 
        .attr("d", line1);

      g.selectAll("path.ts.line.inj")
        .datum(data) // prositution as initial
        // .transition() 
        // .delay(function(d, i) { return i * trans_dur/24; })
        // .duration(trans_dur) 
        .attr("d", line2);

      g.selectAll("path.ts.line.kill")
        .datum(data) // prositution as initial
        // .transition() 
        // .delay(function(d, i) { return i * trans_dur/24; })
        // .duration(trans_dur) 
        .attr("d", line3);

        // Update title
        g.select("text.title").transition().duration(trans_dur).text(title_b);
        //Update Y axis
        g.select(".y.axis").transition().duration(trans_dur).call(d3.axisLeft(y));
    });
  });
}

// TOT
toggle_ts( key = "tot_ts_BRONX", file = "data/ts/ts_tot_BRONX.json", title_b = "Total BRONX")
toggle_ts( key = "tot_ts_BROOKLYN", file = "data/ts/ts_tot_BROOKLYN.json", title_b = "Total BROOKLYN")
toggle_ts( key = "tot_ts_STATEN_ISLAND", file = "data/ts/ts_tot_STATEN ISLAND.json", title_b = "Total STATEN ISLAND")
toggle_ts( key = "tot_ts_MANHATTAN", file = "data/ts/ts_tot_MANHATTAN.json", title_b = "Total MANHATTAN")
toggle_ts( key = "tot_ts_QUEENS", file = "data/ts/ts_tot_QUEENS.json", title_b = "Total QUEENS")

// PED
toggle_ts( key = "ped_ts_BRONX", file = "data/ts/ts_ped_BRONX.json", title_b = "Pedistriants BRONX")
toggle_ts( key = "ped_ts_BROOKLYN", file = "data/ts/ts_ped_BROOKLYN.json", title_b = "Pedistriants BROOKLYN")
toggle_ts( key = "ped_ts_STATEN_ISLAND", file = "data/ts/ts_ped_STATEN ISLAND.json", title_b = "Pedistriants STATEN ISLAND")
toggle_ts( key = "ped_ts_MANHATTAN", file = "data/ts/ts_ped_MANHATTAN.json", title_b = "Pedistriants MANHATTAN")
toggle_ts( key = "ped_ts_QUEENS", file = "data/ts/ts_ped_QUEENS.json", title_b = "Pedistriants QUEENS")

// CYC
toggle_ts( key = "cyc_ts_BRONX", file = "data/ts/ts_cyc_BRONX.json", title_b = "Cyclist BRONX")
toggle_ts( key = "cyc_ts_BROOKLYN", file = "data/ts/ts_cyc_BROOKLYN.json", title_b = "Cyclist BROOKLYN")
toggle_ts( key = "cyc_ts_STATEN_ISLAND", file = "data/ts/ts_cyc_STATEN ISLAND.json", title_b = "Cyclist STATEN ISLAND")
toggle_ts( key = "cyc_ts_MANHATTAN", file = "data/ts/ts_cyc_MANHATTAN.json", title_b = "Cyclist MANHATTAN")
toggle_ts( key = "cyc_ts_QUEENS", file = "data/ts/ts_cyc_QUEENS.json", title_b = "Cyclist QUEENS")

// MOT
toggle_ts( key = "mot_ts_BRONX", file = "data/ts/ts_mot_BRONX.json", title_b = "Motorist BRONX")
toggle_ts( key = "mot_ts_BROOKLYN", file = "data/ts/ts_mot_BROOKLYN.json", title_b = "Motorist BROOKLYN")
toggle_ts( key = "mot_ts_STATEN_ISLAND", file = "data/ts/ts_mot_STATEN ISLAND.json", title_b = "Motorist STATEN ISLAND")
toggle_ts( key = "mot_ts_MANHATTAN", file = "data/ts/ts_mot_MANHATTAN.json", title_b = "Motorist MANHATTAN")
toggle_ts( key = "mot_ts_QUEENS", file = "data/ts/ts_mot_QUEENS.json", title_b = "Motorist QUEENS")

// NYC
toggle_ts( key = "ts_NYC", file = "data/ts/ts_NYC.json", title_b = "NYC")

