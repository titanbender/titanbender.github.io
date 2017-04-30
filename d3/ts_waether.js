var widthT_W_cor=1000, heightT_W_cor=500, trans_dur = 500;

var margin_W_cor = {top: 20, right: 20, bottom: 110, left: 40},
    width_W_cor = widthT_W_cor - margin_W_cor.left - margin_W_cor.right,
    height_W_cor = heightT_W_cor - margin_W_cor.top - margin_W_cor.bottom;


var svg_W_cor= d3.select("#area_W_cor") 
            .append("svg")
            .attr("width", widthT + margin_W_cor.left + margin_W_cor.right)
            .attr("height", heightT + margin_W_cor.top + margin_W_cor.bottom);

var g_W_cor = svg_W_cor.append("g").attr("transform", "translate(" + margin_W_cor.left + "," + margin_W_cor.top + ")");


var parseDate_W_cor = d3.timeParse("%m/%d/%Y"),
    formatDate_W_cor = d3.timeFormat("%Y"),
    formatDate_tip_W_cor = d3.timeFormat("%m/%d/%Y");

var x_W_cor = d3.scaleTime()
    .rangeRound([0, width_W_cor]);

var y_W_cor = d3.scaleLinear()
    .rangeRound([height_W_cor, 0]);


// legends
// cat = [{name:"Kill", col:"red"}, {name:"Injured", col:"green"}, {name:"Total", col:"stealblue"}]
cat_W_cor = [{name:"Killed", col:"red"}, {name:"Injured", col:"green"}]

var legend_W_cor = g.append("g")
  .attr("class", "x axis")
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(cat)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend_W_cor.append("rect")
  .attr("x", width_W_cor - 19)
  .attr("width", 10)
  .attr("height", 1)
  .style('fill', function(d) { return d.col; })
  .style('opacity', 0.5);
  
legend_W_cor.append("text")
  .attr("x", width_W_cor - 24)
  .attr("y", 4)
  .text(function(d) { return d.name; })

// tip tool
var tip_W_cor = d3.tip()
  .attr('class', 'd3-tip')
  .attr("transform", "translate(" + x(function(d) { return x(d.date); }) + "," + y(function(d) { return y(d.tot); }) + ")")
  .offset([-10, 0])
  .html(function(d) { return "Date: " + formatDate_tip_W_cor(d.date) + "<br/>" +  "Injured: " + d.inj + "<br/>"  + "Killed: " + d.kill ; });

g_W_cor.call(tip_W_cor);  
 


// insert data

