(function () {
	var mobileBound = false;
	if (!window.theme) {
		window.theme = {};
	}
	window.theme = {
		nav: function () {
			// 当前站点无下拉子菜单，保留空实现以兼容调用
		},
		nav_mobile: function () {
			if (mobileBound) {
				$('.mobile-nav-toggle').off('click.themeNav');
				$('.nav_right_mask').off('click.themeNav');
			}
			$('.mobile-nav-toggle').on('click.themeNav', function () {
				if ($('.col-right').css('left') != 0) {
					$('.nav_right_mask').show();
					$('.col-right').addClass('left0');
				} else {
					$('.nav_right_mask').hide();
					$('.col-right').removeClass('left0');
				}
				return false;
			});
			$('.nav_right_mask').on('click.themeNav', function () {
				$('.col-right').removeClass('left0');
				$('.nav_right_mask').hide();
			});
			mobileBound = true;
		},
		showMenu: function () {
			var $menu = $('#g-web-ul-menu');
			if ($menu.length) {
				$menu.css('display', '');
				$menu.removeAttr('style');
			}
		}
	};
})();

$(function () {
	function applyDesktopHeader() {
		theme.showMenu();
		$('.w-header-common').parents('.body').css('padding-top', $('.w-header-common').outerHeight(true));
		if ($(window).scrollTop() > $('.w-header-common').outerHeight()) {
			$('.w-header-common').addClass('mini');
			$('.w-header-common').css({ top: -$('.topLogBoxPc').height() });
		} else {
			$('.w-header-common').removeClass('mini');
		}
	}

	if ($(window).width() > 960) {
		applyDesktopHeader();
		theme.nav();
	} else {
		theme.nav_mobile();
	}

	$(window).on('scroll', function () {
		if ($(window).width() <= 960) {
			return;
		}
		if ($(window).scrollTop() > $('.w-header-common').outerHeight()) {
			$('.w-header-common').addClass('mini');
			$('.w-header-common').css({ top: -$('.topLogBoxPc').height() });
		} else {
			$('.w-header-common').removeClass('mini');
		}
		if ($(window).scrollTop() < $('.w-header-common .row').outerHeight()) {
			$('.w-header-common').css({ top: 0 });
		}
	});

	$('.col-right').css({ 'padding-bottom': $('.topLogBoxTel').height() });

	var oldWidth = $(window).width();
	$(window).on('resize', function () {
		var newWidth = $(window).innerWidth();
		if (oldWidth > 960 && newWidth < 961) {
			theme.nav_mobile();
			$('.w-header-common').removeClass('mini').removeAttr('style');
			$('.w-header-common').parents('.body').removeAttr('style');
		} else if (oldWidth <= 960 && newWidth > 960) {
			$('.col-right').removeAttr('style').removeClass('left0');
			$('.nav_right_mask').hide();
			theme.nav();
			applyDesktopHeader();
		}
		oldWidth = $(window).width();
		$('.col-right').css({ 'padding-bottom': $('.topLogBoxTel').height() });
		if ($(window).width() > 960) {
			theme.showMenu();
		}
	});
});
