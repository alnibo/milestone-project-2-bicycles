queue()
    .defer(d3.csv, "assets/data/bicycle-crash-data.csv")
    .await(makeGraphs);

function makeGraphs(error, bicycleData) {
    var ndx = crossfilter(bicycleData);

    urban_rural_number(ndx, "Urban", "#urban-rural-number");
    hit_run_number(ndx, "Yes", "#hit-run-number")

    pie_gender_bike(ndx);
    pie_gender_drvr(ndx);
    pie_age_class(ndx);

    yearSelector(ndx);

    crash_month(ndx);

    crash_city(ndx);
    crash_severeness(ndx);
    crash_hour(ndx);
    crash_hour_line(ndx);
    
    pie_urban_rural(ndx);

    crash_day(ndx);

    graph3(ndx);

    show_time(ndx);

    dc.renderAll();
}

/* ************************************************** Stat numbers */

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

/* ************************************************** Pie charts */

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
        .externalLabels(18)
        .drawPaths(true)
        .colors(pieColors)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ': ' + Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        });
}

/* ************************************************** Year selector */

function yearSelector(ndx) {
    dim = ndx.dimension(dc.pluck('crash_year'));
    group = dim.group()

    dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(group);
}

/* ************************************************** Bar chart months */

function crash_month(ndx) {
    var dim = ndx.dimension(dc.pluck('crash_mont'));
    var group = dim.group();

    dc.barChart("#crash-month")
        .width(800)
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
        .yAxisLabel("No. of incidents")
        .xAxisLabel("Month");
}

/* ************************************************** Area row chart */

function crash_city(ndx) {
    var rowColours = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);

    var dim = ndx.dimension(dc.pluck('city'));
    var group = dim.group();

    dc.rowChart('#crash-city')
        .width(1500)
        .height(700)
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

/* ************************************************** Severeness row chart */

function crash_severeness(ndx) {
    var rowColours = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);

    var dim = ndx.dimension(dc.pluck('bike_injur'));
    var group = dim.group();

    dc.rowChart('#crash-severeness')
        .width(1500)
        .height(700)
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

/* ************************************************** Crash hour bar chart */

function crash_hour(ndx) {
    var dim = ndx.dimension(dc.pluck('crash_hour'));
    var group = dim.group();

    dc.barChart("#crash-hour")
        .width(800)
        .height(400)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .colors(['#C21807'])
        .clipPadding(20)
        .renderLabel(true)
        .x(d3.scale.ordinal().domain(["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxisLabel("No. of incidents")
        .xAxisLabel("Time of Crash");
}

/* ************************************************** Crash hour line chart */

function crash_hour_line(ndx) {
    var dim = ndx.dimension(dc.pluck('crash_hour'));
    var group = dim.group();

    dc.lineChart("#crash-hour-line")
        .width(800)
        .height(400)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .useViewBoxResizing(true)
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .colors(['#C21807'])
        .clipPadding(20)
        .x(d3.scale.ordinal().domain(["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxisLabel("No. of incidents")
        .xAxisLabel("Time of Crash");
}


function pie_urban_rural(ndx) {
    var pieColors = d3.scale.ordinal()
        .range(['#113B92', '#0a5de0']);

    var dim = ndx.dimension(dc.pluck('crash_loc'));
    var group = dim.group();

    dc.pieChart("#urban-rural-pie")
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

function crash_day(ndx) {
    var barColors = d3.scale.ordinal()
        .range(['#7C0A02', '#C21807']);
    var dim = ndx.dimension(dc.pluck('crashday'));
    var group = dim.group();

    dc.barChart("#crash-day")
        .width(500)
        .height(400)
        .margins({ top: 30, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .clipPadding(20)
        .renderLabel(true)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(barColors)
        .x(d3.scale.ordinal().domain(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]))
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Weekday");
}

function graph3(ndx) {
    var dim = ndx.dimension(dc.pluck('crash_year'));
    var group = dim.group();

    dc.barChart("#graph3")
        .width(500)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(4);
}


function show_time(ndx) {

    var hour_dim = ndx.dimension(dc.pluck('crash_hour'));
    
    var minHour = hour_dim.bottom(1)[0].crash_hour;
    var maxHour = hour_dim.top(1)[0].crash_hour;

    var mondayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Monday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var tuesdayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Tuesday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var wednesdayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Wednesday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var thursdayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Thursday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var fridayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Friday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var saturdayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Saturday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });
    var sundayIncidents = hour_dim.group().reduceSum(function(d) {
        if (d.crashday === 'Sunday') {
            return +d.crash_hour;
        }
        else {
            return 0;
        }
    });

    var compositeChart = dc.compositeChart('#time');

    compositeChart
        .width(900)
        .height(400)
        .margins({ top: 30, right: 80, bottom: 50, left: 50 })
        .useViewBoxResizing(true)
        .dimension(hour_dim)
        .clipPadding(20)
        .x(d3.scale.linear().domain([minHour, maxHour]))
        .yAxisLabel("No. of incidents")
        .xAxisLabel("Hour of the day")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors('#0a5de0')
            .group(mondayIncidents, 'Monday'),
            dc.lineChart(compositeChart)
            .colors('#113B92')
            .group(tuesdayIncidents, 'Tuesday'),
            dc.lineChart(compositeChart)
            .colors('#6A7275')
            .group(wednesdayIncidents, 'Wednesday'),
            dc.lineChart(compositeChart)
            .colors('#fb040f')
            .group(thursdayIncidents, 'Thursday'),
            dc.lineChart(compositeChart)
            .colors('#f8b104')
            .group(fridayIncidents, 'Friday'),
            dc.lineChart(compositeChart)
            .colors('#33a532')
            .group(saturdayIncidents, 'Saturday'),
            dc.lineChart(compositeChart)
            .colors('black')
            .group(sundayIncidents, 'Sunday'),
        ])
        .brushOn(false)
        .render();
}