d3.json("data/ts/ts_NYC.json", function(error, data) {
  data.forEach(function(d) { d.date = parseDate_W_cor(d.date); });
  if (error) throw error;
  
  var line1_W_cor = d3.line()
    .x(function(d) { return x_W_cor(d.date); })
    .y(function(d) { return y_W_cor(d.tot); });

  var line2_W_cor = d3.line()
    .x(function(d) { return x_W_cor(d.date); })
    .y(function(d) { return y_W_cor(d.inj); });

  var line3_W_cor = d3.line()
    .x(function(d) { return x_W_cor(d.date); })
    .y(function(d) { return y_W_cor(d.kill); });

  x_W_cor.domain(d3.extent(data, function(d) { return d.date; }));
  y_W_cor.domain(d3.extent(data, function(d) { return d.tot; }));

  // 
  g_W_cor.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_W_cor + ")")
      .call(d3.axisBottom(x_W_cor));

  g_W_cor.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y_W_cor));

  g_W_cor.append("path")
    .attr("class", "ts line tot")
    .datum(data)
    .attr("stroke", "none")
    .attr("d", line1_W_cor);

  g_W_cor.append("path")
    .attr("class", "ts line inj")
    .datum(data)
    .attr("stroke", "green")
    .attr("d", line2_W_cor);

  g_W_cor.append("path")
    .attr("class", "ts line kill")
    .datum(data)
    .attr("stroke", "red")
    .attr("d", line3_W_cor);

  // Add the scatterplot for tip-tool
  g_W_cor.selectAll("dot")  
    .data(data)     
    .enter().append("circle")
    .attr("class", "tip inj")
    .style("fill","none")
    .style("stroke","none")
    .style("pointer-events","all")               
    .attr("r", 8)   
    .attr("cx", function(d) { return x(d.date); })     
    .attr("cy", function(d) { return y(d.inj); })   
    .on('mouseover', tip_W_cor.show)
    .on('mouseout', tip_W_cor.hide);

  // g.selectAll("dot")  
  //   .data(data)     
  //   .enter().append("circle")
  //   .attr("class", "tip kill")
  //   .style("fill","none")
  //   .style("stroke","none")
  //   .style("pointer-events","all")               
  //   .attr("r", 8)   
  //   .attr("cx", function(d) { return x(d.date); })     
  //   .attr("cy", function(d) { return y(d.kill); })   
  //   .on('mouseover', tip_kill.show)
  //   .on('mouseout', tip_kill.hide);

  // g.selectAll("dot")  
  //   .data(data)     
  //   .enter().append("circle")
  //   .attr("class", "tip tot")
  //   .style("fill","none")
  //   .style("stroke","none")
  //   .style("pointer-events","all")               
  //   .attr("r", 8)   
  //   .attr("cx", function(d) { return x(d.date); })     
  //   .attr("cy", function(d) { return y(d.tot); })   
  //   .on('mouseover', tip_tot.show)
  //   .on('mouseout', tip_tot.hide);

  // add title text   
  g_W_cor.append("text")
    .attr("class", "title")
    .attr("x", (width_W_cor / 2))             
    .attr("y", 10 - (margin_W_cor.top / 2))
    .text("NYC");
});

 
// toggle function
function toggle_W_cor( key, file, title_b ) {
  d3.select(key)
    .on("click", function() {
      //New values for dataset
      d3.json(file, function(error, data) {
        data.forEach(function(d) { d.date = parseDate(d.date); });
       
      if (error) throw error;
      // scale the range of the data
      var line1_W_cor = d3.line()
        .x(function(d) { return x_W_cor(d.date); })
        .y(function(d) { return y_W_cor(d.tot); });

      var line2_W_cor = d3.line()
        .x(function(d) { return x_W_cor(d.date); })
        .y(function(d) { return y_W_cor(d.inj); });

      var line3_W_cor = d3.line()
        .x(function(d) { return x_W_cor(d.date); })
        .y(function(d) { return y_W_cor(d.kill); });

      x_W_cor.domain(d3.extent(data, function(d) { return d.date; }));
      y_W_cor.domain(d3.extent(data, function(d) { return d.tot; }));

      //Update bars
      g_W_cor.selectAll("path.ts.line.tot")
        .datum(data).transition() .duration(trans_dur) .attr("d", line1_W_cor);

      g_W_cor.selectAll("path.ts.line.inj")
        .datum(data).transition() .duration(trans_dur) .attr("d", line2_W_cor);

      g_W_cor.selectAll("path.ts.line.kill")
        .datum(data).transition() .duration(trans_dur) .attr("d", line3_W_cor);

      // update tips
      g_W_cor.selectAll("circle.tip.kill")
        .data(data).transition().duration(trans_dur)
        .attr("cx", function(d) { return x_W_cor(d.date); })
        .attr("cy", function(d) { return y_W_cor(d.kill); });

      // g_W_cor.selectAll("circle.tip.inj")
      //   .data(data).transition().duration(trans_dur)
      //   .attr("cx", function(d) { return x(d.date); })
      //   .attr("cy", function(d) { return y(d.inj); });

      // g_W_cor.selectAll("circle.tip.tot")
      //   .data(data).transition().duration(trans_dur)
      //   .attr("cx", function(d) { return x(d.date); })
      //   .attr("cy", function(d) { return y(d.tot); });

      // Update title
      g_W_cor.select("text.title").transition().duration(trans_dur).text(title_b);
      //Update Y axis
      g_W_cor.select(".y.axis").transition().duration(trans_dur).call(d3.axisLeft(y_W_cor));
    });
  });
}

