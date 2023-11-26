            var ajaxUrlMemberRegister = "/en%2Fajax%2Fmember%2Fregister.html";
            var ajaxUrlMemberAtivationAgin = "/en%2Fajax%2Fmember%2Fativation-agin.html";
            var ajaxUrlMemberForgetPassword = "/en%2Fajax%2Fmember%2Fforget-password.html";
            var ajaxUrlMemberResetPassword = "/en%2Fajax%2Fmember%2Freset-password.html";
            var ajaxUrlMemberLogin = "/en%2Fajax%2Fmember%2Flogin.html";
            var ajaxMemberIsLogin = "/en%2Fajax%2Fmember%2Fislogin.html";
            var ajaxUrlMemberModifypwd = "/en%2Fajax%2Fmember%2Fmodifypwd.html";
            var ajaxUrlMemberInformation = "/en%2Fajax%2Fmember%2Finformation.html";
            var ajaxUrlMemberAddress = "/en%2Fajax%2Fmember%2Faddress.html";
            var ajaxUrlMemberEditAddress = "/en%2Fajax%2Fmember%2Fedit-address.html";
            var ajaxUrlMemberSetAsDefaultAddress = "/en%2Fajax%2Fmember%2Fdefault-address.html";
            var ajaxUrlMemberDeleteAddress = "/en%2Fajax%2Fmember%2Fdelete-address.html";
            var ajaxUrlMemberAddCollection = "/en%2Fajax%2Fmember%2Fadd-collection.html";
            var ajaxUrlMemberDeleteCollection = "/en%2Fajax%2Fmember%2Fdelete-collection.html";
            var ajaxUrlMemberAddCart = "/en%2Fajax%2Fmember%2Fadd-cart.html";
            var ajaxUrlMemberDelSingleCart = "/en%2Fajax%2Fmember%2Fdel-single-cart.html";
            var ajaxUrlMemberDelDoubleleCart = "/en%2Fajax%2Fmember%2Fdel-double-cart.html";
            var ajaxUrlMemberEditCart = "/en%2Fajax%2Fmember%2Fedit-cart.html";
            var ajaxUrlMemberEditSingleCart = "/en%2Fajax%2Fmember%2Fedit-single-cart.html";
            var ajaxUrlGetCartNumber = "/en%2Fajax%2Fmember%2Fcart-number.html";
            var ajaxUrlMemberOrderConfirmation = "/en%2Fajax%2Fmember%2Fcreate-order-confirmation.html";
            var ajaxUrlMemberImmeOrder = "/en%2Fajax%2Fmember%2Fimme-order.html";
            var ajaxUrlOrderCancel = "/en%2Fajax%2Forder%2Fcancel.html";
            var ajaxUrlOrderChangeCashDelivery = "/en%2Fajax%2Forder%2Fchange-cash-delivery.html";
            var ajaxUrlOrderChangePayOnline = "/en%2Fajax%2Forder%2Fchange-pay-online.html";
            var ajaxUrlOrderReceipt = "/en%2Fajax%2Forder%2Freceipt.html";
            var ajaxUrlOrderEvaluate = "/en%2Fajax%2Forder%2Fevaluate.html";
            var ajaxUrlOrderProductEvaluate = "/en%2Fajax%2Forder%2Fproduct-evaluate.html";
            var ajaxUrlOrderDelete = "/en%2Fajax%2Forder%2Fdelete.html";
            var ajaxUrlArticleComment = "/en%2Fajax%2Fcomment%2Farticle.html";
            var ajaxUrlComponentFile = "/en%2Fajax%2Fcomponents%2Ffile.html";
            var ajaxUrlProductsFile = "/en%2Fajax%2Fproducts%2Ffile.html";
            var ajaxUrlFileSystemDownload = "/en%2Fajax%2Ffile%2Ffile.html";
            var searchKeyword = "/en%2Fsearch%2F";
            var memberSiteUrl = "/en%2Fmember%2Fsite.html";
            var memberLoginUrl = "/en%2Fmember%2Flogin.html";
            var memberCartUrl = "/en%2Fmember%2Fcart.html";
            var memberOrderUrl = "/en%2Fmember%2Forder.html";
            var memberOrderConfirmationUrl = "/en%2Fmember%2Forder%2Fconfirmation.html";
            var ajaxPushVCode = "/en%2Fajax%2Fuser%2Fget-vcode.html";
            var ajaxPushVCodeIsRegister = "/en%2Fajax%2Fuser%2Fget-vcode-register.html";
    
