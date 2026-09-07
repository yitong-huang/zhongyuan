/**
 * 静态站点留言表单：本地验证码 + FormSubmit 投递
 * 需在 jquery.form.js 之后加载
 */
(function ($) {
    var RECEIVER_EMAIL = 'manshuangli@outlook.com';
    var FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/' + RECEIVER_EMAIL;

    function isChinese() {
        var lang = (document.documentElement.lang || '').toLowerCase();
        return lang.indexOf('zh') === 0 || lang === 'ch';
    }

    function t(cn, en) {
        return isChinese() ? cn : en;
    }

    function genCode() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var code = '';
        for (var i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    function refreshCaptcha($codeBox) {
        var code = genCode();
        $codeBox.data('expect-captcha', code);
        var $img = $codeBox.siblings('.captcha-code');
        if (!$img.length) {
            $img = $codeBox.closest('.form-captcha-submit-row').find('.captcha-code');
        }
        if (!$img.length) {
            $img = $codeBox.find('.captcha-code');
        }
        $img.text(code);
    }

    function injectCaptcha($codeBox) {
        if ($codeBox.find('input[name="captcha"]').length > 0) {
            return;
        }
        var label = t('验证码', 'Captcha');
        var tip = t('点击刷新', 'Click to refresh');
        $codeBox.html(
            '<div class="w-form-section w-form-UL clearfix captcha-row">' +
            '  <label class="w-label-form" for="contact-captcha"><span>' + label + '</span><span class="star_note">*</span></label>' +
            '  <div class="w-form-fr captcha-fr">' +
            '    <input class="w-text-form captcha-input" id="contact-captcha" type="text" name="captcha" maxlength="4" autocomplete="off" placeholder="' + label + '" title="' + label + '" />' +
            '  </div>' +
            '</div>'
        );
        // 验证码图放在下划线区域外，与提交按钮同一行靠右
        $('<span class="captcha-code" title="' + tip + '"></span>').insertAfter($codeBox);
        refreshCaptcha($codeBox);
        $codeBox.siblings('.captcha-code').add($codeBox.find('.captcha-code')).on('click', function () {
            refreshCaptcha($codeBox);
            $codeBox.find('input[name="captcha"]').val('').focus();
        });
    }

    function layoutCaptchaWithSubmit($form) {
        var $code = $form.find('.w-form-code');
        var $submit = $form.find('.w-form-submit');
        if (!$code.length || !$submit.length || $form.find('.form-captcha-submit-row').length) {
            return;
        }
        var $captchaImg = $form.find('.captcha-code').first();
        if ($captchaImg.length) {
            $code.add($captchaImg).add($submit).wrapAll('<div class="form-captcha-submit-row clearfix"></div>');
        } else {
            $code.add($submit).wrapAll('<div class="form-captcha-submit-row clearfix"></div>');
        }
    }

    function widenFormLabels($form) {
        // 覆盖页面内联 2em 宽度；左对齐使「电话/内容」与「姓名/邮箱」文字对齐
        $form.find('.w-label-form').each(function () {
            $(this).css({ width: '4.5em', whiteSpace: 'nowrap', textAlign: 'left' });
        });
        $form.find('.w-form-fr').each(function () {
            $(this).css({ 'margin-left': '5em' });
        });
    }

    function pickFieldValue(formItem, names) {
        for (var i = 0; i < formItem.length; i++) {
            if (!formItem[i] || !formItem[i].name) continue;
            var n = String(formItem[i].name).toLowerCase();
            for (var j = 0; j < names.length; j++) {
                if (n === names[j].toLowerCase()) {
                    return formItem[i].value || '';
                }
            }
        }
        return '';
    }

    function resetButton($btn) {
        $btn.data('do', '0');
    }

    function handleSubmit($btn) {
        if ($btn.data('do') === '1') {
            return;
        }
        $btn.data('do', '1');

        var formComData = $.formComData($btn);
        if (formComData === false) {
            resetButton($btn);
            return;
        }

        var $form = $('#' + $btn.data('comtag'));
        var $codeBox = $form.find('.w-form-code');
        var expect = String($codeBox.data('expect-captcha') || '').toUpperCase();
        var input = String(formComData.data.captcha || '').toUpperCase();

        if (!expect || input !== expect) {
            layer.alert(t('验证码错误，请重新输入', 'Incorrect captcha, please try again'), function (index) {
                $codeBox.find('input[name="captcha"]').focus();
                layer.close(index);
            });
            refreshCaptcha($codeBox);
            $codeBox.find('input[name="captcha"]').val('');
            resetButton($btn);
            return;
        }

        var items = formComData.data.formItem || [];
        var name = pickFieldValue(items, ['Name', '姓名']);
        var email = pickFieldValue(items, ['Email', '邮箱']);
        var phone = pickFieldValue(items, ['Telephone', 'Phone', '电话']);
        var message = pickFieldValue(items, ['Content', 'Message', '内容', '留言']);

        var payload = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            _subject: t('官网留言 - 潮州市中原陶瓷颜料有限公司', 'Website Inquiry - Zhongyuan Ceramics'),
            _template: 'table',
            _captcha: 'false'
        };

        $.ajax({
            type: 'POST',
            url: FORM_SUBMIT_URL,
            dataType: 'json',
            headers: { Accept: 'application/json' },
            data: payload,
            success: function () {
                layer.alert(t('提交成功，我们会尽快与您联系！', 'Submitted successfully. We will contact you soon.'), function (index) {
                    layer.close(index);
                    window.location.reload();
                });
                $('.layui-layer-close').click(function () {
                    window.location.reload();
                });
            },
            error: function (xhr) {
                resetButton($btn);
                refreshCaptcha($codeBox);
                // FormSubmit 首次使用需邮箱确认，或网络受限时降级到 mailto
                var subject = encodeURIComponent(payload._subject);
                var body = encodeURIComponent(
                    t('姓名', 'Name') + ': ' + name + '\n' +
                    t('邮箱', 'Email') + ': ' + email + '\n' +
                    t('电话', 'Phone') + ': ' + phone + '\n\n' +
                    t('留言', 'Message') + ':\n' + message
                );
                var mailto = 'mailto:' + RECEIVER_EMAIL + '?subject=' + subject + '&body=' + body;
                layer.confirm(
                    t('在线提交暂时不可用。是否改用邮箱客户端发送？', 'Online submit is unavailable. Open your email client instead?'),
                    {
                        btn: [t('打开邮箱', 'Open Email'), t('取消', 'Cancel')]
                    },
                    function (index) {
                        window.location.href = mailto;
                        layer.close(index);
                    }
                );
            }
        });
    }

    $(function () {
        $('.w-form').each(function () {
            var $form = $(this);
            injectCaptcha($form.find('.w-form-code'));
            layoutCaptchaWithSubmit($form);
            widenFormLabels($form);
        });

        // 覆盖原 CMS 提交逻辑
        $('.g-form-components').off('click').on('click', function (e) {
            e.preventDefault();
            handleSubmit($(this));
        });
    });
})(jQuery);
