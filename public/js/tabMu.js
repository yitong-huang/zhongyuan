//横向标签        
var tabMu=function(tabMu,tval,qhxg){
	var mYN=true;
	var $tabMu=tabMu;
	var $tmli=$tabMu.find('li');
	var $tcntem=$tabMu.siblings('.tabCnt').find('.item');
	var idx=0;
	$tmli.removeClass('cur');
	$tmli.eq(0).addClass('cur');
	$tcntem.css({'height':0,'overflow':'hidden'});
	//$tcntem.hide();
	$tcntem.eq(0).removeAttr('style');
	if(tval=='1'){
		$tmli.eq(0).addClass('colorbg_main');
	}else if(tval=='2'){
		$tmli.addClass('borcol');
		$tmli.eq(0).addClass('colorbg_main border_colorall_main');
	}else if(tval=='3'){
		$tmli.addClass('borcol');
		$tmli.eq(0).addClass('bg_main border_colorall_main');
	}else if(tval=='4' || tval=='8'){
		$tmli.eq(0).addClass('bg_main');
	}else if(tval=='5'){
		$tabMu.find('ul').addClass('bg_main');
		$tmli.append(" <i class='icon_adore triangle_t border_colortop_main'></i>");
	}else if(tval=='6'){
		$tabMu.find('ul').addClass('bg_main');
	}else if(tval=='7'){
		$tmli.addClass('borTransparent');
		$tmli.eq(0).addClass('border_colorall_main colorbg_main');
	}else if(tval=='9' || tval=='10'){
		$tmli.addClass('borTransparent');
		$tmli.eq(0).addClass('border_colorall_main colorbg_main');
	}
	if(qhxg=="0"){
		$tmli.click(function(){
			if(idx != $(this).index()){
			   idx=$(this).index();
			   $tcntem.removeAttr('style');
			   mYN=false;
			   $(this).siblings('li').removeClass('cur');
			   $tcntem.eq(idx).siblings('.item').hide();
			   $(this).addClass('cur');
			   $tcntem.eq(idx).show();
			   if(tval=='1'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
			   }else if(tval=='2'){
					$(this).siblings('li').removeClass('colorbg_main border_colorall_main');
					$(this).addClass('colorbg_main border_colorall_main');
			   }else if(tval=='3'){
					$(this).siblings('li').removeClass('bg_main border_colorall_main');
					$(this).addClass('bg_main border_colorall_main');
			   }else if(tval=='4' || tval=='8'){
					$(this).siblings('li').removeClass('bg_main');
					$(this).addClass('bg_main');
			   } else if(tval=='7' || tval=='9' || tval=='10'){
					$(this).siblings('li').removeClass('border_colorall_main colorbg_main');
					$(this).addClass('border_colorall_main colorbg_main');
				}
				if ($tcntem.eq(idx).find('.img-count').length > 0) {
					$tcntem.eq(idx).find('.img-count').each(function () {
						imgCount1($(this))
					})
				}
			}		
		});
	}else if(qhxg=="1"){
		$tmli.mousemove(function(){
			if(idx != $(this).index()){
			   idx=$(this).index();
			   $tcntem.removeAttr('style');
			   mYN=false;
			   $(this).siblings('li').removeClass('cur');
			   $tcntem.eq(idx).siblings('.item').hide();
			   $(this).addClass('cur');
			   $tcntem.eq(idx).show();
			   if(tval=='1'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
			   }else if(tval=='2'){
					$(this).siblings('li').removeClass('colorbg_main border_colorall_main');
					$(this).addClass('colorbg_main border_colorall_main');
			   }else if(tval=='3'){
					$(this).siblings('li').removeClass('bg_main border_colorall_main');
					$(this).addClass('bg_main border_colorall_main');
			   }else if(tval=='4' || tval=='8'){
					$(this).siblings('li').removeClass('bg_main');
					$(this).addClass('bg_main');
			   } else if(tval=='7' || tval=='9' || tval=='10'){
					$(this).siblings('li').removeClass('border_colorall_main colorbg_main');
					$(this).addClass('border_colorall_main colorbg_main');
				} 
				if ($tcntem.eq(idx).find('.img-count').length > 0) {
					$tcntem.eq(idx).find('.img-count').each(function () {
						imgCount1($(this))
					})
				}
			}		
		});
	}
	setTimeout(function () {
		if(mYN){
			$tcntem.removeAttr('style');
			$tcntem.hide();
	        $tcntem.eq(0).show();
		}
	}, 3000);
	$(window).resize(function () {
		$tcntem.css({'height':0,'overflow':'hidden'});
		$tcntem.show();
		$tcntem.eq(idx).removeAttr('style');
		setTimeout(function () {
			$tcntem.removeAttr('style');
			$tcntem.hide();
			$tcntem.eq(idx).show();
		}, 1000);
	})
};