(function ($) {
    $.extend({
        "ajaxUrl": function (options) {
            var _ajaxUrl = {"ajaxUrlMemberRegister":"%2Fajax%2Fmember%2Fregister.html","ajaxUrlMemberAtivationAgin":"%2Fajax%2Fmember%2Fativation-agin.html","ajaxUrlMemberForgetPassword":"%2Fajax%2Fmember%2Fforget-password.html","ajaxUrlMemberResetPassword":"%2Fajax%2Fmember%2Freset-password.html","ajaxUrlMemberLogin":"%2Fajax%2Fmember%2Flogin.html","ajaxMemberIsLogin":"%2Fajax%2Fmember%2Fislogin.html","ajaxUrlMemberModifypwd":"%2Fajax%2Fmember%2Fmodifypwd.html","ajaxUrlMemberInformation":"%2Fajax%2Fmember%2Finformation.html","ajaxUrlMemberAddress":"%2Fajax%2Fmember%2Faddress.html","ajaxUrlMemberEditAddress":"%2Fajax%2Fmember%2Fedit-address.html","ajaxUrlMemberSetAsDefaultAddress":"%2Fajax%2Fmember%2Fdefault-address.html","ajaxUrlMemberDeleteAddress":"%2Fajax%2Fmember%2Fdelete-address.html","ajaxUrlMemberAddCollection":"%2Fajax%2Fmember%2Fadd-collection.html","ajaxUrlMemberDeleteCollection":"%2Fajax%2Fmember%2Fdelete-collection.html","ajaxUrlMemberAddCart":"%2Fajax%2Fmember%2Fadd-cart.html","ajaxUrlMemberDelSingleCart":"%2Fajax%2Fmember%2Fdel-single-cart.html","ajaxUrlMemberDelDoubleleCart":"%2Fajax%2Fmember%2Fdel-double-cart.html","ajaxUrlMemberEditCart":"%2Fajax%2Fmember%2Fedit-cart.html","ajaxUrlMemberEditSingleCart":"%2Fajax%2Fmember%2Fedit-single-cart.html","ajaxUrlGetCartNumber":"%2Fajax%2Fmember%2Fcart-number.html","ajaxUrlMemberOrderConfirmation":"%2Fajax%2Fmember%2Fcreate-order-confirmation.html","ajaxUrlMemberImmeOrder":"%2Fajax%2Fmember%2Fimme-order.html","ajaxUrlOrderCancel":"%2Fajax%2Forder%2Fcancel.html","ajaxUrlOrderChangeCashDelivery":"%2Fajax%2Forder%2Fchange-cash-delivery.html","ajaxUrlOrderChangePayOnline":"%2Fajax%2Forder%2Fchange-pay-online.html","ajaxUrlOrderReceipt":"%2Fajax%2Forder%2Freceipt.html","ajaxUrlOrderEvaluate":"%2Fajax%2Forder%2Fevaluate.html","ajaxUrlOrderProductEvaluate":"%2Fajax%2Forder%2Fproduct-evaluate.html","ajaxUrlOrderDelete":"%2Fajax%2Forder%2Fdelete.html","ajaxUrlArticleComment":"%2Fajax%2Fcomment%2Farticle.html","ajaxUrlComponentFile":"%2Fajax%2Fcomponents%2Ffile.html","ajaxUrlProductsFile":"%2Fajax%2Fproducts%2Ffile.html","ajaxUrlFileSystemDownload":"%2Fajax%2Ffile%2Ffile.html","searchKeyword":"%2Fsearch%2F","memberSiteUrl":"%2Fmember%2Fsite.html","memberLoginUrl":"%2Fmember%2Flogin.html","memberCartUrl":"%2Fmember%2Fcart.html","memberOrderUrl":"%2Fmember%2Forder.html","memberOrderConfirmationUrl":"%2Fmember%2Forder%2Fconfirmation.html","ajaxPushVCode":"%2Fajax%2Fuser%2Fget-vcode.html","ajaxPushVCodeIsRegister":"%2Fajax%2Fuser%2Fget-vcode-register.html"};
            if(!!_ajaxUrl[options]){
                return "/en"+_ajaxUrl[options];
            }else{
                return options;
            }
        }
    });
})(jQuery);
