$(function() {

charts.updateChart3 = function() {
    return $.when($.post(charts.api + '/active/findAreaTop10', function (data) {
        data = data.data;
        if (data.length) {
            $('#tc ul li').each(function(i, item) {
                var d = data[i];
                var p = (d.userCount * 100 / d.userCountTotal).toFixed(2) + '%';
                $(item).find('span').text(d.cityName);
                $(item).find('.bar').css('width', p);
                $(item).find('.pnum').text(d.userCount );
                $(item).find('.percent').text(p);
            });
        }
    }), $.post(charts.api + '/active/findAreaRegTop10', function (data) {
        data = data.data;
        if (data.length) {
            $('#qytc ul li').each(function(i, item) {
                var d = data[i];
                var p = (d.newUserCount * 100 / d.allUserCount).toFixed(2) + '%';
                $(item).find('span').text(d.cityName);
                $(item).find('.bar').css('width', p);
                $(item).find('.pnum').text(d.newUserCount );
                $(item).find('.percent').text(p);
            });
        }
    }));
};


});