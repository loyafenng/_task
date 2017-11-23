window.charts = {};
charts.timer = 5000;
// charts.api = 'http://192.168.0.169:8080/api/v2/';
charts.api = 'http://test.juziwl.com/api/v2/';
function parsePercent(p, nop) {
    if (typeof p == 'undefined') return '';

    var str = '<span>';
    if (parseFloat(p) < 0) {
        str += '<span class="down">'
    } else if (parseFloat(p) == 0) {
        return '<span class="zero">0</span>';
    }
    return str + ('' + p).replace(/-?\d+(\.\d+)?/g, function(a) {
        var n = parseFloat(a);
	    return (nop ? '' : n > 0 ? '<span class="arrow">↑</span>' : n < 0 ? '<span class="arrow">↓</span>' : '') + Math.round(Math.abs(n) * 10) / 10;
    }) + '</span>';
}
function random(min, max) {
    if (typeof max == 'undefined') {
        max = min;
        min = 0;
    }
    return min + Math.round(Math.random() * (max - min));
}

$(function() {

    // setInterval(charts.updateChart5, 1000);

    update();

    function update() {
        var now = new Date();
        var nt = now.getTime();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var threshold = new Date(y + '/' + m + '/' + d + ' 23:59:59');
        var tt = threshold.getTime();
        // if (nt < tt && nt + charts.timer > tt) location.reload();
        $.when(charts.updateChart1(), charts.updateChart3(), charts.updateChart4(), charts.updateChart5()).then(function() {
            setTimeout(function() {
                charts.updateChart2().then(function() {
                    setTimeout(update, charts.timer);
                });
            }, 1000);
        });
    }
        
});