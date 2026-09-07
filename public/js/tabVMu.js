//竖向标签        
var tabVMu=function(tabVMu,tval,qhxg,isbgChange){
	var mYN=true;
	var $tabVMu=tabVMu;
	var $tmVli=$tabVMu.find('li');
	var $tcnVtem=$tabVMu.siblings('.tabVCnt').find('.item');
	var $secP=$tabVMu.closest('.w-section');
	var idx=0;
	var dataImg;
	$tmVli.removeClass('cur');
	$tmVli.eq(0).addClass('cur');
	$tcnVtem.css({'height':0,'overflow':'hidden'});
	//$tcnVtem.hide();
	//$tcnVtem.eq(0).show();
	$tcnVtem.eq(0).removeAttr('style');
	if(tval=='1'){
		$tmVli.eq(0).addClass('colorbg_main');
		$tmVli.eq(0).find('.adore').addClass('bg_main');
	}else if(tval=='2'){
		$tmVli.eq(0).addClass('bg_main');
	}else if(tval=='3'){
		$tmVli.find('.adore').addClass('triangle_t border_colorleft_main');
		$tmVli.eq(0).addClass('bg_main border_colorall_main');
	}else if(tval=='4'){
		$tmVli.find('.adore').addClass('bg_main');
		$tmVli.eq(0).addClass('colorbg_main');
	}
	$tabVMu.siblings('.tabVCnt').css({'min-height':$tabVMu.innerHeight()});
	if(isbgChange){
		dataImg=$tmVli.eq(0).attr('data-img');
		if(dataImg != ''){
			$secP.css({'background-image':'url(' + dataImg +')'});
		}
	}
	if(qhxg=="0"){
		$tmVli.click(function(){
			if(idx != $(this).index()){
			   idx=$(this).index();
			   $(this).siblings('li').removeClass('cur');
			   $tcnVtem.removeAttr('style');
			   mYN=false;
			   $tcnVtem.eq(idx).siblings('.item').hide();
			   $(this).addClass('cur');
			   $tcnVtem.eq(idx).show();
			   if(isbgChange){
					dataImg=$(this).attr('data-img');
					if(dataImg != ''){
						$secP.css({'background-image':'url(' + dataImg +')'});
					}
				}
			   if(tval=='1'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
					$(this).siblings('li').find('.adore').removeClass('bg_main');
					$(this).find('.adore').addClass('bg_main');
			   }else if(tval=='2'){
					$(this).siblings('li').removeClass('bg_main');
					$(this).addClass('bg_main');
			   }else if(tval=='3'){
					$(this).siblings('li').removeClass('bg_main border_colorall_main');
					$(this).addClass('bg_main border_colorall_main');
			   }else if(tval=='4'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
				} 
				if ($tcnVtem.eq(idx).find('.img-count').length > 0) {
					$tcnVtem.eq(idx).find('.img-count').each(function () {
						imgCount1($(this))
					})
				}
			}		
		});
	}else if(qhxg=="1"){
		$tmVli.mousemove(function(){
			if(idx != $(this).index()){
			   idx=$(this).index();
			   $(this).siblings('li').removeClass('cur');
			   $tcnVtem.removeAttr('style');
			   mYN=false;
			   $tcnVtem.eq(idx).siblings('.item').hide();
			   $(this).addClass('cur');
			   $tcnVtem.eq(idx).show();
			   if(isbgChange){
					dataImg=$(this).attr('data-img');
					if(dataImg != ''){
						$secP.css({'background-image':'url(' + dataImg +')'});
					}
				}
			   if(tval=='1'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
					$(this).siblings('li').find('.adore').removeClass('bg_main');
					$(this).find('.adore').addClass('bg_main');
			   }else if(tval=='2'){
					$(this).siblings('li').removeClass('bg_main');
					$(this).addClass('bg_main');
			   }else if(tval=='3'){
					$(this).siblings('li').removeClass('bg_main border_colorall_main');
					$(this).addClass('bg_main border_colorall_main');
			   }  else if(tval=='4'){
					$(this).siblings('li').removeClass('colorbg_main');
					$(this).addClass('colorbg_main');
				} 
				if ($tcnVtem.eq(idx).find('.img-count').length > 0) {
					$tcnVtem.eq(idx).find('.img-count').each(function () {
						imgCount1($(this))
					})
				}
			}		
		});
	}
	setTimeout(function () {
		if(mYN){
			$tcnVtem.removeAttr('style');
			$tcnVtem.hide();
	        $tcnVtem.eq(0).show();
		}
	}, 3000);
	$(window).resize(function () {
		$tcnVtem.css({'height':0,'overflow':'hidden'});
		$tcnVtem.show();
		$tcnVtem.eq(idx).removeAttr('style');
		setTimeout(function () {
			$tcnVtem.removeAttr('style');
			$tcnVtem.hide();
			$tcnVtem.eq(idx).show();
		}, 1000);
		$tabVMu.siblings('.tabVCnt').css({'min-height':$tabVMu.innerHeight()});
	})
};