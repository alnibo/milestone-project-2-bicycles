queue()
    .defer(d3.csv, "assets/data/bicycle-crash-data.csv")
    .await(makeGraphs);

function makeGraphs(error, bicycleData) {
    var ndx = crossfilter(bicycleData);

    /*bicycleData.forEach(function(d){
         d.crash_time = parseInt(d.crash_hour);
    })*/
    
    // crash_number(ndx);
    urban_rural_number(ndx, "Urban", "#urban-rural-number");
    hit_run_number(ndx, "Yes", "#hit-run-number")

    pie_gender_bike(ndx);
    pie_gender_drvr(ndx);
    pie_age_class(ndx);

    yearSelector(ndx);

    crash_month(ndx);
    crash_severeness(ndx);
    crash_time(ndx);
    crash_area(ndx);
    
    dc.renderAll();
}

/* ************************************************** Stat Numbers */

/*function crash_number(ndx) {
    var all = ndx.groupAll();
    
    dc.dataCount("#crash-number")
        .dimension(ndx)
        .groupAll(all)
}*/

function urban_rural_number(ndx, urban, element) {
    var urbanPercent = ndx.groupAll().reduce(
        function(p, v) {
            p.total++;
            if (v.rural_urba === urban) {
                p.urban_count++;
            }
            return p;
        },
        function(p, v) {
            p.total--;
            if (v.rural_urba === urban) {
                p.urban_count--;
            }
            return p;
        },
        function() {
            return { total: 0, urban_count: 0 };
        }
    );

    dc.numberDisplay(element)
        .formatNumber(d3.format('%'))
        .valueAccessor(function(d) {
            if (d.urban_count == 0) {
                return 0;
            }
            else {
                return (d.urban_count / d.total);
            }
        })
        .group(urbanPercent);
}

function hit_run_number(ndx, hitRun, element) {
    var hitRunPercent = ndx.groupAll().reduce(
        function(p, v) {
            p.total++;
            if (v.hit_run === hitRun) {
                p.hitRun_count++;
            }
            return p;
        },
        function(p, v) {
            p.total--;
            if (v.hit_run === hitRun) {
                p.hitRun_count--;
            }
            return p;
        },
        function() {
            return { total: 0, hitRun_count: 0 };
        }
    );

    dc.numberDisplay(element)
        .formatNumber(d3.format('%'))
        .valueAccessor(function(d) {
            if (d.hitRun_count == 0) {
                return 0;
            }
            else {
                return (d.hitRun_count / d.total);
            }
        })
        .group(hitRunPercent);
}

/* ************************************************** Pie Charts */

function pie_gender_bike(ndx) {
    var pieColors = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);

    var dim = ndx.dimension(dc.pluck('bike_sex'));
    var group = dim.group();

    dc.pieChart("#gender-pie-bike")
        .height(260)
        .radius(100)
        .transitionDuration(1000)
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(pieColors)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': ' + Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        });
}

function pie_gender_drvr(ndx) {
    var pieColors = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807', '#CD5C5C']);

    var dim = ndx.dimension(dc.pluck('drvr_sex'));
    var group = dim.group();

    dc.pieChart("#gender-pie-drvr")
        .height(260)
        .radius(100)
        .transitionDuration(1000)
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(pieColors)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': ' + Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        });
}

function pie_age_class(ndx) {

    var pieColors = d3.scale.ordinal()
        .range(['#FF8F8F', '#D95252', '#C21807', '#7C0A02', '#5E1914']);

    var ageDim = ndx.dimension(function(d) {
        switch (true) {
            case (d.bike_age < 20):
                return 'Age under 20';
            case (d.bike_age < 40):
                return 'Age 21-40';
            case (d.bike_age < 60):
                return 'Age 41-60';
            case (d.bike_age < 80):
                return 'Age over 61';
            case (d.bike_age == 'Unknown'):
                return 'Unknown';
        }
    });

    var ageGroup = ageDim.group();

    dc.pieChart("#pie-age-class")
        .height(260)
        .radius(80)
        .transitionDuration(1000)
        .useViewBoxResizing(true)
        .innerRadius(40)
        .dimension(ageDim)
        .group(ageGroup)
        .externalLabels(7)
        .drawPaths(false)
        .colors(pieColors)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': ' + Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        });
}

/* ************************************************** Year Selector */

function yearSelector(ndx) {
    dim = ndx.dimension(dc.pluck('crash_year'));
    group = dim.group()

    dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(group);
}

/* ************************************************** Months Bar Chart */

function crash_month(ndx) {
    var dim = ndx.dimension(dc.pluck('crash_mont'));
    var group = dim.group();

    dc.barChart("#crash-month")
        .width(1000)
        .height(400)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .colors(['#C21807'])
        .clipPadding(20)
        .renderLabel(true)
        .x(d3.scale.ordinal().domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxisLabel("No. of crashes")
        .xAxisLabel("Month");
}

/* ************************************************** Severeness row chart */

function crash_severeness(ndx) {
    var rowColours = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);

    var dim = ndx.dimension(dc.pluck('bike_injur'));
    var group = dim.group();

    dc.rowChart('#crash-severeness')
        .width(1000)
        .height(400)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .elasticX(true)
        .cap(15)
        .colors(rowColours)
        .dimension(dim)
        .group(group)
        .renderLabel(true);
}

/* ************************************************** Crash hour composite chart */

function crash_time(ndx) {

    var hour_dim = ndx.dimension(dc.pluck('crash_hour'));
    
    var minHour = hour_dim.bottom(1)[0].crash_hour;
    var maxHour = hour_dim.top(1)[0].crash_hour;

    var mondayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Monday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var tuesdayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Tuesday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var wednesdayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Wednesday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var thursdayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Thursday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var fridayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Friday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var saturdayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Saturday') {
            return +1;
        }
        else {
            return +0;
        }
    });
    var sundayCrashes = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Sunday') {
            return +1;
        }
        else {
            return +0;
        }
    });

    var compositeChart = dc.compositeChart('#crash-time');

    compositeChart
        .width(1000)
        .height(400)
        .margins({ top: 30, right: 80, bottom: 50, left: 50 })
        .useViewBoxResizing(true)
        .dimension(hour_dim)
        .clipPadding(20)
        .x(d3.scale.linear().domain([minHour, maxHour]))
        .yAxisLabel("No. of crashes")
        .xAxisLabel("Hour of the day")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors('#0a5de0')
            .group(mondayCrashes, 'Monday'),
            dc.lineChart(compositeChart)
            .colors('#113B92')
            .group(tuesdayCrashes, 'Tuesday'),
            dc.lineChart(compositeChart)
            .colors('#6A7275')
            .group(wednesdayCrashes, 'Wednesday'),
            dc.lineChart(compositeChart)
            .colors('#fb040f')
            .group(thursdayCrashes, 'Thursday'),
            dc.lineChart(compositeChart)
            .colors('#f8b104')
            .group(fridayCrashes, 'Friday'),
            dc.lineChart(compositeChart)
            .colors('#33a532')
            .group(saturdayCrashes, 'Saturday'),
            dc.lineChart(compositeChart)
            .colors('black')
            .group(sundayCrashes, 'Sunday'),
        ])
        .brushOn(false)
        .render();
}

/* ************************************************** Area row chart */

function crash_area(ndx) {
    var rowColours = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);

    var dim = ndx.dimension(dc.pluck('city'));
    var group = dim.group();

    dc.rowChart('#crash-area')
        .width(1000)
        .height(400)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .elasticX(true)
        .cap(15)
        .colors(rowColours)
        .dimension(dim)
        .group(group)
        .renderLabel(true);
}