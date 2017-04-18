var width = 800, height = 600, centered;

var projection = d3.geo.mercator()
                    .scale(55000)
                    .translate([width / 2, height / 2]);

var svg = d3.select("#area_intro") // todo change
            .append("svg")
            .attr("width", width)
            .attr("height", height);

d3.json("data/nyc.geojson", function(nyc_map) {
    // after loading geojson, use d3.geo.centroid to find out 
    // where you need to center your map
    var center = d3.geo.centroid(nyc_map);
    projection.center(center);

    // now you can create new path function with 
    // correctly centered projection
    var path = d3.geo.path().projection(projection);

    var g = svg.append("g");
    // and finally draw the actual polygons
    svg.selectAll("g")
        .attr("id", "boroughs")
        .selectAll(".state")
        .data(nyc_map.features)
        .enter()
        .append("path")
        .attr("class", function(d) { return d.properties.name; })
        .attr("d", path)
        .style("fill","white")
        .attr("stroke-width", 0.25)
        .style("stroke","black")
        // .on("click", clicked);
        ;

    d3.json("data/knn_json.json", function(data) {
        
        console.log(data);
        svg.selectAll("g")
            .data(data) // prositution as initial
            .enter()
            .append("circle")
            .attr("class", "knn_circles")
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            //.attr("r", function (d) {return d.r * 0.5 ;})
            // .attr("r", 0.5)
            .attr("r", 2.5)
            // if fatal accident color red
            .style("fill", function(d) { if (d.class == 1) {return 'rgba(255,0,0, 0.5)'} else { return 'rgba(0,0,255,0.5)' };})
            // .style("fill", function(d,i) { if (d.class(i) = 1) {return 'rgba(255,0,0, 1)'} else { return 'rgba(0,255,0, 0.25)' };})

            //.attr("r", function (d) {return d.r * 0.5 ;})
            //.style("stroke", "black")
            //.style("stroke-width", 0.0125)
            // .on("click", clicked)
            ;


        // title text   
        svg.append("text")
            .attr("class", "title")
            .attr("x", projection([-74.005502, 40.819729])[0])             
            .attr("y", projection([-74.005502, 40.819729])[1])             
            // .attr("text-anchor", "middle")  
            // .style("font-size", "12pt")
            // .style("font-family", "sans-serif")
            .text("Both");
        });

    // class = 0
    d3.select("knn_class_0").on("click", function() {
        svg.selectAll("circle.knn_circles")
            // .data(data) // prositution as initial
            //.transition() 
            // .delay(function(d, i) { return i * 100; })
            //.duration(500) 
            // .attr("cx", function(d) { return xScaleA2A(d.X); })
            // .attr("r", function(d) { return d.r  * 1.25; })
            // .attr("cy", function(d) { return yScaleA2A(d.Y); })
            .style("fill", function(d) { if (d.class == 0) {return 'rgba(0,128,255,0.5)'} else { return 'rgba(0,0,0,0)' };})
            ;
    
        // Update title
        svg.select("text.title").text("Non fatal");
        });

    // class = 1
    d3.select("knn_class_1").on("click", function() {
        svg.selectAll("circle.knn_circles")
            // .data(data) // prositution as initial
            //.transition() 
            // .delay(function(d, i) { return i * 100; })
            //.duration(500) 
            // .attr("cx", function(d) { return xScaleA2A(d.X); })
            // .attr("r", function(d) { return d.r  * 1.25; })
            // .attr("cy", function(d) { return yScaleA2A(d.Y); })
            .style("fill", function(d) { if (d.class == 1) {return 'rgba(0,128,255,0.5)'} else { return 'rgba(0,0,0,0)' };})
            ;
    
        // Update title
        svg.select("text.title").text("Fatal");
        });

    // class = all
    d3.select("knn_class_all").on("click", function() {
        svg.selectAll("circle.knn_circles")
            // .data(data) // prositution as initial
            //.transition() 
            // .delay(function(d, i) { return i * 100; })
            //.duration(500) 
            // .attr("cx", function(d) { return xScaleA2A(d.X); })
            // .attr("r", function(d) { return d.r  * 1.25; })
            // .attr("cy", function(d) { return yScaleA2A(d.Y); })
            .style("fill", function(d) { if (d.class == 1) {return 'rgba(255,0,0, 0.5)'} else { return 'rgba(0,0,255,0.5)' };})
            ;
    
        // Update title
        svg.select("text.title").text("Both");   
        });  
    




    // function clicked(d) {
    //     var x, y, k;

    //     if (d && centered !== d) {
    //         var centroid = path.centroid(d);
    //         x = centroid[0];
    //         y = centroid[1];

    //         var centroid1 = circle.knn_circles.centroid(d);
    //         x1 = centroid1[0];
    //         y1 = centroid1[1];
            
    //         k = 4;
    //         centered = d;
    //     } else {
    //         x = width / 2;
    //         y = height / 2;
    //         k = 1;
    //         centered = null;
    //     }

    //     g.selectAll("path")
    //         .classed("active", centered && function(d) { return d === centered; });

    //     g.transition()
    //         .duration(500)
    //         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    //         .style("stroke-width", k + "px");
    // }
    









});