var widthT=800, heightT=500, trans_dur = 500;

var margin_ts = {top: 20, right: 20, bottom: 0, left: 40},
    width_ts = widthT - margin_ts.left - margin_ts.right,
    height_ts = heightT - margin_ts.top - margin_ts.bottom;


var svg = d3.select("#area_TimeSeries") 
            .append("svg")
            .attr("width", widthT + margin_ts.left + margin_ts.right)
            .attr("height", heightT + margin_ts.top + margin_ts.bottom);

var g = svg.append("g").attr("transform", "translate(" + margin_ts.left + "," + margin_ts.top + ")");


var parseDate = d3.timeParse("%m/%d/%Y"),
    formatDate = d3.timeFormat("%Y"),
    formatDate_tip = d3.timeFormat("%m/%d/%Y");

var x = d3.scaleTime()
    .rangeRound([0, width_ts]);

var y = d3.scaleLinear()
    .rangeRound([height_ts, 0]);


// legends
// cat = [{name:"Kill", col:"red"}, {name:"Injured", col:"green"}, {name:"Total", col:"stealblue"}]
cat = [{name:"Killed", col:"red"}, {name:"Injured", col:"green"}]

var legend = g.append("g")
  .attr("class", "x axis")
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(cat)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", width_ts - 19)
  .attr("width", 10)
  .attr("height", 1)
  .style('fill', function(d) { return d.col; })
  .style('opacity', 0.5);
  
legend.append("text")
  .attr("x", width_ts - 24)
  .attr("y", 4)
  .text(function(d) { return d.name; })

// tip tool
var tip_tot = d3.tip()
  .attr('class', 'd3-tip')
  .attr("transform", "translate(" + x(function(d) { return x(d.date); }) + "," + y(function(d) { return y(d.tot); }) + ")")
  .offset([-10, 0])
  .html(function(d) { return "Date: " + formatDate_tip(d.date) + "<br/>" +  "Injured: " + d.inj + "<br/>"  + "Killed: " + d.kill ; });

var tip_inj = d3.tip()
  .attr('class', 'd3-tip')
  .attr("transform", "translate(" + x(function(d) { return x(d.date); }) + "," + y(function(d) { return y(d.inj); }) + ")")
  .offset([-10, 0])
  .html(function(d) { return "Date: " + formatDate_tip(d.date) + "<br/>" +  "Injured: " + d.inj + "<br/>"  + "Killed: " + d.kill ; });

var tip_kill = d3.tip()
  .attr('class', 'd3-tip')
  .attr("transform", "translate(" + x(function(d) { return x(d.date); }) + "," + y(function(d) { return y(d.kill); }) + ")")
  .offset([-10, 0])
  .html(function(d) { return "Date: " + formatDate_tip(d.date) + "<br/>" +  "Injured: " + d.inj + "<br/>"  + "Killed: " + d.kill ; });

g.call(tip_inj);  
g.call(tip_kill);
g.call(tip_tot);   


// insert data
// below before "data/ts/ts_NYC.json"

d3.json("https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_NYC.json", function(error, data) {
  data.forEach(function(d) { d.date = parseDate(d.date); });
  if (error) throw error;
  
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

  // 
  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_ts + ")")
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
    .attr("stroke", "#155799")
    .attr("d", line2);

  g.append("path")
    .attr("class", "ts line kill")
    .datum(data)
    .attr("stroke", "red")
    .attr("d", line3);

  // Add the scatterplot for tip-tool
  g.selectAll("dot")  
    .data(data)     
    .enter().append("circle")
    .attr("class", "tip inj")
    .style("fill","none")
    .style("stroke","none")
    .style("pointer-events","all")               
    .attr("r", 8)   
    .attr("cx", function(d) { return x(d.date); })     
    .attr("cy", function(d) { return y(d.inj); })   
    .on('mouseover', tip_inj.show)
    .on('mouseout', tip_inj.hide);

  g.selectAll("dot")  
    .data(data)     
    .enter().append("circle")
    .attr("class", "tip kill")
    .style("fill","none")
    .style("stroke","none")
    .style("pointer-events","all")               
    .attr("r", 8)   
    .attr("cx", function(d) { return x(d.date); })     
    .attr("cy", function(d) { return y(d.kill); })   
    .on('mouseover', tip_kill.show)
    .on('mouseout', tip_kill.hide);

  g.selectAll("dot")  
    .data(data)     
    .enter().append("circle")
    .attr("class", "tip tot")
    .style("fill","none")
    .style("stroke","none")
    .style("pointer-events","all")               
    .attr("r", 8)   
    .attr("cx", function(d) { return x(d.date); })     
    .attr("cy", function(d) { return y(d.tot); })   
    .on('mouseover', tip_tot.show)
    .on('mouseout', tip_tot.hide);

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
        .datum(data).transition() .duration(trans_dur) .attr("d", line1);

      g.selectAll("path.ts.line.inj")
        .datum(data).transition() .duration(trans_dur) .attr("d", line2);

      g.selectAll("path.ts.line.kill")
        .datum(data).transition() .duration(trans_dur) .attr("d", line3);

      // update tips
      g.selectAll("circle.tip.kill")
        .data(data).transition().duration(trans_dur)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.kill); });

      g.selectAll("circle.tip.inj")
        .data(data).transition().duration(trans_dur)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.inj); });

      g.selectAll("circle.tip.tot")
        .data(data).transition().duration(trans_dur)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.tot); });

      // Update title
      g.select("text.title").transition().duration(trans_dur).text(title_b);
      //Update Y axis
      g.select(".y.axis").transition().duration(trans_dur).call(d3.axisLeft(y));
    });
  });
}

