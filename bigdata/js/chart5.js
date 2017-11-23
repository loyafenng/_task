$(function() {

var chart = echarts.init($('#uc')[0]);
var option = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: getXAxis(),
        splitNumber: 300,
        axisLine: {
            show: false,
            lineStyle: {
                color: '#9ea4b2'
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: false,
            lineStyle: {
                color: '#5a5d6e'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(90,93,110,.15)'
            }
        }
    },
    series: [
        {
            id: 'a',
            type: 'line',
            smooth: true,
            // showSymbol: false,
            symbolSize: 4,
            // label: {
            //     normal: {
            //         show: true
            //     }
            // },
            lineStyle: {
                normal: {
                    color: '#07A6FF'
                }
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: '#2faef5'
                }
            },
            // areaStyle: {
            //     normal: {
            //         color: '#0dc0f6',
            //         opacity: .3
            //     }
            // },
            // data: getDefaultData()
        }
    ]
};;
chart.setOption(option);

function getXAxis() {
    var xAxisData = [];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var sd = new Date(year + '/' + month + '/' + day + ' 00:00:00');
    var ed = new Date(year + '/' + month + '/' + day + ' 23:59:59');
    for (var t = sd.getTime(), et = ed.getTime() + 5 * 60 * 1000, d, h, m; t <= et; t += 5 * 60 * 1000) {
        d = new Date(t);
        h = d.getHours();
        m = d.getMinutes();
        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        xAxisData.push(h + ':' + m);
    }
    return xAxisData;
}
function getDefaultData() {
    var data = [];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var sd = new Date(year + '/' + month + '/' + day + ' 00:00:00');
    var ed = new Date();
    for (var t = sd.getTime(), et = ed.getTime(); t <= et; t += charts.timer) {
        if (t == sd.getTime()) data.push(500);
        else data.push(random(data[data.length - 1] - 2, data[data.length - 1] + 2));
    }
    return data;
}

var lastData = {};

charts.updateChart5 = function() {
    return $.post(charts.api + '/active/findActiveUser', function (data) {
        if (JSON.stringify(lastData) == JSON.stringify(data)) return;
        lastData = data;

        data = data.data;
        if (data.length) {
            var xAxisData = [];
            var yAxisData = [];
            data.forEach(function(item) {
                var ut = item.updateTime.replace(/-/g, '/').match(/[^\.]*/)[0];
                var d = new Date(ut);
                var h = d.getHours();
                var m = d.getMinutes();
                if (h < 10) h = '0' + h;
                if (m < 10) m = '0' + m;
                xAxisData.push(h + ':' + m);
                yAxisData.push(item.num);
            })
            chart.setOption({
                // xAxis: {
                //     data: xAxisData
                // },
                series: {
                    data: yAxisData
                }
            });
        }
    });
};

});