var width = 800, height = 600;

var projection = d3.geo.mercator()
                    .scale(55000)
                    .translate([width / 2, height / 2]);

var svg = d3.select("#area_intro")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

d3.json("https://titanbender.github.io/data/nyc.geojson", function(nyc_map) {

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
        .style("stroke","black");

    d3.json("https://titanbender.github.io/data/geo_plot_2013.json", function(data) {
        //Create circles
        // var data = [{'district': 'BROOKLYN', 'hour': 14, 'lon': -73.957523800000004, 'r': 1, 'lat': 40.580222499999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 15, 'lon': -73.963056600000002, 'r': 1, 'lat': 40.606975200000001, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 12, 'lon': -74.007564799999997, 'r': 1, 'lat': 40.654430100000006, 'class': 'all'}, {'district': 'QUEENS', 'hour': 0, 'lon': -73.847002500000002, 'r': 1, 'lat': 40.698824200000004, 'class': 'all'}, {'district': 'QUEENS', 'hour': 4, 'lon': -73.86649109999999, 'r': 1, 'lat': 40.747614599999999, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'QUEENS', 'hour': 7, 'lon': -73.844640200000001, 'r': 1, 'lat': 40.680296500000004, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 16, 'lon': -73.874158899999998, 'r': 1, 'lat': 40.677689399999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 4, 'lon': -73.898348400000003, 'r': 1, 'lat': 40.6173115, 'class': 'all'}];

        console.log(data);
        svg.selectAll("g")
            .data(data) // prositution as initial
            .enter()
            .append("circle")
            // .attr("class", function(d) { return d.class; })
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            .attr("r", function (d) {return d.r * 0.5 ;})
            .style("fill", "rgba(255,0,0, 0.25)")
            .style("stroke", "black")
            .style("stroke-width", 0.0125)
            ;
    });  




d3.json("https://titanbender.github.io/data/geo_plot_2014.json", function(data) {
        //Create circles
        // var data = [{'district': 'BROOKLYN', 'hour': 14, 'lon': -73.957523800000004, 'r': 1, 'lat': 40.580222499999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 15, 'lon': -73.963056600000002, 'r': 1, 'lat': 40.606975200000001, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 12, 'lon': -74.007564799999997, 'r': 1, 'lat': 40.654430100000006, 'class': 'all'}, {'district': 'QUEENS', 'hour': 0, 'lon': -73.847002500000002, 'r': 1, 'lat': 40.698824200000004, 'class': 'all'}, {'district': 'QUEENS', 'hour': 4, 'lon': -73.86649109999999, 'r': 1, 'lat': 40.747614599999999, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'QUEENS', 'hour': 7, 'lon': -73.844640200000001, 'r': 1, 'lat': 40.680296500000004, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 16, 'lon': -73.874158899999998, 'r': 1, 'lat': 40.677689399999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 4, 'lon': -73.898348400000003, 'r': 1, 'lat': 40.6173115, 'class': 'all'}];

        console.log(data);
        svg.selectAll("g")
            .data(data) // prositution as initial
            .enter()
            .append("circle")
            // .attr("class", function(d) { return d.class; })
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            .attr("r", function (d) {return d.r * 0.5 ;})
            .style("fill", "rgba(0,255,0, 0.25)")
            .style("stroke", "black")
            .style("stroke-width", 0.0125)
            ;
    }); 



d3.json("https://titanbender.github.io/data/geo_plot_2015.json", function(data) {
        //Create circles
        // var data = [{'district': 'BROOKLYN', 'hour': 14, 'lon': -73.957523800000004, 'r': 1, 'lat': 40.580222499999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 15, 'lon': -73.963056600000002, 'r': 1, 'lat': 40.606975200000001, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 12, 'lon': -74.007564799999997, 'r': 1, 'lat': 40.654430100000006, 'class': 'all'}, {'district': 'QUEENS', 'hour': 0, 'lon': -73.847002500000002, 'r': 1, 'lat': 40.698824200000004, 'class': 'all'}, {'district': 'QUEENS', 'hour': 4, 'lon': -73.86649109999999, 'r': 1, 'lat': 40.747614599999999, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'QUEENS', 'hour': 7, 'lon': -73.844640200000001, 'r': 1, 'lat': 40.680296500000004, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 16, 'lon': -73.874158899999998, 'r': 1, 'lat': 40.677689399999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 4, 'lon': -73.898348400000003, 'r': 1, 'lat': 40.6173115, 'class': 'all'}];

        console.log(data);
        svg.selectAll("g")
            .data(data) // prositution as initial
            .enter()
            .append("circle")
            // .attr("class", function(d) { return d.class; })
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            .attr("r", function (d) {return d.r * 0.5 ;})
            .style("fill", "rgba(0,0,255 0.25)")
            .style("stroke", "black")
            .style("stroke-width", 0.0125)
            ;
    }); 

d3.json("https://titanbender.github.io/data/geo_plot_2015.json", function(data) {
        //Create circles
        // var data = [{'district': 'BROOKLYN', 'hour': 14, 'lon': -73.957523800000004, 'r': 1, 'lat': 40.580222499999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 15, 'lon': -73.963056600000002, 'r': 1, 'lat': 40.606975200000001, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 12, 'lon': -74.007564799999997, 'r': 1, 'lat': 40.654430100000006, 'class': 'all'}, {'district': 'QUEENS', 'hour': 0, 'lon': -73.847002500000002, 'r': 1, 'lat': 40.698824200000004, 'class': 'all'}, {'district': 'QUEENS', 'hour': 4, 'lon': -73.86649109999999, 'r': 1, 'lat': 40.747614599999999, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 11, 'lon': -73.911503699999997, 'r': 1, 'lat': 40.657382599999998, 'class': 'all'}, {'district': 'QUEENS', 'hour': 7, 'lon': -73.844640200000001, 'r': 1, 'lat': 40.680296500000004, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 16, 'lon': -73.874158899999998, 'r': 1, 'lat': 40.677689399999998, 'class': 'all'}, {'district': 'BROOKLYN', 'hour': 4, 'lon': -73.898348400000003, 'r': 1, 'lat': 40.6173115, 'class': 'all'}];

        console.log(data);
        svg.selectAll("g")
            .data(data) // prositution as initial
            .enter()
            .append("circle")
            // .attr("class", function(d) { return d.class; })
            .attr("cx", function (d) {return projection([d.lon, d.lat])[0] ;})
            .attr("cy", function (d) {return projection([d.lon, d.lat])[1] ;})
            .attr("r", function (d) {return d.r * 0.5 ;})
            .style("fill", "rgba(0,0,255 0.25)")
            .style("stroke", "black")
            .style("stroke-width", 0.0125)
            ;
    }); 










});