// TOT
toggle_ts( key = "tot_ts_BRONX", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_tot_BRONX.json", title_b = "BRONX: Total people involved in trafic accidents")
toggle_ts( key = "tot_ts_BROOKLYN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_tot_BROOKLYN.json", title_b = "BROOKLYN: Total people involved in trafic accidents")
toggle_ts( key = "tot_ts_STATEN_ISLAND", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_tot_STATEN%20ISLAND.json", title_b = "STATEN ISLAND: Total people involved in trafic accidents")
toggle_ts( key = "tot_ts_MANHATTAN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_tot_MANHATTAN.json", title_b = "MANHATTAN: Total people involved in trafic accidents")
toggle_ts( key = "tot_ts_QUEENS", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_tot_QUEENS.json", title_b = "QUEENS: Total people involved in trafic accidents ")

// PED
toggle_ts( key = "ped_ts_BRONX", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_ped_BRONX.json", title_b = "BRONX: Pedestrians involved in trafic accidents")
toggle_ts( key = "ped_ts_BROOKLYN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_ped_BROOKLYN.json", title_b = "BROOKLYN: Pedestrians involved in trafic accidents")
toggle_ts( key = "ped_ts_STATEN_ISLAND", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_ped_STATEN%20ISLAND.json", title_b = "STATEN ISLAND: Pedestrians involved in trafic accidents")
toggle_ts( key = "ped_ts_MANHATTAN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_ped_MANHATTAN.json", title_b = "MANHATTAN: Pedestrians involved in trafic accidents")
toggle_ts( key = "ped_ts_QUEENS", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_ped_QUEENS.json", title_b = "QUEENS: Pedestrians involved in trafic accidents")

// CYC
toggle_ts( key = "cyc_ts_BRONX", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_cyc_BRONX.json", title_b = "BRONX: Cyclists involved in trafic accidents")
toggle_ts( key = "cyc_ts_BROOKLYN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_cyc_BROOKLYN.json", title_b = "BROOKLYN: Cyclists involved in trafic accidents")
toggle_ts( key = "cyc_ts_STATEN_ISLAND", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_cyc_STATEN%20ISLAND.json", title_b = "STATEN ISLAND: Cyclists involved in accidents")
toggle_ts( key = "cyc_ts_MANHATTAN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_cyc_MANHATTAN.json", title_b = "MANHATTAN: Cyclists involved in accidents")
toggle_ts( key = "cyc_ts_QUEENS", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_cyc_QUEENS.json", title_b = "QUEENS:  Cyclists involved in accidents")

// MOT
toggle_ts( key = "mot_ts_BRONX", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_mot_BRONX.json", title_b = "BRONX: Motorists involved in trafic accidents")
toggle_ts( key = "mot_ts_BROOKLYN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_mot_BROOKLYN.json", title_b = "BROOKLYN: Motorists involved in trafic accidents")
toggle_ts( key = "mot_ts_STATEN_ISLAND", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_mot_STATEN%20ISLAND.json", title_b = "STATEN ISLAND: Motorists involved in trafic accidents")
toggle_ts( key = "mot_ts_MANHATTAN", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_mot_MANHATTAN.json", title_b = "MANHATTAN: Motorists involved in trafic accidents")
toggle_ts( key = "mot_ts_QUEENS", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_mot_QUEENS.json", title_b = "QUEENS: Motorists involved in trafic accidents")

// NYC
toggle_ts( key = "ts_NYC", https = "https://raw.githubusercontent.com/titanbender/titanbender.github.io/master/data/ts/ts_NYC.json", title_b = "NYC: Total people involved in trafic accidents")