// TOT
toggle_W_cor( key = "tot_W_cor_BRONX", file = "data/ts/ts_tot_BRONX.json", title_b = "Total BRONX")
toggle_W_cor( key = "tot_W_cor_BROOKLYN", file = "data/ts/ts_tot_BROOKLYN.json", title_b = "Total BROOKLYN")
toggle_W_cor( key = "tot_W_cor_STATEN_ISLAND", file = "data/ts/ts_tot_STATEN ISLAND.json", title_b = "Total STATEN ISLAND")
toggle_W_cor( key = "tot_W_cor_MANHATTAN", file = "data/ts/ts_tot_MANHATTAN.json", title_b = "Total MANHATTAN")
toggle_W_cor( key = "tot_W_cor_QUEENS", file = "data/ts/ts_tot_QUEENS.json", title_b = "Total QUEENS")

// // PED
// toggle_W_cor( key = "ped_W_cor_BRONX", file = "data/ts/ts_ped_BRONX.json", title_b = "Pedistriants BRONX")
// toggle_W_cor( key = "ped_W_cor_BROOKLYN", file = "data/ts/ts_ped_BROOKLYN.json", title_b = "Pedistriants BROOKLYN")
// toggle_W_cor( key = "ped_W_cor_STATEN_ISLAND", file = "data/ts/ts_ped_STATEN ISLAND.json", title_b = "Pedistriants STATEN ISLAND")
// toggle_W_cor( key = "ped_W_cor_MANHATTAN", file = "data/ts/ts_ped_MANHATTAN.json", title_b = "Pedistriants MANHATTAN")
// toggle_W_cor( key = "ped_W_cor_QUEENS", file = "data/ts/ts_ped_QUEENS.json", title_b = "Pedistriants QUEENS")

// // CYC
// toggle_W_cor( key = "cyc_W_cor_BRONX", file = "data/ts/ts_cyc_BRONX.json", title_b = "Cyclist BRONX")
// toggle_W_cor( key = "cyc_W_cor_BROOKLYN", file = "data/ts/ts_cyc_BROOKLYN.json", title_b = "Cyclist BROOKLYN")
// toggle_W_cor( key = "cyc_W_cor_STATEN_ISLAND", file = "data/ts/ts_cyc_STATEN ISLAND.json", title_b = "Cyclist STATEN ISLAND")
// toggle_W_cor( key = "cyc_W_cor_MANHATTAN", file = "data/ts/ts_cyc_MANHATTAN.json", title_b = "Cyclist MANHATTAN")
// toggle_W_cor( key = "cyc_W_cor_QUEENS", file = "data/ts/ts_cyc_QUEENS.json", title_b = "Cyclist QUEENS")

// // MOT
// toggle_W_cor( key = "mot_W_cor_BRONX", file = "data/ts/ts_mot_BRONX.json", title_b = "Motorist BRONX")
// toggle_W_cor( key = "mot_W_cor_BROOKLYN", file = "data/ts/ts_mot_BROOKLYN.json", title_b = "Motorist BROOKLYN")
// toggle_W_cor( key = "mot_W_cor_STATEN_ISLAND", file = "data/ts/ts_mot_STATEN ISLAND.json", title_b = "Motorist STATEN ISLAND")
// toggle_W_cor( key = "mot_W_cor_MANHATTAN", file = "data/ts/ts_mot_MANHATTAN.json", title_b = "Motorist MANHATTAN")
// toggle_W_cor( key = "mot_W_cor_QUEENS", file = "data/ts/ts_mot_QUEENS.json", title_b = "Motorist QUEENS")

// NYC
toggle_W_cor( key = "ts_NYC", file = "data/ts/ts_NYC.json", title_b = "NYC")

