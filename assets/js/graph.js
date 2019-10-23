queue()
    .defer(d3.csv, "assets/data/bicycle-crash-data-new.csv")
    .await(makeGraphs);
    
function makeGraphs(error, bicycleData) {
    var ndx = crossfilter(bicycleData);
    
    graph1(ndx);
    graph2(ndx);
    graph3(ndx);
    
    dc.renderAll();
}

function graph1(ndx) {
    var dim = ndx.dimension(dc.pluck('city'));
    var group = dim.group();
    
    dc.barChart("#graph1")
        .width(500)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Age")
}

function graph2(ndx) {
    var dim = ndx.dimension(dc.pluck('bike_sex'));
    var group = dim.group();
    
    dc.barChart("#graph2")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}

/*function graph3(ndx) {
    var dim = ndx.dimension(dc.pluck('bike_sex'));
    var group = dim.group();
    
    dc.pieChart("#graph3")
        .height(300) 
        .radius(140)
        .transitionDuration(1000)
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group);
}*/

function graph3(ndx) {
    dim = ndx.dimension(dc.pluck('bike_sex'));
    group = dim.group()
    
    dc.selectMenu("#graph3")
        .dimension(dim)
        .group(group);
}