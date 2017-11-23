$(function() {
    $(window).resize(render).trigger('resize');
    $(window).on('deviceorientation', render);
    screen.orientation.addEventListener("change", function() {
        render();
        setTimeout(render, 100);
        setTimeout(render, 500);
        setTimeout(render, 1000);
    }, false);

    function isWeixin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    
    function render(e) {
        var w = 1920;
        var h = 1080;
        var hh = 150; // header height
        var wx = isWeixin();
        if (wx) h -= hh;
        var rw = window.innerWidth;
        var rh = window.innerHeight;
        var scaleX = rw / w;
        var scaleY = rh / h;
        if (wx) {
            $('#container').css('transform', 'scale(' + scaleX + ', ' + scaleY + ') translateY(-' + hh + 'px)');
        } else {
            $('#container').css('transform', 'scale(' + scaleX + ', ' + scaleY + ')');
        }
    }

    function render2(e) {
        var w = 1920;
        var h = 1080;
        var rw = window.innerWidth;
        var rh = window.innerHeight;
        var scaleX = rw / w;
        var scaleY = rh / h;
        $('#container').css('transform', 'scale(' + scaleX + ', ' + scaleY + ')');
    }
});