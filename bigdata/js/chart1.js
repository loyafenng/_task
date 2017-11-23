$(function() {

var schoolNum = 32323;
var activeNum = 32323;
var totalNum = 323230;
var addNum = 323;

var schoolLvl = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
var activeLvl = [8000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 100000];
var totalLvl = [2100, 3400, 5500, 8900, 14400, 23300, 37700, 61000, 98700, 159700, 258400, 418100, 676500, 1094600, 1771100];
var addLvl = [100, 200, 300, 500, 800, 1300, 2100, 3400, 5500, 8900, 14400, 23300, 37700, 61000, 98700];

charts.updateChart1 = function() {
    // $('.bd-chart2 .icon-group').empty();
    // draw('c1', schoolNum, schoolLvl, 'school');
    // draw('c2', activeNum, activeLvl, 'active');
    // draw('c3', totalNum, totalLvl, 'total');
    // draw('c4', addNum, addLvl, 'add');
    
    return $.when(
        $.post(charts.api + '/active/findTodayUV', function (data) {
            countTo($('#c1 .chart-num'), data.data.uv);
            $('#c1 .chart-num-percent').html(data.data.uvPercent);
            $('#c1 .increase-percent').html(parsePercent(data.data.uvRise));
        }),
        $.post(charts.api + '/active/findUserDeal', function (data) {
            countTo($('#c5 .chart-num'), data.data.userCount);
            $('#c5 .chart-num-percent').html(data.data.dealPercent);
            $('#c5 .increase-percent').html(parsePercent(data.data.dealRise));
        }),
        $.post(charts.api + '/active/findTerminalDevice', function (data) {
            countTo($('#c2 .chart-body:first .chart-num'), data.data.deviceCount);
            $('#c2 .chart-body:first .increase-percent').html(parsePercent(data.data.deviceNew));
            countTo($('#c2 .chart-body:eq(1) .chart-num'), data.data.cardCount);
            $('#c2 .chart-body:eq(1) .increase-percent').html(parsePercent(data.data.cardNew));
            countTo($('#c2 .chart-body:eq(2) .chart-num'), data.data.videoCount);
            $('#c2 .chart-body:eq(2) .increase-percent').html(parsePercent(data.data.videoNew));
            countTo($('#c2 .chart-body:last .chart-num'), data.data.videoUseCount);
            $('#c2 .chart-body:last .increase-percent').html(parsePercent(data.data.videoUseNew));
        }),
        $.post(charts.api + '/active/findUserSchoolPlatnear', function (data) {
            countTo($('#c3 .chart-num'), data.data.userCount);
            $('#c3 .chart-num-percent').html(data.data.userPercent);
            $('#c3 .increase-percent').html(parsePercent(data.data.userNew));
            countTo($('#c4 .chart-num'), data.data.schoolCount);
            $('#c4 .increase-percent').html(parsePercent(data.data.schoolNew));
            countTo($('#c7 .chart-num'), data.data.platnearCount);
            $('#c7 .increase-percent').html(parsePercent(data.data.platnearNew));
            countTo($('#c8 .chart-num'), data.data.totalCount);
            $('#c8 .increase-percent').html(parsePercent(data.data.totalNew));
        }),
        $.post(charts.api + '/active/findAvgActiveTime', function (data) {
            $('.chart-user .chart-title-avg p:first span').text(Math.ceil(data.data.parentActiveTime / 6) / 10);
            $('.chart-user .chart-title-avg p:last span').text(Math.ceil(data.data.teracherActiveTime / 6) / 10);
        })
    );
};

function draw(id, num, lvlList, icon) {
    for (var i = 0, n = lvlList.length; i < n; i++) {
        $('#' + id + ' .icon-group').append('<i class="icon icon-'+ icon +'"></i>');
        $('#' + id + ' .chart-num').countTo({
            from: +$('#' + id + ' .chart-num').text(),
            to: num,
            speed: 800,
            refreshInterval: 50
        });
        if (num < lvlList[i]) {
            break;
        }
    }
}

function countTo(ele, num) {
    ele.countTo({
        from: +ele.text(),
        to: num,
        speed: 800,
        refreshInterval: 50
    });
}


});