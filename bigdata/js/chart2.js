$(function() {

var chart = echarts.init($('#cc')[0]);

var option = {
   tooltip : {
       trigger: 'item',
       formatter: function(item) {
           return item.name + '：' + item.value[2].split(/\s/)[1];
       }
   },
   geo: {
       map: 'china',
       label: {
           emphasis: {
               show: false
           }
       },
       roam: false,
       itemStyle: {
           normal: {
               areaColor: '#0D0F15',
               borderColor: '#29313E'
           },
           emphasis: {
               opacity: .1,
               areaColor: '#2a333d'
           }
       }
   },
   series : [
       {
           name: 'pm2.5',
           type: 'scatter',
           coordinateSystem: 'geo',
           symbolSize: function (val) {
                return val[3];
           },
           label: {
               normal: {
                   textStyle: {
                       color: '#fff',
                   },
                   formatter: '{b}',
                   position: 'right',
                   show: false
               },
               emphasis: {
                   show: true
               }
           },
           itemStyle: {
               normal: {
                   color: '#028BDC',
                   shadowBlur: 2,
                   shadowColor: '#48B2F2'
               }
           }
       },
       {
           name: 'Top 5',
           type: 'effectScatter',
           coordinateSystem: 'geo',
           symbolSize: function (val) {
            //    return val[3] * val[3] / 5;
                return 13;
           },
           showEffectOn: 'render',
           rippleEffect: {
               brushType: 'stroke'
           },
           hoverAnimation: true,
           label: {
               normal: {
                   formatter: '{b}',
                   position: 'right',
                   show: true
               }
           },
           itemStyle: {
               normal: {
                   color: '#C6F7FF',
                   shadowBlur: 10,
                   shadowColor: '#333'
               }
           },
           zlevel: 1
       }
   ]
};


$.get('./assets/china.json', function (chinaJson) {
    echarts.registerMap('china', chinaJson);
    chart.setOption(option);
});


if (!window.charts) window.charts = {};
var lastCount = 0;
var lastLoginTopList = [];
charts.updateChart2 = function() {
    return $.post(charts.api + '/active/findMap', function (data) {
        if (lastCount == data.data.length) return;
        lastCount = data.data.length;
        
        var chartData = [];
        var topData = [];
        var now = Date.now();
        var isChanged = false;
        $.each(data.data, function(i, item) {
            var timestamp = item.logintime.match(/[^\.]*/)[0];
            var date = new Date(timestamp.replace(/-/g, '/'));
            var timediff = (now - date.getTime()) / 1000;
            if (timediff > 0 && timediff < 86400) {
                var size = 4;
                var scale = 30;
                var val = Math.round(size * (Math.PI / 2 - Math.atan(Math.PI * timediff / (180 * scale))));
                if (val > 0) {
                    chartData.push({
                        name: item.city,
                        value: [+item.lng, +item.lat, timestamp, val]
                    });
                }
            }
        });

        var topDataMap = {};
        topData = chartData.sort(function (a, b) {
            return b.value[3] - a.value[3];
        }).filter(function(item) {
            if (typeof topDataMap[item.name] == 'undefined') {
                topDataMap[item.name] = 0;
            } else {
                topDataMap[item.name]++;
            }
            if (topDataMap[item.name]) return false;
            return item.value[3] > 2;
        }).slice(0, 10);


        console.log(topData)

        if (lastLoginTopList.length == topData.length) {
            $.each(topData, function(i, item) {
                if (item.name !== lastLoginTopList[i].name) {
                    isChanged = true;
                }
            })
        } else {
            isChanged = true;
        }

        lastLoginTopList = topData;

        if (isChanged) {
            chart.setOption({
                series: [{
                    data: chartData
                }, {
                    data: topData
                }]
            });
        }
    });
}

});