// banner 高度自适应
$(function () {
    var $firstimg = $('.banner img').eq(0);
    if ($firstimg.length) {
        var img = new Image();
        img.onload = function () {
            if ($firstimg.innerHeight() < 1) {
                $('.banner').css({ height: 'auto' });
            } else {
                $('.banner').css({ height: $firstimg.innerHeight() });
            }
        };
        img.src = $firstimg.attr('src');
        setTimeout(function () {
            $('.banner').css({ height: 'auto' });
        }, 8000);
        $(window).resize(function () {
            $('.banner').css({ height: 'auto' });
        });
    } else {
        $('.banner').css({ height: 'auto' });
    }
});

// 产品列表等 img-count 图片定位
var imgCount = function () {
    $('.img-count').each(function () {
        var imgH = $(this).height();
        var imgW = $(this).width();
        var $thisimg = $(this).find('img');
        var img = new Image();
        img.onload = function () {
            if ($thisimg.data('img') === false) {
                return;
            }
            var realW = this.width;
            var realH = this.height;
            if (!(realW > 0 && realH > 0 && imgW > 0 && imgH > 0)) {
                return;
            }
            var scale = Math.max(imgW / realW, imgH / realH);
            var showW = realW * scale;
            var showH = realH * scale;
            $thisimg.css({
                width: showW,
                height: showH,
                marginLeft: (imgW - showW) / 2,
                marginTop: (imgH - showH) / 2
            });
        };
        if ($thisimg.attr('src')) {
            img.src = $thisimg.attr('src');
        }
    });
};

$(function () {
    imgCount();
    $(window).on('load resize', function () {
        imgCount();
    });
});

// 移动端回到顶部按钮显示
$(function () {
    var syncTopTel = function () {
        if ($(window).width() < 960 && $(window).scrollTop() > 10) {
            $('.topTel').show();
        } else {
            $('.topTel').hide();
        }
    };
    syncTopTel();
    $(window).on('scroll resize', syncTopTel);
});
