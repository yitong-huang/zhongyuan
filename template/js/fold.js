//折叠            
var fold=function(fold,fVal,dongx,isOpenF){
	var $fold=fold;
	var $fdli=$fold.find('li');
	var $fdtit=$fold.find('.fd_t');
	if(isOpenF){
		$fdli.eq(0).addClass('open');
		$fdli.eq(0).find('.fd_det').slideDown();
		if(fVal=='1' || fVal=='2' || fVal=='3'){
			$fdli.eq(0).find('.fd_t').addClass('bg_main');
		}else if(fVal=='9'){
			$fdli.eq(0).find('.fd_t').addClass('bg_main');
		}
	}
	if(dongx=='0'){
		$fdtit.click(function(){
			$(this).parents('li').siblings('li').removeClass('open');
			$(this).parents('li').siblings('li').find('.fd_det').slideUp();
			if(fVal=='1' || fVal=='2' || fVal=='3'){
				$(this).parents('li').siblings('li').find('.fd_t').removeClass('bg_main');	
			}else if(fVal=='9'){
				$(this).parents('li').siblings('li').find('.fd_t').removeClass('colorbg_main');	
			}
			if($(this).parents('li').hasClass('open')){
				$(this).parents('li').removeClass('open');
				$(this).siblings('.fd_det').slideUp();
				if(fVal=='1' || fVal=='2' || fVal=='3'){
					$(this).removeClass('bg_main');
				}else if(fVal=='9'){
					$(this).removeClass('colorbg_main');
				}
			}else{
				$(this).parents('li').addClass('open');
				$(this).siblings('.fd_det').slideDown();
				if(fVal=='1' || fVal=='2' || fVal=='3'){
					$(this).addClass('bg_main');
				}else if(fVal=='9'){
					$(this).addClass('colorbg_main');
				}
			}
		});
	}else if(dongx=='1'){
		$fdtit.mousemove(function(){
			if(!$(this).parents('li').hasClass('open')){
				$(this).parents('li').siblings('li').removeClass('open');
				$(this).parents('li').siblings('li').find('.fd_det').stop(true).slideUp();
				if(fVal=='1' || fVal=='2' || fVal=='3'){
					$(this).parents('li').siblings('li').find('.fd_t').removeClass('bg_main');	
				}else if(fVal=='9'){
					$(this).parents('li').siblings('li').find('.fd_t').removeClass('colorbg_main');	
				}
				$(this).parents('li').addClass('open');
				$(this).siblings('.fd_det').stop(true).slideDown();
				if(fVal=='1' || fVal=='2' || fVal=='3'){
					$(this).addClass('bg_main');
				}else if(fVal=='9'){
					$(this).addClass('colorbg_main');
				}
			}
		});
	}
};