(function () {
	var clickYN1 = false;
	if (!window.menuNV) {
        window.menuNV = {};
	};
	window.menuNV = {
		menuNV_pc: function () {
			var curNHIdx;
			$('.w-com-menuNV').each(function (index, element) {
				var menuThis = $(this);
				menuThis.find('.ul-parent >li').each(function(index, element) {
					if($(this).hasClass('cur')){
						curNHIdx = index;
						if (menuThis.hasClass('w-com-menuNVClick')) {
							if ($(this).find('.ul-submenu')) {
								$(this).addClass('open');
								$(this).find('.ul-submenu').slideDown();
							}
						}
					}
				});
				if (!menuThis.hasClass('w-com-menuNV1')) {
					menuThis.find('.ul-parent >li').hover(function(){
						$(this).siblings('li').removeClass('cur');
					},function(){
						menuThis.find('.ul-parent >li').eq(curNHIdx).addClass('cur');
					});
				}
			})
			if(clickYN1){$('.w-com-menuNV li .div-parent .fa').unbind('click');}
			$('.w-com-menuNV li .div-parent .fa').click(function(){
				$(this).parent().parent().siblings().find('.ul-submenu').slideUp();
				$(this).parent().parent().siblings().removeClass('open');
				$(this).parent().parent().siblings().find('.open').removeClass('open');
				if($(this).parent().siblings('.ul-submenu').is(':hidden')){
					$(this).parent().siblings('.ul-submenu').slideDown();
					$(this).parent().parent().addClass('open');
				}else{
					$(this).parent().siblings('.ul-submenu').slideUp();
					$(this).parent().siblings('.ul-submenu').find('.ul-submenu').slideUp();
					$(this).parent().parent().removeClass('open');
					$(this).parent().parent().find('.open').removeClass('open');
				}
				return false;
			});
			clickYN1=true;
		},
		menuNV_tel: function () {
			$('.w-com-menuNV .systitle').unbind('click');
			$('.w-com-menuNV .systitle').bind('click',function(){
				if($(this).hasClass('open')){
					$(this).removeClass('open');
					$(this).siblings('.ul-parent').slideUp();
					$(this).siblings('.ul-parent').find('.ul-submenu').slideUp();
					$(this).siblings('.ul-parent').find('.open').removeClass('open');
				}else{
					$(this).addClass('open');
					$(this).siblings('.ul-parent').slideDown();
				}
				return false;
			});
			if(clickYN1){$('.w-com-menuNV .fa-plus').unbind('click');}
			$('.w-com-menuNV .fa-plus').click(function(){
				$(this).parent().parent().siblings('li').find('.ul-submenu').slideUp();
				$(this).parent().parent().siblings('li').removeClass('open');
				$(this).parent().parent().siblings('li').find('.open').removeClass('open');
				if($(this).parent().siblings('.ul-submenu').is(':hidden')){
					$(this).parent().siblings('.ul-submenu').slideDown();
					$(this).parent().parent().addClass('open');
				}else{
					$(this).parent().siblings('.ul-submenu').slideUp();
					$(this).parent().siblings('.ul-submenu').find('.ul-submenu').slideUp();
					$(this).parent().parent().removeClass('open');
					$(this).parent().parent().find('.open').removeClass('open');
				}
				return false;
			});
			clickYN1=true;
		}
	}	
})();
$(function(){
	if($(window).width()>767){
		menuNV.menuNV_pc();
	}else{
	    menuNV.menuNV_tel();
	}
	var oldWidth=$(window).width();
	$(window).resize(function(){
		var newWidth=$(window).innerWidth();
		if(oldWidth>767){
			if (newWidth < 768) {
			    $('.w-com-menuNV .systitle').siblings('.ul-parent').slideUp();
				$('.w-com-menuNV .ul-submenu').slideUp();
			    $('.w-com-menuNV .open').removeClass('open');
			    menuNV.menuNV_tel();
		    }
		}else{
			if (newWidth > 768) {
				$('.w-com-menuNV .systitle').unbind('click');
				$('.w-com-menuNV .systitle').removeClass('open'); 
				$('.w-com-menuNV .systitle').siblings('.ul-parent').slideDown();
				$('.w-com-menuNV .systitle').siblings('.ul-parent').find('.ul-submenu').removeAttr('style');
				$('.w-com-menuNV .systitle').siblings('.ul-parent').find('.open').removeClass('open');
				$('.w-com-menuNV .ul-parent').removeAttr("style");
		        $('.w-com-menuNV .ul-submenu').removeAttr("style");
			    $('.w-com-menuNV .open').removeClass('open');
			    menuNV.menuNV_pc();
		        }
		}
		oldWidth=$(window).width();
	});
});
