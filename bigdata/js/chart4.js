$(function() {

    charts.updateChart4 = function() {
        return $.post(charts.api + '/active/findModuleTop5', function (data) {
            if (data.data.length) {
                $('#t5c ul li').each(function(i, item) {
                    var d = data.data[i];
                    var pp = (d.pv * 100 / d.pvTotal).toFixed(2) + '%';
                    var up = (d.uv * 100 / d.uvTotal).toFixed(2) + '%';
                    $(item).find('.top-title span').text(d.moduleName);
                    $(item).find('.progress:first .bar').width(pp);
                    $(item).find('.pecent-pv').text(pp);
                    $(item).find('.progress:last .bar').width(up);
                    $(item).find('.percent-uv').text(up);
                });
            }
        });
    };


});