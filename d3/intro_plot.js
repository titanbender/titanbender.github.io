var width = 800, height = 600;

var projection = d3.geoMercator()
                    .scale(55000)
                    .translate([width / 2, height / 2]);

var svg = d3.select("#area_intro")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

// load data function
function load_json_circle( key, p_color) {
    d3.json(key, function(data) {
        //Create circles
        svg.selectAll("g")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            .attr("r", function (d) {return d.r * 0.5 ;})
            .style("fill", p_color)
            .style("stroke", "black")
            .style("stroke-width", 0.0125);
    });     
}

// generate map
d3.json("https://titanbender.github.io/data/nyc.geojson", function(nyc_map) {

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
        .style("stroke","black");

    // 
    load_json_circle( key = "https://titanbender.github.io/data/geo_plot_2013.json", p_color = "rgba(255,0,0,0.25)")
    load_json_circle( key = "https://titanbender.github.io/data/geo_plot_2014.json", p_color = "rgba(0,255,0,0.25)")
    load_json_circle( key = "https://titanbender.github.io/data/geo_plot_2015.json", p_color = "rgba(0,0,255,0.25)")
    load_json_circle( key = "https://titanbender.github.io/data/geo_plot_2016.json", p_color = "rgba(125,125,125, 0.25)")
});

