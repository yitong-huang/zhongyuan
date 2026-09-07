(function () {
	var clickYN1 = false;
	if (!window.menuNH) {
        window.menuNH = {};
	};
	window.menuNH = {
		menuNH_pc: function () {
			var curNHIdx;
			$('.w-com-menuNH').each(function (index, element) {
				var menuThis = $(this);
				if (menuThis.hasClass('w-com-menuNH5')) {
					return '';
				}
                menuThis.find('.ul-parent >li').each(function(index, element) {
					if($(this).hasClass('cur')){
						curNHIdx=index;
					}
				});
				menuThis.find('.ul-parent >li').hover(function(){
					$(this).siblings('li').removeClass('cur');
				},function(){
					menuThis.find('.ul-parent >li').eq(curNHIdx).addClass('cur');
				});
			})
			$('.w-com-menuNHEW').each(function(index, element) {
				var $liF=$(this).find('.ul-parent').children('li');
				var liLen=$liF.length;
				$liF.css({'min-width':(1.0/liLen) * 100 +'%'});
			});
			$('.w-com-menuNH li').hover(function(){
				var $conSubMenu=$(this).children('.ul-submenu');
				$conSubMenu.show();
				var wid_parent=$conSubMenu.parent().width();
				var wid_parent_left=$(this).offset().left;
				var window_w=$(window).width();
				var wid=0;
				var $conSubMenuli=$conSubMenu.children('ul').children('li');
				for(var j=0; j<$conSubMenuli.length;j++){
					var li_width=$conSubMenuli.eq(j)[0].getBoundingClientRect().width;
					wid=wid+li_width;
				}
				if (wid > window_w) {
					$conSubMenu.css({ 'width': window_w, 'left': -wid_parent_left });
				} else {
					if (wid_parent_left > (wid - wid_parent) / 2) {
						if ((window_w - wid_parent_left) > (wid + wid_parent) / 2) {
							$conSubMenu.css({ 'width': wid + 1, 'left': -(wid - wid_parent) / 2 });
						} else {
							$conSubMenu.css({ 'width': wid + 1, 'right': -(window_w - wid_parent_left - wid_parent) });
						}
					} else {
						$conSubMenu.css({ 'width': wid + 1, 'left': -wid_parent_left });
					}
				}
				},function(){	
				$(this).children('.ul-submenu').removeAttr("style");
			});
		},
		menuNH_tel: function () {
			$('.w-com-menuNH .systitle').unbind('click');
			$('.w-com-menuNH .systitle').bind('click',function(){
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
			if(clickYN1){$('.w-com-menuNH .fa-plus').unbind('click');}
			$('.w-com-menuNH .fa-plus').click(function(){
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
		menuNH.menuNH_pc();
	}else{
	    menuNH.menuNH_tel();
	}
	var oldWidth=$(window).width();
	$(window).resize(function(){
		var newWidth=$(window).innerWidth();
		if(oldWidth>767){
			if (newWidth < 768) {
			    $('.w-com-menuNH .systitle').siblings('.ul-parent').slideUp();
			    $('.w-com-menuNH .ul-submenu').removeAttr("style");
			    $('.w-com-menuNH li').unbind('mouseenter').unbind('mouseleave');
			    menuNH.menuNH_tel();
		    }
		}else{
			if (newWidth > 768) {
				$('.w-com-menuNH .systitle').unbind('click');
				$('.w-com-menuNH .systitle').removeClass('open'); 
				$('.w-com-menuNH .systitle').siblings('.ul-parent').slideDown();
				$('.w-com-menuNH .systitle').siblings('.ul-parent').find('.ul-submenu').removeAttr('style');
				$('.w-com-menuNH .systitle').siblings('.ul-parent').find('.open').removeClass('open');
				$('.w-com-menuNH .ul-parent').removeAttr("style");
		        $('.w-com-menuNH .ul-submenu').removeAttr("style");
			    $('.w-com-menuNH .open').removeClass('open');
			    menuNH.menuNH_pc();
		        }
		}
		oldWidth=$(window).width();
	});
});
