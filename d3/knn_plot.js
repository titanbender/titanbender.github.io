var width = 800, height = 600, centered;

var projection = d3.geoMercator()
                    .scale(55000)
                    .translate([width / 2, height / 2]);

var svg = d3.select("#area_intro") // todo change
            .append("svg")
            .attr("width", width)
            .attr("height", height);

d3.json("data/nyc.geojson", function(nyc_map) {
    // after loading geojson, use d3.geo.centroid to find out 
    // where you need to center your map
    var center = d3.geoCentroid(nyc_map);
    projection.center(center);

    // now you can create new path function with 
    // correctly centered projection
    var path = d3.geoPath().projection(projection);

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
            .attr("r", 2.5)
            // if fatal accident color red
            .style("fill", function(d) { if (d.class == 1) {return 'rgba(255,0,0, 0.5)'} else { return 'rgba(0,0,255,0.5)' };})
            ;


        // title text   
        svg.append("text")
            .attr("class", "title")
            .attr("x", projection([-74.005502, 40.819729])[0])             
            .attr("y", projection([-74.005502, 40.819729])[1])             
            .text("Both");
        });

});

// toggle function
function toggle_accidents( key, p_color, s_color, title_b ) {
    d3.select(key).on("click", function() {
        svg.selectAll("circle.knn_circles")
            .style("fill", function(d) { if (d.class == 1) {return p_color} else { return s_color };});
        // Update title
        svg.select("text.title").text(title_b);
        });    
}

// 
toggle_accidents( key = "knn_class_0", p_color = "rgba(0,0,0,0)", s_color = "rgba(0,128,255,0.5)",title_b = "Non fatal")
toggle_accidents( key = "knn_class_1", p_color = "rgba(0,128,255,0.5)", s_color = "rgba(0,0,0,0)", title_b = "Fatal")
toggle_accidents( key = "knn_class_all", p_color = "rgba(255,0,0, 0.5)", s_color = "rgba(0,0,255,0.5)", title_b = "Both")

