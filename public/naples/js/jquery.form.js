$(function () {
    $(".g-form-components").click(function () {
        var _this = $(this);
        if (!!_this.data("do") && _this.data("do") === '1') {
            return '';
        } else {
            _this.data("do", "1");
        }
        var formComData = $.formComData(_this);
        if (formComData === false) {
            _this.data("do", "0");
            return '';
        }
        var formData = formComData.data;
        var formCom = formComData.com;

        // 是否存在文件
        var isUpload = false;
        for (var i in formCom) {
            if (formCom[i].comthis.attr("type") === 'file') {
                isUpload = true
            }
        }
        // ajax 上传文件提交数据
        if (isUpload) {
            var fileFormData = new FormData();
            fileFormData.append("boxId", formData.boxId);
            fileFormData.append("captcha", formData.captcha);
            fileFormData.append("pageId", formData.pageId);
            fileFormData.append("postUrl", formData.postUrl);
            var formItems = [];
            for (var i in formData.formItem) {
                var formItem = formData.formItem[i];
                for (var j in formCom) {
                    if (parseInt(formItem.id) === parseInt(formCom[j].id)) {
                        if (formCom[j].comthis.attr("type") === 'file') {
                            formItem.isFile = 1;
                            fileFormData.append("file" + formItem.id, formCom[j].comthis[0].files[0]);
                        } else {
                            formItem.isFile = 0;
                        }
                    }
                }
                formItems[i] = formItem;
            }
            fileFormData.append("formItem", JSON.stringify(formItems));

            $.ajax({
                url: formData.postUrl,
                type: 'POST',
                data: fileFormData,
                cache: false,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (_ret) {
                    _this.data("do", "0");
                    var componentsParentId = _this.data("comtag");
                    $("#" + componentsParentId).find("img[name='captcha']").click();
                    if (_ret._return !== "success") {
                        if (_ret.code == '2') {
                            layer.alert($.languagePack(_ret.language), function (index) {
                                window.location.reload();
                                layer.close(index);
                            });
                            $(".layui-layer-close").click(function () {
                                window.location.reload();
                            });
                            return '';
                        }
                        if (!!_ret.message) {
                            layer.alert(_ret.message, function (index) {
                                if (_ret.code == '1') {
                                    var componentsParentId = _this.data("comtag");
                                    $("#" + componentsParentId).find("input[name='captcha']").focus();
                                }
                                layer.close(index);
                            });
                            $(".layui-layer-close").click(function () {
                                if (_ret.code == '1') {
                                    var componentsParentId = _this.data("comtag");
                                    $("#" + componentsParentId).find("input[name='captcha']").focus();
                                }
                            });
                        }
                        return false;
                    } else {
                        // 成功
                        if (!!_ret.message) {
                            layer.alert(_ret.message, function (index) {
                                window.location.reload();
                                layer.close(index);
                            });
                            $(".layui-layer-close").click(function () {
                                window.location.reload();
                            });
                        }

                    }
                }
            });
            return;
        }

        // ajax 提交数据
        $.ajax({
            type: "POST",
            url: formData.postUrl,
            data: formData,
            dataType: "json",
            success: function (_ret) {
                _this.data("do", "0");
                var componentsParentId = _this.data("comtag");
                $("#" + componentsParentId).find("img[name='captcha']").click();
                if (_ret._return !== "success") {
                    if (_ret.code == '2') {
                        layer.alert($.languagePack(_ret.language), function (index) {
                            window.location.reload();
                            layer.close(index);
                        });
                        $(".layui-layer-close").click(function () {
                            window.location.reload();
                        });
                        return '';
                    }
                    if (!!_ret.message) {
                        layer.alert(_ret.message, function (index) {
                            if (_ret.code == '1') {
                                var componentsParentId = _this.data("comtag");
                                $("#" + componentsParentId).find("input[name='captcha']").focus();
                            }
                            layer.close(index);
                        });
                        $(".layui-layer-close").click(function () {
                            if (_ret.code == '1') {
                                var componentsParentId = _this.data("comtag");
                                $("#" + componentsParentId).find("input[name='captcha']").focus();
                            }
                        });
                    }
                    return false;
                } else {
                    // 成功
                    if (!!_ret.message) {
                        layer.alert(_ret.message, function (index) {
                            window.location.reload();
                            layer.close(index);
                        });
                        $(".layui-layer-close").click(function () {
                            window.location.reload();
                        });
                    }

                }
            },
            error: function () {
                return  ajaxError();
            }
        });
    });
});
(function ($) {
    $.extend({
        // 公开插件入口
        "formComData": function (options) {
            // 内部定义一个插件获取相应的数据
            if (typeof this.privateFunction === "undefined") {
                this.privateFunction = $.extend({
                    "formGetFormComponents": function (_this) {
                        var componentsParentId = _this.data("comtag");
                        var _componentsParent = $("#" + componentsParentId);
                        if (_componentsParent.length < 1) {
                            return false;
                        }
                        return _componentsParent;
                    },
                    "formGetParmes": function (_componentsParent) {
                        if (_componentsParent.find("input[name='box-id']:hidden").length > 0) {
                            var boxId = _componentsParent.find("input[name='box-id']:hidden").val();
                        }
                        if (_componentsParent.find("input[name='post-url']:hidden").length > 0) {
                            var postUrl = _componentsParent.find("input[name='post-url']:hidden").val();
                        }
                        if (_componentsParent.find("input[name='component-type']:hidden").length > 0) {
                            var compType = _componentsParent.find("input[name='component-type']:hidden").val();
                        }
                        if (_componentsParent.find("input[name='page-id']:hidden").length > 0) {
                            var pageId = _componentsParent.find("input[name='page-id']:hidden").val();
                        }
                        if (typeof boxId === 'undefined' || typeof postUrl === 'undefined' || typeof compType === 'undefined' || typeof pageId === 'undefined') {
                            console.error('Undefined boxId OR postUrl');
                            return false;
                        }
                        return {boxId: boxId, postUrl: postUrl, compType: compType, pageId: pageId};
                    },
                    "formGetFormData": function (_form, boxId) {
                        var result = {};
                        var i = 0;
                        _form.find("input").each(function (key) {
                            var _this = $(this);
                            if (_this.data("boxid") == boxId && typeof _this.data("variable") !== "undefined") {
                                var val = _this.val();
                                if (_this.data('distpicker') && parseInt(_this.data('distpicker')) === 1) {
                                    var province = _this.next('div').find(".province option:selected").text();
                                    var city = _this.next('div').find(".city option:selected").text();
                                    var district = _this.next('div').find(".district option:selected").text();
                                    if (province && city && district) {
                                        val = province + city + district
                                    }
                                }
                                var _data = eval(_this.data("variable"));
                                _data.comthis = _this;
                                _data.value = val;
                                result[i] = _data;
                                i++;
                            }
                        });
                        return result;
                    },
                    "formGetGivenData": function (_form, boxId) {
                        var result = {};
                        var i = 0;
                        _form.find("input").each(function (key) {
                            var _this = $(this);
                            if (_this.data("boxid") == boxId && typeof _this.data("rule") !== "undefined") {
                                var _data = {
                                    comthis: _this,
                                    comid: _this.data("comid"),
                                    boxid: _this.data("boxid"),
                                    rule: _this.data("rule"),
                                    message: _this.data("message")
                                };
//                                console.log(_data);
                                result[i] = _data;
                                i++;
                            }
                        });
                        return result;
                    },
                    "formGetCaptcha": function (_form) {
                        if ($.trim(_form.find("input[name='captcha']")).length > 0) {
                            return $.trim(_form.find("input[name='captcha']").val());
                        }
                        return '';
                    }
                });
            }
            var _this = $.extend({errorInfos: {}}, options);

            // 获取表单组件节点
            var _componentsParent = this.privateFunction.formGetFormComponents(_this);
            if (_componentsParent === false) {
                return false;
            }
            // 获取 boxId、compType 以及 postUrl 登录数据
            var formParmes = this.privateFunction.formGetParmes(_componentsParent);
            if (this.formParmes === false) {
                return false;
            }
            // 获取表单组件中的表单数据
            var formData = this.privateFunction.formGetFormData(_componentsParent, formParmes.boxId);
            if (formData.length < 1) {
                return false;
            }
            // 验证表单规则定义
//            if (typeof this.formValidation === "undefined") {
            this.formValidation = $.extend({
                // 错误提示
                "messageBox": function (message, obj, width) {
                    _this.errorInfos[obj.data('comid')] = {
                        message: message,
                        obj: obj,
                        width: width
                    };
//                        console.log();
//                        layer.alert(message, function (index) {
//                            obj.focus();
//                            layer.close(index);
//                        });
//                        obj.focus();
//                        $(".layui-layer-close").click(function () {
//                            obj.focus();
//                        });
                },
                // 不能为空
                "required": function (_data, ruleData) {
                    if (typeof _data.value === "undefined" || $.trim(_data.value) === "" || strlen(_data.value) === 0) {
                        this.messageBox(ruleData.message, _data.comthis);
                        return false;
                    }
                    return true;
                },
                "rlength": function (_data, ruleData) {
                    if (typeof ruleData.is !== "undefined") {
                        if (strlen(_data.value) != parseInt(ruleData.is)) {
                            this.messageBox(ruleData.message, _data.comthis);
                            return false;
                        }
                        return true;
                    } else {
                        if (typeof ruleData.min !== "undefined") {
                            if (strlen(_data.value) < parseInt(ruleData.min)) {
                                this.messageBox(ruleData.message, _data.comthis);
                                return false;
                            }
                        }
                        if (typeof ruleData.max !== "undefined") {
                            if (strlen(_data.value) > parseInt(ruleData.max)) {
                                this.messageBox(ruleData.message, _data.comthis);
                                return false;
                            }
                        }
                        return true;
                    }
                },
                "email": function (_data, ruleData) {
                    if (_data.value == "") {
                        return true;
                    }
                    var pb = /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(_data.value);
                    if (!pb) {
                        this.messageBox(ruleData.message, _data.comthis);
                        return false;
                    }
                    return true;
                },
                "phone": function (_data, ruleData) {
                    if (_data.value == "") {
                        return true;
                    }
                    var pb = /^[0-9\-\+\,\;\，\；]+$/.test(_data.value);
                    if (!pb) {
                        this.messageBox(ruleData.message, _data.comthis);
                        return false;
                    }
                    return true;
                },
                "rili": function (_data, ruleData) {
                    if (_data.value == "") {
                        return true;
                    }
                    var utime = new Date(_data.value).getTime();
                    if (utime < 1) {
                        this.messageBox(ruleData.message, _data.comthis);
                        return false;
                    }
                    return true;
                },
                "suffix": function (_data, ruleData) {
                    var suf = _data.value.substr(_data.value.lastIndexOf('.') + 1);
                    var bool = false;
                    for (var i in ruleData.suffix) {
                        var suff = ruleData.suffix[i];
                        if (suff === suf) {
                            bool = true;
                        }
                    }
                    if (bool) {
                        return true;
                    }
                    this.messageBox(ruleData.message, _data.comthis, '350px');
                    return false;
                },
                "size": function (_data, ruleData) {
                    if (_data.comthis.next("input[name='fileSize']").val() && _data.comthis.next("input[name='fileSize']").val() > ruleData.size) {
                        this.messageBox(ruleData.message, _data.comthis);
                        return false;
                    }
                    return true;
                }
            });
//            }

            /**
             * 对于特定的表单验证的过程
             */
            // 验证特殊表单规则
//            if (typeof this.givenValidation === "undefined") {
            this.givenValidation = $.extend({
                // 首先需要关联到表单以及表单结果的数据上
                "controller": function (givenData, formData) {
                    var bool = true;
                    var gvalue = null;
                    for (var i in givenData) {
                        givenData[i].comid
                        for (var k in formData) {
                            if (formData[k].id == givenData[i].comid) {
                                gvalue = formData[k].value;
                                break;
                            }
                        }
                        if (givenData[i].rule === 'required' && (gvalue === null || gvalue === "")) {
//                                layer.alert(givenData[i].message, function (index) {
//                                    layer.close(index);
//                                });
                            _this.errorInfos[givenData[i].comid] = {
                                message: givenData[i].message,
                                obj: givenData[i].comthis
                            };
                            bool = false;
                        }
                        gvalue = null;
                    }
                    return bool;
                }
            });
//            }
            var givenData = this.privateFunction.formGetGivenData(_componentsParent, formParmes.boxId);

            // 对表单数据验证的过程
            var bool = true;
            var formItem = new Array;
            var formComthis = new Array;
            $.each(formData, function (key, _data) {
                if ($.formComDataValidation(_data) === true) {
                    formItem[key] = {
                        id: _data.id,
                        name: _data.name,
                        value: _data.value,
                        item: typeof _data.item !== "undefined" ? _data.item : 0
                    };
                    formComthis[key] = {
                        id: _data.id,
                        comthis: _data.comthis
                    }
                } else {
                    bool = false;
                }
            });
            if (this.givenValidation.controller(givenData, formData) === false) {
                bool = false;
            }
            if (bool === true) {
                // 验证验证码是否为空
                var captcha = this.privateFunction.formGetCaptcha(_componentsParent);
                if (captcha === "") {
                    layer.alert(languagePack('verificationCodeCannotBeEmpty'), function (index) {
                        if (_componentsParent.find("input[name='captcha']").length > 0) {
                            _componentsParent.find("input[name='captcha']").focus();
                        }
                        layer.close(index);
                    });
                    $(".layui-layer-close").click(function () {
                        _componentsParent.find("input[name='captcha']").focus();
                    });
                    return false;
                } else if (captcha.length != 4) {
                    layer.alert(languagePack('pleaseEnter4VerificationCode'), function (index) {
                        if (_componentsParent.find("input[name='captcha']").length > 0) {
                            _componentsParent.find("input[name='captcha']").focus();
                        }
                        layer.close(index);
                    });
                    $(".layui-layer-close").click(function () {
                        _componentsParent.find("input[name='captcha']").focus();
                    });
                    return false;
                }
                var returnData = {
                    formItem: formItem,
                    captcha: captcha,
                    boxId: formParmes.boxId,
                    pageId: formParmes.pageId,
                    postUrl: formParmes.postUrl
                };
                return {com: formComthis, data: returnData};
            } else {
//                _componentsParent, formParmes.boxId
//                _componentsParent.find("input[data-boxid='"+formParmes.boxId+"']").each(function (key) {
//                            var _this = $(this);
//                            if (_this.data("boxid") == boxId && typeof _this.data("variable") !== "undefined") {
//                                var _data = eval(_this.data("variable"));
//                                _data.comthis = _this;
//                                _data.value = _this.val();
//                                result[i] = _data;
//                                i++;
//                            }
//                        });
                // 从上到下获取表单
                _componentsParent.find("input[data-boxid='" + formParmes.boxId + "']").each(function () {
                    if (!!_this.errorInfos[$(this).data("comid")]) {
                        var _info = _this.errorInfos[$(this).data("comid")];
                        if (!!_info.obj.data("variable")) {
                            if (!!_info.width) {
                                var _layer = layer;
                                _layer.alert(_info.message, {
                                    area: _info.width,
                                    success: function (index) {
                                        _info.obj.focus();
                                    }
                                });
                            } else {
                                layer.alert(_info.message, function (index) {
                                    _info.obj.focus();
                                    layer.close(index);
                                });
                            }
                            _info.obj.focus();
                            $(".layui-layer-close").click(function () {
                                obj.focus();
                            });
                        } else {
                            layer.alert(_info.message, function (index) {
                                layer.close(index);
                            });
                            $(".layui-layer-close").click(function () {
                                obj.focus();
                            });
                        }
                        return false;
                    }
                });
            }
            return false;
        },
        // 公开插件的验证入口，日后方便进行单个表单验证
        "formComDataValidation": function (_data) {
            var bool = true;
            var formValidation = this.formValidation;
            if (typeof _data.rules === "string" && _data.rules === "") {
                return bool;
            }
            $.each(_data.rules, function (rule, ruleData) {
                if (bool === false) {
                    return '';
                }
                switch (rule) {
                    case "required":
                        if (formValidation.required(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "length":
                        if (formValidation.rlength(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "email":
                        if (formValidation.email(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "phone":
                        if (formValidation.phone(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "rili":
                        if (formValidation.rili(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "suffix":
                        if (formValidation.suffix(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "size":
                        if (formValidation.size(_data, ruleData) === false) {
                            bool = false;
                        }
                        break;
                    case "default":
                        if (ruleData === "NULL") {
                            bool = true;
                        }
                        break;
                    default :
                        bool = false;
                        console.error("Undefined rule : " + rule);
                        return '';
                }

            });
            return bool;
        }
    });
})(jQuery);

